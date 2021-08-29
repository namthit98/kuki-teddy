import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import styles from "./Banner.module.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { IBanner } from "../../../interfaces";
import { BACKEND_URL } from "../../../constants/core.constant";

interface Props {
  banner: IBanner | null;
}

export const Banner = ({ banner }: Props) => {
  const renderBanner = (): any => {
    if (!banner) return null;

    return banner.images.map((img) => {
      return (
        <div key={img._id} className={styles["image-wrapper"]}>
          <Image
            className={styles["image"]}
            src={`${BACKEND_URL}${img.url}`}
            alt={img.name}
            layout="fill"
          />
        </div>
      );
    });
  };

  if (!banner || !banner.images.length) return null;

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
      {renderBanner()}
    </Carousel>
  );
};
