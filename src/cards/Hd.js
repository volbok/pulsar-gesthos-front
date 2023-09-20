/* eslint eqeqeq: "off" */
import React, { useContext, useState, useEffect, useCallback } from 'react';
import Context from '../pages/Context';
import axios from 'axios';
import moment from 'moment';
import toast from '../functions/toast';
import modal from '../functions/modal';
import checkinput from '../functions/checkinput';
// imagens.
import salvar from '../images/salvar.svg';
import deletar from '../images/deletar.svg';
import calendario from '../images/calendario.svg';
import novo from '../images/novo.svg';
import back from '../images/back.svg';

function Hd() {
  // context.
  const {
    html,
    settoast,
    setdialogo,
    atendimento,
    card, setcard,
    setviewdatepicker,
    pickdate1, setpickdate1,
    hd, sethd,
  } = useContext(Context);

  useEffect(() => {
    if (card == 'card-hd') {
      setpickdate1(moment().format('DD/MM/YYYY'));
    }
    // eslint-disable-next-line
  }, [card]);

  // inserir hemodiálise.
  const insertHd = () => {
    var obj = {
      atendimento: atendimento,
      uf: document.getElementById("inputUf").value,
      data: moment(pickdate1, 'DD/MM/YYYY HH:mm'),
      tolerou: tolerou,
      heparina: heparina,
    }
    axios.post(html + 'insert_hd', obj).then(() => {
      loadHd();
      setviewinserthd(0);
      toast(settoast, 'HD REGISTRADA COM SUCESSO', 'rgb(82, 190, 128, 1)', 3000);
    });
  }

  // deletar hemodiálise.
  const deleteHd = (id) => {
    axios.get(html + 'delete_hd/' + id).then(() => {
      loadHd();
    })
  }

  // carregar hemodiálises.
  const loadHd = () => {
    axios.get(html + 'list_hd/' + atendimento).then((response) => {
      sethd(response.data.rows);
    });
  }

  // componente para adição da alergia.
  const [viewinserthd, setviewinserthd] = useState();
  let tolerou = 1;
  let heparina = 1;
  const InsertHd = useCallback(() => {
    return (
      <div className="fundo"
        onClick={(e) => { setviewinserthd(0); e.stopPropagation() }}
        style={{ display: viewinserthd == 1 ? 'flex' : 'none' }}>
        <div className="janela"
          onClick={(e) => e.stopPropagation()}
          style={{ flexDirection: 'column' }}>
          <div className='text3'>HEMODIÁLISE</div>

          <input
            autoComplete="off"
            placeholder="UF..."
            className="input"
            type="text"
            inputMode='numeric'
            maxLength={4}
            id="inputUf"
            title='UF(ML).'
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = 'UF...')}
            onKeyUp={(e) => {
              if (isNaN(e.target.value) == true || e.target.value == '') {
                document.getElementById("inputUf").value = '';
                document.getElementById("inputUf").focus();
                e.stopPropagation();
              }
            }}
            style={{
              width: 100,
              height: 50,
            }}
          ></input>

          <div className='text1'>TOLEROU HD?</div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div id="tolerou1"
              className='button'
              onClick={() => {
                // eslint-disable-next-line
                tolerou = 1;
                document.getElementById("tolerou1").className = "button-red";
                document.getElementById("tolerou2").className = "button";
              }}
            >
              SIM
            </div>
            <div id="tolerou2"
              className='button'
              onClick={() => {
                // eslint-disable-next-line
                tolerou = 0;
                document.getElementById("tolerou2").className = "button-red";
                document.getElementById("tolerou1").className = "button";
              }}
            >
              NÃO
            </div>
          </div>

          <div className='text1'>HEPARINA?</div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div id="heparina1"
              className='button'
              onClick={() => {
                tolerou = 1;
                document.getElementById("heparina1").className = "button-red";
                document.getElementById("heparina0").className = "button";
              }}
            >
              SIM
            </div>
            <div id="heparina0"
              className='button'
              onClick={() => {
                tolerou = 0;
                document.getElementById("heparina0").className = "button-red";
                document.getElementById("heparina1").className = "button";
              }}
            >
              NÃO
            </div>
          </div>

          <div
            id="datepicker"
            className="button-grey"
            style={{
              flexDirection: 'column',
              width: 150,
              height: 75,
              marginBottom: 10,
            }}
            onClick={(e) => { setviewdatepicker(1); e.stopPropagation() }}
          >
            <img
              alt=""
              src={calendario}
              style={{
                margin: 5,
                height: 30,
                width: 30,
              }}
            ></img>
            <div className='text2'>
              {pickdate1}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div id="botão de retorno"
              className="button-red"
              style={{
                display: 'flex',
                alignSelf: 'center',
              }}
              onClick={() => setviewinserthd(0)}>
              <img
                alt=""
                src={back}
                style={{ width: 30, height: 30 }}
              ></img>
            </div>
            <div id="btnsalvarhd"
              className='button-green'
              onClick={() => checkinput('input', settoast, ['inputUf'], "btnsalvarhd", insertHd, [document.getElementById("inputUf").value])}
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
    // eslint-disable-next-line
  }, [viewinserthd]);

  // registro de alergia por voz.
  function Botoes() {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        alignItems: 'center', marginTop: 15
      }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
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
          <div id="btninputalergia"
            className='button-green'
            onClick={(e) => { setviewinserthd(1); e.stopPropagation() }}
            style={{
              display: 'flex',
              alignSelf: 'center',
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
        </div>
      </div>
    );
  }

  return (
    <div id="scroll-hd"
      className='card-aberto'
      style={{ display: card == 'card-hd' ? 'flex' : 'none' }}
    >
      <div className="text3">HEMODIÁLISES</div>
      <Botoes></Botoes>
      <div
        style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'center',
          flexWrap: 'wrap', width: '100%'
        }}>
        {hd.sort((a, b) => moment(a) < moment(b) ? -1 : 1).map(item => (
          <div
            key={'hd ' + item.id}
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
          >
            <div className='button'
              style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly',
              }}>
              <div className='button-red'
                style={{ display: 'flex', width: 25, minWidth: 25, height: 25, minHeight: 25 }}
                onClick={(e) => {
                  modal(setdialogo, 'CONFIRMAR EXCLUSÃO DA HEMODIÁLISE?', deleteHd, item.id);
                  e.stopPropagation();
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
              <div
                style={{
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'center',
                  margin: 10,
                }}>
                <div style={{ margin: 5 }}>
                  {'UF: ' + item.uf + 'ML'}
                </div>
                <div style={{ margin: 5 }}>
                  {item.tolerou == '1' ? 'TOLEROU HD' : 'NÃO TOLEROU HD'}
                </div>
                <div style={{ margin: 5 }}>
                  {item.heparina == '1' ? 'C / HEPARINA' : 'S / HEPARINA'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <InsertHd></InsertHd>
    </div>
  )
}

export default Hd;