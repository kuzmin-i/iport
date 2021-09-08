const setClientArea = (p, ratio) => {
    let width = (ratio >= 1) ? p.windowWidth : p.windowHeight * ratio
    let height = (ratio < 1) ? p.windowHeight : p.windowWidth / ratio
    
    let x = (p.windowWidth - width) / 2
    let y = (p.windowHeight - height) / 2

    p.noFill()
    p.stroke('black')
    p.strokeWeight(3)

    p.rect(x+1, y+1, width-2, height-2)

    p.fill('rgba(0, 0, 0, .9)')
    p.noStroke()

    if(ratio >= 1) {
        p.rect(0, 0, width, y)
        p.rect(0, y+height, width, y)
    } else if(ratio < 1) {
        p.rect(0, 0, x, height)
        p.rect(x+width, 0, x, height)
    }
}

export default setClientArea