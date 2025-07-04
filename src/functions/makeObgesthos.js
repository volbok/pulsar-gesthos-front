import moment from 'moment';
import axios from 'axios';

// função que transforma os últimos dados da evolução em objetos para envio ao gestHos.
const makeObgesthos = (prontuario, atendimento, grupo, item, valor, usuario, obgesthos) => {
  console.log('FUNÇÃO MAKE OBGESTHOS ENVIADA.');
  var obj = {
    data: moment().format('DD/MM/YYYY'),
    hora: moment().format('HH:mm:ss'),
    prontuario: prontuario,
    atendimento: atendimento,
    grupo: grupo,
    item: item,
    valor: valor.pop(),
    usuario: usuario.id_usuario,
    moment: moment().format('DD/MM/YYYY - HH:mm:ss')
  }

  obgesthos.push(obj);
  console.log(obj);

  // registrando o objeto no banco de dados Pulsar.
  var html = 'https://pulsar-gesthos-api.up.railway.app/'
  axios.post(html + 'insert_obgesthos', obj).then(() => {
    console.log('VAI.')
  });
}

export default makeObgesthos;