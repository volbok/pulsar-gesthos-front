import './App.css';
import './design.css';
// import 'animate.css';
import React, { useState } from 'react';
import Context from './pages/Context';
// páginas.
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Passometro from './pages/Passometro';
import Settings from './pages/Settings';
import Usuarios from './pages/Usuarios';
import Pdf from './pages/Pdf';
import Prescricao from './pages/Prescricao';
// componentes.
import Toast from './components/Toast';
import Modal from './components/Modal';
import DatePicker from './components/DatePicker';

// router.
import {
  // BrowserRouter as Router, >> pode usar fora do githubPages.
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

function App() {
  // api.
  // var html = 'https://pulsar-api-hsf.up.railway.app/'
  var html = 'https://pulasr-gesthos-api.herokuapp.com/'

  // estados do context.
  const [toast, settoast] = useState({ display: 'none', mensagem: '', cor: 'transparent' });
  const [dialogo, setdialogo] = useState({ id: 0, mensagem: '', funcao: null });

  const [viewdatepicker, setviewdatepicker] = useState(0);
  const [pickdate1, setpickdate1] = useState();
  const [pickdate2, setpickdate2] = useState();

  const [unidades, setunidades] = useState([]);
  const [hospital, sethospital] = useState([]);
  const [unidade, setunidade] = useState([]);
  const [usuario, setusuario] = useState({});

  const [pagina, setpagina] = useState(0);

  // configuração de tema e cards visíveis.
  const [settings, setsettings] = useState([]);
  const [tema, settema] = useState(1);
  const [carddiasinternacao, setcarddiasinternacao] = useState(1);
  const [cardalergias, setcardalergias] = useState(1);
  const [cardanamnese, setcardanamnese] = useState(1);
  const [cardevolucoes, setcardevolucoes] = useState(1);
  const [cardpropostas, setcardpropostas] = useState(1);
  const [cardprecaucoes, setcardprecaucoes] = useState(1);
  const [cardriscos, setcardriscos] = useState(1);
  const [cardalertas, setcardalertas] = useState(1);
  const [cardsinaisvitais, setcardsinaisvitais] = useState(1);
  const [cardbody, setcardbody] = useState(1);
  const [cardvm, setcardvm] = useState(1);
  const [cardinfusoes, setcardinfusoes] = useState(1);
  const [carddieta, setcarddieta] = useState(1);
  const [cardculturas, setcardculturas] = useState(1);
  const [cardatb, setcardatb] = useState(1);
  const [cardinterconsultas, setcardinterconsultas] = useState(1);
  const [cardexames, setcardexames] = useState(1);
  const [cardprescricao, setcardprescricao] = useState(1);

  // estado para seleção dos cards do passômetro.
  const [card, setcard] = useState('');

  const [pacientes, setpacientes] = useState([]); // lista de pacientes.
  const [paciente, setpaciente] = useState([]); // id do paciente selecionado.
  const [atendimentos, setatendimentos] = useState([]); // lista de atendimentos.
  const [atendimento, setatendimento] = useState(null); // número do atendimento selecionado.
  const [prontuario, setprontuario] = useState(null); // número do prontuário selecionado.

  const [assistenciais, setassistenciais] = useState([]);

  // integrações com GESTHOS.
  const [assistencial, setassistencial] = useState([]);
  const [documento, setdocumento] = useState([]); // dados vitais, controles.
  const [precaucao, setprecaucao] = useState([]); // precauções de contato.
  const [exame, setexame] = useState([]); // exame laboratorial. 

  const [pas, setpas] = useState([]);
  const [pad, setpad] = useState([]);
  const [fc, setfc] = useState([]);
  const [fr, setfr] = useState([]);
  const [sao2, setsao2] = useState([]);
  const [tax, settax] = useState([]);
  const [glicemia, setglicemia] = useState([]);
  const [diurese, setdiurese] = useState([]);
  const [evacuacao, setevacuacao] = useState([]);
  const [estase, setestase] = useState([]);
  const [balancohidrico, setbalancohidrico] = useState([]);
  const [balancoacumulado, setbalancoacumulado] = useState(0);

  const [alergias, setalergias] = useState([]);
  const [lesoes, setlesoes] = useState([]);
  const [precaucoes, setprecaucoes] = useState([]);
  const [riscos, setriscos] = useState([]);
  const [culturas, setculturas] = useState([]);
  const [arrayculturas, setarrayculturas] = useState([]);
  const [antibioticos, setantibioticos] = useState([]);
  const [arrayantibioticos, setarrayantibioticos] = useState([]);
  const [dietas, setdietas] = useState([]);
  const [evolucoes, setevolucoes] = useState([]);
  const [arrayevolucoes, setarrayevolucoes] = useState([]);
  const [infusoes, setinfusoes] = useState([]);
  const [invasoes, setinvasoes] = useState([]);
  const [propostas, setpropostas] = useState([]);
  const [arraypropostas, setarraypropostas] = useState([]);
  const [sinaisvitais, setsinaisvitais] = useState([]);
  const [vm, setvm] = useState([]);
  const [interconsultas, setinterconsultas] = useState([]);

  const [prescricao, setprescricao] = useState([]);

  // o incrível tesseract.
  const [viewtesseract, setviewtesseract] = useState(0);
  const [tesseracttext, settesseracttext] = useState('');

  // resolvendo a responsividade para o innerHeight nos celulares.
  const [altura, setaltura] = useState(`${window.innerHeight}px`);
  const documentHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
  }
  window.addEventListener('resize', documentHeight)
  documentHeight();

  window.history.pushState({ page: 1 }, "", "");
  window.onpopstate = function (event) {
    if (event) {
      window.history.pushState({ page: 1 }, "", "");
    }
  }

  return (
    <Context.Provider
      value={{
        html,

        toast, settoast,
        dialogo, setdialogo,

        viewdatepicker, setviewdatepicker,
        pickdate1, setpickdate1,
        pickdate2, setpickdate2,

        unidades, setunidades,
        hospital, sethospital,
        unidade, setunidade,
        usuario, setusuario,

        pagina, setpagina,

        settings, setsettings,
        tema, settema,
        carddiasinternacao, setcarddiasinternacao,
        cardalergias, setcardalergias,
        cardanamnese, setcardanamnese,
        cardevolucoes, setcardevolucoes,
        cardpropostas, setcardpropostas,
        cardprecaucoes, setcardprecaucoes,
        cardriscos, setcardriscos,
        cardalertas, setcardalertas,
        cardsinaisvitais, setcardsinaisvitais,
        cardbody, setcardbody,
        cardvm, setcardvm,
        cardinfusoes, setcardinfusoes,
        carddieta, setcarddieta,
        cardculturas, setcardculturas,
        cardatb, setcardatb,
        cardinterconsultas, setcardinterconsultas,
        cardexames, setcardexames,
        cardprescricao, setcardprescricao,

        card, setcard,

        pacientes, setpacientes,
        paciente, setpaciente,
        atendimentos, setatendimentos,
        prontuario, setprontuario,
        assistenciais, setassistenciais,
        // controles/sinais vitais.
        assistencial, setassistencial,
        documento, setdocumento,
        precaucao, setprecaucao,
        exame, setexame,
        pas, setpas,
        pad, setpad,
        fc, setfc,
        fr, setfr,
        sao2, setsao2,
        tax, settax,
        glicemia, setglicemia,
        diurese, setdiurese,
        evacuacao, setevacuacao,
        estase, setestase,
        balancohidrico, setbalancohidrico,
        balancoacumulado, setbalancoacumulado,

        atendimento, setatendimento,

        alergias, setalergias,
        lesoes, setlesoes,
        precaucoes, setprecaucoes,
        riscos, setriscos,
        culturas, setculturas,
        arrayculturas, setarrayculturas,
        antibioticos, setantibioticos,
        arrayantibioticos, setarrayantibioticos,
        dietas, setdietas,
        evolucoes, setevolucoes,
        arrayevolucoes, setarrayevolucoes,
        infusoes, setinfusoes,
        invasoes, setinvasoes,
        propostas, setpropostas,
        arraypropostas, setarraypropostas,
        sinaisvitais, setsinaisvitais,
        vm, setvm,
        interconsultas, setinterconsultas,
        prescricao, setprescricao,
        altura, setaltura,
        viewtesseract, setviewtesseract,
        tesseracttext, settesseracttext,
      }}
    >
      <div>
        <Router>
          <Switch>
            <Route exact path="/">
              <Login></Login>
            </Route>
            <Route path="/passometro">
              <Passometro></Passometro>
            </Route>
            <Route path="/pdf">
              <Pdf></Pdf>
            </Route>
            <Route path="/cadastro">
              <Cadastro></Cadastro>
            </Route>
            <Route path="/settings">
              <Settings></Settings>
            </Route>
            <Route path="/usuarios">
              <Usuarios></Usuarios>
            </Route>
            <Route path="/prescricao">
              <Prescricao></Prescricao>
            </Route>
          </Switch>
        </Router>
        <Toast></Toast>
        <Modal></Modal>
        <DatePicker></DatePicker>
      </div>
    </Context.Provider>
  );
}

export default App;