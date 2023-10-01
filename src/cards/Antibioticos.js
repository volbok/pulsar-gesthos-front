/* eslint eqeqeq: "off" */
import React, { useContext, useEffect } from 'react';
import Context from '../pages/Context';
import axios from 'axios';
// imagens.
import back from '../images/back.svg';

function Antibioticos() {

  // context.
  const {
    html,
    card, setcard,
    atbgesthos,
  } = useContext(Context);

  useEffect(() => {
    if (card == 'card-antibioticos') {
    }
    // eslint-disable-next-line
  }, [card]);

  // registro de textarea por voz.
  function Botoes() {
    return (
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
      </div>
    );
  }

  const updateAtb = (item, texto) => {
    var obj = {
      numero: item.numero,
      data: item.data,
      hora: item.hora,
      prontuario: item.prontuario,
      atendimento: item.atendimento,
      id_item: item.id_item,
      item: item.item,
      unidade: item.unidade,
      qtde: item.qtde,
      frequencia: item.frequencia,
      acm: item.acm,
      sn: item.sn,
      atb: item.atb,
      obs: texto,
      tipo_prescricao: item.tipo_prescricao
    }
    axios.post(html + 'update_prescricoes/' + item.id, obj).then(() => {
      console.log(obj);
      console.log('ITEM DE ATB ATUALIZADO COM SUCESSO.');
    })
  }

  var timeout = null;
  return (
    <div id="scroll-antibioticos"
      className='card-aberto'
      style={{ display: card == 'card-antibioticos' ? 'flex' : 'none', position: 'relative' }}
    >
      <div className="text3">
        ANTIBIÓTICOS
      </div>
      <Botoes></Botoes>
      <div>
        <div id="antibióticos gesthos"
          style={{
            width: window.innerWidth < 426 ? '90vw' : '',
            display: atbgesthos.length > 0 ? 'flex' : 'none',
            flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap'
          }}
        >
          {atbgesthos.map(item => (
            <div className='cor3'
              style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'center',
                flexWrap: 'wrap', padding: 10, borderRadius: 5,
                width: window.innerWidth < 426 ? '80vw' : '20vw',
                margin: 5,
              }}>
              <div id="data e hora"
                className='button-yellow'
                style={{
                  alignSelf: 'center',
                  padding: 10,
                  margin: 2.5,
                  width: '100%',
                }}>
                {item.data + ' - ' + item.hora.substring(0, 5)}
              </div>
              <div id="item de antibiótico"
                className='button'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  margin: 2.5, padding: 10,
                  width: '100%',
                  height: 100
                }}>
                {item.item.toUpperCase()}
              </div>
              <textarea
                className="textarea"
                autoComplete="off"
                placeholder="OBSERVAÇÕES PARA ATB..."
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'OBSERVAÇÕES PARA ATB...')}
                defaultValue={item.obs}
                onKeyUp={() => {
                  clearTimeout(timeout);
                  timeout = setTimeout(() => {
                    updateAtb(item, document.getElementById("inputObsAtbTradicional").value.toUpperCase());
                  }, 2000);
                }}
                style={{
                  width: window.innerWidth < 426 ? '50vw' : '100%',
                  height: 100,
                  margin: 5,
                }}
                type="number"
                id="inputObsAtbTradicional"
                maxLength={200}
              ></textarea>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Antibioticos;