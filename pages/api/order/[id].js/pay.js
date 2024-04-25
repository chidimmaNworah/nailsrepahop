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

import nc from "next-connect";
import auth from "@/middleware/auth";
import Order from "@/models/Order";
import db from "@/utils/db";
import User from "@/models/user";

const handler = nc().use(auth);

handler.put(async (req, res) => {
  try {
    await db.connectDb();
    const orderId = req.query.id; // Ensure this is the correct way to extract the ID
    console.log("Order ID:", orderId);

    const order = await Order.findById(orderId).populate({
      path: "user",
      model: User,
    });
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: "12345",
        status: "processed",
        email: "mikkylipsy@gmail.com",
      };
      const newOrder = await order.save();
      await db.disconnectDb();
      console.log("Order updated:", newOrder);
      res.json({ message: "Order is paid.", order: newOrder });
    } else {
      await db.disconnectDb();
      console.log("Order not found");
      res.status(404).json({ message: "Order is not found." });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    await db.disconnectDb();
    return res.status(500).json({ message: "Internal server error." });
  }
});

export default handler;
