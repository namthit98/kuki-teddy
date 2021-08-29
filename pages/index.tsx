import type { NextPage } from "next";
import axios from "./../services/axios";
import { BaseLayout, Container, ProductCard } from "../components/common";
import { Pagination } from "../components/common/Pagination";
import { Banner, Title, Toolbar } from "../components/home";
import { IBanner, IProduct } from "../interfaces";
import { ProductList } from "./../components/home";

interface Props {
  bannerImages: IBanner[];
  products: IProduct[];
}

const products = [
  { _id: "32523", name: "Gấu chó", imageUrl: "/p1.png", pricing: 12532 },
  { _id: "32523325", name: "Gấu chó 2", imageUrl: "/p3.jpeg", pricing: 323532 },
  { _id: "32553223", name: "Gấu chó 3", imageUrl: "/p2.jpeg", pricing: 13232 },
  { _id: "325tt23", name: "Gấu chó 4", imageUrl: "/p1.png", pricing: 425342 },
  { _id: "32rtw523", name: "Gấu chó 5", imageUrl: "/p2.jpeg", pricing: 9563 },
  {
    _id: "32etưwew523",
    name: "Gấu chó 62",
    imageUrl: "/p4.jpeg",
    pricing: 532532,
  },
  {
    _id: "325ttew23",
    name: "Gấu chó 453",
    imageUrl: "/p1.png",
    pricing: 3512532,
  },
  {
    _id: "32rtw55523",
    name: "Gấu chó 53",
    imageUrl: "/p4.jpeg",
    pricing: 3257423,
  },
  {
    _id: "323tưet52523",
    name: "Gấu chó 232",
    imageUrl: "/p1.png",
    pricing: 125523532,
  },
  { _id: "gfdh", name: "Gấu chó 232", imageUrl: "/p3.jpeg", pricing: 124335 },
  {
    _id: "325ftưe5q3223",
    name: "Gấu chó 332",
    imageUrl: "/p4.jpeg",
    pricing: 12532,
  },
];

const Home: NextPage<Props> & { Layout: React.ReactNode } = ({
  bannerImages,
  products,
}) => {
  return (
    <>
      <Banner
        banner={bannerImages.find((x) => x.code === "home-banner") || null}
      />
      <Container>
        <Toolbar />
        <div className="mb-10">
          <Title text="Tất cả sản phẩm" />
          <ProductList products={products} />
        </div>
      </Container>
    </>
  );
};

Home.Layout = BaseLayout;

export const getStaticProps = async () => {
  let bannerImages = [];
  let products = [];

  const [bannerRes, productRes] = await Promise.all([
    axios.get("/banners"),
    axios.get("/products"),
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
