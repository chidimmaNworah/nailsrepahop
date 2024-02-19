import styles from "./styles.module.scss";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import Link from "next/link";
export default function ProductsSwiper({ header, products, bg }) {
  // console.log(products);
  return (
    <div className={styles.wrapper}>
      {header && (
        <div
          className={styles.header}
          style={{ background: `${bg ? bg : ""}` }}
        >
          {header}
        </div>
      )}
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="products__swiper"
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
          1232: {
            slidesPerView: 5,
          },
          1520: {
            slidesPerView: 6,
          },
        }}
      >
        {products.reverse().map((product, i) => (
          <SwiperSlide>
            <div className={styles.product}>
              <div className={styles.product__img}>
                <Link href={`/product/${product.slug}?style=${0}&size=${0}`}>
                  <img
                    src={product?.subProducts?.[i]?.images?.[0]?.url}
                    alt=""
                  />
                </Link>
              </div>
              <div className={styles.product__infos}>
                <h1>
                  {product.name.length > 25
                    ? `${product.name.slice(0, 25)}...`
                    : product.name}
                </h1>
                {product.price && <span>NGN{product.price}₦</span>}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
