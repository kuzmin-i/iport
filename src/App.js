import React, { useRef, useState } from "react";
import P5Wrapper from "react-p5-wrapper";

import sketch from './pattern/a'
import Scene from './threejs/a'

import { button, buttonGroup, useControls } from "leva"

function App() {
  const [useParams, setUseParams] = useState(true)

  const [exportEm, setExportEm] = useState(false)

  let ratio1 = 16 / 9
  const [tstyle, setTStyle] = useState({height: '60px', background: 'rgba(255, 0, 0, .6)', width: '100vw', position: 'absolute', left: '0px', top: '0px'})

  const [Values, setValues] = useControls('Unit Appearance', () => ({
    colorScheme: 'sch1', 
    BtnGroup: buttonGroup({
      label: 'Color',
      opts: {
        'sch1': () => setValues({colorScheme: 'sch1'}),
        'sch2': () => setValues({colorScheme: 'sch2'}),
        'sch3': () => setValues({colorScheme: 'sch3'}),
        'sch4': () => setValues({colorScheme: 'sch4'})
      }
    }),
    translateScheme: 'sch1',
    BtnGroup1: buttonGroup({
      label: 'Translate',
      opts: {
        'sch1': () => setValues({translateScheme: 'sch1'}),
        'sch2': () => setValues({translateScheme: 'sch2'}),
        'sch3': () => setValues({translateScheme: 'sch3'}),
        'sch4': () => setValues({translateScheme: 'sch4'})
      }
    }),
  }))

  const { unitPatternCols, unitPatternNoise, unitPatternNarrowGaps, UnitType, roundEdges, roundEdgesNum,  } = useControls('Unit Scheme', { unitPatternCols: 4, unitPatternNoise: 0, unitPatternNarrowGaps: true, roundEdges: false, roundEdgesNum: 2, UnitType: 0})
  const { progression, progressionScale, scaleX, scaleY } = useControls('Common Pattern Scheme', { progression: false, progressionScale: 2.0, scaleX: 1.0, scaleY: 1.0 })
  


  const EffectValues = useControls('Effects: 2 images', { set2images: false, firstIMGtranslate: 0, secondIMGTranslate: 0 })
  const [ViewportValues, setViewportValues] = useControls('Viewport Setting', () => ({
    rotatePattern: false,
    ratio: 16/7, 
    VPBtnGroup: buttonGroup({
      'label': 'Formats',
      'opts': {
        '8.0': () => setViewportValues({ratio: 8}),
        '2.2': () => setViewportValues({ratio: 16 / 7}),
        '1.0': () => setViewportValues({ratio: .99}),
        '0.4': () => setViewportValues({ratio: .4})
      }
    }),
    ExportImage: button(() => {
      setExportEm(true)
    })
  }))

  const changeExportStatus = (status) => {
    setExportEm(status)
  }
  
  let msk = 1

  const checkParamsState = (key) => {
    if(key === 'g') {
      setUseParams(false)
    } else if(key === 'h') {
      setUseParams(true)
    }
  }

  return (
  <>
  
  <div style={{position: 'absolute'}}>
    <P5Wrapper 
    sketch={sketch} 

    useParams = {useParams}

    unitPatternCols={unitPatternCols}
    unitPatternNoise={unitPatternNoise}
    unitPatternNarrowGaps={unitPatternNarrowGaps}

    scaleX={scaleX}
    scaleY={scaleY}

    progression={progression}
    progressionScale={progressionScale}

    rotatePattern={ViewportValues.rotatePattern}

    EffectValues={EffectValues}

    colorScheme={Values.colorScheme}
    translateScheme={Values.translateScheme}


    roundEdges = {roundEdges}
    roundEdgesNum = {roundEdgesNum}

    ratio={ViewportValues.ratio}

    UnitType = {UnitType}

    exportEm={exportEm}
    changeExportStatus={changeExportStatus}
    />
    </div>
     </>
  )
}

export default App;

/* Three JS Scene */

/* 
  <div style={{width: '100vw', height: '100vh'}}>
    <Scene/>
  </div>
*/

/* End */
