import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { BaseLayout } from "../../components/common";
import { ImageSlide, ProductInfo } from "../../components/product-detail";
import { IProduct } from "../../interfaces";
import { listProducts } from "../../services/products.service";
import { convertToSlug } from "../../utils/convert-to-slug";

interface Props {
  product: IProduct;
}

const ProductDetailPage = ({ product }: Props) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:pt-14 justify-center items-center">
        <div className="w-full mb-6 lg:mb-0 lg:w-5/12">
          <ImageSlide images={product.images} />
        </div>

        <div className="w-full lg:w-6/12 px-4 self-start">
          <ProductInfo product={product} />
        </div>
      </div>
      {product.Description ? (
        <div className="w-full px-4 lg:px-10 pt-4">
          <h3 className="text-xl text-[color:var(--text-color)] border-[color:var(--primary)] uppercase font-bold border-b-2 my-3">
            Mô tả
          </h3>
          <div
            className="whitespace-pre mb-20"
            dangerouslySetInnerHTML={{ __html: product.Description }}
          ></div>
        </div>
      ) : null}
    </>
  );
};

ProductDetailPage.Layout = BaseLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  let products = [];
  const response = await listProducts();
  if (response && response.data && response.data.length) {
    products = response.data;
  }

  const paths = products?.map((product: IProduct) => ({
    params: { slug: `${convertToSlug(product.name)}.${product.sku}` },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let products = [];

  const response = await listProducts();
  if (response && response.data && response.data.length) {
    products = response.data;
  }

  const product = products.find(
    (product: IProduct) =>
      product.sku === params?.slug?.toString().split(".").pop()
  );

  product.variants.forEach((pro: any) => {
    if (!pro.hasOwnProperty("size")) pro.size = "";
    if (!pro.hasOwnProperty("color")) pro.color = "";
  });

  // Pass post data to the page via props
  return {
    props: {
      product,
    },
  };
};

export default ProductDetailPage;
