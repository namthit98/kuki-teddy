import React from "react";
import { Quantity } from "../../common";
import styles from "./ProductInfo.module.css";

interface Props {}

export const ProductInfo = (props: Props) => {
  return (
    <div className={styles["product-detail"]}>
      <h2 className={styles["product-detail__name"]}>Gấu chó</h2>
      <div className={styles["product-detail__pricing-wrapper"]}>
        <span className={styles["product-detail__pricing"]}>1234.1442đ</span>
      </div>
      <div className="flex my-4">
        <span className="mr-10 w-3/12">Kích thước</span>
        <div className="flex-1">
          <button
            className={`${styles["product-detail__variant-button"]} ${styles["product-detail__variant-button--active"]}`}
          >
            45m
          </button>
          <button className={styles["product-detail__variant-button"]}>
            60m
          </button>
          <button className={styles["product-detail__variant-button"]}>
            120m
          </button>
        </div>
      </div>
      <div className="flex my-4">
        <span className="mr-10 w-3/12">Số lượng</span>
        <Quantity />
      </div>
      <div className={styles["product-detail__actions"]}>
        <button className="w-full font-bold text-white uppercase text-lg py-2 rounded-md bg-[color:var(--primary)] mb-2">
          Mua ngay
        </button>
        <button className="w-full font-bold text-[color:var(--primary)] uppercase text-lg py-2 rounded-md border-2 border-[color:var(--primary)] hover:bg-[color:var(--primary)] hover:text-white transition duration-200">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};
