import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

export type NextLinkProps = PropsWithChildren<LinkProps>;

export const NextLink = (props: NextLinkProps) => {
  const { children, ...rest } = props;

  return (
    <Link {...rest}>
      {typeof children === "string" ? <a>{children}</a> : children}
    </Link>
  );
};
