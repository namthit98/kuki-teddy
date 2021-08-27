import React, { useState } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { BaseLayout, Container, Quantity } from "../components/common";

interface Props {}

const CheckoutPage = (props: Props) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Container>
      <div className="mt-24 sm:mt-6 mb-6">
        <span className="text-3xl text-[color:var(--primary)]">Thanh toán</span>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full order-1 mt-8 lg:mt-0 lg:w-8/12 pr-0 lg:pr-2">
          <div className="flex flex-wrap bg-white shadow-md px-4 py-3">
            <div className="w-6/12 pr-4">
              <input
                type="text"
                placeholder="Họ và tên người mua"
                className="w-full border-[1px] border-gray-200 pl-4 py-2 outline-none"
              />
            </div>

            <div className="w-6/12 pl-4">
              <input
                type="text"
                placeholder="Số điện thoại người mua"
                className="w-full border-[1px] border-gray-200 pl-4 py-2 outline-none"
              />
            </div>

            <div className="flex w-full items-center mt-4">
              <input
                type="checkbox"
                className="mr-2"
                checked={isChecked}
                onChange={(event) => setIsChecked(event.target.checked)}
              />
              <span>Bạn mua để tặng, người nhận là người khác?</span>
            </div>

            {isChecked ? (
              <>
                <div className="w-6/12 pr-4 mt-4">
                  <input
                    type="text"
                    placeholder="Họ và tên người nhận"
                    className="w-full border-[1px] border-gray-200 pl-4 py-2 outline-none"
                  />
                </div>

                <div className="w-6/12 pl-4 mt-4">
                  <input
                    type="text"
                    placeholder="Số điện thoại người nhận"
                    className="w-full border-[1px] border-gray-200 pl-4 py-2 outline-none"
                  />
                </div>
              </>
            ) : null}

            <div className="w-full">
              <textarea
                placeholder="Địa chỉ nhận hàng"
                className="resize-none	 w-full border-2 border-gray-200 pl-4 py-2 mt-5 outline-none"
                rows={2}
              />
            </div>

            <div className="w-full">
              <textarea
                placeholder="Yêu cầu thêm"
                className="resize-none w-full border-2 border-gray-200 pl-4 py-2 mt-5 outline-none"
                rows={5}
              />
            </div>

            <button className="mt-8 w-full font-bold text-white uppercase text-lg py-2 rounded-md bg-[color:var(--primary)] mb-2">
              Đặt hàng
            </button>
          </div>
        </div>

        <div className="w-full order-0 lg:order-2 lg:w-4/12 mt-8 lg:mt-0 pl-0 lg:pl-2">
          <div className="bg-white shadow-md">
            <div className="px-4 py-3">
              <div>
                <span>Mã giảm giá</span>
                <div className="flex flex-wrap">
                  <input
                    placeholder="Nhập mã giảm giá"
                    className="flex-1 outline-none mr-2 border-[1px] px-4 py-2 mb-2 rounded-md"
                  />
                  <button className="text-white py-1 px-2 rounded-md mb-2 bg-[color:var(--primary)]">
                    Xác nhận
                  </button>
                </div>
              </div>

              <div className="flex justify-between border-b-[1px] border-gray-200 py-2 mt-4">
                <span>Tổng tiền</span>
                <span>125.000đ</span>
              </div>

              <div className="flex justify-between border-b-[1px] border-gray-200 py-2">
                <span>Phí ship</span>
                <span>10.000đ</span>
              </div>

              <div className="flex justify-between border-b-[1px] border-gray-200 py-2">
                <span>Giám giá</span>
                <span>-15.000đ</span>
              </div>

              <div className="flex justify-between border-b-[1px] border-gray-200 py-2">
                <span className="font-bold">Tổng cộng</span>
                <span className="font-bold">120.000đ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

CheckoutPage.Layout = BaseLayout;

export default CheckoutPage;
