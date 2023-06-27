import { useContext, useEffect, useRef, useState } from "react";
import { PeriodContext } from "../context/PeriodContext.jsx";

export default function AudioPlayer () {
      // etat qui vérifie si l'audio est muté ou non
  const [sound, setSound] = useState(false)
  const audioRef = useRef();
  const audioRefControl = useRef();
  const { audio } = useContext(PeriodContext)
  const [previewAudio, setPreviewAudio] = useState(null);

  useEffect(() => {
    //console.log(audio);
    if(audio !== 'assets/audio/viking.mp3') {
      const blob = new Blob([audio])
      const urlImage = URL.createObjectURL(blob)
      console.log(urlImage);
      fetch(urlImage)
              .then(response => response.text())
              .then(text => {setPreviewAudio(text)})
              .catch(error => console.error(error))
    } else {
      setPreviewAudio(audio)
    }
    

  }, [])

  function handleClickAudio() {
    setSound(!sound)
    audioRefControl.current.play()
    audioRefControl.current.muted = !audioRefControl.current.muted
  }

  return (
      <>
        <button ref={audioRef} className={`sound ${sound !== true && 'slash-music'}`} onClick={handleClickAudio}>
            <i className="fa-solid fa-music"></i>
            </button>
            {
            audio && (
                <audio controls ref={audioRefControl} style={{display: 'none'}} src={previewAudio} muted='true' autoPlay loop></audio>
            )
        }
      </>

  )
}