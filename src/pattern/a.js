import setClientArea from "../functions/setClientArea";
import setDrawBrowserArea from "../functions/setDrawBrowserArea";
import setUnitPattern from "../functions/setUnitPattern";
import setCommonPatternData from "../functions/setCommonPatternData";

import drawPattern from "../functions/drawPattern";
import setCompareData from "../functions/setCompareData";

const sketch = p => {

    /* Initial Second renderer */
    let q

    let w = p.windowWidth
    let h = p.windowHeight

    /* Initial Params that won't be changed */
    let PatternCol = 4
    let PatternData = []
    let CommonPatternData = []
    let CompareData = []

    let updateUnitPattern = true

    let progress = 0
    /* End init Params */
    
    /* Initial Params that will be substitiued by props */

    let roundEdges = false
    let roundEdgesNum = 2
    let useParams = true

    let UnitType = 0

    let colorScheme = 'sch1'
    let translateScheme = 'sch1'

    let rotatePatternRender = true
    let rotatePattern = false

    let unitPatternCols = 4
    let unitPatternNoise = 0
    let unitPatternNarrowGaps = true

    let ratio = 16 / 9
    let scaleX = 1.0
    let scaleY = 1.0

    let progression = true
    let progressionScale = 2.0

    let rowsNum = 10
    let rows = 10

    let EffectValues = { set2images: false, firstIMGtranslate: 0, secondIMGTranslate: 0 }

    let exportEm = false
    /* End init Params */

    

    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        if(props.unitPatternCols) unitPatternCols = props.unitPatternCols
        if(props.unitPatternNoise) unitPatternNoise = props.unitPatternNoise
        if(props.unitPatternNarrowGaps) unitPatternNarrowGaps = props.unitPatternNarrowGaps

        exportEm = props.exportEm

        if(exportEm){
            p.save()
            props.changeExportStatus(false)
        } 

        if (props.ratio) ratio = props.ratio
        if (props.scaleX) scaleX = props.scaleX
        if (props.scaleY) scaleY = props.scaleY

        progression = props.progression
        progressionScale = props.progressionScale

        useParams = props.useParams
        UnitType = props.UnitType
        roundEdges = props.roundEdges
        roundEdgesNum = props.roundEdgesNum

        if(props) {
            updateUnitPattern = true
            progress = 0
        }

        if(rotatePattern === !props.rotatePattern) rotatePatternRender = true
        rotatePattern = props.rotatePattern

        EffectValues = {...props.EffectValues}

        colorScheme = props.colorScheme
        translateScheme = props.translateScheme
    };

    p.setup = () => {
        p.createCanvas(w, h)
    };

    p.windowResized = () => {
        p.resizeCanvas(w, h);
    }

    p.draw = () => {
        if(rotatePatternRender) {
            q = (!rotatePattern) ? p.createGraphics(w, h) : p.createGraphics(h, w)
            rotatePatternRender = false
        }
        
        setDrawBrowserArea(q)

        if(updateUnitPattern) {
            rows = rowsNum * scaleY

            console.log(rows)

            PatternData = setUnitPattern({rows: rows, PatternCol: unitPatternCols, unitPatternNoise: unitPatternNoise, unitPatternNarrowGaps: unitPatternNarrowGaps, colorScheme: colorScheme, translateScheme: translateScheme, useParams: useParams, UnitType: UnitType})
            updateUnitPattern = false
        }

        CommonPatternData = setCommonPatternData(progression, progressionScale, PatternData, scaleX, scaleY)
        CompareData = setCompareData(CommonPatternData, roundEdges, roundEdgesNum)
        
        

        /*CommonPatternData = PatternData.map((a, i) => {
            let lcShapes = []
            a.shapes.map((b, c) => {
                lcShapes[c] = [...b]
            })

            return {
                back: [...a.back],
                shapes: [...lcShapes],
                color: {...a.color}
            }
        })
        */

        drawPattern(q, progress, CommonPatternData, rotatePattern, CompareData)

        progress = (progress < 1) ? progress + .05 : 1

        if(rotatePattern) {
            p.translate(w/2, h/2)
            p.rotate(90 * p.PI / 180)
            p.imageMode(p.CENTER)
            
            p.image(q, 0, 0)
        }  else {
            p.imageMode(p.CORNER)


            if(EffectValues.set2images) {
                p.image(q, EffectValues.firstIMGtranslate-w+EffectValues.secondIMGTranslate, 0)
                p.image(q, EffectValues.firstIMGtranslate, 0)
            } else 
            {
                p.image(q, 0, 0)
            }
        }

        if(rotatePattern) {
            p.rotate(-90 * p.PI / 180)
            p.translate(-w/2, -h/2)
        }
        setClientArea(p, ratio)
        
        
    };
  };

export default sketch