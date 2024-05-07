import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import { motion, Variants } from "framer-motion";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useState, useEffect } from "react"; // Import useEffect
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";

export default function Top({ country }) {
  const { data: session } = useSession();
  const [visible, setVisible] = useState(false);

  // Add useEffect to delay hiding the UserMenu
  useEffect(() => {
    let timer;
    if (!visible) {
      // Hide UserMenu after 500ms if mouse leaves the menu area
      timer = setTimeout(() => {
        setVisible(false);
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div className={styles.medium_scrn}>
          <Link href="/" className={styles.logo}>
            <img src="/nails_republic_icon.png" alt="" width={30} />
            <h1>
              NAILS <span>REPUBLIK</span>
            </h1>
          </Link>
        </div>
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
            <motion.div
              initial={{ opacity: 1, y: -20 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
              transition={{ duration: 0.2 }}
              // style={{ position: "absolute", top: "100%", left: 0 }}
            >
              {visible && <UserMenu session={session} />}
            </motion.div>
          </li>
        </ul>
      </div>
    </div>
  );
}
