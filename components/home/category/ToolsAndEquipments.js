import { BsArrowRightCircle } from "react-icons/bs";
import styles from "./styles.module.scss";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
export default function ToolsAndEquipments({ header, products, background }) {
  const isMedium = useMediaQuery({ query: "(max-width:1300px)" });
  const isMobile = useMediaQuery({ query: "(min-width:550px)" });
  const categoryOptions = ["Combo", "Tools", "Tools & Equipments"];
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
      <div className={styles.category__header}>
        <h1>{header}</h1>
        <Link href="/browse?category=62c46ff0062128444ad59193">
          <BsArrowRightCircle />
        </Link>
      </div>

      <div className={styles.category__products}>
        {slicedProducts.reverse().map((product, i) => (
          <div className={styles.product} key={i}>
            <Link href={`/product/${product.slug}?style=${0}&size=${0}`}>
              <img src={product.subProducts[0].images[0].url} alt="" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
