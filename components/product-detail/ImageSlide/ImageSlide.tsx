import React from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import styles from "./ImageSlide.module.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { BACKEND_URL } from "../../../constants/core.constant";

interface Props {
  images: any[];
}

export const ImageSlide = ({ images }: Props) => {
  const customRenderThumb = React.useCallback(() => {
    return images.map((image) => {
      return (
        <div key={image._id} className="relative h-16">
          <Image
            key={image._id}
            className={styles["image"]}
            src={`${BACKEND_URL}${image.url}`}
            alt={image.name}
            layout="fill"
          />
        </div>
      );
    });
  }, [images]);

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
      renderThumbs={customRenderThumb}
      //   onChange={onChange}
      //   onClickItem={onClickItem}
      //   onClickThumb={onClickThumb}
    >
      {images.map((image) => {
        return (
          <div key={image._id} className="relative h-[500px]">
            <Image
              src={`${BACKEND_URL}${image.url}`}
              alt={image.name}
              layout="fill"
            />
          </div>
        );
      })}
    </Carousel>
  );
};
