"use client";
import { useState } from "react";
import FileTree from "../components/FileTree";
import Spectator from "./spectator";
import Link from "next/link";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { getCookie } from "cookies-next";

type FileSystemNode = {
  id: number;
  name: string;
  type: string;
  parent: number | null;
  children?: FileSystemNode[];
  content: string | null;
};

interface FileTreeProps {
  fileTree: FileSystemNode[];
  data: FileSystemNode[];
}

export function Main({ fileTree, data }: FileTreeProps) {
  const [fileNode, setFileNode] = useState<FileSystemNode | null>(null);
  let nameProyect = getCookie("valueNameProyect");

  const handleFileClick = (node: FileSystemNode) => {
    setFileNode(node);
  };

  function dowloadArquitecture() {
    // Crear un nuevo archivo ZIP
    const zip = new JSZip();
    // Contruir zip
    addToZip(zip, data);
    // Generar el archivo ZIP
    zip.generateAsync({ type: "blob" }).then(function (content) {
      // Guardar el archivo ZIP usando FileSaver.js
      saveAs(content, `${nameProyect}.zip`);
    });
  }

  function addToZip(
    zip: JSZip,
    fileSystem: FileSystemNode[],
    parentId: number | null = null,
    parentFolder: JSZip = zip
  ) {
    data
      .filter((item) => item.parent === parentId)
      .forEach((item) => {
        if (item.type === "folder") {
          const folder = parentFolder.folder(item.name);
          console.log(folder?.folder.length);
          if (folder) {
            addToZip(zip, fileSystem, item.id, folder);
          }
        } else if (item.type === "file") {
          parentFolder.file(item.name, item.content || "");
        }
      });
  }

  return (
    <div
      id="structure"
      className="grid grid-rows-8 grid-flow-col h-screen w-full gap-2 "
    >
      <div className="row-start-1 row-end-8 grid grid-cols-12 gap-4">
        <div className="col-start-2 col-end-5 flex flex-col">
          <div className="border border-line mt-5 mb-2 rounded-[2px] p-2.5">
            <h1
              className="text-base font-semibold text-text-color"
              id="name-proyect-structure"
            >
              {nameProyect}.zip
            </h1>
          </div>
          <div
            id="file-system"
            className="border border-line mb-5 rounded-[2px] h-full w-full min-w-fit"
          >
            <FileTree tree={fileTree} onFileClick={handleFileClick} />
          </div>
        </div>
        <Spectator key={fileNode?.id} file={fileNode} />
      </div>
      <div className="row-start-8 flex justify-center items-center bg-bg-primary-live">
        <div
          onClick={dowloadArquitecture}
          id="dowload-arquitecture"
          className="bg-bg-primary border-2 flex rounded-[4px] px-7 py-3 m-3 font-normal border-border-button w-fit cursor-pointer text-text-color text-sm hover:bg-border-button hover:text-bg-primary"
        >
          <p className="mr-1 font-bold">DESCARGAR</p>
          <p className="ml-1 font-normal">CTRL + ⏎</p>
        </div>

        <Link href={"/"}>
          <div
            id="close-dowload"
            className="bg-bg-primary border-2 flex rounded-[4px] px-7 py-3 m-3 font-normal border-border-button w-fit cursor-pointer text-text-color text-sm hover:bg-border-button hover:text-bg-primary"
          >
            <p className="mr-1 font-bold">CANCELAR</p>
            <p className="ml-1 font-normal">ESC</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
