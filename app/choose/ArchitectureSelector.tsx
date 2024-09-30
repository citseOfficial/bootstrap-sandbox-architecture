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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale
);

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
  // To make configuration
  const options = {
    scales: {
      r: {
        ticks: {
          color: "gray",
        },
      },
    },
  };

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter();

  const handleOptionSelect = async (option: string) => {
    setSelectedOption(option);

    // Guarda la opción seleccionada en cookies
    setCookie("architectureSelected", option);

    // Redirige a la nueva página con la opción seleccionada
    router.push(`/generate`);
  };

  const getBlueTonedColor = () => {
    const r = 0; // Rojo fijo en 0 para evitar morado
    const g = Math.floor(100 + Math.random() * 50); // Verde entre 100 y 150 para evitar morado
    const b = Math.floor(200 + Math.random() * 55); // Azul entre 200 y 255 para asegurar tonos fuertes de azul

    return {
      backgroundColor: `rgba(${r}, ${g}, ${b}, 0.5)`, // Color con transparencia
      borderColor: `rgb(${r}, ${g}, ${b})`, // Borde del mismo color sin transparencia
    };
  };

  const contructorChart = () => {
    // X - axis lable
    const labels = [
      "Recomendacion",
      "Rendimiento",
      "Complejidad",
      "Fiabilidad",
    ];

    // Generate datasets dynamically using map
    const datasets = architectures.map((arch) => {
      const colors = getBlueTonedColor();

      return {
        label: arch.nombre_arquitectura,
        data: [
          arch.recomendacion_porcentaje,
          arch.rendimiento_porcentaje,
          arch.complejidad_porcentaje,
          arch.fiabilidad_porcentaje,
        ],
        backgroundColor: colors.backgroundColor,
        borderColor: colors.borderColor,
        borderWidth: 1,
      };
    });

    const data = {
      labels: labels,
      datasets: datasets,
    };
    return data;
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="">
        <Radar data={contructorChart()} options={options} />
      </div>
      <div className="flex justify-center items-center">
        {architectures.map((arch) => (
          <div
            key={arch.nombre_arquitectura}
            className="flex flex-col items-center"
          >
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchitectureSelector;
