/* eslint eqeqeq: "off" */
import React, { useEffect, useContext } from 'react';
import Context from './Context';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

function Print() {

  // context.
  const {
    pagina, setpagina,
    printatendimentos, printassistenciais,
    propostas,
    invasoes,
    vm, setvm,
  } = useContext(Context);

  // history (router).
  let history = useHistory();

  function Component(printatendimentos) {
    if (printassistenciais.length > 0) {
      return (
        <div
          id={"div" + printatendimentos.atendimento}
          style={{
            margin: 10,
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
            width: '95vw',
            fontSize: 10,
            fontWeight: 'bold',
            fontFamily: 'Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
          }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <div
              style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                marginLeft: 0, marginTop: 10,
                height: 40, alignContent: 'center', pageBreakInside: 'avoid',
              }}>
              <div
                className='text1'
                style={{
                  display: 'flex', flexDirection: 'row',
                  marginLeft: 0,
                  width: 75, height: 40,
                  borderRadius: 5,
                  margin: 5, padding: 5,
                  backgroundColor: 'rgb(0, 0, 0, 0.5)', color: 'white',
                  textAlign: 'center',
                  alignSelf: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  pageBreakInside: 'avoid',
                }}>
                <div style={{ alignSelf: 'center', textAlign: 'center', width: '100%' }}>
                  {'BOX ' + printatendimentos.leito}
                </div>
              </div>
              <div className='text1'
                style={{
                  display: 'flex', flexDirection: 'row',
                  height: 40,
                  borderRadius: 5,
                  margin: 5, padding: 2.5,
                  textAlign: 'center',
                  alignSelf: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  pageBreakInside: 'avoid'
                }}>
                <div style={{ alignSelf: 'center' }}>
                  {printatendimentos.paciente + ', ' + moment().diff(moment(printatendimentos.nascimento, 'DD/MM/YYYY'), 'years') + ' ANOS'}
                </div>
              </div>
            </div>

            <div id="LISTA DE PROBLEMAS"
              className='text1'
              style={{ alignSelf: 'flex-start', margin: 5, marginTop: 20, marginLeft: 0, textDecoration: 'underline' }}>
              LISTA DE PROBLEMAS
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column', justifyContent: 'flex-start',
                alignContent: 'flex-start',
              }}
            >
              {printassistenciais.flat().filter(item => item.atendimento == printatendimentos.atendimento && item.item == '0506 - LISTA DE PROBLEMAS').sort((a, b) => moment(a.data, 'DD/MM/YYYY') < moment(b.data, 'DD/MM/YYYY')).slice(-1).map(item => (
                <div className='text1'
                  style={{
                    textAlign: 'left', flexDirection: 'row', justifyContent: 'flex-start',
                    margin: 0,
                    width: '100%',
                    alignContent: 'flex-start',
                  }}>
                  <div style={{ width: '100%', margin: 0, alignSelf: 'flex-start' }}>
                    {item.valor.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>

            <div id="HISTÓRIA DA DOENÇA ATUAL"
              className='text1'
              style={{ alignSelf: 'flex-start', margin: 5, marginTop: 20, marginLeft: 0, textDecoration: 'underline' }}>
              HISTÓRIA DA DOENÇA ATUAL
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column', justifyContent: 'flex-start',
                alignContent: 'flex-start',
              }}
            >
              {printassistenciais.flat().filter(item => item.atendimento == printatendimentos.atendimento && item.item == '0502 - ANAMNESE HISTORIA DA DOENCA ATUAL').sort((a, b) => moment(a.data, 'DD/MM/YYYY') < moment(b.data, 'DD/MM/YYYY')).slice(-1).map(item => (
                <div className='text1'
                  style={{
                    textAlign: 'left', flexDirection: 'row', justifyContent: 'flex-start',
                    margin: 0,
                    width: '100%',
                    alignContent: 'flex-start',
                  }}>
                  <div style={{ width: '100%', margin: 0, alignSelf: 'flex-start' }}>
                    {item.valor.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>

            <div id="EXAMES COMPLEMENTARES"
              className='text1'
              style={{ alignSelf: 'flex-start', margin: 5, marginTop: 20, marginLeft: 0, textDecoration: 'underline' }}>
              EXAMES COMPLEMENTARES
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column', justifyContent: 'flex-start',
                alignContent: 'flex-start',
              }}
            >
              {printassistenciais.flat().filter(item => item.atendimento == printatendimentos.atendimento && item.item.includes('089') == true).sort((a, b) => moment(a.data, 'DD/MM/YYYY') < moment(b.data, 'DD/MM/YYYY')).slice(-1).map(item => (
                <div className='text1'
                  style={{
                    textAlign: 'left', flexDirection: 'row', justifyContent: 'flex-start',
                    margin: 0,
                    width: '100%',
                    alignContent: 'flex-start',
                  }}>
                  <div style={{ width: '100%', margin: 0, alignSelf: 'flex-start' }}>
                    {item.valor.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>

            <div id="EVOLUÇÕES"
              className='text1'
              style={{ alignSelf: 'flex-start', margin: 5, marginTop: 20, marginLeft: 0, textDecoration: 'underline' }}>
              EVOLUÇÕES
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column', justifyContent: 'flex-start',
                alignContent: 'flex-start',
              }}
            >
              {printassistenciais.flat().filter(item => item.atendimento == printatendimentos.atendimento && item.item == '0507 - EVOLUCAO CLINICA').sort((a, b) => moment(a.data, 'DD/MM/YYYY') < moment(b.data, 'DD/MM/YYYY')).slice(-5).map(item => (
                <div className='text1'
                  style={{
                    display: 'flex',
                    textAlign: 'left',
                    flexDirection: 'row', justifyContent: 'flex-start',
                    margin: 0, marginBottom: 5,
                    width: '100%',
                    alignContent: 'flex-start', pageBreakInside: 'avoid',
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

            <div id="INVASÕES"
              className='text1'
              style={{
                display: invasoes.flat().filter(item => item.id_atendimento == parseInt(printatendimentos.atendimento) && item.data_retirada == null).length > 0 ? 'flex' : 'none',
                alignSelf: 'flex-start', margin: 5, marginTop: 20, marginLeft: 0, textDecoration: 'underline',
              }}>
              INVASÕES
            </div>
            <div
              style={{
                display: invasoes.flat().filter(item => item.id_atendimento == parseInt(printatendimentos.atendimento) && item.data_retirada == null).length > 0 ? 'flex' : 'none',
                flexDirection: 'column', justifyContent: 'flex-start',
                alignContent: 'flex-start',
              }}
            >
              {invasoes.flat().filter(item => item.id_atendimento == parseInt(printatendimentos.atendimento) && item.data_retirada == null).sort((a, b) => moment(a.data) < moment(b.data)).map(item => (
                <div className='text1'
                  style={{
                    textAlign: 'left', flexDirection: 'row', justifyContent: 'flex-start',
                    margin: 0,
                    width: '100%',
                    alignContent: 'flex-start',
                  }}>
                  <div style={{ width: '100%', margin: 0, alignSelf: 'flex-start' }}>
                    {moment(item.data_implante).format('DD/MM/YY') + ' - ' + item.local.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>

            <div id="VM"
              className='text1'
              style={{
                display: vm.flat().filter(item => item.id_atendimento == parseInt(printatendimentos.atendimento)).length > 0 && vm.flat().filter(item => item.id_atendimento == parseInt(printatendimentos.atendimento)).slice(-1).map(item => item.modo != 'OFF') ? 'flex' : 'none',
                alignSelf: 'flex-start', margin: 5, marginTop: 20, marginLeft: 0, textDecoration: 'underline',
              }}>
              PARÂMETROS DA VM
            </div>
            <div
              style={{
                display: vm.flat().filter(item => item.id_atendimento == parseInt(printatendimentos.atendimento)).length > 0 && vm.flat().filter(item => item.id_atendimento == parseInt(printatendimentos.atendimento)).slice(-1).map(item => item.modo != 'OFF') ? 'flex' : 'none',
                flexDirection: 'column', justifyContent: 'flex-start',
                alignContent: 'flex-start',
              }}
            >
              {vm.flat().filter(item => item.id_atendimento == parseInt(printatendimentos.atendimento)).sort((a, b) => moment(a.data) < moment(b.data)).map(item => (
                <div className='text1'
                  style={{
                    textAlign: 'left', flexDirection: 'row', justifyContent: 'flex-start',
                    margin: 0,
                    width: '100%',
                    alignContent: 'flex-start',
                  }}>
                  <div style={{ width: '100%', margin: 0, alignSelf: 'flex-start' }}>
                    {moment(item.data_vm).format('DD/MM/YY') + ' - MODO: ' + item.modo.toUpperCase() + ' - PRESSÃO: ' + item.pressao.toUpperCase() + ' - VOLUME: ' + item.volume.toUpperCase() + ' - PEEP: ' + item.peep.toUpperCase() + ' - FIO2: ' + item.fio2.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>

            <div id="PROPOSTAS"
              className='text1'
              style={{
                display: propostas.flat().filter(item => item.id_atendimento == parseInt(printatendimentos.atendimento) && item.data_conclusao == null).length > 0 ? 'flex' : 'none',
                alignSelf: 'flex-start', margin: 5, marginTop: 20, marginLeft: 0, textDecoration: 'underline',
              }}>
              PROPOSTAS
            </div>
            <div
              style={{
                display: propostas.flat().filter(item => item.id_atendimento == parseInt(printatendimentos.atendimento) && item.data_conclusao == null).length > 0 ? 'flex' : 'none',
                flexDirection: 'column', justifyContent: 'flex-start',
                alignContent: 'flex-start',
              }}
            >
              {propostas.flat().filter(item => item.id_atendimento == parseInt(printatendimentos.atendimento) && item.data_conclusao == null).sort((a, b) => moment(a.data) < moment(b.data)).map(item => (
                <div className='text1'
                  style={{
                    textAlign: 'left', flexDirection: 'row', justifyContent: 'flex-start',
                    margin: 0,
                    width: '100%',
                    alignContent: 'flex-start',
                  }}>
                  <div style={{ width: '100%', margin: 0, alignSelf: 'flex-start' }}>
                    {moment(item.data_proposta).format('DD/MM/YY') + ' - ' + item.proposta.toUpperCase()}
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
      // console.log(printatendimentos);
      console.log(printassistenciais.flat());
      var divContents = document.getElementById("PAPEL").innerHTML;
      var a = window.open(null, moment().format('DD/MM/YY - HH:mm'));
      a.document.write('<html>');
      a.document.write(divContents);
      a.document.write('</body></html>');
      a.print();
      a.close();
      setTimeout(() => {
        setvm([]);
        setpagina(1);
        history.push('/passometro');
      }, 1000);
    }
    // eslint-disable-next-line
  }, [pagina]);

  return (
    <div
      className='main fadein scroll'
      id='PAPEL'
      style={{
        display: pagina == 6 ? 'flex' : 'none', justifyContent: 'flex-start',
        backgroundColor: 'transparent', borderColor: 'transparent',
      }}>
      {printatendimentos.map(item => Component(item))}
    </div>
  )
};

export default Print;