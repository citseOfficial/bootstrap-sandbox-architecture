import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { Main } from "./main";
import { cookies } from "next/headers";

export const runtime = "edge";

type FileSystemNode = {
  id: number;
  name: string;
  type: string;
  parent: number | null;
  children?: FileSystemNode[];
  content: string | null;
};

let fileTree: FileSystemNode[] = [];

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

function extractArray(text: string) {
  const arrayRegex = /\[(\s|.)*?\]/; // Regex para encontrar el array completo
  const match = text.match(arrayRegex); // Buscar el array en el texto

  if (match) {
    return match[0]; // Retornar el array encontrado
  } else {
    return null; // Si no encuentra el array
  }
}

async function load() {
  const cookieStore = cookies();
  const requirements = cookieStore.get("requirements")?.value;
  const valueNameProyect = cookieStore.get("valueNameProyect")?.value;
  const valueGroupProyect = cookieStore.get("valueGroupProyect")?.value;
  const valueArtefactProyect = cookieStore.get("valueArtefactProyect")?.value;
  const valueTypeDatabase = cookieStore.get("valueTypeDatabase")?.value;
  const architectureSelected = cookieStore.get("architectureSelected")?.value;
  const valueVersionSpringBootProyect = cookieStore.get(
    "valueVersionSpringBootProyect"
  )?.value;

  let messageDataModels = `De acuerdo a estos requerimientos del sistema: ${requirements},  quiero que me entregues un array con los nombres de los modelos de datos que se puede usar en Spring Boot Java. solo el array con los datos nada mas de texto.`;
  const dataModels = await sendMessage(messageDataModels);

  let messageFileSystemBuild = `Mira la estructura de este array: [
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
  ], ahora modifícalo con estas consideraciones: el grupo es = ${valueGroupProyect}, el artefacto = ${valueArtefactProyect}, el nombre del proyecto = ${valueNameProyect}, la versión de spring boot = ${valueVersionSpringBootProyect}, considera que es una arquitectura ${architectureSelected} en spring boot, quiero que lo equimatices con esa arquitectura y pongas todas las carpetas que se tiene que considerar en esa arquitectura, por último agrega estos modelos de datos = ${dataModels} y ponle atributos y relaciones entre ellos, recuerda es un proyecto en Java con Spring Boot, tambien quiero que generes un archivo script de base de datos ${valueTypeDatabase} del proyecto y ponlo dentro de la carpeta resources. Revisa bien el contenido y corrigelo, Dame solo el array que este de la carpeta src para abajo y quita el formato json. Recuerda solo quiero el array, nada mas de texto`;

  const fileSystemBuild = await sendMessage(messageFileSystemBuild);
  console.log(fileSystemBuild);

  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return fileSystemBuild;
}

function removeFileByName(fileName: string) {
  fileTree = fileTree.filter((file) => file.name !== fileName);
}

function searchParentFileByName(fileName: string) {
  const file = fileTree.find((file) => file.name === fileName);
  return file ? file.id : null;
}

function updateFileContent(fileName: string, newContent: string) {
  fileTree = fileTree.map((file) => {
    if (file.name === fileName) {
      return { ...file, content: newContent };
    }
    return file;
  });
}

function addFile(newFile: FileSystemNode) {
  fileTree.push(newFile);
}

export default async function Generate() {
  const cookieStore = cookies();
  const valueGroupProyect = cookieStore.get("valueGroupProyect")?.value;
  const valueArtefactProyect = cookieStore.get("valueArtefactProyect")?.value;
  const valueVersionSpringBootProyect = cookieStore.get(
    "valueVersionSpringBootProyect"
  )?.value;
  const valueNameProyect = cookieStore.get("valueNameProyect")?.value;
  let fileSytemDataProyectSelected = await load();
  fileTree = JSON.parse(fileSytemDataProyectSelected);
  addFile({
    id: 1392,
    name: "settings.gradle",
    type: "file",
    parent: null,
    content: `pluginManagement {\n  repositories {\n    maven { url 'https://repo.spring.io/milestone' }\n    maven { url 'https://repo.spring.io/snapshot' }\n    gradlePluginPortal()\n  }\n}\nrootProject.name = '${valueNameProyect}'\n`,
  });
  addFile({
    id: 116,
    name: "build.gradle",
    type: "file",
    parent: null,
    content: `plugins {\n\tid 'java'\n\tid 'org.springframework.boot' version '${valueVersionSpringBootProyect}'\n\tid 'io.spring.dependency-management' version '1.1.6'\n\tid \"io.sentry.jvm.gradle\" version \"4.11.0\"\n}\n\ngroup = '${valueGroupProyect}'\nversion = '0.0.1-SNAPSHOT'\n\njava {\n\ttoolchain {\n\t\tlanguageVersion = JavaLanguageVersion.of(17)\n\t}\n}\n\nrepositories {\n\tmavenCentral()\n\n\tmaven { url 'https://repo.spring.io/milestone' }\n\n\tmaven { url 'https://repo.spring.io/snapshot' }\n}\n\next {\n\tset('sentryVersion', \"7.14.0\")\n}\n\ndependencies {\n\timplementation 'org.springframework.boot:spring-boot-starter-web'\n\timplementation 'org.springframework.boot:spring-boot-starter-actuator'\n\timplementation 'io.sentry:sentry-spring-boot-starter-jakarta'\n\truntimeOnly 'io.micrometer:micrometer-registry-prometheus'\n\ttestImplementation 'org.springframework.boot:spring-boot-starter-test'\n\ttestRuntimeOnly 'org.junit.platform:junit-platform-launcher'\n}\n\nsentry {\n  includeSourceContext = true\n\n  org = \"citse\"\n  projectName = \"${valueNameProyect}\"\n  authToken = System.getenv(\"SENTRY_AUTH_TOKEN\")\n}\n\ndependencyManagement {\n\timports {\n\t\tmavenBom \"io.sentry:sentry-bom:\${sentryVersion}\"\n\t}\n}\n\ntasks.named('test') {\n\tuseJUnitPlatform()\n}\n`,
  });
  removeFileByName("application.properties");
  addFile({
    id: 115,
    name: "application.yml",
    type: "file",
    parent: searchParentFileByName("resources"),
    content: `server:\n  port: 8080\n\nspring.profiles.active: development\n\nmanagement:\n  endpoint:\n    env:\n      show-values: ALWAYS\n    health:\n      include:\n        show-details: always\n  endpoints:\n    web:\n      sensitive-information-exposure: always\n      exposure:\n        include: "*"\n    health:\n      include:\n        show-details: always\n\nsentry:\n  dns: {dns}\n  in-app-includes: ${valueGroupProyect}.${valueNameProyect} # directory-app \n  send-default-pii: true\n`,
  });
  addFile({
    id: 1909,
    name: "HELP.md",
    type: "file",
    parent: null,
    content:
      "# Getting Started\n\n### Reference Documentation\nFor further reference, please consider the following sections:\n\n* [Official Gradle documentation](https://docs.gradle.org)\n* [Spring Boot Gradle Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/3.2.9/gradle-plugin/reference/html/)\n* [Create an OCI image](https://docs.spring.io/spring-boot/docs/3.2.9/gradle-plugin/reference/html/#build-image)\n* [Sentry](https://docs.sentry.io/platforms/java/)\n* [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/3.2.9/reference/htmlsingle/index.html#actuator)\n* [Prometheus](https://docs.spring.io/spring-boot/docs/3.2.9/reference/htmlsingle/index.html#actuator.metrics.export.prometheus)\n\n### Guides\nThe following guides illustrate how to use some features concretely:\n\n* [Getting Started with Sentry](https://docs.sentry.io/platforms/java/guides/spring-boot/)\n* [Building a RESTful Web Service with Spring Boot Actuator](https://spring.io/guides/gs/actuator-service/)\n\n### Additional Links\nThese additional references should also help you:\n\n* [Gradle Build Scans – insights for your project's build](https://scans.gradle.com#gradle)\n",
  });
  addFile({
    id: 1,
    name: ".gitignore",
    type: "file",
    parent: null,
    content: "build/\n.gradle/\n*.jar\n*.war\n*.iml\n.gradle/\n.env\n",
  });
  addFile({
    id: 4889,
    name: "fly.toml",
    type: "file",
    parent: null,
    content: `# fly.toml app configuration file generated for ceis-api on 2024-11-12T11:52:13Z
#
# See https://fly.io/docs/reference/configuration/ for information about how to use this file.
#

app = 'ceis-api'
primary_region = 'scl'

[build]

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = "off"
  auto_start_machines = true
  min_machines_running = 1
  processes = ['app']

[[vm]]
  memory = "2gb"
  cpus = 4
  cpu_kind = "shared"
  memory_mb = 2048

[http_service.http_options]
  idle_timeout = 270

[[services]]
  http_checks = []
  internal_port = 8080
  processes = ["app"]
  protocol = "tcp"
  script_checks = []
  auto_stop_machines = "off"
  auto_start_machines = true
  min_machines_running = 0
  [services.concurrency]
    hard_limit = 200
    soft_limit = 100
    type = "connections"
`,
  });

  addFile({
    id: 1799,
    name: "Dockerfile",
    type: "file",
    parent: null,
    content: `# JDK y Gradle
FROM gradle:8.10.2-jdk17 AS build

# directory
WORKDIR /app
COPY . /app

# Deshabilitar la supervisión de archivos en Gradle
ENV GRADLE_OPTS="-Dorg.gradle.vfs.watch=false"

# run gradle
RUN gradle clean build

# create image
FROM openjdk:17-slim
EXPOSE 8080
COPY --from=build /app/build/libs/ceis-0.0.1-SNAPSHOT.jar /app/ceis-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "/app/ceis-0.0.1-SNAPSHOT.jar"]
`,
  });

  const fileTreeBuilder = buildTree(fileTree);

  return (
    <>
      <Main fileTree={fileTreeBuilder} data={fileTree} />
    </>
  );
}
