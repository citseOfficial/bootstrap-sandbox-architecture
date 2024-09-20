"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setCookie } from "cookies-next";
import {
  IoArrowForwardCircleOutline,
  IoConstructOutline,
} from "react-icons/io5";
import { CgPerformance } from "react-icons/cg";
import { MdOutlineSecurity } from "react-icons/md";

interface ArchitectureSelectorProps {
  architectures: ArchitectureObject[];
}

interface ArchitectureObject {
  nombre_arquitectura: string;
  recomendacion_porcentaje: number;
  rendimiento_porcentaje: number;
  complejidad_porcentaje: number;
  fiabilidad_porcentaje: number;
}

const ArchitectureSelector: React.FC<ArchitectureSelectorProps> = ({
  architectures,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter();

  const handleOptionSelect = async (option: string) => {
    setSelectedOption(option);

    // Guarda la opción seleccionada en cookies
    setCookie("architectureSelected", option);

    // Redirige a la nueva página con la opción seleccionada
    router.push(`/generate`);
  };

  return (
    <div className="flex justify-center items-center h-full">
      {architectures.map((arch) => (
        <div
          key={arch.nombre_arquitectura}
          className="flex flex-col items-center"
        >
          <div
            onClick={() => handleOptionSelect(arch.nombre_arquitectura)}
            className="flex items-center px-7 py-5 m-7 border-gray-950 border rounded-full cursor-pointer hover:text-white hover:bg-black hover:animate-pulse transition-transform"
          >
            <p className="font-semibold">{arch.nombre_arquitectura}</p>
            <h4 className="pl-4 font-mono font-black text-xl">
              {arch.recomendacion_porcentaje}%
            </h4>
            <IoArrowForwardCircleOutline className="text-xl text-[text-color] text-slate-600 cursor-pointer ml-10" />
          </div>
          <div>
            <ul className="flex text-gray-400 text-xs">
              <div className="flex flex-col items-center p-3">
                <strong className="text-gray-600 text-lg">
                  {arch.rendimiento_porcentaje}%
                </strong>
                <CgPerformance />
                <p>Rendimiento</p>
              </div>
              <div className="flex flex-col items-center p-3">
                <strong className="text-gray-600 text-lg">
                  {arch.complejidad_porcentaje}%
                </strong>
                <IoConstructOutline />
                <p>Complejidad</p>
              </div>
              <div className="flex flex-col items-center p-3">
                <strong className="text-gray-600 text-lg">
                  {arch.fiabilidad_porcentaje}%
                </strong>
                <MdOutlineSecurity />
                <p>Fiabilidad</p>
              </div>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArchitectureSelector;
