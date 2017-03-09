var Game = {
    width: 90,
    height: 42,
    display: null,
 
    init: function() {
        this.display = new ROT.Display({width: this.width, height: this.height, spacing: 1, forceSquareRatio:true, fontSize: 15, fontFamily: "Lucida Console"});
        document.body.appendChild(this.display.getContainer());

        var scheduler = new ROT.Scheduler.Simple();
        scheduler.add(Player, true);
        this.engine = new ROT.Engine(scheduler);
        this.engine.start();
       
        Map.new();
        //Map.draw();
        Player.spawn(Map.free);
        Menu.test();
        Menu.displayMenu();
    },  

};

Game.init();
