const setCommonPatternData = (progression, progressionScale, PatternData, scaleX, scaleY) => {
        let compareNum = 4
        let compareData = []

        let CommonPatternData = []

        let CommonCols = Math.ceil(scaleX)
        let CommonWidth = 100 / scaleX


        let b1 
        
        if(progression && progressionScale !== 1) {
            b1 = (100*(progressionScale-1)) / (Math.pow(progressionScale, CommonCols)-1)
        }

        let sumX = 0

        for(let n=0; n<CommonCols; n++) {
            let CommonPatternDataN = PatternData.map((a, i) => {
                let lcShapes = []
                a.shapes.map((b, c) => {
                    lcShapes[c] = [...b]

                    //console.log(progression)

                    if(!progression || progressionScale === 1) {
                        lcShapes[c][0] /= scaleX
                        lcShapes[c][0] += CommonWidth * n
                        lcShapes[c][2] /= scaleX
                    } else {
                        lcShapes[c][0] = sumX
                        lcShapes[c][2] *= b1*Math.pow(progressionScale, n) / 100
                    }

                })

                let lcBack = [...a.back]

                if(!progression || progressionScale === 1) {
                    lcBack[0] /= scaleX
                    lcBack[0] += CommonWidth * n
                    lcBack[2] /= scaleX
                } else {
                    lcBack[0] = sumX
                    lcBack[2] *= b1*Math.pow(progressionScale, n) / 100
                    sumX += lcBack[2]
                }
                
    
                CommonPatternData.push({
                    back: [...lcBack],
                    shapes: [...lcShapes],
                    color: {...a.color}
                })
            })

           
        }

    return CommonPatternData
}

export default setCommonPatternData