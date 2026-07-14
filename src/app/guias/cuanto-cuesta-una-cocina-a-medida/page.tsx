import Link from "next/link";
import { GuideLayout } from "@/components/GuideLayout";
import { pageMetadata } from "@/lib/seo";
import { calcPrice, formatCLP, type KitchenConfig } from "@/lib/pricing";

export const metadata = pageMetadata({
  title: "¿Cuánto cuesta una cocina a medida en Chile? Guía 2026",
  description:
    "Valores de referencia por tamaño de cocina, qué factores encarecen el proyecto y dónde conviene invertir. Escrito por un fabricante del sur de Chile, con precios de su propio taller.",
  path: "/guias/cuanto-cuesta-una-cocina-a-medida",
});

// Ejemplos calculados con el motor real del configurador, para que la guía
// nunca quede desfasada de la tabla de precios vigente.
const ejemplo = (config: KitchenConfig) => calcPrice(config);

const compacta = ejemplo({
  layout: "lineal",
  baseMeters: 2.4,
  drawerMeters: 0.5,
  wallMeters: 1.8,
  wallPosition: "centro",
  countertop: "postformado",
  front: "melamina-mate",
  extras: ["lavaplatos"],
  projectType: "nueva",
});

const media = ejemplo({
  layout: "l",
  baseMeters: 3.6,
  drawerMeters: 1,
  wallMeters: 2.4,
  wallPosition: "centro",
  countertop: "cuarzo",
  front: "melamina-madera",
  extras: ["lavaplatos", "especiero", "basurero-retractil"],
  projectType: "nueva",
});

const premium = ejemplo({
  layout: "isla",
  baseMeters: 4.2,
  drawerMeters: 1.5,
  wallMeters: 2.4,
  wallPosition: "centro",
  countertop: "ultracompacto",
  front: "laqueado",
  lacquerColor: "negro",
  extras: ["lavaplatos", "especiero", "basurero-retractil", "vitrinas", "iluminacion"],
  projectType: "nueva",
});

export default function GuiaPreciosPage() {
  return (
    <GuideLayout
      title="¿Cuánto cuesta una cocina a medida en Chile?"
      description={metadata.description!}
      path="/guias/cuanto-cuesta-una-cocina-a-medida"
      crumbName="Cuánto cuesta una cocina a medida"
      datePublished="2026-07-08"
      lede="La pregunta que más nos hacen, respondida con números de nuestro propio taller. Sin el clásico 'depende' como única respuesta."
      ctaTitle="Calcula el precio de tu cocina en 5 minutos"
    >
      <p>
        Somos fabricantes, así que vamos a hacer algo poco habitual en esta industria: darte
        números concretos. Los valores de esta guía salen de la misma tabla de precios que usa
        nuestro <Link href="/cotiza">configurador online</Link>, y son valores "desde", netos
        (+ IVA), para la zona de Villarrica, Pucón y Lican Ray. Tu proyecto exacto puede variar,
        pero con esto ya puedes presupuestar en serio.
      </p>

      <h2>Tres cocinas de referencia</h2>
      <table>
        <thead>
          <tr>
            <th>Cocina</th>
            <th>Qué incluye</th>
            <th>Valor desde</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Compacta</strong></td>
            <td>Lineal de 2,4 m, cubierta postformada, melamina lisa y lavaplatos. Cajones con riel telescópico incluidos.</td>
            <td>{formatCLP(compacta.from)} + IVA</td>
          </tr>
          <tr>
            <td><strong>Familiar en L</strong></td>
            <td>3,6 m en L con un metro de cajonera, cubierta de cuarzo, melamina símil madera, lavaplatos, especiero y basurero retráctil.</td>
            <td>{formatCLP(media.from)} + IVA</td>
          </tr>
          <tr>
            <td><strong>Premium con isla</strong></td>
            <td>4,2 m más isla central, piedra ultracompacta, frentes laqueados, vitrinas de vidrio e iluminación LED.</td>
            <td>{formatCLP(premium.from)} + IVA</td>
          </tr>
        </tbody>
      </table>
      <p>
        Estos valores son netos (no incluyen IVA) e incluyen fabricación, cubierta, herrajes,
        flete e instalación. No incluyen electrodomésticos, grifería ni obras de gasfitería o
        electricidad, que casi siempre conviene resolver con maestros locales antes del montaje.
        La campana no se vende, pero dejamos el espacio listo en el diseño.
      </p>

      <h2>Qué define el precio de una cocina a medida</h2>
      <h3>1. Los metros lineales</h3>
      <p>
        Es el factor número uno. Una cocina se cotiza principalmente por los metros de mueble base
        (los muebles de piso) y de mueble mural (los aéreos). Duplicar los metros prácticamente
        duplica esa parte del presupuesto, así que la primera decisión inteligente es definir
        cuánto mueble necesitas de verdad y no cuánto cabe.
      </p>
      <h3>2. La cubierta</h3>
      <p>
        Aquí está la diferencia más grande entre una cocina económica y una premium. El postformado
        es la entrada; la porcelánica y el cuarzo son el rango medio alto donde se mueve la mayoría
        de nuestros proyectos; la piedra ultracompacta es la línea superior. Comparamos los
        materiales en detalle en la guía{" "}
        <Link href="/guias/granito-cuarzo-o-piedra-sinterizada">granito, cuarzo o piedra sinterizada</Link>.
      </p>
      <h3>3. Los frentes</h3>
      <p>
        La melamina lisa es el estándar actual: dura, fácil de limpiar y con buenos colores. La
        melamina símil madera cuesta algo más y es la favorita en el sur. El laqueado es la
        terminación premium, con un salto de precio importante que se justifica en cocinas
        protagonistas.
      </p>
      <h3>4. Isla, extras y tipo de proyecto</h3>
      <p>
        Una isla agrega mueble, cubierta y complejidad de instalación, por lo que tiene un valor
        propio. Los tramos con cajonera valen más por metro que los de puertas (los rieles
        telescópicos van incluidos), y extras como lavaplatos instalado, vitrinas de vidrio o
        iluminación LED suman de a poco. Y si es remodelación, considera el retiro de la cocina
        antigua.
      </p>

      <div className="callout">
        <p>
          <strong>Regla rápida de presupuesto:</strong> si tu cocina tiene entre 3 y 4 metros de
          muebles, presupuesta desde {formatCLP(media.from)} + IVA con cuarzo. Si el número te acomoda,
          cotiza en serio con medidas reales. Si no, hay dos palancas para bajar: menos metros de
          mueble mural o una cubierta más económica.
        </p>
      </div>

      <h2>Dónde conviene invertir (y dónde ahorrar)</h2>
      <p>
        Después de {new Date().getFullYear() - 2011} años fabricando cocinas, nuestra recomendación
        honesta:
      </p>
      <ul>
        <li>
          <strong>Invierte en la cubierta.</strong> Es la superficie que trabaja todos los días y
          la que define cómo se ve la cocina. Una buena piedra envejece bien; un postformado barato
          se nota a los dos años.
        </li>
        <li>
          <strong>Invierte en cajones sobre puertas.</strong> Un mueble base con cajones de
          apertura total es más caro que uno con puertas, pero cambia la vida diaria. Es el
          upgrade con mejor relación precio y felicidad.
        </li>
        <li>
          <strong>Ahorra en el mueble mural.</strong> Si el presupuesto aprieta, menos aéreos y una
          buena repisa abierta resuelven igual, y siempre puedes agregar después.
        </li>
        <li>
          <strong>No ahorres en la medición.</strong> Trabaja con alguien que mida en terreno antes
          de fabricar. Las cocinas "estándar" ajustadas a golpes en tu casa terminan costando más.
        </li>
      </ul>

      <h2>¿Por qué los precios varían tanto entre cotizaciones?</h2>
      <p>
        Porque no todas las cotizaciones incluyen lo mismo. Al comparar, verifica tres cosas: si la
        cubierta está incluida y de qué material exacto es, si el precio incluye flete e
        instalación, y qué espesor de tablero y calidad de herrajes están usando. Una cotización
        que parece más barata suele estar dejando algo de eso afuera.
      </p>
      <p>
        La forma más rápida de tener tu propio número: arma tu cocina en el{" "}
        <Link href="/cotiza">configurador</Link> con tus medidas aproximadas. Obtienes un valor
        estimado al instante y, si te hace sentido, coordinamos la medición en terreno para cerrar
        el precio final.
      </p>
    </GuideLayout>
  );
}
