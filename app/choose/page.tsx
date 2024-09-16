import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { cookies } from "next/headers";
import ArchitectureSelector from "./ArchitectureSelector";

const architectures = [
  "MVC",
  "MicroservicesArchitecture",
  "HexagonalArchitecture",
  "CleanArchitecture",
  "LayeredArchitecture",
];

async function sendMessage(message: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4-turbo"), // Utiliza el modelo GPT-4 Turbo
      system: "Eres un arquitecto de software", // Configuración de sistema
      prompt: message, // La pregunta o solicitud
    });

    return text; // Devuelve el texto generado por el modelo
  } catch (error) {
    console.error("Error generando texto:", error);
    throw new Error("No se pudo generar la respuesta de arquitectura");
  }
}

async function load() {
  const cookieStore = cookies();
  const requirements = cookieStore.get("requirements")?.value;
  const valueMagnitudeProyect = cookieStore.get("valueMagnitudeProyect")?.value;
  const valueScopeProyect = cookieStore.get("valueScopeProyect")?.value;

  let messageSelectedArchitecture = `Evalua de acuerdo a este array de requemientos: ${requirements} y escoge maximo tres arquitecturas de este array: ${architectures}, considera que la magnitud del proyecto es ${valueMagnitudeProyect} y el alcance que tendra es de ${valueScopeProyect} usuarios. Devuelveme un array con lo que escogistes, solo el array.`;
  const selectedArchitecture = await sendMessage(messageSelectedArchitecture);

  await new Promise((resolve) => setTimeout(resolve, 2000));
  return JSON.parse(selectedArchitecture);
}

export default async function ChooseArchitecture() {
  let architectures = await load();

  return <ArchitectureSelector architectures={architectures} />;
}
