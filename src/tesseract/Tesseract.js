/* eslint eqeqeq: "off" */
import React, { useContext, useEffect, useRef } from 'react';
import Context from '../pages/Context';
import Tesseract from 'tesseract.js';
// imagens.
import back from '../images/back.svg';

function MyTesseract() {

  // context.
  const {
    viewtesseract, setviewtesseract,
    tesseracttext, settesseracttext,
  } = useContext(Context);

  useEffect(() => {
    if (viewtesseract == 1) {
      startCamera();
    }
    // eslint-disable-next-line
  }, [viewtesseract]);

  let image_data_url = '';
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((error) => {
        console.log("Algo deu errado! " + error);
      });
  }

  const stopCamera = () => {
    let video = videoRef.current;
    video.srcObject.getVideoTracks().forEach(track => track.stop());
  }

  const recognizeText = (foto) => {
    Tesseract.recognize(
      foto, 'por',
      { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
      console.log('TESSERACT: ' + text);
      settesseracttext(text);
      document.getElementById("textarea").value = text.toUpperCase();
      document.getElementById("textarea").focus();
      navigator.clipboard.writeText(text);
      startCamera();
    }).catch((error) => {
      console.log('ERRO: ' + error)
    })
  }

  function Camera() {
    return (
      <div
        style={{
          position: 'relative',
          backgroundColor: 'grey',
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignSelf: 'center',
          padding: 10,
        }}>
        <video
          ref={videoRef}
          style={{
            borderRadius: 5, margin: 0, padding: 0, backgroundColor: 'black', width: '60vw',
            alignSelf: 'center',
          }}
          id="video"
          autoplay="true"
          facingMode={window.innerWidth < 768 ? 'environment' : 'user'}
        >
        </video>
        <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'flex-end', marginBottom: -5 }}>
          <button id="click-photo"
            className='button'
            style={{ paddingLeft: 10, paddingRight: 10 }}
            onClick={() => {
              let video = videoRef.current;
              let canvas = canvasRef.current;
              canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
              image_data_url = canvas.toDataURL('image/jpeg');
              console.log(image_data_url);
              recognizeText(image_data_url);
            }}
          >
            CAPTURAR TEXTO
          </button>
          <button id="close-camera"
            className='button-red'
            style={{ alignSelf: 'flex-end', marginRight: 0 }}
            onClick={() => {
              stopCamera();
              setviewtesseract(0);
            }}
          >
            <img
              alt=""
              src={back}
              style={{ width: 30, height: 30 }}
            ></img>
          </button>
        </div>
        <textarea
          id="textarea"
          className='textarea'
          style={{
            display: 'flex',
            borderRadius: 5,
            backgroundColor: 'white',
            height: 300,
            marginLeft: 0, marginRight: 0,
          }}
          defaultValue={tesseracttext}
        >
        </textarea>
        <canvas
          ref={canvasRef}
          height={1200}
          width={1200}
          style={{
            display: 'none',
            position: 'absolute',
            bottom: 20, left: 20,
            borderRadius: 5,
            backgroundColor: 'white'
          }}
          id="canvas"
        >
        </canvas>
      </div>
    )
  }

  return (
    <div>
      <Camera></Camera>
    </div>
  )
}

export default MyTesseract;