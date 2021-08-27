import React from "react";

interface Props {
  text: string;
}

export const Title = ({ text }: Props) => {
  return (
    <h3 className="text-xl text-[color:var(--text-color)] border-[color:var(--primary)] uppercase font-bold border-b-2 my-3">
      {text}
    </h3>
  );
};
