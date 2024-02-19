import Link from "next/link";
import styles from "./styles.module.scss";
import { MdFlashOn } from "react-icons/md";
export default function FlashCard({ item }) {
  // console.log(products);
  return (
    <>
      {/* {product.map()} */}
      {item.subProducts.map((product, i) => (
        <div className={styles.card} key={i}>
          <div className={styles.card__img}>
            <Link href={`/product/${item.slug}?style=${0}&size=${0}`}>
              <img src={product.images[i].url} alt="" />
            </Link>
            <div className={styles.flash}>
              <MdFlashOn />
              <span>-{product.discount}%</span>
            </div>
          </div>
          <div className={styles.card__price}>
            <span>
              ₦
              {(
                product.sizes[0].price -
                product.sizes[0].price / product.discount
              ).toFixed(2)}
            </span>
            <span>
              -₦
              {(
                product.sizes[0].price -
                (product.sizes[0].price -
                  product.sizes[0].price / product.discount)
              ).toFixed(2)}
            </span>
          </div>
          <div className={styles.card__bar}>
            <div
              className={styles.card__bar_inner}
              style={{ width: "75%" }}
            ></div>
          </div>
          <div className={styles.card__percentage}>{product.sold}%</div>
        </div>
      ))}
    </>
  );
}
