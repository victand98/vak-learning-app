import React from "react";
import { NextLink } from "../UI";

export type AuthLayoutProps = React.PropsWithChildren<{}>;

export const AuthLayout = (props: AuthLayoutProps) => {
  return (
    <main className="min-h-screen bg-base-200">
      <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <NextLink href="/" legacyBehavior>
          <a className="flex items-center mb-6">
            <img className="h-10 mr-2" src="/unl_1.png" alt="UNL" />
          </a>
        </NextLink>

        <div className="w-full bg-base-100 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {props.children}
          </div>
        </div>
      </section>
    </main>
  );
};
