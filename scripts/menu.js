var Menu = {
    log: [],
    currentLog: 0,
    write: function(msg) {
        Game.display.drawText(61, 1, msg, 29);
    },

    addLog: function(msg) {
        this.log.push(msg);
        this.clearLog();
        this.updateLog();
    },
    writeLog: function(start) {
        Game.display.drawText(60, 29, "--Log-------------------------", 30);
        for(i = start, line=0; i < start + 10; i++, line++){
            Game.display.drawText(61, 31+line, this.log[i], 28);
        }
    },
    updateLog: function(){
        this.currentLog = this.log.length-10;
        this.writeLog(this.currentLog);
    },
    test: function(){
        for(i=0;i<20;i++){
            this.log.push("this is line number " + i +"!")
        }
    },
    writeStatus: function(){
        Game.display.drawText(61, 1, "Health: %c{red}" + Player.hp, 29);
        Game.display.drawText(73, 1, "| Energy: %c{green}" + Player.mp, 29);
        Game.display.drawText(61, 2, "Atk: %c{lightblue}" + Player.atk, 29);
        Game.display.drawText(69, 2, "| Tuf: %c{lightblue}" + Player.tuf, 29);
        Game.display.drawText(79, 2, "| Acc: %c{lightblue}" + Player.acc, 29);      
    }, 

    displayMenu: function(){
        this.writeLog(this.currentLog);
        this.writeStatus()
    },

    clearLog: function(){
        for(line=0; line < 10; line++){
            Game.display.drawText(61, 31+line, "|                           |", 29);
        };
    }
};