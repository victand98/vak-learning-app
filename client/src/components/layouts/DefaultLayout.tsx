import React from "react";

export type DefaultLayoutProps = React.PropsWithChildren<{}>;

export const DefaultLayout = (props: DefaultLayoutProps) => {
  return <div className="bg-base-200 min-h-screen">{props.children}</div>;
};
