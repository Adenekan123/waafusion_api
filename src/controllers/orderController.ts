import { Response } from "express";
import { validationResult } from "express-validator";
import { AuthRequest } from "../types";
import { User } from "../models/user";
import { Order } from "../models/order";
import { visitorOrder } from "../models/visitorOrder";
import { IPartnerOrderItem, IVistitorOrderItem } from "../types/order";
import { Cart } from "../models/cart";

export class OrderController {
  static async createPartnerOrder(req: AuthRequest, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { orderitems } = req.body;
    const { id: userid } = req.user as User;
    const neworderitems = orderitems.reduce(
      (acc: IPartnerOrderItem[], curr: IPartnerOrderItem) => {
        return [...acc, { ...curr, userid }];
      },
      []
    );
    try {
      await Order.bulkCreate(neworderitems);
      await Cart.emptyCart(userid as unknown as string);
      const orders = await Order.getOrdersByUserId(userid as unknown as string);
      res.status(201).json({ message: "Your order has been recieved", orders });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
  static async createVisitorOrder(req: AuthRequest, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { orderitems, user } = req.body;
    const new_orderitems = orderitems.reduce(
      (acc: IVistitorOrderItem[], curr: IVistitorOrderItem) => {
        return [...acc, { ...curr, ...user }];
      },
      []
    );
    try {
      await visitorOrder.bulkCreate(new_orderitems);
      const orders = await visitorOrder.getOrders(user?.email, user?.name);
      res.status(201).json({ message: "Your order has been recieved", orders });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }

  static async deleteOrder(req: AuthRequest, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { orderid } = req.query;
      const orderExist = await Order.getOrderById(orderid as string);
      if (!orderExist)
        return res
          .status(404)
          .json({ error: "order item can't be identified" });

      //delete image and delete record in the database
      await Order.destroy({
        where: { id: orderExist.id },
      });
      res.status(201).json({ message: "Order deleted successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }

  static async getAllOrders(req: AuthRequest, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id: userid } = req.user as User;
    try {
      const orders = await Order.getOrdersByUserId(userid as unknown as string);
      res.status(200).json({orders});
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
}
