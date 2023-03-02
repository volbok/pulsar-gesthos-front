/* eslint eqeqeq: "off" */
import React, { useContext, useEffect } from 'react';
import Context from '../pages/Context';
// imagens.
import back from '../images/back.svg';

function Precaucoes() {

  // context.
  const {
    card, setcard,
    precaucao,
  } = useContext(Context);

  useEffect(() => {
    if (card == 'card-precaucoes') {

    }
    // eslint-disable-next-line
  }, [card]);

  // registro de alergia por voz.
  function Botoes() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 15 }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div id="botão de retorno"
            className="button-red"
            style={{
              display: 'flex',
              alignSelf: 'center',
            }}
            onClick={() => setcard('')}>
            <img
              alt=""
              src={back}
              style={{ width: 30, height: 30 }}
            ></img>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="scroll-precaucoes"
      className='card-aberto'
      style={{ display: card == 'card-precaucoes' ? 'flex' : 'none' }}
    >
      <div className="text3">
        PRECAUÇÕES
      </div>
      <Botoes></Botoes>
      <div
        style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'center',
          flexWrap: 'wrap', width: '100%'
        }}>
        {precaucao.map(item => (
          <div className='button' key={'precaucao ' + item.id_precaucao}
            style={{ width: 200, maxWidth: 200 }}>
            <div style={{ width: '100%' }}>
              {item.valor}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Precaucoes;
