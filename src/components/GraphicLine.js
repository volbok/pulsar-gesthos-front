/* eslint eqeqeq: "off" */
import React, { useState, useEffect, useContext } from 'react';
import Context from '../pages/Context';
export default function GraphicLine({ height, width, pontos, cor }) {

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
      setponto1(300 - pontos.slice(0, 1).map(item => item.valor));
      setponto2(300 - pontos.slice(1, 2).map(item => item.valor));
      setponto3(300 - pontos.slice(2, 3).map(item => item.valor));
      setponto4(300 - pontos.slice(3, 4).map(item => item.valor));
      setponto5(300 - pontos.slice(4, 5).map(item => item.valor));

      setvalor1(pontos.slice(0, 1).map(item => item.valor));
      setvalor2(pontos.slice(1, 2).map(item => item.valor));
      setvalor3(pontos.slice(2, 3).map(item => item.valor));
      setvalor4(pontos.slice(3, 4).map(item => item.valor));
      setvalor5(pontos.slice(4, 5).map(item => item.valor));
    }
    // eslint-disable-next-line
  }, [card]);

  return (
    <div className='destaque' style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <svg
        viewBox="-25 0 460 250">
        <path
          style={{
            fill: 'none',
            stroke: cor,
            strokeWidth: 3,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeMiterlimit: 4,
            strokeDasharray: 'none',
            strokeOpacity: 0.5
          }}
          d={"M 0 " + ponto1 + "L 100 " + ponto2 + "L 200 " + ponto3 + "L 300 " + ponto4 + "L 400 " + ponto5}
          id="path"
        />
        <text
          x="0" y={ponto1 - 10}
          text-anchor="middle"
          font-family='Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
          stroke={cortexto}
          fontSize={10}
        >
          {valor1}
        </text>
        <text
          x="100" y={ponto2 - 10}
          text-anchor="middle"
          font-family='Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
          stroke={cortexto}
          fontSize={10}
        >
          {valor2}
        </text>
        <text
          x="200" y={ponto3 - 10}
          text-anchor="middle"
          font-family='Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
          stroke={cortexto}
          fontSize={10}
        >
          {valor3}
        </text>
        <text
          x="300" y={ponto4 - 10}
          text-anchor="middle"
          font-family='Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
          stroke={cortexto}
          fontSize={10}
        >
          {valor4}
        </text>
        <text
          x="400" y={ponto5 - 10}
          text-anchor="middle"
          font-family='Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
          stroke={cortexto}
          fontSize={10}
        >
          {valor5}
        </text>
        <circle cx="0" cy={ponto1} r="5" fill={cor} opacity={0.8} />
        <circle cx="100" cy={ponto2} r="5" fill={cor} opacity={0.8} />
        <circle cx="200" cy={ponto3} r="5" fill={cor} opacity={0.8} />
        <circle cx="300" cy={ponto4} r="5" fill={cor} opacity={0.8} />
        <circle cx="400" cy={ponto5} r="5" fill={cor} opacity={0.8} />
      </svg>
    </div>

  )
}
