/* eslint eqeqeq: "off" */
import React, { useContext, useEffect } from 'react';
import Context from '../pages/Context';
// imagens.
import back from '../images/back.svg';

function Precaucoes() {

  // context.
  const {
    card, setcard,
    assistenciais,
  } = useContext(Context);

  useEffect(() => {
    if (card == 'card-precaucoes') {

    }
    // eslint-disable-next-line
  }, [card]);

  // registro de precaução por voz.
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
        {assistenciais.filter(item => item.item == '0202 - PRECAUCOES').map(item => (
          <div className='button' key={'precaucao ' + item.id}
            style={{ width: 200, maxWidth: 200 }}>
            <div style={{ width: '100%' }}>
              {item.valor.includes('Padr') ? 'PADRÃO' :
                item.valor.includes('Contato + Got') ? 'CONTATO + GOTÍCULAS' :
                  item.valor.includes('Contato + Aer') ? 'CONTATO + AEROSSÓIS' :
                    item.valor.includes('Got') ? 'GOTÍCULAS' :
                      item.valor.includes('Aeross') ? 'AEROSSÓIS' :
                        item.valor.includes('Contato') ? 'CONTATO' : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Precaucoes;
