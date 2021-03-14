let brightnessSetting = 0
let compassEnabled = true

function getCosineSimilarity(deg1: number, deg2: number) {
    return Math.cos((deg1 - deg2) * Math.PI / 180)
}

input.onButtonPressed(Button.A, function () {
    if (brightnessSetting > 0) {
        brightnessSetting = brightnessSetting - 1
    }
    showBrightness()
})

input.onButtonPressed(Button.B, function () {
    if (brightnessSetting < 4) {
        brightnessSetting = brightnessSetting + 1
    }
    showBrightness()
})

function showBrightness() {
    compassEnabled = false
    basic.clearScreen()
    led.plotBarGraph(brightnessSetting, 4)
    basic.pause(200)
    compassEnabled = true
}

function getBrightness(similarity: number) {
    return Math.exp((similarity - 1) * Math.exp(5 - brightnessSetting))
}

function getPixelAngle(x: number, y: number) {
    return 90 + Math.round(Math.atan2(y - 2, x - 2) * 180 / Math.PI)
}


function showCompass() {
    for (let x = 0; x <= 4; x++) {
        for (let y = 0; y <= 4; y++) {
            if (x == 2 && y == 2) {
                led.plot(x, y)
            } else {
                led.plotBrightness(x, y, 255 * getBrightness(getCosineSimilarity(0 - input.compassHeading(), getPixelAngle(x, y))))
            }
        }
    }
}

basic.forever(function () {
    if (compassEnabled) {
        showCompass();
    }
})
