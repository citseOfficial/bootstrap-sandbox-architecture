import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { BiLogoInstagramAlt, BiLogoGithub, BiLogoRedux } from "react-icons/bi";
import { LuArrowLeftToLine } from "react-icons/lu";
import { FcSupport } from "react-icons/fc";

import "./globals.css";
import Link from "next/link";

const openSans = DM_Sans({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Bootstrap Sandbox Architecture",
  description:
    "Creacion de Arquitectura a partir de requerimientos del sistema utilizando IA Generativa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <div className="max-lg:visible lg:hidden max-lg:h-screen max-lg:w-full max-lg:text-center max-lg:justify-center max-lg:items-center flex flex-col">
          <p className="text-2xl text-black font-mono font-black max-w-sm">
            Soporte para móvil muy pronto
          </p>
          <p className="max-w-md text-xs mt-5 text-gray-400">
            Estámos en la fase Alpha de este producto. Estamos trabajando en
            soporte móvil para que tengas una mayor experiencia. By: CITSE
          </p>
          <Link
            href="https://github.com/citseOfficial/bootstrap-sandbox-architecture"
            target="_blank"
            className="max-w-md text-xs mt-5 underline cursor-pointer hover:text-blue-400"
          >
            bootstrapSandBoxArchitecture.com
          </Link>
        </div>
        <div className="max-lg:hidden grid grid-cols-12 h-screen bg-bg-primary">
          <div className="border-r border-line flex flex-col gap-5 justify-between items-center">
            <div className="py-12 invisible">
              <div className="w-fit flex flex-col items-center hover:bg-slate-50 p-4 rounded-full cursor-pointer">
                <LuArrowLeftToLine className="text-xl text-[text-color] bx bxl-github text-black cursor-pointer" />
              </div>
            </div>
            <div className="py-5">
              <Link
                className="w-fit"
                href="https://github.com/citseOfficial"
                target="_blank"
              >
                <BiLogoGithub className="text-3xl text-[text-color] bx bxl-github hover:text-slate-500 my-4" />
              </Link>
              <Link
                className="w-fit"
                href="https://www.instagram.com/citse_official/"
                target="_blank"
              >
                <BiLogoInstagramAlt className="text-3xl text-[text-color] bx bxl-instagram hover:text-slate-500 my-4" />
              </Link>
            </div>
          </div>
          <div className="col-span-11">{children}</div>
        </div>
      </body>
    </html>
  );
}
