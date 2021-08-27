import React from "react";
import { HiMenu } from "react-icons/hi";

interface Props {}

export const Drawer = (props: Props) => {
  return (
    <div>
      <button className="flex justify-center items-center sm:hidden bg-[color:var(--primary)] text-white fixed top-[20px] left-[20px] w-14 h-14 rounded-full p-4 z-10">
        <HiMenu className="w-5 h-5" />
      </button>
    </div>
  );
};
