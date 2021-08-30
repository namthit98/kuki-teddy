import React from "react";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import styles from "./Quantity.module.css";

interface Props {
  defaultValue: number;
  onChange?: (value: string) => void;
}

export const Quantity = ({ defaultValue, onChange }: Props) => {
  const [quantity, setQuantity] = useState(
    defaultValue ? defaultValue.toString() : "1"
  );

  const changeQuantity = (value: number) => {
    if (value < 0) {
      setQuantity("0");
      return;
    }

    if (value === 0) {
      setQuantity("0");
      return;
    }

    if (value >= 100) {
      setQuantity("99");
      return;
    }

    setQuantity(value.toString());
    if (onChange) onChange(value.toString());
  };

  return (
    <div className={styles["quantity"]}>
      <button
        className="w-10 h-10 inline-flex justify-center items-center bg-white border-[1px] border-gray-200"
        onClick={() => changeQuantity(+quantity - 1)}
        onBlur={() => {
          if (quantity.toString() === "0") {
            setQuantity("1");
          }
        }}
      >
        <FaMinus className="w-3 h-3" />
      </button>
      <input
        value={quantity}
        className="w-14 h-10 inline-flex justify-center items-center bg-white border-[1px] border-gray-200 text-center outline-none"
        type="number"
        onChange={(event) => changeQuantity(+event.target.value)}
        onBlur={() => {
          if (quantity.toString() === "0") {
            setQuantity("1");
          }
        }}
      />
      <button
        className="w-10 h-10 inline-flex justify-center items-center bg-white border-[1px] border-gray-200"
        onClick={() => changeQuantity(+quantity + 1)}
        onBlur={() => {
          if (quantity.toString() === "0") {
            setQuantity("1");
          }
        }}
      >
        <FaPlus className="w-3 h-3" />
      </button>
    </div>
  );
};
