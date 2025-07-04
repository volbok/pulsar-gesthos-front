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
import refresh from '../images/refresh.svg';
import preferencias from '../images/preferencias.svg';
import imprimir from '../images/imprimir.svg';
import clipimage from '../images/clipboard.svg';
import runner from '../images/corrida.svg';
import indicadores from '../images/indicadores.svg';
// funções.
import toast from '../functions/toast';
import sendObgesthos from '../functions/sendObgesthos';
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
// import Propostas from '../cards/Propostas';
import SinaisVitais from '../cards/SinaisVitais';
import Culturas from '../cards/Culturas';
import Antibioticos from '../cards/Antibioticos';
import VentilacaoMecanica from '../cards/VentilacaoMecanica';
import Dieta from '../cards/Dieta';
import Precaucoes from '../cards/Precaucoes';
import Riscos from '../cards/Riscos';
import Alertas from '../cards/Alertas';
import Interconsultas from '../cards/Interconsultas';
import Laboratorio from '../cards/Laboratorio';
import Prescricao from '../cards/Prescricao';
import Hd from '../cards/Hd';
import Imagem from '../cards/Imagem';
import BalancoHidrico from '../cards/BalancoHidrico';
import Coordenacao from '../cards/Coordenacao';
import PassometroTradicional from './PassometroTradicional';

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
    cardlaboratorio, setcardlaboratorio,
    cardimagem, setcardimagem,
    cardprescricao, setcardprescricao,
    cardbalanco,
    cardhd,
    card, setcard,

    // estado para alternância entre lista de pacientes e conteúdo do passômetro para versão mobile.
    viewlista, setviewlista,

    setpaciente, // id do paciente.
    atendimentos, setatendimentos, // lista de atendimentos.
    pacientes, setpacientes, // lista de pacientes.
    assistenciais,
    setassistenciais,

    setanamneseraiz,
    setanamneseeditada,

    setexame,

    setatendimento, atendimento,
    setprontuario,

    pas, setpas,
    pad, setpad,
    fc, setfc,
    setfr,
    setsao2,
    tax, settax,
    diurese, setdiurese,
    balancohidrico,
    balancoacumulado, setbalancoacumulado,
    setglicemia,
    setestase,
    setevacuacao,

    // estados utilizados pela função getAllData (necessária para alimentar os card fechados).
    alergias, setalergias,
    setinvasoes,
    setlesoes,
    setprecaucoes, precaucoes,
    setriscos, riscos,
    setculturas, culturas,
    setarrayculturas,
    setdietas, dietas,
    setinfusoes, infusoes,
    setpropostas, propostas,
    setarraypropostas,
    setsinaisvitais, sinaisvitais,
    setvm, vm,
    setinterconsultas, interconsultas,

    setatbgesthos, atbgesthos,
    obgesthos, setobgesthos,

    setprintatendimentos,
    setprintassistenciais,

    hd, sethd,

    arrayleitos, setarrayleitos,

    viewtradicional, setviewtradicional,
  } = useContext(Context);

  // estado que ativa a visualização do componente "corrida de leito".
  // const [corrida, setcorrida] = useState(0);
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
    setcard('');
  }
  window.addEventListener('load', refreshApp);

  // recuperando registros de atendimentos no banco de dados.
  const loadPacientes = () => {
    axios.get(html + 'list_pacientes').then((response) => {
      // console.log(response.data.rows);
      setpacientes(response.data.rows);
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

  // carregar lista de atendimentos ativos para a unidade selecionada.
  const [arrayatendimentos, setarrayatendimentos] = useState([]);
  const loadAtendimentos = () => {
    /*
    // Mecanismo para resgatar o token da localStorage e lançá-lo no header da requisição protegida.
    var token = localStorage.getItem("token");
    console.log(token);
    axios.defaults.headers.common["Authorization"] = token;
    */
    axios.get(html + 'lista_atendimentos').then((response) => {
      console.log(response.data.rows);
      setatendimentos(response.data.rows);
      setarrayatendimentos(response.data.rows);
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

  /* 
  função que recupera propostas registradas na tabela gesthos_assistenciais, gravando-as na
  tabela atendimento_propostas.
  IMPORTANTE PARA RECUPERAR PROPOSTAS LANÇADAS NO GESTHOS.
  
  const pushPropostas = (dados) => {
    dados.filter(item => item.item == '0601 - PROPOSTAS').map(item => {
      var obj = {
        id_atendimento: atendimento,
        proposta: item.valor,
        status: 0,
        data_proposta: moment(item.data, 'DD/MM/YYYY'),
        id_usuario: null,
        prazo: 1,
        data_conclusao: null
      }
      axios.post(html + 'insert_proposta', obj);
      return null;
    });
  }
  */

  // carregar registros de dados assistenciais.
  const loadRegistrosAssistenciais = (atendimento) => {
    axios.get(html + 'lista_assistencial/' + atendimento).then((response) => {
      // console.log(response.data.rows);
      var x = [];
      x = response.data.rows;
      setassistenciais(x);
      console.log(x.length);
      setanamneseraiz(x.filter(item => item.editado != 'SIM'));
      setanamneseeditada(x.filter(item => item.editado == 'SIM'));
      // carregando dados assistenciais para os cards da tela principal e para o context (uso nos cards).
      // getBh12h();
      getSinaisVitais(x);
      getPrecaucoesAlergiasRiscos(x);
      getCulturasExames(x);
      getAntibioticosGesthos(atendimento);
      setpropostas(x.filter(item => item.item == '0509 - PROPOSTAS'));
      console.log('PROPOSTAS:' + x.filter(item => item.item == '0509 - PROPOSTAS').map(item => item.valor));
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

  /* ## ESTRUTURA DO JSON PARA REGISTROS ASSISTENCIAIS ##
  {
      "precaucao": {
        "data": "15/02/2017",
        "hora": "00:03:06",
        "prontuario": "262456",
        "atendimento": "590173",
        "grupo": "02 - ALERGIAS, PRECAUCOES E RISCOS",
        "item": "0202 - PRECAUCOES",
        "valor": "CONTATO"
      }
    }
  */

  // carregando dados vitais para exibição no card sinais vitais.

  /*
  const getBh12h = () => {
    axios.get(html + 'list_sinais_vitais/' + parseInt(atendimento)).then((response) => {

      var x = response.data.rows;
      var y = x.map(item => item.balanco);
      var soma = 0;
      y.map(item => {
        soma = parseInt(soma) + parseInt(item);
        console.log(soma);
        return soma;
      })
      setbalancoacumulado(soma)
    })
  }
  */

  const getSinaisVitais = (dados) => {
    setsinaisvitais(dados.filter(valor => valor.data == moment().format('DD/MM/YYYY')));
    setpas(dados.filter(valor => valor.item == "0101 - PAS"));
    setpad(dados.filter(valor => valor.item == "0102 - PAD"));
    setfc(dados.filter(valor => valor.item == "0103 - FC"));
    setfr(dados.filter(valor => valor.item == "0104 - FR"));
    settax(dados.filter(valor => valor.item == "0106 - TAX"));
    setsao2(dados.filter(valor => valor.item == "0105 - SAO2"));
    setdiurese(dados.filter(valor => valor.item == "0108 - DIURESE"));
    // setbalancohidrico(dados.filter(valor => valor.atendimento && valor.item == "0108 - BH"));
    // pendentes.
    setglicemia(dados.filter(valor => valor.item == "0107 - GLICEMIA"));
    setevacuacao(dados.filter(valor => valor.item == "0110 - EVACUACAO")); // texto
    setestase(dados.filter(valor => valor.item == "0111 - ESTASE")); // texto
  }

  // carregando as precauções, alergias e riscos assistenciais.
  const getPrecaucoesAlergiasRiscos = (dados) => {
    setalergias(dados.filter(valor => parseInt(valor.atendimento) == atendimento && valor.item == "0201 - ALERGIAS"));
    setprecaucoes(dados.filter(valor => parseInt(valor.atendimento) == atendimento && valor.item == "0202 - PRECAUCOES"));
    setriscos(dados.filter(valor => parseInt(valor.atendimento) == atendimento && valor.item == "0203 - RISCOS"));
  }

  // carregando antibióticos, culturas e exames.
  const getCulturasExames = (dados) => {
    // setculturas(dados.filter(valor => parseInt(valor.atendimento) == atendimento && valor.item == "0805 - CULTURAS MATERIAL"));
    // criar mecanismo de exclusão de demais tipos de itens do grupo para facilitar a identificação dos exames.
    setexame(dados.filter(valor => valor.item.substring(0, 2) == '08'));
    // console.log('EXAMES: ' + JSON.stringify(dados.filter(valor => parseInt(valor.atendimento) == atendimento && valor.item.substring(0, 2) == '08')))
  }

  // carregando os antibióticos prescritos no gesthos.
  /*
  const arrayantibioticos = [
    'MEROPENEM', 'TEICO', 'POLIMIXINA',
    'TAZOB',
    'AMOXICILINA', 'AZITROMICINA', 'AMPICILINA',
    'CEFALEXINA', 'CEFTRIAXON',
    'OXACILINA',
    'SULFAME', 'CIPRO', 'CEFUROX', 'PENICILINA',
    'LINESO', 'METRONIDAZO', 'GENTAMICINA', 'CLINDAMI'
  ]

  const temporaryantibioticos = [];
  const antibioticos = (item) => {
    arrayantibioticos.map(valor => {
      if (item.item.includes(valor) == true) {
        temporaryantibioticos.push(item);
      }
      return null;
    });
  }
  */

  let uniqueatb = [];
  const getAntibioticosGesthos = (atendimento) => {
    uniqueatb = [];
    axios.get(html + 'list_prescricoes/' + atendimento).then((response) => {
      var x = [0, 1];
      x = response.data.rows;
      x.filter(item => item.atb == 'S').sort(((a, b) => moment(a.data + ' - ' + a.hora, 'DD/MM/YYYY - HH:mm:ss').hours > moment(b.data + ' - ' + b.hora, 'DD/MM/YYYY - HH:mm:ss').hours ? 1 : -1)).filter(item => {
        if (uniqueatb.filter(valor => valor.item == item.item && valor.data == item.data && valor.hora == item.hora).length == 0) {
          uniqueatb.push(item);
        }
        return null;
      });
      console.log(uniqueatb);
      setatbgesthos(uniqueatb);
    });
  }
  /*
  prontuário: 347262
  at: 1559564
  
  */

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
      setarrayleitos(['21', '22', '23', '24', '25', '26', '27', '28', '29', '30']);
      refreshPassometro();
      refreshSettings();
      // eslint-disable-next-line
      myarrayassistenciais = [];
      // eslint-disable-next-line
      myarrayatendimentos = [];
    }
    // eslint-disable-next-line
  }, [pagina, settings]);

  useEffect(() => {
    if (pagina == 1) {
      // loadRegistrosAssistenciais();
    }
    // eslint-disable-next-line
  }, [pagina, atendimento]);

  // atualizando lista de atendimentos e de pacientes.
  const refreshPassometro = () => {
    setvm([]);
    setpaciente(null);
    setatendimento(null);
    setprontuario(null);
    loadPacientes();
    loadAtendimentos();
    loadAllInterconsultas();
    refreshSettings();
  }

  // atualizando opções de visualização dos cards.
  const refreshSettings = () => {
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
    setcardlaboratorio(settings.map(item => item.card_laboratorio).pop());
    setcardimagem(settings.map(item => item.card_imagem).pop());
    setcardprescricao(settings.map(item => item.card_prescricao).pop());
  }

  // função que encaminha a array de objetos criados no Pulsar para o gestHos (via endpoint echopulsar).
  const mandaEvolucao = () => {
    sendObgesthos(obgesthos, setobgesthos);
    setTimeout(() => {
      toast(settoast, 'REGISTROS ENVIADOS PARA O GESTHOS', 'rgb(82, 190, 128, 1)', 3000)
      setobgesthos([]);
    }, 1000);
  }

  // botão de configurações / settings.
  function BtnOptions() {
    return (
      <div style={{
        position: 'absolute',
        top: window.innerWidth < 426 ? '' : 10,
        bottom: window.innerWidth < 426 ? 5 : '',
        right: window.innerWidth < 426 ? 5 : 25,
        width: window.innerWidth < 426 ? '' : '',
        display: 'none',
        flexDirection: 'row', justifyContent: 'center',
        zIndex: 10
      }}>
        <div id="botão indicadores"
          className={'button'}
          style={{
            display: 'none',
            minWidth: 25, maxWidth: 25, minHeight: 25, maxHeight: 25,
            marginLeft: 0, marginRight: 0,
          }}
          title={'INDICADORES'}
          onClick={() => { setpagina(12); history.push('/indicadores'); }}
        >
          <img
            alt=""
            src={indicadores}
            style={{
              margin: 0,
              height: 20,
              width: 20,
            }}
          ></img>
        </div>
        <div id="preferencias"
          className='button cor1hover'
          style={{
            display: window.innerWidth < 426 ? 'none' : 'flex',
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
        <div id="botão clipboard"
          className='button cor1hover'
          style={{
            position: 'relative',
            display: 'none',
            minWidth: 25, maxWidth: 25, minHeight: 25, maxHeight: 25,
            marginLeft: 0,
            opacity: 1,
          }}
          title={'COPIAR PARA A CLIPBOARD'}
          onClick={() => {
            mandaEvolucao();
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
          >
          </img>
          <div id='botão obgesthos'
            className='button-red'
            onClick={() => {
              mandaEvolucao();
            }}
            style={{
              position: 'absolute',
              display: obgesthos.length > 0 ? 'flex' : 'none',
              bottom: -10,
              right: -10,
              borderRadius: 50,
              height: 15, minHeight: 15,
              width: 15, minWidth: 15,
              backgroundColor: 'rgb(231, 76, 60, 1)'
            }}
          >
            {obgesthos.length}
          </div>
        </div>
        <div id="botão imprimir"
          className='button cor1hover'
          style={{
            display: 'none',
            minWidth: 25, maxWidth: 25, minHeight: 25, maxHeight: 25,
            marginLeft: 0
          }}
          title={'IMPRIMIR'}
          onClick={() => {
            setprintview(1);
          }}
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
        <div id="botão corrida"
          className={viewtradicional == 0 ? 'button' : 'button-red'}
          style={{
            display: 'none',
            minWidth: 25, maxWidth: 25, minHeight: 25, maxHeight: 25,
            marginLeft: 0
          }}
          title={'CORRIDA'}
          onClick={viewtradicional == 1 ? () => { setviewtradicional(0) } : () => { setviewtradicional(1) }}
        >
          <img
            alt=""
            src={runner}
            style={{
              margin: 0,
              height: 30,
              width: 30,
            }}
          ></img>
        </div>
      </div>
    )
  }

  const [printview, setprintview] = useState(0);
  function SelectCti() {
    return (
      <div
        style={{ display: printview == 1 ? 'flex' : 'none' }}
        className='fundo'
      >
        <div className='janela' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className='text1'>SELECIONE UM GRUPO DE LEITOS PARA IMPRESSÃO</div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div id='seletor leitos 21 ao 30'
              className='button' style={{ width: 150, padding: 5 }}
              onClick={() => {
                setpaciente(null);
                setatendimento(null);
                setprontuario(null);
                toast(settoast, 'PREPARANDO A VERSÃO PARA IMPRESSÃO...', 'rgb(82, 190, 128, 1)', 5000);
                let arrayleitos = ['21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
                // eslint-disable-next-line
                arrayleitos.map(leito => {
                  pegaAtendimentos(leito);
                });
                setTimeout(() => {
                  // pegaPropostas();
                  pegaInvasoes();
                  pegaAssistenciais();
                }, 1000);
              }}
            >
              1 AO 10
            </div>
            <div id='seletor leitos 21 ao 30'
              className='button' style={{ width: 150, padding: 5 }}
              onClick={() => {
                setpaciente(null);
                setatendimento(null);
                setprontuario(null);
                toast(settoast, 'PREPARANDO A VERSÃO PARA IMPRESSÃO...', 'rgb(82, 190, 128, 1)', 5000);
                let arrayleitos = ['21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
                // eslint-disable-next-line
                arrayleitos.map(leito => {
                  pegaAtendimentos(leito);
                });
                setTimeout(() => {
                  // pegaPropostas();
                  pegaInvasoes();
                  pegaAssistenciais();
                }, 1000);
              }}
            >
              11 AO 20
            </div>
          </div>

        </div>
      </div>
    )
  }

  // preparação de dados para impressão.
  var myarrayatendimentos = [];
  var myarrayassistenciais = [];
  const pegaAtendimentos = (leito) => {
    atendimentos.filter(item => item.leito == leito).sort((a, b) => moment(a.data) > moment(b.data) ? 1 : -1).slice(-1).map(item => myarrayatendimentos.push(item));
    setprintatendimentos(myarrayatendimentos);
    console.log(myarrayatendimentos);
  }
  const pegaAssistenciais = () => {
    myarrayatendimentos.map(item => createDados(item.atendimento));
    setTimeout(() => {
      setprintassistenciais(myarrayassistenciais);
      pegaVm();
      setpagina(6); history.push('/print');
    }, 6000);
  }
  function createDados(atendimento) {
    var x = [0, 1];
    axios.get(html + 'lista_assistencial/' + atendimento)
      .then((response) => {
        x = response.data.rows;
        myarrayassistenciais.push(x);
      });
  }

  var myarrayinvasoes = [];
  const pegaInvasoes = () => {
    myarrayatendimentos.map(item => createInvasoes(item.atendimento));
    setTimeout(() => {
      setinvasoes(myarrayinvasoes);
    }, 5000);
  }
  const createInvasoes = (atendimento) => {
    axios.get(html + 'list_invasoes/' + parseInt(atendimento)).then((response) => {
      myarrayinvasoes.push(response.data.rows);
    });
  }

  var myarrayvm = [];
  const pegaVm = () => {
    myarrayatendimentos.map(item => createVm(item.atendimento));
    setTimeout(() => {
      setvm(myarrayvm);
    }, 5000);
  }
  const createVm = (atendimento) => {
    axios.get(html + 'list_vm/' + parseInt(atendimento)).then((response) => {
      myarrayvm.push(response.data.rows);
    });
  }

  // identificação do usuário.
  function Usuario() {
    return (
      <div
        className='cor2 bordas2'
        style={{
          display: 'flex', flexDirection: 'row',
          marginBottom: 10,
          position: 'sticky',
          top: window.innerWidth < 426 ? 15 : '',
          zIndex: 10,
          borderRadius: 5,
        }}>
        <div className='button-red'
          style={{ margin: 0, marginRight: 5 }}
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
          style={{ margin: 0, marginLeft: 5 }}
          title={'ATUALIZAR LISTA DE PACIENTES'}
          onClick={() => {
            refreshPassometro();
            refreshSettings();
          }}>
          <img
            alt=""
            src={refresh}
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
        className="input cor0"
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

  const filtraAtendimentos = (leito) => {
    // console.log(JSON.stringify(arrayatendimentos.filter(item => item.leito == leito).sort((a, b) => moment(a.data) > moment(b.data) ? 1 : -1)));
    return (
      <div>
        {arrayatendimentos.filter(item => item.leito == leito).sort((a, b) => moment(a.data) > moment(b.data) ? 1 : -1).slice(-1).map(item => (
          <div key={'pacientes' + item.atendimento} style={{ display: item.situacao == 'internacao' ? 'flex' : 'none' }}>
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
                    {parseInt(item.leito)}
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
                  // width: window.innerWidth < 426 ? '70vw' : ''
                }}
                onClick={() => {
                  setviewlista(0);
                  console.log(pacientes);
                  setpaciente(pacientes.filter(valor => valor.prontuario == item.prontuario).map(valor => valor.id));
                  console.log(pacientes.filter(valor => valor.prontuario == item.prontuario).map(valor => valor.id));
                  setatendimento(parseInt(item.atendimento));
                  loadRegistrosAssistenciais(item.atendimento);
                  setprontuario(parseInt(item.prontuario));
                  getAllData(item.prontuario, item.atendimento);
                  console.log('ATENDIMENTO: ' + item.atendimento);
                  console.log('PRONTUÁRIO: ' + item.prontuario);
                  if (pagina == 1) {
                    setTimeout(() => {
                      var botoes = document.getElementById("scroll atendimentos").getElementsByClassName("button-red");
                      for (var i = 0; i < botoes.length; i++) {
                        botoes.item(i).className = "button";
                      }
                      document.getElementById("atendimento " + item.atendimento).className = "button-red";
                    }, 500);
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
    )
  }

  const ListaDeAtendimentos = useCallback(() => {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        width: 'calc(100% - 15px)',
        alignSelf: 'center',
      }}>
        <div className="text3" style={{ margin: 0, marginTop: 2.5 }}>
          {'LISTA DE PACIENTES'}
        </div>
        <div
          className={window.innerWidth < 426 ? "" : "scroll"}
          id="scroll atendimentos"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: window.innerWidth < 426 ? '' : window.innerHeight - 140,
            width: window.innerWidth < 426 ? '' : '100%',
          }}>
          {arrayleitos.map(item => (
            filtraAtendimentos(item)
          ))}
          <div className='button'
            style={{
              display: window.innerWidth < 426 ? 'none' : 'flex',
              alignSelf: 'flex-end',
              margin: 0, marginRight: 10,
              width: 50, minWidth: 50, maxWidth: 50,
            }}
            title={'ATENDIMENTOS ENCERRADOS'}
            onClick={() => { history.push('/historico'); setpagina(10) }}>
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
          zIndex: 30,
          minWidth: 'calc(90vw - 10px)',
          width: 'calc(90vw - 10px)',
        }}>
        <div id="botão de retorno"
          className="button-red"
          style={{
            display: window.innerWidth < 426 ? 'flex' : 'none',
            opacity: 1,
            alignSelf: 'center',
          }}
          onClick={card == '' ? () => setviewlista(1) : () => setcard('')}>
          <img
            alt=""
            src={back}
            style={{ width: 30, height: 30 }}
          ></img>
        </div>
        {arrayatendimentos.filter(valor => valor.atendimento == atendimento).slice(-1).map(item => (
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
                  item.paciente.substring(0, 20) + '...'
                  :
                  item.paciente
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // carregando todas as informações do atendimento.
  const getAllData = (paciente, atendimento) => {
    // Dados relacionados ao paciente.
    // alergias.
    // setbusyalergias(1);
    /*
    axios.get(html + 'paciente_alergias/' + parseInt(paciente)).then((response) => {
      setalergias(response.data.rows);
      console.log(alergias.length);
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
    */
    // riscos.
    if (cardriscos == 1) {
      setbusyriscos(1);
      axios.get(html + 'paciente_riscos/' + parseInt(paciente)).then((response) => {
        setriscos(response.data.rows);
        setbusyriscos(0);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
    // culturas.
    if (cardculturas == 1) {
      axios.get(html + 'list_culturas/' + parseInt(atendimento)).then((response) => {
        setculturas(response.data.rows);
        setarrayculturas(response.data.rows);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
    // lesões.
    if (cardbody == 1) {
      axios.get(html + 'paciente_lesoes/' + parseInt(paciente)).then((response) => {
        setlesoes(response.data.rows);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
    // Dados relacionados ao atendimento.
    // dietas.
    if (carddieta == 1) {
      setbusydieta(1);
      axios.get(html + 'list_dietas/' + parseInt(atendimento)).then((response) => {
        setdietas(response.data.rows);
        setbusydieta(0);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
    // evoluções.
    /*
    if (cardevolucoes == 1) {
      axios.get(html + 'list_evolucoes/' + parseInt(atendimento)).then((response) => {
        setarrayevolucoes(assistenciais.filter(item => item.item == '0507 - EVOLUCAO CLINICA').sort((a, b) => moment(a.data, 'DD/MM/YYYY') < moment(b.data, 'DD/MM/YYYY') ? 1 : -1));
      })
        .catch(function (error) {
          console.log(error);
        })
    }
    */
    // infusões.
    if (cardinfusoes == 1) {
      setbusyinfusoes(1);
      axios.get(html + 'list_infusoes/' + parseInt(atendimento)).then((response) => {
        setinfusoes(response.data.rows);
        setbusyinfusoes(0);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
    // invasões.
    if (cardbody == 1) {
      axios.get(html + 'list_invasoes/' + parseInt(atendimento)).then((response) => {
        setinvasoes(response.data.rows);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
    // propostas.
    if (cardpropostas == 1) {
      setbusypropostas(1);
      axios.get(html + 'list_propostas/' + parseInt(atendimento)).then((response) => {
        // setpropostas(response.data.rows);
        setarraypropostas(response.data.rows);
        setbusypropostas(0);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
    // sinais vitais (apenas balanço hídrico).
    if (cardsinaisvitais == 1) {
      setbusysinaisvitais(0);
      let arraybalancos = [];
      balancohidrico.filter(item => parseInt(item.atendimento) == parseInt(atendimento)).map(item => {
        arraybalancos.push(parseInt(item.valor));
        return null;
      });
      function soma(total, num) {
        return total + num;
      }
      setbalancoacumulado(arraybalancos.reduce(soma, 0));
    }
    // vm.
    if (cardvm == 1) {
      setbusyvm(1);
      axios.get(html + 'list_vm/' + parseInt(atendimento)).then((response) => {
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
      axios.get(html + 'list_interconsultas/' + parseInt(atendimento)).then((response) => {
        setinterconsultas(response.data.rows);
        setbusyinterconsultas(0);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
    // hd.
    if (cardhd == 1) {
      axios.get(html + 'list_hd/' + atendimento).then((response) => {
        sethd(response.data.rows);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
  }

  /*
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
  */

  // função busy.
  const [busyriscos, setbusyriscos] = useState(0);
  const [busypropostas, setbusypropostas] = useState(0);
  const [busysinaisvitais, setbusysinaisvitais] = useState(0);
  const [busyvm, setbusyvm] = useState(0);
  const [busyinfusoes, setbusyinfusoes] = useState(0);
  const [busydieta, setbusydieta] = useState(0);
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
          height: window.innerWidth > 425 ? '15vw' : '35vw',
          width: window.innerWidth > 425 ? '15vw' : '35vw',
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
                display: assistenciais.filter(item => item.item == '0202 - PRECAUCOES' && moment().diff(moment(item.data, 'DD/MM/YYYY'), 'days' < 15) && item.valor.toUpperCase().includes('PADR') == true).length > 0 ? 'flex' : 'none',
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
                display: assistenciais.filter(item => item.item == '0202 - PRECAUCOES' && moment().diff(moment(item.data, 'DD/MM/YYYY'), 'days' < 15) && item.valor.toUpperCase().includes('CONTATO') == true).length > 0 ? 'flex' : 'none',
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
                display: assistenciais.filter(item => item.item == '0202 - PRECAUCOES' && moment().diff(moment(item.data, 'DD/MM/YYYY'), 'days' < 15) && (item.valor.toUpperCase().includes('GOT') == true || item.valor.toUpperCase().includes('AEROSS')) == true).length > 0 ? 'flex' : 'none',
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
              {dietas.slice(-1).map(item => item.tipo)}
            </div>
            <div className='textcard'
              style={{
                display: dietas.filter(item => item.tipo != 'ORAL' && item.tipo != 'SUSPENSA' && item.tipo != 'NÃO DEFINIDA').length > 0 ? 'flex' : 'none',
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
            <div style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              {atbgesthos.slice(-3).map(item => (
                <div
                  key={'atb resumo ' + item.id_antibiotico}
                  className='textcard'
                  style={{
                    margin: 0, padding: 0,
                  }}
                >
                  {window.innerWidth < 426 ? item.item.toUpperCase().substring(0, 10) + '...' : item.item.toUpperCase().substring(0, 25) + '...'}
                </div>
              ))}
              <div className='textcard' style={{ display: atbgesthos.length > 3 ? 'flex' : 'none', alignSelf: 'center', textAlign: 'center' }}>...</div>
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
              style={{ display: 'none', margin: 0, padding: 0 }}>
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
              <div style={{ display: sinaisvitais.filter(valor => valor.item == '0106 - TAX').length > 0 ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'center', margin: 2.5 }}>
                <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'TAX'}</div>
                <div className='textcard' style={{ margin: 0, padding: 0 }}>
                  {tax.filter(valor => valor.data == moment().format('DD/MM/YYYY')).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss') ? -1 : 1).slice(-1).map(item => item.valor.toUpperCase())}
                </div>
              </div>
              <div style={{ display: window.innerWidth < 426 || sinaisvitais.filter(valor => valor.item == '0108 - DIURESE').length < 1 ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'center', margin: 2.5 }}>
                <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'DIURESE'}</div>
                <div className='textcard' style={{ margin: 0, padding: 0 }}>
                  {parseInt(diurese.filter(valor => valor.data == moment().format('DD/MM/YYYY')).sort((a, b) => moment(a.hora, 'HH:mm:ss') < moment(b.hora, 'HH:mm:ss') ? -1 : 1).slice(-1).map(item => item.valor.toUpperCase()))}
                </div>
              </div>
              <div style={{ display: window.innerWidth < 426 ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'center', margin: 2.5 }}>
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
          <div
            id='RESUMO HD'
            style={{
              display: opcao == 'card-hd' && hd.length > 0 ? 'flex' : 'none',
              flexDirection: 'column', justifyContent: 'center',
            }}>
            {hd.sort((a, b) => moment(a) < moment(b) ? 1 : -1).slice(-2).map(item => (
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
            <div className='textcard' style={{ marginTop: 0 }}>...</div>
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
        justifyContent: window.innerWidth > 425 ? 'space-evenly' : 'flex-start',
        width: '100vw',
        height: window.innerWidth < 426 ? '' : altura,
      }}>
      <div id="lista de pacientes desktop"
        style={{
          display: window.innerWidth < 426 && viewlista == 0 ? 'none' : 'flex',
          flexDirection: 'column',
          justifyContent: window.innerWidth < 426 ? 'flex-start' : 'space-between',
          width: window.innerWidth < 426 ? 'calc(95vw - 15px)' : '27vw',
          height: window.innerHeight - 20,
          margin: 0,
        }}>
        <Usuario></Usuario>
        <ListaDeAtendimentos></ListaDeAtendimentos>
      </div>
      <div id="conteúdo cheio"
        className={window.innerWidth < 426 ? '' : 'scroll'}
        style={{
          display: viewlista == 0 && viewtradicional == 0 && atendimento != null ? 'flex' : 'none',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: window.innerWidth < 426 ? 'center' : 'flex-start',
          alignContent: 'flex-start', alignSelf: 'flex-start', alignItems: 'flex-start',
          height: window.innerWidth < 426 ? '' : window.innerHeight - 30,
          minHeight: window.innerWidth < 426 ? '' : window.innerHeight - 30,
          width: window.innerWidth < 426 ? '95vw' : '70vw',
          margin: 0,
          position: 'relative',
          scrollBehavior: 'smooth',
        }}>
        <ViewPaciente></ViewPaciente>
        <SelectCti></SelectCti>
        <div style={{ pointerEvents: 'none' }}>
          {cartao(null, 'DIAS DE INTERNAÇÃO: ' + atendimentos.filter(item => item.atendimento == atendimento).sort((a, b) => moment(a.data) > moment(b.data) ? 1 : -1).slice(-1).map(item => moment().diff(item.data, 'days')), null, carddiasinternacao, 0)}
        </div>
        {cartao(alergias, 'ALERGIAS', 'card-alergias', cardalergias)}
        {cartao(precaucoes, 'PRECAUÇÕES', 'card-precaucoes', cardprecaucoes)}
        {cartao(riscos, 'RISCOS', 'card-riscos', cardriscos, busyriscos)}

        {cartao(null, 'ALERTAS', 'card-alertas', cardalertas)}

        {cartao(null, 'ANAMNESE', 'card-anamnese', cardanamnese)}
        {cartao(null, 'EVOLUÇÕES', 'card-evolucoes', cardevolucoes)}
        {cartao(propostas.filter(item => item.status == 0), 'COORDENAÇÃO', 'card-propostas', cardpropostas, busypropostas)}

        {cartao(null, 'SINAIS VITAIS', 'card-sinaisvitais', cardsinaisvitais, busysinaisvitais)}
        {cartao(null, 'EXAMES LABORATORIAIS', 'card-laboratorio', cardlaboratorio)}
        {cartao(null, 'EXAMES DE IMAGEM / COMPLEMENTARES', 'card-imagem', cardimagem)}
        <div id='boneco' className="card-fechado"
          style={{
            display: card == '' && cardbody == 1 ? 'flex' : 'none',
            height: window.innerWidth > 425 ? '15vw' : '35vw',
            width: window.innerWidth > 425 ? '15vw' : '35vw',
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
        {cartao(culturas.filter(item => item.data_resultado == null), 'CULTURAS', 'card-culturas', cardculturas)}
        {cartao(atbgesthos, 'ANTIBIÓTICOS', 'card-antibioticos', cardatb)}
        {cartao(interconsultas.filter(item => item.status != 'ENCERRADA'), 'INTERCONSULTAS', 'card-interconsultas', cardinterconsultas, busyinterconsultas)}
        {cartao(null, 'PRESCRIÇÃO', 'card-prescricao', cardprescricao, null)}
        {cartao(hd, 'HEMODIÁLISE', 'card-hd', cardhd, null)}
        {cartao(null, 'BALANCO HÍDRICO', 'card-balanco_hidrico', cardbalanco, null)}

        <BalancoHidrico></BalancoHidrico>
        <Alergias></Alergias>
        <Anamnese></Anamnese>
        <Boneco></Boneco>
        <Evolucoes></Evolucoes>
        <Coordenacao></Coordenacao>
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
        <Laboratorio></Laboratorio>
        <Imagem></Imagem>
        <Prescricao></Prescricao>
        <Hd></Hd>
      </div>

      <div id="corrida"
        className={window.innerWidth < 426 ? '' : 'scroll'}
        style={{
          display: viewlista == 0 && viewtradicional == 1 && atendimento != null ? 'flex' : 'none',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: window.innerWidth < 426 ? 'center' : 'flex-start',
          alignContent: 'flex-start', alignSelf: 'center', alignItems: 'center',
          height: window.innerWidth < 426 ? '' : window.innerHeight - 30,
          minHeight: window.innerWidth < 426 ? '' : window.innerHeight - 30,
          width: window.innerWidth < 426 ? '95vw' : '70vw',
          margin: 0,
          position: 'relative',
          scrollBehavior: 'smooth',
        }}>
        <PassometroTradicional></PassometroTradicional>
      </div>

      <div id="conteúdo vazio"
        className={window.innerWidth < 426 ? '' : 'scroll'}
        style={{
          display: window.innerWidth < 426 && viewlista == 1 ? 'none' : atendimento != null ? 'none' : 'flex',
          flexDirection: 'column', justifyContent: 'center',
          height: window.innerHeight - 30,
          width: window.innerWidth < 426 ? 'calc(95vw - 15px)' : window.innerWidth > 425 && window.innerWidth < 769 ? 'calc(70vw - 20px)' : '70vw',
          margin: 0,
          scrollBehavior: 'smooth',
        }}>
        <div className='text1' style={{ opacity: 0.5 }}>{'SELECIONE UM PACIENTE DA LISTA PRIMEIRO'}</div>
      </div>
      <BtnOptions></BtnOptions>
    </div>
  );
}

export default Passometro;