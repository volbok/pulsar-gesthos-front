/* eslint eqeqeq: "off" */
import React, { useEffect, useContext, useState } from 'react';
import Context from '../pages/Context';

export default function GraphicPie({ valor, radius }) {

  const {
    card,
    pagina,
  } = useContext(Context);

  const [swap1, setswap1] = useState(0);
  const [swap2, setswap2] = useState(0);
  const [swap3, setswap3] = useState(0);
  const [swap4, setswap4] = useState(0);

  useEffect(() => {
    if (pagina === 12) {
      console.log('ATRIBUTO VALOR: ' + valor);
      let angulo = (360 * valor) / 300;
      console.log('VALOR: ' + valor);
      console.log('ANGULO: ' + angulo);
      const x = Math.cos(angulo * Math.PI / 180);
      const y = Math.sin(angulo * Math.PI / 180);
      setcoordX(x * radius + 50);
      setcoordY(y * -radius + 50);
      if (angulo > 180) {
        setswap1(1);
        setswap2(0);
        setswap3(0);
        setswap4(1);
      } else {
        setswap1(0);
        setswap2(0);
        setswap3(1);
        setswap4(1);
      }
    }
    // eslint-disable-next-line
  }, [card]);

  const [coordX, setcoordX] = useState(0);
  const [coordY, setcoordY] = useState(0);

  return (
    <div>
      <div style={{position: 'relative'}}>
        <svg className='blink'
          viewBox={"0 0 100 100"}
          height={100}
          width={100}
          overflow={'visible'}
        >
          <path
            fill='#b2babb'
            style={{ strokeWidth: 1, strokeLinejoin: 'round', stroke: '#b2babb' }}
            d={"M 100 50 A 50 50 0 " + swap3 + " " + swap4 + " " + coordX + ", " + coordY + " L 50 50 z"}
          >
          </path>
          <path
            fill='tomato'
            style={{ strokeWidth: 1, strokeLinejoin: 'round', stroke: 'tomato' }}
            d={"M 100 50 A 50 50 0 " + swap1 + " " + swap2 + " " + coordX + ", " + coordY + " L 50 50 z"}
          >
          </path>
        </svg>
        <text className='text1' style={{ position: 'absolute', top: 5, left: 5 }}>{'TESTE 1'}</text>
        <text className='text1' style={{ position: 'absolute', bottom: 5, right: 5 }}>{'TESTE 2'}</text>
      </div>
    </div>
  )
}
