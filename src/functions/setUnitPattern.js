import {
    colorData,
    colorData2,
    colorData3,
    colorData4,
    colorData5,
    colorData6,
    colorData7,
    colorData8
} from "../data/colorData/colorData"
import {
    schemeProportions
} from '../data/schemeProportions/schemeProportions'
import {
    schemeProportions1
} from '../data/schemeProportions/schemeProportions1'

const setUnitPattern = ({
    rows,
    PatternCol,
    unitPatternNoise,
    unitPatternNarrowGaps,
    colorScheme,
    translateScheme
}) => {
    let PatternData = []

    let sumX = 0

    if (translateScheme === 'sch1' || translateScheme === 'sch2' || translateScheme === 'sch3' || translateScheme === 'sch4') {
        let SumColorData = {
            'sch1': colorData,
            'sch2': colorData2,
            'sch3': colorData3,
            'sch4': colorData4
        }


        for (let a = 0; a < PatternCol; a++) {
            if (translateScheme === 'sch1') {
                /* translateScheme == 1 */
                PatternData[a] = {
                    'back': [100 / PatternCol * a, 0, 100 / PatternCol, 100],
                    'shapes': [],
                    'color': {
                        ...SumColorData[colorScheme][a]
                    }
                }

                for (let b = 0; b < rows; b++) {
                    let y = (unitPatternNarrowGaps) ? 100 / rows * b + (100 / rows) * .1 : 100 / rows * b + (100 / rows) * .5
                    if (unitPatternNoise === 1 && a % 2 === 0) {
                        y = (!unitPatternNarrowGaps) ? y - (100 / rows) * .5 : y - 100 / rows * b
                    }

                    let height = (unitPatternNarrowGaps) ? 100 / rows - (100 / rows) * .2 : (100 / rows) * .5

                    PatternData[a].shapes[b] = [100 / PatternCol * a, y, 100 / PatternCol, height]
                }
                /* END translateScheme == 1 */
            } else if (translateScheme === 'sch2' || translateScheme === 'sch3' || translateScheme === 'sch4') {

                let proportions = schemeProportions1[translateScheme]
                let _proportions = proportions.slice(0, PatternCol)

                let SumProportions = 0
                _proportions.map((key) => {
                    SumProportions += key
                })

                let startX = 100 / SumProportions
                let width = startX * proportions[a]

                PatternData[a] = {
                    'back': [sumX, 0, width, 100],
                    'shapes': [],
                    'color': {
                        ...SumColorData[colorScheme][a]
                    }
                }

                for (let b = 0; b < rows; b++) {
                    let y = (unitPatternNarrowGaps) ? 100 / rows * b + (100 / rows) * .1 : 100 / rows * b + (100 / rows) * .5

                    if (translateScheme === 'sch2') {
                        if (a === 0 && unitPatternNarrowGaps) {
                            y = y - (100 / rows) * .5
                        } else if (a < 2 && !unitPatternNarrowGaps) {
                            y = y - (100 / rows) * .3
                        }
                    } else if (translateScheme === 'sch3' || translateScheme === 'sch4') {
                        if (unitPatternNoise === 1 && a % 2 === 0) {
                            y = (!unitPatternNarrowGaps) ? y - (100 / rows) * .5 : y - 100 / rows * b
                        }
                    }

                    let height = (unitPatternNarrowGaps) ? 100 / rows - (100 / rows) * .2 : (100 / rows) * .5

                    PatternData[a].shapes[b] = [sumX, y, width, height]
                }

                sumX += width
            }
        }
    } else if (translateScheme === 'sch5' || translateScheme === 'sch6' || translateScheme === 'sch7') {
        let SumColorData = {
            'sch1': colorData5,
            'sch2': colorData6,
            'sch3': colorData7,
            'sch4': colorData8
        }

        let proportionsX
        let proportionsY
        let exceptions


        proportionsX = schemeProportions[translateScheme].proportionsX
        proportionsY = schemeProportions[translateScheme].proportionsY
        exceptions = schemeProportions[translateScheme].exceptions

        let MX = 0

        let SumProportionsX = 0
        let SumProportionsY = 0
        proportionsX.map((key) => {
            SumProportionsX += key
        })

        let _rows = Math.round(rows / 10 * proportionsY.length)

        let _proportionsY = []
        if (_rows <= proportionsY.length) {
            _proportionsY = proportionsY.slice(0, _rows)
        } else if (_rows > proportionsY.length) {
            let _count = Math.ceil(rows / 10)

            for (let am = 0; am < _count; am++) {
                let bm = (rows / 10) % Math.floor(rows / 10)

                if (am + 1 === _count) {
                    if (bm <= 0) {
                        _proportionsY = [..._proportionsY, ...proportionsY]
                    } else if (bm > 0) {
                        let cm = Math.round(bm * proportionsY.length)
                        let dm = proportionsY.slice(0, cm)

                        _proportionsY = [..._proportionsY, ...dm]
                    }
                } else {
                    _proportionsY = [..._proportionsY, ...proportionsY]
                }
            }
        }

        _proportionsY.map((key) => {
            SumProportionsY += key
        })

        let startX = 100 / SumProportionsX
        let startY = 100 / SumProportionsY

        for (let a = 0; a < proportionsX.length; a++) {
            let width = startX * proportionsX[a]

            let MY = 0

            PatternData[a] = {
                'back': [MX, 0, width, 100],
                'shapes': [],
                'color': {
                    ...SumColorData[colorScheme][a]
                }
            }

            let bc = 0

            for (let b = 0; b < _proportionsY.length; b++) {
                let height = startY * _proportionsY[b]

                let _exception = false

                exceptions.map((el) => {
                    if (a === el.col && b === el.row) _exception = true
                })

                let ife = (a % 2 === 0 && _exception) ? false : true
                ife = (a % 2 !== 0 && _exception) ? true : false

                if (b % 2 === 0 || ife) {

                    if (ife || !_exception) {


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