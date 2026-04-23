// 1 = B 0 = A  3 = X 4 = Y
// up -1 down = 0.1428571428571428 idle = 3.2857142857142856 right = -0.4285714285714286 left = 0.7142857142857142
var zero_axe_last_state = 0;
var a_button_last_state = 0;
var direction_buttons_last_state = {
    down:0.1428571428571428,
    up: -1,
    left:0.7142857142857142,
    right:-0.4285714285714286,
    idle:3.2857142857142856
}
function controllerLoop() {
    gp = navigator.getGamepads()[0]
    if(gp.buttons[0].pressed == false && a_button_last_state == true) {
        item_action()
    }

    if(gp.buttons[13].pressed == false && direction_buttons_last_state.down == true) {
        gamepad_zero_axe_down()
        
    }
    if(gp.buttons[12].pressed == false && direction_buttons_last_state.up == true) {
        gamepad_zero_axe_up()
    }

    a_button_last_state = gp.buttons[0].pressed
    direction_buttons_last_state.down = gp.buttons[13].pressed
    direction_buttons_last_state.up = gp.buttons[12].pressed
    requestAnimationFrame(controllerLoop)
}

console.log(navigator.getGamepads())

addEventListener("gamepadconnected", (e) => {
    gp = navigator.getGamepads()[e.gamepad.index]
    
    
    requestAnimationFrame(controllerLoop);
})