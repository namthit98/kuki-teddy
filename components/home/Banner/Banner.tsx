import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import styles from "./Banner.module.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

export const Banner = () => {
  return (
    <Carousel
      showArrows={true}
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      interval={5000}
      showStatus={false}
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{ right: 15 }}
            className={styles["arrow"]}
          >
            <FaChevronRight />
          </button>
        )
      }
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{ left: 15 }}
            className={styles["arrow"]}
          >
            <FaChevronLeft />
          </button>
        )
      }
      //   onChange={onChange}
      //   onClickItem={onClickItem}
      //   onClickThumb={onClickThumb}
    >
      <div className={styles["image-wrapper"]}>
        <Image
          className={styles["image"]}
          src="/teddy.jpeg"
          alt="teddy"
          layout="fill"
        />
      </div>

      <div className={styles["image-wrapper"]}>
        <Image
          className={styles["image"]}
          src="/teddy-1.png"
          alt="teddy 1"
          layout="fill"
        />
      </div>

      <div className={styles["image-wrapper"]}>
        <Image
          className={styles["image"]}
          src="/teddy-2.png"
          alt="teddy 2"
          layout="fill"
        />
      </div>
    </Carousel>
  );
};
