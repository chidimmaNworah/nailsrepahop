import { BsArrowRightCircle } from "react-icons/bs";
import styles from "./styles.module.scss";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
export default function NailArt({ header, products, background }) {
  // console.log("products: ", products);
  const isMedium = useMediaQuery({ query: "(max-width:1300px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  const categoryOptions = ["Nail Art", "Fashion", "Accessories"];
  return (
    <div className={styles.category} style={{ background: `${background}` }}>
      <div className={styles.category__header}>
        <h1>{header}</h1>
        <Link href="/browse?category=62c2bdd58b564896ec16cc6b">
          <BsArrowRightCircle />
        </Link>
      </div>
      <div className={styles.category__products}>
        {products
          // .slice(0, isMobile ? 6 : isMedium ? 4 : 6)
          .slice(0, 4)
          .reverse()
          .map((product, i) => {
            return categoryOptions.includes(product.category.name) ? (
              <div className={styles.product} key={product._id}>
                <Link href={`/product/${product.slug}?style=${0}&size=${0}`}>
                  <img src={product.subProducts[0].images[0].url} alt="" />
                </Link>
              </div>
            ) : (
              ""
            );
          })}
      </div>
    </div>
  );
}
