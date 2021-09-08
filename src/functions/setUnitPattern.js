const setUnitPattern = ({ rows, PatternCol, unitPatternNoise, unitPatternNarrowGaps, colorScheme, translateScheme, useParams, UnitType }) => {
    let PatternData = []

    let sumX = 0

    /* Color Schemes */
    let colorData = [
        { back: '#5990FC', front: 'white' },
        { back: '#242A30', front: 'white' },
        { back: 'white', front: '#242A30' },
        { back: '#242A30', front: 'white' },
        { back: 'white', front: '#5990FC' },
        { back: 'white', front: '#5990FC' },
        { back: 'white', front: '#5990FC' },
        { back: '#5990FC', front: '#242A30' },
    ]

    let colorData2 = [
        { back: '#D2E2FE', front: 'white' },
        { back: '#D2E2FE', front: 'white' },
        { back: 'white', front: '#D2E2FE' },
        { back: 'white', front: '#D2E2FE' },
        { back: '#D2E2FE', front: 'white' },
        { back: 'white', front: '#D2E2FE' },
        { back: '#D2E2FE', front: 'white' },
        { back: '#D2E2FE', front: 'white' }
    ]

    let colorData3 = [
        { back: '#5990FC', front: '#D2E3FE' },
        { back: '#D2E2FE', front: '#5990FC' },
        { back: '#5990FC', front: '#D2E2FE' },
        { back: '#D2E2FE', front: '#5990FC' },
        { back: '#5990FC', front: '#D2E2FE' },
        { back: '#D2E2FE', front: '#5990FC' },
        { back: '#D2E2FE', front: 'white' },
        { back: '#D2E2FE', front: 'white' }
    ]

    let colorData4 = [
        { back: '#D3E2F9', front: '#262B2F' },
        { back: '#D3E2F9', front: '#262B2F' },
        { back: '#262B2F', front: '#D3E2F9' },
        { back: '#262B2F', front: '#D3E2F9' },
        { back: '#D3E2F9', front: '#262B2F' },
        { back: '#262B2F', front: '#D3E2F9' },
        { back: '#D2E2FE', front: 'white' },
        { back: '#D2E2FE', front: 'white' }
    ]

    let SumColorData = {
        'sch1': colorData,
        'sch2': colorData2,
        'sch3': colorData3,
        'sch4': colorData4
    }

    /* End Color Schemes */

    /* Sum Translate Data */

    /* End Sum Translate Data */

    if(UnitType === 0) {
    for(let a=0; a<PatternCol; a++) {
        if(translateScheme === 'sch1') {
            /* translateScheme == 1 */
            PatternData[a] = {
                'back': [100/PatternCol*a, 0, 100 / PatternCol, 100],
                'shapes': [],
                'color': {...SumColorData[colorScheme][a]}
            }

            for(let b=0; b<rows; b++) {
                let y = (unitPatternNarrowGaps) ? 100/rows*b + (100/rows)*.1 : 100/rows*b + (100/rows)*.5
                if(unitPatternNoise === 1 && a%2 === 0) {
                    y = (!unitPatternNarrowGaps) ? y-(100/rows)*.5 : y-100/rows*b
                }

                let height = (unitPatternNarrowGaps) ? 100/rows - (100/rows)*.2 : (100/rows)*.5

                PatternData[a].shapes[b] = [100/PatternCol*a, y, 100/PatternCol, height]  
            }
            /* END translateScheme == 1 */
        } else if(translateScheme === 'sch2') {
            /* translateScheme == 2 */
            let proportions = [.21, .29, .5, .21, .29, .5]
            let _proportions = proportions.slice(0, PatternCol)

            let SumProportions = 0
            _proportions.map((key) => {
                SumProportions += key
            })

            let startX = 100 / SumProportions
            
            let x = sumX
            let width = startX * proportions[a]

            PatternData[a] = {
                'back': [sumX, 0, width, 100],
                'shapes': [],
                'color': {...SumColorData[colorScheme][a]}
            }

            for(let b=0; b<rows; b++) {
                let y = (unitPatternNarrowGaps) ? 100/rows*b + (100/rows)*.1 : 100/rows*b + (100/rows)*.5
                if(a === 0 && unitPatternNarrowGaps) {
                    y = y-(100/rows)*.5
                } else if(a < 2 && !unitPatternNarrowGaps) {
                    y = y-(100/rows)*.3
                }

                let height = (unitPatternNarrowGaps) ? 100/rows - (100/rows)*.2 : (100/rows)*.5

                PatternData[a].shapes[b] = [sumX, y, width, height]  
            } 

            sumX += width
            /* END translateScheme == 2 */
        } else if(translateScheme === 'sch3') {
            /* translateScheme == 3 */
            let proportions = [.2, 1, .2, 1, .2, 1]
            let _proportions = proportions.slice(0, PatternCol)

            let SumProportions = 0
            _proportions.map((key) => {
                SumProportions += key
            })

            let startX = 100 / SumProportions
            
            let x = sumX
            let width = startX * proportions[a]

            

            PatternData[a] = {
                'back': [sumX, 0, width, 100],
                'shapes': [],
                'color': {...SumColorData[colorScheme][a]}
            }

            for(let b=0; b<rows; b++) {
                let y = (unitPatternNarrowGaps) ? 100/rows*b + (100/rows)*.1 : 100/rows*b + (100/rows)*.5
                if(unitPatternNoise === 1 && a%2 === 0) {
                    y = (!unitPatternNarrowGaps) ? y-(100/rows)*.5 : y-100/rows*b
                }

                let height = (unitPatternNarrowGaps) ? 100/rows - (100/rows)*.2 : (100/rows)*.5

                PatternData[a].shapes[b] = [sumX, y, width, height]  
            }

            sumX += width
            /* END translateScheme == 3 */
        } else if(translateScheme === 'sch4') {
            /* translateScheme == 4 */
            let proportions = [.1, .5, .8, 1.4, 1.8, 2.1]
            let _proportions = proportions.slice(0, PatternCol)

            let SumProportions = 0
            _proportions.map((key) => {
                SumProportions += key
            })

            

            let startX = 100 / SumProportions
            
            let x = sumX
            let width = startX * proportions[a]

            

            PatternData[a] = {
                'back': [sumX, 0, width, 100],
                'shapes': [],
                'color': {...SumColorData[colorScheme][a]}
            }

            for(let b=0; b<rows; b++) {
                let y = (unitPatternNarrowGaps) ? 100/rows*b + (100/rows)*.1 : 100/rows*b + (100/rows)*.5
                if(unitPatternNoise === 1 && a%2 === 0) {
                    y = (!unitPatternNarrowGaps) ? y-(100/rows)*.5 : y-100/rows*b
                }

                let height = (unitPatternNarrowGaps) ? 100/rows - (100/rows)*.2 : (100/rows)*.5

                PatternData[a].shapes[b] = [sumX, y, width, height]  
            }

            sumX += width
            /* END translateScheme == 4 */
        } else if(translateScheme === 'sch5') {
            /* translateScheme == 5 */
            PatternData[a] = {
                'back': [100/PatternCol*a, 0, 100 / PatternCol, 100],
                'shapes': [],
                'color': {...SumColorData[colorScheme][a]}
            }

            for(let b=0; b<rows; b++) {
                let y = (unitPatternNarrowGaps) ? 100/rows*b + (100/rows)*.1 : 100/rows*b + (100/rows)*.5
                if(unitPatternNoise === 1 && a%2 === 0) {
                    y = (!unitPatternNarrowGaps) ? y-(100/rows)*.5 : y-100/rows*b
                }

                let height = (unitPatternNarrowGaps) ? 100/rows - (100/rows)*.2 : (100/rows)*.5

                PatternData[a].shapes[b] = [100/PatternCol*a, y, 100/PatternCol, height]  
            }
            /* END translateScheme == 5 */
        }
    }
} else {
    let colorData1 = [
        { back: '#FFFFFF', front: '#5C93F9' },
        { back: '#FFFFFF', front: '#242A30' },
        { back: '#242A30', front: '#FFFFFF' },
        { back: '#FFFFFF', front: '#242A30' },
        { back: '#5C93F9', front: '#FFFFFF' },
        { back: '#242A30', front: '#5990FC' },
        { back: '#FFFFFF', front: '#5C93F9' },
        { back: '#FFFFFF', front: '#242A30' },
        { back: '#242A30', front: '#FFFFFF' },
        { back: '#FFFFFF', front: '#242A30' },
        { back: '#5C93F9', front: '#FFFFFF' },
        { back: '#242A30', front: '#5990FC' },
        
    ]

    let colorData2 = [
        { back: '#FFFFFF', front: '#D3E2FD' },
        { back: '#D3E2FD', front: '#FFFFFF' },
        { back: '#FFFFFF', front: '#D3E2FD' },
        { back: '#D3E2FD', front: '#FFFFFF' },
        { back: '#FFFFFF', front: '#D3E2FD' },
        { back: '#D3E2FD', front: '#FFFFFF' },
        { back: '#FFFFFF', front: '#D3E2FD' },
        { back: '#D3E2FD', front: '#FFFFFF' },
        { back: '#FFFFFF', front: '#D3E2FD' },
        { back: '#D3E2FD', front: '#FFFFFF' },
        { back: '#FFFFFF', front: '#D3E2FD' },
        { back: '#D3E2FD', front: '#FFFFFF' },
    ]

    let colorData3 = [
        { back: '#D3E3FD', front: '#5C93F9' },
        { back: '#5C93F9', front: '#D3E3FD' },
        { back: '#D3E3FD', front: '#5C93F9' },
        { back: '#5C93F9', front: '#D3E3FD' },
        { back: '#D3E3FD', front: '#5C93F9' },
        { back: '#5C93F9', front: '#D3E3FD' },
        { back: '#D3E3FD', front: '#5C93F9' },
        { back: '#5C93F9', front: '#D3E3FD' },
        { back: '#D3E3FD', front: '#5C93F9' },
        { back: '#5C93F9', front: '#D3E3FD' },
        { back: '#D3E3FD', front: '#5C93F9' },
        { back: '#5C93F9', front: '#D3E3FD' },
        { back: '#D3E3FD', front: '#5C93F9' },
        { back: '#5C93F9', front: '#D3E3FD' },
    ]

    let colorData4 = [
        { back: '#D3E2F9', front: '#262B2F' },
        { back: '#262B2F', front: '#D3E2F9' },
        { back: '#D3E2F9', front: '#262B2F' },
        { back: '#262B2F', front: '#D3E2F9' },
        { back: '#D3E2F9', front: '#262B2F' },
        { back: '#262B2F', front: '#D3E2F9' },
        { back: '#D3E2F9', front: '#262B2F' },
        { back: '#262B2F', front: '#D3E2F9' },
        { back: '#D3E2F9', front: '#262B2F' },
        { back: '#262B2F', front: '#D3E2F9' },
        { back: '#D3E2F9', front: '#262B2F' },
        { back: '#262B2F', front: '#D3E2F9' },
        { back: '#D3E2F9', front: '#262B2F' },
        { back: '#262B2F', front: '#D3E2F9' },
    ]

    let SumColorData = {
        'sch1': colorData1,
        'sch2': colorData2,
        'sch3': colorData3,
        'sch4': colorData4
    }

    let proportionsX
    let proportionsY
    let exceptions

    if(UnitType === 1) {
        proportionsX = [.3, .11, .017, .017, .03, .03, .06, .06, .34,]
        proportionsY = [.47, .17, .17, .08, .08]

        exceptions = [
            {col: 6, row: 4},
            {col: 7, row: 3}
        ]
    } else if(UnitType === 2) {
        proportionsX = [.54, .04, .04, .14, .22]
        proportionsY = [.59, .71, 1.41, 1.41, 3.06]

        exceptions = [
            {col: 6, row: 4},
            {col: 7, row: 3}
        ]
    }

    else if(UnitType === 3) {
        proportionsX = [.3, .3, .6, .1, .5, .5, .5]
        proportionsY = [.47, .17, .17, .08, .08]

        exceptions = [
            {col: 2, row: 4},
            {col: 3, row: 3}
        ]
    }

    let MX = 0

    let SumProportionsX = 0
    let SumProportionsY = 0
    proportionsX.map((key) => {
            SumProportionsX += key
    })
    proportionsY.map((key) => {
        SumProportionsY += key
    })

    let startX = 100 / SumProportionsX
    let startY = 100 / SumProportionsY

    for(let a=0; a<proportionsX.length; a++) {
        let width = startX * proportionsX[a]
        
        let MY = 0
        
        PatternData[a] = {
            'back': [MX, 0, width, 100],
            'shapes': [],
            'color': {...SumColorData[colorScheme][a]}
        }

        let bc = 0

        for(let b=0; b<proportionsY.length; b++) {
            let height = startY * proportionsY[b]

            let _exception = false

            exceptions.map((el) => {
                if(a === el.col && b === el.row) _exception = true
            })

            let ife = (a % 2 === 0 && _exception) ? false : true
            ife = (a % 2 !== 0 && _exception) ? true : false

            if(b % 2 === 0 || ife) {

                if(ife || !_exception) {
                    

                    PatternData[a].shapes[bc] = [MX, MY, width, height] 
                    bc += 1 
                }
            }

            MY += height
            
        }

        MX += width


    }


}


    return PatternData
}

export default setUnitPattern