import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function Offers({ products }) {
  const nailArtProducts = products.filter(
    (product) => product.category.name == "Nail Art"
  );
  return (
    <div className={styles.offers}>
      {/* <motion.div
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
        transition={{ duration: 0.5 }}
        
      > */}
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className={`offers_swiper`}
      >
        {nailArtProducts.map((product, index) =>
          product.subProducts.map(
            (offer, i) => (
              // offer.discount > 0 ? (
              <SwiperSlide key={i}>
                <Link href={`/product/${product.slug}?style=${i}`}>
                  <img
                    src={offer.images[0].url}
                    alt=""
                    className="drop-shadow-lg"
                  />
                </Link>
                {/* {offer.sizes[i] && offer.sizes[i].price && ( */}
                {/* <span>₦{offer.sizes[0].price}</span> */}
                {/* )} */}
                <span className="drop-shadow-lg">-{offer.discount}%</span>
              </SwiperSlide>
            )
            // ) : (
            //   ""
            // )
          )
        )}
      </Swiper>
      {/* </motion.div> */}
    </div>
  );
}
