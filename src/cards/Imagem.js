/* eslint eqeqeq: "off" */
import React, { useContext, useEffect } from 'react';
import Context from '../pages/Context';
import axios from 'axios';
import MyTesseract from '../tesseract/Tesseract';
import moment from 'moment';
// funções.
// import toast from '../functions/toast';
// imagens.
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
    assistenciais,
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
    var obj = {
      prontuario: prontuario,
      paciente: atendimentos.filter(valor => valor.prontuario == prontuario).map(item => item.paciente).pop(),
      antecedentes_pessoais: pacientes.filter(valor => valor.prontuario == prontuario).map(item => item.antecedentes_pessoais).pop(),
      medicacoes_previas: pacientes.filter(valor => valor.prontuario == prontuario).map(item => item.medicacoes_previas).pop(),
      exames_previos: pacientes.filter(valor => valor.prontuario == prontuario).map(item => item.exames_previos).pop(),
      exames_atuais: document.getElementById("inputExamesAtuais").value.toUpperCase(),
    }
    axios.post(html + 'update_gesthos_pacientes/' + parseInt(paciente), obj).then(() => {
      console.log('PACIENTE ATUALIZADO COM SUCESSO');
    })
  }

  var timeout = null;
  return (
    <div id="scroll-anamnese"
      className='card-aberto'
      style={{ display: card == 'card-anamnese' ? 'flex' : 'none', scrollBehavior: 'smooth' }}
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

export default Imagem;