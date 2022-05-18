import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { VARIANT_DEFAULT } from "../../../constants/core.constant";
import { ICartItem, useCartContext } from "../../../context/cart.context";
import { IProduct } from "../../../interfaces";
import { Quantity } from "../../common";
import styles from "./ProductInfo.module.css";

interface Props {
  product: IProduct;
}

const getSizes = (product: IProduct) => {
  return product.Variants.map((x) => x.size || "").filter(
    (x) => x !== VARIANT_DEFAULT
  );
};

const getColors = (product: IProduct) => {
  return product.Variants.map((x) => x.color || "")
    .filter((x) => x !== VARIANT_DEFAULT)
    .filter((x) => Boolean(x));
};

export const ProductInfo = ({ product }: Props) => {
  const cartState = useCartContext();
  const [currentVariant, setCurrentVariant] = useState<any>(null);
  const [currentSize, setCurrentSize] = useState<string>("");
  const [currentColor, setCurrentColor] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("1");

  const sizes = Array.from(new Set(getSizes(product)));
  const colors = Array.from(new Set(getColors(product)));

  const handleAddToCart = () => {
    const data: ICartItem = {
      _id: product._id,
      sku: product.sku,
      color: currentColor,
      size: currentSize,
      quantity: +quantity,
    };
    cartState.addToCart(data);
    console.log(cartState);
  };

  useEffect(() => {
    const variant = product.Variants.find(
      (x) => x.size === currentSize && x.color === currentColor
    );
    if (variant) {
      setCurrentVariant(variant);
    }
  }, [currentSize, currentColor, product]);

  useEffect(() => {
    if (sizes && sizes.length) setCurrentSize(sizes[0]);
    if (colors && colors.length) setCurrentColor(colors[0]);
  }, [colors, sizes]);

  return (
    <div className={styles["product-detail"]}>
      <h2 className={styles["product-detail__name"]}>{product.name}</h2>
      <div className={styles["product-detail__pricing-wrapper"]}>
        {currentVariant && currentVariant.isSale ? (
          <span
            className={`${styles["product-detail__pricing"]} text-2xl line-through`}
            style={{ color: "black", fontWeight: 600 }}
          >
            {currentVariant
              ? currentVariant.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : ""}
            đ
          </span>
        ) : null}
        <span
          className={`${styles["product-detail__pricing"]}${
            currentVariant && currentVariant.isSale
              ? " text-4xl ml-4"
              : " text-4xl"
          }`}
        >
          {currentVariant
            ? currentVariant[
                currentVariant.isSale ? "salePrice" : "price"
              ].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : ""}
          đ
        </span>
      </div>
      {sizes && sizes.length ? (
        <div className="flex my-4">
          <span className="mr-10 w-3/12">Kích thước</span>
          <div className="flex-1">
            {sizes.map((x) => {
              return (
                <button
                  key={x}
                  className={`${styles["product-detail__variant-button"]}${
                    currentSize && currentSize === x
                      ? ` ${styles["product-detail__variant-button--active"]}`
                      : ""
                  }`}
                  onClick={() => setCurrentSize(x)}
                >
                  {x}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
      {colors && colors.length ? (
        <div className="flex my-4">
          <span className="mr-10 w-3/12">Màu sắc</span>
          <div className="flex-1">
            {colors.map((x) => {
              return (
                <button
                  key={x}
                  className={`${styles["product-detail__variant-button"]}${
                    currentColor && currentColor === x
                      ? ` ${styles["product-detail__variant-button--active"]}`
                      : ""
                  }`}
                  onClick={() => setCurrentColor(x)}
                >
                  {x}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
      {/* <div className="flex my-4">
        <span className="mr-10 w-3/12 flex items-center">Số lượng</span>
        <Quantity onChange={(v) => setQuantity(v)} />
      </div>
      <div className={styles["product-detail__actions"]}>
        <button className="w-full font-bold text-white uppercase text-lg py-2 rounded-md bg-[color:var(--primary)] mb-2">
          Mua ngay
        </button>
        <button
          onClick={handleAddToCart}
          className="w-full font-bold text-[color:var(--primary)] uppercase text-lg py-2 rounded-md border-2 border-[color:var(--primary)] hover:bg-[color:var(--primary)] hover:text-white transition duration-200"
        >
          Thêm vào giỏ hàng
        </button>
      </div> */}
    </div>
  );
};
