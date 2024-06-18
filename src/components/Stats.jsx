import React from 'react'
import Graph from './Graph'
import { auth, db } from '../firebaseConfig';
import { Bounce, toast } from 'react-toastify';
import { useEffect } from 'react';
const Stats = ({
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  missedChars,
  extraChars,
  graphData
}
) => {

  let timeSet = new Set();
  const newGraph = graphData.filter(i=>{
    if(!timeSet.has(i[0])){
      timeSet.add(i[0]);
      return i;
    }
  });
  const pushDataToDB = () =>{
    const resultsRef = db.collection('Results');
    const {uid} = auth.currentUser;
    resultsRef.add({
      wpm: wpm,
      accuracy: accuracy,
      timeStamp: new Date(),
      characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
      userId: uid
    }).then((res)=>{
      toast.success('Data saved to DB', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
        });
    }).catch((err)=>{
      toast.error('Not able to save result', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
        });
    })
  }
  
  useEffect(()=>{
    if(auth.currentUser){
      pushDataToDB();
    }
    else{
      toast.warning('Log in to save results', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
        });
    }
  },[])

  return (
    <div className = 'stats-box'>
      <div className="left-stats">
        <div className="title">WPM</div>
        <div className="subtitle">{wpm}</div>
        <div className="title">Accuracy</div>
        <div className="subtitle">{accuracy}</div>
        <div className="title">Characters</div>
        <div className="subtitle">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
      </div>
      <div className = 'right-stats'>
        <Graph graphData={newGraph}/>
      </div>
    </div>
  )
}

export default Stats