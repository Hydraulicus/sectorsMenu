function createSectorsMenu(
  {
    id = 'sectorsMenu',
    radius = 100, // px
    spread = 100, // px
    styles,
    topText = 'top text',
    topTextStyles,
    bottomText = 'bottom text',
    bottomTextStyles,
    sectors = [
      {
        // startAngle,
        // endAngle,
        // icon,
        // iconStyles,
        // topText = 'top text',
        // topTextStyles,
        // bottomText = 'bottom text',
        // bottomTextStyles,
      },
      {},
      {},
      {},
      {},
      {},
    ],
  }
) {

  const cx = 200;
  const cy = 200;

  const menuSvgParent = document.getElementById(id);
    console.log(id, 'menuSvgParent = ', menuSvgParent);

  /** draw sectors */
  let sectorAngle = 360 / sectors.length / 2;
  const sectorsArr = [];
  for (let i = 0; i <= sectors.length - 1; i+=1) {

    const startAngle = sectorAngle;
    const endAngle = sectorAngle + 360 / sectors.length;
    sectorAngle = endAngle;

    const d = describeArc({ x: cx, y: cy, radius, spread, startAngle, endAngle, });
    sectorsArr.push(`<path d="${d}" class="segment"/>`);

  }

  /** insert central circle */
  sectorsArr.push(`<circle cx="${cx}" cy="${cy}" r="${radius * 0.9}" class="centralCircle"/>`);

  menuSvgParent.innerHTML = sectorsArr.join('');

}

function describeArc({ x, y, radius, spread, startAngle, endAngle, }){
  const innerStart = polarToCartesian(x, y, radius, endAngle);
  const innerEnd = polarToCartesian(x, y, radius, startAngle + 5);
  const outerStart = polarToCartesian(x, y, radius + spread, endAngle);
  const outerEnd = polarToCartesian(x, y, radius + spread, startAngle + 2.5 );

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    "M", outerStart.x, outerStart.y,
    "A", radius + spread, radius + spread, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
    "L", innerEnd.x, innerEnd.y,
    "A", radius, radius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
    "L", outerStart.x, outerStart.y, "Z"
  ].join(" ");

  return d;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}
