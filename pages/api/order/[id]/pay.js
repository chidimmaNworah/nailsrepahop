// import nc from "next-connect";
// import auth from "@/middleware/auth";
// import Order from "@/models/Order";
// import db from "@/utils/db";

// const handler = nc().use(auth);

// handler.put(async (req, res) => {
//   try {
//     await db.connectDb();
//     console.log(req.query.id);
//     const order = await Order.findById(req.query.id);
//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.paymentResult = {
//         id: req.body.id,
//         status: req.body.status,
//         email_address: req.body.email_address,
//       };
//       const newOrder = await order.save();
//       await db.disconnectDb();
//       res.json({ message: "Order is paid.", order: newOrder });
//       console.log("hello from api");
//     } else {
//       await db.disconnectDb();
//       res.status(404).json({ message: "Order is not found." });
//     }
//     console.log(order);
//   } catch (error) {
//     console.error("Error processing payment:", error);
//     await db.disconnectDb();
//     return res.status(500).json({ message: "Internal server error." });
//   }
// });

// export default handler;

import { createRouter } from "next-connect";
import auth from "@/middleware/auth";
import Order from "@/models/Order";
import db from "@/utils/db";

const router = createRouter().use(auth);

router.put(async (req, res) => {
  try {
    await db.connectDb();
    console.log(req.body);
    const { status, email_address, id } = req.body;
    const order_id = req.query;

    const order = await Order.findById(order_id.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id,
        status: "Processing",
        email: email_address,
      };
      order.status = "Processing";
      await order.save();
      res.json({
        success: true,
      });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
    await db.disconnectDb();
  } catch (error) {
    console.error("Error processing payment:", error);
    await db.disconnectDb();
    return res.status(500).json({ message: "Internal server error." });
  }
});

export default router.handler();
