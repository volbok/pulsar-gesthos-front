/* eslint eqeqeq: "off" */
import React, { useContext, useEffect } from 'react';
import Context from '../pages/Context';
import axios from 'axios';
import back from '../images/back.svg';

function Imagem() {

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
    viewtesseract, setviewtesseract,
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
    if (card == 'card-imagem') {
      loadPacientes();
    }
    // eslint-disable-next-line
  }, [card, paciente, atendimentos, atendimento]);

  // atualizando um paciente.
  const updatePaciente = () => {
    var id = pacientes.filter(valor => valor.prontuario == prontuario).map(item => item.id).pop()
    var obj = {
      prontuario: prontuario,
      paciente: atendimentos.filter(valor => valor.prontuario == prontuario).map(item => item.paciente).pop(),
      antecedentes_pessoais: pacientes.filter(valor => valor.prontuario == prontuario).map(item => item.antecedentes_pessoais).pop(),
      medicacoes_previas: pacientes.filter(valor => valor.prontuario == prontuario).map(item => item.medicacoes_previas).pop(),
      exames_previos: pacientes.filter(valor => valor.prontuario == prontuario).map(item => item.exames_previos).pop(),
      exames_atuais: document.getElementById("inputExamesAtuais1").value.toUpperCase(),
    }
    console.log('OI' + JSON.stringify(obj));
    axios.post(html + 'update_gesthos_pacientes/' + parseInt(id), obj).then(() => {
      console.log('PACIENTE ATUALIZADO COM SUCESSO');
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

  var timeout = null;
  return (
    <div id="scroll-imagem"
      className='card-aberto'
      style={{ display: card == 'card-imagem' ? 'flex' : 'none', scrollBehavior: 'smooth' }}
    >
      <div
        style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          flex: 1,
          alignContent: 'center',
        }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
                document.getElementById("inputExamesAtuais1").blur();
                updatePaciente();
                e.stopPropagation();
              }, 4000);
            }}
            style={{
              display: 'flex',
              flexDirection: 'column', justifyContent: 'center', alignSelf: 'center',
              whiteSpace: 'pre-wrap',
              width: window.innerWidth < 426 ? '85%' : '95%',
              height: window.innerWidth < 426 ? '50vh' : '50vh',
            }}
            id="inputExamesAtuais1"
            title="EXAMES ATUAIS."
          >
          </textarea>
        </div>
        <Botoes></Botoes>
      </div>
    </div>
  )
}

export default Imagem;