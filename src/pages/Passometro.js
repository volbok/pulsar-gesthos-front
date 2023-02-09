/* eslint eqeqeq: "off" */
import React, { useContext, useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import Context from './Context';
import moment from 'moment';
// imagens.
import power from '../images/power.svg';
import back from '../images/back.svg';
import people from '../images/people.svg';
import body from '../images/body.svg';
import prec_padrao from '../images/prec_padrao.svg';
import prec_contato from '../images/prec_contato.svg';
import prec_respiratorio from '../images/prec_respiratorio.svg';
import esteto from '../images/esteto.svg';
import preferencias from '../images/preferencias.svg';
import imprimir from '../images/imprimir.svg';
import clipimage from '../images/clipboard.svg';
// funções.
import toast from '../functions/toast';
// router.
import { useHistory } from 'react-router-dom';
// componentes.
import Logo from '../components/Logo';
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
import Alertas from '../cards/Alertas';
import Interconsultas from '../cards/Interconsultas';
import Exames from '../cards/Exames';
import Prescricao from './Prescricao';

function Passometro() {

  // variáveis de ambiente:
  // var html_pulsar_atendimentos = process.env.PULSAR_ATENDIMENTOS;

  // context.
  const {
    html,
    setusuario,

    settoast,
    pagina, setpagina,

    altura,

    settings,
    // tema, settema,
    carddiasinternacao, setcarddiasinternacao,
    cardalergias, setcardalergias,
    cardanamnese, setcardanamnese,
    cardevolucoes, setcardevolucoes,
    cardpropostas, setcardpropostas,
    cardprecaucoes, setcardprecaucoes,
    cardriscos, setcardriscos,
    cardalertas, setcardalertas,
    cardsinaisvitais, setcardsinaisvitais,
    cardbody, setcardbody,
    cardvm, setcardvm,
    cardinfusoes, setcardinfusoes,
    carddieta, setcarddieta,
    cardculturas, setcardculturas,
    cardatb, setcardatb,
    cardinterconsultas, setcardinterconsultas,

    card, setcard,

    setpaciente,
    atendimentos, setatendimentos,
    setatendimento, atendimento,

    // estados utilizados pela função getAllData (necessária para alimentar os card fechados).
    setalergias, alergias,
    setantibioticos, antibioticos,
    setinvasoes, invasoes,
    setlesoes,
    setprecaucoes, precaucoes,
    setriscos, riscos,
    setculturas, culturas,
    setdietas, dietas,
    setevolucoes, evolucoes, setarrayevolucoes,
    setinfusoes, infusoes,
    setpropostas, propostas,
    setsinaisvitais, sinaisvitais,
    setvm, vm,
    setinterconsultas, interconsultas,
  } = useContext(Context);

  // history (router).
  let history = useHistory();

  const refreshApp = () => {
    setusuario(
      {
        id: 0,
        nome_usuario: 'LOGOFF',
        dn_usuario: null,
        cpf_usuario: null,
        email_usuario: null,
      });
    setpagina(0);
    history.push('/');
  }
  window.addEventListener('load', refreshApp);

  // carregar lista de atendimentos ativos para a unidade selecionada.
  const [arrayatendimentos, setarrayatendimentos] = useState([]);
  const loadAtendimentos = () => {

    /*
    // Mecanismo para resgatar o token da localStorage e lançá-lo no header da requisição protegida.
    var token = localStorage.getItem("token");
    console.log(token);
    axios.defaults.headers.common["Authorization"] = token;
    */

    axios.get('https://pulsar-gesthos-api.up.railway.app/pulsar_atendimentos').then((response) => {
      var x = [0, 1];
      x = response.data;
      // console.log([x]);
      var y = [x];
      console.log(y.map(item => item.pacientes.map(item => item.internacao)).pop());
      setatendimentos(y.map(item => item.pacientes.map(item => item.internacao)).pop());
      setarrayatendimentos(y.map(item => item.pacientes.map(item => item.internacao)).pop());
    })
      .catch(function (error) {
        if (error.response == undefined) {
          console.log(error);
          toast(settoast, 'ERRO DE CONEXÃO, REINICIANDO APLICAÇÃO.', 'black', 3000);
          setTimeout(() => {
            setpagina(0);
            history.push('/');
          }, 3000);
        } else {
          console.log(error);
          toast(settoast, error.response.data.message + ' REINICIANDO APLICAÇÃO.', 'black', 3000);
          setTimeout(() => {
            setpagina(0);
            history.push('/');
          }, 3000);
        }
      });
  }

  // registro de todas as interconsultas (serão exibição em destaque na lista de pacientes).
  const [allinterconsultas, setallinterconsultas] = useState([]);
  const loadAllInterconsultas = () => {
    axios.get(html + 'all_interconsultas').then((response) => {
      setallinterconsultas(response.data.rows);
    });
  }

  var timeout = null;
  useEffect(() => {
    if (pagina == 1) {
      setpaciente(null);
      setatendimento(null);
      loadAtendimentos();
      loadAllInterconsultas();
      setcarddiasinternacao(settings.map(item => item.card_diasinternacao).pop());
      setcardalergias(settings.map(item => item.card_alergias).pop());
      setcardanamnese(settings.map(item => item.card_anamnese).pop());
      setcardevolucoes(settings.map(item => item.card_evolucoes).pop());
      setcardpropostas(settings.map(item => item.card_propostas).pop());
      setcardprecaucoes(settings.map(item => item.card_precaucoes).pop());
      setcardriscos(settings.map(item => item.card_riscos).pop());
      setcardalertas(settings.map(item => item.card_alertas).pop());
      setcardsinaisvitais(settings.map(item => item.card_sinaisvitais).pop());
      setcarddiasinternacao(settings.map(item => item.card_diasinternacao).pop());
      setcardbody(settings.map(item => item.card_body).pop());
      setcardvm(settings.map(item => item.card_vm).pop());
      setcardinfusoes(settings.map(item => item.card_infusoes).pop());
      setcarddieta(settings.map(item => item.card_dieta).pop());
      setcardculturas(settings.map(item => item.card_culturas).pop());
      setcardatb(settings.map(item => item.card_antibioticos).pop());
      setcardinterconsultas(settings.map(item => item.card_interconsultas).pop());
      // setcardexames(settings.map(item => item.card_exames).pop());
    }
    // eslint-disable-next-line
  }, [pagina, settings]);

  // botão de configurações / settings.
  function BtnOptions() {
    return (
      <div style={{
        position: window.innerWidth > 425 ? 'absolute' : '',
        top: window.innerWidth < 426 ? 65 : 10,
        right: window.innerWidth < 426 ? 0 : 25,
        width: window.innerWidth < 426 ? '90vw' : '',
        display: window.innerWidth < 426 ? 'none' : 'flex', flexDirection: 'row', justifyContent: 'center',
      }}>
        <div className='button cor1hover'
          style={{
            minWidth: 25, maxWidth: 25, minHeight: 25, maxHeight: 25,
          }}
          title={'CONFIGURAÇÕES'}
          onClick={() => { setpagina(4); history.push('/settings'); }}
        >
          <img
            alt=""
            src={preferencias}
            style={{
              margin: 0,
              height: 20,
              width: 20,
            }}
          ></img>
        </div>
        <div className='button cor1hover'
          style={{
            display: window.innerWidth < 426 || atendimento == null ? 'none' : 'flex',
            minWidth: 25, maxWidth: 25, minHeight: 25, maxHeight: 25,
            marginLeft: 0
          }}
          title={'COPIAR PARA A CLIPBOARD'}
          onClick={() => {
            let alergia = alergias.map(item => item.alergia).length > 0 ? 'ALERGIAS: ' + alergias.map(item => item.alergia) + '\n\n' : '';
            let problemas = atendimentos.filter(item => item.id_atendimento == atendimento).map(item => item.problemas).length > 0 ? 'PROBLEMAS: ' + atendimentos.filter(item => item.id_atendimento == atendimento).map(item => item.problemas) + '\n\n' : '';
            let evolucao = evolucoes.filter(item => item.id_atendimento == atendimento).length > 0 ? 'EVOLUÇÃO: ' + evolucoes.sort((a, b) => moment(a.data_evolucao) < moment(b.data_evolucao) ? -1 : 1).filter(item => item.id_atendimento == atendimento).slice(-1).map(item => item.evolucao) + '\n\n' : '';
            let invasao = invasoes.filter(item => item.data_retirada == null).length > 0 ? 'INVASÕES:\n' + invasoes.filter(item => item.data_retirada == null).map(item => '\n' + item.dispositivo + ' - ' + item.local + ' - ' + moment(item.data_implante).format('DD/MM/YY')) + '\n\n' : '';
            let ventilacao = vm.length > 0 ? 'VM:' + vm.sort((a, b) => moment(a.data_vm) < moment(b.data_vm) ? -1 : 1).slice(-1).map(item => '\nMODO: ' + item.modo + '\nPRESSÃO: ' + item.pressao + '\nVOLUME: ' + item.volume + '\nPEEP: ' + item.peep + '\nFI: ' + item.fi) + '\n\n' : '';
            let infusao = infusoes.filter(item => item.data_termino == null).length > 0 ? 'INFUSÕES:' + infusoes.filter(item => item.data_termino == null).map(item => '\n' + item.droga + ' - ' + item.velocidade + 'ml/h') + '\n\n' : '';
            let cultura = culturas.length > 0 ? 'CULTURAS:' + culturas.map(item => '\n' + item.material + ' (' + moment(item.data_pedido).format('DD/MM/YY') + '): ' + item.resultado) + '\n\n' : '';
            let antibiotico = antibioticos.length > 0 ? 'ANTIBIÓTICOS:' + antibioticos.map(item => '\n' + item.antibiotico + ' - ' + moment(item.data_inicio).format('DD/MM/YY')) + '\n\n' : '';
            let controle = sinaisvitais.length > 0 ? 'CONTROLES: ' + sinaisvitais.slice(-1).map(item => 'PA: ' + item.pas + ' x ' + item.pad + '\n') + sinaisvitais.slice(-1).map(item => 'FC: ' + item.fc + '\n') + sinaisvitais.slice(-1).map(item => 'FR: ' + item.fr + '\n') + sinaisvitais.slice(-1).map(item => 'SAO2: ' + item.sao2 + '\n') + sinaisvitais.slice(-1).map(item => 'TAX: ' + item.tax + '\n') + sinaisvitais.slice(-1).map(item => 'BALANÇO: ' + item.balanco) + '\n\n' : '';
            let proposta = propostas.length > 0 ? 'PROPOSTAS:' + propostas.filter(item => item.status == 0).map(item => '\n' + item.proposta) : '';

            var clipboard = '## ' + plantao + ' ##\n\n' +
              alergia + problemas + evolucao + invasao + ventilacao + infusao + cultura + antibiotico + controle + proposta;

            console.log(clipboard);
            setclipboard(clipboard);
            setTimeout(() => {

              setviewclipboard(1);
              document.getElementById("clipboardTextarea").value = clipboard
              if (navigator && navigator.clipboard && navigator.clipboard.writeText)
                return navigator.clipboard.writeText(clipboard);
              return Promise.reject('The Clipboard API is not available.');
            }, 1000);
          }}
        >
          <img
            alt=""
            src={clipimage}
            style={{
              margin: 0,
              height: 20,
              width: 20,
            }}
          ></img>
        </div>
        <div className='button cor1hover'
          style={{
            display: window.innerWidth < 426 || atendimento == null ? 'none' : 'flex',
            minWidth: 25, maxWidth: 25, minHeight: 25, maxHeight: 25,
            marginLeft: 0
          }}
          title={'IMPRIMIR'}
          onClick={() => { setpagina(6); history.push('/pdf'); }}
        >
          <img
            alt=""
            src={imprimir}
            style={{
              margin: 0,
              height: 20,
              width: 20,
            }}
          ></img>
        </div>
      </div>
    )
  }

  // identificação do usuário.
  function Usuario() {
    return (
      <div style={{
        display: 'flex', flexDirection: 'row',
        marginBottom: 10,
      }}>
        <div className='button-red'
          style={{ margin: 0, marginRight: 10 }}
          // title={'USUÁRIO: ' + usuario.nome_usuario.split(' ', 1)}
          onClick={() => { setpagina(0); history.push('/'); }}>
          <img
            alt=""
            src={power}
            style={{
              margin: 0,
              height: 30,
              width: 30,
            }}
          ></img>
        </div>
        <FilterPaciente></FilterPaciente>
        <div className='button'
          style={{ margin: 0, marginLeft: 10 }}
          title={'PACIENTES'}
          onClick={() => { history.push('/cadastro'); setpagina(2) }}>
          <img
            alt=""
            src={people}
            style={{
              margin: 0,
              height: 35,
              width: 35,
            }}
          ></img>
        </div>
      </div>
    )
  }

  const [filterpaciente, setfilterpaciente] = useState('');
  var searchpaciente = '';
  const filterPaciente = () => {
    clearTimeout(timeout);
    document.getElementById("inputPaciente").focus();
    searchpaciente = document.getElementById("inputPaciente").value.toUpperCase();
    timeout = setTimeout(() => {
      if (searchpaciente == '') {
        setfilterpaciente('');
        setarrayatendimentos(atendimentos);
        document.getElementById("inputPaciente").value = '';
        setTimeout(() => {
          document.getElementById("inputPaciente").focus();
        }, 100);
      } else {
        setfilterpaciente(document.getElementById("inputPaciente").value.toUpperCase());
        setarrayatendimentos(atendimentos.filter(item => item.paciente.includes(searchpaciente) || item.leito.includes(searchpaciente)));
        document.getElementById("inputPaciente").value = searchpaciente;
        setTimeout(() => {
          document.getElementById("inputPaciente").focus();
        }, 100);
      }
    }, 1000);
  }

  // filtro de paciente por nome.
  function FilterPaciente() {
    return (
      <input
        className="input cor2"
        autoComplete="off"
        placeholder={window.innerWidth < 426 ? "BUSCAR PACIENTE..." : "BUSCAR..."}
        onFocus={(e) => (e.target.placeholder = '')}
        onBlur={(e) => (window.innerWidth < 426 ? e.target.placeholder = "BUSCAR PACIENTE..." : "BUSCAR...")}
        onKeyUp={() => filterPaciente()}
        type="text"
        id="inputPaciente"
        defaultValue={filterpaciente}
        maxLength={100}
        style={{ margin: 0, width: '100%' }}
      ></input>
    )
  }

  // lista de atendimentos.
  const ListaDeAtendimentos = useCallback(() => {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        width: 'calc(100% - 15px)',
        alignSelf: 'center',
      }}>
        <div className="text3">
          {'LISTA DE PACIENTES'}
        </div>
        <div
          className="scroll"
          id="scroll atendimentos"
          style={{
            display: arrayatendimentos.length > 0 ? 'flex' : 'none',
            justifyContent: 'flex-start',
            height: window.innerHeight - 140,
            width: window.innerWidth < 426 ? 'calc(95vw - 15px)' : '100%',
          }}>
          {arrayatendimentos.sort((a, b) => a.leito > b.leito ? 1 : -1).map(item => (
            <div key={'pacientes' + item.atendimento}>
              <div
                className="row" style={{ padding: 0, flex: 4 }}
              >
                <div className='button-yellow'
                  style={{
                    flex: 1, marginRight: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }}>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div>
                      {item.unidadeinternacao}
                    </div>
                    <div>
                      {item.leito}
                    </div>
                  </div>
                </div>
                <div
                  id={'atendimento ' + item.atendimento}
                  className='button'
                  style={{
                    position: 'relative',
                    flex: 3, marginLeft: 0,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                  onClick={() => {
                    setviewlista(0);
                    setatendimento(parseInt(item.atendimento));
                    setpaciente(parseInt(item.prontuario));
                    getAllData(item.prontuario, item.atendimento);
                    if (pagina == 1) {
                      setTimeout(() => {
                        var botoes = document.getElementById("scroll atendimentos").getElementsByClassName("button-red");
                        for (var i = 0; i < botoes.length; i++) {
                          botoes.item(i).className = "button";
                        }
                        document.getElementById("atendimento " + item.atendimento).className = "button-red";
                      }, 100);
                    }
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    {window.innerWidth < 768 ?
                      item.paciente.substring(0, 20) + '...'
                      :
                      item.paciente
                    }
                    <div>
                      {moment().diff(moment(item.nascimento, 'DD/MM/YYYY'), 'years') + ' ANOS'}
                    </div>
                  </div>
                  <div
                    id={'btn_interconsultas' + item.atendimento}
                    className='button-yellow'
                    onMouseOver={() => document.getElementById('list_interconsultas ' + item.atendimento).style.display = 'flex'}
                    onMouseLeave={() => document.getElementById('list_interconsultas ' + item.atendimento).style.display = 'none'}
                    style={{
                      display: window.innerWidth > 425 && allinterconsultas.filter(valor => valor.id_atendimento == item.atendimento && valor.status != 'ENCERRADA').length > 0 ? 'flex' : 'none',
                      position: 'absolute', top: -15, right: -15,
                      zIndex: 10,
                      borderRadius: 50,
                      backgroundColor: 'rgb(229, 126, 52, 1)',
                      borderColor: '#f2f2f2',
                      borderWidth: 5,
                      borderStyle: 'solid',
                      width: 20, minWidth: 20,
                      height: 20, minHeight: 20,
                    }}>
                    <img
                      alt=""
                      src={esteto}
                      style={{ width: 30, height: 30 }}
                    ></img>
                  </div>
                  <div
                    id={'list_interconsultas ' + item.atendimento}
                    className='button'
                    style={{
                      display: 'none',
                      position: 'absolute', top: 20, right: 10,
                      zIndex: 20,
                      borderRadius: 5,
                      flexDirection: 'column', justifyContent: 'center',
                      backgroundColor: 'rgb(97, 99, 110, 1)',
                      padding: 20,
                    }}>
                    {allinterconsultas.filter(valor => valor.id_atendimento == item.atendimento && valor.status != 'ENCERRADA').map(item => (
                      <div key={'interconsulta ' + item.especialidade}>{item.especialidade}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="scroll"
          style={{
            display: arrayatendimentos.length > 0 ? 'none' : 'flex',
            justifyContent: 'center',
            height: window.innerHeight - 150,
            width: window.innerWidth < 426 ? 'calc(95vw - 15px)' : '100%',
          }}>
          <div className='text3'
            style={{ opacity: 0.5 }}>
            SEM PACIENTES CADASTRADOS PARA ESTA UNIDADE
          </div>
        </div>
      </div >
    )
    // eslint-disable-next-line
  }, [arrayatendimentos, allinterconsultas]);

  // identificação do paciente na versão mobile, na view dos cards.
  function ViewPaciente() {
    return (
      <div
        id='mobile_pacientes'
        style={{
          position: 'sticky', marginTop: 0, top: 0, left: 0, right: 0,
          display: window.innerWidth < 426 ? 'flex' : 'none',
          flexDirection: 'row', justifyContent: 'center',
          flex: 1,
          backgroundColor: '#f2f2f2', borderColor: '#f2f2f2', borderRadius: 5,
          zIndex: 30,
          minWidth: 'calc(90vw - 10px)',
          width: 'calc(90vw - 10px)',
        }}>
        <div id="botão de retorno"
          className="button-red"
          style={{
            display: window.innerWidth < 426 ? 'flex' : 'none',
            opacity: 1, backgroundColor: '#ec7063',
            alignSelf: 'center',
          }}
          onClick={card == '' ? () => setviewlista(1) : () => setcard('')}>
          <img
            alt=""
            src={back}
            style={{ width: 30, height: 30 }}
          ></img>
        </div>
        {arrayatendimentos.filter(item => item.atendimento == atendimento).map(item => (
          <div className="row"
            key={'paciente selecionado ' + item.atendimento}
            style={{
              margin: 0, padding: 0, flex: 1, justifyContent: 'space-around',
              width: '100%', backgroundColor: 'transparent',
            }}>
            <div className='button-yellow'
              style={{
                margin: 5, marginRight: 0, marginLeft: 0,
                borderTopRightRadius: 0, borderBottomRightRadius: 0,
              }}>
              {item.leito}
            </div>
            <div className='button'
              style={{
                flex: 1, marginLeft: 0,
                borderTopLeftRadius: 0, borderBottomLeftRadius: 0,
              }}>
              <div style={{ width: '100%' }}>
                {window.innerWidth < 768 ?
                  item.nome.substring(0, 20) + '...'
                  :
                  item.nome
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // estado para retorno do balanço hídrico acumulado.
  const [balancoacumulado, setbalancoacumulado] = useState(0);
  // carregando todas as informações do atendimento.
  const getAllData = (paciente, atendimento) => {
    // Dados relacionados ao paciente.
    // alergias.
    if (cardalergias == 1) {
      setbusyalergias(1);
      axios.get(html + 'paciente_alergias/' + paciente).then((response) => {
        setalergias(response.data.rows);
        setbusyalergias(0);
      })
        .catch(function (error) {
          if (error.response == undefined) {
            toast(settoast, 'ERRO DE CONEXÃO, REINICIANDO APLICAÇÃO.', 'black', 3000);
            setTimeout(() => {
              setpagina(0);
              history.push('/');
            }, 3000);
          } else {
            toast(settoast, error.response.data.message + ' REINICIANDO APLICAÇÃO.', 'black', 3000);
            setTimeout(() => {
              setpagina(0);
              history.push('/');
            }, 3000);
          }
        });
    }
    // lesões.
    if (cardbody == 1) {
      axios.get(html + 'paciente_lesoes/' + paciente).then((response) => {
        setlesoes(response.data.rows);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
    // precauções.
    if (cardprecaucoes == 1) {
      axios.get(html + 'paciente_precaucoes/' + paciente).then((response) => {
        setprecaucoes(response.data.rows);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
    // riscos.
    if (cardriscos == 1) {
      setbusyriscos(1);
      axios.get(html + 'paciente_riscos/' + paciente).then((response) => {
        setriscos(response.data.rows);
        setbusyriscos(0);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
    // Dados relacionados ao atendimento.
    // antibióticos.
    if (cardatb == 1) {
      setbusyatb(1);
      axios.get(html + 'list_antibioticos/' + atendimento).then((response) => {
        setantibioticos(response.data.rows);
        setbusyatb(0);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
    // culturas.
    if (cardculturas == 1) {
      setbusyculturas(1);
      axios.get(html + 'list_culturas/' + atendimento).then((response) => {
        setculturas(response.data.rows);
        setbusyculturas(0);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
    // dietas.
    if (carddieta == 1) {
      setbusydieta(1);
      axios.get(html + 'list_dietas/' + atendimento).then((response) => {
        setdietas(response.data.rows);
        setbusydieta(0);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
    // evoluções.
    if (cardevolucoes == 1) {
      axios.get(html + 'list_evolucoes/' + atendimento).then((response) => {
        setevolucoes(response.data.rows);
        setarrayevolucoes(response.data.rows);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
    // infusões.
    if (cardinfusoes == 1) {
      setbusyinfusoes(1);
      axios.get(html + 'list_infusoes/' + atendimento).then((response) => {
        setinfusoes(response.data.rows);
        setbusyinfusoes(0);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
    // invasões.
    if (cardbody == 1) {
      axios.get(html + 'list_invasoes/' + atendimento).then((response) => {
        setinvasoes(response.data.rows);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
    // propostas.
    if (cardpropostas == 1) {
      setbusypropostas(1);
      axios.get(html + 'list_propostas/' + atendimento).then((response) => {
        setpropostas(response.data.rows);
        setbusypropostas(0);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
    // sinais vitais.
    if (cardsinaisvitais == 1) {
      setbusysinaisvitais(0);
      axios.get(html + 'list_sinais_vitais/' + atendimento).then((response) => {
        var x = response.data.rows;
        var arraybalancos = [];
        setbusysinaisvitais(0);
        setsinaisvitais(response.data.rows);
        // cálculo do balanço acumulado.
        x.map(item => {
          if (isNaN(parseFloat(item.balanco.replace(" ", ""))) == true) {
            console.log('VALOR INVÁLIDO PARA CÁLCULO DO BALANÇO ACUMULADO: ' + item.balanco);
          } else {
            arraybalancos.push(parseFloat(item.balanco.replace(" ", "")));
          }
          return null;
        });
        function soma(total, num) {
          return total + num;
        }
        setbalancoacumulado(arraybalancos.reduce(soma, 0));
      })
        .catch(function (error) {
          console.log(error);
        })
    }
    // vm.
    if (cardvm == 1) {
      setbusyvm(1);
      axios.get(html + 'list_vm/' + atendimento).then((response) => {
        setbusyvm(0);
        setvm(response.data.rows);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
    // interconsultas.
    if (cardinterconsultas == 1) {
      setbusyinterconsultas(1);
      axios.get(html + 'list_interconsultas/' + atendimento).then((response) => {
        setinterconsultas(response.data.rows);
        setbusyinterconsultas(0);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
  }

  // ## CLIPBOARD ## //
  // Copia para a área de transferência todas as informações do atendimento, montando uma evolução completa a ser "colada" no PEP.
  let plantao = parseInt(moment().format('HH')) < 19 ? 'PLANTÃO DIURNO' : 'PLANTÃO NOTURNO';
  const [clipboard, setclipboard] = useState('');
  const [viewclipboard, setviewclipboard] = useState(0);
  const ViewClipboard = useCallback(() => {
    return (
      <div
        className='fundo'
        onClick={() => setviewclipboard(0)}
        style={{ display: viewclipboard == 1 ? 'flex' : 'none' }}
      >
        <textarea id="clipboardTextarea" className='textarea'
          onClick={(e) => e.stopPropagation()}
          defaultValue={clipboard}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: window.innerWidth < 426 ? '80vw' : '30vw',
            height: '60vh',
          }}>
        </textarea>
      </div>
    )
    // eslint-disable-next-line  
  }, [clipboard, viewclipboard]);

  // estado para alternância entre lista de pacientes e conteúdo do passômetro para versão mobile.
  const [viewlista, setviewlista] = useState(1);

  // função busy.
  const [busyalergias, setbusyalergias] = useState(0);
  const [busypropostas, setbusypropostas] = useState(0);
  const [busyriscos, setbusyriscos] = useState(0);
  const [busysinaisvitais, setbusysinaisvitais] = useState(0);
  const [busyvm, setbusyvm] = useState(0);
  const [busyinfusoes, setbusyinfusoes] = useState(0);
  const [busydieta, setbusydieta] = useState(0);
  const [busyculturas, setbusyculturas] = useState(0);
  const [busyatb, setbusyatb] = useState(0);
  const [busyinterconsultas, setbusyinterconsultas] = useState(0);

  const loading = (chave) => {
    return (
      <div className='destaque' style={{ marginTop: 20, display: chave == 1 ? 'flex' : 'none' }}>
        <Logo height={20} width={20}></Logo>
      </div>
    )
  };

  // função para renderização dos cards fechados.
  let yellow = 'rgb(241, 196, 15, 0.8)';
  const cartao = (sinal, titulo, opcao, setting, busy) => {
    return (
      <div
        className='card-fechado cor3'
        style={{
          display: card == '' && atendimento != null && setting == 1 ? 'flex' : 'none',
          backgroundColor: sinal != null && sinal.length > 0 ? yellow : '',
          borderColor: 'transparent',
          width: window.innerWidth > 425 && document.getElementById("conteúdo vazio") != null ? Math.ceil((document.getElementById("conteúdo vazio").offsetWidth / 4) - 43) :
            window.innerWidth < 426 && document.getElementById("conteúdo vazio") != null ? Math.ceil((document.getElementById("conteúdo cheio").offsetWidth / 2) - 48) : '',
        }}
        onClick={card == opcao ? () => setcard('') : () => setcard(opcao)}
      >
        <div className='text3'>{titulo}</div>
        <div style={{
          display: busy == 1 ? 'none' : 'flex',
          flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap',

        }}>
          <div id='RESUMO PRECAUÇÕES'
            style={{ display: opcao == 'card-precaucoes' ? 'flex' : 'none' }}>
            <img
              alt=""
              src={prec_padrao}
              style={{
                display: precaucoes.filter(item => item.precaucao == 'PADRÃO').length > 0 ? 'flex' : 'none',
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
                display: precaucoes.filter(item => item.precaucao == 'CONTATO').length > 0 ? 'flex' : 'none',
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
                display: precaucoes.filter(item => item.precaucao == 'AEROSSOL' || item.precaucao == 'GOTÍCULA').length > 0 ? 'flex' : 'none',
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
                {vm.sort((a, b) => moment(a.data_vm) < moment(b.data_vm) ? -1 : 1).slice(-1).map(item => item.modo)}
              </div>
              <div style={{
                display: 'flex', flexDirection: 'row',
                justifyContent: 'center', alignSelf: 'center', flexWrap: 'wrap',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                  <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'PI'}</div>
                  <div className='textcard' style={{ margin: 0, padding: 0 }}>
                    {vm.sort((a, b) => moment(a.data_vm) < moment(b.data_vm) ? -1 : 1).slice(-1).map(item => item.pressao)}
                  </div>
                </div>
                <div style={{ display: window.innerWidth < 426 ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                  <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'VC'}</div>
                  <div className='textcard' style={{ margin: 0, padding: 0 }}>
                    {vm.sort((a, b) => moment(a.data_vm) < moment(b.data_vm) ? -1 : 1).slice(-1).map(item => item.volume)}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                  <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'PEEP'}</div>
                  <div className='textcard' style={{ margin: 0, padding: 0 }}>
                    {vm.sort((a, b) => moment(a.data_vm) < moment(b.data_vm) ? -1 : 1).slice(-1).map(item => item.peep)}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                  <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'FI'}</div>
                  <div className='textcard' style={{ margin: 0, padding: 0 }}>
                    {vm.sort((a, b) => moment(a.data_vm) < moment(b.data_vm) ? -1 : 1).slice(-1).map(item => item.fio2)}
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
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'PAM'}</div>
                <div className='textcard' style={{ margin: 0, padding: 0 }}>
                  {sinaisvitais.length > 0 ? Math.ceil((2 * parseInt(sinaisvitais.slice(-1).map(item => item.pad)) + parseInt(sinaisvitais.slice(-1).map(item => item.pas))) / 3) : null}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'FC'}</div>
                <div className='textcard' style={{ margin: 0, padding: 0 }}>
                  {sinaisvitais.slice(-1).map(item => item.fc)}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'TAX'}</div>
                <div className='textcard' style={{ margin: 0, padding: 0 }}>
                  {sinaisvitais.slice(-1).map(item => item.tax)}
                </div>
              </div>
              <div style={{ display: window.innerWidth < 426 ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'DIURESE'}</div>
                <div className='textcard' style={{ margin: 0, padding: 0 }}>
                  {sinaisvitais.slice(-1).map(item => item.diurese)}
                </div>
              </div>
              <div style={{ display: window.innerWidth < 426 ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'BALANÇO ACUMULADO'}</div>
                <div className='textcard' style={{ margin: 0, padding: 0 }}>
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
              {riscos.slice(-3).map(item => (
                <div
                  key={'atb ' + item.id_risco}
                  className='textcard'
                  style={{ margin: 0, padding: 0 }}
                >
                  {item.risco}
                </div>
              ))}
            </div>
          </div>
          <div id='RESUMO INTERCONSULTAS' style={{ display: opcao == 'card-interconsultas' ? 'flex' : 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {interconsultas.map(item => (
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
        </div>
        <div style={{
          display: busy == 1 ? 'flex' : 'none',
          flexDirection: 'column', justifyContent: 'center',
          alignContent: 'center', alignItems: 'center',
          alignSelf: 'center',
        }}>
          {loading(busy)}
        </div>
      </div>
    )
  }

  return (
    <div
      className='main fadein'
      style={{
        display: pagina == 1 ? 'flex' : 'none',
        flexDirection: window.innerWidth > 425 ? 'row' : 'column',
        justifyContent: window.innerWidth > 425 ? 'space-evenly' : 'center',
        width: '100vw',
        height: altura,
      }}>
      <div id="lista de pacientes"
        style={{
          display: window.innerWidth < 426 && viewlista == 0 ? 'none' : 'flex',
          flexDirection: 'column', justifyContent: 'space-between',
          width: window.innerWidth < 426 ? 'calc(95vw - 15px)' : '27vw',
          height: window.innerHeight - 20,
          margin: 0,
        }}>
        <Usuario></Usuario>
        <ListaDeAtendimentos></ListaDeAtendimentos>
      </div>
      <div id="conteúdo cheio"
        className='scroll'
        style={{
          display: window.innerWidth < 426 && viewlista == 1 ? 'none' : atendimento == null ? 'none' : 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: window.innerWidth < 426 ? 'space-between' : 'flex-start',
          alignContent: 'flex-start', alignSelf: 'center', alignItems: 'center',
          height: window.innerHeight - 30,
          minHeight: window.innerHeight - 30,
          width: window.innerWidth < 426 ? 'calc(95vw - 15px)' : '70vw',
          margin: 0,
          position: 'relative',
          scrollBehavior: 'smooth',
        }}>
        <ViewPaciente></ViewPaciente>
        <div style={{ pointerEvents: 'none' }}>
          {cartao(null, 'DIAS DE INTERNAÇÃO: ' + atendimentos.filter(item => item.atendimento == atendimento).map(item => moment().diff(moment(item.data, 'DD/MM/YYYY'), 'days')), null, carddiasinternacao, 0)}
        </div>
        {cartao(alergias, 'ALERGIAS', 'card-alergias', cardalergias, busyalergias)}
        {cartao(null, 'ANAMNESE', 'card-anamnese', cardanamnese)}
        {cartao(null, 'EVOLUÇÕES', 'card-evolucoes', cardevolucoes)}
        {cartao(propostas.filter(item => item.status == 0), 'PROPOSTAS', 'card-propostas', cardpropostas, busypropostas)}
        {cartao(precaucoes, 'PRECAUÇÕES', 'card-precaucoes', cardprecaucoes)}
        {cartao(riscos, 'RISCOS', 'card-riscos', cardriscos, busyriscos)}
        {cartao(null, 'ALERTAS', 'card-alertas', cardalertas)}
        {cartao(null, 'SINAIS VITAIS', 'card-sinaisvitais', cardsinaisvitais, busysinaisvitais)}
        <div id='boneco' className="card-fechado"
          style={{
            display: card == '' && cardbody == 1 ? 'flex' : 'none',
            width: window.innerWidth > 425 && document.getElementById("conteúdo vazio") != null ? Math.ceil((document.getElementById("conteúdo vazio").offsetWidth / 4) - 43) :
              window.innerWidth < 426 && document.getElementById("conteúdo vazio") != null ? Math.ceil((document.getElementById("conteúdo cheio").offsetWidth / 2) - 48) : '',
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
        {cartao(null, 'VENTILAÇÃO MECÂNICA', 'card-vm', cardvm, busyvm)}
        {cartao(null, 'INFUSÕES', 'card-infusoes', cardinfusoes, busyinfusoes)}
        {cartao(null, 'DIETA', 'card-dietas', carddieta, busydieta)}
        {cartao(culturas.filter(item => item.data_resultado == null), 'CULTURAS', 'card-culturas', cardculturas, busyculturas)}
        {cartao(antibioticos.filter(item => moment().diff(item.prazo, 'days') > 0 && item.data_termino == null), 'ANTIBIÓTICOS', 'card-antibioticos', cardatb, busyatb)}
        {cartao(interconsultas, 'INTERCONSULTAS', 'card-interconsultas', cardinterconsultas, busyinterconsultas)}
        <div id='exames' className="card-fechado"
          style={{
            display: card == '' ? 'flex' : 'none',
            width: window.innerWidth > 425 && document.getElementById("conteúdo vazio") != null ? Math.ceil((document.getElementById("conteúdo vazio").offsetWidth / 4) - 43) :
              window.innerWidth < 426 && document.getElementById("conteúdo vazio") != null ? Math.ceil((document.getElementById("conteúdo cheio").offsetWidth / 2) - 48) : '',
          }}
          onClick={() => {
            if (card == '') {
              setcard('card-exames');
            } else {
              setcard('');
            }
          }}
        >
          <div className="text3">EXAMES RELEVANTES</div>
        </div>
        <div id='exames' className="card-fechado"
          style={{
            display: card == '' ? 'flex' : 'none',
            width: window.innerWidth > 425 && document.getElementById("conteúdo vazio") != null ? Math.ceil((document.getElementById("conteúdo vazio").offsetWidth / 4) - 43) :
              window.innerWidth < 426 && document.getElementById("conteúdo vazio") != null ? Math.ceil((document.getElementById("conteúdo cheio").offsetWidth / 2) - 48) : '',
          }}
          onClick={() => {
            setpagina(10);
            history.push('/prescricao');
          }}
        >
          <div className="text3">PRESCRIÇÃO</div>
        </div>
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
        <Alertas></Alertas>
        <Interconsultas></Interconsultas>
        <Exames></Exames>
        <Prescricao></Prescricao>
      </div>
      <div id="conteúdo vazio"
        className='scroll'
        style={{
          display: window.innerWidth < 426 && viewlista == 1 ? 'none' : atendimento != null ? 'none' : 'flex',
          flexDirection: 'column', justifyContent: 'center',
          height: window.innerHeight - 30,
          width: window.innerWidth < 426 ? 'calc(95vw - 15px)' : window.innerWidth > 425 && window.innerWidth < 769 ? 'calc(70vw - 20px)' : '70vw',
          margin: 0,
          scrollBehavior: 'smooth',
        }}>
        <BtnOptions></BtnOptions>
        <div className='text1' style={{ opacity: 0.5 }}>{'SELECIONE UM PACIENTE DA LISTA PRIMEIRO'}</div>
      </div>
      <BtnOptions></BtnOptions>
      <ViewClipboard></ViewClipboard>
    </div>
  );
}

export default Passometro;