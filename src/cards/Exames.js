/* eslint eqeqeq: "off" */
import React, { useContext, useEffect } from 'react';
import Context from '../pages/Context';
import moment from 'moment';
// imagens.
import back from '../images/back.svg';

function Exames() {

  // context.
  const {
    card, setcard,
    exame,
  } = useContext(Context);

  useEffect(() => {
    if (card == 'card-exames') {

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

  let arraydatas =
    [
      moment().format('DD/MM/YYYY'),
      moment().subtract(1, 'day').format('DD/MM/YYYY'),
      moment().subtract(2, 'days').format('DD/MM/YYYY'),
      moment().subtract(3, 'days').format('DD/MM/YYYY'),
      moment().subtract(4, 'days').format('DD/MM/YYYY')
    ]

  // função que monta os componentes de exames laboratoriais.
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

  return (
    <div id="scroll-exames"
      className='card-aberto'
      style={{ display: card == 'card-exames' ? 'flex' : 'none' }}
    >
      <div className="text3">
        EXAMES
      </div>
      <Botoes></Botoes>
      <div
        style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'center',
          flexWrap: 'wrap', width: '100%'
        }}>
        {arraydatas.map(item => (
          <div className='row'
            key={'exames_laboratoriais ' + item}
            style={{
              display: 'flex',
              flexDirection: window.innerWidth < 426 ? 'column' : 'row',
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
                height: window.innerWidth < 426 ? '200vh' : window.innerWidth > 425 && window.innerWidth < 769 ? '60vh' : '30vh',
                width: window.innerWidth < 426 ? '90%' : 50,
                borderTopLeftRadius: window.innerWidth < 426 ? 5 : 5,
                borderTopRightRadius: window.innerWidth < 426 ? 5 : 0,
                borderBottomLeftRadius: window.innerWidth < 426 ? 0 : 5,
                borderBottomRightRadius: window.innerWidth < 426 ? 0 : 0,
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
                width: window.innerWidth < 426 ? '90%' : '27vw',
                height: window.innerWidth < 426 ? '200vh' : window.innerWidth > 425 && window.innerWidth < 769 ? '60vh' : '30vh',
                borderTopLeftRadius: window.innerWidth < 426 ? 0 : 0,
                borderTopRightRadius: window.innerWidth < 426 ? 0 : 5,
                borderBottomLeftRadius: window.innerWidth < 426 ? 5 : 0,
                borderBottomRightRadius: window.innerWidth < 426 ? 5 : 5,
                margin: 0,
              }}
            >
              {montaExamesLaboratoriais('UR', exame.filter(valor => valor.data == item && valor.item.includes('URÉIA') == true).slice(-1).map(valor => parseFloat(valor.valor)), 'mg/dl', 13, 43)}
              {montaExamesLaboratoriais('CR', exame.filter(valor => valor.data == item && valor.item.includes('CREATININA') == true).slice(-1).map(valor => parseFloat(valor.valor)), 'mg/dl', 0.5, 1.3)}
              {montaExamesLaboratoriais('NA', exame.filter(valor => valor.data == item && valor.item.includes('SÓDIO') == true).slice(-1).map(valor => parseFloat(valor.valor)), 'mg/dl', 135, 145)}
              {montaExamesLaboratoriais('K', exame.filter(valor => valor.data == item && valor.item.includes('POTÁSSIO') == true).slice(-1).map(valor => parseFloat(valor.valor)), 'mg/dl', 3.5, 5.5)}
              {montaExamesLaboratoriais('MG', exame.filter(valor => valor.data == item && valor.item.includes('MAGNÉSIO') == true).slice(-1).map(valor => parseFloat(valor.valor)), 'mg/dl', 1.6, 2.6)}
              {montaExamesLaboratoriais('P', exame.filter(valor => valor.data == item && valor.item.includes('FÓSFORO') == true).slice(-1).map(valor => parseFloat(valor.valor)), 'mol/l', 2.3, 5.9)}
              {montaExamesLaboratoriais('HEMO', exame.filter(valor => valor.data == item && valor.item.includes('HEMOGRAMA') == true).slice(-1).map(valor => parseFloat(valor.valor)), '', 0, 0)}
              {montaExamesLaboratoriais('COAG', exame.filter(valor => valor.data == item && valor.item.includes('COAGULOGRAMA') == true).slice(-1).map(valor => parseFloat(valor.valor)), '', 0, 0)}
              {montaExamesLaboratoriais('GASO ART', exame.filter(valor => valor.data == item && valor.item.includes('GASOMETRIA ARTERIAL') == true).slice(-1).map(valor => parseFloat(valor.valor)), '', 0, 0)}
              
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Exames;
