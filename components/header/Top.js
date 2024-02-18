import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import { motion, Variants } from "framer-motion";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";

export default function Top({ country }) {
  const { data: session } = useSession();
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          {country && (
            <li className={styles.li}>
              <img src={country.flag} alt="nigerian_flag" />
              <span>
                {country.name} / {country.code}
              </span>
            </li>
          )}

          <li className={styles.li}>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>
          <li className={styles.li}>
            <span>Customer Service</span>
          </li>
          <li className={styles.li}>
            <span>Help</span>
          </li>
          {session ? (
            <li className={styles.li}>
              <BsSuitHeart />
              <Link href="/profile/wishlist">
                <span>Wishlist</span>
              </Link>
            </li>
          ) : (
            ""
          )}

          <li
            className={styles.li}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {session ? (
              // <li>
              <div className={styles.flex}>
                <img src={session.user.image} alt="user_image" />
                <span>{session.user.name}</span>
                <RiArrowDropDownFill />
              </div>
            ) : (
              // </li>
              // <li>
              <div className={styles.flex}>
                <RiAccountPinCircleLine />
                <span>Account</span>
                <RiArrowDropDownFill />
              </div>
              // </li>
            )}
            {visible && <UserMenu session={session} />}
          </li>
        </ul>
      </div>
    </div>
  );
}
