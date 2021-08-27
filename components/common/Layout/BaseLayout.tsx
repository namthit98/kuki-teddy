import React from "react";
import { Drawer } from "../Drawer";
import { Navigation } from "../Navigation";
import styles from "./BaseLayout.module.css";

interface Props {
  children: React.ReactNode;
}

export const BaseLayout = ({ children }: Props) => {
  return (
    <div className={styles["base-layout"]}>
      <Drawer />
      <Navigation />
      <main className={styles["main"]}>{children}</main>
    </div>
  );
};
