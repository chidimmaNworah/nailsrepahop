import Link from "next/link";
import styles from "./styles.module.scss";
import CircledIconBtn from "../buttons/circledIconBtn";

export default function Ad() {
  return (
    <Link href="/browse">
      <div className={styles.ad}></div>
      {/* <div className={styles.adText}>
        <div className="flex flex-wrap bg-red-900 py-1 px-3 w-full justify-center gap-5">
          <p className="text-gray-300">SAVE 90% BONUS COUPON</p>
          <Link href="/discounts" className="shadow-1">
            {" "}
            <CircledIconBtn type="submit" text="Shop now" />
          </Link>
        </div>
      </div> */}
    </Link>
  );
}
