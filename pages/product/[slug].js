import Head from "next/head";
import { useState } from "react";
import { produceWithPatches } from "immer";
import { motion } from "framer-motion";
import styles from "@/styles/product.module.scss";
import db from "@/utils/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import User from "@/models/user";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MainSwiper from "@/components/productPage/mainSwiper";
import Infos from "@/components/productPage/infos";
import Reviews from "@/components/productPage/reviews";
import ProductsSwiper from "@/components/productsSwiper";
export default function product({ product, related }) {
  const [activeImg, setActiveImg] = useState("");
  const country = {
    name: "Nigeria",
    flag: "https://cdn.ipregistry.co/flags/emojitwo/ng.svg",
  };
  return (
    <>
      <Head>
        <tilte>{product.name}</tilte>
        <meta name="description" content={product.description} />
        {/* <meta
          name="keywords"
          content="Nails Republic is a Manicure and Pedicure Cosmetic and Healthcare
          enthusiast's one-stop destination for all hs or her needs.
          Nailsrepublic.co is a highly trusted and safe website with an
          excellent Safety Core. It is a recommended platform for a wide range
          of services for Finger related Aestethics, and a boutique Nail care
          and Fashion"
        /> */}
        <meta property="og:title" content={product.name} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={product.slug} />
        <meta
          property="og:image"
          content={product.description_images?.[0]?.url}
        />
        <meta property="og:site_name" content="Nails Republic" />
        {/* twitter cards */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@nailrepublik" />
        <meta name="twitter:creator" content="@kimmoramicky" />
      </Head>
      <Header country={country} />
      <div className={styles.product}>
        <div className={styles.product__container}>
          <div className={styles.path}>
            Home / {product.category.name} / {product.name}
            {product.subCategories.map((sub) => (
              <span>/{sub.name}</span>
            ))}
          </div>
          <div className={styles.product__main}>
            <motion.div
              useInView={{ x: [-30, 0], opacity: [0, 0, 1] }}
              transition={{ duration: 1 }}
            >
              <MainSwiper
                images={product.images}
                activeImg={activeImg}
                name={product.name}
              />
            </motion.div>
            <motion.div
              useInView={{ x: [30, 0], opacity: [0, 0, 1] }}
              transition={{ duration: 1 }}
            >
              <Infos product={product} setActiveImg={setActiveImg} />
            </motion.div>
          </div>
          <motion.div
            whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}
            className="bg-gray-100 px-8 rounded shadow-lg pb-8"
          >
            <Reviews product={product} />
          </motion.div>
          <motion.div
            whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}
          >
            <ProductsSwiper products={related} />
          </motion.div>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.slug;
  const style = query.style;
  const size = query.size || 0;
  db.connectDb();
  //------------
  let product = await Product.findOne({ slug })
    .populate({ path: "category", model: Category })
    .populate({ path: "subCategories", model: SubCategory })
    .populate({ path: "reviews.reviewBy", model: User })
    .lean();
  let subProduct = product.subProducts[style];
  let prices = subProduct.sizes
    .map((s) => {
      return s.price;
    })
    .sort((a, b) => {
      return a - b;
    });
  let newProduct = {
    ...product,
    style,
    images: subProduct.images,
    sizes: subProduct.sizes,
    discount: subProduct.discount,
    sku: subProduct.sku,
    colors: product.subProducts.map((p) => {
      return p.color;
    }),
    priceRange: subProduct.discount
      ? `From ${(prices[0] - prices[0] / subProduct.discount).toFixed(2)} - ${(
          prices[prices.length - 1] -
          prices[prices.length - 1] / subProduct.discount
        ).toFixed(2)}₦`
      : `From ${prices[0]} to ${prices[prices.length - 1]}₦`,
    price:
      subProduct.discount > 0
        ? (
            subProduct.sizes[size].price -
            subProduct.sizes[size].price / subProduct.discount
          ).toFixed(2)
        : subProduct.sizes[size].price,
    priceBefore: subProduct.sizes[size].price,
    quantity: subProduct.sizes[size].qty,
    ratings: [
      {
        percentage: calculatePercentage("5"),
      },
      {
        percentage: calculatePercentage("4"),
      },
      {
        percentage: calculatePercentage("3"),
      },
      {
        percentage: calculatePercentage("2"),
      },
      {
        percentage: calculatePercentage("1"),
      },
    ],
    reviews: product.reviews,
    allSizes: product.subProducts
      .map((p) => {
        return p.sizes;
      })
      .flat()
      .sort((a, b) => {
        return a.size - b.size;
      })
      .filter(
        (element, index, array) =>
          array.findIndex((el2) => el2.size === element.size) === index
      ),
  };
  const related = await Product.find({ category: product.category._id }).lean();
  //------------
  function calculatePercentage(num) {
    return (
      (product.reviews.reduce((a, review) => {
        return (
          a +
          (review.rating == Number(num) || review.rating == Number(num) + 0.5)
        );
      }, 0) *
        100) /
      product.reviews.length
    ).toFixed(1);
  }
  db.disconnectDb();
  // console.log("related", related);
  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)),
      related: JSON.parse(JSON.stringify(related)),
    },
  };
}
