import React from "react";
import { IProduct } from "../../../interfaces";
import { ProductCard } from "../../common";
import { Pagination } from "../../common/Pagination";

interface Props {
  products: IProduct[];
}

export const ProductList = ({ products }: Props) => {
  const onPageChanged = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-wrap -mx-1 lg:-mx-2 xl:-mx-3">
        {products.map((product: IProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="w-full flex justify-center my-12">
        <Pagination
          totalRecords={200}
          pageLimit={10}
          pageNeighbours={1}
          onPageChanged={onPageChanged}
        />
      </div>
    </>
  );
};
