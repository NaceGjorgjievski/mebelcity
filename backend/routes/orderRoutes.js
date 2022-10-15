import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import bcrypt from "bcryptjs";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
      isPaid: req.body.isPaid,
      paidAt: req.body.paidAt,
      isConfirmed: req.body.isConfirmed,
      contactNumber: req.body.contactNumber,
    });
    const order = await newOrder.save();
    res.status(201).send({ message: "New Order Created", order });
  })
);

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);
const PAGE_SIZE = 10;
orderRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const isConfirmed = query.isConfirmed || "";
    const isShipped = query.isShipped || "";
    const searchQuery = query.query || "";
    const isDelivered = false;
    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? { _: { $regex: searchQuery, $options: "i" } }
        : {};
    const isConfirmedFilter =
      isConfirmed && isConfirmed !== "all" ? { isConfirmed } : {};
    const isShippedFilter =
      isShipped && isShipped !== "all" ? { isShipped } : {};

    const orders = await Order.find({
      ...queryFilter,
      ...isConfirmedFilter,
      ...isShippedFilter,
      ...isDelivered,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countOrders = await Order.countDocuments({
      ...isConfirmedFilter,
      ...isShippedFilter,
    });
    res.send({
      orders,
      countOrders,
      page,
      pages: Math.ceil(countOrders / pageSize),
    });
    //const orders = await Order.find();
    //res.send(orders);
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.put(
  "/action",
  expressAsyncHandler(async (req, res) => {
    if (req.body.isConfirmed) {
      const order = await Order.updateOne(
        { _id: req.body._id },
        {
          $set: {
            isConfirmed: req.body.isConfirmed,
          },
        }
      );
    } else if (req.body.isShipped) {
      const order = await Order.updateOne(
        { _id: req.body._id },
        {
          $set: {
            isShipped: req.body.isShipped,
            shippedAt: req.body.shippedAt,
          },
        }
      );
    } else if (req.body.isDelivered && req.body.isPaid) {
      const order = await Order.updateOne(
        { _id: req.body._id },
        {
          $set: {
            isDelivered: req.body.isDelivered,
            deliveredAt: req.body.deliveredAt,
            isPaid: req.body.isPaid,
            paidAt: req.body.paidAt,
          },
        }
      );
    } else {
      const order = await Order.updateOne(
        { _id: req.body._id },
        {
          $set: {
            isDelivered: req.body.isDelivered,
            deliveredAt: req.body.deliveredAt,
          },
        }
      );
    }

    res.status(200).send({ message: "Succesful" });
  })
);

export default orderRouter;
