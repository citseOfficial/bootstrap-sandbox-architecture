"use client";
import { useEffect, useState } from "react";
import { RadioGroup } from "./components/RadioGroup";
import { InputMetadato } from "./components/InputMetadato";
import { InputSR } from "./components/InputSR";
import { setCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { PiFileSqlLight } from "react-icons/pi";
import Image from "next/image";
import page from "../public/image1.png";

export const runtime = "edge";

export default function Home() {
  const typeProyect: { value: string; label: string }[] = [
    { value: "graddle", label: "Graddle" },
  ];
  const magnitudeProyect: { value: string; label: string }[] = [
    { value: "pequeño", label: "Pequeño" },
    { value: "mediano", label: "Mediano" },
    { value: "grande", label: "Grande" },
  ];

  const typeDatabase: { value: string; label: string }[] = [
    { value: "mySQL", label: "MySQL" },
    { value: "postgreSQL", label: "PostgreSQL" },
  ];

  const versionSpringBootProyect: { value: string; label: string }[] = [
    { value: "3.4.0-SNAPSHOT", label: "3.4.0 (SNAPSHOT)" },
    { value: "3.3.5-SNAPSHOT", label: "3.3.5 (SNAPSHOT)" },
    { value: "3.3.4", label: "3.3.4" },
    { value: "3.2.11-SNAPSHOT", label: "3.2.11 (SNAPSHOT)" },
    { value: "3.2.10", label: "3.2.10" },
  ];

  const [valueCreditProyect, setValueCreditProyect] = useState(20);
  const [valueTypeProyect, setValueTypeProyect] = useState("graddle");
  const [valueTypeDatabase, setValueTypeDatabase] = useState("mySQL");
  const [valueMagnitudeProyect, setValueMagnitudeProyect] = useState("pequeño");
  const [valueVersionSpringBootProyect, setVersionSpringBootProyect] =
    useState("3.3.4");
  const [valueGroupProyect, setValueGroupProyect] = useState("com.example");
  const [valueArtefactProyect, setValueArtefactProyect] = useState("demo");
  const [valueNameProyect, setValueNameProyect] = useState("demo");
  const [valueScopeProyect, setValueScopeProyect] = useState<string>("100");
  const [inputs, setInputs] = useState<string[]>([]);

  const handleSubmit = () => {
    setCookie("requirements", inputs);
    setCookie("valueNameProyect", valueNameProyect);
    setCookie("valueGroupProyect", valueGroupProyect);
    setCookie("valueArtefactProyect", valueArtefactProyect);
    setCookie("valueMagnitudeProyect", valueMagnitudeProyect);
    setCookie("valueScopeProyect", valueScopeProyect);
    setCookie("valueTypeDatabase", valueTypeDatabase);
    setCookie("valueVersionSpringBootProyect", valueVersionSpringBootProyect);

    setInputs([]);
    setValueGroupProyect("");
    setValueArtefactProyect("");
    setValueNameProyect("");
  };
  const addInput = () => {
    setInputs([...inputs, ""]);
  };
  const removeInput = (index: number) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };
  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };
  // Estado para controlar cuál contenido se muestra
  const [showFirst, setShowFirst] = useState(true);

  const toggleContent = () => {
    setShowFirst(!showFirst); // Cambia el estado entre true/false
    setCookie("isRealizedOnBoarding", true);
  };

  useEffect(() => {
    let isRealizedOnBoarding = getCookie("isRealizedOnBoarding");
    if (isRealizedOnBoarding) {
      toggleContent();
    }
  }, []);

  return (
    <>
      <div
        id="basic"
        className={
          !showFirst
            ? "grid grid-rows-8 grid-flow-col h-full w-full gap-2"
            : "blur"
        }
      >
        <div className="row-span-7 grid grid-cols-12 gap-2 py-10">
          <div className="border-r border-line col-start-1 col-span-5 px-10 flex flex-col gap-8 items-center justify-center">
            <div className="flex flex-col w-full h-fit gap-2">
              <h4 className="text-text-color font-semibold">Proyecto</h4>
              <form className="flex gap-5 flex-wrap">
                <RadioGroup
                  name="typeProyect"
                  items={typeProyect}
                  value={valueTypeProyect}
                  onChange={setValueTypeProyect}
                />
              </form>
            </div>
            <div className="flex flex-col w-full h-fit gap-2">
              <h4 className="text-[text-color] font-semibold">Spring Boot</h4>
              <form className="flex gap-5 flex-wrap">
                <RadioGroup
                  name="versionSpringBootProyect"
                  items={versionSpringBootProyect}
                  value={valueVersionSpringBootProyect}
                  onChange={setVersionSpringBootProyect}
                />
              </form>
            </div>

            <div className="flex flex-col w-full h-fit gap-2">
              <h4 className="text-[text-color] font-semibold">Metadatos</h4>
              <form className="flex gap-5 flex-wrap px-5 flex-col">
                <InputMetadato
                  title="Grupo"
                  placeHolder="com.example"
                  value={valueGroupProyect}
                  onChange={setValueGroupProyect}
                />

                <InputMetadato
                  title="Artefacto"
                  placeHolder="demo"
                  value={valueArtefactProyect}
                  onChange={setValueArtefactProyect}
                />

                <InputMetadato
                  title="Nombre"
                  placeHolder="demo"
                  value={valueNameProyect}
                  onChange={setValueNameProyect}
                />
              </form>
            </div>

            <div className="flex flex-col w-full h-fit gap-2">
              <form className="flex gap-5 flex-wrap px-5">
                <div className="flex justify-center items-center w-full">
                  <p className="mr-5 text-[text-color] text-sm font-medium w-64">
                    Alcance de usuario
                  </p>
                  <input
                    id="group-proyect"
                    type="number"
                    placeholder={valueScopeProyect}
                    onChange={(e) => setValueScopeProyect(e.target.value)}
                    className="appearance-none bg-bg-primary text-sm border-b-2 border-gray-500 py-2 w-full max-w-full text-text-color leading-tight focus:outline-none focus:border-text-color"
                  />
                </div>
              </form>
            </div>

            <div className="flex flex-col w-full h-fit gap-2">
              <h4 className="text-[text-color] font-semibold">
                Magnitud de proyecto
              </h4>
              <form className="flex gap-5 flex-wrap">
                <RadioGroup
                  name="magnitudeProyect"
                  items={magnitudeProyect}
                  value={valueMagnitudeProyect}
                  onChange={setValueMagnitudeProyect}
                />
              </form>
            </div>

            <div className="flex flex-col w-full max-h-fit">
              <div className="flex gap-2 items-center">
                <PiFileSqlLight className="text-2xl text-[text-color] bx bxl-github text-black hover:text-slate-600 cursor-pointer" />
                <p className="text-gray-400 text-xs">(opcional)</p>
              </div>
              <form className="flex gap-2 flex-wrap">
                <RadioGroup
                  name="typeDataBase"
                  items={typeDatabase}
                  value={valueTypeDatabase}
                  onChange={setValueTypeDatabase}
                />
              </form>
            </div>
          </div>
          <div className="border-line col-start-6 col-span-7 flex flex-col w-full px-8">
            <div className="flex flex-row justify-between items-center w-full border-b pb-5">
              <p className="text-black text-base font-semibold">
                Requermientos del Sistema
              </p>
              <div
                onClick={addInput}
                id="new-requirement"
                className="bg-bg-primary border-2 flex rounded-[5px] px-7 py-3 m-3 font-normal border-border-button w-fit cursor-pointer text-text-color text-xs hover:bg-border-button hover:text-bg-primary"
              >
                <p className="mr-1 font-bold">NUEVO RQMT. ↓</p>
                {/* <p className="ml-1 font-normal text-gray-500">CTRL + R</p> */}
              </div>
            </div>
            <div
              id="container-requirement"
              className="max-h-96 overflow-auto scroll-auto mt-8"
            >
              <div style={{ marginTop: "10px" }}>
                {inputs.map((input, index) => (
                  <InputSR
                    title={index.toString()}
                    key={index}
                    value={input}
                    index={index}
                    onChange={handleInputChange}
                    onDelete={removeInput}
                    placeHolder="..."
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex row-span-1 justify-center items-center bg-bg-primary-live">
          <Link href={"/choose"}>
            <div
              onClick={handleSubmit}
              id="generate-arquitecture"
              className="bg-bg-primary border-2 flex rounded-[5px] px-7 py-3 m-3 border-border-button w-fit cursor-pointer text-text-color text-sm hover:bg-text-color hover:text-bg-primary"
            >
              <p className="mr-1 font-extrabold">GENERAR ARQ. → </p>
              {/* <p className="ml-1 font-normal text-gray-500">CTRL + ⏎</p> */}
            </div>
          </Link>
        </div>
      </div>
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={
          showFirst
            ? "bg-white bg-opacity-35 overflow-y-auto overflow-x-hidden fixed flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            : "hidden"
        }
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-2xl shadow border ">
            <div className="p-4 md:p-5 space-y-4">
              <Image
                src={page}
                width={500}
                height={200}
                style={{ objectFit: "cover" }}
                className="border rounded-se-2xl rounded-ss-2xl flex justify-center w-full h-32 bg-cover"
                alt="Picture of the author"
              />
              <p className="text-base leading-relaxed text-gray-500 font-thin text-justify">
                <strong className="text-black font-black">
                  Bootstrap Sandbox Architecture
                </strong>{" "}
                genera arquitecturas backend personalizadas con Java y Spring
                Boot, basándose en tus requerimientos. Por favor, lee los{" "}
                <Link href={"/terms/use"} target="_blank">
                  <strong className="text-black font-black underline cursor-pointer">
                    Terminos de uso
                  </strong>{" "}
                </Link>
              </p>
            </div>
            <div className="flex items-center justify-end p-4 md:p-5 border-t rounded-b border-gray-200">
              <button
                onClick={toggleContent}
                data-modal-hide="default-modal"
                className="bg-black border flex font-bold rounded-lg px-5 py-2 border-border-button w-fit cursor-pointer text-white text-sm hover:bg-white hover:text-black"
              >
                Aceptar y continuar →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
