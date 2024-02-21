import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import axios from "axios";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "@/components/home/main";
import FlashDeals from "@/components/home/flashDeals";
// import Category from "@/components/home/category";
import Category from "../models/Category";
import {
  gamingSwiper,
  homeImprovSwiper,
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
} from "@/data/home";
import { useMediaQuery } from "react-responsive";
import ProductsSwiper from "@/components/productsSwiper";
import db from "@/utils/db";
import Product from "@/models/Product";
import ProductCard from "@/components/productCard";
import NailArt from "@/components/home/category/NailsAndAccessories";
import ToolsAndEquipments from "@/components/home/category/ToolsAndEquipments";
import ForEntreprenuers from "@/components/productsSwiper/ForEntreprenuers";
import ForCreators from "@/components/productsSwiper/ForCreators";

export default function Home({ country, products, productsByCategory }) {
  // console.log("products", products);
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });

  return (
    <div>
      <Head>
        <tilte>
          {/* NailsRepublic - Online Shopping for NailArt, Manicure & Pedicure
          equipments, Nail Fashion for Unisex, Wholesale Suppliers, and
          Professional Designers and Nail Studios and more. */}
          Nails Republic
        </tilte>
        <meta
          name="description"
          content="Nails Republic is a Manicure and Pedicure Cosmetic and Healthcare
          enthusiast's one-stop destination for all hs or her needs.
          Nailsrepublic.co is a highly trusted and safe website with an
          excellent Safety Core. It is a recommended platform for a wide range
          of services for Finger related Aestethics, and a boutique Nail care
          and Fashion"
        />
        <meta
          name="keywords"
          content="Nails Republic is a Manicure and Pedicure Cosmetic and Healthcare
          enthusiast's one-stop destination for all hs or her needs.
          Nailsrepublic.co is a highly trusted and safe website with an
          excellent Safety Core. It is a recommended platform for a wide range
          of services for Finger related Aestethics, and a boutique Nail care
          and Fashion"
        />
        <meta
          property="og:title"
          content="Nails Republic is a Manicure and Pedicure Cosmetic and Healthcare
          enthusiast's one-stop destination for all hs or her needs.
          Nailsrepublic.co is a highly trusted and safe website with an
          excellent Safety Core. It is a recommended platform for a wide range
          of services for Finger related Aestethics, and a boutique Nail care
          and Fashion"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shop.nailsrepublic.co" />
        <meta property="og:image" content="/logo.png" />
        <meta
          property="og:site_name"
          content="Nails Republic is a Manicure and Pedicure Cosmetic and Healthcare
          enthusiast's one-stop destination for all hs or her needs.
          Nailsrepublic.co is a highly trusted and safe website with an
          excellent Safety Core. It is a recommended platform for a wide range
          of services for Finger related Aestethics, and a boutique Nail care
          and Fashion"
        />
        {/* twitter cards */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@nailrepublik" />
        <meta name="twitter:creator" content="@kimmoramicky" />
      </Head>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main products={products} />
          <FlashDeals products={products} />
          <div className={styles.home__category}>
            {/* <motion.div
              whileInView={{ x: [-100, -50, 0], opacity: [0, 0, 1] }}
              transition={{ duration: 1 }}
            > */}
            <NailArt
              header="Nail & Accessories"
              products={products}
              background="#c9454b"
            />
            {/* nail art, fashion and accessories */}
            {/* </motion.div> */}
            {/* {!isMedium && ( */}
            {/* <motion.div
              whileInView={{ x: [100, 50, 0], opacity: [0, 0, 1] }}
              transition={{ duration: 1 }}
            > */}
            <ToolsAndEquipments
              header="Tools & Equipments"
              products={products}
              background="#704271"
            />
            {/* combo and tools */}
            {/* </motion.div> */}
            {/* )} */}
            {/* <Category
              header="Health & Treatment"
              products={women_dresses}
              background="#704271"
            /> */}
          </div>
          <motion.div
            whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}
          >
            <ForEntreprenuers
              products={products}
              header="For Entreprenuers & Creators"
              bg="#6cc070"
            />
            {/* Fasion and accessories */}
            {/* <ForCreators
            products={products}
            headers="Unique & Stylish"
            bg="#ca4987"
          /> */}
            {/* <motion.div
            whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}
          > */}
            <ForCreators
              products={products}
              header="Unique & Stylish"
              bg="#ca4987"
            />{" "}
            {/* treatment and nail art */}
          </motion.div>
          {/* </motion.div> */}
          <div className={styles.products}>
            {products?.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
      <Footer country={country} />
    </div>
  );
}

export async function getServerSideProps() {
  db.connectDb();
  let products = await Product.find()
    .populate({ path: "category", model: Category })
    .sort({ createdAt: -1 })
    .lean()
    .maxTimeMS(30000);

  // let data = await axios
  //   .get("https://api.ipregistry.co/?key=8buu5nzbgsrrfuf3")
  //   .then((res) => {
  //     return res.data.location.country;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      // country: { name: data.name, flag: data.flag.emojitwo, code:data.code },
      country: {
        name: "Nigeria",
        flag: "https://cdn.ipregistry.co/flags/emojitwo/ng.svg",
        code: "NG",
      },
    },
  };
}
