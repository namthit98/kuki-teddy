import React from "react";
import { BaseLayout } from "../../components/common";
import { ImageSlide, ProductInfo } from "../../components/product-detail";

interface Props {}

const ProductDetailPage = (props: Props) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:pt-14 justify-center items-center">
        <div className="w-full lg:w-5/12">
          <ImageSlide />
        </div>

        <div className="w-full lg:w-6/12 px-4 self-start">
          <ProductInfo />
        </div>
      </div>
    </>
  );
};

ProductDetailPage.Layout = BaseLayout;

export default ProductDetailPage;
