import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { BaseLayout, Container, Quantity } from "../components/common";

interface Props {}

const CartPage = (props: Props) => {
  return (
    <Container>
      <div className="mt-24 sm:mt-6 mb-6">
        <span className="text-3xl text-[color:var(--primary)]">Giỏ hàng</span>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-8/12 pr-0 lg:pr-2">
          <div className="flex flex-col sm:flex-row bg-white shadow-md px-4 py-6">
            <div className="relative w-full sm:w-4/12 xl:w-3/12 h-64 mr-4 mb-4 sm:mb-0">
              <Image src="/p1.png" alt="product" layout="fill" />
            </div>
            <div className="flex flex-1">
              <div className="w-5/12">
                <span className="font-bold">Gấu chó</span>
                <span className="block mb-2">45m</span>
                <span className="block font-bold">123,000 đ</span>
              </div>

              <div className="w-6/12">
                <Quantity />
              </div>

              <div className="w-1/12 flex justify-end items-end">
                <FaTrash className="w-5 h-5 cursor-pointer" />
              </div>
            </div>
          </div>
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
                <Link href="checkout" passHref>
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
