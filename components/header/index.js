import React from "react";
import styles from "./styles.module.scss";
import Ad from "./Ad";
import Top from "./Top";
import Main from "./Main";

export default function Header({ country, searchHandler }) {
  return (
    <header className={`${styles.header}`}>
      <Ad />
      <Top country={country} />
      <nav className={`${styles.done} sticky top-0`}>
        <Main searchHandler={searchHandler} />
      </nav>
    </header>
  );
}
