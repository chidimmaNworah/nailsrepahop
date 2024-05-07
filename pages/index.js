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
import Category from "../models/Category";
import { FaArrowRight } from "react-icons/fa";
import ProductsSwiper from "@/components/productsSwiper";
import db from "@/utils/db";
import Product from "@/models/Product";
import ProductCard from "@/components/productCard";
import NailArt from "@/components/home/category/NailsAndAccessories";
import ToolsAndEquipments from "@/components/home/category/ToolsAndEquipments";
import ForEntreprenuers from "@/components/productsSwiper/ForEntreprenuers";
import ForCreators from "@/components/productsSwiper/ForCreators";
import Link from "next/link";

export default function Home({ country, products, productsByCategory }) {
  // console.log("products", products);
  const { data: session } = useSession();

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
      {/* <div className={styles.hero_image}>
        <img src="/herobanner.png" alt="hero-image" />
        <div>
          <ul>
            <li>Handcrafted</li>{" "}
            <li>
              flavour is <span>always</span>
            </li>
            <li>incredible</li>
          </ul>
        </div>
      </div> */}
      <Main products={products} />
      <div className={styles.home}>
        <div className={styles.container}>
          {/* <FlashDeals products={products} /> */}
          <div className={styles.home__category}>
            <div className={styles.tools__left}>
              <span>FAST DELIVERY</span>
              <h1>Healthy nails cannot be rushed</h1>
              <p>
                But having the right tools and equipment can make the journey
                easier.
              </p>{" "}
              <p>
                Shop our selection of high-quality nail care tools and equipment
                to support your nail care routine. From files and buffers to
                cuticle care essentials, we've got everything you need to
                nurture strong, beautiful nails at your own pace.
              </p>
              <Link href="/browse?category=62c46ff0062128444ad59193">
                <button className="flex align-center">
                  SHOP <FaArrowRight />
                </button>
              </Link>
            </div>

            <ToolsAndEquipments
              header="Tools & Equipments"
              products={products}
              background="#c9454b"
            />
          </div>
          <div className={styles.home__category}>
            <NailArt
              header="Nail & Accessories"
              products={products}
              background="#e6bac8"
            />
            <div className={styles.tools__left}>
              <span>FAST DELIVERY</span>
              <h1>Healthy nails cannot be rushed</h1>
              <p>
                But having the right tools and equipment can make the journey
                easier.
              </p>{" "}
              <p>
                Shop our selection of high-quality nail care tools and equipment
                to support your nail care routine. From files and buffers to
                cuticle care essentials, we've got everything you need to
                nurture strong, beautiful nails at your own pace.
              </p>
              <Link
                href="/browse?category=62c46ff0062128444ad59193"
                className={styles.seccondbtn}
              >
                <button className="flex align-center">
                  SHOP <FaArrowRight />
                </button>
              </Link>
            </div>

            <div></div>
          </div>
          {/* <motion.div
            whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}
          >
            <ForEntreprenuers
              products={products}
              header="For Entreprenuers & Creators"
              bg="#5a141d"
            />
            <ForCreators
              products={products}
              header="Unique & Stylish"
              bg="#c9454b"
            />{" "}
          </motion.div> */}
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
  await db.connectDb();
  let products = await Product.find()
    .populate({ path: "category", model: Category })
    .sort({ createdAt: -1 })
    .lean();
  // .maxTimeMS(30000);

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
