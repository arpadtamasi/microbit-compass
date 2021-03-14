let brightnessSuppress = 1000

function getCosineSimilarity(deg1: number, deg2: number): number {
    return Math.cos((deg1 - deg2) * Math.PI / 180)
}

input.onButtonPressed(Button.A, function () {
    if (brightnessSuppress < 10000)
        brightnessSuppress *= 10
})

input.onButtonPressed(Button.B, function () {
    if (brightnessSuppress > 1)
        brightnessSuppress /= 10
})

function getPixelAngle(x: number, y: number): number {
    return 90 + Math.round(Math.atan2(y - 2, x - 2) * 180 / Math.PI)
}

basic.forever(function on_forever() {
    let brightness: number;

    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            let compassHeading = - input.compassHeading()
            let pixelHeading = getPixelAngle(x, y)
            let headingSimilarity = getCosineSimilarity(compassHeading, pixelHeading)
            if (x == 2 && y == 2) {
                headingSimilarity = 1
            }
            let brightness = Math.exp((headingSimilarity - 1) * brightnessSuppress)
            led.plotBrightness(x, y, 255 * brightness)
        }
    }
})
