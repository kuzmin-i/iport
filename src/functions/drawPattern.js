
const drawPattern = (p, progress, PatternData, rotatePattern, CompareData) => {
    let RadiusAng = 3

    if(PatternData) {
        PatternData.map((a, z1) => {
            let lcScale = (!rotatePattern) ? [p.windowWidth * .01, p.windowHeight * .01] : [p.windowHeight * .01, p.windowWidth * .01]

            p.noStroke()
            p.fill(a.color.back)
            p.rect(a.back[0] * lcScale[0], a.back[1] * lcScale[1], a.back[2] * lcScale[0] * progress, a.back[3] * lcScale[1])

            if(a.shapes) {
                p.fill(a.color.front)
                a.shapes.map((b, z2) => {
                    let ExFill = false
                    let Radius = [0, 0, 0, 0]


                    CompareData.map((m, n) => {
                        if(m.block === z1 && m.shape === z2) ExFill = true
                    })

                    if(ExFill) {
                        Radius[RadiusAng] = 10000
                    }
                    
                    p.fill(a.color.front)
                    
                    if(!ExFill) {
                        p.rect(
                            b[0] * lcScale[0], 
                            b[1] * lcScale[1], 
                            b[2] * lcScale[0] * progress, 
                            b[3] * lcScale[1], 
                            Radius[0], 
                            Radius[1], 
                            Radius[2], 
                            Radius[3])
                    }

                    let ArcPosition 
                    
                    if(b[2] * lcScale[0] * progress < b[3] * lcScale[1]) {
                        /* Height is bigger than width */
                        ArcPosition = [
                            [b[2] * lcScale[0] * progress, b[2] * lcScale[0] * progress, p.PI, p.PI + p.HALF_PI],
                            [0, b[2] * lcScale[0] * progress, -p.HALF_PI, 0],
                            [0, b[3] * lcScale[1]-b[2] * lcScale[0] * progress, 0, p.HALF_PI],
                            [b[2] * lcScale[0] * progress, b[3] * lcScale[1]-b[2] * lcScale[0] * progress, p.HALF_PI, p.PI]
                        ]
                    } else {
                        /* Width is bigger than height */
                        ArcPosition = [
                            [b[3] * lcScale[1], b[3] * lcScale[1], p.PI, p.PI + p.HALF_PI],
                            [b[2] * lcScale[0] * progress - b[3] * lcScale[1], b[3] * lcScale[1], -p.HALF_PI, 0],
                            [b[2] * lcScale[0] * progress - b[3] * lcScale[1], 0, 0, p.HALF_PI],
                            [b[3] * lcScale[1], 0, p.HALF_PI, p.PI]
                        ]
                    }

                    let ExtraRectPos

                    if(b[2] * lcScale[0] * progress < b[3] * lcScale[1]) {
                        /* Height is bigger than width */
                        ExtraRectPos = [
                            [0, b[2] * lcScale[0] * progress, b[2] * lcScale[0] * progress, b[3] * lcScale[1] - b[2] * lcScale[0] * progress],
                            [0, b[2] * lcScale[0] * progress, b[2] * lcScale[0] * progress, b[3] * lcScale[1] - b[2] * lcScale[0] * progress],
                            [0, 0, b[2] * lcScale[0] * progress, b[3] * lcScale[1] - b[2] * lcScale[0] * progress],
                            [0, 0, b[2] * lcScale[0] * progress, b[3] * lcScale[1] - b[2] * lcScale[0] * progress]
                        ]
                    } else {
                        ExtraRectPos = [
                            [b[3] * lcScale[1], 0, b[2] * lcScale[0] * progress - b[3] * lcScale[1], b[3] * lcScale[1]],
                            [0, 0, b[2] * lcScale[0] * progress - b[3] * lcScale[1], b[3] * lcScale[1]],
                            [0, 0, b[2] * lcScale[0] * progress - b[3] * lcScale[1], b[3] * lcScale[1]],
                            [b[3] * lcScale[1], 0, b[2] * lcScale[0] * progress - b[3] * lcScale[1], b[3] * lcScale[1]]
                        ]
                    }

                    if(ExFill) {
                        let ArcSize = (b[2] * lcScale[0] * progress < b[3] * lcScale[1]) ? b[2] * lcScale[0] * progress * 2 : b[3] * lcScale[1] * 2

                        p.arc(b[0] * lcScale[0] + ArcPosition[RadiusAng][0], b[1] * lcScale[1] + ArcPosition[RadiusAng][1], ArcSize, ArcSize, ArcPosition[RadiusAng][2], ArcPosition[RadiusAng][3])
                        p.rect(b[0] * lcScale[0] + ExtraRectPos[RadiusAng][0], b[1] * lcScale[1] + ExtraRectPos[RadiusAng][1], ExtraRectPos[RadiusAng][2], ExtraRectPos[RadiusAng][3])

                        console.log([b[0] * lcScale[0] + ExtraRectPos[0], b[1] * lcScale[1] + ExtraRectPos[1], ExtraRectPos[2], ExtraRectPos[3]])
                    
                        RadiusAng = (RadiusAng >= 3) ? 0 : RadiusAng + 1
                    }

                    
                })
            }
        })
    }
}

export default drawPattern