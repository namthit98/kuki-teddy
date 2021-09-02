import React from "react";
import get from "lodash.get";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";
import { IProduct } from "../../../interfaces";
import { BACKEND_URL } from "../../../constants/core.constant";
import { convertToSlug } from "../../../utils/convert-to-slug";
import { ImageLoader } from "../ImageLoader";

interface Props {
  product: IProduct;
}

export const ProductCard = ({ product }: Props) => {
  const productImage = get(product, "images.0.url", "");
  const pricings = Array.from(
    new Set(
      product.Variants.map((el) => [el.price, el.salePrice])
        .flat()
        .filter((x) => Boolean(x))
        .map((x) => +x)
    )
  );

  return (
    <div className={styles["product-card-wrapper"]}>
      <Link
        href={`/products/${convertToSlug(product.name)}.${product.sku}`}
        passHref
      >
        <div className={styles["product-card"]}>
          <Image
            loader={ImageLoader}
            src={`${productImage}`}
            alt="product 1"
            layout="responsive"
            width={512}
            height={512}
          />

          <div className={styles["product-card__content"]}>
            <div className="h-12">
              <h3 className={styles["product-card__name"]}>{product.name}</h3>
            </div>
            {pricings && pricings.length === 1 ? (
              <span className={styles["product-card__pricing"]}>
                {pricings[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ
              </span>
            ) : null}
            {pricings && pricings.length > 1 ? (
              <span className={styles["product-card__pricing"]}>
                {Math.min(...pricings)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                đ ~{" "}
                {Math.max(...pricings)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                đ
              </span>
            ) : null}
            {/* <div className={styles["product-card__actions"]}>
              <button>Mua hàng</button>
            </div> */}
          </div>
        </div>
      </Link>
    </div>
  );
};
