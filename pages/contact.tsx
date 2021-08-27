import React from "react";
import { BaseLayout, Container } from "../components/common";
import { HiLocationMarker } from "react-icons/hi";
import { FaPhone } from "react-icons/fa";

interface Props {}

const ContactPage = (props: Props) => {
  return (
    <Container>
      <div className="mt-24 sm:mt-6 mb-6">
        <span className="text-3xl text-[color:var(--primary)]">Liên hệ</span>
      </div>
      <div className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2095.2967929072925!2d106.34245658703023!3d20.444422200009388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135e4d54852055f%3A0xc5c11858efa9af34!2zNzctNzkgSGFpIELDoCBUcsawbmcsIFAuIEzDqiBI4buTbmcsIFRow6FpIELDrG5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1630055633774!5m2!1sen!2s"
          height="550"
          allowFullScreen={true}
          loading="lazy"
          className="w-full"
        ></iframe>
      </div>
      <div className="flex flex-col md:flex-row my-10 min-h-96">
        <div className="w-full md:w-6/12 mb-10 md:mb-0 pr-10">
          <ul>
            <li className="flex items-center mb-6">
              <FaPhone className="w-8 h-8 mr-4 text-[color:var(--primary)]" />
              <div className="flex flex-col">
                <span className="font-bold">Phone</span>
                <span>038 402 2929</span>
              </div>
            </li>

            <li className="flex items-center">
              <HiLocationMarker className="w-8 h-8 mr-4 text-[color:var(--primary)]" />
              <div className="flex flex-col">
                <span className="font-bold">Địa chỉ</span>
                <span>79 Hai Bà Trưng, thành phố Thái Bình</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-6/12 flex flex-wrap justify-between ">
          <div className="w-6/12 pr-4">
            <input
              type="text"
              placeholder="Họ và tên"
              className="w-full border-2 border-gray-200 pl-4 py-2 outline-none"
            />
          </div>

          <div className="w-6/12 pl-4">
            <input
              type="text"
              placeholder="Số điện thoại"
              className="w-full border-2 border-gray-200 pl-4 py-2 outline-none"
            />
          </div>

          <div className="w-full">
            <textarea
              placeholder="Lời nhắn"
              className="resize-none w-full border-2 border-gray-200 pl-4 py-2 mt-5 outline-none"
              rows={5}
            />
          </div>

          <button className="mt-4 w-full font-bold text-white uppercase text-lg py-2 rounded-md bg-[color:var(--primary)] mb-2">
            Gửi
          </button>
        </div>
      </div>
    </Container>
  );
};

ContactPage.Layout = BaseLayout;

export default ContactPage;
