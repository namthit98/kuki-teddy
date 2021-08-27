import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import styles from "./ImageSlide.module.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

interface Props {}

export const ImageSlide = (props: Props) => {
  return (
    <Carousel
      showArrows={true}
      autoPlay={true}
      infiniteLoop={true}
      interval={5000}
      showStatus={false}
      onClickThumb={() => {}}
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
      <div>
        <img src="/p1.png" />
      </div>
      <div>
        <img src="/p2.jpeg" />
      </div>
      <div>
        <img src="/p3.jpeg" />
      </div>
      <div>
        <img src="/p2.jpeg" />
      </div>
      <div>
        <img src="/p3.jpeg" />
      </div>
      <div>
        <img src="/p2.jpeg" />
      </div>
      <div>
        <img src="/p3.jpeg" />
      </div>
      <div>
        <img src="/p4.jpeg" />
      </div>
    </Carousel>
  );
};
