/* eslint eqeqeq: "off" */
import React, { useContext, useState, useEffect } from 'react';
import Context from '../pages/Context';
// import axios from 'axios';
import moment from 'moment';
// imagens.
import back from '../images/back.svg';

function Antibioticos() {

  // context.
  const {
    card, setcard,
    atbgesthos,
  } = useContext(Context);


  useEffect(() => {
    if (card == 'card-antibioticos') {
      montaAtb();
    }
    // eslint-disable-next-line
  }, [card, atbgesthos]);

  // registro de textarea por voz.
  function Botoes() {
    return (
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
      </div>
    );
  }

  const [arrayatb, setarrayatb] = useState([]);
  const montaAtb = () => {
    if (atbgesthos.length > 0) {

      /*
      Transformando o valor do item antibióticos (string) em uma array contendo os objetos na 
      seguinte repetição:
      1. nome do antibiótico
      2. dias de uso
      3. data de início.
      */

      let splitter = moment().format('/YYYY').slice(1, 3);
      console.log('SÉCULO: ' + splitter);

      // separando os objetos pelo único conjunto de strings possível identificável e imutável: o século.F
      let array = atbgesthos.map(item => item.valor.toUpperCase()).pop().split(splitter);
      let fullarray = [];
      console.log(array);
      array.map(item => {
        let nomeatb = null;
        let inicio = null;
        console.log(parseInt(item.slice(0, 3)));
        if (isNaN(parseInt(item.slice(0, 3))) == true) {
          nomeatb = item.slice(0, item.length - 44);
          inicio = item.slice(item.length - 3, item.length);
        } else {
          nomeatb = item.slice(3, item.length - 44);
          inicio = item.slice(item.length - 5, item.length) + item.slice(0, 2);
        }
        var obj = {
          atb: nomeatb,
          dias: parseInt(item.slice(item.length - 27, item.length - 25)),
          inicio: moment(inicio, 'DD/MM/YYYY').format('DD/MM/YYYY')
        }
        fullarray.push(obj);
        return null;
      });
      setarrayatb(fullarray);
    }
  }

  return (
    <div id="scroll-antibioticos"
      className='card-aberto'
      style={{ display: card == 'card-antibioticos' ? 'flex' : 'none', position: 'relative' }}
    >
      <div className="text3">
        ANTIBIÓTICOS
      </div>
      <Botoes></Botoes>
      <div>
        <div id="antibióticos gesthos"
          style={{
            width: window.innerWidth < 426 ? '90vw' : '',
            display: arrayatb.length > 0 ? 'flex' : 'none',
            flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap'
          }}
        >
          {arrayatb.length > 0 ? arrayatb.slice(0, arrayatb.length - 1).sort((a, b) => moment(a.inicio, 'DD/MM/YYYY') < moment(b.inicio, 'DD/MM/YYYY') ? 1 : -1).map(item => (
            <div
              className='button'
              style={{
                display: 'flex',
                flexDirection: 'column', justifyContent: 'center',
                width: 230, minWidth: 230,
                opacity: moment(item.inicio, 'DD/MM/YYYY') < moment().subtract(15, 'days') ? 0.5 : 1
              }}
            >
              <div
                className='button-yellow'
                style={{ paddingLeft: 10, paddingRight: 10, width: 200 }}
              >
                {item.atb}
              </div>
              <div style={{ padding: 5 }}>
                {'DIAS DE USO: ' + item.dias}
              </div>
              <div style={{ padding: 5 }}>
                {'INÍCIO: ' + item.inicio}
              </div>
            </div>
          )) : null}
        </div>
      </div>
    </div>
  )
}

export default Antibioticos;