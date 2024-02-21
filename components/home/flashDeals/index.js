import styles from "./styles.module.scss";
import { MdFlashOn } from "react-icons/md";
import { motion } from "framer-motion";

import Countdown from "@/components/countdown";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import { flashDealsArray } from "@/data/home";
import FlashCard from "./Card";
import Link from "next/link";
export default function FlashDeals({ products }) {
  return (
    <div className={styles.flashDeals}>
      <motion.div
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.flashDeals__header}>
          <h1 className="flex">
            FLASH SALE
            <MdFlashOn />
          </h1>
          <Countdown date={new Date(2023, 11, 12, 25)} />
        </div>
      </motion.div>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Pagination]}
        pagination={{
          clickable: true,
        }}
        className="flashDeals__swiper"
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          630: {
            slidesPerView: 3,
          },
          920: {
            slidesPerView: 4,
          },
          // 1232: {
          //   slidesPerView: 5,
          // },
          // 1520: {
          //   slidesPerView: 6,
          // },
        }}
      >
        <div className={styles.flashDeals__list}>
          {products.map(
            (product, i) =>
              product.subProducts[0].discount > 0 && (
                <SwiperSlide>
                  {/* <FlashCard item={product} key={i} /> */}
                  {/* {item.subProductss.map((product, i) => ( */}
                  <div className={styles.card} key={i}>
                    <div className={styles.card__img}>
                      <motion.div whileHover={{ scale: 1.2 }}>
                        <Link
                          href={`/product/${product.slug}?style=${0}&size=${0}`}
                        >
                          <img
                            src={product.subProducts[0].images[0].url}
                            alt=""
                          />
                        </Link>
                      </motion.div>
                      <div className={styles.flash}>
                        <MdFlashOn />
                        <span>-{product.subProducts[0].discount}%</span>
                      </div>
                    </div>
                    {/* <motion.div
                      whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
                      transition={{ duration: 0.5 }}
                    > */}
                    <div className={styles.card__price}>
                      <span>
                        ₦
                        {(
                          product.subProducts[0].sizes[0].price -
                          product.subProducts[0].sizes[0].price /
                            product.subProducts[0].discount
                        ).toFixed(2)}
                      </span>
                      <span>
                        -₦
                        {(
                          product.subProducts[0].sizes[0].price -
                          (product.subProducts[0].sizes[0].price -
                            product.subProducts[0].sizes[0].price /
                              product.subProducts[0].discount)
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className={styles.card__bar}>
                      <div
                        className={styles.card__bar_inner}
                        style={{ width: `${product.subProducts[0].sold}%` }}
                      ></div>
                    </div>
                    <div className={styles.card__percentage}>
                      {product.subProducts[0].sold}% Sold
                    </div>
                    {/* </motion.div> */}
                  </div>

                  {/* ))} */}
                </SwiperSlide>
              )
          )}
        </div>
      </Swiper>
    </div>
  );
}
