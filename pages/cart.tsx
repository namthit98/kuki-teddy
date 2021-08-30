import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { BaseLayout, Container, Quantity } from "../components/common";
import { useCartContext } from "../context/cart.context";
import { listProducts } from "../services/products.service";
import { IProduct } from "../interfaces";
import { BACKEND_URL } from "../constants/core.constant";
import get from "lodash.get";

interface Props {}

let productMap: any;

const CartPage = (props: Props) => {
  const cartState = useCartContext();
  const [productMap, setProductMap] = useState<any>(null);

  const fetchProducts = async () => {
    const productRes = await listProducts();
    if (productRes && productRes.data && productRes.data.length) {
      const map = new Map();
      productRes.data.forEach((pro: any) => {
        pro.variants.forEach((x: any) => {
          if (!x.hasOwnProperty("size")) x.size = "";
          if (!x.hasOwnProperty("color")) x.color = "";
        });
      });
      productRes.data.forEach((x: IProduct) => {
        map.set(x._id, x);
      });
      setProductMap(map);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!productMap) return null;

  return (
    <Container>
      <div className="mt-24 sm:mt-6 mb-6">
        <span className="text-3xl text-[color:var(--primary)]">Giỏ hàng</span>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-8/12 pr-0 lg:pr-2 mb-10">
          {cartState.cart && cartState.cart.length
            ? cartState.cart.map((x, index) => {
                const prod: IProduct = productMap.get(x._id);
                const variant = prod.variants.find(
                  (v) => v.color === x.color && v.size === x.size
                );
                return (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row bg-white shadow-md px-4 py-6"
                  >
                    <div className="relative w-full sm:w-4/12 xl:w-3/12 h-64 mr-4 mb-4 sm:mb-0">
                      <Image
                        src={`${BACKEND_URL}${get(prod, "images.0.url", "")}`}
                        alt="product"
                        layout="fill"
                      />
                    </div>
                    <div className="flex flex-1">
                      <div className="w-5/12">
                        <span className="font-bold">{prod.name}</span>
                        <span className="block mb-2">{`${
                          x.size ? `${x.size}${x.color ? " - " : ""}` : ""
                        }${x.color || ""}`}</span>
                        <span className="block font-bold">
                          {variant
                            ? variant.isSale
                              ? variant.salePrice.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )
                              : variant.price.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )
                            : ""}
                          đ
                        </span>
                      </div>

                      <div className="w-6/12">
                        <Quantity defaultValue={x.quantity} />
                      </div>

                      <div className="w-1/12 flex justify-end items-end">
                        <FaTrash className="w-5 h-5 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>

        <div className="w-full lg:w-4/12 mt-8 lg:mt-0 pl-0 lg:pl-2">
          <div className="bg-white shadow-md">
            <div className="px-4 py-3">
              <div className="flex justify-between border-b-[1px] border-gray-200 py-2">
                <span>Tổng tiền</span>
                <span>123.000đ</span>
              </div>

              <div className="flex justify-between border-b-[1px] border-gray-200 py-2">
                <span>Phí ship</span>
                <span>10.000đ</span>
              </div>

              <div className="flex justify-between border-b-[1px] border-gray-200 py-2">
                <span className="font-bold">Tổng cộng</span>
                <span className="font-bold">133.000đ</span>
              </div>

              <div className="mt-6">
                <Link href="/checkout" passHref>
                  <button className="w-full font-bold text-white uppercase text-lg py-2 rounded-md bg-[color:var(--primary)] mb-2">
                    Thanh toán
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

CartPage.Layout = BaseLayout;

export default CartPage;
