/*
* @Author: Administrator
* @Date:   2019-12-08 11:28:49
* @Last Modified by:   Administrator
* @Last Modified time: 2019-12-08 18:10:16
*/

var box = document.getElementById('box');
var onNavList = document.getElementById('nav').children;
var slider = document.getElementById('slider');
var left = document.getElementById('left');
var right = document.getElementById('right');
var p = document.getElementById("pp");
var text = p.innerHTML;
var index = 1;
var timer;
var isMoving = false;
var i = 0;
function removing(){
	i++;
	if(i >= 135){
		p.style.left = "950px";
		i = 1;
		console.log(i);
	}
	animate(p,{left:950 - 10 * i});
}
var te = setInterval(removing, 100);
p.onmouseover = function(){
	clearInterval(te);
}
p.onmouseout = function(){
	te = setInterval(removing, 70);
}
function next(){
	if(!isMoving){
		isMoving = true;
		index++;
		navChange();
		animate(slider,{left:-1200 * index}, function(){
			if(index == 6){
				slider.style.left = "-1200px";
				index = 1;
			}
			isMoving = false;
		});
	}
}
function prev(){
	if(!isMoving){
		isMoving = true;
		index--;
		navChange();
		animate(slider,{left:-1200 * index}, function(){
			if(index == 0){
				slider.style.left = "-6000px";
				index = 5;
			}
			isMoving = false;
		});
	}
}

timer = setInterval(next, 2000);
//鼠标划入
box.onmouseover = function(){
	animate(left,{opacity:50});
	animate(right,{opacity:50});
	clearInterval(timer);
}

//鼠标划出
box.onmouseout = function(){
	animate(left,{opacity:0});
	animate(right,{opacity:0});
	timer = setInterval(next, 2000);
}
right.onclick = next;
left.onclick = prev;

for(var i = 0; i < onNavList.length; i++){
	onNavList[i].idx = i;
	onNavList[i].onclick = function(){
		if(isMoving)
			return ;
		isMoving = true;
		index = this.idx + 1;
		navChange();
		animate(slider,{left: -1200 * index});
		isMoving = false;
	}
}

function navChange(){
	for(var i = 0; i < onNavList.length; i++)
		onNavList[i].className = "";
	if(index == 6)
		onNavList[0].className = 'active';
	else if(index == 0)
		onNavList[4].className = 'active';
	else onNavList[index - 1].className = 'active';
}