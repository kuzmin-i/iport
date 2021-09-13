import React, { useState } from "react";
import P5Wrapper from "react-p5-wrapper";

import sketch from './pattern/a'

import { button, buttonGroup, useControls } from "leva"
import { Components, createPlugin } from 'leva/plugin'

function App() {
  const [exportEm, setExportEm] = useState(false)

  const [colorScheme, setColorScheme] = useState('sch1')
  const [translateScheme, setTranslateScheme] = useState('sch1')

  const UnitType = 0

  
  
  const ColorComponent = () => {

    return (
      <Components.Row input>
        <Components.Label>Палитра</Components.Label>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <div onClick={() => setColorScheme('sch1')} className="colorPoint">
          <img src="/icons/color5.svg" alt="White / Blue / Black" width="30px"/>
        </div>
        <div onClick={() => setColorScheme('sch2')} className="colorPoint">
          <img src="/icons/aa7.png" alt="White / Light Purple" width="30px"/>
        </div>
        <div onClick={() => setColorScheme('sch3')} className="colorPoint">
          <img src="/icons/aa4.png" alt="Light Purple / Purple" width="30px"/>
        </div>
        <div onClick={() => setColorScheme('sch4')} className="colorPoint">
          <img src="/icons/aa2.png" alt="Light Purple / Black" width="30px"/>
        </div>
        </div>
      </Components.Row>
    )
  }


  const colorComponent1 = createPlugin(
    {
      component: ColorComponent
    }
  )

  const [Values, setValues] = useControls('Unit Appearance', () => ({
    CComp: colorComponent1(),
    BtnGroup1: buttonGroup({
      label: 'Схемы',
      opts: {
        '1': () => setTranslateScheme('sch1'),
        '2': () => setTranslateScheme('sch2'),
        '3': () => setTranslateScheme('sch3'),
        '4': () => setTranslateScheme('sch4'),
        '5': () => setTranslateScheme('sch5'),
        '6': () => setTranslateScheme('sch6'),
        '7': () => setTranslateScheme('sch7')
      }
    })
  }))
  

  console.log(Values)

  const [{ roundEdges, roundEdgesNum,  }, setUSValues] = useControls('Скруглить края', () => ({ roundEdges: {value: false, label: 'Включить'}, roundEdgesNum: {value: 2, label: 'Кол-во раз'}}))
  const { progression, progressionScale, scaleX, scaleY } = useControls('Размножить паттерн', { progression: {value: false, label: 'Геом. прогрессия'}, progressionScale: {value: 2.0, label: 'Коэффициент геом. прогрессии'}, scaleX: {value: 1.0, label: 'Масштаб X'}, scaleY: {value: 1.0, label: 'Масштаб Y'} })
  


  const EffectValues = useControls('Смещения ядра вправо', { set2images: {value: false, label: 'Включить'}, firstIMGtranslate: {value: 0, label: 'Смещение'} })
  const [ViewportValues, setViewportValues] = useControls('Экспорт холста', () => ({
    rotatePattern: {value: false, label: 'Повернуть'},
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

  return (
  <>
  
  <div style={{position: 'absolute'}}>
    <P5Wrapper 
      sketch={sketch} 

      scaleX={scaleX}
      scaleY={scaleY}

      progression={progression}
      progressionScale={progressionScale}

      rotatePattern={ViewportValues.rotatePattern}

      EffectValues={EffectValues}

      colorScheme={colorScheme}
      translateScheme={translateScheme}


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
