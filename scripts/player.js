var Player = {
    x:0, 
    y:0,

    sym: "@",
    fg:"#B6C406",
    bg:"#3c4d03",

    hp: 100, //health you dumbshit
    mp: 100, //energy for DNA
    atk: 5, //how much dmg
    tuf: 5, //% to not get hit
    acc: 5, //% to hit

    draw: function(){
        Game.display.draw(this.x,this.y, this.sym, this.fg, this.bg);
    }, 

    spawn: function(){
        this.x = 20;
        this.y = 20;
        this.draw();
    },
    
    act: function(){
        Game.engine.lock();
    /* wait for user input; do stuff when user hits a key */
        window.addEventListener("keydown", this);
    },

    handleEvent: function(e){
        var code = e.keyCode;
        
        var keyMap = {};
        keyMap[38] = 0;
        keyMap[33] = 1;
        keyMap[39] = 2;
        keyMap[34] = 3;
        keyMap[40] = 4;
        keyMap[35] = 5;
        keyMap[37] = 6;
        keyMap[36] = 7;
 
        if (!(code in keyMap)) { return; }
 
        var diff = ROT.DIRS[8][keyMap[code]];
        var newX = this.x + diff[0];
        var newY = this.y + diff[1];
 
        var newKey = newX + "," + newY;
        if ((Map.map[newKey].sym === "#")) { return; } /* cannot move in this direction */
        //if ((Mobs.map[newKey]))
        Game.display.draw(this.x, this.y, Map.map[this.x+","+this.y].sym, Map.map[this.x+","+this.y].fg, Map.map[this.x+","+this.y].bg);
        this.x = newX;
        this.y = newY;
        this.draw();
        window.removeEventListener("keydown", this);

        Menu.addLog("You moved to: " + newX + "," + newY + "!");

        Game.engine.unlock();
    },

};