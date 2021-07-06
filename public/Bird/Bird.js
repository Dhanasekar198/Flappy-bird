import React from 'react';
import { View } from 'react-native';

 const Bird=({birdBottom,birdLeft})=>{
    
     const birdwidth=50;
     const birdHeight=60;
    return (
         <View style={{
             position:'absolute',
             backgroundColor:'blue',
             width:birdwidth,
             height:birdHeight,
             left:birdLeft-(birdwidth/2),
             bottom:birdBottom
         }}>

        </View>
    )
}

export default Bird;