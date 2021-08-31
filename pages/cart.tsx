import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { BaseLayout, Container, Quantity } from "../components/common";
import { useCartContext } from "../context/cart.context";
import { listProducts } from "../services/products.service";
import { IProduct } from "../interfaces";
import { BACKEND_URL } from "../constants/core.constant";
import get from "lodash.get";
import { ImageLoader } from "../components/common/ImageLoader";

interface Props {}

const CartPage = (props: Props) => {
  const cartState = useCartContext();
  const [forceUpdate, setForceUpdate] = useState(0);
  const [productMap, setProductMap] = useState<any>(null);
  const totalRef = useRef<any>(0);

  const fetchProducts = async () => {
    const productRes = await listProducts();
    if (productRes && productRes.data && productRes.data.length) {
      const map = new Map();
      productRes.data.forEach((pro: any) => {
        pro.Variants.forEach((x: any) => {
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

  totalRef.current = 0;

  return (
    <Container>
      <div className="mt-24 sm:mt-6 mb-6">
        <span className="text-3xl text-[color:var(--primary)]">Giỏ hàng</span>
      </div>

      {cartState && cartState.cart.length ? (
        <div className="flex flex-col">
          <div className="w-full pr-0 lg:pr-2 mb-10">
            {cartState.cart && cartState.cart.length
              ? cartState.cart.map((x, index) => {
                  const prod: IProduct = productMap.get(x._id);
                  const variant = prod.Variants.find(
                    (v) => v.color === x.color && v.size === x.size
                  );
                  if (variant) {
                    totalRef.current = totalRef.current +=
                      (variant?.isSale ? +variant.salePrice : +variant.price) *
                      x.quantity;
                  }

                  return (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row bg-white shadow-md px-4 py-6"
                    >
                      <div className="relative w-full sm:w-5/12 xl:w-3/12 h-64 mr-4 mb-4 sm:mb-0">
                        <Image
                          loader={ImageLoader}
                          src={`${get(prod, "images.0.url", "")}`}
                          alt="product"
                          layout="fill"
                        />
                      </div>
                      <div className="flex flex-1">
                        <div className="w-6/12">
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

                        <div className="w-5/12">
                          <Quantity defaultValue={x.quantity} />
                        </div>

                        <div className="w-1/12 flex justify-end items-end">
                          <FaTrash
                            className="w-5 h-5 cursor-pointer"
                            onClick={() => {
                              cartState.removeCartItem(x);
                              setForceUpdate(forceUpdate + 1);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>

          <div className="w-96 mt-8 lg:mt-0 pl-0 lg:pl-2 self-end">
            <div className="bg-white shadow-md">
              <div className="px-4 py-3">
                {/* <div className="flex justify-between border-b-[1px] border-gray-200 py-2">
                <span>Tổng tiền</span>
                <span>123.000đ</span>
              </div> */}
                {/* 
              <div className="flex justify-between border-b-[1px] border-gray-200 py-2">
                <span>Phí ship</span>
                <span>10.000đ</span>
              </div> */}

                <div className="flex justify-between border-b-[1px] border-gray-200 py-2">
                  <span className="font-bold text-2xl">Tổng cộng</span>
                  <span className="font-bold text-2xl">
                    {totalRef.current
                      ? totalRef.current
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : 0}
                    đ
                  </span>
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
      ) : (
        <h1 className="text-4xl mt-20 text-center">
          Không có sản phẩm trong giỏ hàng
        </h1>
      )}
    </Container>
  );
};

CartPage.Layout = BaseLayout;

export default CartPage;
