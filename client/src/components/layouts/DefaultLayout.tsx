import classNames from "classnames";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import {
  RiHome3Line,
  RiLogoutBoxRLine,
  RiMenu2Fill,
  RiSurveyLine,
} from "react-icons/ri";
import { NextLink } from "../UI";

export type DefaultLayoutProps = React.PropsWithChildren<{}>;

export const DefaultLayout = (props: DefaultLayoutProps) => {
  return (
    <div className="bg-base-100 drawer drawer-mobile">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Nav id="drawer" />
        <main className="px-6 xl:pr-2 pb-16">
          <div className="prose w-full max-w-4xl flex-grow">
            {props.children}
          </div>
        </main>
      </div>

      <div className="drawer-side">
        <label htmlFor="drawer" className="drawer-overlay" />
        <Aside />
      </div>
    </div>
  );
};

const menuItems = [
  {
    name: "Principal",
    icon: RiHome3Line,
    href: "/",
  },
  {
    name: "Cuestionario",
    icon: RiSurveyLine,
    href: "/test",
  },
];

const Nav = (props: { id: string }) => {
  const { id } = props;
  const router = useRouter();

  return (
    <div className="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100 text-base-content">
      <nav className="w-full navbar">
        <div className="flex flex-1 md:gap-1 lg:gap-2">
          <div className="flex-none lg:hidden">
            <label
              htmlFor={id}
              className="btn btn-square btn-ghost drawer-button lg:hidden"
            >
              <RiMenu2Fill className="inline-block w-6 h-6 stroke-current" />
            </label>
          </div>

          <div className="flex-none lg:hidden">
            <NextLink href="/" legacyBehavior>
              <a
                aria-current="page"
                aria-label="Homepage"
                className="flex-0 p-2"
              >
                <img src="/unl_1.png" alt="Inicio" className="h-5" />
              </a>
            </NextLink>
          </div>
        </div>

        <div className="navbar-end">
          <div className="tooltip tooltip-bottom" data-tip="Salir">
            <button
              className="btn btn-ghost btn-circle"
              onClick={async () => {
                const res = await signOut({
                  callbackUrl: "/ingresar",
                  redirect: false,
                });
                router.push(res.url);
              }}
            >
              <RiLogoutBoxRLine className="w-5 h-5 stroke-current" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

const Aside = () => {
  const router = useRouter();

  const activeTab = useMemo(
    () =>
      menuItems.find(
        (item) => item.href === router.pathname || item.href === router.asPath
      ),
    [router.pathname]
  );

  return (
    <aside className="bg-base-200 w-80">
      <div className="z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 px-4 py-2 hidden lg:flex">
        <NextLink href="/" legacyBehavior>
          <a aria-current="page" aria-label="Homepage" className="flex-0 p-2">
            <img src="/unl_1.png" alt="Inicio" className="h-16" />
          </a>
        </NextLink>
      </div>

      <div className="h-4" />

      <ul className="menu menu-compact flex flex-col p-0 px-4">
        {menuItems.map((item) => (
          <li key={item.href}>
            <NextLink href={item.href} legacyBehavior>
              <a
                className={classNames("flex gap-4", {
                  active: activeTab?.href === item.href,
                })}
              >
                <span className="flex-none">
                  <item.icon className="w-6 h-6 stroke-current" />
                </span>
                <span className="flex-1">{item.name}</span>
              </a>
            </NextLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};
