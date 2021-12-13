def Type():
    global colume, cur, key_pressed, input2
    for row in range(4):
        if row == 0:
            pins.digital_write_pin(DigitalPin.P9, 1)
            pins.digital_write_pin(DigitalPin.P6, 0)
            pins.digital_write_pin(DigitalPin.P10, 0)
            pins.digital_write_pin(DigitalPin.P4, 0)
        elif row == 1:
            pins.digital_write_pin(DigitalPin.P9, 0)
            pins.digital_write_pin(DigitalPin.P6, 1)
            pins.digital_write_pin(DigitalPin.P10, 0)
            pins.digital_write_pin(DigitalPin.P4, 0)
        elif row == 2:
            pins.digital_write_pin(DigitalPin.P9, 0)
            pins.digital_write_pin(DigitalPin.P6, 0)
            pins.digital_write_pin(DigitalPin.P10, 1)
            pins.digital_write_pin(DigitalPin.P4, 0)
        elif row == 3:
            pins.digital_write_pin(DigitalPin.P9, 0)
            pins.digital_write_pin(DigitalPin.P6, 0)
            pins.digital_write_pin(DigitalPin.P10, 0)
            pins.digital_write_pin(DigitalPin.P4, 1)
        if pins.digital_read_pin(DigitalPin.P3) == 1:
            colume = 0
            cur += 1
            I2C_LCD1602.show_string(group[row][colume], cur, 0)
            key_pressed = group[row][colume]
            input2 = "" + input2 + key_pressed
        elif pins.digital_read_pin(DigitalPin.P2) == 1:
            colume = 1
            cur += 1
            I2C_LCD1602.show_string(group[row][colume], cur, 0)
            key_pressed = group[row][colume]
            input2 = "" + input2 + key_pressed
        elif pins.digital_read_pin(DigitalPin.P1) == 1:
            colume = 2
            cur += 1
            I2C_LCD1602.show_string(group[row][colume], cur, 0)
            key_pressed = group[row][colume]
            input2 = "" + input2 + key_pressed
        elif pins.digital_read_pin(DigitalPin.P0) == 1:
            colume = 3
            cur += 1
            I2C_LCD1602.show_string(group[row][colume], cur, 0)
            key_pressed = group[row][colume]
            input2 = "" + input2 + key_pressed
    basic.pause(20)
def Open():
    if enabled == 0:
        I2C_LCD1602.clear()
        I2C_LCD1602.show_string("B: Deactivate alarms", 0, 0)
        I2C_LCD1602.show_string("D: Enable", 0, 1)
    else:
        radio.send_string("CB269")
# this code checks to see if the pass code is correct, and if yes, allows the user to use the controls, but if not, it sends a message to the other micro:bit after the third incorrect pass code attempt
def Check():
    global enabled
    if input2.includes(code):
        I2C_LCD1602.show_string("|** CORRECT! **|", 0, 0)
        I2C_LCD1602.show_string("|**    :D    **|", 0, 1)
        enabled = 0
        music.play_melody("G B A G C5 B A B ", 120)
    else:
        I2C_LCD1602.show_string("|**INCORRECT!**|", 0, 0)
        I2C_LCD1602.show_string("|**    >:(   **|", 0, 1)
        music.play_melody("C5 A B G A F G E ", 120)

def on_button_pressed_b():
    I2C_LCD1602.show_string(input2, 0, 1)
input.on_button_pressed(Button.B, on_button_pressed_b)

colume = 0
group: List[List[str]] = []
cur = 0
input2 = ""
enabled = 0
key_pressed = ""
code = ""
radio.set_group(17)
pins.set_audio_pin(AnalogPin.P12)
music.set_volume(255)
code = "4783"
key_pressed = "w"
enabled = 1
input2 = ""
cur = -1
led.enable(False)
I2C_LCD1602.lcd_init(0)
group = [["1", "2", "3", "A"],
    ["4", "5", "6", "B"],
    ["7", "8", "9", "C"],
    ["*", "0", "#", "D"]]

def on_forever():
    global cur, input2
    Type()
    if key_pressed.includes("A"):
        Check()
    elif key_pressed.includes("C"):
        I2C_LCD1602.clear()
        cur = -1
        input2 = ""
    if pins.digital_read_pin(DigitalPin.P16) == 0 or pins.digital_read_pin(DigitalPin.P16) == 0:
        Open()
    basic.pause(100)
basic.forever(on_forever)


