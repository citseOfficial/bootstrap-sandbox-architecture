import type { Metadata } from "next";
import { Poppins } from "next/font/google";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Términos de Uso",
  description:
    "Creacion de Arquitectura a partir de requerimientos del sistema utilizando IA Generativa.",
};

const inter = Poppins({ weight: "400", subsets: ["latin"] });

export default function TermsUse() {
  return (
    <div
      className="max-w-3xl mx-auto px-4 py-8 h-screen max-h-screen overflow-y-auto text-justify"
      style={inter.style}
    >
      <h1 className="text-3xl text-center mb-5 font-black pt-10">Términos de Uso</h1>
      <p className="text-sm text-center mb-8 text-gray-600 ">Estos terminos de uso rigen al software de BSA (Bootstap Sandbox Arquitecture) para su debido funcionamiento sin restrimsiones.</p>

      <section className="mb-6 border-t pt-10">
        <h2 className="text-xl font-semibold mb-4">
          1. Aceptación de los Términos
        </h2>
        <p className="text-sm text-gray-700">
          Al acceder y utilizar el software que genera arquitecturas mediante
          requerimientos y utiliza IA generativa para su construcción, el
          usuario acepta los presentes Términos de Uso en su totalidad. Si no
          está de acuerdo con estos términos, deberá abstenerse de utilizar el
          Servicio.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          2. Descripción del Servicio
        </h2>
        <p className="text-sm text-gray-700">
          El software permite a los usuarios definir ciertos requerimientos de
          un proyecto, tras lo cual el sistema ofrece varias arquitecturas
          basadas en dichos requerimientos, empleando IA generativa para su
          creación. Este Servicio está diseñado para ayudar en la planificación
          y desarrollo de proyectos tecnológicos.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">3. Uso del Servicio</h2>
        <p className="text-sm text-gray-700">
          El usuario acepta utilizar el Servicio únicamente para los fines
          previstos y dentro de los límites legales establecidos. Cualquier uso
          indebido, incluyendo la violación de derechos de propiedad intelectual
          o el uso no autorizado de arquitecturas generadas, está estrictamente
          prohibido.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          4. Propiedad Intelectual
        </h2>
        <p className="text-sm text-gray-700">
          Todo el contenido generado por el Servicio, incluidas las
          arquitecturas propuestas, está protegido por derechos de autor y
          pertenece al desarrollador del software. El usuario puede utilizar las
          arquitecturas generadas únicamente para proyectos propios o con los
          fines acordados.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">5. Responsabilidad</h2>
        <p className="text-sm text-gray-700">
          El software emplea tecnología de inteligencia artificial para generar
          arquitecturas según los requerimientos suministrados por el usuario.
          No obstante, el Servicio no garantiza que las arquitecturas generadas
          sean adecuadas o completamente libres de errores. El usuario es
          responsable de revisar y validar las arquitecturas antes de
          implementarlas en cualquier proyecto.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          6. Actualizaciones y Modificaciones
        </h2>
        <p className="text-sm text-gray-700">
          El desarrollador del software se reserva el derecho de actualizar o
          modificar el Servicio y estos Términos de Uso en cualquier momento sin
          previo aviso. El uso continuo del Servicio tras dichas modificaciones
          implica la aceptación de los términos revisados.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          7. Limitación de Responsabilidad
        </h2>
        <p className="text-sm text-gray-700">
          En la medida en que lo permita la ley, el desarrollador del software
          no será responsable de ningún daño directo, indirecto, incidental o
          consecuente derivado del uso o imposibilidad de uso del Servicio.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">8. Terminación</h2>
        <p className="text-sm text-gray-700">
          El acceso al Servicio puede ser suspendido o finalizado en cualquier
          momento por violación de estos Términos de Uso, o por cualquier otro
          motivo que el desarrollador considere pertinente.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">9. Ley Aplicable</h2>
        <p className="text-sm text-gray-700">
          Estos Términos de Uso se regirán e interpretarán de acuerdo con las
          leyes vigentes en la jurisdicción del desarrollador.
        </p>
      </section>

      <p className="border-t my-10 py-10 text-center">Ultima actualizacion: Septiembre 28, 2024</p>
    </div>
  );
}
