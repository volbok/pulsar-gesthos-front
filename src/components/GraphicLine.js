/* eslint eqeqeq: "off" */
import React, { useState, useEffect, useContext } from 'react';
import Context from '../pages/Context';

export default function GraphicLine({ height, width, pontos, cor, altura, viewbox, gap }) {

  // definindo cores do gráfico conforme as cores do css.
  var r = document.querySelector(':root');
  var rs = getComputedStyle(r);
  var cortexto = rs.getPropertyValue('--texto1');

  const {
    card,
  } = useContext(Context);

  const [ponto1, setponto1] = useState(0);
  const [ponto2, setponto2] = useState(0);
  const [ponto3, setponto3] = useState(0);
  const [ponto4, setponto4] = useState(0);
  const [ponto5, setponto5] = useState(0);

  const [valor1, setvalor1] = useState(0);
  const [valor2, setvalor2] = useState(0);
  const [valor3, setvalor3] = useState(0);
  const [valor4, setvalor4] = useState(0);
  const [valor5, setvalor5] = useState(0);

  useEffect(() => {
    if (card === 'card-sinaisvitais') {

      setponto1(altura - pontos.slice(0, 1).map(item => item.valor));
      setponto2(altura - pontos.slice(1, 2).map(item => item.valor));
      setponto3(altura - pontos.slice(2, 3).map(item => item.valor));
      setponto4(altura - pontos.slice(3, 4).map(item => item.valor));
      setponto5(altura - pontos.slice(4, 5).map(item => item.valor));

      setvalor1(pontos.slice(0, 1).map(item => item.valor));
      setvalor2(pontos.slice(1, 2).map(item => item.valor));
      setvalor3(pontos.slice(2, 3).map(item => item.valor));
      setvalor4(pontos.slice(3, 4).map(item => item.valor));
      setvalor5(pontos.slice(4, 5).map(item => item.valor));

      /*
      setponto1(altura - 0);
      setponto2(altura - 100);
      setponto3(altura - 100);
      setponto4(altura - 100);
      setponto5(altura - 300);

      setvalor1(altura - 0);
      setvalor2(altura - 100);
      setvalor3(altura - 100);
      setvalor4(altura - 100);
      setvalor5(altura - 300);
      */

    }
    // eslint-disable-next-line
  }, [card]);

  return (
    <svg
      viewBox={viewbox}
      height={height}
      width={width}
      overflow={'visible'}
    >
      <path className='blink'
        style={{
          fill: 'none',
          stroke: cor,
          strokeWidth: 5,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeMiterlimit: 4,
          strokeDasharray: 'none',
        }}
        d={"M 0 " + ponto1 + "L " + gap + " " + ponto2 + "L " + 2 * gap + " " + ponto3 + "L " + 3 * gap + " " + ponto4 + "L " + 4 * gap + " " + ponto5}
        id="path"
      />

      <text
        className='graficostag'
        x="0" y={ponto1 - 25}
        text-anchor="middle"
        font-family='Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
        stroke={cortexto}
        fontSize={18}
      >
        {valor1}
      </text>
      <text className='graficostag'
        x={gap} y={ponto2 - 25}
        text-anchor="middle"
        font-family='Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
        stroke={cortexto}
        fontSize={18}
      >
        {valor2}
      </text>
      <text className='graficostag'
        x={2 * gap} y={ponto3 - 25}
        text-anchor="middle"
        font-family='Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
        stroke={cortexto}
        fontSize={18}
      >
        {valor3}
      </text>
      <text className='graficostag'
        x={3 * gap} y={ponto4 - 25}
        text-anchor="middle"
        font-family='Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
        stroke={cortexto}
        fontSize={18}
      >
        {valor4}
      </text>
      <text className='graficostag'
        x={4 * gap} y={ponto5 - 25}
        text-anchor="middle"
        font-family='Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
        stroke={cortexto}
        fontSize={18}
      >
        {valor5}
      </text>

      <circle className='graficosdots' cx="0" cy={ponto1} r="10" fill={cor} />
      <circle className='graficosdots' cx={gap} cy={ponto2} r="10" fill={cor} />
      <circle className='graficosdots' cx={2 * gap} cy={ponto3} r="10" fill={cor} />
      <circle className='graficosdots' cx={3 * gap} cy={ponto4} r="10" fill={cor} />
      <circle className='graficosdots' cx={4 * gap} cy={ponto5} r="10" fill={cor} />
    </svg>
  )
}
