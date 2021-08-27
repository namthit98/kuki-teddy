import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";

interface Props {
  _id: string;
  imageUrl: string;
  name: string;
  pricing: number;
}

export const ProductCard = ({ _id, imageUrl, name, pricing }: Props) => {
  return (
    <div className={styles["product-card-wrapper"]}>
      <Link href="/products/1234" passHref>
        <div className={styles["product-card"]}>
          <div className={styles["product-card__image"]}>
            <Image src={imageUrl} alt="product 1" layout="fill" />
          </div>

          <div className={styles["product-card__content"]}>
            <h3 className={styles["product-card__name"]}>{name}</h3>
            <span className={styles["product-card__pricing"]}>{pricing}</span>
            <div className={styles["product-card__actions"]}>
              <button>Mua hàng</button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
