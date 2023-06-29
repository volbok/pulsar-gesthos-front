/* eslint eqeqeq: "off" */
import React, { useContext, useState, useEffect } from 'react';
import Context from '../pages/Context';
import axios from 'axios';
import moment from 'moment';
import back from '../images/back.svg';

function Prescricao() {

  // context.
  const {
    atendimento, // id_atendimento.
    card, setcard,
    html,
  } = useContext(Context);

  const [prescricao, setprescricao] = useState([]);
  const [arrayprescricao, setarrayprescricao] = useState([]);
  const loadPrescricoes = () => {
    axios.get(html + 'list_prescricoes/' + atendimento).then((response) => {
      var x = [0, 1];
      x = response.data.rows;

      const arrayprescricoes = [];
      x.sort(((a, b) => moment(a.data, 'DD/MM/YYYY') > moment(b.data, 'DD/MM/YYYY') ? 1 : -1)).filter(item => {
        if (arrayprescricoes.filter(valor => valor.item == item.item && valor.data == item.data).length == 0) {
          arrayprescricoes.push(item);
          // console.log(arrayprescricoes);
        }
        return null;
      });
      setprescricao(arrayprescricoes.sort((a, b) => a.item > b.item ? 1 : -1));
      setarrayprescricao(arrayprescricoes.sort((a, b) => a.item > b.item ? 1 : -1).filter(item => item.data == moment().format('DD/MM/YYYY')));
    });
  }

  useEffect(() => {
    if (card == 'card-prescricao') {
      loadPrescricoes();
    }
    // eslint-disable-next-line
  }, [card]);

  function FilterItemPrescricao() {
    return (
      <div className='input-special'
        style={{
          position: 'sticky',
          top: window.innerWidth < 426 ? 70 : 10,
          display: 'flex', alignSelf: 'center',
          zIndex: 20,
        }}>
        <input
          className="input"
          autoComplete="off"
          placeholder="BUSCAR NA PRESCRIÇÃO..."
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = 'BUSCAR NA PRESCRIÇÃO...')}
          onClick={(e) => e.stopPropagation()}
          onKeyUp={(e) => {
            filterPrescricao();
            e.stopPropagation();
          }}
          type="text"
          id="inputFilterPrescricao"
          defaultValue={filterprescricao}
          maxLength={100}
          style={{ margin: 5, width: window.innerWidth < 426 ? '65vw' : '30vw' }}
        ></input>
      </div>
    )
  }

  // atualizando cores dos botões selecionados.
  const changeColor = (id, data) => {
    setTimeout(() => {
      setarrayprescricao(prescricao.filter(item => item.data == data));
      var botoes = document.getElementById("datas_prescricao").getElementsByClassName("button-red");
      for (var i = 0; i < botoes.length; i++) {
        botoes.item(i).className = "button";
      }
      document.getElementById(id).className = "button-red";
    }, 500);
  }

  // seletor de datas.
  const [selectdate, setselectdate] = useState(moment().format('DD/MM/YYYY'));
  function DateSelector() {
    return (
      <div id="datas_prescricao" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div
          id="data1"
          className='button-red' style={{ paddingLeft: 10, paddingRight: 10 }}
          onClick={() => {
            setselectdate(moment().format('DD/MM/YYYY'));
            changeColor("data1", moment().format('DD/MM/YYYY'));
          }}>
          {moment().startOf('day').format('DD/MM/YYYY')}
        </div>
        <div
          id="data2"
          className='button' style={{ paddingLeft: 10, paddingRight: 10 }}
          onClick={() => {
            setselectdate(moment().subtract(1, 'day').format('DD/MM/YYYY'));
            setarrayprescricao(prescricao.filter(item => item.data == selectdate));
            changeColor("data2", moment().subtract(1, 'day').format('DD/MM/YYYY'));
          }}>
          {moment().startOf('day').subtract(1, 'day').format('DD/MM/YYYY')}
        </div>
        <div
          id="data3"
          className='button' style={{ paddingLeft: 10, paddingRight: 10 }}
          onClick={() => {
            setselectdate(moment().subtract(2, 'days').format('DD/MM/YYYY'));
            setarrayprescricao(prescricao.filter(item => item.data == selectdate));
            changeColor("data3", moment().subtract(2, 'days').format('DD/MM/YYYY'));
          }}>
          {moment().startOf('day').subtract(2, 'days').format('DD/MM/YYYY')}
        </div>
        <div
          id="data4"
          className='button' style={{ paddingLeft: 10, paddingRight: 10 }}
          onClick={() => {
            setselectdate(moment().subtract(3, 'days').format('DD/MM/YYYY'))
            setarrayprescricao(prescricao.filter(item => item.data == selectdate));
            changeColor("data4", moment().subtract(3, 'days').format('DD/MM/YYYY'));
          }}>
          {moment().startOf('day').subtract(3, 'days').format('DD/MM/YYYY')}
        </div>
        <div
          id="data5"
          className='button' style={{ paddingLeft: 10, paddingRight: 10 }}
          onClick={() => {
            setselectdate(moment().subtract(4, 'days').format('DD/MM/YYYY'));
            setarrayprescricao(prescricao.filter(item => item.data == selectdate));
            changeColor("data5", moment().subtract(4, 'days').format('DD/MM/YYYY'));
          }}>
          {moment().startOf('day').subtract(4, 'days').format('DD/MM/YYYY')}
        </div>
        <div
          id="data6"
          className='button' style={{ paddingLeft: 10, paddingRight: 10 }}
          onClick={() => {
            setselectdate(moment().subtract(5, 'days').format('DD/MM/YYYY'));
            setarrayprescricao(prescricao.filter(item => item.data == selectdate));
            changeColor("data6", moment().subtract(5, 'days').format('DD/MM/YYYY'));
          }}>
          {moment().startOf('day').subtract(5, 'days').format('DD/MM/YYYY')}
        </div>
      </div>
    )
  }

  const [filterprescricao, setfilterprescricao] = useState('');
  var searchprescricao = '';
  const filterPrescricao = () => {
    clearTimeout(timeout);
    searchprescricao = document.getElementById("inputFilterPrescricao").value.toUpperCase();
    timeout = setTimeout(() => {
      document.getElementById("inputFilterPrescricao").blur();
      setTimeout(() => {
        if (searchprescricao == '') {
          setfilterprescricao('');
          setarrayprescricao(prescricao.filter(item => item.data == selectdate));
          document.getElementById("inputFilterPrescricao").value = '';
        } else {
          setfilterprescricao(document.getElementById("inputFilterPrescricao").value.toUpperCase());
          setarrayprescricao(prescricao.filter(item => item.item.includes(searchprescricao) == true));
          document.getElementById("inputFilterPrescricao").value = searchprescricao;
        }
      }, 500);
    }, 1000);
  }

  function ConsultaPrescricao() {
    return (
      <div
        style={{
          marginBottom: 5, alignSelf: 'center'
        }}
      >
        {arrayprescricao.map(item => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: 'rgb(215, 219, 221)',
              borderRadius: 5,
              padding: 10, margin: 5,
              width: window.innerWidth < 426 ? '80vw' : '',
              flexWrap: 'wrap',
            }}
          >
            <div id="data e hora"
              className='button-yellow'
              style={{
                alignSelf: 'flex-start',
                padding: 10,
                margin: 2.5,
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
            <div id="item da prescrição"
              className='button'
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                textAlign: 'left',
                alignItems: 'center',
                alignSelf: 'center',
                margin: 2.5, padding: 10,
                width: window.innerWidth < 426 ? '40vw' : '30vw'
              }}>
              {window.innerWidth < 426 ? item.item.toUpperCase().slice(0, 25) + '...' : item.item.toUpperCase()}
            </div>
            <div id="quantidade"
              className='button'
              style={{
                display: window.innerWidth < 426 ? 'none' : 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                textAlign: 'left',
                alignItems: 'center',
                alignSelf: 'center',
                margin: 2.5, padding: 10,
              }}>
              {item.qtde.toUpperCase()}
            </div>
            <div id="frequência"
              className='button'
              style={{
                display: window.innerWidth < 426 ? 'none' : 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                textAlign: 'left',
                alignItems: 'center',
                alignSelf: 'center',
                margin: 2.5, padding: 10,
                width: 75,
              }}>
              {item.frequencia.toUpperCase()}
            </div>
            <div id="acm"
              className='button'
              style={{
                display: window.innerWidth < 426 ? 'none' : 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                textAlign: 'left',
                alignItems: 'center',
                alignSelf: 'center',
                margin: 2.5, padding: 10,
                opacity: item.acm == 'N' ? 0.5 : 1,
              }}>
              {'ACM'}
            </div>
            <div id="sn"
              className='button'
              style={{
                display: window.innerWidth < 426 ? 'none' : 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                textAlign: 'left',
                alignItems: 'center',
                alignSelf: 'center',
                margin: 2.5, padding: 10,
                opacity: item.sn == 'N' ? 0.5 : 1,
              }}>
              {'SN'}
            </div>
          </div>
        ))
        }
      </div >
    )
  }

  function Botoes() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div id="botão de retorno"
          className="button-red"
          style={{
            display: 'flex',
            width: 50, height: 50,
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
    <div id="scroll-evolucoes"
      className='card-aberto'
      style={{ display: card == 'card-prescricao' ? 'flex' : 'none' }}
    >
      <div className="text3">
        PRESCRIÇÃO
      </div>
      <Botoes></Botoes>
      <DateSelector></DateSelector>
      <div
        style={{
          position: 'relative', display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-start',
          flex: 1
        }}>
        <FilterItemPrescricao></FilterItemPrescricao>
        <ConsultaPrescricao></ConsultaPrescricao>
      </div>
    </div>
  )
}

export default Prescricao;