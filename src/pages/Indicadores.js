/* eslint eqeqeq: "off" */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Context from './Context';
import moment from 'moment';
import 'moment/locale/pt-br';
// router.
import { useHistory } from 'react-router-dom';
// imagens.
import back from '../images/back.svg';
import refresh from '../images/refresh.svg';
import GraphicPie from '../components/GraphicPie';
// funções:
import toast from '../functions/toast';

function Indicadores() {

  // context.
  const {
    pagina, setpagina,
    atendimentos,
    pacientes,
    settoast,
  } = useContext(Context);

  // history (router).
  let history = useHistory();

  // map dos registros de pacientes.
  let tempoadmissao = 0;
  let tempoalta = 0;
  const tempoInternacao = (prontuario) => {
    // somando todo o tempo de internações (admissões) em milisseconds.
    atendimentos.filter(item => item.prontuario == prontuario && item.situacao == 'internacao')
      .map(item => {
        tempoadmissao = tempoadmissao + moment().diff(moment(item.data), 'days');
        console.log('DIAS DE ADMISSÃO: ' + tempoadmissao);
        return tempoadmissao;
      });
    // somando todo o tempo de altas (altas) em milisseconds.
    atendimentos.filter(item => item.prontuario == prontuario && item.situacao == 'alta')
      .map(item => {
        tempoalta = tempoalta + moment().diff(moment(item.data), 'days');
        console.log('DIAS DE ALTA: ' + tempoalta);
        return tempoalta;
      });
  }

  const [total_admissoes, settotal_admissoes] = useState([]);
  const [total_altas, settotal_altas] = useState([]);
  const [tempomediointernacao, settempomediointernacao] = useState(0);

  useEffect(() => {
    if (pagina == 12) {
      // eslint-disable-next-line
      settotal_admissoes(atendimentos.filter(item => item.situacao == 'internacao').length);
      // eslint-disable-next-line
      settotal_altas(atendimentos.filter(item => item.situacao == 'alta').length);

      // calculando tempo médio de internação.
      pacientes.map(item => tempoInternacao(item.prontuario));
      setTimeout(() => {
        console.log('ADM: ' + tempoadmissao + ' -- ALTA: ' + tempoalta);
        let tempomedio = (tempoadmissao - tempoalta) / total_admissoes;
        settempomediointernacao(tempomedio);
        console.log(tempomediointernacao);
      }, 5000);
    }
    // eslint-disable-next-line
  }, [pagina]);

  const Graficos = useCallback(() => {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>

        <div className='cor3'
          style={{ display: 'flex', flexDirection: 'row', borderRadius: 5, padding: 10, margin: 5, width: 300 }}>
          <GraphicPie valor={total_admissoes} radius={50}></GraphicPie>
          <div className='text1' style={{ alignSelf: 'center' }}>{'TOTAL DE ADMISSÕES: ' + total_admissoes}</div>
        </div>

        <div className='cor3'
          style={{ display: 'flex', flexDirection: 'row', borderRadius: 5, padding: 10, margin: 5, width: 300 }}>
          <GraphicPie valor={total_altas} radius={50}></GraphicPie>
          <div className='text1' style={{ alignSelf: 'center' }}>{'TOTAL DE ALTAS: ' + total_altas}</div>
        </div>

      </div>

    )
  }, [total_altas, total_admissoes]);

  // seletor do intervalo de datas.
  let timeout = null;
  function DataSelector() {
    return (
      <div style={{
        display: 'flex', flexDirection: 'row', justifyContent: 'center',
      }}>
        <div className='cor3'
          style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center',
            borderRadius: 5, margin: 10, padding: 10,
          }}>
          <input
            id="inputDataInicio"
            title="DATA DE INÍCIO DA PESQUISA."
            autoComplete="off"
            placeholder='INÍCIO...'
            className="input"
            type="text"
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = 'PROPOSTA...')}
            onKeyUp={() => {
              var x = document.getElementById("inputDataInicio").value;
              if (x.length == 2) {
                x = x + '/';
                document.getElementById("inputDataInicio").value = x;
              }
              if (x.length == 5) {
                x = x + '/'
                document.getElementById("inputDataInicio").value = x;
              }
              clearTimeout(timeout);
              var date = moment(document.getElementById("inputDataInicio").value, 'DD/MM/YYYY', true);
              timeout = setTimeout(() => {
                if (date.isValid() == false) {
                  toast(settoast, 'DATA INVÁLIDA', 'rgb(231, 76, 60, 1)', 3000);
                  document.getElementById("inputDataInicio").value = '';
                } else {
                  document.getElementById("inputDataInicio").value = moment(date).format('DD/MM/YYYY');
                }
              }, 3000);
            }}
            style={{
              display: 'flex',
              flexDirection: 'center', justifyContent: 'center', alignSelf: 'center',
              whiteSpace: 'pre-wrap',
              width: window.innerWidth < 426 ? '70vw' : '10vw',
              height: 50,
            }}
          >
          </input>
          <input
            id="inputDataTermino"
            title="DATA DE TÉRMINO DA PESQUISA."
            autoComplete="off"
            placeholder='TÉRMINO...'
            className="input"
            type="text"
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = 'TÉRMINO...')}
            onKeyUp={() => {
              var x = document.getElementById("inputDataTermino").value;
              if (x.length == 2) {
                x = x + '/';
                document.getElementById("inputDataTermino").value = x;
              }
              if (x.length == 5) {
                x = x + '/'
                document.getElementById("inputDataTermino").value = x;
              }
              clearTimeout(timeout);
              var date = moment(document.getElementById("inputDataTermino").value, 'DD/MM/YYYY', true);
              timeout = setTimeout(() => {
                if (date.isValid() == false) {
                  toast(settoast, 'DATA INVÁLIDA', 'rgb(231, 76, 60, 1)', 3000);
                  document.getElementById("inputDataTermino").value = '';
                } else {
                  document.getElementById("inputDataTermino").value = moment(date).format('DD/MM/YYYY');
                }
              }, 3000);
            }}
            style={{
              display: 'flex',
              flexDirection: 'center', justifyContent: 'center', alignSelf: 'center',
              whiteSpace: 'pre-wrap',
              width: window.innerWidth < 426 ? '70vw' : '10vw',
              height: 50,
            }}
          >
          </input>
          <div className='button-green'
            style={{ width: 50, height: 50, alignSelf: 'center' }}
            title={'VOLTAR PARA O PASSÔMETRO'}
            onClick={() => {
              defineArrayDatas();
            }}>
            <img
              alt=""
              src={refresh}
              style={{
                margin: 0,
                height: 30,
                width: 30,
              }}
            ></img>
          </div>
        </div>
      </div>
    )
  }

  // eslint-disable-next-line
  const [arraydatas, setarraydatas] = useState([
    moment().format('DD/MM/YY'),
    moment().subtract(1, 'day').format('DD/MM/YY'),
    moment().subtract(2, 'days').format('DD/MM/YY'),
    moment().subtract(3, 'days').format('DD/MM/YY'),
    moment().subtract(4, 'days').format('DD/MM/YY'),
    moment().subtract(5, 'days').format('DD/MM/YY'),
  ]);
  const defineArrayDatas = () => {
    var inicio = moment(document.getElementById("inputDataInicio").value, 'DD/MM/YYYY');
    var termino = moment(document.getElementById("inputDataTermino").value, 'DD/MM/YYYY');
    let giggio = inicio.format('DD/MM/YYYY');
    var arraydates = [giggio];
    arraydatas.push(giggio);
    while (termino.diff(inicio, 'days') > 0) {
      inicio = inicio.add(1, 'day');
      giggio = moment(giggio, 'DD/MM/YYYY').add(1, 'day').format('DD/MM/YYYY');
      arraydates.push(giggio);
      arraydatas.push(giggio);
    }
  }

  function GraficoInternacoes() {
    return (
      <div
        className='scroll'
        style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
          backgroundColor: 'white',
          borderRadius: 5,
          margin: 10,
          height: 200, width: '80vw',
          borderColor: 'white',
          overflowX: 'scroll',
          overflowY: 'hidden',
        }}>
        {arraydatas.map(item => (
          <div className='button'
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              height: atendimentos.filter(valor => moment(valor.data).format('DD/MM/YYYY') == item && valor.situacao == 'internacao').length,
              borderRadius: 5,
              margin: 5,
              width: 200,
            }}>
            <div className='text2'>
              {atendimentos.filter(valor => moment(valor.data).format('DD/MM/YYYY') == item && valor.situacao == 'internacao').length}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const TempoMedioInternacao = useCallback(() => {
    return (
      <div className='text1 cor3'
        style={{
          margin: 10, padding: 10, borderRadius: 5,
          width: 150, height: 150,
          fontSize: 14,
          backgroundColor:
            Math.ceil(tempomediointernacao) < 11 ? 'rgb(82, 190, 128, 0.7)' :
              Math.ceil(tempomediointernacao) > 10 && Math.ceil(tempomediointernacao) < 21 ? 'rgb(241, 196, 15, 0.8)' :
                '',
        }}>
        {'TEMPO MÉDIO DE INTERNAÇÃO: ' + Math.ceil(tempomediointernacao) + ' DIAS.'}
      </div>
    )
  }, [tempomediointernacao])

  return (
    <div className='main scroll'
      style={{ display: pagina == 12 ? 'flex' : 'none' }}>
      <div id="painel de indicadores"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          marginTop: 10,
        }}>
        <div className='button-red'
          style={{ margin: 0, width: 50, height: 50, alignSelf: 'center' }}
          title={'VOLTAR PARA O PASSÔMETRO'}
          onClick={() => { setpagina(1); history.push('/passometro') }}>
          <img
            alt=""
            src={back}
            style={{
              margin: 0,
              height: 30,
              width: 30,
            }}
          ></img>
        </div>
        <div className="text3">
          INDICADORES
        </div>
        <div
          style={{
            position: 'relative',
            padidng: 10, margin: 20,
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            alignContent: 'center',
            width: '100vw',
          }}>
          <DataSelector></DataSelector>
          <TempoMedioInternacao></TempoMedioInternacao>
          <GraficoInternacoes></GraficoInternacoes>
          <Graficos></Graficos>
        </div>
      </div>
    </div>
  );
}

export default Indicadores;