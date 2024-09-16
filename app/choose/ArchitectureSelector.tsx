"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getCookies, setCookie, deleteCookie, getCookie } from "cookies-next";

interface ArchitectureSelectorProps {
  architectures: string[];
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
          onClick={() => handleOptionSelect(arch)}
          key={arch}
          className="flex px-16 py-5 m-3 border-gray-950 border rounded-full cursor-pointer hover:text-white hover:bg-gray-950 hover:animate-pulse transition-transform"
        >
          <p className="font-semibold">{arch}</p>
          <p className="pl-5">→</p>
        </div>
      ))}
    </div>
  );
};

export default ArchitectureSelector;
