import { Response } from "express";
import { validationResult } from "express-validator";
import { Cart } from "../models/cart";
import { AuthRequest } from "../types";
import { User } from "../models/user";

export class CartController {
  static async getCarts(req: AuthRequest, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id: userid } = req.user as User;

    try {
      const carts = await Cart.getCarts(userid as unknown as string);
      res.status(201).json(carts);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
  static async createCart(req: AuthRequest, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { productid, quantity } = req.body;
    const { id: userid } = req.user as User;

    try {
      const cartExist = await Cart.getCartByProductId(productid);
      if (cartExist) {
        await cartExist.update({
          quantity: quantity ? quantity : cartExist.quantity + 1,
        });
        const carts = await Cart.getCarts(userid as unknown as string);
        res.status(201).json({ message: "Item updated", carts });
      } else {
        await Cart.create({
          quantity: quantity ? quantity : 1,
          productid,
          userid,
        });
        const carts = await Cart.getCarts(userid as unknown as string);
        res.status(201).json({ message: "Item added", carts });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }

  static async deleteCart(req: AuthRequest, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { cartid } = req.query;
      const { id: userid } = req.user as User;
      const cartExist = await Cart.getCartById(cartid as string);
      if (!cartExist)
        return res.status(404).json({ error: "cart item can't be identified" });

      //delete image and delete record in the database
      await Cart.destroy({
        where: { id: cartExist.id },
      });
      const carts = await Cart.getCarts(userid as unknown as string);
      res.status(201).json({ message: "Cart deleted successfully", carts });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
}
