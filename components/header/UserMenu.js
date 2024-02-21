import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { signOut, signIn } from "next-auth/react";

export default function UserMenu({ session }) {
  return (
    <div className={styles.menu}>
      <h4>Welcome to Nails Republic!</h4>
      {session ? (
        <div className={styles.flex}>
          <img
            src={session.user.image}
            alt="user_image"
            className={styles.menu__img}
          />
          <div className={styles.col}>
            <span>Hello,</span>
            <h3>{session.user.name}</h3>
            <span onClick={() => signOut()}>Sign Out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary}>
            <Link href="/signin/#signup">Register</Link>
          </button>
          <button className={styles.btn_outlined} onClick={() => signIn()}>
            Login
          </button>
        </div>
      )}
      {session ? (
        <ul>
          <li>
            <Link href="/profile">Account</Link>
          </li>
          <li>
            <Link href="/profile/orders">My Orders</Link>
          </li>
          <li>
            <Link href="/profile/messages">Message Center</Link>
          </li>
          <li>
            <Link href="/profile/address">Address</Link>
          </li>
          <li>
            <Link href="/profile/wishlist">Wishlist</Link>
          </li>
          {session.user.role == "admin" ? (
            <li>
              <Link href="/admin/dashboard">Admin</Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}
