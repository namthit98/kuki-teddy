import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navigation.module.css";

import { FaFacebookF, FaYoutube } from "react-icons/fa";

interface Props {}

export const Navigation = (props: Props) => {
  return (
    <div className={styles["navigation-wrapper"]}>
      <aside className={styles["navigation"]}>
        <Link href="/">
          <a className={styles["navigation__logo"]}>
            <div className="w-10 h-10 relative mr-4">
              <Image src="/kuki-logo.png" alt="navigation-logo" layout="fill" />
            </div>
            <h2>Kuki Teddy</h2>
          </a>
        </Link>

        {/* <nav className={styles["navigation__menu"]}>
          <ul>
            <li className={styles["navigation__menu-item"]}>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className={styles["navigation__menu-item"]}>
              <Link href="/cart">
                <a>Giỏ hàng</a>
              </Link>
            </li>
            <li className={styles["navigation__menu-item"]}>
              <Link href="/contact">
                <a>Liên hệ</a>
              </Link>
            </li>
          </ul>
        </nav> */}
        {/* 
        <div className={styles["navigation__socials"]}>
          <ul className={styles["navigation__socials-list"]}>
            <li>
              <FaFacebookF />
            </li>
            <li>
              <FaYoutube />
            </li>
          </ul>
        </div>
       */}
      </aside>
    </div>
  );
};
