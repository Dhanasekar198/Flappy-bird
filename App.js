import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import Bird from './public/Bird/Bird'
import { StyleSheet,SafeAreaView,Dimensions,Text,TouchableWithoutFeedback} from 'react-native';
import Obstacles from './public/Obstacles/Obstacles';

export default function App() {

const screenWidth=Dimensions.get("screen").width;
const screenHeight=Dimensions.get("screen").height;
const [obstaclesNegHeightTwo,setobstaclesNegHeightTwo]=useState(''); 
const obstaclesWidth=60;
const obstaclesHeight=300;
const gap=200;
const  birdLeft= screenWidth/2;
const [obstaclesLeft,setObstaclesLeft]=useState(screenWidth)
const [obstaclesLeftTwo,setObstaclesLeftTwo]=useState(screenWidth +screenWidth/2+30)
const [obstaclesNegHeight,setobstaclesNegHeight]=useState(0);
const gravity=3;
let gameTimerId;
let obstaclesLeftTimerId;
let obstaclesLeftTimerIdTwo;
const [score,setScore]=useState(0);
const [isGameOver,setisGameOver]=useState(false)
//start bird falling

React.useEffect(() => {
 if(birdBottom > 0){
   gameTimerId=setInterval(()=>{
     setBirdBottom(birdBottom=>birdBottom-gravity);
   },30)
  }
   return () =>{
     clearInterval(gameTimerId);
 }
},[birdBottom])

//start the first bird obstacles.
React.useEffect(()=>{
  if(obstaclesLeft > -obstaclesWidth){
    obstaclesLeftTimerId=setInterval(()=>{
      setObstaclesLeft(obstaclesLeft=>obstaclesLeft-5)
    },30)
  return()=>{
    clearInterval(obstaclesLeftTimerId)
  }
} else{
  setObstaclesLeft(screenWidth)
  setobstaclesNegHeight(-Math.random()*100)
  setScore(score=>score+1);
}

},[obstaclesLeft])

//start the second bird obstacles.
React.useEffect(()=>{
  if(obstaclesLeftTwo > -obstaclesWidth){
    obstaclesLeftTimerIdTwo=setInterval(()=>{
      setObstaclesLeftTwo(obstaclesLeftTwo=>obstaclesLeftTwo-5)
    },30)
  return()=>{
    clearInterval(obstaclesLeftTimerIdTwo)
  }
} else{
  setObstaclesLeftTwo(screenWidth)
  setobstaclesNegHeightTwo(-Math.random()*100)
  setScore(score=>score+1);
}

},[obstaclesLeftTwo])

//check for collision
React.useEffect=(()=>{
  if(birdBottom<(obstaclesNegHeight+obstaclesHeight+30)||birdBottom>(obstaclesNegHeight+obstaclesHeight+gap-30)&&(obstaclesLeft> screenWidth/2-30 && obstaclesLeft>screenWidth/2+30)
  ||(birdBottom<(obstaclesNegHeightTwo+obstaclesHeight+30)||birdBottom>(obstaclesNegHeightTwo+obstaclesHeight+gap-30)&&(obstaclesLeft> screenWidth/2-30 && obstaclesLeft>screenWidth/2+30))){
    console.log('game over');
    gameover();
  }
},[])

const jump=()=>{
 if(!isGameOver && (birdBottom <screenHeight)){
   setBirdBottom(birdBottom=>birdBottom+50)
 }
}

const gameover=()=>{
  clearInterval(gameTimerId);
  clearInterval(obstaclesLeftTimerId);
  clearInterval(obstaclesLeftTimerIdTwo)
  setisGameOver(true);
}
const [birdBottom,setBirdBottom]=useState(screenHeight/2);
  return (
    <TouchableWithoutFeedback onPress={jump} >
      {isGameOver && <Text>{score}</Text>}
    <SafeAreaView style={styles.container}>
   <Bird 
   birdBottom={birdBottom}
   birdLeft={birdLeft}/>
   
   <Obstacles 
    obstaclesLeft={obstaclesLeft}
    obstaclesHeight={ obstaclesHeight }
    obstaclesWidth={ obstaclesWidth}
    gap={ gap }  
    color={'green'} 
    randomBottom={obstaclesNegHeight}
   /> 
    <Obstacles 
    obstaclesLeft={obstaclesLeftTwo}
    obstaclesHeight={ obstaclesHeight }
    obstaclesWidth={ obstaclesWidth}
    gap={ gap }  
    color={'blue'} 
    random={obstaclesNegHeightTwo}
   /> 
    </SafeAreaView>
    <Text>Name</Text>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0ad',
    alignItems:'center',
    justifyContent:'center'
  },
});
