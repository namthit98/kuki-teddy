import type { NextPage } from "next";
import axios from "./../services/axios";
import { BaseLayout, Container, ProductCard } from "../components/common";
import { Pagination } from "../components/common/Pagination";
import { Banner, Title, Toolbar } from "../components/home";
import { IBanner, IProduct } from "../interfaces";
import { ProductList } from "./../components/home";
import { listProducts } from "../services/products.service";
import { convertToSlug } from "../utils/convert-to-slug";
import { useState } from "react";

interface Props {
  bannerImages: IBanner[];
  products: IProduct[];
}

const Home: NextPage<Props> & { Layout: React.ReactNode } = ({
  bannerImages,
  products,
}) => {
  // const myRef = useScrollTop();

  const [filter, setFilter] = useState("All");
  const filterHandler = (value: string) => {
    setFilter(value);
  };

  return (
    <div>
      <Banner
        banner={bannerImages.find((x) => x.code === "home-banner") || null}
      />
      <Container>
        <Toolbar onFilter={filterHandler} filter={filter} />
        <div className="mb-10">
          <Title text="Sản phẩm" />
          <ProductList
            products={products.filter(
              (x: any) => filter === "All" || x[filter]
            )}
          />
        </div>
      </Container>
    </div>
  );
};

Home.Layout = BaseLayout;

export const getStaticProps = async () => {
  let bannerImages = [];
  let products = [];

  const [bannerRes, productRes] = await Promise.all([
    axios.get("/banners"),
    listProducts(),
  ]);

  if (bannerRes && bannerRes.data && bannerRes.data.length) {
    bannerImages = bannerRes.data;
  }

  if (productRes && productRes.data && productRes.data.length) {
    products = productRes.data;
  }

  return {
    props: {
      bannerImages,
      products,
    },
  };
};

export default Home;
