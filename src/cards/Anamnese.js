/* eslint eqeqeq: "off" */
import React, { useContext, useEffect } from 'react';
import Context from '../pages/Context';
import axios from 'axios';
import MyTesseract from '../tesseract/Tesseract';
import moment from 'moment';
import back from '../images/back.svg';

function Anamnese() {

  // context.
  const {
    html,
    pacientes, setpacientes,
    paciente,
    prontuario,
    atendimentos,
    atendimento,
    card, setcard,
    viewtesseract, setviewtesseract,
    assistenciais,
  } = useContext(Context);

  // const [selectedatendimento, setselectedatendimento] = useState([]);

  const loadPacientes = () => {
    axios.get('https://pulasr-gesthos-api.herokuapp.com/list_pacientes').then((response) => {
      setpacientes(response.data.rows);
    })
  }

  useEffect(() => {
    if (card == 'card-anamnese' && assistenciais.length > 0) {
      loadPacientes();
    }
    // eslint-disable-next-line
  }, [card, paciente, atendimentos, atendimento, assistenciais]);

  // atualizando um paciente.
  const updatePaciente = () => {
    var obj = {
      prontuario: prontuario,
      paciente: atendimentos.filter(valor => valor.prontuario == prontuario).map(item => item.paciente).pop(),
      antecedentes_pessoais: document.getElementById("inputAntecedentesPessoais").value.toUpperCase(),
      medicacoes_previas: document.getElementById("inputMedicacoesPrevias").value.toUpperCase(),
      exames_previos: document.getElementById("inputExamesPrevios").value.toUpperCase(),
      exames_atuais: document.getElementById("inputExamesAtuais").value.toUpperCase(),
    }
    axios.post(html + 'update_paciente/' + parseInt(paciente), obj);
  }

  // atualizando um atendimento.
  const updateAtendimento = (item) => {
    var id = item.map(item => item.id).pop();
    var obj = {
      data: moment(),
      prontuario: prontuario,
      atendimento: atendimento,
      paciente: item.map(item => item.paciente).pop(),
      sexo: item.map(item => item.sexo).pop(),
      nascimento: item.map(item => item.nascimento).pop(),
      unidadeinternacao: item.map(item => item.unidadeinternacao).pop(),
      leito: item.map(item => item.leito).pop(),
      problemas: document.getElementById("inputProblemas").value.toUpperCase(),
      hda: document.getElementById("inputSituacao").value.toUpperCase(),
      situacao: item.map(item => item.situacao).pop(),
    }
    axios.post(html + 'update_gesthos_atendimento/' + parseInt(id), obj).then(() => {
    }).catch((error) => console.log(error))
  }

  // registro de textarea por voz.
  function Botoes() {
    return (
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
            display: 'none', // habilitar quando for usar o Tesseract!
            alignSelf: 'center',
            fontSize: 20,
          }}
          onClick={() => {
            if (viewtesseract == 0) {
              setviewtesseract(1);
            } else {
              setviewtesseract(0);
            }
          }}
        >
          {'T'}
        </div>
      </div>
    );
  }

  function ConsultaAnamneseGesthos() {
    return (
      <div
        style={{
          alignSelf: 'flex-start'
        }}>
        <div className='text1'
          style={{ display: assistenciais.filter(item => item.item == '0506 - LISTA DE PROBLEMAS').length > 0 ? 'flex' : 'none' }}
        >
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
                  display: 'flex', flexDirection: 'column',
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
        <div className='text1'
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
                  display: 'flex', flexDirection: 'column',
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
        <div className='text1'
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
                  display: 'flex', flexDirection: 'column',
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
    )
  }

  var timeout = null;
  return (
    <div id="scroll-anamnese"
      className='card-aberto'
      style={{ display: card == 'card-anamnese' ? 'flex' : 'none', scrollBehavior: 'smooth' }}
    >
      <div id="tesseract"
        style={{
          display: viewtesseract == 1 ? 'flex' : 'none',
          zIndex: 20,
          alignSelf: 'center',
        }}>
        <MyTesseract></MyTesseract>
      </div>
      <div
        style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
          flex: 1,
          alignContent: 'center',
        }}>
        <ConsultaAnamneseGesthos></ConsultaAnamneseGesthos>
        <div style={{ display: 'none', flexDirection: 'column', justifyContent: 'center' }}>
          <div className='text3'>LISTA DE PROBLEMAS</div>
          <textarea
            className="textarea"
            autoComplete='off'
            placeholder='LISTA DE PROBLEMAS'
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = 'LISTA DE PROBLEMAS')}
            defaultValue={atendimentos.filter(valor => valor.prontuario == prontuario && valor.situacao == 'internacao' && valor.atendimento == atendimento).map(item => item.problemas)}
            onKeyUp={(e) => {
              clearTimeout(timeout);
              timeout = setTimeout(() => {
                document.getElementById("inputProblemas").blur();
                setTimeout(() => {
                  if (document.getElementById("inputProblemas").value != '') {
                    updateAtendimento(atendimentos.filter(valor => valor.prontuario == prontuario && valor.situacao == 'internacao' && valor.atendimento == atendimento));
                  }
                }, 1000);
                e.stopPropagation();
              }, 3000);
            }}
            style={{
              display: 'flex',
              flexDirection: 'COLUMN', justifyContent: 'center', alignSelf: 'center',
              whiteSpace: 'pre-wrap',
              width: window.innerWidth < 426 ? '85%' : '95%',
              height: window.innerWidth < 426 ? '50vh' : '',
            }}
            id="inputProblemas"
            title="LISTA DE PROBLEMAS."
          ></textarea>
          <div className='text3'>SITUAÇÃO</div>
          <textarea
            className="textarea"
            autoComplete='off'
            placeholder='SITUAÇÃO, CONTEXTO, HISTÓRIA DA DOENÇA ATUAL'
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = 'SITUAÇÃO, CONTEXTO, HISTÓRIA DA DOENÇA ATUAL')}
            defaultValue={atendimentos.filter(valor => valor.prontuario == prontuario && valor.situacao == 'internacao' && valor.atendimento == atendimento).map(item => item.hda)}
            onKeyUp={(e) => {
              clearTimeout(timeout);
              timeout = setTimeout(() => {
                document.getElementById("inputSituacao").blur();
                setTimeout(() => {
                  if (document.getElementById("inputSituacao").value != '') {
                    updateAtendimento(atendimentos.filter(valor => valor.prontuario == prontuario && valor.situacao == 'internacao' && valor.atendimento == atendimento));
                  }
                }, 1000);
                e.stopPropagation();
              }, 3000);
            }}
            style={{
              display: 'flex',
              flexDirection: 'column', justifyContent: 'center', alignSelf: 'center',
              whiteSpace: 'pre-wrap',
              width: window.innerWidth < 426 ? '85%' : '95%',
              height: window.innerWidth < 426 ? '50vh' : '',
            }}
            id="inputSituacao"
            title="SITUAÇÃO, CONTEXTO, HISTÓRIA DA DOENÇA ATUAL."
          ></textarea>
          <div className='text3'>ANTECEDENTES PESSOAIS</div>
          <textarea
            className="textarea"
            autoComplete='off'
            placeholder='ANTECEDENTES PESSOAIS'
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = 'ANTECEDENTES PESSOAIS')}
            defaultValue={pacientes.filter(valor => valor.prontuario == prontuario).map(item => item.antecedentes_pessoais)}
            onKeyUp={(e) => {
              clearTimeout(timeout);
              timeout = setTimeout(() => {
                document.getElementById("inputAntecedentesPessoais").blur();
                setTimeout(() => {
                  if (document.getElementById("inputAntecedentesPessoais").value != '') {
                    updatePaciente();
                  }
                }, 1000);
                e.stopPropagation();
              }, 4000);
            }}
            style={{
              display: 'flex',
              flexDirection: 'column', justifyContent: 'center', alignSelf: 'center',
              whiteSpace: 'pre-wrap',
              width: window.innerWidth < 426 ? '85%' : '95%',
              height: window.innerWidth < 426 ? '50vh' : '',
            }}
            id="inputAntecedentesPessoais"
            title="ANTECEDENTES PESSOAIS."
          >
          </textarea>
          <div className='text3'>MEDICAÇÕES DE USO DOMICILIAR</div>
          <textarea
            className="textarea"
            autoComplete='off'
            placeholder='MEDICAÇÕES DE USO DOMICILIAR'
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = 'MEDICAÇÕES DE USO DOMICILIAR')}
            defaultValue={pacientes.filter(valor => valor.prontuario == prontuario).map(item => item.medicacoes_previas)}
            onKeyUp={(e) => {
              clearTimeout(timeout);
              timeout = setTimeout(() => {
                document.getElementById("inputMedicacoesPrevias").blur();
                setTimeout(() => {
                  if (document.getElementById("inputMedicacoesPrevias").value != '') {
                    updatePaciente();
                  }
                }, 1000);
                e.stopPropagation();
              }, 4000);
            }}
            style={{
              display: 'flex',
              flexDirection: 'column', justifyContent: 'center', alignSelf: 'center',
              whiteSpace: 'pre-wrap',
              width: window.innerWidth < 426 ? '85%' : '95%',
              height: window.innerWidth < 426 ? '50vh' : '',
            }}
            id="inputMedicacoesPrevias"
            title="MEDICAÇÕES DE USO DOMICILIAR."
          >
          </textarea>
          <div className='text3'>EXAMES PRÉVIOS</div>
          <textarea
            className="textarea"
            autoComplete='off'
            placeholder='EXAMES PRÉVIOS'
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = 'EXAMES PRÉVIOS')}
            defaultValue={pacientes.filter(valor => valor.prontuario == prontuario).map(item => item.exames_previos)}
            onKeyUp={(e) => {
              clearTimeout(timeout);
              timeout = setTimeout(() => {
                document.getElementById("inputExamesPrevios").blur();
                setTimeout(() => {
                  if (document.getElementById("inputExamesPrevios").value != '') {
                    updatePaciente();
                  }
                }, 1000);
                e.stopPropagation();
              }, 4000);
            }}
            style={{
              display: 'flex',
              flexDirection: 'column', justifyContent: 'center', alignSelf: 'center',
              whiteSpace: 'pre-wrap',
              width: window.innerWidth < 426 ? '85%' : '95%',
              height: window.innerWidth < 426 ? '50vh' : '',
            }}
            id="inputExamesPrevios"
            title="EXAMES PRÉVIOS."
          >
          </textarea>
          <div className='text3'>EXAMES ATUAIS</div>
          <textarea
            className="textarea"
            autoComplete='off'
            placeholder='EXAMES ATUAIS'
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = 'EXAMES ATUAIS')}
            defaultValue={pacientes.filter(valor => valor.prontuario == prontuario).map(item => item.exames_atuais)}
            onKeyUp={(e) => {
              clearTimeout(timeout);
              timeout = setTimeout(() => {
                document.getElementById("inputExamesAtuais").blur();
                setTimeout(() => {
                  if (document.getElementById("inputExamesAtuais").value != '') {
                    updatePaciente();
                  }
                }, 1000);
                e.stopPropagation();
              }, 4000);
            }}
            style={{
              display: 'flex',
              flexDirection: 'column', justifyContent: 'center', alignSelf: 'center',
              whiteSpace: 'pre-wrap',
              width: window.innerWidth < 426 ? '85%' : '95%',
              height: window.innerWidth < 426 ? '50vh' : '',
            }}
            id="inputExamesAtuais"
            title="EXAMES ATUAIS."
          >
          </textarea>
        </div>
        <Botoes></Botoes>
      </div>
    </div>
  )
}

export default Anamnese;