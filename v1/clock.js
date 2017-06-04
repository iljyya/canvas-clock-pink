'use strict';

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

const BACKGROUND_WIDTH = CANVAS_WIDTH /20; //边框线条宽度

const RADIUS_X = CANVAS_WIDTH / 2 ; //x中心---即 x 半径
const RADIUS_Y = CANVAS_WIDTH / 2 ; // y中心 --- 即 Y半径

var hourNumber = [3,4,5,6,7,8,9,10,11,12,1,2];//小时数---数组

var hourNumberLength = hourNumber.length;

var clockCanvas = document.getElementById('clock');

// console.log(clock_canvas);

clockCanvas.width = CANVAS_WIDTH;
clockCanvas.height = CANVAS_HEIGHT;

var ctx =  clockCanvas.getContext('2d');
ctx.translate(RADIUS_X , RADIUS_Y);//重新映射画布上的 (0,0) 位置


draw();//画

//总函数
function draw() {

    ctx.clearRect(-RADIUS_X ,-RADIUS_Y,CANVAS_WIDTH,CANVAS_HEIGHT   );
    var now = new Date();
    var hour = now.getHours();//小时数
    var minutes = now.getMinutes();//分钟数
    var seconds = now.getSeconds();//秒数

    drawBackground(ctx); //画表盘背景
    drawDot();//画时刻点
    drawHour(hour,minutes,seconds);//画时针
    drawMinute(minutes,seconds);//画分针
    drawSecond(seconds);//画秒针
}

//每秒刷新 
setInterval(draw, 1000);

//画表盘背景
function drawBackground(ctx) {

    // ctx.clearArc()
    ctx.beginPath();
    ctx.strokeStyle = "pink";
    ctx.lineWidth = BACKGROUND_WIDTH; //线条宽度
    // context.arc(x,y,r,sAngle,eAngle,counterclockwise);
    ctx.arc( 0, 0, RADIUS_X-BACKGROUND_WIDTH / 2, 0, 2*Math.PI, false);
    ctx.stroke();
    ctx.closePath();



    ctx.font = CANVAS_WIDTH * 0.1+ 'px Arial';

    ctx.textAlign = 'center';//文本的中心被放置在指定的位置
    ctx.textBaseline = 'middle';

    hourNumber.forEach(function (number,index) { //遍历小时数，并写上数字

        var rad = 2 * Math.PI / hourNumberLength * index ; //每个小时对应的弧度
        ctx.beginPath();
        ctx.fillStyle = '#FF34B3';
        var x = RADIUS_X * 0.7 * Math.cos(rad);
        var y = RADIUS_X * 0.7 * Math.sin(rad);
        // console.log('x,y',x,y);
        console.log('num',number);
        ctx.fillText(number,x,y);
        ctx.closePath();
    });

    for (var i = 0; i < 60; i++) { //遍历分钟，并打上点

       var rad = 2 * Math.PI / 60 * i;
       var x = RADIUS_X * 0.85 * Math.cos(rad);
       var y = RADIUS_X * 0.85 * Math.sin(rad);
       ctx.beginPath();
       if(i % 5 == 0){  // 小时刻度的点
            ctx.fillStyle = '#FF00FF';
            ctx.arc(x,y,2,0,2*Math.PI,false);
       }else{   // 其他分钟刻度的点
            ctx.fillStyle = '#ccc';
            ctx.arc(x,y,2,0,2*Math.PI,false);
       }
       ctx.fill();
       ctx.closePath();
    }

}

//画出时针
function drawHour(hour,minute,second) {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = RADIUS_X * 0.04;
    ctx.lineCap = 'round';
    ctx.rotate(2*Math.PI / (12*3600) * (hour*3600+minute*60+second));
    ctx.moveTo(0,10);
    ctx.lineTo(0,- RADIUS_X * 0.7 /2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}
//画出分针
function drawMinute(minute,second) {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = RADIUS_X * 0.02;
    ctx.lineCap = 'round';
    ctx.rotate(2*Math.PI / 3600 * (minute*60+second));
    ctx.moveTo(0,10);
    ctx.lineTo(0,- RADIUS_X * 0.9 /2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

//画出秒针
function drawSecond(second) {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = RADIUS_X * 0.01;
    ctx.lineCap = "round";
    ctx.fillStyle = 'red';
    ctx.rotate(2 * Math.PI / 60 * second)
    // ctx.moveTo(-RADIUS_X * 0.02,-RADIUS_X * 0.2);
    ctx.moveTo(RADIUS_X * 0.02,-RADIUS_X * 0.2);
    // ctx.lineTo(-RADIUS_X * 0.01,RADIUS_X * 0.7 );
    ctx.lineTo(RADIUS_X * 0.01,RADIUS_X * 0.7 );
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

//画时钟的中心点
function drawDot() {
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(0, 0,RADIUS_X * 0.04, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.closePath();
}


