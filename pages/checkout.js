import { useState, useEffect } from "react";
import styles from "@/styles/checkout.module.scss";
import { getSession } from "next-auth/react";
import User from "@/models/user";
import Cart from "@/models/Cart";
import db from "@/utils/db";
import Header from "@/components/cart/header";
import Shipping from "@/components/checkout/shipping";
import Products from "@/components/checkout/products";
import Payment from "@/components/checkout/payment";
import Summary from "@/components/checkout/summary";
import { useDispatch } from "react-redux";
import { emptyCart } from "@/store/cartSlice";
export default function checkout({ cart, user }) {
  const [addresses, setAddresses] = useState(user?.address || []);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // Clear the cart on component mount
  //   dispatch(emptyCart());
  // }, []);

  useEffect(() => {
    let check = addresses?.find((ad) => ad.active == true);
    if (check) {
      setSelectedAddress(check);
    } else {
      setSelectedAddress("");
    }
  }, [addresses]);
  return (
    <>
      <Header />
      <div className={`${styles.container} ${styles.checkout}`}>
        <div className={styles.checkout__side}>
          <Shipping
            user={user}
            addresses={addresses}
            setAddresses={setAddresses}
          />
          <Products cart={cart} />
        </div>
        <div className={styles.checkout__side}>
          <Payment
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />

          <Summary
            totalAfterDiscount={totalAfterDiscount}
            setTotalAfterDiscount={setTotalAfterDiscount}
            user={user}
            cart={cart}
            paymentMethod={paymentMethod}
            selectedAddress={selectedAddress}
          />
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  await db.connectDb();
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const user = await User.findById(session?.user?.id);
  if (!user) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const cart = await Cart.findOne({ user: user._id });
  await db.disconnectDb();
  if (!cart) {
    return {
      redirect: {
        destination: "/cart",
      },
    };
  }
  return {
    props: {
      cart: JSON.parse(JSON.stringify(cart)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
