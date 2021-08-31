import { BACKEND_URL } from "../../../constants/core.constant";

export const ImageLoader = ({ src }: any) => {
  return `${BACKEND_URL}${src}`;
};
