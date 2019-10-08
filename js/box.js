;(function(){
	function container(size){
		this.size=size;
		this.parentElem=document.getElementById('app');
		var that=this;
		this.init=function(){
			this.makewrapper();
		}
		this.makewrapper=function(){
			for(var i=0;i<this.size;i++){

				this.wrapp = new wrapper(this.parentElem,200);
				this.wrapp.init();
				this.parentElem.appendChild(this.wrapp.getElement());

				
				
			}
		}
	}

	function wrapper(parentElem,numOfBoxes){
		this.array=[];
		this.parentElem=parentElem;
		var that=this;
		this.numOfBoxes=numOfBoxes;
		this.element=document.createElement('div');
/*		this.element.style.height="500px";*/
		this.element.style.border="1px solid black";
		this.element.style.position="relative";
		this.parentElem.appendChild(this.element);

		this.init=function(){
			for(var i=0;i<this.numOfBoxes;i++){
			var box=new boxes(this.element,i,5);
			box.init();
			console.log(box);
			box.element.onclick=function(){
				console.log("good");
			}
			this.array[i]=box;
		}
		var z = setInterval(function(){
			for(var i=0;i<that.numOfBoxes;i++){
				for(var j=0;j<that.numOfBoxes;j++){
					if(that.array[i].grid===that.array[j].grid){
					if(i!==j){
					if(that.array[i].x < that.array[j].x  + that.array[j].width && that.array[i].x + that.array[i].width > that.array[j].x && that.array[i].y < that.array[j].y + that.array[j].height && that.array[i].y + that.array[i].height > that.array[j].y)
						{
						that.array[i].collide();
						}
				}
			}

					}
				}
			},5);
		}




		this.getElement=function(){
			return this.element;
		}

		
	}


	function boxes(parentElement,boxes,width){
		this.FPS=100;
		this.FRAME_RATE=1000/this.FPS;
		this.boxes=boxes;
		this.parentElement=parentElement;
		this.x=0;
		this.y=0;
		this.width=width;
		this.height=width;
		this.dx=0;
		this.dy=0;
		this.speed=0;
		this.active=true;
		this.grid=1;
		var that=this;

		this.init=function(){
			this.test=this.createBoxes();
			console.log(this.test);
			this.randomize();
			this.drawBoxes();
			window.onresize=function(){
				console.log("this is the window size",window.screen.width);
			that.randomize();
			that.drawBoxes();
			that.makeGrid();
		}
			var that=this;
			setInterval(function(){
				that.moveBoxes(); 
				that.drawBoxes();
				
			},5);

			setInterval(function(){
				that.makeGrid();
			},1);
			return this;

		}
		this.makeGrid=function(){
			if(this.x<300){
				this.grid=1;
			}
			else if(this.x<=600&&this.x>=300){
				this.grid=2;
			}
			else if(this.x>600&&this.x<=1000){
				this.grid=3;
			}
			else{
				this.grid=4;
			}
		}


		this.randomize=function(){
			var randomNumX=Math.random();
			 	randomNumX=randomNumX*1400;
			 	console.log(screen.width);
				randomNumX=Math.ceil(randomNumX);
			var randomNumY=Math.random();
				randomNumY=randomNumY*600;
				randomNumY=Math.ceil(randomNumY);
				
			var randomDx=Math.floor(Math.random()*2)==1 ? this.dx=1:this.dx= -1;
				
			var	randomDy=Math.floor(Math.random()*2)==1 ? this.dy=1: this.dy=-1;

			this.x=randomNumX;
			this.y=randomNumY;
		}

		this.createBoxes=function(){
			this.element=document.createElement('button');
			this.element.style.borderRadius="50%";
			this.element.setAttribute('id',`ball${this.boxes}`);
			this.element.style.backgroundColor="red";
			this.element.style.height=this.width;
			this.element.style.width=this.width;
			this.element.style.border="2px solid blue";
			this.element.style.position="absolute";
			this.parentElement.appendChild(this.element);
			return this.element;
		}
		this.drawBoxes=function(){

			this.element.style.left=this.x+"px";
			this.element.style.top=this.y+"px";

		}

		this.moveBoxes=function(){
			this.x=this.x+this.dx*1;
			if(this.x>1400||this.x<0){
				this.dx*=-1;
			}
			this.y=this.y+this.dy*1;
			if(this.y>600|| this.y<0){
				this.dy*=-1;
			}
		}

		this.collide=function( ){
			this.dx*=-1;
			this.dy*=-1;

		}
	}


	var xyz=new container(size=1);
	xyz.init();



})()