import styles from "./styles.module.scss";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
export default function ForEntreprenuers({ header, products, bg }) {
  const categoryOptions = ["Combo", "Tools"];

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
          //   1232: {
          //     slidesPerView: 5,
          //   },
          //   1520: {
          //     slidesPerView: 6,
          //   },
        }}
      >
        {products.map((product, i) =>
          categoryOptions.includes(product.category.name) ? (
            <SwiperSlide key={i}>
              <div className={styles.product}>
                <Link href={`/product/${product.slug}?style=${0}&size=${0}`}>
                  <div className={styles.product__img}>
                    <img src={product.subProducts[0].images[0].url} alt="" />
                  </div>
                </Link>
                <div className={styles.product__infos}>
                  <h1>
                    {product.name.length > 25
                      ? `${product.name.slice(0, 25)}...`
                      : product.name}
                  </h1>
                  {product.subProducts[0].sizes[0].price && (
                    <span>NGN {product.subProducts[0].sizes[0].price}₦</span>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ) : null
        )}
      </Swiper>
    </div>
  );
}
