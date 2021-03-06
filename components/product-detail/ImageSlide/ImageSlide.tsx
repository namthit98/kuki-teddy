import React from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import styles from "./ImageSlide.module.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { BACKEND_URL } from "../../../constants/core.constant";
import { ImageLoader } from "../../common/ImageLoader";

interface Props {
  images: any[];
}

export const ImageSlide = ({ images }: Props) => {
  const customRenderThumb = React.useCallback(() => {
    return images.map((image) => {
      return (
        <div key={image._id} className="relative h-16">
          <Image
            // loader={ImageLoader}
            key={image._id}
            className={styles["image"]}
            src={image.url}
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
          <div key={image._id} className="relative">
            <Image
              // loader={ImageLoader}
              src={image.url}
              alt={image.name}
              width={512}
              height={512}
              layout="responsive"
            />
          </div>
        );
      })}
    </Carousel>
  );
};
