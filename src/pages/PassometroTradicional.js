/* eslint eqeqeq: "off" */
import React, { useContext, useEffect, useState } from 'react';
import Context from './Context';
import moment from 'moment';
import axios from 'axios';
// imagens.
import back from '../images/back.svg';
import body from '../images/body.svg';
import salvar from '../images/salvar.svg';
import novo from '../images/novo.svg';
import deletar from '../images/deletar.svg';
// funções.
import toast from '../functions/toast';
import Gravador from '../components/Gravador';
import checkinput from '../functions/checkinput';
// janelas.
import Boneco from '../cards/Boneco';

function PassometroTradicional() {

  // variáveis de ambiente:
  // var html_pulsar_atendimentos = process.env.PULSAR_ATENDIMENTOS;

  // context.
  const {
    html,
    settoast,
    pagina,
    card, setcard,

    atendimentos, // lista de atendimentos.
    assistenciais,
    atendimento,
    usuario,

    vm, setvm,
    atbgesthos,
    arrayculturas, setarrayculturas,
  } = useContext(Context);

  useEffect(() => {
    loadEvolucoesDoPassometro();
    loadInvasoes();
    setpropostas(assistenciais.filter(item => item.item == '0509 - PROPOSTAS').sort((a, b) => moment(a.data, 'DD/MM/YYYY') < moment(b.data, 'DD/MM/YYYY') ? 1 : -1));
    // eslint-disable-next-line
  }, [pagina, atendimento]);

  // função para permitir apenas a inserção de números no input (obedecendo a valores de referência).
  var timeout = null;
  const checkNumberInput = (input, min, max) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      var valor = document.getElementById(input).value;
      if (isNaN(valor) == true || valor < min || valor > max) {
        document.getElementById(input).value = '';
        document.getElementById(input).focus();
      }
    }, 1000);
  }

  // EVOLUÇÕES DO PASSÔMETRO.
  const [evolucaopassometro, setevolucaopassometro] = useState([]);
  const loadEvolucoesDoPassometro = () => {
    axios.get(html + 'list_evolucoes/' + parseInt(atendimento)).then((response) => {
      setevolucaopassometro(response.data.rows);
    });
  }
  const [selectedevolucao, setselectedevolucao] = useState({});
  const selectEvolucao = (item) => {
    setselectedevolucao(item);
    setTimeout(() => {
      setviewinsertupdateevolucao(2); // editar evolução.  
    }, 500);
  }
  const insertUpdateEvolucao = (valor) => {
    if (viewinsertupdateevolucao == 1) {
      var obj = {
        id_atendimento: atendimento,
        evolucao: valor,
        data_evolucao: moment(),
        id_usuario: usuario.id
      }
      console.log(obj);
      axios.post(html + 'insert_evolucao', obj).then(() => {
        toast(settoast, 'EVOLUÇÃO REGISTRADA COM SUCESSO', 'rgb(82, 190, 128, 1)', 2000);
        loadEvolucoesDoPassometro();
        setviewinsertupdateevolucao(0);
      });
    } else {
      obj = {
        id_atendimento: selectedevolucao.id_atendimento,
        evolucao: valor,
        data_evolucao: selectedevolucao.data_evolucao,
        id_usuario: usuario.id
      }
      axios.post(html + 'update_evolucao/' + selectedevolucao.id_evolucao, obj).then(() => {
        toast(settoast, 'EVOLUÇÃO ATUALIZADA COM SUCESSO', 'rgb(82, 190, 128, 1)', 2000);
        loadEvolucoesDoPassometro();
        setviewinsertupdateevolucao(0);
      })
    }
  }
  const insertVoiceEvolucao = (valor) => {
    var obj = {
      id_atendimento: atendimento,
      evolucao: valor.pop(),
      data_evolucao: moment(),
      id_usuario: usuario.id
    }
    console.log(obj);
    axios.post(html + 'insert_evolucao', obj).then(() => {
      toast(settoast, 'EVOLUÇÃO REGISTRADA COM SUCESSO', 'rgb(82, 190, 128, 1)', 2000);
      loadEvolucoesDoPassometro();
      setviewinsertupdateevolucao(0);
    });
  }
  const deleteEvolucao = (item) => {
    axios.get(html + 'delete_evolucao/' + item).then(() => {
      toast(settoast, 'EVOLUÇÃO EXCLUÍDA COM SUCESSO', 'rgb(82, 190, 128, 1)', 2000);
      loadEvolucoesDoPassometro();
    })
  }
  const [viewinsertupdateevolucao, setviewinsertupdateevolucao] = useState(0);
  function InsertUpdateEvolucao() {
    return (
      <div className="fundo" style={{ display: viewinsertupdateevolucao != 0 ? 'flex' : 'none' }}
        onClick={(e) => { setviewinsertupdateevolucao(0); e.stopPropagation() }}>
        <div className="janela" onClick={(e) => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className='text3'>{viewinsertupdateevolucao == 1 ? 'INSERIR EVOLUÇÃO' : 'ATUALIZAR EVOLUÇÃO'}</div>
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
            defaultValue={viewinsertupdateevolucao == 2 ? selectedevolucao.evolucao : ''}
            id="inputEvolucaoPassometro"
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
              onClick={() => setviewinsertupdateevolucao(0)}>
              <img
                alt=""
                src={back}
                style={{ width: 30, height: 30 }}
              ></img>
            </div>
            <div id='btnsalvarevolucao' className='button-green'
              onClick={() => insertUpdateEvolucao(document.getElementById("inputEvolucaoPassometro").value)}
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
  }

  // VENTILAÇÃO MECÂNICA.
  // carregar parâmetros de ventilação mecânica.
  const loadVentilacaoMecanica = () => {
    axios.get(html + 'list_vm/' + atendimento).then((response) => {
      setvm(response.data.rows);
    })
  }
  // inserir ventilação mecânica.
  const insertVentilacaoMecanica = ([modo, pressao, volume, peep, fio2]) => {
    var obj = {
      id_atendimento: atendimento,
      modo: modo,
      pressao: pressao,
      volume: volume,
      peep: peep,
      fio2: fio2,
      data_vm: moment(),
    }
    axios.post(html + 'insert_vm', obj).then(() => {
      // toast(settoast, 'PARÂMETROS VENTILATÓRIOS ADICIONADOS COM SUCESSO', 'rgb(82, 190, 128, 1)', 3000);
      loadVentilacaoMecanica();
      setviewinsertvm(0);
    })
  }
  // atualizar registro de parâmetros ventilatórios.
  const updateVentilacaoMecanica = ([id, modo, pressao, volume, peep, fio2, data_vm]) => {
    var obj = {
      id_atendimento: atendimento,
      modo: modo,
      pressao: pressao,
      volume: volume,
      peep: peep,
      fio2: fio2,
      data_vm: data_vm,
    }
    axios.post(html + 'update_vm/' + id, obj).then(() => {
      // toast(settoast, 'PARÂMETROS DA VM ATUALIZADOS COM SUCESSO', 'rgb(82, 190, 128, 1)', 3000);
      loadVentilacaoMecanica();
      setviewinsertvm(0);
    })
  }
  const [viewinsertvm, setviewinsertvm] = useState();
  function InsertVm() {
    return (
      <div className="fundo"
        onClick={(e) => { setviewinsertvm(0); e.stopPropagation() }}
        style={{ display: viewinsertvm == 1 || viewinsertvm == 2 ? 'flex' : 'none' }}>
        <div className={window.innerWidth < 426 ? "janela scroll" : "janela"}
          onClick={(e) => e.stopPropagation()}
          style={{
            flexDirection: 'column',
            width: window.innerWidth < 426 ? '80vw' : '60vw',
            height: window.innerWidth < 426 ? 0.5 * window.innerHeight : '',
            justifyContent: window.innerWidth < 426 ? 'flex-start' : 'center',
            alignContent: 'center',
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: window.innerWidth < 426 ? 'column' : 'row',
              flexWrap: window.innerWidth < 426 ? 'nowrap' : 'wrap',
              justifyContent: window.innerWidth < 426 ? 'flex-start' : 'center',
              alignContent: 'center',
            }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className='text1'>MODO</div>
              <input
                className="input"
                autoComplete="off"
                placeholder="MODO"
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'MODO')}
                style={{
                  width: window.innerWidth < 426 ? '70vw' : '10vw',
                  margin: 5,
                }}
                type="text"
                id="inputModoTradicional"
                defaultValue={vm.map(item => item.modo)}
                maxLength={3}
              ></input>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className='text1'>PRESSÃO</div>
              <input
                className="input"
                autoComplete="off"
                inputMode='numeric'
                placeholder="PRESSÃO"
                onKeyUp={() => checkNumberInput("inputPressao", 14, 25)}
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'PRESSÃO')}
                style={{
                  width: window.innerWidth < 426 ? '70vw' : '10vw',
                  margin: 5,
                }}
                type="text"
                id="inputPressaoTradicional"
                defaultValue={vm.map(item => item.pressao)}
                maxLength={2}
              ></input>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className='text1'>VOLUME</div>
              <input
                className="input"
                autoComplete="off"
                inputMode='numeric'
                placeholder="VOLUME"
                onKeyUp={() => checkNumberInput("inputVolume", 200, 600)}
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'VOLUME')}
                style={{
                  width: window.innerWidth < 426 ? '70vw' : '10vw',
                  margin: 5,
                }}
                type="text"
                id="inputVolumeTradicional"
                defaultValue={vm.map(item => item.volume)}
                maxLength={3}
              ></input>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className='text1'>PEEP</div>
              <input
                className="input"
                autoComplete="off"
                placeholder="PEEP"
                inputMode='numeric'
                onKeyUp={() => checkNumberInput("inputPeep", 1, 20)}
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'PEEP')}
                style={{
                  width: window.innerWidth < 426 ? '70vw' : '10vw',
                  margin: 5,
                }}
                type="text"
                id="inputPeepTradicional"
                defaultValue={vm.map(item => item.peep)}
                maxLength={2}
              ></input>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className='text1'>FIO2</div>
              <input
                className="input"
                autoComplete="off"
                placeholder="FIO2"
                inputMode='numeric'
                onKeyUp={() => checkNumberInput("inputFio2", 21, 101)}
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'FIO2')}
                style={{
                  width: window.innerWidth < 426 ? '70vw' : '10vw',
                  margin: 5,
                }}
                type="text"
                id="inputFio2Tradicional"
                defaultValue={vm.map(item => item.fio2)}
                maxLength={3}
              ></input>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div id="botão de retorno"
              className="button-red"
              style={{
                display: 'flex',
                alignSelf: 'center',
              }}
              onClick={() => setviewinsertvm(0)}>
              <img
                alt=""
                src={back}
                style={{ width: 30, height: 30 }}
              ></img>
            </div>
            <div id="btndesligarvm"
              className='button-green'
              style={{ paddingLeft: 10, paddingRight: 10 }}
              onClick={() => {
                if (vm == []) { // inserir.
                  insertVentilacaoMecanica(['OFF', 0, 0, 0, 0]);
                } else { // atualizar.
                  updateVentilacaoMecanica([vm.map(item => item.id_vm), 'OFF', 0, 0, 0, 0, vm.map(item => item.data_vm)]);
                }
              }}
            >
              DESLIGAR VM
            </div>
            <div id="btnsalvarvmtradicional"
              className='button-green'
              onClick={() => {
                var modo = document.getElementById('inputModoTradicional').value;
                var pressao = document.getElementById('inputPressaoTradicional').value;
                var volume = document.getElementById('inputVolumeTradicional').value;
                var peep = document.getElementById('inputPeepTradicional').value;
                var fio2 = document.getElementById('inputFio2Tradicional').value;
                console.log(JSON.stringify(vm));
                if (vm.length == 0) { // inserir.
                  console.log('INSERIR, PORRA!!!')
                  checkinput('input', settoast, ['inputModoTradicional', 'inputPressaoTradicional', 'inputVolumeTradicional', 'inputPeepTradicional', 'inputFio2Tradicional'], "btnsalvarvmtradicional", insertVentilacaoMecanica, [modo, pressao, volume, peep, fio2]);
                } else { // atualizar.
                  console.log('ATUALIZAR, PORRA!!!: ' + vm.map(item => item.id_vm));
                  checkinput('input', settoast, ['inputModoTradicional', 'inputPressaoTradicional', 'inputVolumeTradicional', 'inputPeepTradicional', 'inputFio2Tradicional'], "btnsalvarvmtradicional", updateVentilacaoMecanica, [vm.map(item => item.id_vm), modo, pressao, volume, peep, fio2, vm.map(item => item.data_vm)]);
                }
              }}
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
      </div>
    )
  }

  // INVASÕES.
  // função para carregamento das invasões.
  const [invasoes, setinvasoes] = useState([]);
  const loadInvasoes = () => {
    axios.get(html + 'list_invasoes/' + parseInt(atendimento)).then((response) => {
      setinvasoes(response.data.rows);
    });
  }

  // EXAMES LABORATORIAIS.
  // eliminação de resultados repetidos (falha de integração).
  const [uniqueexame, setuniqueexame] = useState([]);
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
  const montaTabelaExames = (dosagem, condicao, min, max, medida) => {
    return (
      <div className='button'
        style={{

          display: uniqueexame.filter(valor => valor.item == condicao).length > 0 ? 'flex' : 'none',
          flexDirection: 'row',
          justifyContent: 'space-between', flexWrap: 'wrap',
        }}>
        <div className='button-yellow'
          style={{ fontSize: window.innerWidth < 426 ? 14 : 20 }}>
          {dosagem}
        </div>
        {uniqueexame.filter(valor => valor.item == condicao).slice(-3).sort((a, b) => moment(a.data, 'DD/MM/YYYY') > moment(b.data, 'DD/MM/YYYY') ? -1 : 1).map(item => (
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

  // ANTIBIÓTICOS.
  const updateAtb = (item, texto) => {
    var obj = {
      numero: item.numero,
      data: item.data,
      hora: item.hora,
      prontuario: item.prontuario,
      atendimento: item.atendimento,
      id_item: item.id_item,
      item: item.item,
      unidade: item.unidade,
      qtde: item.qtde,
      frequencia: item.frequencia,
      acm: item.acm,
      sn: item.sn,
      atb: item.atb,
      obs: texto,
      tipo_prescricao: item.tipo_prescricao
    }
    axios.post(html + 'update_prescricoes/' + item.id, obj).then(() => {
      console.log(obj);
      console.log('ITEM DE ATB ATUALIZADO COM SUCESSO.');
    })
  }

  // CULTURAS.
  // carregando as culturas do atendimento.
  const loadCulturas = () => {
    setarrayculturas([]);
    axios.get(html + 'list_culturas/' + atendimento).then((response) => {
      console.log('DEFLAGROU')
      setarrayculturas(response.data.rows);
    });
  }
  // excluir uma cultura.
  const deleteCultura = (cultura) => {
    axios.get(html + 'delete_cultura/' + cultura.id_cultura).then(() => {
      loadCulturas();
    });
  }
  // inserindo uma cultura.
  const insertCultura = () => {
    var obj = {
      id_atendimento: atendimento,
      material: document.getElementById("inputMaterialTradicional").value.toUpperCase(),
      resultado: document.getElementById("inputResultadoTradicional").value.toUpperCase(),
      data_pedido: moment(document.getElementById("inputDataPedidoTradicional").value + ' - ' + moment().format('HH:mm'), 'DD/MM/YY - HH:mm'),
      data_resultado: null,
    }
    axios.post(html + 'insert_cultura', obj).then(() => {
      console.log(obj);
      loadCulturas();
      setviewinsertcultura(0);
    })
  }
  const insertVoiceCultura = ([material]) => {
    var obj = {
      id_atendimento: atendimento,
      material: material,
      resultado: '',
      data_pedido: moment(),
      data_resultado: null,
    }
    axios.post(html + 'insert_cultura', obj).then((response) => {
      loadCulturas();
      setviewinsertcultura(0);
      toast(settoast, 'CULTURA REGISTRADA COM SUCESSO', 'rgb(82, 190, 128, 1)', 3000);
    })
  }
  const [viewinsertcultura, setviewinsertcultura] = useState(0);
  const InsertCultura = () => {
    var timeout = null;
    return (
      <div className="fundo" style={{ display: viewinsertcultura == 1 ? 'flex' : 'none' }}
        onClick={(e) => { setviewinsertcultura(0); e.stopPropagation() }}>
        <div className="janela" onClick={(e) => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div id="campos" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div id="material" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className='text1'>MATERIAL</div>
              <input
                className="input"
                autoComplete="off"
                placeholder='MATERIAL...'
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'MATERIAL...')}
                style={{
                  display: 'flex',
                  flexDirection: 'center', justifyContent: 'center', alignSelf: 'center',
                  whiteSpace: 'pre-wrap',
                  width: window.innerWidth < 426 ? '70vw' : '50vw',
                }}
                id="inputMaterialTradicional"
                title="MATERIAL."
              >
              </input>
            </div>
            <div id="dia da coleta" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className='text1'>DIA DA COLETA</div>
              <input
                autoComplete="off"
                placeholder="DATA"
                className="input"
                type="text"
                inputMode='numeric'
                maxLength={10}
                id="inputDataPedidoTradicional"
                title="FORMATO: DD/MM/YYYY"
                onClick={() => document.getElementById("inputDataPedido").value = ''}
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'DATA')}
                onKeyUp={() => {
                  var x = document.getElementById("inputDataPedido").value;
                  if (x.length == 2) {
                    x = x + '/';
                    document.getElementById("inputDataPedido").value = x;
                  }
                  if (x.length == 5) {
                    x = x + '/'
                    document.getElementById("inputDataPedido").value = x;
                  }
                  clearTimeout(timeout);
                  var date = moment(document.getElementById("inputDataPedido").value, 'DD/MM/YYYY', true);
                  timeout = setTimeout(() => {
                    if (date.isValid() == false) {
                      toast(settoast, 'DATA INVÁLIDA', 'rgb(231, 76, 60, 1)', 3000);
                      document.getElementById("inputDataPedido").value = '';
                    } else {
                      document.getElementById("inputDataPedido").value = moment(date).format('DD/MM/YYYY');
                    }
                  }, 3000);
                }}
                defaultValue={moment().format('DD/MM/YYYY')}
              ></input>
            </div>
            <div id="resultado" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className='text1'>RESULTADO</div>
              <input
                className="input"
                autoComplete="off"
                placeholder='RESULTADO...'
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'RESULTADO...')}
                style={{
                  display: 'flex',
                  flexDirection: 'center', justifyContent: 'center', alignSelf: 'center',
                  whiteSpace: 'pre-wrap',
                  width: window.innerWidth < 426 ? '70vw' : '50vw',
                }}
                id="inputResultadoTradicional"
                title="RESULTADO."
              >
              </input>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <div id="botão de retorno"
                className="button-red"
                style={{
                  display: 'flex',
                  alignSelf: 'center',
                }}
                onClick={() => setviewinsertcultura(0)}>
                <img
                  alt=""
                  src={back}
                  style={{ width: 30, height: 30 }}
                ></img>
              </div>
              <div id='btnsalvarcultura' className='button-green' style={{ maxWidth: 50, alignSelf: 'center' }}
                onClick={() => insertCultura()}
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
      </div>
    )
    // eslint-disable-next-line
  };

  // PROPOSTAS.
  const [propostas, setpropostas] = useState([]);
  function ListPropostas() {
    return (
      <div>
        <div className='text3'>PROPOSTAS</div>
        <div id="propostas" className='scroll cor0'
          style={{
            height: '30vh',
            width: window.innerWidth < 426 ? '90vw' : '60vw',
            alignSelf: 'center',
            marginBottom: 10,
          }}>
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
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      width: 'calc(100% - 10px)'
    }}>
      <div id="corrida tradicional"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignContent: 'flex-start',
          alignSelf: 'center', alignItems: 'center',
          height: window.innerWidth < 426 ? '' : window.innerHeight - 30,
          minHeight: window.innerWidth < 426 ? '' : window.innerHeight - 30,
          width: window.innerWidth < 426 ? '95vw' : '65vw',
          margin: 0,
          position: 'relative',
          scrollBehavior: 'smooth',
        }}>
        <div id="INFORMAÇÕES DO PACIENTE"
          style={{
            position: 'sticky', top: 0, left: 0, right: 0,
            display: 'flex', flexDirection: 'column', zIndex: 50
          }}>
          <div id='mobile_pacientes'
            className='cor2 bordas2'
            style={{
              display: window.innerWidth < 426 ? 'flex' : 'none',
              flexDirection: 'row', justifyContent: 'center',
              flex: 1,
              zIndex: 30,
              width: 'calc(100% - 10px)',
            }}>
            <div id="botão de retorno"
              className="button-red"
              style={{
                display: window.innerWidth < 426 ? 'flex' : 'none',
                opacity: 1, backgroundColor: '#ec7063',
                alignSelf: 'center',
              }}>
              <img
                alt=""
                src={back}
                style={{ width: 30, height: 30 }}
              ></img>
            </div>
            {atendimentos.filter(valor => valor.atendimento == atendimento).slice(-1).map(item => (
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
          <div id="resumo" className='cor1hover'
            style={{
              display: 'flex', flexDirection: 'row', justifyContent: 'center',
              borderRadius: 5, padding: 5
            }}>
            <div id="tempo de internação" className={'button-grey'} style={{ width: 100, height: 50 }}>
              {'DIAS DE INTERNAÇÃO: ' + atendimentos.filter(item => item.atendimento == atendimento).sort((a, b) => moment(a.data) > moment(b.data) ? 1 : -1).slice(-1).map(item => moment().diff(item.data, 'days'))}
            </div>
            <div id="precauções"
              style={{
                display: 'flex',
                flexDirection: 'row', justifyContent: 'center',
                flexWrap: 'wrap',
              }}>
              {assistenciais.filter(item => item.item == '0202 - PRECAUCOES').slice(-1).map(item => (
                <div className='button-yellow' key={'precaucao ' + item.id}
                  style={{ width: 100, height: 50 }}
                >
                  <div>
                    {item.valor.includes('Padr') ? 'PRECAUÇÃO PADRÃO' :
                      item.valor.includes('Contato + Got') ? 'PRECAUÇÃO DE CONTATO + GOTÍCULAS' :
                        item.valor.includes('Contato + Aer') ? 'PRECAUÇÃO DE CONTATO + AEROSSÓIS' :
                          item.valor.includes('Got') ? 'PRECAUÇÃO DE GOTÍCULAS' :
                            item.valor.includes('Aeross') ? 'PRECAUÇÃO DE AEROSSÓIS' :
                              item.valor.includes('Contato') ? 'PRECAUÇÃO DE CONTATO' : ''}
                  </div>
                </div>
              ))}
            </div>
            <div id="alergias"
              className='button-grey'
              style={{
                display: assistenciais.filter(item => item.item == '0201 - ALERGIAS').length > 0 ? 'flex' : 'none',
                flexDirection: 'row', justifyContent: 'center',
                flexWrap: 'wrap',
                width: 200
              }}>
              {assistenciais.filter(item => item.item == '0201 - ALERGIAS').map(item => (
                <div key={'alergia ' + item.id}
                  style={{ width: 100, height: 50, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
                >
                  <div>
                    {item.valor}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div id="ANAMNESE">
          <div
            style={{
              alignSelf: 'flex-start'
            }}>
            <div className='text3'>
              LISTA DE PROBLEMAS
            </div>
            <div>
              {assistenciais.filter(item => item.item == '0506 - LISTA DE PROBLEMAS').sort((a, b) => moment(a.data, 'DD/MM/YYYY') < moment(b.data, 'DD/MM/YYYY') ? 1 : -1).slice(-1).map(item => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'flex-start',
                    backgroundColor: 'rgb(215, 219, 221)',
                    borderRadius: 5,
                    padding: 10, margin: 5,
                  }}
                >
                  <div className='button-red'
                    style={{
                      display: 'none', flexDirection: 'column',
                      alignSelf: 'flex-start',
                      paddingLeft: 10, paddingRight: 10,
                      margin: 0, marginBottom: 5
                    }}>
                    <div>
                      {item.data}
                    </div>
                    <div>
                      {item.hora.substring(0, 5)}
                    </div>
                  </div>
                  <div className='text1'
                    style={{
                      textAlign: 'left', margin: 0, padding: 0, alignSelf: 'flex-start'
                    }}>
                    {item.valor.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
            <div className='text3'
              style={{ display: assistenciais.filter(item => item.atendimento == atendimento && item.item == '0503 - ANAMNESE MEDICACOES DE USO DOMICILIAR').length > 0 ? 'flex' : 'none' }}
            >
              MEDICAÇÕES DE USO DOMICILIAR
            </div>
            <div>
              {assistenciais.filter(item => item.atendimento == atendimento && item.item == '0503 - ANAMNESE MEDICACOES DE USO DOMICILIAR').sort((a, b) => moment(a.data, 'DD/MM/YYYY') < moment(b.data, 'DD/MM/YYYY') ? 1 : -1).slice(-1).map(item => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    backgroundColor: 'rgb(215, 219, 221)',
                    borderRadius: 5,
                    padding: 10, margin: 5,
                  }}
                >
                  <div className='button-red'
                    style={{
                      display: 'none', flexDirection: 'column',
                      alignSelf: 'flex-start',
                      paddingLeft: 10, paddingRight: 10,
                      margin: 0, marginBottom: 5
                    }}>
                    <div>
                      {item.data}
                    </div>
                    <div>
                      {item.hora.substring(0, 5)}
                    </div>
                  </div>
                  <div className='text1'
                    style={{
                      textAlign: 'left', margin: 0, padding: 0, alignSelf: 'flex-start'
                    }}>
                    {item.valor.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
            <div className='text3'
              style={{ display: assistenciais.filter(item => item.atendimento == atendimento && item.item == '0502 - ANAMNESE HISTORIA DA DOENCA ATUAL').length > 0 ? 'flex' : 'none' }}
            >
              HISTÓRIA DA DOENÇA ATUAL
            </div>
            <div>
              {assistenciais.filter(item => item.atendimento == atendimento && item.item == '0502 - ANAMNESE HISTORIA DA DOENCA ATUAL').sort((a, b) => moment(a.data, 'DD/MM/YYYY') < moment(b.data, 'DD/MM/YYYY') ? 1 : -1).slice(-1).map(item => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    backgroundColor: 'rgb(215, 219, 221)',
                    borderRadius: 5,
                    padding: 10, margin: 5,
                  }}
                >
                  <div className='button-red'
                    style={{
                      display: 'none', flexDirection: 'column',
                      alignSelf: 'flex-start',
                      paddingLeft: 10, paddingRight: 10,
                      margin: 0, marginBottom: 5
                    }}>
                    <div>
                      {item.data}
                    </div>
                    <div>
                      {item.hora.substring(0, 5)}
                    </div>
                  </div>
                  <div className='text1'
                    style={{
                      textAlign: 'left', margin: 0, padding: 0,
                    }}>
                    {item.valor.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="EVOLUÇÕES DO PASSÔMETRO" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%' }}>
          <div className='text3'>
            EVOLUÇÕES
          </div>
          <div id="crud evoluções" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '70vw', alignSelf: 'center' }}>
            <Gravador funcao={insertVoiceEvolucao} continuo={true}></Gravador>
            <div id='btnsalvarevolucao' className='button-green'
              onClick={() => setviewinsertupdateevolucao(1)}
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
          <div className='scroll'
            style={{
              width: window.innerWidth < 426 ? '90vw' : '60vw',
              backgroundColor: 'white',
              borderColor: 'white',
              height: 300,
              margin: 5
            }}
          >
            {evolucaopassometro.sort((a, b) => moment(a.data_evolucao) > moment(b.data_evolucao) ? -1 : 1).slice(-5).map(item => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignContent: 'flex-start',
                  backgroundColor: 'rgb(215, 219, 221)',
                  borderColor: 'rgb(215, 219, 221)',
                  borderRadius: 5,
                  padding: 10, margin: 5,
                }}
                onClick={() => selectEvolucao(item)}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className='button-yellow'
                    style={{
                      display: 'flex', flexDirection: 'column',
                      alignSelf: 'flex-start',
                      padding: 10,
                      margin: 0,
                    }}>
                    <div>
                      {moment(item.data_evolucao).format('DD/MM/YY')}
                    </div>
                    <div>
                      {moment(item.data_evolucao).format('HH:mm')}
                    </div>
                  </div>
                  <div className="button-red"
                    style={{
                      display: item.id_usuario == usuario.id ? 'flex' : 'none',
                      alignSelf: 'center',
                      width: 30, minWidth: 30, height: 30, minHeight: 30,
                    }}
                    onClick={(e) => { deleteEvolucao(item.id_evolucao); e.stopPropagation() }}
                  >
                    <img
                      alt=""
                      src={deletar}
                      style={{
                        margin: 10,
                        height: 30,
                        width: 30,
                      }}
                    ></img>
                  </div>
                </div>
                <div className='text1'
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignSelf: 'flex-start',
                    textAlign: 'left',
                    margin: 0, padding: 10,
                    width: '100%'
                  }}>
                  {item.evolucao.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='text3'>INVASÕES</div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <div id='boneco' className="card-fechado"
            style={{
              display: 'flex',
              backgroundColor: 'rgb(229, 126, 52, 0.3)',
              borderColor: 'transparent',
              height: 120,
              width: 120,
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
          <div id="descrição das invasões"
            className='scroll text2'
            style={{
              display: 'flex', flexDirection: 'column',
              justifyContent: 'flex-start', padding: 10,
              textAlign: 'left',
              marginLeft: 0,
              width: 200,
              height: 115,
              backgroundColor: 'rgba(64, 74, 131, 1)',
              borderColor: 'rgba(64, 74, 131, 1)',
            }}>
            <div style={{ display: invasoes.filter(item => item.dispositivo == 'CVC' && item.data_retirada == null).length > 0 ? 'flex' : 'none', width: '100%', marginBottom: 5 }}>
              {'CVC: ' + invasoes.filter(item => item.dispositivo == 'CVC' && item.data_retirada == null).map(item => item.local + ' (' + moment(item.data_implante).format('DD/MM/YYYY') + ')')}
            </div>
            <div style={{ display: invasoes.filter(item => item.dispositivo == 'PIA' && item.data_retirada == null).length > 0 ? 'flex' : 'none', width: '100%', marginBottom: 5 }}>
              {'PIA: ' + invasoes.filter(item => item.dispositivo == 'PIA' && item.data_retirada == null).map(item => item.local + ' (' + moment(item.data_implante).format('DD/MM/YYYY') + ')')}
            </div>
            <div style={{ display: invasoes.filter(item => item.dispositivo == 'CDL' && item.data_retirada == null).length > 0 ? 'flex' : 'none', width: '100%', marginBottom: 5 }}>
              {'CDL: ' + invasoes.filter(item => item.dispositivo == 'CDL' && item.data_retirada == null).map(item => item.local + ' (' + moment(item.data_implante).format('DD/MM/YYYY') + ')')}
            </div>
            <div style={{ display: invasoes.filter(item => item.dispositivo == 'SVD' && item.data_retirada == null).length > 0 ? 'flex' : 'none', width: '100%', marginBottom: 5 }}>
              {'SVD: ' + invasoes.filter(item => item.dispositivo == 'SVD' && item.data_retirada == null).map(item => moment(item.data_implante).format('DD/MM/YYYY'))}
            </div>
            <div style={{ display: invasoes.filter(item => item.dispositivo == 'TOT' && item.data_retirada == null).length > 0 ? 'flex' : 'none', width: '100%', marginBottom: 5 }}>
              {'TOT: ' + invasoes.filter(item => item.dispositivo == 'TOT' && item.data_retirada == null).map(item => moment(item.data_implante).format('DD/MM/YYYY'))}
            </div>
            <div style={{ display: invasoes.filter(item => item.dispositivo == 'TQT' && item.data_retirada == null).length > 0 ? 'flex' : 'none', width: '100%' }}>
              {'TQT: ' + invasoes.filter(item => item.dispositivo == 'TQT' && item.data_retirada == null).map(item => moment(item.data_implante).format('DD/MM/YYYY'))}
            </div>
            <div style={{ display: invasoes.filter(item => item.dispositivo == 'DRN' && item.data_retirada == null).length > 0 ? 'flex' : 'none', width: '100%' }}>
              {'DRENO: ' + invasoes.filter(item => item.dispositivo == 'DRN' && item.data_retirada == null).map(item => moment(item.data_implante).format('DD/MM/YYYY'))}
            </div>
          </div>
        </div>

        <Boneco></Boneco>

        <div className='text3'>VENTILAÇÃO MECÂNICA</div>
        <div id="ventilação mecânica" className='button' onClick={() => setviewinsertvm(1)}>
          <div id="na vm"
            style={{
              display: vm.length > 0 && vm.sort((a, b) => moment(a.data_vm) < moment(b.data_vm) ? -1 : 1).slice(-1).map(item => item.modo) == 'OFF' ? 'none' : 'flex',
              flexDirection: 'column', justifyContent: 'center'
            }}>
            <div className='text2' style={{ margin: 0, padding: 0 }}>
              {vm.length > 0 ? vm.sort((a, b) => moment(a.data_vm) < moment(b.data_vm) ? -1 : 1).slice(-1).map(item => item.modo.toUpperCase()) : null}
            </div>
            <div style={{
              display: 'flex', flexDirection: 'row',
              justifyContent: 'center', alignSelf: 'center', flexWrap: 'wrap',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'PI'}</div>
                <div className='text2' style={{ margin: 0, padding: 0 }}>
                  {vm.length > 0 ? vm.sort((a, b) => moment(a.data_vm) < moment(b.data_vm) ? -1 : 1).slice(-1).map(item => item.pressao) : null}
                </div>
              </div>
              <div style={{ display: window.innerWidth < 426 ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'VC'}</div>
                <div className='text2' style={{ margin: 0, padding: 0 }}>
                  {vm.length > 0 ? vm.sort((a, b) => moment(a.data_vm) < moment(b.data_vm) ? -1 : 1).slice(-1).map(item => item.volume) : null}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'PEEP'}</div>
                <div className='text2' style={{ margin: 0, padding: 0 }}>
                  {vm.length > 0 ? vm.sort((a, b) => moment(a.data_vm) < moment(b.data_vm) ? -1 : 1).slice(-1).map(item => item.peep) : null}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 5 }}>
                <div className='textcard' style={{ margin: 0, padding: 0, opacity: 0.5 }}>{'FI'}</div>
                <div className='text2' style={{ margin: 0, padding: 0 }}>
                  {vm.length > 0 ? vm.sort((a, b) => moment(a.data_vm) < moment(b.data_vm) ? -1 : 1).slice(-1).map(item => item.fio2) : null}
                </div>
              </div>
            </div>
          </div>
          <div id="fora da vm" className='text2'
            style={{
              display: vm.length == 0 || vm.sort((a, b) => moment(a.data_vm) < moment(b.data_vm) ? -1 : 1).slice(-1).map(item => item.modo) != 'OFF' ? 'none' : 'flex',
              padding: 10
            }}
          >
            {'PACIENTE FORA DA VM'}
          </div>
        </div>

        <InsertUpdateEvolucao></InsertUpdateEvolucao>
        <InsertVm></InsertVm>
        <InsertCultura></InsertCultura>

        <div id="LABORATÓRIO" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className='text3'>EXAMES LABORATORIAIS</div>
          <div className='button-grey'
            style={{ display: 'flex', width: '40vw', alignSelf: 'center' }}
            onClick={uniqueexame.length == 0 ?
              () => {
                assistenciais.filter(valor => valor.item.substring(0, 2) == '08').map(item => createUniqueexame(item));
                setuniqueexame(arrayexames);
              }
              :
              () => { setuniqueexame([]) }
            }
          >
            {uniqueexame.length == 0 ? 'MOSTRAR' : 'OCULTAR'}
          </div>
          <div style={{ display: uniqueexame.length > 0 ? 'flex' : 'none', flexDirection: 'column', width: window.innerWidth < 426 ? '90vw' : '60vw' }}>
            {montaTabelaExames('pH', '0845 - pH', 7.35, 7.45, '')}
            {montaTabelaExames('PO2', '0846 - PO2', 80, 95, 'mmHg')}
            {montaTabelaExames('PCO2', '0847 - PCO2', 35, 45, 'mmHg')}
            {montaTabelaExames('HCO3', '0848 - HCO3', 20, 30, 'meq/L')}
            {montaTabelaExames('CO2 TOTAL', '0849 - CO2 TOTAL', 21.1, 31.4, 'meq/L')}
            {montaTabelaExames('BE', '0850 - BE', -3, 3, 'meq/L')}
            {montaTabelaExames('SAO2', '0851 - Saturação', 92, 98, '%')}

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

        <div className='text3'>ANTIBIÓTICOS</div>
        <div className='scroll'
          style={{
            display: atbgesthos.length > 0 ? 'flex' : 'none',
            flexDirection: 'row', overflowX: 'scroll', overflowY: 'hidden',
            width: window.innerWidth < 426 ? '90vw' : '60vw',
            minHeight: window.innerWidth < 426 ? '' : 290,
            backgroundColor: 'white', borderColor: 'white',
            margin: 5,
          }}>
          {atbgesthos.map(item => (
            <div className='cor3'
              style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                padding: 5, borderRadius: 5,
                margin: 5,
              }}>
              <div id="data e hora"
                className='button-yellow'
                style={{
                  alignSelf: 'center',
                  width: window.innerWidth < 426 ? '35vw' : 200,
                }}>
                {item.data + ' - ' + item.hora.substring(0, 5)}
              </div>
              <div id="item de antibiótico"
                className='button'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  width: window.innerWidth < 426 ? '35vw' : 200,
                }}>
                {item.item.toUpperCase()}
              </div>
              <textarea
                className="textarea"
                autoComplete="off"
                placeholder="OBSERVAÇÕES PARA ATB..."
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'OBSERVAÇÕES PARA ATB...')}
                defaultValue={item.obs}
                onKeyUp={() => {
                  clearTimeout(timeout);
                  timeout = setTimeout(() => {
                    updateAtb(item, document.getElementById("inputObsAtb").value.toUpperCase());
                  }, 2000);
                }}
                style={{
                  width: window.innerWidth < 426 ? '35vw' : 200,
                  height: 100,
                  alignSelf: 'center',
                  margin: 2.5, marginTop: 5, padding: 0
                }}
                type="number"
                id="inputObsAtb"
                maxLength={200}
              ></textarea>
            </div>
          ))}
        </div>
        <div className='button' style={{ display: atbgesthos.length == 0 ? 'flex' : 'none', paddingLeft: 15, paddingRight: 15 }}>SEM REGISTROS DE ANTIBIÓTICOS</div>

        <div className='text3'>CULTURAS</div>
        <div id="crud culturas" style={{
          display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
          width: '70vw',
          alignSelf: 'center'
        }}>
          <Gravador funcao={insertVoiceCultura} continuo={true}></Gravador>
          <div id='btnsalvarevolucao' className='button-green'
            onClick={() => setviewinsertcultura(1)}
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
        <div className='scroll'
          style={{
            display: arrayculturas.length > 0 ? 'flex' : 'none',
            flexDirection: 'row', overflowX: 'scroll', overflowY: 'hidden',
            width: window.innerWidth < 426 ? '90vw' : '60vw',
            minHeight: window.innerWidth < 426 ? '' : 290,
            backgroundColor: 'white', borderColor: 'white',
            margin: 5
          }}>
          {arrayculturas.map(item => (
            <div className='cor3'
              style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                padding: 5, borderRadius: 5,
                margin: 5,
              }}>
              <div id="data e hora"
                className='button-yellow'
                style={{
                  position: 'relative',
                  alignSelf: 'center',
                  width: window.innerWidth < 426 ? '35vw' : 200,
                }}>
                {moment(item.data_pedido).format('DD/MM/YY')}
                <div className='button-red'
                  style={{ position: 'absolute', right: 5, width: 25, minWidth: 25, height: 25, minHeight: 25 }}
                  onClick={() => {
                    deleteCultura(item);
                  }}>
                  <img
                    alt=""
                    src={deletar}
                    style={{
                      margin: 10,
                      height: 25,
                      width: 25,
                    }}
                  ></img>
                </div>
              </div>
              <input id={"inputMaterialTradicional " + item.id_cultura}
                className="input"
                autoComplete="off"
                placeholder='MATERIAL...'
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'MATERIAL...')}
                defaultValue={item.material}
                onKeyUp={(e) => {
                  clearTimeout(timeout);
                  timeout = setTimeout(() => {
                    document.getElementById("inputMaterialTradicional " + item.id_cultura).blur();
                    setTimeout(() => {
                      var obj = {
                        id_atendimento: item.id_atendimento,
                        material: document.getElementById('inputMaterialTradicional ' + item.id_cultura).value.toUpperCase(),
                        resultado: document.getElementById('inputResultadoTradicional ' + item.id_cultura).value.toUpperCase(),
                        data_pedido: item.data_pedido,
                        data_resultado: item.data_resultado,
                      }
                      console.log(obj);
                      axios.post(html + 'update_cultura/' + item.id_cultura, obj).then(() => {
                        loadCulturas();
                      });
                      e.stopPropagation();
                    }, 500);
                  }, 2000);
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'center', justifyContent: 'center', alignSelf: 'center',
                  width: window.innerWidth < 426 ? '35vw' : 200,
                }}
                title="MATERIAL."
              >
              </input>
              <textarea id={"inputResultadoTradicional " + item.id_cultura}
                className={item.resultado == null || item.resultado.includes('NEGATIV') || item.resultado.includes('NHCB') ? "textarea cor2" : "textarea"}
                autoComplete="off"
                placeholder='RESULTADO...'
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'RESULTADO...')}
                defaultValue={item.resultado}
                onKeyUp={(e) => {
                  clearTimeout(timeout);
                  var resultado = document.getElementById('inputResultadoTradicional ' + item.id_cultura).value.toUpperCase();
                  timeout = setTimeout(() => {
                    document.getElementById("inputResultadoTradicional " + item.id_cultura).blur();
                    setTimeout(() => {
                      var obj = {
                        id_atendimento: item.id_atendimento,
                        material: document.getElementById('inputMaterialTradicional ' + item.id_cultura).value.toUpperCase(),
                        resultado: resultado == '' ? null : resultado,
                        data_pedido: item.data_pedido,
                        data_resultado: resultado == '' ? null : moment(),
                      }
                      console.log(obj);
                      axios.post(html + 'update_cultura/' + item.id_cultura, obj).then(() => {
                        loadCulturas();
                      });
                      e.stopPropagation();
                    }, 500);
                  }, 2000);
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'center', justifyContent: 'center', alignSelf: 'center',
                  width: window.innerWidth < 426 ? '35vw' : 200,
                  padding: 0,
                  height: 100,
                  backgroundColor: item.resultado == null || item.resultado.includes('NEGATIV') || item.resultado.includes('NHCB') ? '' : item.resultado.includes('VRE') || item.resultado.includes('ESBL') || item.resultado.includes('KPC') ? 'rgba(231, 76, 60, 0.7)' : 'rgb(244, 208, 63, 0.5)',
                  borderColor: 'transparent',
                  color: item.resultado == null || item.resultado.includes('NEGATIV') || item.resultado.includes('NHCB') ? '' : item.resultado.includes('VRE') || item.resultado.includes('ESBL') || item.resultado.includes('KPC') ? 'white' : '',
                }}
                title={item.data_resultado != null ? "DATA DO RESULTADO: " + moment(item.data_resultado).format('DD/MM/YY') : 'RESULTADO.'}
              >
              </textarea>
            </div>
          ))}
        </div>
        <div className='button' style={{ display: arrayculturas.length == 0 ? 'flex' : 'none', paddingLeft: 15, paddingRight: 15 }}>SEM REGISTROS DE CULTURAS</div>
        <ListPropostas></ListPropostas>
      </div>
      <div id="conteúdo vazio"
        className={window.innerWidth < 426 ? '' : 'scroll'}
        style={{
          display: atendimento != null ? 'none' : 'flex',
          flexDirection: 'column', justifyContent: 'center',
          height: window.innerHeight - 30,
          width: window.innerWidth < 426 ? 'calc(95vw - 15px)' : window.innerWidth > 425 && window.innerWidth < 769 ? 'calc(70vw - 20px)' : '70vw',
          margin: 0,
          scrollBehavior: 'smooth',
        }}>
        <div className='text1' style={{ opacity: 0.5 }}>{'SELECIONE UM PACIENTE DA LISTA PRIMEIRO'}</div>
      </div>
    </div >
  );
}

export default PassometroTradicional;
