/* eslint eqeqeq: "off" */
import React, { useContext, useState, useEffect, useCallback } from 'react';
import Context from '../pages/Context';
// componentes.
import Gravador from '../components/Gravador';
// funções.
import makeObgesthos from '../functions/makeObgesthos';
// import toast from '../functions/toast';
import checkinput from '../functions/checkinput';
// imagens.
import salvar from '../images/salvar.svg';
import novo from '../images/novo.svg';
import back from '../images/back.svg';

function Alergias() {
  // context.
  const {
    settoast,
    prontuario,
    atendimento,
    card, setcard,
    assistenciais,
    usuario,
    obgesthos
  } = useContext(Context);

  useEffect(() => {
    if (card == 'card-alergias') {
    }
    // eslint-disable-next-line
  }, [card]);

  // inserir alergia.
  const insertAlergia = (alergia) => {
    makeObgesthos(prontuario, atendimento, '02 - ALERGIAS, PRECAUÇÕES E RISCOS', '0201 - ALERGIAS', alergia, usuario, obgesthos);
    setviewinsertalergia(0);
  }

  // inserindo uma alergia por voz.
  const insertVoiceAlergia = (alergia) => {
    makeObgesthos(prontuario, atendimento, '02 - ALERGIAS, PRECAUÇÕES E RISCOS', '0201 - ALERGIAS', alergia, usuario, obgesthos);
  }

  // componente para adição da alergia.
  const [viewinsertalergia, setviewinsertalergia] = useState();
  const InsertAlergia = useCallback(() => {
    return (
      <div className="fundo"
        onClick={(e) => { setviewinsertalergia(0); e.stopPropagation() }}
        style={{ display: viewinsertalergia == 1 ? 'flex' : 'none' }}>
        <div className="janela"
          onClick={(e) => e.stopPropagation()}
          style={{ flexDirection: 'column' }}>
          <div className='text3'>ALERGIA</div>
          <input
            className="input"
            autoComplete="off"
            placeholder="ALERGIA..."
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = 'ALERGIA...')}
            style={{
              width: window.innerWidth < 426 ? '50vw' : '15vw',
              margin: 5,
            }}
            type="text"
            id="inputAlergia"
            maxLength={100}
          ></input>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div id="botão de retorno"
              className="button-red"
              style={{
                display: 'flex',
                alignSelf: 'center',
              }}
              onClick={() => setviewinsertalergia(0)}>
              <img
                alt=""
                src={back}
                style={{ width: 30, height: 30 }}
              ></img>
            </div>
            <div id="btnsalvaralergia"
              className='button-green'
              onClick={() => checkinput('input', settoast, ['inputAlergia'], "btnsalvaralergia", insertAlergia, [document.getElementById("inputAlergia").value.toUpperCase()])}
            >
              <img
                alt=""
                src={salvar}
                style={{
                  margin: 10,
                  height: 30,
                  width: 30,
                }}
              ></img>
            </div>
          </div>
        </div>
      </div>
    )
    // eslint-disable-next-line
  }, [viewinsertalergia]);

  // registro de alergia por voz.
  function Botoes() {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        alignItems: 'center', marginTop: 15
      }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
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
          <Gravador funcao={insertVoiceAlergia} continuo={false} ></Gravador>
          <div id="btninputalergia"
            className='button-green'
            onClick={(e) => { setviewinsertalergia(1); e.stopPropagation() }}
            style={{
              display: 'flex',
              alignSelf: 'center',
            }}
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
      </div>
    );
  }

  return (
    <div id="scroll-alergias"
      className='card-aberto'
      style={{ display: card == 'card-alergias' ? 'flex' : 'none' }}
    >
      <div className="text3">ALERGIAS</div>
      <Botoes></Botoes>
      <div
        style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'center',
          flexWrap: 'wrap', width: '100%'
        }}>
        {assistenciais.filter(item => item.item == '0201 - ALERGIAS').map(item => (
          <div className='button' key={'alergia ' + item.id_alergia}
            style={{ width: 200, maxWidth: 200 }}>
            <div style={{ width: '100%' }}>
              {item.alergia}
            </div>
          </div>
        ))}
      </div>
      <InsertAlergia></InsertAlergia>
    </div>
  )
}

export default Alergias;