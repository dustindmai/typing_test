import React, {useEffect, useState, useRef, useMemo, createRef, innerText} from "react";
import UpperMenu from './UpperMenu'
import { useTestMode } from "../context/TestModeContext";
import { setTokenAutoRefreshEnabled } from "firebase/app-check";
import Stats from './Stats';

const randomWords= require('random-words');


const TypingBox = () => {


  const {testTime} = useTestMode();
  const[intervalId, setIntervalId] = useState(null);
  const inputRef = useRef(null);
  const [countDown, setCountDown] = useState(testTime);
  const [testStart, setTestStart] =useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const[correctWords, setCorrectWords] = useState(0);
  const [wordsArray, setWordsArray] = useState(()=>{
    return randomWords.generate(50);
  });

  const [graphData, setGraphData] = useState([]);

  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);


  const wordsSpanRef = useMemo(() =>{
    return Array(wordsArray.length).fill(0).map(i=>createRef(null));
  }, [wordsArray]);


  const handleUserInput = (e) =>{
    if(!testStart){
      startTimer();
      setTestStart(true);
    }


    const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;

    if(e.keyCode === 32){

      let correctCharsInWord = wordsSpanRef[currWordIndex].current.querySelectorAll('.correct');
      if(correctCharsInWord.length === allCurrChars.length){
        setCorrectWords(correctWords+1);
      }
      if(allCurrChars.length <=currCharIndex){
        allCurrChars[currCharIndex-1].classList.remove('current-right');
      }
      else{
        allCurrChars[currCharIndex].classList.remove('current-left');
        setMissedChars(missedChars+ (allCurrChars.length - currCharIndex));
      }

      wordsSpanRef[currWordIndex+1].current.childNodes[0].className='current-left';

      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(0);

      return;
    }

    if(e.keyCode === 8){

      if(currCharIndex !== 0){

        if(allCurrChars.length === currCharIndex){

          if(allCurrChars[currCharIndex-1].className.includes('extra')){
            allCurrChars[currCharIndex-1].remove();
            allCurrChars[currCharIndex-2].className +=' current-right';
          }
          else{
            allCurrChars[currCharIndex-1].className='current-left'
          }
          
          setCurrCharIndex(currCharIndex - 1);
          return;
        }

        allCurrChars[currCharIndex].className= '';
        allCurrChars[currCharIndex - 1].className = 'current-left';
        setCurrCharIndex(currCharIndex - 1);
      }

      return;
    }

    if(currCharIndex === allCurrChars.length){
      let newSpan = document.createElement('span');
      newSpan.innerText = e.key;
      newSpan.className = 'incorrect extra current-right';
      allCurrChars[currCharIndex -1].classList.remove('current-right');
      wordsSpanRef[currWordIndex].current.append(newSpan);
      setExtraChars(extraChars+1);
      setCurrCharIndex(currCharIndex+1);
      return;
    }


    if(e.key === allCurrChars[currCharIndex].innerText){
      allCurrChars[currCharIndex].className = 'correct';
      setCorrectChars(correctChars + 1);
    }
    else{
      allCurrChars[currCharIndex].className = 'incorrect';
      setIncorrectChars(incorrectChars+1);
    }

    if(currCharIndex +  1 === allCurrChars.length){
      allCurrChars[currCharIndex].className+=' current-right';
      console.log(allCurrChars[currCharIndex].className);
    }
    else{
      allCurrChars[currCharIndex+1].className= 'current-left';
    }


    
    setCurrCharIndex(currCharIndex + 1);

  }

  const calculateWPM = () => {
    return Math.round((correctChars / 5) / ((testTime)/60));
  }

  const calculateAcc = ()=>{
    return Math.round((correctWords/currWordIndex) * 100);
  }

  const focusInput = () =>{
    inputRef.current.focus();
  }

  useEffect(()=> {
    focusInput();
    wordsSpanRef[0].current.childNodes[0].className = 'current-left';
  }, []);
  
  const startTimer = () =>{
    const intervalId = setInterval(timer ,1000);
    setIntervalId(intervalId);
    function timer(){
      setCountDown((latestCountDown) => {
        setCorrectChars((correctChars) =>{
          setGraphData((graphData)=>{
            return [...graphData,[
              testTime - latestCountDown + 1,
              (correctChars/5)/((testTime-latestCountDown+1)/60)
            ]];
          });
          return correctChars
        })
        if(latestCountDown === 1){
          setTokenAutoRefreshEnabled(true);
          setTestEnd(true);
          clearInterval(intervalId);
          return 0;

        }
        return latestCountDown -1;
      });
    }
  }
    
  
  const resetTest = () =>{
    clearInterval(intervalId);
    setCountDown(testTime);
    setCurrWordIndex(0);
    setCurrCharIndex(0);
    setTestStart(false);
    setTestEnd(false);
    setWordsArray(randomWords.generate(50));
    resetWordSpanRefClassname();
    focusInput();
  }



  const resetWordSpanRefClassname = () =>{
    wordsSpanRef.map(i=>{
      Array.from(i.current.childNodes).map(j=>{
        j.className='';
      })
    });
    wordsSpanRef[0].current.childNodes[0].className= 'current';
  }



  useEffect(()=> {
    resetTest();

  },[testTime])


  return (
    <div>
      <UpperMenu countDown={countDown}/>
      {(testEnd) ? (<Stats 
        wpm={calculateWPM()} 
        accuracy = {calculateAcc()} 
        correctChars = {correctChars} 
        incorrectChars = {incorrectChars}
        missedChars = {missedChars}
        extraChars = {extraChars}
        graphData = {graphData}
      />): (<div className= 'type-box' onClick ={focusInput}>
        <div className= 'words'>
          {
            wordsArray.map((word,index) =>(
              <span className = 'word' ref={wordsSpanRef[index]}>
                {word.split('').map(char=>(
                  <span>{char}</span>
                ))}
              </span>
            ))
          }
        </div>
      </div>)}
      <input
        type = 'text'
        className ='hidden-input'
        ref = {inputRef}
        onKeyDown= {handleUserInput}
      />
    </div>
  )
}

export default TypingBox