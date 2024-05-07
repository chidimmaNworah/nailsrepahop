import Link from "next/link";
import styles from "./styles.module.scss";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";
export default function Main({ searchHandler }) {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.search || "");
  const { cart } = useSelector((state) => ({ ...state }));
  // console.log(cart);
  const handleSearch = (e) => {
    e.preventDefault();
    if (router.pathname !== "/browse") {
      if (query.length > 1) {
        router.push(`/browse?search=${query}`);
      }
    } else {
      searchHandler(query);
    }
  };
  return (
    <div className={`${styles.main} relative`}>
      <div className={`${styles.main__container} sticky top-0`}>
        {/* <Link href="/" legacyBehavior>
          <a className={styles.logo}>
            <img src="/logo1.png" alt="" />
          </a>
        </Link> */}
        <div className={styles.large_screen}>
          <Link href="/" className={styles.logo}>
            <img src="/nails_republic_icon.png" alt="" width={30} />
            <h1>
              NAILS <span>REPUBLIK</span>
            </h1>
          </Link>
        </div>
        <form onSubmit={(e) => handleSearch(e)} className={styles.search}>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className={styles.search__icon}>
            <RiSearch2Line />
          </button>
        </form>
        <Link href="/cart" legacyBehavior>
          <a className={styles.cart}>
            <FaOpencart />
            <span>{cart.cartItems.length}</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
