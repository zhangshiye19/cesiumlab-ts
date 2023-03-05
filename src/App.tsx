import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useEffect} from "react";
import CMap from "./CMap/CMap";
import * as Cesium from 'cesium';

function App() {

  useEffect(()=>{
    const now = CMap.getInstance().clock.currentTime;
    const position = new Cesium.SampledPositionProperty();
    position.addSample(now,Cesium.Cartesian3.fromDegrees(114,22,3000));
    const next = Cesium.JulianDate.addSeconds(now,10,new Cesium.JulianDate());
    position.addSample(next,Cesium.Cartesian3.fromDegrees(115,24,3000));

    // const start = now;
    // const stop = Cesium.JulianDate.addSeconds(now,100,new Cesium.JulianDate());
    // const timeInterval = new Cesium.TimeIntervalCollection([ new Cesium.TimeInterval({ start: start, stop: stop }) ]);
    const entity = CMap.getInstance().entities.add({
      // availability: timeInterval,
      name: 'Cesium_Air',
      position: position,
      model: {
        uri: './Cesium_Air.glb',
      }
    })
    CMap.getInstance().trackedEntity = entity;
  },[])

  return (
      <div id='cesiumContainer' style={{
        height: '100%'
      }}>
      </div>
  );
}

export default App;
