const express = require("express");
const cors = require("cors")
const fs = require("node:fs");

const PORT = 9999;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use(express.static(__dirname +"/public"));
app.use("/game", express.static(__dirname + "/games"));

var games_list;
var user;

fs.readFile("games.json",  (err,data) => {
        if(err) {
            console.log(err)
        }
        else {
            games_list = JSON.parse(data)
        }
})

//deprecated
app.get("/",(req,res) => {

    
    res.send(games_list);
    //res.sendFile("./index.html");
})


app.get("/game/:id", (req,res) => {

    for (let i = 0; i < games_list.length; i++) {
        if(req.params.id == games_list[i].id) {
            user.lastGame = games_list[i].name;
            saveUser();
            res.sendFile("./index.html", {root:__dirname+"/games" + games_list[i].path});
        }
        
    }
});

app.get("/getgames", (req,res) => {
    res.send(JSON.stringify(games_list));
})
app.get("/getoverhead", (req,res) => {
    res.sendFile(__dirname + "/overhead.js")
})
app.get("/getcover/:id", (req,res) => {

    for (let i = 0; i < games_list.length; i++) {
        if(req.params.id == games_list[i].id) {
            res.sendFile(__dirname + "/games/" + games_list[i].cover_img);
        }
        
    }
});


app.get("/getUserInfo", (req,res)=> {
    fs.readFile(__dirname + "/user.json",  (err,data) => {
        if(err) {
             console.log(err)
             res.send(err);
        }
        else {
            user = JSON.parse(data);
             res.send(data);
        }
    })
})
app.post("/setUserName", (req,res) => {
    fs.readFile(__dirname + "/user.json",  (err,data) => {
        if(err) {
             console.log(err)
             res.send(err);
        }
        else {
            user = JSON.parse(data);
            console.log(user)
            user.name = req.body.name;
            saveUser();
            console.log("New user username: "+req.body.name);
            res.send(200)
        }
    })
    
})


app.get("/getgamepad", (req,res) => {
    res.sendFile(__dirname + "/public/gamepad.js")
})

function saveUser() {
    fs.writeFileSync(__dirname + "/user.json", JSON.stringify(user));
}
function scan() {
    var games = []
    const dirs = fs.readdirSync(__dirname + "/games" )
    for(var i = 0; i < dirs.length; i++) {
        let game_path = __dirname + "/games/"+ dirs[i]
        try {
            console.log(game_path + ": checking")
            const data = fs.readFileSync(game_path + "/game.json", (err,data) => {
                 
                
            })
            console.log(game_path + ": game.json found")
            let game = JSON.parse(data)
            games.push(game)
        }
        catch (err) {
             console.log(game_path + ": game.json not found")
        }
        
    }
    games_list = games;
    fs.writeFileSync(__dirname + "/games.json", JSON.stringify(games));
}

setInterval(()=> {
   scan()
}, 10000)


app.listen(PORT,'0.0.0.0',() => {
    console.log("App listens on " + PORT)
    ///open_browser()
    //spawn('open', ['http://localhost:9000']);
    
});