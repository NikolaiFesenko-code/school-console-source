



//var item = document.getElementById("item1");
const SOUND_IS_ON = false;

var user;
var item;
var gp;
var beep = document.getElementById("beep_audio")


function item_select(id) {
    item = document.querySelector("[data_id='"+ id+"']");
    console.log(item)
    item.focus();
}

function arrow_down() {
    item.scrollIntoView();
    item_select(item.getAttribute("data_next_id"));

}
function arrow_up() {
    item.scrollIntoView();
    item_select(item.getAttribute("data_prev_id"));

}
function game_select(name) {
    window.location.href="/game/"+name;
}
function item_action() {
    if(item.className.includes("item")) {
        game_select(item.getAttribute("data_name"));
    }
}

function key_up_event(e) {
    if(e.key == "ArrowDown") {
        arrow_down();
    }
    if(e.key == "ArrowUp") {
        arrow_up();
    }
    if(e.key == "Enter" || e.key == "h" ) {
        item_action();
    }
    if(e.key == "l") {
        window.location.reload();
    }
    if(SOUND_IS_ON) {
        beep.play();
    }
}

//deprecated
function gamepad_zero_axe_down() {
    arrow_down()
}
//deprecated
function gamepad_zero_axe_up() {
    arrow_up()
}


function get_game_elm_html(name,id_name,curr_id,array_size, cover_image) {
    var next_id = curr_id + 1;
    var prev_id = curr_id - 1;
    if(curr_id == 0) {
        prev_id  = array_size - 1;
    }
    if(curr_id == array_size - 1 ) {
        next_id = 0;
    }
    return `<div class="row row-cols-2 align-items-center justify-content-center mb-5 item " data_id="`+curr_id+`" data_name="`+id_name+`" class="item" data_prev_id="`+prev_id+`" data_next_id="`+next_id+`" tabindex="-1" >
            <div class="col-auto">
                <img style="width: 128px; height: 128px;" src="`+("/getcover/"+id_name)+`" alt="">
            </div>
            <div class="col-auto">
                <div>
                    <h5>`+name+`</h5>
                </div>
            </div>    
        </div>`
}
function get_games() {
    axios.get("/getgames").then(response => {
        const data = response.data;
        console.log(data)
        const wrapElement = document.getElementById("items_wrap")
        var html = "";
        for(var i = 0; i < data.length; i++) {
            console.log(data[i].name)
            var newGameElement = document.createElement("div")
            newGameElement.setAttribute("data_id",i)
            html += get_game_elm_html(data[i].name,data[i].id,i, data.length,data[i].cover_img)
            console.log("Added Element")
        }
        wrapElement.innerHTML = html;


    }).catch(err => {
        console.log(err)
    }).finally(() => {
        console.log("added All Elements")
        item_select(0)
    })
}











function getUserInfo() {
    console.log("request USer")
    axios.get("/getUserInfo").then(response=> {
        user = response.data;
    }).catch(err => {
        console.log(err);   
    }).finally( () => {
        document.getElementById("user_name_placeholder").innerText = user.name;
        document.getElementById("game_name_placeholder").innerText = user.lastGame;
    })
}

getUserInfo();
get_games();




addEventListener("keyup", key_up_event);
addEventListener("focusout", (e) => {
    item.focus();
});


//<link  rel="stylesheet" href="bg.css">