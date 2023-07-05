import React from 'react';
import { useSelector } from 'react-redux';
import DisplayText from '../Components/DisplayText';

const LoadingScreen = () => {
  const isLoading = useSelector(state => state.loadingReducer);

  if (isLoading) {
    return <div style={{height:"100vh",width:"100vw",color:"white",backgroundColor:"black",display:"flex",justifyContent:"center",alignItems:"center"}}>
    <DisplayText text="MCA Examination Portal..."/>
    </div>; // Replace with your desired loading screen content
  }

  return null;
};

export default LoadingScreen;
