import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Ad from "./Ad";
import Top from "./Top";
import Main from "./Main";

export default function Header({ country, searchHandler }) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = window.innerWidth * 0.5; // 50% of viewport width
      setIsSticky(scrollPosition > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header}`}>
      <Ad />
      <Top country={country} />
      <nav className={`${styles.done} ${isSticky ? "sticky top-0" : ""}`}>
        <Main searchHandler={searchHandler} />
      </nav>
    </header>
  );
}
