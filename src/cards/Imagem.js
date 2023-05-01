/* eslint eqeqeq: "off" */
import React, { useContext, useEffect, useState } from 'react';
import Context from '../pages/Context';
import axios from 'axios';
import back from '../images/back.svg';

function Imagem() {

  // context.
  const {
    html,
    pacientes,
    paciente,
    prontuario,
    atendimentos,
    // setatendimentos,
    atendimento,
    card, setcard,
    viewtesseract, setviewtesseract,
    // exame,
    assistenciais
  } = useContext(Context);

  const [exameseletro, setexameseletro] = useState([]);
  const [exameseco, setexameseco] = useState([]);
  const [examesrx, setexamesrx] = useState([]);
  const [examesoutros, setexamesoutros] = useState([]);

  useEffect(() => {
    if (card == 'card-imagem') {
      setexameseletro(assistenciais.filter(item => item.item.includes('0890') == true).map(item => item.valor.toUpperCase()).slice(-1));
      setexameseco(assistenciais.filter(item => item.item.includes('0891') == true).map(item => item.valor.toUpperCase()).slice(-1));
      setexamesrx(assistenciais.filter(item => item.item.includes('0892') == true).map(item => item.valor.toUpperCase()).slice(-1));
      setexamesoutros(assistenciais.filter(item => item.item.includes('0893') == true).map(item => item.valor.toUpperCase()).slice(-1));
    }
    // eslint-disable-next-line
  }, [card, paciente, atendimentos, atendimento]);

  // atualizando um paciente.
  const updatePaciente = () => {
    var id = pacientes.filter(valor => valor.prontuario == prontuario).map(item => item.id).pop();
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
      style={{
        display: card == 'card-imagem' ? 'flex' : 'none',
        scrollBehavior: 'smooth',
      }}
    >
      <div
        style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          alignContent: 'center',
        }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className='text3'>EXAMES DE IMAGEM</div>
          <div>
            <div
              className='text1'
              style={{ display: examesrx.length > 0 ? 'flex' : 'none' }}
            >
              RX
            </div>
            <div
              className='text1'
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                backgroundColor: 'rgb(215, 219, 221)',
                borderRadius: 5,
                padding: 10, margin: 5,
                textAlign: 'left'
              }}
            >
              {examesrx}
            </div>
            <div
              className='text1'
              style={{ display: exameseletro.length > 0 ? 'flex' : 'none' }}
            >
              ECG
            </div>
            <div
              className='text1'
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                backgroundColor: 'rgb(215, 219, 221)',
                borderRadius: 5,
                padding: 10, margin: 5,
                textAlign: 'left'
              }}
            >
              {exameseletro}
            </div>
            <div
              className='text1'
              style={{ display: exameseco.length > 0 ? 'flex' : 'none' }}
            >
              ECOCARDIOGRAMA
            </div>
            <div
              className='text1'
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                backgroundColor: 'rgb(215, 219, 221)',
                borderRadius: 5,
                padding: 10, margin: 5,
                textAlign: 'left'
              }}
            >
              {exameseco}
            </div>
            <div
              className='text1'
              style={{ display: examesoutros.length > 0 ? 'flex' : 'none' }}
            >
              OUTROS EXAMES DE IMAGEM
            </div>
            <div
              className='text1'
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                backgroundColor: 'rgb(215, 219, 221)',
                borderRadius: 5,
                padding: 10, margin: 5,
                textAlign: 'left'
              }}
            >
              {examesoutros}
            </div>
          </div>
        </div>
        <Botoes></Botoes>
      </div>
    </div>
  )
}

export default Imagem;