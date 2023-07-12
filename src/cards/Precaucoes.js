/* eslint eqeqeq: "off" */
import React, { useContext, useEffect, useState } from 'react';
import Context from '../pages/Context';
import moment from 'moment';
// imagens.
import back from '../images/back.svg';
import novo from '../images/novo.svg';
// funções.
import makeObgesthos from '../functions/makeObgesthos';

function Precaucoes() {

  // context.
  const {
    card, setcard,
    assistenciais,
    usuario,
    obgesthos,
    prontuario,
    atendimento
  } = useContext(Context);

  useEffect(() => {
    if (card == 'card-precaucoes') {
      assistenciais.filter(item => item.item == '0202 - PRECAUCOES' && moment().diff(moment(item.data, 'DD/MM/YYYY'), 'days' < 15)).map(item => uniquePrecaucao(item));
      setuniqueprecaution(arrayprecaution);
    }
    // eslint-disable-next-line
  }, [card]);

  // inserindo uma evolução.
  const insertPrecaucao = (precaucao) => {
    makeObgesthos(prontuario, atendimento, '02 - ALERGIAS, PRECAUÇÕES E RISCOS', '0202 - PRECAUÇÕES', [precaucao], usuario, obgesthos);
    setviewinsertprecaucao(0);
  }

  // excluindo repetições de precaução.
  const [uniqueprecaution, setuniqueprecaution] = useState([]);
  let arrayprecaution = [];
  const uniquePrecaucao = (item) => {
    if (arrayprecaution.filter(check => check.valor == item.valor).length == 0) {
      arrayprecaution.push(item);
    };
  }

  const arrayprecaucoes = ['CONTATO', 'GOTÍCULAS', 'AEROSSÓIS']
  const [viewinsertprecaucao, setviewinsertprecaucao] = useState(0);

  function ViewPrecaucoes() {
    return (
      <div className="scroll"
        style={{
          display: viewinsertprecaucao == 1 ? 'flex' : 'none',
          margin: 10
        }}>
        {arrayprecaucoes.map((item) => (
          <div
            className='button'
            style={{ width: 200, padding: 10 }}
            onClick={() => insertPrecaucao(item)}
          >
            {item}
          </div>
        ))}
      </div>
    )
  }

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
          <div id="btninputalergia"
            className='button-green'
            onClick={(e) => { setviewinsertprecaucao(1); e.stopPropagation() }}
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
        {uniqueprecaution.map(item => (
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
      <ViewPrecaucoes></ViewPrecaucoes>
    </div>
  )
}

export default Precaucoes;
