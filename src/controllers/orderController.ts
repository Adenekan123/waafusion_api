import { Response } from "express";
import { validationResult } from "express-validator";
import { Cart } from "../models/cart";
import { AuthRequest } from "../types";
import { User } from "../models/user";
import { Order } from "../models/order";

export class OrderController {
  static async createOrder(req: AuthRequest, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { productid, name, email, phone, address, state, total } = req.body;
    const { id: userid } = req.user as User;

    try {
      if (!userid) {
        if (
          !name ||
          !email ||
          !phone ||
          !address ||
          !state ||
          !total ||
          !productid ||
          !total
        ) {
          return res
            .status(500)
            .json({ error: "Invalid request. Please fill all fields" });
        }

        await Order.create({
          name,
          email,
          phone,
          address,
          state,
          productid,
          total,
        });
      } else {
        const carts = await Cart.findAll({ where: { userid } });

        await Order.create({
          total,
          productid: carts.map((cart) => cart.productid) as unknown as string,
          userid,
        });
        // const carts = await Cart.getCarts(userid as unknown as string);
        res.status(201).json({ message: "Item added", carts });
      }
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
        return res.status(404).json({ error: "order item can't be identified" });

      //delete image and delete record in the database
      await Order.destroy({
        where: { id: orderExist.id },
      });
      res.status(201).json({ message: "Order deleted successfully"});
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
}
