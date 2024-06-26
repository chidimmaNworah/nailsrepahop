import nc, { createRouter } from "next-connect";
import User from "@/models/user";
import Order from "@/models/Order";
import db from "@/utils/db";
import auth from "@/middleware/auth";
const router = createRouter().use(auth);

router.post(async (req, res) => {
  try {
    db.connectDb();
    const {
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    } = req.body;
    const user = await User.findById(req.user);
    const newOrder = await new Order({
      user: user._id,
      products,
      shippingAddress,
      paymentMethod,
      paymentResult: {
        id: "",
        status: "",
        email: "",
      },
      total,
      totalBeforeDiscount,
      couponApplied,
    }).save();
    db.disconnectDb();
    return res.json({
      order_id: newOrder._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
