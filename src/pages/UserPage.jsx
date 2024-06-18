import React from 'react'
import { useState } from 'react'
import { auth, db } from '../firebaseConfig';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import TableUserData from '../components/TableUserData';
import Graph from '../components/Graph';
import UserInfo from '../components/UserInfo';

const UserPage = () => {
  const [data, setData] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [dataLoading, setDataLoading] = useState(false); 
  const [graphData, setGraphData] = useState([]);
  const navigate = useNavigate();
  const fetchUserData = () =>{
    const resultsRef = db.collection('Results');
    const {uid} = auth.currentUser;
    let tempData = [];
    let tempGraphData =[];
    resultsRef.where('userId', '==', uid).orderBy('timeStamp', 'desc').get().then((snapshot)=>{
      snapshot.docs.forEach((doc)=>{
        tempData.push({...doc.data()});
        tempGraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(',')[0], doc.data().wpm])
      })
      setData(tempData);
      setGraphData(tempGraphData.reverse());
      setDataLoading(false);
    })
  }

  useEffect(()=>{
    if(!loading && !user){
      navigate('/');
      
    }
    else if(!loading){
      fetchUserData();
      
    }

  }, [loading])

  if(loading || dataLoading){
    return <div className='center-of-screen'><CircularProgress size={150}/></div>
  }

  return (
    <div className="canvas">
      <UserInfo totalTestsTaken={data.length}/>
      <div className="graph-user-page">
        <Graph graphData = {graphData} type = 'date'/>
      </div>
      
      <TableUserData data={data}/>
    </div>
  )
}

export default UserPage