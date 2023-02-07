import React from "react";

export type PageTitleProps = {
  title: string;
  leading?: string;
};

export const PageTitle: React.FC<PageTitleProps> = (props) => {
  const { title, leading } = props;
  return (
    <>
      <h1>{title}</h1>
      {leading && <p className="-mt-5">{leading}</p>}
    </>
  );
};
