/* eslint eqeqeq: "off" */
import React, { useContext, useEffect, useState } from 'react';
import Context from '../pages/Context';
import moment from 'moment';
// imagens.
import back from '../images/back.svg';

function Laboratorio() {

  // context.
  const {
    card, setcard,
    exame,
  } = useContext(Context);

  const [uniqueexame, setuniqueexame] = useState([])
  var arrayexames = [];
  const createUniqueexame = (element) => {
    if (arrayexames.find(item =>
      item.item == element.item &&
      item.data == element.data &&
      item.hora.substring(0, 1) == element.hora.substring(0, 1) &&
      item.valor == element.valor
    )) {
      // o item já foi inserido na array antes.
    } else {
      arrayexames.push(element);
    }
  }

  useEffect(() => {
    if (card == 'card-laboratorio') {
      console.log(JSON.stringify(exame));
      exame.map(item => createUniqueexame(item));
      setuniqueexame(arrayexames);
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
          <div id="botão de retorno"
            className="button"
            style={{
              display: 'flex',
              alignSelf: 'center',
              width: 100,
            }}
            onClick={() => {
              if (modoexames == 1) {
                setmodoexames(2);
              } else {
                setmodoexames(1);
              }
            }}>
            {modoexames == 1 ? 'TODOS' : 'TABELA'}
          </div>
        </div>
      </div>
    );
  }

  let arraydatas =
    [
      moment().startOf('day').format('DD/MM/YYYY'),
      moment().startOf('day').subtract(1, 'day').format('DD/MM/YYYY'),
      moment().startOf('day').subtract(2, 'days').format('DD/MM/YYYY'),
      moment().startOf('day').subtract(3, 'days').format('DD/MM/YYYY'),
      moment().startOf('day').subtract(4, 'days').format('DD/MM/YYYY')
    ]

  // função que monta os componentes de exames laboratoriais.
  /*
  function montaExamesLaboratoriais(nome, item, unidade, min, max) {
    return (
      <div id={nome} style={{
        display: item != '' ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'center',
        alignSelf: window.innerWidth < 769 ? 'flex-start' : 'center', maxWidth: 100,
      }}>
        <div className='text2' style={{ marginBottom: 0 }}>
          {nome}
        </div>
        <div className='text2'
          style={{
            marginTop: 0, paddingTop: 0,
            color: isNaN(item) == false && (item < min || item > max) ? '#F1948A' : '#ffffff',
          }}>
          {item + ' ' + unidade}
        </div>
      </div>
    )
  }
  */

  const montaTabelaExames = (dosagem, condicao, min, max, medida) => {
    return (
      <div className='button'
        style={{
          width: '100%',
          display: uniqueexame.filter(valor => valor.item == condicao).length > 0 ? 'flex' : 'none',
          justifyContent: 'flex-start', flexWrap: 'wrap',
        }}>
        <div className='button-yellow' style={{ fontSize: window.innerWidth < 426 ? 14 : 20 }}>{dosagem}</div>
        {uniqueexame.filter(valor => valor.item == condicao).sort((a, b) => moment(a.data, 'DD/MM/YYYY') > moment(b.data, 'DD/MM/YYYY') ? -1 : 1).slice(-5).map(item => (
          <div style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            margin: window.innerWidth < 426 ? 3 : 10
          }}>
            <div>{item.data}</div>
            <div>{item.hora}</div>
            <div style={{ fontSize: window.innerWidth < 426 ? 14 : 20, color: parseFloat(item.valor) > max || parseFloat(item.valor) < min ? '#F1948A' : 'white' }}>
              {item.valor + ' ' + medida}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const [modoexames, setmodoexames] = useState(1);
  return (
    <div id="scroll-exames"
      className='card-aberto'
      style={{ display: card == 'card-laboratorio' ? 'flex' : 'none' }}
    >
      <div className="text3">
        EXAMES
      </div>
      <Botoes></Botoes>
      <div id="blob de exames"
        style={{
          display: modoexames == 2 ? 'flex' : 'none', flexDirection: 'row', justifyContent: 'center',
          flexWrap: 'wrap', width: '100%'
        }}>
        {arraydatas.map(item => (
          <div className='row'
            key={'exames_laboratoriais ' + item}
            style={{
              display: uniqueexame.filter(valor => valor.data == item && valor.item != '0801 - ANTIBIOTICOS NOME DO ANTIBIOTICO').length > 0 ? 'flex' : 'none',
              flexDirection: 'column',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          >
            <div id="identificador"
              className='button-yellow'
              style={{
                flex: 1,
                flexDirection: window.innerWidth < 426 ? 'row' : 'column',
                justifyContent: 'center',
                alignSelf: 'center',
                margin: 0,
                padding: 5,
                width: window.innerWidth < 426 ? '90%' : '100%',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}>
              <div style={{
                display: window.innerWidth < 426 ? 'none' : 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <div className='text2' style={{ color: '#ffffff', marginTop: 0 }}>{item}</div>
              </div>
              <div style={{
                display: window.innerWidth < 426 ? 'flex' : 'none',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
                <div className='text2' style={{ color: '#ffffff' }}>{item}</div>
              </div>
            </div>
            <div id="exames_laboratoriais"
              className='button'
              style={{
                flex: window.innerWidth < 426 ? 11 : 4,
                display: 'flex', flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
                flexWrap: 'wrap',
                width: window.innerWidth < 426 ? '90%' : '100%',
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                margin: 0,
              }}
            >
              {uniqueexame.sort((a, b) => moment(a.hora, 'HH:mm:SS') > moment(b.hora, 'HH:mm:SS') ? -1 : 1).map(valor => (
                <div key={'exame' + valor.id} id={'exame' + valor.id} style={{
                  display: 'flex', flexDirection: 'column', justifyContent: 'center',
                  alignSelf: window.innerWidth < 769 ? 'flex-start' : 'center', maxWidth: 100,
                }}>
                  <div className='text2'
                    style={{
                      marginBottom: 0,
                      fontSize: window.innerWidth < 426 ? 14 : 16,
                    }}>
                    {valor.item.substring(7, 20)}
                  </div>
                  <div className='text2'
                    style={{
                      marginTop: 0, paddingTop: 0,
                      marginBottom: 0,
                      color: '#ffffff',
                    }}>
                    {valor.hora}
                  </div>
                  <div className='text2'
                    style={{
                      fontSize: window.innerWidth < 426 ? 14 : 20,
                      marginTop: 0, paddingTop: 0,
                      color: '#ffffff',
                    }}>
                    {valor.valor}
                  </div>
                </div>
              ))}

            </div>
          </div>
        ))}
      </div>
      <div id="card de exames"
        style={{ display: modoexames == 1 ? 'flex' : 'none', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {montaTabelaExames('Hgb', '0834 - Hb', 11.5, 16.9, 'g/dL')}
        {montaTabelaExames('Htc', '0835 - Htc', 35.3, 52.0, 'g/dL')}
        {montaTabelaExames('GL', '0836 - GL', 4500, 11000, '/mm3')}
        {montaTabelaExames('Bas', '0839 - Bas', 0, 5.0, '%')}
        {montaTabelaExames('Seg', '0840 - Seg', 40, 65, '%')}

        {montaTabelaExames('PCR', '0827 - PCR', 0.3, 1, 'mg/dl')}

        {montaTabelaExames('Ur', '0815 - Ur', 13, 43, 'md/dL')}
        {montaTabelaExames('Cr', '0816 - Cr', 0.6, 1.3, 'md/dL')}

        {montaTabelaExames('Na', '0810 - Na', 3.5, 5.5, 'meq/L')}
        {montaTabelaExames('K', '0811 - K', 3.5, 5.5, 'meq/L')}

        {montaTabelaExames('Cl', '0812 - Cl', 98, 107, 'meq/L')}
        {montaTabelaExames('Mg', '0813 - Mg', 1.6, 2.6, 'meq/L')}
        {montaTabelaExames('PO4', '0814 - PO4', 2.5, 4.5, 'meq/L')}

        {montaTabelaExames('Lac', '0828 - LACTATO', 0.5, 1.6, 'mmol/L')}
      </div>
    </div>
  )
}

export default Laboratorio;