/* eslint eqeqeq: "off" */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Context from './Context';
// funções.
import toast from '../functions/toast';
import checkinput from '../functions/checkinput';
// imagens.
import salvar from '../images/salvar.svg';
// componentes.
import Logo from '../components/Logo';
// router.
import { useHistory } from 'react-router-dom';

function Login() {

  // context.
  const {
    html,
    pagina, setpagina,
    settoast,
    setusuario, usuario,
  } = useContext(Context);

  // history (router).
  let history = useHistory();

  useEffect(() => {
    if (pagina == 0) {
      setusuario(
        {
          id: 0,
          nome_usuario: 'LOGOFF',
          dn_usuario: null,
          cpf_usuario: null,
          email_usuario: null,
        });
      setviewlistaunidades(0);
      axios.get(html).then((response) => {
        console.log(response.data.info);
      })
    }
    // eslint-disable-next-line
  }, [pagina]);

  // checando se o usuário inserido está registrado no sistema.
  let user = null;
  let password = null;
  var timeout = null;
  const checkLogin = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      user = document.getElementById('inputUsuario').value
      password = document.getElementById('inputSenha').value
      var obj = {
        usuario: user,
        senha: password,
      }
      axios.post(html + 'checkusuario', obj).then((response) => {
        var x = [];
        x = response.data;
        // armazenando o token no localStorage.
        localStorage.setItem("token", x.token);

        // adicionando o token ao header.
        setAuthToken(x.token);

        if (x.auth == true) {
          toast(settoast, 'OLÁ, ' + x.nome.split(' ', 1), 'rgb(82, 190, 128, 1)', 3000);
          setusuario(
            {
              id: x.id,
              nome_usuario: x.nome,
              dn_usuario: x.dn,
              cpf_usuario: x.cpf,
              email_usuario: x.email
            }
          );
          setviewautenticacao(1);
        } else {
          toast(settoast, 'USUÁRIO OU SENHA INCORRETOS', 'rgb(231, 76, 60, 1)', 3000);
        }

      }).catch(function () {
        toast(settoast, 'ERRO DE CONEXÃO, REINICIANDO APLICAÇÃO.', 'black', 5000);
        setTimeout(() => {
          setpagina(0);
          history.push('/');
        }, 5000);
      });
    }, 1000);
  }

  // forma mais inteligente de adicionar o token ao header de todas as requisições.
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }
    else
      delete axios.defaults.headers.common["Authorization"];
  }

  // inputs para login e senha.
  const [viewlistaunidades, setviewlistaunidades] = useState(0);
  const [viewautenticacao, setviewautenticacao] = useState(0);
  const [viewalterarsenha, setviewalterarsenha] = useState(0);
  const Inputs = useCallback(() => {
    return (
      <div style={{
        display: viewautenticacao == 1 ? 'none' : 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <input
          autoComplete="off"
          placeholder="USUÁRIO"
          className="input"
          type="text"
          id="inputUsuario"
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = 'USUÁRIO')}
          // eslint-disable-next-line
          onChange={(e) => (user = e.target.value)}
          style={{
            marginTop: 10,
            marginBottom: 10,
            width: 200,
            height: 50,
          }}
        ></input>
        <input
          autoComplete="off"
          placeholder="SENHA"
          className="input"
          type="password"
          id="inputSenha"
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = 'SENHA')}
          // eslint-disable-next-line
          onChange={(e) => { password = e.target.value; checkLogin() }}
          style={{
            marginTop: 10,
            marginBottom: 10,
            width: 200,
            height: 50,
          }}
        ></input>
      </div>
    )
  }, [viewlistaunidades, viewalterarsenha])

  // ## TROCA DE SENHA ## //
  // atualizar usuário.
  const updateUsuario = () => {
    let novasenha = document.getElementById("inputNovaSenha").value;
    let repetesenha = document.getElementById("inputConfirmaSenha").value;

    if (novasenha == repetesenha) {
      var obj = {
        nome_usuario: usuario.nome_usuario,
        dn_usuario: usuario.dn_usuario,
        cpf_usuario: usuario.cpf_usuario,
        email_usuario: usuario.email_usuario,
        senha: novasenha,
        login: usuario.cpf_usuario,
      }
      axios.post(html + 'update_usuario/' + usuario.id, obj).then(() => {
        setviewalterarsenha(0);
        toast(settoast, 'SENHA ATUALIZADA COM SUCESSO NA BASE PULSAR', 'rgb(82, 190, 128, 1)', 3000);
      })
        .catch(function () {
          toast(settoast, 'ERRO DE CONEXÃO, REINICIANDO APLICAÇÃO.', 'black', 5000);
          setTimeout(() => {
            setpagina(0);
            history.push('/');
          }, 5000);
        });
    } else {
      document.getElementById("inputNovaSenha").value = '';
      document.getElementById("inputConfirmaSenha").value = '';
      document.getElementById("inputNovaSenha").focus();
      toast(settoast, 'SENHA REPETIDA NÃO CONFERE', 'rgb(231, 76, 60, 1)', 3000);
    }
  }

  // componente para alteração da senha:
  function AlterarSenha() {
    return (
      <div style={{
        display: viewalterarsenha == 1 ? 'flex' : 'none',
        flexDirection: 'column', justifyContent: 'center'
      }}>
        <div className='text3' style={{ color: 'white', fontSize: 16 }}>{usuario.nome_usuario}</div>
        <div className='text1' style={{ color: 'white' }}>DIGITE A NOVA SENHA</div>
        <input
          autoComplete="off"
          placeholder="NOVA SENHA"
          className="input"
          type="password"
          id="inputNovaSenha"
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = 'NOVA SENHA')}
          style={{
            marginTop: 10,
            marginBottom: 10,
            width: 200,
            height: 50,
          }}
        ></input>
        <div className='text1' style={{ color: 'white' }}>CONFIRME A NOVA SENHA</div>
        <input
          autoComplete="off"
          placeholder="REPITA SENHA"
          className="input"
          type="password"
          id="inputConfirmaSenha"
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = 'REPITA SENHA')}
          style={{
            marginTop: 10,
            marginBottom: 10,
            width: 200,
            height: 50,
          }}
        ></input>
        <div id="btnTrocarSenha" title="ALTERAR SENHA" className="button-green"
          onClick={() => {
            if (document.getElementById('inputNovaSenha').value != document.getElementById('inputConfirmaSenha').value) {
              toast(settoast, 'SENHAS NÃO CONFEREM, REPITA O PROCESSO.', 'red', 2000);
              document.getElementById('inputConfirmaSenha').value = '';
              document.getElementById('inputNovaSenha').value = '';
              setTimeout(() => {
                document.getElementById('inputNovaSenha').focus();
              }, 2000);
            } else {
              checkinput('input', settoast, ['inputNovaSenha', 'inputConfirmaSenha'], 'btnTrocarSenha', updateUsuario, []);
            }
          }}
          style={{ width: 50, height: 50, alignSelf: 'center' }}
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
    )
  }

  return (
    <div className={"main cor1"}
      style={{
        display: pagina == 0 ? 'flex' : 'none',
        overflowY: 'auto',
      }}>
      <div className='fedein'
        style={{
          display: viewalterarsenha == 1 ? 'none' : 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <div className="text2"
          style={{
            display: window.innerWidth < 426 && viewalterarsenha == 1 ? 'none' : 'flex',
          }}>
          <Logo height={100} width={100}></Logo>
        </div>
        <div className="text2"
          style={{
            display: window.innerWidth < 426 && viewalterarsenha == 1 ? 'none' : 'flex',
            margin: 20, fontSize: 20
          }}>
          PULSAR
        </div>
      </div>
      <Inputs></Inputs>
      <div id="botão de autenticação"
        className='button'
        style={{
          display: viewautenticacao == 1 && viewalterarsenha == 0 ? 'flex' : 'none',
          padding: 5, width: 100,
        }}
        onClick={() => {
          setpagina(1);
          history.push('/passometro');
          // armazenando o context na localStorage.
          localStorage.setItem('usuario', usuario);
        }}>
        ENTRAR
      </div>
      <div id="alterar senha"
        className='text1'
        style={{
          display: viewautenticacao == 1 ? 'flex' : 'none',
          textDecoration: 'underline',
          color: 'white',
          marginTop: window.innerWidth < 426 && viewalterarsenha == 1 ? 20 : 0,
        }}
        onClick={() => {
          if (viewalterarsenha == 1) {
            setviewalterarsenha(0);
          } else {
            setviewalterarsenha(1);
          }
        }}
      >
        ALTERAR SENHA
      </div>
      <AlterarSenha></AlterarSenha>
    </div>
  );
}

export default Login;