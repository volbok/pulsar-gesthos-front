/* eslint eqeqeq: "off" */
import React, { useContext, useState, useEffect } from 'react';
import Context from '../pages/Context';
// import axios from 'axios';
// funções.
import makeObgesthos from '../functions/makeObgesthos';
// imagens.
import novo from '../images/novo.svg';
import back from '../images/back.svg';

function Riscos() {

  // context.
  const {
    card, setcard,
    assistenciais,
    usuario,
    obgesthos,
    prontuario,
    atendimento,
  } = useContext(Context);

  useEffect(() => {
    if (card == 'card-riscos') {
    }
    // eslint-disable-next-line
  }, [card]);

  const insertRisco = (risco) => {
    makeObgesthos(prontuario, atendimento, '02 - ALERGIAS, PRECAUÇÕES E RISCOS', '0201 - RISCOS', [risco], usuario, obgesthos);
    setviewopcoesrisco(0);
  }

  // opções de precaução.
  var arrayopcoesrisco = [
    'QUEDA',
    'LESÃO',
    'SEPSE',
    'PAVM',
    'EVASÃO',
    'TAE',
  ]
  const [viewopcoesrisco, setviewopcoesrisco] = useState(0);
  function OpcoesRisco() {
    return (
      <div className="fundo"
        onClick={(e) => { setviewopcoesrisco(0); e.stopPropagation() }}
        style={{ display: viewopcoesrisco == 1 ? 'flex' : 'none' }}>
        <div className="janela">
          {arrayopcoesrisco.map(item => (
            <div
              key={'riscos ' + item}
              className='button'
              style={{ width: 100 }}
              onClick={() => {
                insertRisco(item);
                setviewopcoesrisco(0);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    )
  }


  return (
    <div id="scroll-riscos"
      className='card-aberto'
      style={{ display: card == 'card-riscos' ? 'flex' : 'none' }}
    >
      <div className="text3">
        RISCOS
      </div>
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
        <div id="btninputalergia"
          className='button-green'
          onClick={(e) => { setviewopcoesrisco(1); e.stopPropagation() }}
          style={{ display: 'flex', width: 50, height: 50 }}
        >
          <img
            alt=""
            src={novo}
            style={{
              margin: 10,
              height: 30,
              width: 30,
            }}
          ></img>
        </div>
      </div>
      <div
        style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'center',
          flexWrap: 'wrap', width: '100%'
        }}>
        {assistenciais.filter(item => item.item == '0203 - RISCOS').map(item => (
          <div className='button' key={'risco ' + item.id_risco}
            style={{ width: 200, maxWidth: 200 }}>
            <div style={{ width: '100%' }}>
              {item.valor.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
      <OpcoesRisco></OpcoesRisco>
    </div >
  )
}

export default Riscos;
