/* eslint eqeqeq: "off" */
import React, { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Context from './Context';
import moment from 'moment';
import 'moment/locale/pt-br';
// router.
import { useHistory } from 'react-router-dom';
// imagens.
import back from '../images/back.svg';
import body from '../images/body.svg';
import prec_padrao from '../images/prec_padrao.svg';
import prec_contato from '../images/prec_contato.svg';
import prec_respiratorio from '../images/prec_respiratorio.svg';
// cards.
import Alergias from '../cards/Alergias';
import Anamnese from '../cards/Anamnese';
import Boneco from '../cards/Boneco';
import Evolucoes from '../cards/Evolucoes';
import Infusoes from '../cards/Infusoes';
import Propostas from '../cards/Propostas';
import SinaisVitais from '../cards/SinaisVitais';
import Culturas from '../cards/Culturas';
import Antibioticos from '../cards/Antibioticos';
import VentilacaoMecanica from '../cards/VentilacaoMecanica';
import Dieta from '../cards/Dieta';
import Precaucoes from '../cards/Precaucoes';
import Riscos from '../cards/Riscos';
import Interconsultas from '../cards/Interconsultas';
import Laboratorio from '../cards/Laboratorio';
import Hd from '../cards/Hd';
import Imagem from '../cards/Imagem';
import BalancoHidrico from '../cards/BalancoHidrico';

function Historico() {

  // context.
  const {
    html,
    pagina, setpagina,
    pacientes, setpacientes,
    atendimentos, setatendimentos,

    assistenciais, setassistenciais,
    setexame,

    setatendimento,
    setprontuario,

    pas,
    pad,
    fc,
    tax,
    diurese,
    balancoacumulado,

    setpas,
    setpad,
    setfc,
    setfr,
    settax,
    setdiurese,
    setglicemia,
    setsao2,
    setestase, setevacuacao,
    setsinaisvitais,

    // estados utilizados pela função getAllData (necessária para alimentar os card fechados).
    cardalergias,
    cardanamnese,
    cardevolucoes,
    cardpropostas,
    cardprecaucoes,
    cardriscos,
    cardsinaisvitais,
    cardbody,
    cardvm,
    cardinfusoes,
    carddieta,
    cardculturas,
    cardatb,
    cardinterconsultas,
    cardlaboratorio,
    cardimagem,
    cardprescricao,
    cardbalanco,
    cardhd,
    card, setcard,

    // estados utilizados pela função getAllData (necessária para alimentar os card fechados).
    alergias,
    antibioticos,
    setinvasoes,
    setlesoes,
    precaucoes,
    riscos,
    setculturas, culturas,
    setarrayculturas,
    setdietas, dietas,
    setinfusoes, infusoes,
    setpropostas, propostas,
    setarraypropostas,
    sinaisvitais,
    setvm, vm,
    setinterconsultas, interconsultas,
    sethd, hd,

    datainicioatendimento, setdatainicioatendimento,
    dataterminoatendimento, setdataterminoatendimento,

  } = useContext(Context);

  // history (router).
  let history = useHistory();

  useEffect(() => {
    if (pagina == 10 && card == '') {
      loadPacientes();
      setatendimentos([]);
      console.log('RENDER');
    }
    // eslint-disable-next-line
  }, [pagina]);

  // recuperando registros de pacientes cadastrados na aplicação.
  const [arraypacientes, setarraypacientes] = useState([]);
  const loadPacientes = () => {
    console.log('LOAD PACIENTES');
    axios.get(html + 'list_pacientes').then((response) => {
      setpacientes(response.data.rows);
      setarraypacientes(response.data.rows);
    });
  }

  const getAtendimentos = (prontuario) => {
    axios.get(html + 'historico_atendimentos/' + prontuario).then((response) => {
      setatendimentos(response.data.rows);
    })
  }

  const [filterpaciente, setfilterpaciente] = useState('');
  var timeout = null;
  var searchpaciente = '';
  const filterPaciente = () => {
    clearTimeout(timeout);
    document.getElementById("inputHisPaciente").focus();
    searchpaciente = document.getElementById("inputHisPaciente").value.toUpperCase();
    timeout = setTimeout(() => {
      if (searchpaciente == '') {
        setfilterpaciente('');
        setarraypacientes(pacientes);
        document.getElementById("inputHisPaciente").value = '';
        setTimeout(() => {
          document.getElementById("inputHisPaciente").focus();
        }, 100);
      } else {
        setfilterpaciente(document.getElementById("inputHisPaciente").value.toUpperCase());
        setarraypacientes(pacientes.filter(item => item.paciente.includes(searchpaciente)));
        document.getElementById("inputHisPaciente").value = searchpaciente;
        setTimeout(() => {
          document.getElementById("inputHisPaciente").focus();
        }, 100);
      }
    }, 1000);
  }

  // filtro de paciente por nome.
  function FilterPaciente() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div id="botões e pesquisa"
          style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <div className='button-red'
            style={{ margin: 0, marginRight: 10, width: 50, height: 50 }}
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
        </div>
        <input
          className="input"
          autoComplete="off"
          placeholder="BUSCAR PACIENTE..."
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = 'BUSCAR PACIENTE...')}
          onKeyUp={() => filterPaciente()}
          type="text"
          id="inputHisPaciente"
          defaultValue={filterpaciente}
          maxLength={100}
          style={{ margin: 0, width: window.innerWidth < 426 ? '100%' : 'calc(30vw - 150px)' }}
        ></input>
      </div>
    )
  }

  const ListaDePacientes = useCallback(() => {
    return (
      <div id="lista de pacientes - historico" className='scroll'
        style={{
          display: 'flex',
          marginTop: 10,
          width: window.innerWidth < 426 ? '90vw' : '25vw',
          height: window.innerWidth < 426 ? window.innerHeight - 130 : 'calc(100vh - 125px)',
        }}>
        {arraypacientes.sort((a, b) => a.paciente > b.paciente ? 1 : -1).map(item => (
          <div
            key={"paciente " + item.id}
            style={{
              display: arraypacientes.length > 0 ? 'flex' : 'none',
              flexDirection: 'column', justifyContent: 'center',
            }}>
            <div className='row'
              style={{
                justifyContent: window.innerWidth > 425 ? 'space-between' : 'center',
                flex: 6, margin: 0,
              }}
              onClick={() => {
                console.log(item.prontuario);
                setprontuario(item.prontuario);
                getAtendimentos(item.prontuario);
                setcard('');
                setcards(0);
                var botoes = document.getElementById("lista de pacientes - historico").getElementsByClassName("button-red");
                for (var i = 0; i < botoes.length; i++) {
                  botoes.item(i).className = "button";
                }
                document.getElementById("paciente" + item.prontuario).className = 'button-red'
              }}
            >
              <div
                id={'paciente' + item.prontuario}
                className='button'
                style={{
                  width: '100%',
                  flex: window.innerWidth < 426 ? 6 : 2,
                  padding: 10,
                }}>
                {item.paciente}
              </div>
            </div>
          </div>
        ))}
        <div className='text1'
          style={{ display: arraypacientes.length == 0 ? 'flex' : 'none', opacity: 0.5 }}>
          SEM PACIENTES CADASTRADOS NA APLICAÇÃO
        </div>
      </div>
    )
    // eslint-disable-next-line
  }, [arraypacientes]);

  function Atendimentos() {
    return (
      <div className='scroll'
        style={{
          width: window.innerWidth < 426 ? '95vw' : '70vw',
          height: window.innerWidth < 426 ? window.innerHeight - 130 : 'calc(100vh - 20px)',
          display: cards == 0 ? 'flex' : 'none',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
        }}>
        {atendimentos.filter(item => item.situacao == 'alta').map((item) => (
          <div
            className='button'
            style={{
              minWidth: 75, width: 75, maxWidth: 75,
              minHeight: 75, height: 75, maxHeight: 75
            }}
            onClick={() => {
              setatendimento(item.atendimento);
              setcards(1);
              getAllData(item.prontuario, item.atendimento);
              getAssistenciais(item.atendimento);
            }}
          >
            {moment(item.data).format('DD/MM/YY')}
          </div>
        ))}
      </div>
    )
  }

  const getAssistenciais = (atendimento) => {
    axios.get('https://pulasr-gesthos-api.herokuapp.com/lista_assistencial/' + atendimento).then((response) => {
      // console.log(response.data.rows);
      var x = [];
      x = response.data.rows;
      setassistenciais(x);

      setdatainicioatendimento(x.sort((a, b) => moment(a.data, 'DD/MM/YYYY') > moment(b.data, 'DD/MM/YYYY') ? 1 : -1).slice(0, 1).map(item => item.data).pop());
      setdataterminoatendimento(x.sort((a, b) => moment(a.data, 'DD/MM/YYYY') > moment(b.data, 'DD/MM/YYYY') ? 1 : -1).slice(-1).map(item => item.data).pop());
      console.log(x.sort((a, b) => moment(a.data, 'DD/MM/YYYY') > moment(b.data, 'DD/MM/YYYY') ? -1 : 1).slice(0, 1).map(item => item.data).pop());
      console.log(x.sort((a, b) => moment(a.data, 'DD/MM/YYYY') > moment(b.data, 'DD/MM/YYYY') ? -1 : 1).slice(-1).map(item => item.data).pop());
      setexame(x.filter(valor => valor.item.substring(0, 2) == '08'));
      setsinaisvitais(x.filter(valor => parseInt(valor.atendimento) == atendimento && valor.data == moment().format('DD/MM/YYYY')));
      setpas(x.filter(valor => valor.item == "0101 - PAS"));
      setpad(x.filter(valor => valor.item == "0102 - PAD"));
      setfc(x.filter(valor => valor.item == "0103 - FC"));
      setfr(x.filter(valor => valor.item == "0104 - FR"));
      settax(x.filter(valor => valor.item == "0106 - TAX"));
      setsao2(x.filter(valor => valor.item == "0105 - SAO2"));
      setdiurese(x.filter(valor => valor.item == "0108 - DIURESE"));
      setglicemia(x.filter(valor => valor.item == "0107 - GLICEMIA"));
      setevacuacao(x.filter(valor => valor.item == "0110 - EVACUACAO"));
      setestase(x.filter(valor => valor.item == "0111 - ESTASE"));
    }).catch((error) => console.log(error));
  }

  const getAllData = (paciente, atendimento) => {
    // culturas.
    if (cardculturas == 1) {
      axios.get(html + 'list_culturas/' + parseInt(atendimento)).then((response) => {
        setculturas(response.data.rows);
        setarrayculturas(response.data.rows);
      });
    }
    // lesões.
    if (cardbody == 1) {
      axios.get(html + 'paciente_lesoes/' + parseInt(paciente)).then((response) => {
        setlesoes(response.data.rows);
      });
    }
    // dietas.
    if (carddieta == 1) {
      axios.get(html + 'list_dietas/' + parseInt(atendimento)).then((response) => {
        setdietas(response.data.rows);
      });
    }
    // infusões.
    if (cardinfusoes == 1) {
      axios.get(html + 'list_infusoes/' + parseInt(atendimento)).then((response) => {
        setinfusoes(response.data.rows);
      });
    }
    // invasões.
    if (cardbody == 1) {
      axios.get(html + 'list_invasoes/' + parseInt(atendimento)).then((response) => {
        setinvasoes(response.data.rows);
      });
    }
    // propostas.
    if (cardpropostas == 1) {
      axios.get(html + 'list_propostas/' + parseInt(atendimento)).then((response) => {
        setpropostas(response.data.rows);
        setarraypropostas(response.data.rows);
      });
    }
    // vm.
    if (cardvm == 1) {
      axios.get(html + 'list_vm/' + parseInt(atendimento)).then((response) => {
        setvm(response.data.rows);
      });
    }
    // interconsultas.
    if (cardinterconsultas == 1) {
      axios.get(html + 'list_interconsultas/' + parseInt(atendimento)).then((response) => {
        setinterconsultas(response.data.rows);
      });
    }
    // hd.
    if (cardhd == 1) {
      axios.get(html + 'list_hd/' + atendimento).then((response) => {
        sethd(response.data.rows);
      });
    }
  }

  // função para renderização dos cards fechados.
  let yellow = 'rgb(241, 196, 15, 0.8)';
  const [cards, setcards] = useState(0);
  const cartao = (sinal, titulo, opcao) => {
    return (
      <div
        className='card-fechado cor3'
        style={{
          display: card == '' ? 'flex' : 'none',
          backgroundColor: sinal != null && sinal.length > 0 ? yellow : '',
          borderColor: 'transparent',
          height: 'calc(17vw - 35px)',
          width: 'calc(17vw - 35px)'
        }}
        onClick={card == opcao ? () => setcard('') : () => setcard(opcao)}
      >
        <div className='text3'>{titulo}</div>
        <div style={{
          display: 'flex',
          flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap',
        }}>
          <div id='RESUMO PRECAUÇÕES'
            style={{ display: opcao == 'card-precaucoes' ? 'flex' : 'none' }}>
            <img
              alt=""
              src={prec_padrao}
              style={{
                display: assistenciais.filter(item => item.item == '0202 - PRECAUCOES' && item.valor.toUpperCase().includes('PADR') == true).length > 0 ? 'flex' : 'none',
                flexDirection: 'column',
                justifyContent: 'center',
                height: window.innerWidth < 426 ? 20 : 40,
                width: window.innerWidth < 426 ? 20 : 40,
                padding: 5,
              }}
            ></img>
            <img
              alt=""
              src={prec_contato}
              style={{
                display: assistenciais.filter(item => item.item == '0202 - PRECAUCOES' && item.valor.toUpperCase().includes('CONTATO') == true).length > 0 ? 'flex' : 'none',
                flexDirection: 'column',
                justifyContent: 'center',
                height: window.innerWidth < 426 ? 30 : 50,
                width: window.innerWidth < 426 ? 30 : 50,
              }}
            ></img>
            <img
              alt=""
              src={prec_respiratorio}
              style={{
                display: assistenciais.filter(item => item.item == '0202 - PRECAUCOES' && (item.valor.toUpperCase().includes('GOT') == true || item.valor.toUpperCase().includes('AEROSS')) == true).length > 0 ? 'flex' : 'none',
                flexDirection: 'column',
                justifyContent: 'center',
                height: window.innerWidth < 426 ? 30 : 50,
                width: window.innerWidth < 426 ? 30 : 50,
              }}
            ></img>
          </div>
          <div id='RESUMO DIETA'
            style={{
              display: opcao == 'card-dietas' ? 'flex' : 'none', flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <div className='textcard' style={{ margin: 0, padding: 0 }}>
              {dietas.map(item => item.tipo)}
            </div>
            <div className='textcard'
              style={{
                display: dietas.filter(item => item.tipo != 'ORAL' && item.tipo != 'NÃO DEFINIDA').length > 0 ? 'flex' : 'none',
                margin: 0, padding: 0,
              }}>
              {dietas.map(item => item.infusao + ' ml/h')}
            </div>
          </div>
          <div id='RESUMO VM'
            style={{
              display: opcao == 'card-vm' && vm.length > 0 ? 'flex' : 'none', flexDirection: 'column',
              justifyContent: 'center', alignSelf: 'center',
            }}>

            <div id="na vm"
              style={{
                display: vm.sort((a, b) => moment(a.data_vm) < moment(b.data_vm) ? -1 : 1).slice(-1).map(item => item.modo) == 'OFF' ? 'none' : 'flex',
                flexDirection: 'column', justifyContent: 'center'
              }}>
              <div className='textcard' style={{ margin: 0, padding: 0 }}>
                {vm.length > 0 ? vm.sort((a, b) => moment(a.data_vm) < moment(b.data_vm) ? -1 : 1).slice(-1).map(item => item.modo.toUpperCase()) : null}
              </div>
              <div style={{
                display: 'flex', flexDirection: 'row',
                justifyContent: 'center', alignSelf: 'center', flexWrap: 'wrap',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                  <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'PI'}</div>
                  <div className='textcard' style={{ margin: 0, padding: 0 }}>
                    {vm.length > 0 ? vm.sort((a, b) => moment(a.data_vm) < moment(b.data_vm) ? -1 : 1).slice(-1).map(item => item.pressao) : null}
                  </div>
                </div>
                <div style={{ display: window.innerWidth < 426 ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                  <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'VC'}</div>
                  <div className='textcard' style={{ margin: 0, padding: 0 }}>
                    {vm.length > 0 ? vm.sort((a, b) => moment(a.data_vm) < moment(b.data_vm) ? -1 : 1).slice(-1).map(item => item.volume) : null}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                  <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'PEEP'}</div>
                  <div className='textcard' style={{ margin: 0, padding: 0 }}>
                    {vm.length > 0 ? vm.sort((a, b) => moment(a.data_vm) < moment(b.data_vm) ? -1 : 1).slice(-1).map(item => item.peep) : null}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                  <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'FI'}</div>
                  <div className='textcard' style={{ margin: 0, padding: 0 }}>
                    {vm.length > 0 ? vm.sort((a, b) => moment(a.data_vm) < moment(b.data_vm) ? -1 : 1).slice(-1).map(item => item.fio2) : null}
                  </div>
                </div>
              </div>
            </div>
            <div id="fora da vm" className='textcard'
              style={{ display: vm.sort((a, b) => moment(a.data_vm) < moment(b.data_vm) ? -1 : 1).slice(-1).map(item => item.modo) != 'OFF' ? 'none' : 'flex' }}
            >
              {'PACIENTE FORA DA VM'}
            </div>
          </div>
          <div id='RESUMO ANTIBIÓTICOS'
            style={{
              display: opcao == 'card-antibioticos' ? 'flex' : 'none', flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {antibioticos.filter(item => item.data_termino == null).slice(-3).map(item => (
                <div
                  key={'atb resumo ' + item.id_antibiotico}
                  className='textcard'
                  style={{ margin: 0, padding: 0 }}
                >
                  {item.antibiotico}
                </div>
              ))}
              <div className='textcard' style={{ display: antibioticos.filter(item => item.data_termino == null).length > 3 ? 'flex' : 'none', alignSelf: 'center', textAlign: 'center' }}>...</div>
            </div>
          </div>
          <div id='RESUMO CULTURAS'
            style={{
              display: opcao == 'card-culturas' ? 'flex' : 'none', flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <div className='textcard' style={{ margin: 0, padding: 0 }}>
              {'PENDENTES: ' + culturas.filter(item => item.data_resultado == null).length}
            </div>
          </div>
          <div id='RESUMO INFUSÕES'
            style={{
              display: opcao == 'card-infusoes' ? 'flex' : 'none', flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {infusoes.filter(item => item.data_termino == null).slice(-2).map(item => (
                <div
                  key={'infusão ' + item.id_infusao}
                  className='textcard'
                  style={{ margin: 0, padding: 0 }}
                >
                  {item.droga + ' - ' + item.velocidade + 'ml/h'}
                </div>
              ))}
              <div style={{ display: infusoes.filter(item => item.data_termino == null).length > 2 ? 'flex' : 'none', alignSelf: 'center' }}>...</div>
            </div>
          </div>
          <div id='RESUMO PROPOSTAS'
            style={{
              display: opcao == 'card-propostas' ? 'flex' : 'none', flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <div className='textcard'
              style={{ display: 'flex', margin: 0, padding: 0 }}>
              {'PENDENTES: ' + propostas.filter(item => item.data_conclusao == null).length}
            </div>
          </div>
          <div id='RESUMO SINAIS VITAIS'
            style={{
              display: opcao == 'card-sinaisvitais' && sinaisvitais.length > 0 ? 'flex' : 'none', flexDirection: 'column',
              justifyContent: 'center', alignSelf: 'center',
            }}>
            <div style={{
              display: 'flex', flexDirection: 'row',
              justifyContent: 'center', alignSelf: 'center', flexWrap: 'wrap',
            }}>
              <div style={{ display: sinaisvitais.filter(valor => valor.item == '0102 - PAD').length > 0 ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'PAM'}</div>
                <div className='textcard' style={{ margin: 0, padding: 0 }}>
                  {Math.ceil((2 * parseInt(pad.filter(valor => valor.data == moment().format('DD/MM/YYYY')).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss') ? -1 : 1).slice(-1).map(item => item.valor)) + parseInt(pas.filter(valor => valor.data == moment().format('DD/MM/YYYY')).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss') ? -1 : 1).slice(-1).map(item => item.valor))) / 3)}
                </div>
              </div>
              <div style={{ display: sinaisvitais.filter(valor => valor.item == '0103 - FC').length > 0 ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'FC'}</div>
                <div className='textcard' style={{ margin: 0, padding: 0 }}>
                  {parseInt(fc.filter(valor => valor.data == moment().format('DD/MM/YYYY')).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss') ? -1 : 1).slice(-1).map(item => item.valor))}
                </div>
              </div>
              <div style={{ display: sinaisvitais.filter(valor => valor.item == '0106 - TAX').length > 0 ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'TAX'}</div>
                <div className='textcard' style={{ margin: 0, padding: 0 }}>
                  {tax.filter(valor => valor.data == moment().format('DD/MM/YYYY')).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss') ? -1 : 1).slice(-1).map(item => item.valor.toUpperCase())}
                </div>
              </div>
              <div style={{ display: window.innerWidth < 426 || sinaisvitais.filter(valor => valor.item == '0108 - DIURESE').length < 1 ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'DIURESE'}</div>
                <div className='textcard' style={{ margin: 0, padding: 0 }}>
                  {parseInt(diurese.filter(valor => valor.data == moment().format('DD/MM/YYYY')).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss') ? -1 : 1).slice(-1).map(item => item.valor.toUpperCase()))}
                </div>
              </div>
              <div style={{ display: window.innerWidth < 426 ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                <div className='textcard' style={{ display: 'flex', margin: 0, padding: 0, opacity: 0.5 }}>{'BALANÇO ACUMULADO'}</div>
                <div className='textcard' style={{ display: 'flex', margin: 0, padding: 0 }}>
                  {balancoacumulado}
                </div>
              </div>
            </div>
          </div>
          <div id='RESUMO ALERGIA'
            style={{
              display: opcao == 'card-alergias' ? 'flex' : 'none', flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <div className='textcard' style={{
              display: 'flex',
              margin: 0, padding: 0, fontSize: 16
            }}>
              {alergias.length}
            </div>
          </div>
          <div id='RESUMO RISCOS' style={{ display: opcao == 'card-riscos' ? 'flex' : 'none' }}>
            <div>
              {assistenciais.filter(item => item.item == '0203 - RISCOS').slice(-3).map(item => (
                <div
                  key={'risco ' + item.id}
                  className='textcard'
                  style={{ margin: 0, padding: 0 }}
                >
                  {item.valor.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
          <div id='RESUMO INTERCONSULTAS' style={{ display: opcao == 'card-interconsultas' ? 'flex' : 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {interconsultas.filter(valor => valor.status != 'ENCERRADA').map(item => (
                <div
                  key={'interconsultas ' + item.id_interconsulta}
                  className='textcard'
                  style={{ margin: 0, padding: 0 }}
                >
                  {item.especialidade}
                </div>
              ))}
              <div className='textcard' style={{ display: interconsultas.length > 3 ? 'flex' : 'none', alignSelf: 'center' }}>...</div>
            </div>
          </div>
          <div id='RESUMO HD' style={{ display: opcao == 'card-hd' ? 'flex' : 'none' }}>
            {hd.sort((a, b) => moment(a) < moment(b) ? -1 : 1).map(item => (
              <div
                key={'hd ' + item.id}
                className='textcard'
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
              >
                {item.heparina == 1 ?
                  moment(item.data).format('DD/MM/YY') + ' - UF: ' + item.uf + ' - HEP: SIM'
                  :
                  moment(item.data).format('DD/MM/YY') + ' - UF: ' + item.uf + ' - HEP: NÃO'}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  function Cards() {
    return (
      <div id="conteúdo cheio - histórico"
        className={window.innerWidth < 426 ? '' : 'scroll'}
        style={{
          display: cards == 1 ? 'flex' : 'none',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: window.innerWidth < 426 ? 'center' : 'flex-start',
          alignContent: 'flex-start', alignSelf: 'center', alignItems: 'center',
          width: window.innerWidth < 426 ? '95vw' : '70vw',
          height: window.innerWidth < 426 ? window.innerHeight - 130 : 'calc(100vh - 20px)',
          margin: 0,
          position: 'relative',
          scrollBehavior: 'smooth',
        }}>
        <div style={{ pointerEvents: 'none' }}>
          {cartao(null, 'PERÍODO DO ATENDIMENTO: ' + datainicioatendimento + ' A ' + dataterminoatendimento)}
        </div>

        {cartao(alergias, 'ALERGIAS', 'card-alergias', cardalergias)}
        {cartao(precaucoes, 'PRECAUÇÕES', 'card-precaucoes', cardprecaucoes)}
        {cartao(riscos, 'RISCOS', 'card-riscos', cardriscos)}

        {cartao(null, 'ANAMNESE', 'card-anamnese', cardanamnese)}
        {cartao(null, 'EVOLUÇÕES', 'card-evolucoes', cardevolucoes)}
        {cartao(propostas.filter(item => item.status == 0), 'PROPOSTAS', 'card-propostas', cardpropostas, null)}

        {cartao(null, 'SINAIS VITAIS', 'card-sinaisvitais', cardsinaisvitais)}
        {cartao(null, 'EXAMES LABORATORIAIS', 'card-laboratorio', cardlaboratorio)}
        {cartao(null, 'EXAMES DE IMAGEM / COMPLEMENTARES', 'card-imagem', cardimagem)}
        <div id='boneco' className="card-fechado"
          style={{
            display: card == '' && cardbody == 1 ? 'flex' : 'none',
            height: 'calc(17vw - 35px)',
            width: 'calc(17vw - 35px)',
          }}
          onClick={() => {
            if (card == 'card-boneco') {
              setcard('');
            } else {
              setcard('card-boneco');
            }
          }}
        >
          <img id="corpo"
            alt=""
            src={body}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: window.innerWidth < 426 ? '30vw' : '8vw',
            }}
          ></img>
        </div>
        {cartao(null, 'VENTILAÇÃO MECÂNICA', 'card-vm', cardvm)}
        {cartao(null, 'INFUSÕES', 'card-infusoes', cardinfusoes)}
        {cartao(null, 'DIETA', 'card-dietas', carddieta)}
        {cartao(culturas.filter(item => item.data_resultado == null), 'CULTURAS', 'card-culturas', cardculturas)}
        {cartao(antibioticos.filter(item => moment().diff(item.prazo, 'days') > 0 && item.data_termino == null), 'ANTIBIÓTICOS', 'card-antibioticos', cardatb)}
        {cartao(interconsultas.filter(item => item.status != 'ENCERRADA'), 'INTERCONSULTAS', 'card-interconsultas', cardinterconsultas)}
        {cartao(null, 'PRESCRIÇÃO', 'card-prescricao', cardprescricao)}
        {cartao(hd, 'HEMODIÁLISE', 'card-hd', cardhd)}
        {cartao(null, 'BALANCO HÍDRICO', 'card-balanco_hidrico', cardbalanco)}
      </div>
    )
  }

  return (
    <div className='main'
      style={{ display: pagina == 10 ? 'flex' : 'none' }}>
      <div id="histórico de pacientes e de atendimentos"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: 'calc(100vw - 20px)',
          height: 'calc(100vh - 20px)',
        }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div style={{
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
            height: 'calc(100vh - 20px)',
          }}>
            <FilterPaciente></FilterPaciente>
            <ListaDePacientes></ListaDePacientes>
          </div>
          <div
            id='wrap de cards ou de atendimentos'
            style={{
              display: card == '' ? 'flex' : 'none',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              height: 'calc(100vh - 20px)',
            }}>
            <Atendimentos></Atendimentos>
            <Cards></Cards>
          </div>
          <div
            id="conteúdo"
            className='scroll'
            style={{
              display: card == '' ? 'none' : 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              width: window.innerWidth < 426 ? '95vw' : '100%',
              height: window.innerWidth < 426 ? window.innerHeight - 130 : 'calc(100vh - 20px)',
              paddingRight: 28,
            }}>
            <BalancoHidrico></BalancoHidrico>
            <Alergias></Alergias>
            <Anamnese></Anamnese>
            <Boneco></Boneco>
            <Evolucoes></Evolucoes>
            <Propostas></Propostas>
            <SinaisVitais></SinaisVitais>
            <Infusoes></Infusoes>
            <Culturas></Culturas>
            <Antibioticos></Antibioticos>
            <VentilacaoMecanica></VentilacaoMecanica>
            <Dieta></Dieta>
            <Precaucoes></Precaucoes>
            <Riscos></Riscos>
            <Interconsultas></Interconsultas>
            <Laboratorio></Laboratorio>
            <Imagem></Imagem>
            <Hd></Hd>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Historico;