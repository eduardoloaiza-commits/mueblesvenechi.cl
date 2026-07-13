import Link from "next/link";
import { GuideLayout } from "@/components/GuideLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Granito, cuarzo o piedra sinterizada: cuál elegir",
  description:
    "Comparación honesta entre granito, cuarzo y piedra sinterizada para cubiertas de cocina: durabilidad, mantención, calor, manchas y precio, explicada por una marmolería del sur de Chile.",
  path: "/guias/granito-cuarzo-o-piedra-sinterizada",
  ogImage: "/images/marble-granite.jpg",
});

export default function GuiaPiedrasPage() {
  return (
    <GuideLayout
      title="Granito, cuarzo o piedra sinterizada: ¿cuál elegir?"
      description={metadata.description!}
      path="/guias/granito-cuarzo-o-piedra-sinterizada"
      crumbName="Granito, cuarzo o sinterizada"
      datePublished="2026-07-08"
      lede="Cortamos y pulimos las tres piedras todas las semanas en nuestra marmolería. Esta es la comparación que hacemos con cada cliente frente a las placas."
      ctaTitle="Compara las piedras con tu cocina real"
    >
      <p>
        Elegir la cubierta es la decisión más importante de una cocina a medida: es la superficie
        donde vas a cortar, apoyar ollas y limpiar todos los días durante años. Como marmolería
        trabajamos los tres materiales y no tenemos un caballo en la carrera; lo que sigue es lo
        que le decimos a cualquier cliente que visita el taller.
      </p>

      <h2>La comparación en una tabla</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Granito</th>
            <th>Cuarzo</th>
            <th>Sinterizada</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Qué es</strong></td>
            <td>Piedra 100% natural, cortada de una placa única.</td>
            <td>Piedra de ingeniería: mineral de cuarzo con resinas.</td>
            <td>Minerales compactados a altísima presión y temperatura.</td>
          </tr>
          <tr>
            <td><strong>Calor directo</strong></td>
            <td>Excelente. Tolera ollas calientes.</td>
            <td>Regular. Usar siempre posa fuentes.</td>
            <td>Excelente. Soporta calor directo.</td>
          </tr>
          <tr>
            <td><strong>Manchas</strong></td>
            <td>Buena, requiere sellado periódico.</td>
            <td>Excelente. No porosa, no absorbe.</td>
            <td>Excelente. Prácticamente inmanchable.</td>
          </tr>
          <tr>
            <td><strong>Rayas</strong></td>
            <td>Muy resistente.</td>
            <td>Resistente, evitar cortar directo.</td>
            <td>La más resistente: no la raya un cuchillo.</td>
          </tr>
          <tr>
            <td><strong>Mantención</strong></td>
            <td>Sellado cada 1 a 2 años.</td>
            <td>Ninguna especial.</td>
            <td>Ninguna especial.</td>
          </tr>
          <tr>
            <td><strong>Estética</strong></td>
            <td>Veteado natural, cada placa es única.</td>
            <td>Color uniforme, amplia gama de tonos.</td>
            <td>Formatos grandes, imita mármol y piedra.</td>
          </tr>
          <tr>
            <td><strong>Precio relativo</strong></td>
            <td>$$</td>
            <td>$$$</td>
            <td>$$$$</td>
          </tr>
        </tbody>
      </table>

      <h2>Granito: la piedra de siempre, por buenas razones</h2>
      <p>
        El granito lleva décadas en las cocinas chilenas porque funciona. Es durísimo, no le teme
        al calor y cada placa tiene un dibujo irrepetible: tu cubierta no existe en ninguna otra
        casa. Su único cuidado real es el sellado periódico, porque al ser piedra natural tiene
        poros que pueden absorber líquidos si se descuida.
      </p>
      <p>
        <strong>Elígelo si</strong> valoras la piedra natural, cocinas mucho con ollas y sartenes
        pesados, y no te complica pasarle un sellador cada un año o dos.
      </p>

      <h2>Cuarzo: el favorito de las cocinas modernas</h2>
      <p>
        El cuarzo es piedra de ingeniería: mineral natural molido y unido con resinas. El
        resultado es una superficie sin poros, de color parejo, que no absorbe vino, café ni limón
        y no necesita sellado nunca. Es el material que más instalamos hoy, sobre todo en tonos
        claros que el granito no logra.
      </p>
      <p>
        Su punto débil es el calor: las resinas pueden dañarse con una olla recién sacada del
        fuego, así que el posa fuentes es obligatorio.
      </p>
      <p>
        <strong>Elígelo si</strong> buscas una cocina clara y uniforme, quieres cero mantención y
        tienes la disciplina del posa fuentes.
      </p>

      <h2>Piedra sinterizada: la tecnología de punta</h2>
      <p>
        La sinterizada es el material más avanzado que trabajamos: minerales compactados a presión
        y temperatura extremas, sin resinas. Aguanta calor directo, no la raya un cuchillo, no se
        mancha y viene en formatos grandes que permiten cubiertas e islas con junturas mínimas.
        Muchas imitan mármol de forma notable.
      </p>
      <p>
        Es también la más cara, y su dureza tiene una contracara: un golpe seco en un borde o
        esquina puede picarla, y la reparación es más compleja que en granito.
      </p>
      <p>
        <strong>Elígela si</strong> el proyecto es de alto estándar, la isla es protagonista o
        quieres el look mármol sin sus cuidados.
      </p>

      <h2>¿Y el postformado?</h2>
      <p>
        No es piedra, pero merece mención honesta: para presupuestos acotados o propiedades de
        arriendo, un postformado bien instalado cumple. Nuestra sugerencia es simple: si el
        presupuesto permite subir a piedra, sube; la diferencia se nota todos los días. Más detalle
        en la página de <Link href="/cubiertas-de-piedra">cubiertas de piedra</Link>.
      </p>

      <div className="callout">
        <p>
          <strong>Nuestro consejo de marmolería:</strong> no elijas la piedra por foto. Los
          veteados, brillos y tonos cambian según la placa y la luz. En el taller de Villarrica
          puedes ver y tocar las placas reales antes de decidir; ninguna pantalla reemplaza eso.
        </p>
      </div>

      <h2>Cómo afecta tu presupuesto</h2>
      <p>
        En una cocina promedio, pasar de postformado a granito o cuarzo agrega algunos cientos de
        miles de pesos; pasar a sinterizada, algo más. Para dimensionarlo en tu caso concreto, el{" "}
        <Link href="/cotiza">configurador</Link> permite cambiar de material y ver cómo se mueve el
        precio al instante. Y si quieres el panorama completo de valores, revisa la guía{" "}
        <Link href="/guias/cuanto-cuesta-una-cocina-a-medida">cuánto cuesta una cocina a medida</Link>.
      </p>
    </GuideLayout>
  );
}
