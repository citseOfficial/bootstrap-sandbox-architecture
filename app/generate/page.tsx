import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { Main } from "./main";
import { cookies } from "next/headers";

type FileSystemNode = {
  id: number;
  name: string;
  type: string;
  parent: number | null;
  children?: FileSystemNode[];
  content: string | null;
};

const cookieStore = cookies();
const fileSystemData = [
  {
    id: 1,
    name: ".gitignore",
    type: "file",
    parent: null,
    content: "build/\n.gradle/\n*.jar\n*.war\n*.iml\n.gradle/\n.env\n",
  },
  { id: 2, name: "gradle", type: "folder", parent: null, content: null },
  {
    id: 3,
    name: "HELP.md",
    type: "file",
    parent: null,
    content:
      "# Project Help\nThis project uses Gradle for building Java applications.",
  },
  {
    id: 4,
    name: "gradlew",
    type: "file",
    parent: null,
    content: "Gradle Wrapper script for Unix-based systems.",
  },
  {
    id: 5,
    name: "gradlew.bat",
    type: "file",
    parent: null,
    content: "Gradle Wrapper script for Windows systems.",
  },
  {
    id: 6,
    name: "build.gradle",
    type: "file",
    parent: null,
    content: `plugins {\n    id 'java'\n}\n\nrepositories {\n    mavenCentral()\n}\n\ndependencies {\n    implementation 'org.springframework.boot:spring-boot-starter'\n}\n\ntest {\n    useJUnitPlatform()\n}`,
  },
  { id: 7, name: "src", type: "folder", parent: null, content: null },
  { id: 8, name: "main", type: "folder", parent: 7, content: null },
  { id: 9, name: "java", type: "folder", parent: 8, content: null },
  { id: 10, name: "com", type: "folder", parent: 9, content: null },
  { id: 11, name: "dino", type: "folder", parent: 10, content: null },
  { id: 12, name: "dino", type: "folder", parent: 11, content: null },
  {
    id: 13,
    name: "DinoApplication.java",
    type: "file",
    parent: 12,
    content: `package com.dino.dino;\n\nimport org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\n\n@SpringBootApplication\npublic class DinoApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(DinoApplication.class, args);\n    }\n}`,
  },
  { id: 14, name: "resources", type: "folder", parent: 8, content: null },
  {
    id: 15,
    name: "application.properties",
    type: "file",
    parent: 14,
    content: "spring.application.name=DinoApplication\nserver.port=8080\n",
  },
  {
    id: 16,
    name: "settings.gradle",
    type: "file",
    parent: null,
    content: `rootProject.name = 'dino'`,
  },
];

const buildTree = (data: FileSystemNode[]): FileSystemNode[] => {
  const tree: FileSystemNode[] = [];
  const map: { [key: number]: FileSystemNode } = {};

  data.forEach((item) => {
    map[item.id] = { ...item, children: [] };
    if (item.parent === null) {
      tree.push(map[item.id]);
    } else {
      if (map[item.parent]) {
        map[item.parent].children!.push(map[item.id]);
      }
    }
  });

  return tree;
};
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
  const requirements = cookieStore.get("requirements")?.value;
  const valueNameProyect = cookieStore.get("valueNameProyect")?.value;
  const valueGroupProyect = cookieStore.get("valueGroupProyect")?.value;
  const valueArtefactProyect = cookieStore.get("valueArtefactProyect")?.value;
  const architectureSelected = cookieStore.get("architectureSelected")?.value;
  const valueVersionSpringBootProyect = cookieStore.get(
    "valueVersionSpringBootProyect"
  )?.value;

  let messageDataModels = `De acuerdo a estos requerimientos del sistema: ${requirements},  quiero que me entregues un array con los nombres de los modelos de datos que se puede usar en Spring Boot Java. solo el array con los datos nada mas de texto.`;
  const dataModels = await sendMessage(messageDataModels);

  let messageFileSystemBuild = `Mira la estructura de este array: [
    {
      "id": 1,
      "name": ".gitignore",
      "type": "file",
      "parent": null,
      "content": "build/\\n.gradle/\\n*.jar\\n*.war\\n*.iml\\n.gradle/\\n.env\\n"
    },
    { "id": 2, "name": "gradle", "type": "folder", "parent": null, "content": null },
    {
      "id": 3,
      "name": "HELP.md",
      "type": "file",
      "parent": null,
      "content": "# Project Help\\nThis project uses Gradle for building Java applications."
    },
    {
      "id": 4,
      "name": "gradlew",
      "type": "file",
      "parent": null,
      "content": "Gradle Wrapper script for Unix-based systems."
    },
    {
      "id": 5,
      "name": "gradlew.bat",
      "type": "file",
      "parent": null,
      "content": "Gradle Wrapper script for Windows systems."
    },
    {
      "id": 6,
      "name": "build.gradle",
      "type": "file",
      "parent": null,
      "content": "plugins {\\n    id 'java'\\n}\\n\\nrepositories {\\n    mavenCentral()\\n}\\n\\ndependencies {\\n    implementation 'org.springframework.boot:spring-boot-starter'\\n}\\ntest {\\n    useJUnitPlatform()\\n}"
    },
    { "id": 7, "name": "src", "type": "folder", "parent": null, "content": null },
    { "id": 8, "name": "main", "type": "folder", "parent": 7, "content": null },
    { "id": 9, "name": "java", "type": "folder", "parent": 8, "content": null },
    { "id": 10, "name": "com", "type": "folder", "parent": 9, "content": null },
    { "id": 11, "name": "dino", "type": "folder", "parent": 10, "content": null },
    { "id": 12, "name": "dino", "type": "folder", "parent": 11, "content": null },
    {
      "id": 13,
      "name": "DinoApplication.java",
      "type": "file",
      "parent": 12,
      "content": "package com.dino.dino;\\n\\nimport org.springframework.boot.SpringApplication;\\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\\n\\n@SpringBootApplication\\npublic class DinoApplication {\\n    public static void main(String[] args) {\\n        SpringApplication.run(DinoApplication.class, args);\\n    }\\n}"
    },
    { "id": 14, "name": "resources", "type": "folder", "parent": 8, "content": null },
    {
      "id": 15,
      "name": "application.properties",
      "type": "file",
      "parent": 14,
      "content": "spring.application.name=DinoApplication\\nserver.port=8080\\n"
    },
    {
      "id": 16,
      "name": "settings.gradle",
      "type": "file",
      "parent": null,
      "content": "rootProject.name = 'dino'"
    }
  ], ahora modifícalo con estas consideraciones: el grupo es = ${valueGroupProyect}, el artefacto = ${valueArtefactProyect}, el nombre del proyecto = ${valueNameProyect}, la versión de spring boot = ${valueVersionSpringBootProyect}, considera que es una arquitectura ${architectureSelected} en spring boot, quiero que lo equimatices con esa arquitectura y pongas todas las carpetas que se tiene que considerar en esa arquitectura, integra, implementa y configura io.sentry:sentry-spring-boot-starter-jakarta, también org.springframework.boot:spring-boot-starter-actuator y io.micrometer:micrometer-registry-prometheus, por último agrega estos modelos de datos = ${dataModels}. Dame solo el array, quita esto: json y las comillas, nada mas.`;

  const fileSystemBuild = await sendMessage(messageFileSystemBuild);
  console.log(fileSystemBuild);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return  fileSystemBuild;
}

export default async function Generate() {
  let fileSytemDataProyectSelected = await load();
  const fileTree = buildTree(JSON.parse(fileSytemDataProyectSelected));

  return (
    <>
      <Main fileTree={fileTree} data={JSON.parse(fileSytemDataProyectSelected)} />
    </>
  );
}
