;(function(){
	function container(size,noofballs){
		this.size=size;
		this.noofballs=noofballs;
		this.parentElem=document.getElementById('app');
		var that=this;
		this.init=function(){
			this.makewrapper();
		}
		this.makewrapper=function(){
			for(var i=0;i<this.size;i++){

				this.wrapp = new wrapper(this.parentElem,this.noofballs);
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
/*		this.element.style.height="500px";
		this.element.style.width="1000px";*/
		this.element.style.float="left";
		this.element.style.border="1px solid black";
		this.parentElem.appendChild(this.element);

		this.init=function(){
			for(var i=0;i<this.numOfBoxes;i++){
			var box=new boxes(this.element,i,5);
			box.init();
			this.array[i]=box;
		}

		var z = setInterval(function(){
			for(var i=0;i<that.numOfBoxes;i++){
				for(var j=0;j<that.numOfBoxes;j++){

					if(that.array[i].grid===that.array[j].grid ||( that.array[i].grid)===(that.array[j].grid-1 ) ){

					if(i!==j){
					if(that.array[i].x < that.array[j].x  + that.array[j].width && that.array[i].x + that.array[i].width > that.array[j].x && that.array[i].y < that.array[j].y + that.array[j].height && that.array[i].y + that.array[i].height > that.array[j].y)
						{
						that.array[i].collide();
						}
				}
			}

					}
				
				}
			},4);
/*		var z = setInterval(function(){
			for(var i=0;i<that.numOfBoxes;i++){
				for(var j=0;j<that.numOfBoxes;j++){
					if(that.array[i].grid===that.array[j].grid && that.array[i].active){
					if(i!==j){
							var dx=(that.array[i].x+((that.array[i].width)/2))-(that.array[j].x+((that.array[j].width)/2));
							var dy=(that.array[i].y+((that.array[i].height)/2))-(that.array[j].y+((that.array[j].height)/2));
							var distance=Math.sqrt(dx*dx+dy*dy);
							if(distance<that.array[i].radius+that.array[j].radius)
						{
						that.array[i].collide();
						}
				}
			}

					}
				}
			},5);*/
			/*setInterval(function(){
				var j=0;
				that.array.sort(function(a,b){return a.x-b.x;});
				for(var i=0;i<that.numOfBoxes;i++){
					j=i+1;
					j=j%that.numOfBoxes;
					if(that.array[i].x < that.array[j].x  + that.array[j].width && that.array[i].x + that.array[i].width > that.array[j].x && that.array[i].y < that.array[j].y + that.array[j].height && that.array[i].y + that.array[i].height > that.array[j].y)
						{
						that.array[i].collide();
						that.array[i].collideEnd();
						that.array[j].collide();
						that.array[j].collideEnd();
						}
				}
			},5);*/
		}




		this.getElement=function(){
			return this.element;
		}

		
	}


	function boxes(parentElement,boxes,width){
		this.FPS=60;
		this.FRAME_RATE=1000/this.FPS;
		this.boxes=boxes;
		this.parentElement=parentElement;
		this.x=0;
		this.y=0;
		this.width=width;
		this.height=width;
		this.dx=1;
		this.dy=1;
		this.ballmax=parseInt(document.getElementById('ballsize').value)?parseInt(document.getElementById('ballsize').value):10;
		this.speed=parseInt(document.getElementById('speedofboxes').value)?parseInt(document.getElementById('speedofboxes').value):1;
		this.active=true;
		this.grid=1;
		this.radius=10;
		this.mass=1;
		var that=this;
		this.momentum=1;
		this.totalsize=document.getElementById('app').clientWidth;

		this.init=function(){
			this.randomize();
			this.test=this.createBoxes();
			
			this.drawBoxes();
			window.onresize=function(){
			that.randomize();
			this.test=this.createBoxes();
		}


			var that=this;
			setInterval(function(){
				that.moveBoxes(); 
				that.drawBoxes();
				
			},5);

			setInterval(function(){
				that.makeGrid();
			},3);
			return this;

		}
		this.makeGrid=function(){


			if(this.x<(this.totalsize/3) & this.y<300){
				this.grid=1;
			}
			else if(this.x<(this.totalsize/3) && this.y>300){
				this.grid=2;
			}
			else if(this.x<=(this.totalsize/2) && this.x>=(this.totalsize/3) && this.y<300){
				this.grid=2;
			}
			else if(this.x<=(this.totalsize/2) && this.x>=(this.totalsize/3) && this.y>300){
				this.grid=3;
			}
			else if(this.x>(this.totalsize/2) && this.x<=(this.totalsize) && this.y<300){
				this.grid=3;
			}
			else if(this.x>(this.totalsize/2) && this.x<=(this.totalsize) && this.y>600){
				this.grid=4;
			}
			else{
				this.grid=4;
			}
		}


		this.randomize=function(){
			var randomNumX=Math.random();
			 	randomNumX=randomNumX*document.getElementById('app').clientWidth-50;
				randomNumX=Math.ceil(randomNumX);
			var randomNumY=Math.random();
				randomNumY=randomNumY*600;
				randomNumY=Math.ceil(randomNumY);
			var randomMass=Math.random();
				randomMass=randomMass*(this.ballmax-1)+1;
			var randomDx=Math.floor(Math.random()*2)==1 ? this.dx=2:this.dx= -2;
				
			var	randomDy=Math.floor(Math.random()*2)==1 ? this.dy=2: this.dy=-2;

			this.x=randomNumX;
			this.y=randomNumY;
			this.mass=randomMass;
			this.width=this.width*this.mass;
			this.height=this.height*this.mass;
			this.momentum=(1/this.mass);
		}
 
		this.createBoxes=function(){
			this.element=document.createElement('button');
			this.element.style.borderRadius="50%";
			this.element.setAttribute('id',`ball${this.boxes}`);
			this.element.style.backgroundImage=`url('./images/ball.png')`;
			this.element.style.backgroundRepeat="no-repeat";
			this.element.style.border="none";
			this.element.style.backgroundSize="cover";
			this.element.style.height=this.height+"px";
			this.element.style.width=this.width+"px";
/*			this.element.style.border="2px solid blue";*/
			this.element.style.position="absolute";
			this.parentElement.appendChild(this.element);
			var that=this;
			this.element.onclick=function(){
				that.element.style.backgroundImage="linear-gradient(green,yellow)";
/*				that.element.style.height="0px";
				that.element.style.width="0px";*/
				that.active=null;
				/*that.parentElement.removeChild(that.element);*/
			}
			return this.element;
		}
		this.drawBoxes=function(){

			this.element.style.left=this.x+"px";
			this.element.style.top=this.y+"px";

		}

		this.moveBoxes=function(){
			this.x=this.x+this.dx*(this.momentum)*this.speed;
			if(this.x>(document.getElementById('app').clientWidth-50)||this.x<0){
				this.dx*=-1;
			}
			this.y=this.y+this.dy*(this.momentum)*this.speed;
			if(this.y>600|| this.y<0){
				this.dy*=-1;
			}
		}

		this.collide=function( ){
			this.dx*=-1;
			this.dy*=-1;

		}
		this.smashed=function(){
			this.element.style.backgroundColor="green";
		}
	}




	this.startgame=document.getElementById('start');
	var that=this;
	this.startgame.onclick=function(){
		var noofballs=parseInt(document.getElementById('howmanyballs').value);
		var xyz=new container(size=1,noofballs=10);
		xyz.init();
		that.startgame.disabled=true;
	}


})()