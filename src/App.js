import React, { useRef, useState } from "react";
import P5Wrapper from "react-p5-wrapper";

import sketch from './pattern/a'
import Scene from './threejs/a'

import { button, buttonGroup, useControls, folder,  } from "leva"
import { Components, createPlugin } from 'leva/plugin'

function App() {
  const [useParams, setUseParams] = useState(true)

  const [exportEm, setExportEm] = useState(false)

  let ratio1 = 16 / 9
  const [tstyle, setTStyle] = useState({height: '60px', background: 'rgba(255, 0, 0, .6)', width: '100vw', position: 'absolute', left: '0px', top: '0px'})

  const ColorComponent = () => {
    /* <Components.Label>Colors</Components.Label>
        <Components.ValueInput value="Hello" />
        */

    return (
      <Components.Row input>
        <Components.Label>Colors</Components.Label>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <div onClick={() => setHValues({colorScheme: 'sch1'})} style={{width: '30px', height: '25px', border: '10px', cursor: 'pointer', marginLeft: '10px'}}>
          <img src="/icons/color5.svg" width="30px"/>
        </div>
        <div onClick={() => setHValues({colorScheme: 'sch2'})} style={{width: '30px', height: '25px', border: '10px', cursor: 'pointer', marginLeft: '10px'}}>
          <img src="/icons/aa7.png" width="30px"/>
        </div>
        <div onClick={() => setHValues({colorScheme: 'sch3'})} style={{width: '30px', height: '25px', border: '10px', cursor: 'pointer', marginLeft: '10px'}}>
          <img src="/icons/aa4.png" width="30px"/>
        </div>
        <div onClick={() => setHValues({colorScheme: 'sch4'})} style={{width: '30px', height: '25px', border: '10px', cursor: 'pointer', marginLeft: '10px'}}>
          <img src="/icons/aa2.png" width="30px"/>
        </div>
        </div>
      </Components.Row>
    )
  }

  console.log('re')
  console.log(Components)

  const colorComponent1 = createPlugin(
    {
      component: ColorComponent
    }
  )

  const [Values, setValues] = useControls('Unit Appearance', () => ({
    CComp: colorComponent1(),
    BtnGroup1: buttonGroup({
      label: '',
      opts: {
        'Scheme 1': () => {
          setHValues({translateScheme: 'sch1'})
          setHValues({UnitType: 0})
        },
        'Scheme 2': () => {
          setHValues({translateScheme: 'sch2'})
          setHValues({UnitType: 0})
        },
        'Scheme 3': () => {
          setHValues({translateScheme: 'sch3'})
          setHValues({UnitType: 0})
        },
      }
    }),
    BtnGroup2: buttonGroup({
      label: '',
      opts: {
        'Scheme 4': () => {
          setHValues({translateScheme: 'sch4'})
          setHValues({UnitType: 0})
        },
        'Scheme 5': () => setHValues({UnitType: 1}),
        'Scheme 6': () => setHValues({UnitType: 2})
      }
    }),
    BtnGroup3: buttonGroup({
      label: '',
      opts: {
        'Scheme 7': () => setHValues({UnitType: 3})
      }
    })
  }))
  

  console.log(Values)

  const [{ roundEdges, roundEdgesNum,  }, setUSValues] = useControls('Unit Scheme', () => ({ roundEdges: false, roundEdgesNum: 2}))
  const { progression, progressionScale, scaleX, scaleY } = useControls('Common Pattern Scheme', { progression: false, progressionScale: 2.0, scaleX: 1.0, scaleY: 1.0 })
  


  const EffectValues = useControls('Effects: 2 images', { set2images: false, firstIMGtranslate: 0 })
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

  const [HiddenValues, setHValues] = useControls(() => ({HiddenValues1: folder({ colorScheme: 'sch1', translateScheme: 'sch1', UnitType: 0 }, {collapsed: true})}))

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

    scaleX={scaleX}
    scaleY={scaleY}

    progression={progression}
    progressionScale={progressionScale}

    rotatePattern={ViewportValues.rotatePattern}

    EffectValues={EffectValues}

    colorScheme={HiddenValues.colorScheme}
    translateScheme={HiddenValues.translateScheme}


    roundEdges = {roundEdges}
    roundEdgesNum = {roundEdgesNum}

    ratio={ViewportValues.ratio}

    UnitType = {HiddenValues.UnitType}

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
