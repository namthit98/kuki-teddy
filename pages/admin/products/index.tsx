import React, { useEffect } from "react";
import Image from "next/image";
import axios from "../../../services/axios";
import { AdminLayout } from "../../../components/common";
import { useState } from "react";
import { BACKEND_URL } from "../../../constants/core.constant";

interface Props {}

interface IImage {
  _id: string;
  filename: string;
  path: string;
}

interface IProduct {
  _id: string;
  sku: string;
  name: string;
  price: number;
  salePrice: number;
  images: IImage[];
}

const productLoader = ({ src }: any) => {
  return `${BACKEND_URL}/${src}`;
};

const ProductList = (props: Props) => {
  const [products, setProducts] = useState([]);

  const handleDelete = (_id: string) => {
    if (window.confirm("Bạn chắc chắn muốn xóa chứ?")) {
      axios({
        method: "delete",
        url: `/products/${_id}`,
      })
        .then(function () {
          //handle success
          setProducts(products.filter((x: IProduct) => x._id !== _id));
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    }
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "/products",
    })
      .then(function (response) {
        //handle success
        console.log(response);
        setProducts(response.data);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }, []);

  return (
    <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-8 mt-10">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Sale Price
                    </th>
                    {/* <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th> */}
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product: IProduct) => (
                    <tr key={product._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="relative flex-shrink-0 h-32 w-32">
                            {product.images && product.images.length ? (
                              <Image
                                loader={productLoader}
                                src={product.images[0].path}
                                alt={product.images[0].filename}
                                layout="fill"
                              />
                            ) : null}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.sku}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          đ
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span> */}
                        <div className="text-sm text-gray-900">
                          {product.salePrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          đ
                        </div>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.name}
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          onClick={handleDelete.bind(null, product._id)}
                          className="cursor-pointer text-indigo-600 hover:text-indigo-900"
                        >
                          Delete
                        </a>
                        &nbsp;&nbsp;&nbsp;
                        <a className="cursor-pointer text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductList.Layout = AdminLayout;

export default ProductList;
