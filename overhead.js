const overhead = document.getElementById("console_overhead_wrap")
const canvas = document.getElementById("canvas")

var is_overhead_active = false;
var current_selected_elm;
var current_selected_id;
function activate_overhead() {
    if(overhead.style.visibility == "hidden") {
        overhead.style.visibility ="visible";
        is_overhead_active = true;
        item_select(1);
        activate_fade();
        
    }
    else {
        is_overhead_active = false;
        overhead.style.visibility ="hidden";
        deactivate_fade();
    }
    
}
function hide_overhead() {
    overhead.style.visibility ="hidden";
}

function activate_fade() {
    var fade_obj = document.getElementById("fade_id")
    fade_obj.classList.add("fade_overhead")
}
function deactivate_fade() {
    var fade_obj = document.getElementById("fade_id")
    fade_obj.classList.remove("fade_overhead")
}
hide_overhead();
function select_first_element() {
    item_select(0)
}

function item_select(id) {
    var item = document.querySelector("[data-id='"+ id+"']");
    if(current_selected_elm != null) {
        current_selected_elm.classList.toggle("overhead_top_active");
    }
    current_selected_elm = item;
    current_selected_id = id;
    
    current_selected_elm.classList.toggle("overhead_top_active");
}
function overhead_left() {
    if(is_overhead_active) {
        item_select(current_selected_elm.getAttribute("data-prev-id"))
    }
    
}
function overhead_right() {
    if(is_overhead_active) {
        item_select(current_selected_elm.getAttribute("data-next-id"))
    }
}
function arrow_right() {
    let id = item.getAttribute("data_id");
    //item_select(parseInt(id) + 1);
    item_select(item.getAttribute("data_next_id"));

}
function arrow_left() {
    let id = item.getAttribute("data_id");
    //item_select(parseInt(id) + 1);
    item_select(item.getAttribute("data_prev_id"));
}
function game_select(name) {
    localStorage.setItem("selected_game", name);
    window.location.href="/game/"+name;
}
function button_A() {
    item_action()
}
function item_action() {
    if(current_selected_elm == 0 ) {
        resume()
    }
    else if(current_selected_id == 1) {
        exit()
    }
}
function get_status_overhead() {
    if(is_overhead_active) {
        return true
    }
    else {
        return false
    }
}


function gamepad_zero_axe_down() {
    overhead_left()
}

function gamepad_zero_axe_up() {
    overhead_right()
}


function resume() {
    activate_overhead()
}

function exit() {
    window.location.href = "/";
}