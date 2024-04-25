import { createRouter } from "next-connect";
import Cart from "@/models/Cart";
import db from "@/utils/db";
import auth from "@/middleware/auth";
import User from "@/models/user";

const router = createRouter().use(auth);

router.delete(async (req, res) => {
  try {
    await db.connectDb();
    const productId = req.query.id;

    // Find and delete the cart containing the specified product
    const result = await Cart.findByIdAndDelete(productId);

    //   if (result.deletedCount === 0) {
    //     await db.disconnectDb();
    //     return res.status(404).json({ message: "Cart not found" });
    //   }

    await db.disconnectDb();
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart:", error);
    await db.disconnectDb();
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router.handler();
