/* eslint eqeqeq: "off" */
import React, { useContext, useEffect } from 'react';
import Context from '../pages/Context';
import axios from 'axios';
// funções.
// import toast from '../functions/toast';
// imagens.
import back from '../images/back.svg';

function Anamnese() {

  // context.
  const {
    html,
    pacientes, setpacientes,
    paciente,
    prontuario,
    atendimentos,
    // setatendimentos,
    atendimento,
    card, setcard,
  } = useContext(Context);

  // const [selectedatendimento, setselectedatendimento] = useState([]);

  const loadPacientes = () => {
    axios.get('https://pulasr-gesthos-api.herokuapp.com/list_pacientes').then((response) => {
      console.log(response.data.rows);
      setpacientes(response.data.rows);
      // loadAtendimentos();
    })
  }

  /*
  const loadAtendimentos = () => {
    axios.get('https://pulasr-gesthos-api.herokuapp.com/lista_atendimentos').then((response) => {
      console.log(response.data.rows);
      setatendimentos(response.data.rows);
    })
  }
  */

  useEffect(() => {
    if (card == 'card-anamnese') {
      loadPacientes();
    }
    // eslint-disable-next-line
  }, [card, paciente, atendimentos, atendimento]);

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
    console.log(JSON.stringify(obj));
    console.log('ID DO PACIENTE: ' + paciente)
    axios.post(html + 'update_paciente/' + parseInt(paciente), obj).then(() => {
      console.log('PACIENTE ATUALIZADO COM SUCESSO');
    })
  }

  // atualizando um atendimento.
  const updateAtendimento = () => {
    let atendimento = atendimentos.filter(valor => valor.prontuario == prontuario);
    let id = atendimentos.filter(valor => valor.prontuario == prontuario).map(item => item.id).pop();
    var obj = {
      data: atendimento.map(item => item.data).pop(),
      hora: atendimento.map(item => item.hora).pop(),
      prontuario: atendimento.map(item => item.prontuario).pop(),
      atendimento: atendimento.map(item => item.atendimento).pop(),
      paciente: atendimento.map(item => item.paciente).pop(),
      sexo: atendimento.map(item => item.sexo).pop(),
      nascimento: atendimento.map(item => item.nascimento).pop(),
      unidadeinternacao: atendimento.map(item => item.unidadeinternacao).pop(),
      leito: atendimento.map(item => item.leito).pop(),
      problemas: document.getElementById("inputProblemas").value.toUpperCase(),
      situacao: document.getElementById("inputSituacao").value.toUpperCase(),
    }
    axios.post(html + 'update_gesthos_atendimento/' + parseInt(id), obj).then(() => {
      console.log(JSON.stringify(obj));
      console.log(parseInt(id));
    })
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
      </div>
    );
  }

  var timeout = null;
  return (
    <div id="scroll-anamnese"
      className='card-aberto'
      style={{ display: card == 'card-anamnese' ? 'flex' : 'none' }}
    >
      <div
        style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          flex: 1
        }}>

        <div className='text3'>LISTA DE PROBLEMAS</div>
        <textarea
          className="textarea"
          autoComplete='off'
          placeholder='LISTA DE PROBLEMAS'
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = 'LISTA DE PROBLEMAS')}
          defaultValue={atendimentos.filter(valor => valor.prontuario == prontuario).map(item => item.problemas)}
          onKeyUp={(e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              document.getElementById("inputProblemas").blur();
              setTimeout(() => {
                if (document.getElementById("inputProblemas").value != '') {
                  updateAtendimento();
                }
              }, 1000);
              e.stopPropagation();
            }, 3000);
          }}
          style={{
            display: 'flex',
            flexDirection: 'center', justifyContent: 'center', alignSelf: 'center',
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
          defaultValue={atendimentos.filter(valor => valor.prontuario == prontuario).map(item => item.problemas)}
          onKeyUp={(e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              document.getElementById("inputSituacao").blur();
              setTimeout(() => {
                if (document.getElementById("inputSituacao").value != '') {
                  updateAtendimento();
                }
              }, 1000);
              e.stopPropagation();
            }, 3000);
          }}
          style={{
            display: 'flex',
            flexDirection: 'center', justifyContent: 'center', alignSelf: 'center',
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
            flexDirection: 'center', justifyContent: 'center', alignSelf: 'center',
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
            flexDirection: 'center', justifyContent: 'center', alignSelf: 'center',
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
            flexDirection: 'center', justifyContent: 'center', alignSelf: 'center',
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
            flexDirection: 'center', justifyContent: 'center', alignSelf: 'center',
            whiteSpace: 'pre-wrap',
            width: window.innerWidth < 426 ? '85%' : '95%',
            height: window.innerWidth < 426 ? '50vh' : '',
          }}
          id="inputExamesAtuais"
          title="EXAMES ATUAIS."
        >
        </textarea>
        <Botoes></Botoes>
      </div>
    </div>
  )
}

export default Anamnese;