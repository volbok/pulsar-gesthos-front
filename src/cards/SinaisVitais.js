/* eslint eqeqeq: "off" */
import React, { useContext, useEffect, useState } from 'react';
import Context from '../pages/Context';
import moment from 'moment';
// imagens.
import back from '../images/back.svg';
import day from '../images/day.svg';
import night from '../images/night.svg';

import GraphicLine from '../components/GraphicLine';

function SinaisVitais() {

  // context.
  const {
    atendimento,
    card, setcard,
    pas,
    pad,
    fc,
    fr,
    sao2,
    tax,
    glicemia,
    diurese,
    evacuacao,
    estase,
    // balancohidrico,
    assistenciais,
    dataterminoatendimento,
    pagina,
  } = useContext(Context);

  useEffect(() => {
    if (card == 'card-sinaisvitais') {
      defineArraydatas();
    }
    // eslint-disable-next-line
  }, [card]);

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
      </div>
    );
  }

  // função que monta os componentes de dados vitais.
  function montaSinalVital(nome, item, unidade, min, max) {
    return (
      <div
        className='cor1'
        id={nome}
        style={{
          display: item.length < 1 || item == null ? 'none' : 'flex',
          flexDirection: 'column',
          flexWrap: window.innerWidth < 426 ? '' : 'wrap',
          justifyContent: 'flex-start',
          alignSelf: window.innerWidth < 769 ? 'flex-start' : 'center',
          margin: 10, padding: 5,
          borderRadius: 5,
          height: window.innerWidth < 426 ? '' : 150,
        }}>
        <div className='text2' style={{ margin: 0 }}>
          {nome}
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: nome === 'GLICEMIAS' ? 'row' : 'column',
          flexWrap: 'wrap',
        }}>
          {item.map(item => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <img
                alt=""
                src={parseInt(item.hora.slice(0, 2)) > 17 ? night : day}
                style={{ width: 30, height: 30, alignSelf: 'center' }}
              ></img>
              <div
                style={{
                  padding: 5,
                  margin: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  borderRadius: 5,
                  backgroundColor: parseInt(item.hora.slice(0, 2)) > 17 ? '#154360' : '#F9E79F',
                  width: 80,
                }}
              >
                <div className='text2'
                  style={{
                    margin: 0, padding: 2.5,
                    color: isNaN(item.valor) == false && (item.valor < min || item.valor > max) ? '#F1948A' : parseInt(item.hora.slice(0, 2)) > 17 ? '#F9E79F' : '#154360',
                  }}>
                  {item.valor.toUpperCase() + ' ' + unidade}
                </div>
                <div id="hora e valor">
                  <div className='text2'
                    style={{
                      flexDirection: 'column',
                      margin: 0, padding: 2.5,
                      color: parseInt(item.hora.slice(0, 2)) > 17 ? '#F9E79F' : '#154360'
                    }}>
                    {item.hora.slice(0, 5)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // gráfico.
  const setDataGrafico = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column', justifyContent: 'center',
          width: window.innerWidth < 426 ? '80vw' : '100%', marginTop: 5,
          alignSelf: 'center',
        }}>

        <div id="gráfico" className='scroll'
          style={{
            display: assistenciais.filter(valor => valor.atendimento == atendimento && valor.item.substring(0, 3).includes('010') == true).length > 0 ? 'flex' : 'none',
            flexDirection: 'row', justifyContent: 'flex-start',
            overflowX: 'scroll', overflowY: 'hidden',
            width: window.innerWidth < 426 ? '70vw' : '60vw',
          }}>

          {datas.map(item => (
            <div id="gráfico"
              key={'gráfico ' + item}
              style={{
                display:
                  pas.filter(valor => valor.data == item).length > 0 ||
                    pad.filter(valor => valor.data == item).length > 0 ||
                    fc.filter(valor => valor.data == item).length > 0 ||
                    fr.filter(valor => valor.data == item).length > 0 ||
                    sao2.filter(valor => valor.data == item).length > 0 ? 'flex' : 'none',
                flexDirection: 'column', justifyContent: 'flex-start',
                alignItems: 'center',
                borderRadius: 5,
                backgroundColor: 'white',
                margin: 10,
              }}>
              <div id="packs de barras"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  borderRadius: 5,
                  backgroundColor: 'white',
                  // height: 200,
                }}
              >
                <div id="barra PAS + legenda + data"
                  style={{
                    display: pas.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss') ? -1 : 1).length > 0 ? 'flex' : 'none',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    height: '100%'
                  }}
                >
                  <div id="barra PAS" className='button cor0'
                    style={{
                      display: 'flex',
                      width: 20,
                      height: parseInt(pas.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss')).slice(-1).map(valor => valor.valor)),
                      minHeight: parseInt(pas.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss')).slice(-1).map(valor => valor.valor)),
                      backgroundImage: "linear-gradient(#EC473C, transparent)",
                    }}>
                    {parseInt(pas.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss')).slice(-1).map(valor => valor.valor))}
                  </div>
                  <div className='text1'>PAS</div>
                </div>
                <div id="barra PAD + legenda + data"
                  style={{
                    display: pad.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss') ? -1 : 1).length > 0 ? 'flex' : 'none',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    height: 200
                  }}
                >
                  <div id="barra PAD" className='button cor0'
                    style={{
                      display: 'flex',
                      width: 20,
                      height: parseInt(pad.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss')).slice(-1).map(valor => valor.valor)),
                      minHeight: parseInt(pad.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss')).slice(-1).map(valor => valor.valor)),
                      backgroundImage: "linear-gradient(#EC473C, transparent)",
                    }}>
                    {parseInt(pad.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss')).slice(-1).map(valor => valor.valor))}
                  </div>
                  <div className='text1'>PAD</div>
                </div>
                <div id="barra FC + legenda + data"
                  style={{
                    display: fc.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss') ? -1 : 1).length > 0 ? 'flex' : 'none',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    height: 200
                  }}
                >
                  <div id="barra FC" className='button cor0'
                    style={{
                      display: 'flex',
                      width: 20,
                      height: parseInt(fc.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss')).slice(-1).map(valor => valor.valor)),
                      minHeight: parseInt(fc.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss')).slice(-1).map(valor => valor.valor)),
                      backgroundImage: "linear-gradient(#E57E34, transparent)",
                    }}>
                    {parseInt(fc.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss')).slice(-1).map(valor => valor.valor))}
                  </div>
                  <div className='text1'>FC</div>
                </div>
                <div id="barra FR + legenda + data"
                  style={{
                    display: fr.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss') ? -1 : 1).length > 0 ? 'flex' : 'none',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    height: 200
                  }}
                >
                  <div id="barra FR" className='button cor0'
                    style={{
                      display: 'flex',
                      width: 20,
                      height: parseInt(fr.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss')).slice(-1).map(valor => valor.valor)),
                      minHeight: parseInt(fr.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss')).slice(-1).map(valor => valor.valor)),
                      backgroundImage: "linear-gradient(#5DADE2, transparent)",
                    }}>
                    {parseInt(fr.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss')).slice(-1).map(valor => valor.valor))}
                  </div>
                  <div className='text1'>FR</div>
                </div>
                <div id="barra SAO2 + legenda + data"
                  style={{
                    display: sao2.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss') ? -1 : 1).length > 0 ? 'flex' : 'none',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    height: 200
                  }}
                >
                  <div id="barra SAO2" className='button cor0'
                    style={{
                      display: 'flex',
                      width: 20,
                      height: parseInt(sao2.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss')).slice(-1).map(valor => valor.valor)),
                      minHeight: parseInt(sao2.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss')).slice(-1).map(valor => valor.valor)),
                      backgroundImage: "linear-gradient(#52BE80, transparent)",
                    }}>
                    {parseInt(sao2.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss')).slice(-1).map(valor => valor.valor))}
                  </div>
                  <div className='text1'>SPO2</div>
                </div>

              </div>
              <div className='text1'>{item}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  let arraydatas = [moment().format('DD/MM/YYYY')];
  const [datas, setdatas] = useState([arraydatas]);
  const defineArraydatas = () => {
    if (pagina == 10) {
      arraydatas =
        [
          moment(dataterminoatendimento, 'DD/MM/YYYY').format('DD/MM/YYYY'),
          moment(dataterminoatendimento, 'DD/MM/YYYY').subtract(1, 'day').format('DD/MM/YYYY'),
          moment(dataterminoatendimento, 'DD/MM/YYYY').subtract(2, 'days').format('DD/MM/YYYY'),
          moment(dataterminoatendimento, 'DD/MM/YYYY').subtract(3, 'days').format('DD/MM/YYYY'),
          moment(dataterminoatendimento, 'DD/MM/YYYY').subtract(4, 'days').format('DD/MM/YYYY')
        ]
    } else {
      arraydatas =
        [
          moment().format('DD/MM/YYYY'),
          moment().subtract(1, 'day').format('DD/MM/YYYY'),
          moment().subtract(2, 'days').format('DD/MM/YYYY'),
          moment().subtract(3, 'days').format('DD/MM/YYYY'),
          moment().subtract(4, 'days').format('DD/MM/YYYY')
        ]
    };
    console.log(arraydatas);
    setdatas(arraydatas);
  }

  const montaPa = (data) => {
    return (
      <div
        className='cor1'
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: window.innerWidth < 426 ? '' : 'wrap',
          justifyContent: 'flex-start',
          alignSelf: window.innerWidth < 769 ? 'flex-start' : 'center',
          margin: 10, padding: 5,
          borderRadius: 5,
          height: window.innerWidth < 426 ? '' : 150,
        }}>

        <div className='text2' style={{ margin: 0 }}>PA</div>
        <div style={{
          display: pas.filter(item => item.data == data).slice(-2, -1).map(item => parseInt(item.valor)) != '' ? 'flex' : 'none',
          flexDirection: 'row', justifyContent: 'center'
        }}>
          <img
            alt=""
            src={pas.filter(item => item.data == data).slice(-2, -1).map(item => parseInt(item.hora.slice(0, 2))) > 17 ? night : day}
            style={{ width: 30, height: 30, alignSelf: 'center' }}
          ></img>
          <div id='01'
            style={{
              display: 'flex', flexDirection: 'column',
              backgroundColor: pas.filter(item => item.data == data).slice(-2, -1).map(item => parseInt(item.hora.slice(0, 2))) > 17 ? '#154360' : '#F9E79F',
              color: pas.filter(item => item.data == data).slice(-2, -1).map(item => parseInt(item.hora.slice(0, 2))) > 17 ? '#F9E79F' : '#154360',
              width: 80, margin: 2.5, padding: 5, borderRadius: 5,
            }}>
            <div style={{ padding: 2.5 }}>
              {pas.filter(item => item.data == data).slice(-2, -1).map(item => item.valor) + ' x ' + pad.filter(item => item.data == data).slice(-2, -1).map(item => item.valor)}
            </div>
            <div style={{ padding: 2.5 }}>
              {pas.filter(item => item.data == data).slice(-2, -1).map(item => item.hora.slice(0, 5))}
            </div>
          </div>
        </div>
        <div style={{
          display: pas.filter(item => item.data == data).slice(-1).map(item => parseInt(item.valor)) != '' ? 'flex' : 'none',
          flexDirection: 'row', justifyContent: 'center'
        }}>
          <img
            alt=""
            src={pas.filter(item => item.data == data).slice(-1).map(item => parseInt(item.hora.slice(0, 2))) > 17 ? night : day}
            style={{ width: 30, height: 30, alignSelf: 'center' }}
          ></img>
          <div id='02'
            style={{
              display: 'flex', flexDirection: 'column',
              backgroundColor: pas.filter(item => item.data == data).slice(-1).map(item => parseInt(item.hora.slice(0, 2))) > 17 ? '#154360' : '#F9E79F',
              color: pas.filter(item => item.data == data).slice(-1).map(item => parseInt(item.hora.slice(0, 2))) > 17 ? '#F9E79F' : '#154360',
              width: 80, margin: 2.5, padding: 5, borderRadius: 5,
            }}>
            <div style={{ padding: 2.5 }}>
              {pas.filter(item => item.data == data).slice(-1).map(item => item.valor) + ' x ' + pad.filter(item => item.data == data).slice(-1).map(item => item.valor)}
            </div>
            <div style={{ padding: 2.5 }}>
              {pas.filter(item => item.data == data).slice(-1).map(item => item.hora.slice(0, 5))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // botões para a legenda dos gráficos.
  const [btnpa, setbtnpa] = useState(1);
  const [btnfc, setbtnfc] = useState(1);
  const [btnfr, setbtnfr] = useState(1);
  const [btnsao2, setbtnsao2] = useState(1);

  return (
    <div id="scroll-sinais vitais"
      className='card-aberto'
      style={{ display: card == 'card-sinaisvitais' ? 'flex' : 'none' }}
    >
      <div className="text3">
        SINAIS VITAIS
      </div>
      <Botoes></Botoes>
      <div style={{
        display: 'flex',
        flexDirection: window.innerWidth < 426 ? 'column' : 'row',
        justifyContent: window.innerWidth < 426 ? 'center' : 'space-evenly',
        flexWrap: 'wrap',
      }}>
        {datas.map(item => (
          <div className='row'
            key={'sinais_vitais ' + item}
            style={{
              display: assistenciais.filter(valor => valor.data == item && valor.item.substring(0, 2) == '01').length > 0 ? 'flex' : 'none',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignSelf: 'flex-start',
              overflowX: 'hidden',
            }}
          >
            <div id="identificador"
              className='button-yellow'
              style={{
                flex: 1,
                flexDirection: 'row',
                height: window.innerWidth < 426 ? 50 : '',
                maxHeight: window.innerWidth < 426 ? 50 : '',
                justifyContent: 'center',
                alignSelf: 'center',
                margin: 0,
                padding: 5,
                width: window.innerWidth < 426 ? '90%' : '60vw',
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
                <div className='text2'
                  style={{ color: '#ffffff', marginTop: 0, alignSelf: 'center' }}>
                  {item}
                </div>
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
            <div id="sinais vitais"
              className='button'
              style={{
                flex: window.innerWidth < 426 ? 11 : 4,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
                flexWrap: 'wrap',
                width: window.innerWidth < 426 ? '90%' : '60vw',
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                margin: 0,
                pointerEvents: 'none',
              }}
            >
              {montaPa(item)}
              {montaSinalVital('FC', fc.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss') ? -1 : 1).slice(-2), 'bpm', 45, 120)}
              {montaSinalVital('FR', fr.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss') ? -1 : 1).slice(-2), 'irpm', 10, 22)}
              {montaSinalVital('SAO2', sao2.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss') ? -1 : 1).slice(-2), '%', 85, 100)}
              {montaSinalVital('TAX', tax.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss') ? -1 : 1).slice(-2), '', '', '')}
              {montaSinalVital('DIURESE', diurese.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss') ? -1 : 1).slice(-2), 'ml', 500, 2000)}
              {montaSinalVital('EVACUAÇÃO', evacuacao.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss') ? -1 : 1).slice(-2), '', '', '')}
              {montaSinalVital('ESTASE', estase.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss') ? -1 : 1).slice(-2), '', '', '')}
              {montaSinalVital('GLICEMIAS', glicemia.filter(valor => valor.data == item).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss') ? -1 : 1).slice(-3), 'mg/dl', 70, 180)}
            </div>
          </div>
        ))}
      </div>
      {setDataGrafico()}

      <div
        style={{
          display: window.innerWidth < 426 ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 5,
          borderRadius: 5,
          alignContent: 'center',
        }}>

        <div id='PA'
          style={{
            display: btnpa == 1 ? 'flex' : 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            verticalAlign: 'center',
            margin: 5,
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              ustifyContent: 'center',
              alignContent: 'center',
            }}>
            <div className='button'
              onClick={btnpa == 1 ? () => setbtnpa(0) : setbtnpa(1)}
              style={{
                backgroundColor: 'rgba(231, 76, 60, 1)',
                opacity: btnpa == 1 ? 1 : 0.5,
                height: 300,
                width: 75,
                maxHeight: 300,
                margin: 0,
                padding: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              PA
            </div>
            <div
              style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                backgroundColor: 'white',
                alignSelf: 'center',
                width: '100%', height: 300,
                borderRadius: 5,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}>
              <GraphicLine width={'100%'} height={'80%'} pontos={pas.slice(-5)} cor={'rgba(231, 76, 60, 1)'} altura={300} viewbox={"80 -15 600 300"} gap={190}></GraphicLine>
            </div>
          </div>
        </div>
        <div id='FC'
          style={{
            display: btnfc == 1 ? 'flex' : 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            verticalAlign: 'center',
            margin: 5,
          }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            ustifyContent: 'center',
            alignContent: 'center',
          }}>
            <div className='button'
              onClick={btnfc == 1 ? () => setbtnfc(0) : setbtnfc(1)}
              style={{
                backgroundColor: 'rgb(229, 126, 52, 1)',
                opacity: btnfc == 1 ? 1 : 0.5,
                height: 300,
                width: 75,
                maxHeight: 300,
                margin: 0,
                padding: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              FC
            </div>
            <div
              style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                backgroundColor: 'white',
                alignSelf: 'center',
                width: '100%', height: 300,
                borderRadius: 5,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}>
              <GraphicLine width={'100%'} height={'80%'} pontos={fc.slice(-5)} cor={'rgb(229, 126, 52, 1)'} altura={300} viewbox={"80 -15 600 300"} gap={190}></GraphicLine>
            </div>
          </div>
        </div>
        <div id='FR'
          style={{
            display: btnfr == 1 ? 'flex' : 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            verticalAlign: 'center',
            margin: 5,
          }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            ustifyContent: 'center',
            alignContent: 'center',
          }}>
            <div className='button'
              onClick={btnfr == 1 ? () => setbtnfr(0) : setbtnfr(1)}
              style={{
                backgroundColor: '#5dade2',
                opacity: btnfr == 1 ? 1 : 0.5,
                height: 300,
                width: 75,
                maxHeight: 300,
                margin: 0,
                padding: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              FR
            </div>
            <div
              style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                backgroundColor: 'white',
                alignSelf: 'center',
                width: '100%', height: 300,
                borderRadius: 5,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}>
              <GraphicLine width={'100%'} height={'80%'} pontos={fr.slice(-5)} cor={'#5dade2'} altura={300} viewbox={"80 -15 600 300"} gap={190}></GraphicLine>
            </div>
          </div>
        </div>
        <div id='SPO2'
          style={{
            display: btnsao2 == 1 ? 'flex' : 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            verticalAlign: 'center',
            margin: 5,
          }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            ustifyContent: 'center',
            alignContent: 'center',
          }}>
            <div className='button'
              onClick={btnsao2 == 1 ? () => setbtnsao2(0) : setbtnsao2(1)}
              style={{
                backgroundColor: 'rgb(82, 190, 128, 1)',
                opacity: btnsao2 == 1 ? 1 : 0.5,
                height: 300,
                width: 75,
                maxHeight: 300,
                margin: 0,
                padding: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              SPO2
            </div>
            <div
              style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                backgroundColor: 'white',
                alignSelf: 'center',
                width: '100%', height: 300,
                borderRadius: 5,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}>
              <GraphicLine width={'100%'} height={'80%'} pontos={sao2.slice(-5)} cor={'rgb(82, 190, 128, 1)'} altura={300} viewbox={"80 -15 600 300"} gap={190}></GraphicLine>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinaisVitais;