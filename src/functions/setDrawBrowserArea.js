const setDrawBrowserArea = (p) => {
    p.fill('white')
    p.noStroke()
    p.rect(0, 0, p.windowWidth, p.windowHeight)
}

export default setDrawBrowserArea