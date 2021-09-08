const setCompareData = (CommonPatternData, roundEdges, roundEdgesNum) => {
    let CompareData = []

    CommonPatternData.map((a, i) => {
        a.shapes.map((b, c) => {
            let SumSquare = b[2] * b[3]
            let addBlock = {block: i, shape: c, sumSquare: SumSquare}

            if(CompareData.length >= roundEdgesNum) {
                let changeKey = false

                CompareData.map((d, e) => {
                    changeKey = (SumSquare > d.sumSquare) ? true : false
                    
                })

                if(changeKey) {
                    CompareData = CompareData.slice(1)
                    CompareData.push(addBlock)
                }
            } else if(roundEdges) {
                CompareData.push(addBlock)
            }

            CompareData = CompareData.sort((m, n) => {
                return m.sumSquare - n.sumSquare
            })
        }) 
    })

    return CompareData

}

export default setCompareData