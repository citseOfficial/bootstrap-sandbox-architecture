import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BiLogoInstagramAlt, BiLogoGithub, BiLogoRedux } from "react-icons/bi";

import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <div className="grid grid-cols-12 h-screen bg-bg-primary">
          <div className="border-r border-line flex flex-col gap-5 justify-between items-center">
            <div className="py-5">
              <div className="w-fit flex flex-col items-center">
                <BiLogoRedux className="text-5xl text-[text-color] bx bxl-github text-slate-800 hover:text-slate-600 cursor-pointer" />
                <p className="text-sm">BSA</p>
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
