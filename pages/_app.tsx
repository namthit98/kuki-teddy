import "react-responsive-carousel/lib/styles/carousel.min.css";
import "nprogress/nprogress.css";
import "../styles/globals.css";
import dynamic from "next/dynamic";

const TopProgressBar = dynamic(
  () =>
    import("../components/common/TopProgressBar").then(
      (common: any) => common.TopProgressBar
    ),
  { ssr: false }
);

const Noop: React.FC = ({ children }) => <>{children}</>;

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;

  return (
    <>
      <Layout pageProps={pageProps}>
        <TopProgressBar />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
export default MyApp;
