/* eslint eqeqeq: "off" */
import React, { useContext, useEffect, useState } from 'react';
import Context from '../pages/Context';
import moment from 'moment';
// imagens.
import back from '../images/back.svg';

function Alertas() {

  // context.
  const {

    card, setcard,

    // alerta para invasões antigas.
    // alerta para risco de pavm.
    invasoes,

    // alerta para culturas pendentes.
    // alerta para solicitar cultura de controle se germe gram-positivo.
    culturas,

    // alerta para antibióticos em uso por tempo prolongado.
    antibioticos,

    // alerta para início de dieta enteral para o paciente intubado.
    dietas,

    // alerta para risco de sepse.
    // alerta para redução do débito urinário.
    // alerta para ausência de evacuações.
    // alerta para interrupção da dieta se estase.
    pas,
    pad,
    fc,
    fr,
    sao2,
    tax,
    glicemia,
    diurese,
    evacuacao,
    estase,
    balancohidrico,

  } = useContext(Context);

  let yellow = '#F1C40F';

  // Pendência: criar alerta de hipoglicemia!

  // obtendo últimos dados vitais do GESTHOS.
  const [lastpas, setlastpas] = useState(null);
  const [lastpad, setlastpad] = useState(null);
  const [lastpam, setlastpam] = useState(null);
  const [lastfc, setlastfc] = useState(null);
  const [lastfr, setlastfr] = useState(null);
  const [lastsao2, setlastsao2] = useState(null);
  const [lasttax, setlasttax] = useState(null);
  const [lastdiurese, setlastdiurese] = useState(null);
  const [lastbalancohidrico, setlastbalancohidrico] = useState(null);
  const [lastestase, setlastestase] = useState(0);
  const [lastglicemia, setlastglicemia] = useState(null);

  useEffect(() => {
    if (card == 'card-alertas') {
      setlastpas(pas.slice(-1).map(item => item.valor));
      setlastpad(pad.slice(-1).map(item => item.valor));
      setlastpam(Math.ceil(((2 * parseInt(lastpad)) + parseInt(lastpas)) / 3));
      setlastfc(fc.slice(-1).map(item => item.valor));
      setlastfr(fr.slice(-1).map(item => item.valor));
      setlastsao2(sao2.slice(-1).map(item => item.valor));
      setlasttax(tax.slice(-1).map(item => item.valor));
      setlastdiurese(diurese.slice(-1).map(item => item.valor));
      setlastbalancohidrico(balancohidrico.slice(-1).map(item => item.valor));
      setlastestase(estase.slice(-1).map(item => item.valor));
      setlastglicemia(glicemia.slice(-1).map(item => item.valor));
    }
    // eslint-disable-next-line
  }, [card]);

  var height = 150;
  var heightmobile = '40vw'
  var width = 150;
  var widthmobile = '34vw'

  function AlertaInvasoes() {
    return (
      <div id='alerta_invasoes' style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
      }}>
        {invasoes.filter(item => item.data_retirada == null && moment().diff(item.data_implante, 'days') > 15).map(item => (
          <div className='button-red' key={'invasoes ' + item.id_invasao}
            style={{
              height: window.innerWidth < 426 ? heightmobile : height,
              width: window.innerWidth < 426 ? widthmobile : width,
              backgroundColor: yellow,
            }}>
            {'TEMPO PROLONGADO DE INVASÃO: ' + item.dispositivo + ' EM ' + item.local + ' - ' + moment().diff(item.data_implante, 'days') + ' DIAS.'}
          </div>
        ))}
      </div>
    )
  }
  function AlertaPavm() {
    return (
      <div id='alerta_pavm'>
        {invasoes.filter(item => item.data_retirada == null && (item.dispositivo == 'TOT' || item.dispositivo == 'TQT')).map(item => (
          <div className='button-red'
            style={{
              height: window.innerWidth < 426 ? heightmobile : height,
              width: window.innerWidth < 426 ? widthmobile : width,
              backgroundColor: 'purple',
            }}
          >
            {'RISCO DE PNEUMONIA ASSOCIADA A VENTILAÇÃO MECÂNICA: ' + item.dispositivo + '.'}
          </div>
        ))}
      </div>
    )
  }
  function AlertaSepse() {
    if (lastpam != '' && lastfc != '' && lastfr != '' && lasttax != '' && lastdiurese != '' &&
      lastpam < 70 && (lastfc > 100 || lastfr > 22 || lasttax != 'afebril' || lastdiurese < 500)) {
      return (
        <div id='alerta_sepse'
          className='button-red'
          style={{
            height: window.innerWidth < 426 ? heightmobile : height,
            width: window.innerWidth < 426 ? widthmobile : width,
            backgroundColor: 'red',
            display: 'flex', flexDirection: 'column',
          }}
        >
          <div>{'CRITÉRIOS DE SEPSE!'}</div>
          <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center',
            flexWrap: 'wrap', marginTop: 10
          }}>
            <div style={{ display: lastpam < 70 ? 'flex' : 'none' }}>{'PAM: ' + lastpam + ' mmHg'}</div>
            <div style={{ display: lastfc > 100 ? 'flex' : 'none' }}>{'FC: ' + lastfc + ' bpm'}</div>
            <div style={{ display: lastfr > 22 ? 'flex' : 'none' }}>{'FR: ' + lastfr + ' irpm'}</div>
            <div style={{ display: lasttax < 36 || lasttax > 38 ? 'flex' : 'none' }}>{'TAX: ' + lasttax + 'ºC'}</div>
            <div style={{ display: lastdiurese < 500 ? 'flex' : 'none' }}>{'DIURESE: ' + lastdiurese + ' ml'}</div>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
  function AlertaDadosVitais() {
    return (
      <div id='alerta_dados'
        className='button-red'
        style={{
          height: window.innerWidth < 426 ? heightmobile : height,
          width: window.innerWidth < 426 ? widthmobile : width,
          display: lastpam != '' && lastfc != '' && lastfr != '' && lasttax != '' && lastsao2 != '' &&
            (lastpam < 70 || lastpam > 100 ||
              lastfc < 50 || lastfc > 130 ||
              lastfr < 15 || lastfr > 24 ||
              lasttax < 35 || lasttax > 38 ||
              lastsao2 < 90) ?
            'flex' : 'none',
          flexDirection: 'column',
          backgroundColor: yellow,
        }}
      >
        <div style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'center',
          flexWrap: 'wrap', marginTop: 10
        }}>
          <div style={{ display: lastpam < 70 && lastpam != '' ? 'flex' : 'none' }}>{'HIPOTENSÃO: PAM ' + lastpam + ' mmHg'}</div>
          <div style={{ display: lastpam > 100 && lastpam != '' ? 'flex' : 'none' }}>{'HIPERTENSÃO: PAM ' + lastpam + ' mmHg'}</div>
          <div style={{ display: lastfc < 50 && lastfc != '' ? 'flex' : 'none' }}>{'BRADICARDIA: FC ' + lastfc + ' bpm'}</div>
          <div style={{ display: lastfc > 130 && lastfc != '' ? 'flex' : 'none' }}>{'TAQUICARDIA: FC ' + lastfc + ' bpm'}</div>
          <div style={{ display: lastfr < 15 && lastfr != '' ? 'flex' : 'none' }}>{'BRADIPNÉIA: FR ' + lastfr + ' irpm'}</div>
          <div style={{ display: lastfr > 24 && lastfr != '' ? 'flex' : 'none' }}>{'TAQUIPNÉIA: FR ' + lastfr + ' irpm'}</div>
          <div style={{ display: lasttax < 35 && lasttax != '' ? 'flex' : 'none' }}>{'HIPOTERMIA: TAX ' + lasttax + 'ºC'}</div>
          <div style={{ display: lasttax > 38 && lasttax != '' ? 'flex' : 'none' }}>{'HIPERTERMIA TAX ' + lasttax + 'ºC'}</div>
          <div style={{ display: lastsao2 < 90 && lastsao2 != '' ? 'flex' : 'none' }}>{'DESSATURAÇÃO SAO2 ' + lastsao2 + '%'}</div>
        </div>
      </div>
    )
  }
  function AlertaDiureseBalanco() {
    return (
      <div id='alerta_diurese&balanco'
        className='button-red'
        style={{
          height: window.innerWidth < 426 ? heightmobile : height,
          width: window.innerWidth < 426 ? widthmobile : width,
          /*
          display: lastdiurese != '' && lastbalancohidrico != '' &&
            (lastdiurese < 500 || lastdiurese > 1500 || lastbalancohidrico < -1500 || lastbalancohidrico > 1000) ?
            'flex' : 'none',
          */
          display: lastdiurese != '' &&
            (lastdiurese < 500 || lastdiurese > 1500) ?
            'flex' : 'none',
          flexDirection: 'column',
          backgroundColor: yellow,
        }}
      >
        <div style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'center',
          flexWrap: 'wrap', marginTop: 10
        }}>
          <div style={{ display: lastdiurese != '' && lastdiurese < 500 ? 'flex' : 'none' }}>{'DÉBITO URINÁRIO REDUZIDO: ' + lastdiurese + ' ml/12h'}</div>
          <div style={{ display: lastdiurese != '' && lastdiurese > 1500 ? 'flex' : 'none' }}>{'DÉBITO URINÁRIO AUMENTADO: ' + lastdiurese + ' ml/12h'}</div>
          <div
            style={{
              display: 'none',
              // display: lastbalancohidrico != '' && lastbalancohidrico < -1500 ? 'flex' : 'none'
            }}>
            {'BALANÇO HÍDRICO MUITO NEGATIVO: ' + lastbalancohidrico + ' ml/12h'}
          </div>
          <div
            style={{
              display: 'none',
              // display: lastbalancohidrico != '' && lastbalancohidrico > 1000 ? 'flex' : 'none'
            }}>
            {'BALANÇO HÍDRICO MUITO POSITIVO: ' + lastbalancohidrico + ' ml/12h'}
          </div>
        </div>
      </div>
    )
  }
  function AlertaEstase() {
    return (
      <div id='alerta_estase'
        className='button-red'
        style={{
          height: window.innerWidth < 426 ? heightmobile : height,
          width: window.innerWidth < 426 ? widthmobile : width,
          display: lastestase != 'Ausente' ? 'flex' : 'none',
          flexDirection: 'column',
          backgroundColor: yellow,
        }}
      >
        <div style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'center',
          flexWrap: 'wrap', marginTop: 10
        }}>
          <div>{'ESTASE GÁSTRICA: ' + lastestase + '.'}</div>
          <div style={{ display: 'flex' }}>{'CONSIDERAR USO DE PROCINÉTICOS.'}</div>
          <div style={{ display: dietas.map(item => item.tipo) == 'SNE' ? 'flex' : 'none' }}>{'CONSIDERAR REDUÇÃO OU SUSPENSÃO DA DIETA ENTERAL.'}</div>
        </div>
      </div>
    )
  }
  function AlertaEvacuacao() {
    return (
      <div id='alerta_evacuacao'
        className='button-red'
        style={{
          height: window.innerWidth < 426 ? heightmobile : height,
          width: window.innerWidth < 426 ? widthmobile : width,
          display: evacuacao.slice(-1).filter(item =>
            item.valor.includes('DIARR') == true ||
            item.valor.includes('3x ao') == true ||
            item.valor.includes('N/A') == true ||
            item.valor.includes('AUSEN') == true).length > 2 ? 'flex' : 'none',
          flexDirection: 'column',
          backgroundColor: yellow,
        }}
      >
        <div style={{
          display: evacuacao.slice(-1).map(item =>
            item.valor.includes('ausentes') == true) ? 'flex' : 'none',
          flexDirection: 'row', justifyContent: 'center',
          flexWrap: 'wrap', marginTop: 10
        }}>
          {'EVACUAÇÕES AUSENTES'}
        </div>

        <div style={{
          display: evacuacao.slice(-1).map(item =>
            item.valor.includes('> 4x ao dia') == true) ? 'flex' : 'none',
          flexDirection: 'row', justifyContent: 'center',
          flexWrap: 'wrap', marginTop: 10
        }}>
          {'MAIOR NÚMERO DE EVACUAÇÕES OU DIARRÉIA'}
        </div>
      </div>
    )
  }
  function AlertaDietaVm() {
    return (
      <div id='alerta_vm'
        className='button-red'
        style={{
          height: window.innerWidth < 426 ? heightmobile : height,
          width: window.innerWidth < 426 ? widthmobile : width,
          display:
            dietas.filter(item => item.tipo == 'SUSPENSA' || item.tipo == 'ORAL' || item.tipo == 'NÃO DEFINIDA').length > 0 &&
              (invasoes.filter(item => item.dispositivo == 'TOT' && item.data_retirada == null).length > 0) ?
              'flex' : 'none',
          flexDirection: 'column',
          backgroundColor: yellow,
        }}
      >
        <div>{'PACIENTE EM VENTILAÇÃO MECÂNICA E SEM DIETA ENTERAL PRESCRITA'}</div>
      </div>
    )
  }
  function AlertaCulturas() {
    return (
      <div id='alerta_culturas'
        className='button-red'
        style={{
          display: culturas.filter(item => item.data_resultado == null).length > 0 ? 'flex' : 'none',
          height: window.innerWidth < 426 ? heightmobile : height,
          width: window.innerWidth < 426 ? widthmobile : width,
          flexDirection: 'column',
          backgroundColor: yellow,
        }}
      >
        {'COBRAR CULTURAS EM ABERTO: ' + culturas.filter(item => item.data_resultado == null).length}
      </div>
    )
  }
  function AlertaAntibioticos() {
    return (
      <div id='alerta_antibioticos'
        style={{
          display: antibioticos.filter(item => item.data_termino == null && moment().diff(moment(item.data_inicio), 'days') > 7).length > 0 ? 'flex' : 'none',
          flexDirection: 'row',
          flexWrap: 'wrap', margin: 0,
        }}>
        {antibioticos.filter(item => item.data_termino == null && moment().diff(moment(item.data_inicio), 'days') > 7)
          .map(item => (
            <div className='button-red' key={'alertaatb ' + item.id_antibiotico}
              style={{
                display: 'flex',
                height: window.innerWidth < 426 ? heightmobile : height,
                width: window.innerWidth < 426 ? widthmobile : width,
                flexDirection: 'column',
                backgroundColor: yellow,
              }}
            >
              <div style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
              }}>
                <div>{'ANTIBIÓTICO POR TEMPO DE USO PROLONGADO:'}</div>
                <div>{item.antibiotico}</div>
              </div>
            </div>
          ))}
      </div>
    )
  }
  function AlertaCgp() {
    return (
      <div id='alerta_cgp'
        style={{
          display: culturas.filter(item => JSON.stringify(item.resultado).includes('CGP') || JSON.stringify(item.resultado).includes('COCOS GRAM-POSITIVOS')).length > 0 ? 'flex' : 'none',
          flexDirection: 'row', flexWrap: 'wrap',
        }}>
        {culturas.filter(item => JSON.stringify(item.resultado).includes('CGP') || JSON.stringify(item.resultado).includes('COCOS GRAM-POSITIVOS') || JSON.stringify(item.resultado).includes('STREPTO') || JSON.stringify(item.resultado).includes('STAPHYLO'))
          .map(item => (
            <div
              key={'culturas ' + item.resultado}
              className='button-red'
              style={{
                display: 'flex',
                flexDirection: 'column', justifyContent: 'center',
                height: window.innerWidth < 426 ? heightmobile : height,
                width: window.innerWidth < 426 ? widthmobile : width,
                backgroundColor: yellow,
              }}>
              <div>{'COCOS GRAM-POSITIVOS ISOLADOS EM:'}</div>
              <div style={{ margin: 5, marginLeft: 0, marginRight: 0 }}>
                {item.material + ' ' + moment(item.data_pedido).format('DD/MM/YY')}
              </div>
              <div>{'SOLICITAR CULTURA DE CONTROLE.'}</div>
            </div>
          ))}
      </div>
    )
  }
  function AlertaGlicemia() {
    return (
      <div id='alerta_glicemia'
        className='button-red'
        style={{
          height: window.innerWidth < 426 ? heightmobile : height,
          width: window.innerWidth < 426 ? widthmobile : width,
          display: lastglicemia != '' &&
            (lastglicemia < 70 || lastglicemia > 200) ?
            'flex' : 'none',
          flexDirection: 'column',
          backgroundColor: yellow,
        }}
      >
        <div style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'center',
          flexWrap: 'wrap', marginTop: 10
        }}>
          <div style={{ display: lastglicemia != '' && lastglicemia > 200 ? 'flex' : 'none' }}>{'HIPERGLICEMIA: ' + lastglicemia + ' ml'}</div>
          <div style={{ display: lastglicemia != '' && lastglicemia < 80 ? 'flex' : 'none' }}>{'HIPOGLICEMIA: ' + lastglicemia + ' ml'}</div>
        </div>
      </div>
    )
  }
  return (
    <div id="scroll-alertas"
      className='card-aberto'
      style={{ display: card == 'card-alertas' ? 'flex' : 'none' }}
    >
      <div className="text3">
        ALERTAS
      </div>
      <div
        style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'center',
          flexWrap: 'wrap', width: '100%'
        }}>
        <AlertaInvasoes></AlertaInvasoes>
        <AlertaPavm></AlertaPavm>
        <AlertaSepse></AlertaSepse>
        <AlertaDadosVitais></AlertaDadosVitais>
        <AlertaDiureseBalanco></AlertaDiureseBalanco>
        <AlertaEstase></AlertaEstase>
        <AlertaEvacuacao></AlertaEvacuacao>
        <AlertaCulturas></AlertaCulturas>
        <AlertaCgp></AlertaCgp>
        <AlertaGlicemia></AlertaGlicemia>
        <AlertaAntibioticos></AlertaAntibioticos>
        <AlertaDietaVm></AlertaDietaVm>
      </div>
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
  )
}

export default Alertas;
