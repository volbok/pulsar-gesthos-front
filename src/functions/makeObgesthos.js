import moment from 'moment';
// import axios from 'axios';

// função que transforma os últimos dados da evolução em objetos para envio ao gestHos.
const makeObgesthos = (prontuario, atendimento, grupo, item, valor, usuario, obgesthos) => {

  var obj = {
    documento:
    {
      data: moment().format('DD/MM/YYYY'),
      hora: moment().format('HH:MM:SS'),
      prontuario: prontuario,
      atendimento: atendimento,
      grupo: grupo,
      item: item,
      valor: valor.pop(),
      usuario: usuario.cpf_usuario,
    }
  }

  obgesthos.push(obj);
  console.log(obj);

  /*
  ## REGISTRANDO O "OBGESTHOS" NO BANCO PULSAR, PARA QUE O USUÁRIO NÃO PERCA OS REGISTROS NO CASO DE INTERRUPÇÃO DO USO DA APLICAÇÃO ##
  // checar se já existe um obgesthos para o usuário logado.
  var html = 'https://pulasr-gesthos-api.herokuapp.com/'
  axios.get(html + 'get_obgesthos/' + usuario.cpf_usuario).then((response) => {
    var x = [0, 1];
    x = response.data.rows;
    console.log(JSON.stringify(x.length));
    // já existe registro obgesthos.
    if (x.length > 0) {
      // recuperando o último registro de obgesthos do usuário.
      let y = x.slice(-1);
      let id = y.map(item => item.id).pop();
      // update do registro.
      let objeto = {
        usuario: usuario.cpf_usuario,
        valor: JSON.stringify(obgesthos),
      }
      axios.post(html + 'update_obgesthos/' + id, objeto);
      // não existe resgistro obgesthos.
    } else {
      let objeto = {
        usuario: usuario.cpf_usuario,
        valor: JSON.stringify(obgesthos),
      }
      axios.post(html + 'insert_obgesthos', objeto);
    }
  });
  */
}

export default makeObgesthos;