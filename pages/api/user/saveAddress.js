import nc, { createRouter } from "next-connect";
import User from "@/models/user";
import db from "@/utils/db";
import auth from "@/middleware/auth";
// const handler = nc().use(auth);
const router = createRouter().use(auth);

// router.post(async (req, res) => {
//   try {
//     db.connectDb();
//     const { address } = req.body;
//     const user = User.findById(req.user);
//     await user.updateOne(
//       {
//         $push: {
//           address: address,
//         },
//       },
//       { new: true }
//     );
//     db.disconnectDb();
//     return res.json({ addresses: user.address });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

// The above error returns this
// {
//   "message": "unknown top level operator: $push. If you have a field name that starts with a '$' symbol, consider using $getField or $setField."
// }

router.post(async (req, res) => {
  try {
    db.connectDb();
    const { address } = req.body;
    const user = await User.findById(req.user); // Make sure to await the query
    user.address.push(address); // Use the push method of the address array
    await user.save(); // Save the updated user document
    db.disconnectDb();
    return res.json({ addresses: user.address });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
