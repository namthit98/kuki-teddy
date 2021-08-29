import React from "react";
import { useForm } from "react-hook-form";
import { AdminLayout, FileUpload } from "../../../components/common";
import axios from "./../../../services/axios";

let attributes = {
  color: ["Red", "Blue"],
  sizes: ["Small", "Medium", "Large"],
  // material: ['Cotton', 'Wool']
};

const getProducts = (arrays: any) => {
  if (arrays.length === 0) {
    return [[]];
  }

  let results: any = [];
  getProducts(arrays.slice(1)).forEach((product: any) => {
    arrays[0].forEach((value: any) => {
      results.push([value].concat(product));
    });
  });

  return results;
};

const getAllCombinations = (attributes: any) => {
  let attributeNames = Object.keys(attributes);
  // console.log(attributeNames);

  let attributeValues = attributeNames.map((name) => attributes[name]);
  // console.log(attributeValues);

  return getProducts(attributeValues).map((product: any) => {
    let obj: any = {};
    attributeNames.forEach((name, i) => {
      obj[name] = product[i];
    });
    return obj;
  });
};

interface Props {}

const ProductCreate = (props: Props) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [variants, setVariants] = React.useState<any>([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    return;
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    files.forEach((file) => {
      formData.append("images", file);
    });

    axios({
      method: "post",
      url: "/products",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const handleChangeFile = (files: File[]) => {
    setFiles(files);
  };

  const variantsMemo = React.useMemo(() => {
    return variants.map((variant: any, index: number) => {
      return (
        <div
          key={index}
          className="grid grid-cols-6 gap-6 col-span-6 border-b-2 pb-6"
        >
          <div className="col-span-6 sm:col-span-1">
            <label
              htmlFor={`variants[${index}].color`}
              className="block text-sm font-medium text-gray-700"
            >
              Màu sắc
            </label>
            <input
              type="text"
              disabled
              // id={`variants[${index}].color`}
              value={variant.colors}
              // defaultValue={variant.colors}
              // {...register(`variants[${index}].color`)}
              placeholder="Nhập giá bán sản phẩm"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-6 sm:col-span-1">
            <label
              htmlFor={`variants[${index}].size`}
              className="block text-sm font-medium text-gray-700"
            >
              Kích thước
            </label>
            <input
              type="text"
              disabled
              // id={`variants[${index}].size`}
              value={variant.sizes}
              // defaultValue={variant.sizes}
              // {...register(`variants[${index}].size`)}
              placeholder="Nhập giá bán sản phẩm"
              className="disabled mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-6 sm:col-span-1">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Giá bán
            </label>
            <input
              type="number"
              id="price"
              {...register("price")}
              placeholder="Nhập giá bán sản phẩm"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="col-span-6 sm:col-span-1">
            <label
              htmlFor="salePrice"
              className="block text-sm font-medium text-gray-700"
            >
              Giá giảm
            </label>
            <input
              type="number"
              id="salePrice"
              {...register("salePrice")}
              placeholder="Nhập giá sale sản phẩm"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="col-span-6 sm:col-span-2">
            <label
              htmlFor="isSale"
              className="block text-sm font-medium text-gray-700"
            >
              Đang giảm giá
            </label>

            <input
              id="isSale"
              type="checkbox"
              className="mt-4"
              {...register("isSale")}
            />
          </div>
        </div>
      );
    });
  }, [variants, register]);

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "color" || name === "size") {
        const colors = value["color"].split(",");
        const sizes = value["size"].split(",");

        let combinations = getAllCombinations({ colors, sizes });
        if (
          combinations &&
          combinations.length === 1 &&
          !combinations[0].colors &&
          !combinations[0].sizes
        ) {
          setVariants([{ sizes: "Mặc định", colors: "Mặc định" }]);
        } else {
          setVariants(combinations);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-8 mt-10">
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="sku"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mã sản phẩm
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      KP
                    </span>

                    <input
                      type="text"
                      {...register("sku")}
                      id="sku"
                      placeholder="Nhập mã sản phẩm"
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    />
                  </div>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="product-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tên sản phẩm
                  </label>
                  <input
                    type="text"
                    id="product-name"
                    {...register("productName")}
                    placeholder="Nhập tên sản phẩm"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                {/* 
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Giá bán
                  </label>
                  <input
                    type="number"
                    id="price"
                    {...register("price")}
                    placeholder="Nhập giá bán sản phẩm"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="salePrice"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Giá giảm
                  </label>
                  <input
                    type="number"
                    id="salePrice"
                    {...register("salePrice")}
                    placeholder="Nhập giá sale sản phẩm"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="isSale"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Đang giảm giá
                  </label>

                  <input
                    id="isSale"
                    type="checkbox"
                    className="mt-4"
                    {...register("isSale")}
                  />
                </div> */}

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Màu sắc
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập màu sắc, dùng dấu phẩy để phân cách, nhấn enter để thêm"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    {...register("color")}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Kích thước
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập kích thước, dùng dấu phẩy để phân cách, nhấn enter để thêm"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    {...register("size")}
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label className="block text-lg font-medium text-gray-700">
                    Biến thể
                  </label>
                </div>

                {variantsMemo}

                <div className="col-span-6 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Ảnh sản phẩm
                  </label>
                  <FileUpload onChange={handleChangeFile} />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Tạo
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

ProductCreate.Layout = AdminLayout;

export default ProductCreate;
