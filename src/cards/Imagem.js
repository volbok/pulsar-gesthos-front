/* eslint eqeqeq: "off" */
import React, { useContext, useEffect, useState, useCallback } from 'react';
import Context from '../pages/Context';
import back from '../images/back.svg';
import novo from '../images/novo.svg';
import salvar from '../images/salvar.svg';
import makeObgesthos from '../functions/makeObgesthos';

function Imagem() {

  // context.
  const {
    paciente,
    atendimentos,
    // setatendimentos,
    atendimento,
    card, setcard,
    viewtesseract, setviewtesseract,
    // exame,
    assistenciais,
    prontuario, usuario, obgesthos,
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
        <div id="btnsalvarevolucao"
          className='button-green'
          style={{ width: 50, height: 50 }}
          onClick={(e) => {
            setviewinsertimagem(1);
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
        <div id="botão tesseract"
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

  // inserindo uma evolução.
  const insertImagem = (evolucao, tipo) => {
    let item = '';
    if (tipo == 'RX') {
      item = '0892 - RX'
    } else if (tipo == 'ECO') {
      item = '0891 - Eco'
    } else if (tipo == 'ECG') {
      item = '0890 - Eletro'
    } else {
      item = '0893 - Outros Ex'
    }
    makeObgesthos(prontuario, atendimento, '08 - ANTIBIOTICOS, CULTURAS E EXAMES', item, [evolucao], usuario, obgesthos);
    setviewinsertimagem(0);
  }

  const [viewinsertimagem, setviewinsertimagem] = useState(0);
  let arraytipoexame = ['RX', 'ECG', 'ECO', 'OUTRO'];
  const [tipoexame, settipoexame] = useState('OUTRO');
  const InsertImagem = useCallback(() => {
    return (
      <div className="fundo" style={{ display: viewinsertimagem == 1 ? 'flex' : 'none' }}
        onClick={(e) => { setviewinsertimagem(0); e.stopPropagation() }}>
        <div className="janela" onClick={(e) => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className='text3'>EXAME DE IMAGEM / COMPLEMENTAR</div>
          <div id="seletor do tipo de exame"
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            {arraytipoexame.map((item) => (
              <div
                className={tipoexame == item ? 'button-red' : 'button'}
                onClick={() => settipoexame(item)}
              >
                {item}
              </div>
            ))}
          </div>
          <textarea
            className="textarea"
            placeholder='EXAME...'
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = 'EXAME...')}
            style={{
              display: 'flex',
              flexDirection: 'center', justifyContent: 'center', alignSelf: 'center',
              whiteSpace: 'pre-wrap',
              width: window.innerWidth < 426 ? '70vw' : '50vw',
              height: 100,
            }}
            id="inputExameComplementar"
            title="EXAME."
          >
          </textarea>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div id="botão de retorno"
              className="button-red"
              style={{
                display: 'flex',
                alignSelf: 'center',
              }}
              onClick={() => setviewinsertimagem(0)}>
              <img
                alt=""
                src={back}
                style={{ width: 30, height: 30 }}
              ></img>
            </div>
            <div id='btnsalvarexamecomplementar' className='button-green'
              onClick={() => {
                insertImagem(document.getElementById("inputExameComplementar").value.toUpperCase(), tipoexame)
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
      </div >
    )
    // eslint-disable-next-line
  }, [viewinsertimagem, tipoexame]);

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
          <div className='text3'>EXAMES DE IMAGEM / COMPLEMENTARES</div>
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
        <InsertImagem></InsertImagem>
      </div>
    </div>
  )
}

export default Imagem;