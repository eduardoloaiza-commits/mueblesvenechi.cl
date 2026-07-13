import Link from "next/link";
import { GuideLayout } from "@/components/GuideLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cómo medir tu cocina para cotizar (guía paso a paso)",
  description:
    "Con una huincha y diez minutos obtienes las medidas necesarias para cotizar una cocina a medida: paredes, metros lineales de mueble base y mural, y los puntos que no puedes olvidar.",
  path: "/guias/como-medir-tu-cocina",
});

export default function GuiaMedirPage() {
  return (
    <GuideLayout
      title="Cómo medir tu cocina para cotizar"
      description={metadata.description!}
      path="/guias/como-medir-tu-cocina"
      crumbName="Cómo medir tu cocina"
      datePublished="2026-07-08"
      lede="No necesitas planos ni experiencia: con una huincha de medir y esta guía sacas en diez minutos las medidas que el configurador te pide."
      ctaTitle="¿Ya tienes tus medidas? Cotiza ahora"
    >
      <p>
        Para darte una estimación seria solo necesitamos dos números: cuántos metros de mueble base
        (los muebles de piso) y cuántos de mueble mural (los aéreos) tendrá tu cocina. Antes de
        fabricar igual vamos a medir a tu casa con precisión milimétrica, así que aquí buscamos
        una buena aproximación, no perfección.
      </p>

      <h2>Lo que necesitas</h2>
      <ul>
        <li>Una huincha de medir (ideal de 5 metros).</li>
        <li>Papel y lápiz, o las notas del teléfono.</li>
        <li>Diez minutos con la cocina despejada.</li>
      </ul>

      <h2>Paso 1: dibuja la planta a mano alzada</h2>
      <p>
        Mira tu cocina desde arriba e imagina el dibujo de las paredes donde irán muebles. No tiene
        que ser bonito: un rectángulo con las paredes marcadas basta. Anota dónde están la puerta,
        la ventana, y las conexiones de agua y gas, porque definen dónde pueden ir el lavaplatos y
        la cocina.
      </p>

      <h2>Paso 2: mide cada pared con mueble</h2>
      <p>
        Mide de esquina a esquina, a la altura de la cintura, cada pared donde habrá muebles.
        Anota el largo en centímetros sobre tu dibujo. Si una pared tiene una ventana baja o un
        radiador, mide también dónde empieza y termina, porque ahí el mueble mural no puede ir.
      </p>

      <h2>Paso 3: calcula tus metros lineales</h2>
      <p>
        Suma los largos de las paredes con mueble base y conviértelos a metros: esos son tus{" "}
        <strong>metros de mueble base</strong>. Haz lo mismo con los tramos donde quieres muebles
        aéreos: esos son tus <strong>metros de mueble mural</strong>. El mural casi siempre es
        menor, porque la campana, la ventana y el refrigerador ocupan pared.
      </p>

      <div className="callout">
        <p>
          <strong>Ejemplo real:</strong> una cocina en L con una pared de 2,8 m y otra de 1,6 m
          tiene 4,4 m de mueble base. Si sobre la pared larga van aéreos en 2,2 m y sobre la corta
          en 1,2 m, son 3,4 m de mueble mural. Con esos dos números el{" "}
          <Link href="/cotiza">configurador</Link> ya te da un precio estimado.
        </p>
      </div>

      <h2>Paso 4: anota las alturas</h2>
      <p>
        Mide del piso al cielo en un par de puntos. La altura estándar de cielo permite aéreos
        normales; si tu cocina tiene cielo bajo, vigas o cielo inclinado (común en casas del sur),
        anótalo para conversarlo en la visita.
      </p>

      <h2>Paso 5: registra lo que no se mueve</h2>
      <p>
        Hay cosas que la cocina nueva debe respetar. Márcalas en tu dibujo:
      </p>
      <ul>
        <li>La llave de agua y el desagüe (define la zona del lavaplatos).</li>
        <li>La conexión de gas o el enchufe de la encimera eléctrica.</li>
        <li>Enchufes existentes sobre la cubierta.</li>
        <li>El espacio del refrigerador, con su ancho real.</li>
        <li>Puertas y ventanas que abren hacia adentro.</li>
      </ul>
      <p>
        Mover agua o gas es posible, pero es obra aparte y conviene saberlo desde el principio para
        que la cotización sea realista.
      </p>

      <h2>Los errores que más vemos</h2>
      <ul>
        <li>
          <strong>Medir con los muebles antiguos puestos.</strong> Si puedes, mide la pared limpia;
          si no, mide por encima y descuenta el zócalo.
        </li>
        <li>
          <strong>Olvidar el refrigerador.</strong> Es el electrodoméstico más grande y el que más
          arruina diseños hechos de memoria. Mídelo.
        </li>
        <li>
          <strong>Redondear demasiado.</strong> Anota 283 cm, no "como 3 metros". La estimación
          mejora mucho con números reales.
        </li>
        <li>
          <strong>Ignorar las esquinas.</strong> En cocinas en L o U, la esquina comparte espacio
          entre dos muebles. No sumes dos veces el mismo rincón: mide cada pared hasta la esquina y
          nosotros resolvemos el encuentro.
        </li>
      </ul>

      <h2>¿Y ahora?</h2>
      <p>
        Con tus metros de base y mural anotados, entra al{" "}
        <Link href="/cotiza">configurador de cocinas</Link>: eliges distribución, cubierta y
        terminaciones, y ves el precio estimado en vivo. Si el número te hace sentido, coordinamos
        la medición profesional en terreno y desde ahí corren los{" "}
        <Link href="/cocinas-a-medida">40 días de fabricación y montaje</Link>.
      </p>
    </GuideLayout>
  );
}
