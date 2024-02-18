import React from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";
import MainSwiper from "./swiper";
import Offers from "./offers"; // Import the Offers component
import Menu from "./Menu";
import User from "./User";
import Link from "next/link";
import Header from "./Header";

export default function Main({ products }) {
  // console.log(products[0].subProducts);
  return (
    <div className={styles.main}>
      {/* <Header /> */}
      {/* <Menu /> */}
      <MainSwiper />
      {/* <motion.div
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
        transition={{ duration: 0.5 }}
      > */}
      <Offers products={products} /> {/* </motion.div> */}
      {/* Render the Offers component once and pass all products */}
      {/* <User /> */}
    </div>
  );
}
