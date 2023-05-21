/* eslint eqeqeq: "off" */
import React, { useEffect, useContext } from 'react';
import Context from './Context';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
// imagens.
import back from '../images/back.svg';

function Print() {

  // context.
  const {
    pagina, setpagina,
    atendimentos,
    printatendimentos, printassistenciais,
  } = useContext(Context);

  // history (router).
  let history = useHistory();

  function Component(atendimento) {
    console.log('porra')
    if (printassistenciais.length > 0) {
      return (
        <div
          id={"div" + atendimento}
          style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
            width: '95vw',
            fontSize: 10,
          }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            {atendimentos.filter(item => item.atendimento == atendimento).map(item => (
              <div
                style={{
                  display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                }}>
                <div
                  className='text1'
                  style={{
                    width: 75, height: 40,
                    borderRadius: 5,
                    margin: 0, padding: 2.5, marginTop: 10,
                    backgroundColor: 'rgb(0, 0, 0, 0.5)', color: 'white',
                    textAlign: 'center',
                  }}>
                  {'BOX ' + item.leito}
                </div>
                <div className='text1'>
                  {item.paciente + ', ' + moment().diff(moment(item.nascimento, 'DD/MM/YYYY'), 'years') + ' ANOS'}
                </div>
              </div>
            ))}

            <div id="EVOLUÇÕES"
              className='text1'
              style={{ alignSelf: 'flex-start', margin: 0, padding: 0, marginTop: 10 }}>
              EVOLUÇÕES
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column', justifyContent: 'flex-start',
                alignContent: 'flex-start',
              }}
            >
              {printassistenciais.pop().filter(item => item.item == '0507 - EVOLUCAO CLINICA').sort((a, b) => moment(a.data, 'DD/MM/YYYY') < moment(b.data, 'DD/MM/YYYY')).slice(-5).map(item => (
                <div className='text1'
                  style={{
                    textAlign: 'left', flexDirection: 'row', justifyContent: 'flex-start',
                    margin: 0,
                    width: '100%',
                    alignContent: 'flex-start',
                  }}>
                  <div
                    style={{
                      width: 75,
                      borderRadius: 5,
                      margin: 0, marginRight: 5, padding: 2.5,
                      backgroundColor: 'rgb(0, 0, 0, 0.2)',
                      textAlign: 'center',
                      alignSelf: 'flex-start',
                    }}>
                    <div>{item.data}</div>
                    <div>{item.hora}</div>
                  </div>
                  <div style={{ width: '100%', margin: 0, alignSelf: 'flex-start' }}>
                    {item.valor.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div >
      );
    } else {
      return <div className='text1 gravando' style={{ padding: 10, color: 'white' }}>CARREGANDO...</div>
    }
  }


  useEffect(() => {
    if (pagina == 6) {
      console.log(printassistenciais.length);
    }
    // eslint-disable-next-line
  }, [pagina]);


  const BackButton = () => {
    return (
      <div id="botão de retorno"
        className="button-red"
        style={{
          position: 'absolute', bottom: 25, left: 25,
          opacity: 1, backgroundColor: '#ec7063',
          alignSelf: 'center',
          zIndex: 90
        }}
        onClick={() => {
          setpagina(1);
          history.push('/passometro');
        }}>
        <img
          alt=""
          src={back}
          style={{ width: 30, height: 30 }}
        ></img>
      </div >
    )
  }

  return (
    <div
      className='main fadein scroll'
      style={{ display: pagina == 6 ? 'flex' : 'none', justifyContent: 'flex-start' }}>
      {printatendimentos.map(item => (
        <Component atendimento={item}></Component>
      ))}
      <BackButton></BackButton>
    </div>
  )
};

export default Print;