var Map = {
    width: 60,
    height: 42,
    display: null,
    map: {},
    free: [],
    entities: {},
    points: {},
    pointMap: {0:"a",1:"b",2:"c",3:"d",4:"e",5:"f",6:"g",7:"h",8:"i",9:"j",10:"k",11:"l",12:"m",13:"n",14:"o"},
    
 
    new: function() {
        this._generateMap();
    },
    
    _generateMap: function() {
        var ind = 0
    	for(i=0;i < 5;i++){
          for(j=0;j < 3;j++){
        	  this.points[ind] = {
                  x: (Math.round(ROT.RNG.getUniform()*11)+(i*11)+1),  
                  y: (Math.round(ROT.RNG.getUniform()*13)+(j*13)+1)
                  }
            ind++;
          }
        }

        for(cx=0;cx<this.width;cx++){
        	for(ry=0;ry<this.height;ry++){
          		var key = cx+","+ry;
         			this.map[key] = {sym: this._closestPoint(cx, ry)};
          }
        }
        
      this._findBound();
      
        // for (p in this.points){
        //  	var key = this.points[p].x+","+this.points[p].y;
        //  	this.map[key]= {sym: "0", col: "#f00"};
        // }
      
        this._hallways();
        this._borders();
        this._stairs();
        this.draw();
    },
    
    _stairs: function(){
        var key = this.free.random();
        this.map[key] = {sym: ">", bg: "#5738D3", fg: "#D3D3D3"}
    },
 
    _closestPoint: function(x, y){
    		distList = []
    		for(p in this.points){
        		distList[p] = (Math.abs(this.points[p].x - x) + Math.abs(this.points[p].y - y));
        }
        minDist = Math.min(...distList);
        ind = distList.indexOf(minDist);
        return this.pointMap[ind];
    },
  
    _findBound: function(){
      var wall = "#";
      var empty = " ";
       for(x=1;x<this.width-1;x++){
        	for(y=1;y<this.height-1;y++){
              var key = x+","+y;
              var sym = this.map[key].sym;
          		if ((sym !== this.map[((x-1)+","+(y))].sym && (this.map[((x-1)+","+(y))].sym !== wall)) || 
                (sym !== this.map[((x+1)+","+(y))].sym && (this.map[((x+1)+","+(y))].sym !== wall)) ||
                (sym !== this.map[((x)+","+(y-1))].sym && (this.map[((x)+","+(y-1))].sym !== wall)) ||
                (sym !== this.map[((x)+","+(y+1))].sym && (this.map[((x)+","+(y+1))].sym !== wall))){
                  this._makeWall(key);
              }
          }
        }
      for(x=1;x<this.width-1;x++){
        	for(y=1;y<this.height-1;y++){
              var key = x+","+y;
              var sym = this.map[key].sym;
          		if (sym !== wall){
                this.map[key].sym = empty;
                this.map[key].bg = ROT.Color.toHex(ROT.Color.randomize([195,125,125], [5,2,3]));
                this.free.push(key);
              }
          }
        }
    },
  
 
    _borders: function(){
        for(x=0;x<this.width;x++){
            var key = x+","+0;
            this._makeWall(key);
            var key = x+","+parseInt(this.height-1);
            this._makeWall(key);
        }
        for(y=0;y<this.height;y++){
            var key = 0+","+y;
            this._makeWall(key);
            var key = parseInt(this.width-1)+","+y;
            this._makeWall(key);
        }
    },
  
    _makeWall: function(key){
        this.map[key].sym = "#";
        this.map[key].bg = "#8A0707";
        this.map[key].fg = "#600202";
    },
  
    _hallways: function(){
        for(p in this.points){
          var point = this.points[p];
          this._clearWall(point.x, point.y);
          for(step=1;step<20;step++){
            if(this._clearWall(point.x+step,point.y)){break};
          }
          for(step=1;step<20;step++){
            if(this._clearWall(point.x-step,point.y)){break};
          }
          for(step=1;step<20;step++){
            if(this._clearWall(point.x,point.y+step)){break};
          }
          for(step=1;step<20;step++){
            if(this._clearWall(point.x,point.y-step)){break};
          } 
       }
    },
   
    _clearWall: function(x, y){
      var key = x+","+y;
        try{
          if(this.map[key].sym === "#"){
            this.map[key].sym =" "
             this.map[key].bg = "#C37D7D";
            this.map[key].fg = "#C37D7D";
            return true;
          }else if(this.map[key].sym !== " "){
            return true;
          }
        }catch(err){console.log("X:"+x+" Y:"+y)};
      return false;
    },

    draw: function() {
        for (var key in this.map) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            Game.display.draw(x, y, this.map[key].sym, this.map[key].fg, this.map[key].bg);
        }
        // for (var key in this.entities) {
        //     var parts = key.split(",");
        //     var x = parseInt(parts[0]);
        //     var y = parseInt(parts[1]);
        //     Game.display.draw(x, y, this.entities[key].sym, this.entities[key].fg, this.entities[key].bg);
        // }
    },
};

Game.init();
