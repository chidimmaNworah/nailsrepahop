import { createRouter } from "next-connect";
import Cart from "@/models/Cart";
import db from "@/utils/db";

const router = createRouter();

router.delete(async (req, res) => {
  await db.connectDb();
  try {
    const productId = req.query.productId;

    // Find the cart
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      await db.disconnectDb();
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the product from the cart
    const updatedCart = cart.products.filter(
      (product) => product._id.toString() !== productId.toString()
    );
    cart.products = updatedCart;
    await cart.save();

    await db.disconnectDb();
    res
      .status(200)
      .json({ message: "Product removed from cart", cart: updatedCart });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    await db.disconnectDb();
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router.handler();
