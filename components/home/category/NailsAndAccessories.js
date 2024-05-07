import { BsArrowRightCircle } from "react-icons/bs";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
// const isMedium = useMediaQuery({ query: "(max-width:850px)" });
export default function NailArt({ header, products, background }) {
  // console.log("products: ", products);
  const isMedium = useMediaQuery({ query: "(max-width:1300px)" });
  const isMobile = useMediaQuery({ query: "(min-width:550px)" });

  const categoryOptions = [
    "Nail Art",
    "Fashion",
    "Accessories",
    "Health & Treatment",
  ];
  const filteredProducts = products.filter((product) =>
    categoryOptions.includes(product.category.name)
  );

  let slicedProducts;
  if (!isMobile) {
    slicedProducts = filteredProducts.slice(0, 4);
  } else {
    slicedProducts = filteredProducts.slice(0, 6);
  }
  return (
    <div className={styles.category} style={{ background: `${background}` }}>
      <div className={styles.category__header_light}>
        <h1>{header}</h1>
        <Link href="/browse?category=62c2bdd58b564896ec16cc6b">
          <BsArrowRightCircle />
        </Link>
      </div>
      {!isMobile ? (
        <div className={styles.category__products}>
          {slicedProducts.reverse().map((product, i) => (
            <div className={styles.product} key={i}>
              <Link href={`/product/${product.slug}?style=${0}&size=${0}`}>
                <img src={product.subProducts[0].images[0].url} alt="" />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.category__products}>
          {slicedProducts.reverse().map((product, i) => (
            <div className={styles.product} key={i}>
              <Link href={`/product/${product.slug}?style=${0}&size=${0}`}>
                <img src={product.subProducts[0].images[0].url} alt="" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
