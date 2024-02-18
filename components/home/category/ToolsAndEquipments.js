import { BsArrowRightCircle } from "react-icons/bs";
import styles from "./styles.module.scss";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
export default function ToolsAndEquipments({ header, products, background }) {
  const isMedium = useMediaQuery({ query: "(max-width:1300px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  return (
    <div className={styles.category} style={{ background: `${background}` }}>
      <div className={styles.category__header}>
        <h1>{header}</h1>
        <Link href="/browse?category=62c46ff0062128444ad59193">
          <BsArrowRightCircle />
        </Link>
      </div>
      <div className={styles.category__products}>
        {products.slice(0, isMobile ? 6 : isMedium ? 4 : 6).map(
          (product, i) =>
            product.category.name === "Tools & Equipments" && (
              <div className={styles.product}>
                <img src={product.subProducts[0].images[0].url} alt="" />
              </div>
            )
        )}
      </div>
    </div>
  );
}
