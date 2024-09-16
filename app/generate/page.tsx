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

  // Controllers
  { id: 12, name: "controller", type: "folder", parent: 11, content: null },
  {
    id: 13,
    name: "PersonaController.java",
    type: "file",
    parent: 12,
    content: `package com.dino.dino.controller;\n\nimport com.dino.dino.service.PersonaService;\nimport org.springframework.web.bind.annotation.*;\nimport java.util.List;\n\n@RestController\n@RequestMapping("/personas")\npublic class PersonaController {\n\n    private final PersonaService personaService;\n\n    public PersonaController(PersonaService personaService) {\n        this.personaService = personaService;\n    }\n\n    @GetMapping\n    public List<Persona> getAllPersonas() {\n        return personaService.getAllPersonas();\n    }\n\n    @PostMapping\n    public Persona createPersona(@RequestBody Persona persona) {\n        return personaService.createPersona(persona);\n    }\n}`,
  },

  { id: 14, name: "service", type: "folder", parent: 11, content: null },
  {
    id: 15,
    name: "PersonaService.java",
    type: "file",
    parent: 14,
    content: `package com.dino.dino.service;\n\nimport com.dino.dino.model.Persona;\nimport com.dino.dino.repository.PersonaRepository;\nimport org.springframework.stereotype.Service;\nimport java.util.List;\n\n@Service\npublic class PersonaService {\n\n    private final PersonaRepository personaRepository;\n\n    public PersonaService(PersonaRepository personaRepository) {\n        this.personaRepository = personaRepository;\n    }\n\n    public List<Persona> getAllPersonas() {\n        return personaRepository.findAll();\n    }\n\n    public Persona createPersona(Persona persona) {\n        return personaRepository.save(persona);\n    }\n}`,
  },

  { id: 16, name: "repository", type: "folder", parent: 11, content: null },
  {
    id: 17,
    name: "PersonaRepository.java",
    type: "file",
    parent: 16,
    content: `package com.dino.dino.repository;\n\nimport com.dino.dino.model.Persona;\nimport org.springframework.data.jpa.repository.JpaRepository;\n\npublic interface PersonaRepository extends JpaRepository<Persona, Long> {\n}`,
  },

  { id: 18, name: "model", type: "folder", parent: 11, content: null },
  {
    id: 19,
    name: "Persona.java",
    type: "file",
    parent: 18,
    content: `package com.dino.dino.model;\n\nimport javax.persistence.*;\n\n@Entity\npublic class Persona {\n\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    private String nombre;\n    private String apellido;\n    private int edad;\n\n    // Getters and Setters\n}`,
  },
  {
    id: 20,
    name: "Usuario.java",
    type: "file",
    parent: 18,
    content: `package com.dino.dino.model;\n\nimport javax.persistence.*;\n\n@Entity\npublic class Usuario {\n\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    private String username;\n    private String password;\n\n    // Getters and Setters\n}`,
  },

  { id: 21, name: "resources", type: "folder", parent: 8, content: null },
  {
    id: 22,
    name: "application.properties",
    type: "file",
    parent: 21,
    content: "spring.application.name=DinoApplication\nserver.port=8080\n",
  },
  {
    id: 23,
    name: "settings.gradle",
    type: "file",
    parent: null,
    content: `rootProject.name = 'dino'`,
  },
];
let fileSytemDataProyectSelected: FileSystemNode[] = [];

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
const fileTree = buildTree(fileSytemDataProyectSelected);

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

  let messageSelectedArchitecture = ``
  const selectedArchitecture = await sendMessage(messageSelectedArchitecture);

  await new Promise((resolve) => setTimeout(resolve, 2000));
}

export default async function Generate() {
  await load();

  return (
    <>
      <Main fileTree={fileTree} data={fileSystemData} />
    </>
  );
}
