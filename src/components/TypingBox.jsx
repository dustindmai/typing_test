import React, {useEffect, useState, useRef, useMemo, createRef} from "react";
//import UpperMenu from './UpperMenu'
import { useTestMode } from "../context/TestModeContext";
const randomWords= require('random-words');


const TypingBox = () => {


  //const {testTime} = useTestMode();
  //const[intervalId, setIntervalId] = useState(null);
  const  inputRef = useRef(null);
  const [wordsArray, setWordsArray] = useState(()=>{
    return randomWords.generate(50);
  });

  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);


  const wordsSpanRef = useMemo(() =>{
    return Array(wordsArray.length).fill(0).map(i=>createRef(null));
  }, [wordsArray]);

  const focusInput = () =>{
    inputRef.current.focus();
  }

  useEffect(()=> {
    focusInput();
    wordsSpanRef[0].current.childNodes[0].className = 'current-left';
  }, []);

  const handleUserInput = (e) =>{
    const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;

    if(e.keyCode === 32){
      if(allCurrChars.length <=currCharIndex){
        allCurrChars[currCharIndex-1].classList.remove('current-right');
      }
      else{
        allCurrChars[currCharIndex-1].classList.remove('current-left');
      }

      setCurrWordIndex(currWordIndex+1);
      setCurrCharIndex(0);
      return;
    }

    if(e.key === allCurrChars[currCharIndex].innerText){
      allCurrChars[currCharIndex].className='correct';
    }
    else{
      allCurrChars[currCharIndex].className='incorrect';
    }

    if(currCharIndex+1 === allCurrChars.length){
      allCurrChars[currCharIndex].className+='current-right';
    }
    else{
      allCurrChars[currCharIndex+1].className='current-left';
    }
    console.log(allCurrChars[currCharIndex].className);
    setCurrCharIndex(currCharIndex + 1);
    
  }

  /*
  const startTimer = () =>{
    const intervalId = setInterval(timer ,1000);
    setIntervalId(intervalId);
    function timer(){
      setCountDown((latestCoutnerdown) => {
        if(latestCountDown === 1){
          setTokenAutoRefreshEnabled(true);
          clearInterval(intervalId);
          return 0;

        }
        return latestCountDown -1;
      });
    }
  }
    */
  /*
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
*/

/*
  const resetWordSpanRefClassname = () =>{
    wordsSpanref.map(i=>{
      Aarray.from(i.current.childNodes).map(j=>{
        j.classname='';
      })
    })
    wordsSpanRef[0].current.childNodes[0].classNmae= 'current';
  }
*/

/*
  useEffect(()=> {
    resetTest();

  },[testTime])
*/

  return (
    <div>
      <div className= 'type-box' onClick ={focusInput}>
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
      </div>
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