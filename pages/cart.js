import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Empty from "@/components/cart/empty";
import Header from "@/components/cart/header";
import CartProduct from "@/components/cart/product";
import styles from "@/styles/cart.module.scss";
import { updateCart } from "@/store/cartSlice";
import CartHeader from "@/components/cart/cartHeader.js";
import Checkout from "@/components/cart/checkout";
import PaymentMethods from "@/components/cart/paymentMethods.js";
import { women_swiper } from "@/data/home";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { saveCart } from "@/requests/user";
import Product from "@/models/Product";
import Category from "@/models/Category";
import db from "@/utils/db";
import Footer from "@/components/footer";
import ProductsSwiper from "@/components/productsSwiper";
export default function cart({ products, country }) {
  const Router = useRouter();
  const { data: session } = useSession();
  const [selected, setSelected] = useState([]);
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  //-----------------------
  const [shippingFee, setShippingFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  // useEffect(() => {
  //   const update = async () => {
  //     const { data } = await axios.post("/api/updateCart", {
  //       products: cart.cartItems,
  //     });
  //     dispatch(updateCart(data));
  //   };
  //   if (cart.cartItems.length > 0) {
  //     update();
  //   }
  // });

  useEffect(() => {
    setShippingFee(
      selected.reduce((a, c) => a + Number(c.shipping), 0).toFixed(2)
    );
    setSubtotal(selected.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2));
    setTotal(
      (
        selected.reduce((a, c) => a + c.price * c.qty, 0) + Number(shippingFee)
      ).toFixed(2)
    );
  }, [selected]);
  //-----------------------
  const saveCartToDbHandler = async () => {
    if (session) {
      const res = saveCart(selected);
      Router.push("/checkout");
    } else {
      signIn();
    }
  };
  return (
    <>
      <Header />
      <div className={styles.cart}>
        {cart.cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            <CartHeader
              cartItems={cart.cartItems}
              selected={selected}
              setSelected={setSelected}
            />
            <div className={styles.cart__products}>
              {cart.cartItems.map((product) => (
                <CartProduct
                  product={product}
                  key={product._uid}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </div>
            <Checkout
              subtotal={subtotal}
              shippingFee={shippingFee}
              total={total}
              selected={selected}
              saveCartToDbHandler={saveCartToDbHandler}
            />
            <PaymentMethods />
          </div>
        ) : (
          <Empty />
        )}
      </div>
      {/* <ProductsSwiper products={products} /> */}
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps() {
  await db.connectDb();
  let products = await Product.find()
    .populate({ path: "category", model: Category })
    .sort({ createdAt: -1 })
    .lean()
    .maxTimeMS(30000);

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      country: {
        name: "Nigeria",
        flag: "https://cdn.ipregistry.co/flags/emojitwo/ng.svg",
        code: "NG",
      },
    },
  };
}
