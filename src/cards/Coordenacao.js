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
import makeObgesthos from '../functions/makeObgesthos';

function Coordenacao() {

  // context.
  const {
    settoast,
    usuario, // objeto com {id e nome_usuario}.
    atendimento, // id_atendimento.
    prontuario,
    card, setcard,
    assistenciais, // dados assistenciais do Gesthos.
    obgesthos,
  } = useContext(Context);

  const [listaproblemas, setlistaproblemas] = useState([]);
  const [propostas, setpropostas] = useState([]);
  const [evolucao, setevolucao] = useState([]);
  const [orientacoes, setorientacoes] = useState([]);

  useEffect(() => {
    if (card == 'card-propostas') {
      setlistaproblemas(assistenciais.filter(item => item.item == '0508 - LISTA DE PROBLEMAS').sort((a, b) => moment(a.data, 'DD/MM/YYYY') < moment(b.data, 'DD/MM/YYYY') ? 1 : -1));
      setpropostas(assistenciais.filter(item => item.item == '0509 - PROPOSTAS').sort((a, b) => moment(a.data, 'DD/MM/YYYY') < moment(b.data, 'DD/MM/YYYY') ? 1 : -1));
      setevolucao(assistenciais.filter(item => item.item == '0510 - EVOLUCAO').sort((a, b) => moment(a.data, 'DD/MM/YYYY') < moment(b.data, 'DD/MM/YYYY') ? 1 : -1));
      setorientacoes(assistenciais.filter(item => item.item == '0511 - ORIENTACAO AOS FAMILIARES').sort((a, b) => moment(a.data, 'DD/MM/YYYY') < moment(b.data, 'DD/MM/YYYY') ? 1 : -1));
    }
  }, [card, assistenciais]);

  // inserindo um registro da coordenação.
  const insertCoordenacao = () => {
    makeObgesthos(prontuario, atendimento, '05 - ANAMNESE E EVOLUCOES', '0508 - LISTA DE PROBLEMAS', [document.getElementById("inputCoordenacaoProblemas").value.toUpperCase()], usuario, obgesthos);
    makeObgesthos(prontuario, atendimento, '05 - ANAMNESE E EVOLUCOES', '0509 - PROPOSTAS', [document.getElementById("inputCoordenacaoPropostas").value.toUpperCase()], usuario, obgesthos);
    makeObgesthos(prontuario, atendimento, '05 - ANAMNESE E EVOLUCOES', '0510 - EVOLUÇÃO', [document.getElementById("inputCoordenacaoEvolucao").value.toUpperCase()], usuario, obgesthos);
    makeObgesthos(prontuario, atendimento, '05 - ANAMNESE E EVOLUCOES', '0511 - ORIENTAÇÃO AOS FAMILIARES', [document.getElementById("inputCoordenacaoOrientacoes").value.toUpperCase()], usuario, obgesthos);
    setviewinsertcoordenacao(0);
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
        <div id="btnsalvarevolucao"
          className='button-green'
          style={{ width: 50, height: 50 }}
          onClick={(e) => {
            setviewinsertcoordenacao(1);
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

  const [viewinsertcoordenacao, setviewinsertcoordenacao] = useState(0);
  const InsertCoordenacao = useCallback(() => {
    return (
      <div className="fundo" style={{ display: viewinsertcoordenacao == 1 ? 'flex' : 'none' }}
        onClick={(e) => { setviewinsertcoordenacao(0); e.stopPropagation() }}>
        <div className="janela scroll" onClick={(e) => e.stopPropagation()}
          style={{
            display: 'flex', flexDirection: 'column',
            justifyContent: 'flex-start',
            height: window.innerWidth < 426 ? '100vh' : '80vh',
            borderRadius: window.innerHeight < 426 ? 0 : 5,
          }}>
          <div className='text3'>REGISTRAR EVOLUÇÃO DA COORDENAÇÃO</div>

          <div className='text1'>LISTA DE PROBLEMAS</div>
          <textarea
            className="textarea"
            placeholder='LISTA DE PROBLEMAS...'
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = 'LISTA DE PROBLEMAS...')}
            style={{
              display: 'flex',
              flexDirection: 'center', justifyContent: 'center', alignSelf: 'center',
              whiteSpace: 'pre-wrap',
              width: window.innerWidth < 426 ? '70vw' : '50vw',
              height: 200,
            }}
            id="inputCoordenacaoProblemas"
            title="LISTA DE PROBLEMAS."
          >
          </textarea>

          <div className='text1'>PROPOSTAS</div>
          <textarea
            className="textarea"
            placeholder='PROPOSTAS'
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = 'PROPOSTAS')}
            style={{
              display: 'flex',
              flexDirection: 'center', justifyContent: 'center', alignSelf: 'center',
              whiteSpace: 'pre-wrap',
              width: window.innerWidth < 426 ? '70vw' : '50vw',
              height: 200,
            }}
            id="inputCoordenacaoPropostas"
            title="PROPOSTAS."
          >
          </textarea>

          <div className='text1'>EVOLUÇÃO</div>
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
              height: 200,
            }}
            id="inputCoordenacaoEvolucao"
            title="EVOLUÇÃO."
          >
          </textarea>

          <div className='text1'>ORIENTAÇÕES AOS FAMILIARES</div>
          <textarea
            className="textarea"
            placeholder='ORIENTAÇÕES AOS FAMILIARES...'
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = 'ORIENTAÇÕES AOS FAMILIARES...')}
            style={{
              display: 'flex',
              flexDirection: 'center', justifyContent: 'center', alignSelf: 'center',
              whiteSpace: 'pre-wrap',
              width: window.innerWidth < 426 ? '70vw' : '50vw',
              height: 200,
            }}
            id="inputCoordenacaoOrientacoes"
            title="ORIENTAÇÕES AOS FAMILIARES."
          >
          </textarea>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div id="botão de retorno"
              className="button-red"
              style={{
                display: 'flex',
                alignSelf: 'center',
              }}
              onClick={() => setviewinsertcoordenacao(0)}>
              <img
                alt=""
                src={back}
                style={{ width: 30, height: 30 }}
              ></img>
            </div>
            <div id='btnsalvarcoordencacao' className='button-green'
              onClick={() => checkinput('textarea', settoast, ['inputCoordenacaoProblemas', 'inputCoordenacaoPropostas', 'inputCoordenacaoEvolucao', 'inputCoordenacaoOrientacoes'], "btnsalvarcoordenacao", insertCoordenacao, [])}
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
  }, [viewinsertcoordenacao]);


  function ConsultaCoordenacaoGesthos() {
    return (
      <div
        style={{
          marginBottom: 5
        }}
      >
        <div className='text1'>LISTA DE PROBLEMAS</div>
        <div id="lista de problemas" className='scroll cor0' style={{ height: '30vh' }}>
          {listaproblemas.map(item => (
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
        </div>

        <div className='text1'>PROPOSTAS</div>
        <div id="propostas" className='scroll cor0' style={{ height: '30vh' }}>
          {propostas.map(item => (
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
        </div>

        <div className='text1'>EVOLUÇÃO</div>
        <div id="evolução" className='scroll cor0' style={{ height: '30vh' }}>
          {evolucao.map(item => (
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
        </div>

        <div className='text1'>ORIENTAÇÕES AOS FAMILIARES</div>
        <div id="orientações" className='scroll cor0' style={{ height: '30vh' }}>
          {orientacoes.map(item => (
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
        </div>

      </div>
    )
  }

  return (
    <div id="scroll-coordenação"
      className='card-aberto'
      style={{ display: card == 'card-propostas' ? 'flex' : 'none' }}
    >
      <div className="text3">
        COORDENAÇÃO
      </div>
      <Botoes></Botoes>
      <div
        style={{
          position: 'relative', display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-start',
          flex: 1
        }}>
        <ConsultaCoordenacaoGesthos></ConsultaCoordenacaoGesthos>
        <InsertCoordenacao></InsertCoordenacao>
      </div>
    </div>
  )
}

export default Coordenacao;