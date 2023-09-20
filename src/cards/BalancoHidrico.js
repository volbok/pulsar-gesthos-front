/* eslint eqeqeq: "off" */
import React, { useContext, useEffect } from 'react';
import Context from '../pages/Context';
import moment from 'moment';
import axios from 'axios';
// imagens.
import back from '../images/back.svg';
import salvar from '../images/salvar.svg';

function BalancoHidrico() {

  // context.
  const {
    atendimento,
    card, setcard,
    html,
  } = useContext(Context);

  useEffect(() => {
    if (card == 'card-balanco_hidrico') {
    }
    // eslint-disable-next-line
  }, [card]);

  const insertBalanco = () => {
    var obj = {
      id_atendimento: atendimento,
      pas: 0,
      pad: 0,
      fc: 0,
      fr: 0,
      sao2: 0,
      tax: 0,
      glicemia: 0,
      diurese: 0,
      balanco: document.getElementById('inputBh12h').value,
      evacuacao: 0,
      estase: 0,
      data_sinais_vitais: moment(),
    }
    axios.post(html + 'insert_sinais_vitais', obj).then(() => {
      console.log('ADICIONADO REGISTRO DE BALANÇO HÍDRICO');
    })
  }

  // registro de sinais vitais por voz.
  function Botoes() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div id="botão de retorno"
          className="button-red"
          style={{ display: 'flex', alignSelf: 'center' }}
          onClick={() => setcard('')}>
          <img
            alt=""
            src={back}
            style={{ width: 30, height: 30 }}
          ></img>
        </div>
        <div id="botão de retorno"
          className="button-green"
          style={{ display: 'flex', alignSelf: 'center' }}
          onClick={() => insertBalanco()}>
          <img
            alt=""
            src={salvar}
            style={{ width: 30, height: 30 }}
          ></img>
        </div>
      </div>
    );
  }

  function CamposBalancoHidrico() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className='text1'>{'BH'}</div>
          <input
            className="input"
            autoComplete="off"
            placeholder="BALANÇO HÍDRICO 12H"
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = 'BH')}
            style={{
              width: window.innerWidth < 426 ? '50vw' : 100,
              margin: 5,
              appearance: 'textfield',
            }}
            type="number"
            id="inputBh12h"
            maxLength={3}
          ></input>
        </div>
      </div>
    )
  }

  return (
    <div id="scroll-sinais vitais"
      className='card-aberto'
      style={{ display: card == 'card-balanco_hidrico' ? 'flex' : 'none' }}
    >
      <div className="text3">
        BALANCO HÍDRICO 12H
      </div>
      <Botoes></Botoes>
      <CamposBalancoHidrico></CamposBalancoHidrico>
    </div >
  )
}

export default BalancoHidrico;
