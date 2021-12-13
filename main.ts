function Type () {
    for (let row = 0; row <= 3; row++) {
        if (row == 0) {
            pins.digitalWritePin(DigitalPin.P9, 1)
            pins.digitalWritePin(DigitalPin.P6, 0)
            pins.digitalWritePin(DigitalPin.P10, 0)
            pins.digitalWritePin(DigitalPin.P4, 0)
        } else if (row == 1) {
            pins.digitalWritePin(DigitalPin.P9, 0)
            pins.digitalWritePin(DigitalPin.P6, 1)
            pins.digitalWritePin(DigitalPin.P10, 0)
            pins.digitalWritePin(DigitalPin.P4, 0)
        } else if (row == 2) {
            pins.digitalWritePin(DigitalPin.P9, 0)
            pins.digitalWritePin(DigitalPin.P6, 0)
            pins.digitalWritePin(DigitalPin.P10, 1)
            pins.digitalWritePin(DigitalPin.P4, 0)
        } else if (row == 3) {
            pins.digitalWritePin(DigitalPin.P9, 0)
            pins.digitalWritePin(DigitalPin.P6, 0)
            pins.digitalWritePin(DigitalPin.P10, 0)
            pins.digitalWritePin(DigitalPin.P4, 1)
        }
        if (pins.digitalReadPin(DigitalPin.P3) == 1) {
            colume = 0
            cur += 1
            I2C_LCD1602.ShowString(group[row][colume], cur, 0)
            key_pressed = group[row][colume]
            input2 = "" + input2 + key_pressed
        } else if (pins.digitalReadPin(DigitalPin.P2) == 1) {
            colume = 1
            cur += 1
            I2C_LCD1602.ShowString(group[row][colume], cur, 0)
            key_pressed = group[row][colume]
            input2 = "" + input2 + key_pressed
        } else if (pins.digitalReadPin(DigitalPin.P1) == 1) {
            colume = 2
            cur += 1
            I2C_LCD1602.ShowString(group[row][colume], cur, 0)
            key_pressed = group[row][colume]
            input2 = "" + input2 + key_pressed
        } else if (pins.digitalReadPin(DigitalPin.P0) == 1) {
            colume = 3
            cur += 1
            I2C_LCD1602.ShowString(group[row][colume], cur, 0)
            key_pressed = group[row][colume]
            input2 = "" + input2 + key_pressed
        }
    }
    basic.pause(20)
}
function send_message () {
    if (alarm_enabled == 1) {
        message = "E"
    }
    // if measure 2 is secure send correct letter
    if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        message = "" + message + "World"
    } else {
        message = "" + message + "World"
    }
    // if measure 2 is secure send correct letter
    if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        message = "" + message + "World"
    } else {
        message = "" + message + "World"
    }
    // if measure 3 is secure send correct letter
    if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        message = "" + message + "World"
    } else {
        message = "" + message + "World"
    }
    // if measure 4 is secure send correct letter
    if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        message = "" + message + "World"
    } else {
        message = "" + message + "World"
    }
    // if measure 5 is secure send correct letter
    if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        message = "" + message + "World"
    } else {
        message = "" + message + "World"
    }
    radio.sendValue(message, 7531)
}
// this code checks to see if the pass code is correct, and if yes, allows the user to use the controls, but if not, it sends a message to the other micro:bit after the third incorrect pass code attempt
function Check () {
    if (input2.includes(code)) {
        I2C_LCD1602.ShowString("|** CORRECT! **|", 0, 0)
        I2C_LCD1602.ShowString("|**    :D    **|", 0, 1)
        music.playMelody("G B A G C5 B A B ", 120)
        incorrect_times = 0
        I2C_LCD1602.ShowString("B: Deactivate alarms", 0, 0)
        I2C_LCD1602.ShowString("D: Enable", 0, 1)
    } else {
        I2C_LCD1602.ShowString("|**INCORRECT!**|", 0, 0)
        I2C_LCD1602.ShowString("|**    >:(   **|", 0, 1)
        music.playMelody("C5 A B G A F G E ", 120)
        incorrect_times += 1
    }
}
input.onButtonPressed(Button.B, function () {
    I2C_LCD1602.ShowString(input2, 0, 1)
})
let alarm_on = 0
let message = ""
let alarm_enabled = 0
let colume = 0
let group: string[][] = []
let cur = 0
let input2 = ""
let key_pressed = ""
let code = ""
let incorrect_times = 0
radio.setGroup(17)
pins.setAudioPin(AnalogPin.P12)
music.setVolume(255)
incorrect_times = 0
code = "4783"
key_pressed = "w"
let enabled = 1
input2 = ""
cur = -1
led.enable(false)
I2C_LCD1602.LcdInit(0)
group = [
[
"1",
"2",
"3",
"A"
],
[
"4",
"5",
"6",
"B"
],
[
"7",
"8",
"9",
"C"
],
[
"*",
"0",
"#",
"D"
]
]
basic.forever(function () {
    Type()
    if (key_pressed.includes("A")) {
        Check()
    } else if (key_pressed.includes("C")) {
        I2C_LCD1602.clear()
        cur = -1
        input2 = ""
    }
    // tells if the alarm is activated
    if (pins.digitalReadPin(DigitalPin.P16) == 0 || pins.digitalReadPin(DigitalPin.P16) == 0 || (pins.digitalReadPin(DigitalPin.P16) == 0 || pins.digitalReadPin(DigitalPin.P16) == 0) || pins.digitalReadPin(DigitalPin.P16) == 0) {
        if (alarm_enabled == 1) {
            alarm_on = 1
        }
    }
    send_message()
    basic.pause(100)
})
