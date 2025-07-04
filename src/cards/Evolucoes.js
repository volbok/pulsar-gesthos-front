/* eslint eqeqeq: "off" */
import React, { useContext, useState, useEffect, useCallback } from 'react';
import Context from '../pages/Context';
import moment from 'moment';
// funções.
import checkinput from '../functions/checkinput';
// import filter from '../functions/filter';
// imagens.
import salvar from '../images/salvar.svg';
import novo from '../images/novo.svg';
import back from '../images/back.svg';
// componentes.
import Gravador from '../components/Gravador';
import makeObgesthos from '../functions/makeObgesthos';

function Evolucoes() {

  // context.
  const {
    settoast,
    usuario, // objeto com {id e nome_usuario}.
    atendimento, // id_atendimento.
    prontuario,
    arrayevolucoes, setarrayevolucoes,
    card, setcard,
    assistenciais, // dados assistenciais do Gesthos.
    obgesthos,
  } = useContext(Context);

  useEffect(() => {
    if (card == 'card-evolucoes') {
      setarrayevolucoes(assistenciais.filter(item => item.item == '0507 - EVOLUCAO CLINICA').sort((a, b) => moment(a.data, 'DD/MM/YYYY') < moment(b.data, 'DD/MM/YYYY') ? 1 : -1));
    }
  }, [card, setarrayevolucoes, assistenciais]);

  // inserindo uma evolução.
  const insertEvolucao = (evolucao) => {
    makeObgesthos(prontuario, atendimento, '05 - ANAMNESE E EVOLUCOES', '0507 - EVOLUCAO CLINICA', evolucao, usuario, obgesthos);
    console.log('ENCAMINHADA EVOLUÇÃO PARA MAKEOBGESTHOS.')
    setviewinsertevolucao(0);
  }

  // inserindo uma evolução por voz.
  const insertVoiceEvolucao = (evolucao) => {
    makeObgesthos(prontuario, atendimento, '05 - ANAMNESE E EVOLUCOES', '0507 - EVOLUCAO CLINICA', evolucao, usuario, obgesthos);
  }

  // registro de textarea por voz.
  function Botoes() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div id="botão de retorno"
          className="button-red"
          style={{
            display: 'flex',
            width: 50, height: 50,
          }}
          onClick={() => setcard('')}>
          <img
            alt=""
            src={back}
            style={{ width: 30, height: 30 }}
          ></img>
        </div>
        <Gravador funcao={insertVoiceEvolucao} continuo={true}></Gravador>
        <div id="btnsalvarevolucao"
          className='button-green'
          style={{ width: 50, height: 50 }}
          onClick={(e) => {
            setviewinsertevolucao(1);
            e.stopPropagation();
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
    );
  }

  const [viewinsertevolucao, setviewinsertevolucao] = useState(0);
  const InsertEvolucao = useCallback(() => {
    return (
      <div className="fundo" style={{ display: viewinsertevolucao == 1 ? 'flex' : 'none' }}
        onClick={(e) => { setviewinsertevolucao(0); e.stopPropagation() }}>
        <div className="janela" onClick={(e) => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className='text3'>EVOLUÇÃO</div>
          <textarea
            className="textarea"
            placeholder='EVOLUÇÃO...'
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = 'EVOLUÇÃO...')}
            style={{
              display: 'flex',
              flexDirection: 'center', justifyContent: 'center', alignSelf: 'center',
              whiteSpace: 'pre-wrap',
              width: window.innerWidth < 426 ? '70vw' : '50vw',
              height: 100,
            }}
            id="inputEvolucao"
            title="EVOLUÇÃO."
          >
          </textarea>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div id="botão de retorno"
              className="button-red"
              style={{
                display: 'flex',
                alignSelf: 'center',
              }}
              onClick={() => setviewinsertevolucao(0)}>
              <img
                alt=""
                src={back}
                style={{ width: 30, height: 30 }}
              ></img>
            </div>
            <div id='btnsalvarevolucao' className='button-green'
              onClick={() => checkinput('textarea', settoast, ['inputEvolucao'], "btnsalvarevolucao", insertEvolucao, [document.getElementById("inputEvolucao").value.toUpperCase()])}
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
      </div >
    )
    // eslint-disable-next-line
  }, [viewinsertevolucao]);

  function FilterEvolucoes() {
    return (
      <div className='input-special'
        style={{
          position: 'sticky',
          top: window.innerWidth < 426 ? 70 : 10,
          display: 'flex', alignSelf: 'center',
          zIndex: 20,
        }}>
        <input
          className="input"
          autoComplete="off"
          placeholder="BUSCAR NAS EVOLUÇÕES..."
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = 'BUSCAR NAS EVOLUÇÕES...')}
          onClick={(e) => e.stopPropagation()}
          onKeyUp={(e) => {
            filterEvolucao();
            e.stopPropagation();
          }}
          type="text"
          id="inputFilterEvolucao"
          defaultValue={filterevolucao}
          maxLength={100}
          style={{ margin: 5, width: window.innerWidth < 426 ? '65vw' : '30vw' }}
        ></input>
      </div>
    )
  }

  const [filterevolucao, setfilterevolucao] = useState('');
  var searchevolucao = '';
  const filterEvolucao = () => {
    clearTimeout(timeout);
    searchevolucao = document.getElementById("inputFilterEvolucao").value.toUpperCase();
    timeout = setTimeout(() => {
      document.getElementById("inputFilterEvolucao").blur();
      setTimeout(() => {
        if (searchevolucao == '') {
          setfilterevolucao('');
          setarrayevolucoes(assistenciais.filter(item => item.item == '0507 - EVOLUCAO CLINICA').sort((a, b) => moment(a.data, 'DD/MM/YYYY') < moment(b.data, 'DD/MM/YYYY') ? 1 : -1));
          document.getElementById("inputFilterEvolucao").value = '';
        } else {
          setfilterevolucao(document.getElementById("inputFilterEvolucao").value.toUpperCase());
          setarrayevolucoes(assistenciais.filter(item => item.item == '0507 - EVOLUCAO CLINICA' && item.valor.includes(searchevolucao) == true));
          document.getElementById("inputFilterEvolucao").value = searchevolucao;
        }
      }, 500);
    }, 1000);
  }

  function ConsultaEvolucoesGesthos() {
    return (
      <div
        style={{
          marginBottom: 5
        }}
      >
        {arrayevolucoes.map(item => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              backgroundColor: 'rgb(215, 219, 221)',
              borderRadius: 5,
              padding: 10, margin: 5
            }}
          >
            <div className='button-red'
              style={{
                alignSelf: 'flex-start',
                paddingLeft: 10, paddingRight: 10,
                margin: 0, marginBottom: 5
              }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div>
                  {item.data}
                </div>
                <div>
                  {item.hora.substring(0, 5)}
                </div>
              </div>
            </div>
            <div className='text1'
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                textAlign: 'left',
                alignItems: 'flex-start',
                alignSelf: 'flex-start',
                margin: 0, padding: 0,
              }}>
              {item.valor.toUpperCase()}
            </div>
          </div>
        ))
        }
      </div >
    )
  }

  var timeout = null;
  return (
    <div id="scroll-evolucoes"
      className='card-aberto'
      style={{ display: card == 'card-evolucoes' ? 'flex' : 'none' }}
    >
      <div className="text3">
        EVOLUÇÕES
      </div>
      <Botoes></Botoes>
      <div
        style={{
          position: 'relative', display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-start',
          flex: 1
        }}>
        <FilterEvolucoes></FilterEvolucoes>
        <ConsultaEvolucoesGesthos></ConsultaEvolucoesGesthos>
        <InsertEvolucao></InsertEvolucao>
      </div>
    </div>
  )
}

export default Evolucoes;