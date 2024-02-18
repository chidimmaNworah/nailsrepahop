import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function Header() {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link href="">Store</Link>
        </li>
        <li>
          <Link href="">Equipments</Link>
        </li>
        <li>
          <Link href="">Products</Link>
        </li>
      </ul>
    </div>
  );
}
