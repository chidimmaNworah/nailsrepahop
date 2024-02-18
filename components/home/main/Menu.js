import React from "react";
import styles from "./styles.module.scss";
import {
  GiLargeDress,
  GiClothes,
  Gi3DHammer,
  GiWatch,
  GiBallerinaShoes,
  GiHeadphones,
  GiHealthCapsule,
  GiSportMedal,
  GiBigDiamondRing,
} from "react-icons/gi";
import { MdOutlineSportsEsports, MdOutlineSmartToy } from "react-icons/md";
import { BiCameraMovie, BiGift, BiCategory } from "react-icons/bi";
import { FaBaby } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { BsPhoneVibrate } from "react-icons/bs";
import { menuArray } from "@/data/home";
import Link from "next/link";

export default function Menu() {
  return (
    <div className={styles.menu}>
      <ul>
        <li>
          <a className={styles.menu__header}>
            <BiCategory />
            <b>Categories</b>
          </a>
        </li>
        <div className={styles.menu__list}>
          {menuArray.map((item, i) => (
            <li>
              <Link href={item.link} legacyBehavior>
                <a>
                  {i == 0 ? (
                    <GiLargeDress />
                  ) : i == 1 ? (
                    <GiClothes />
                  ) : i == 2 ? (
                    <GiHeadphones />
                  ) : i == 3 ? (
                    <GiWatch />
                  ) : i == 4 ? (
                    <HiOutlineHome />
                  ) : i == 5 ? (
                    <GiHealthCapsule />
                  ) : i == 6 ? (
                    <GiBigDiamondRing />
                  ) : i == 7 ? (
                    <FaBaby />
                  ) : i == 8 ? (
                    <MdOutlineSmartToy />
                  ) : i == 9 ? (
                    <BiGift />
                  ) : i == 10 ? (
                    <Gi3DHammer />
                  ) : (
                    ""
                  )}
                  {/* <span>{item.name}</span> */}
                </a>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
