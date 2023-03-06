/* eslint eqeqeq: "off" */
import React, { useContext, useEffect } from 'react';
import Context from '../pages/Context';
import Tesseract from 'tesseract.js';

function MyTesseract() {

  // context.
  const {
    // paciente,
    // atendimento,
    viewtesseract, setviewtesseract,
  } = useContext(Context);

  useEffect(() => {
    if (viewtesseract == 1) {
      startCamera();
    }
    // eslint-disable-next-line
  }, [viewtesseract]);

  let video = document.getElementById("video");
  let canvas = document.getElementById("canvas");
  let image_data_url = '';

  const startCamera = () => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
        })
        .catch((error) => {
          console.log("Algo deu errado! " + error);
        });
    }
  };

  const stopCamera = () => {
    video.srcObject.getVideoTracks()[0].stop();
  }

  const recognizeText = (foto) => {
    Tesseract.recognize(
      foto, 'por',
      { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
      console.log('TESSERACT: ' + text);
    }).catch((error) => {
      console.log('NÃO DEU.')
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
          style={{ borderRadius: 5, padding: 10 }}
          id="video"
          width={0.6 * window.innerWidth}
          height={0.7 * window.innerHeight}
          autoplay="true"
        >
        </video>
        <button id="click-photo"
          className='button'
          style={{ alignSelf: 'flex-end' }}
          onClick={() => {
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            image_data_url = canvas.toDataURL('image/jpeg');
            console.log(image_data_url);
            stopCamera();
            recognizeText(image_data_url);
            setviewtesseract(0);
          }}
        >
          CAPTURAR TEXTO
        </button>
        <canvas
          style={{
            display: 'none',
            position: 'absolute',
            bottom: 20, left: 20,
            borderRadius: 5,
            backgroundColor: 'white'
          }} id="canvas" width={0.6 * window.innerWidth} height={0.7 * window.innerWidth}></canvas>
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