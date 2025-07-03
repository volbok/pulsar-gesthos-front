import axios from 'axios';

// função que transforma os últimos dados da evolução em objetos para envio ao gestHos.
const sendObgesthos = (obgesthos, setobgesthos) => {
  var obj = {
    "credenciais":
    {
      "empresa": "13.025.354/0001-32",
      "usuario": "AABBCCDD",
      "password": "AABBCCDD"
    },
    "registro": obgesthos
  }

  var html = 'https://pulsar-gesthos-api.up.railway.app/echopulsar'
  axios.post(html, obj).then((response) => {
    if (response === 'SUCESSO') {
      console.log('OBJETO(S) ENTREGUE(S) COM SUCESSO');
      console.log(obgesthos.length);
      setobgesthos([]);
    }
  })
}

export default sendObgesthos;