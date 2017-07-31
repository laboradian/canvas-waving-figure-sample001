/* global */
import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import 'babel-polyfill'

//import _ from 'lodash'

// index.html ファイルをコピーする
require('file-loader?name=../../dist/[name].[ext]!../index.html');

console.log('%c 🌈 Laboradian.com 🌈 %c http://laboradian.com ',
  'background: #2383BF; color: #fff; font-size: 1.4em;',
  'background: #e3e3e3; color: #000; margin-bottom: 1px; padding-top: 4px; padding-bottom: 1px;');


let canvas;
let ctx;


window.addEventListener('load', () => {

  drawFukidashi();
  drawHurt();
  drawPacman();
  drawUsingPath2d();
  drawWavingCircle();

});

const drawFukidashi = () => {

  canvas = document.querySelector('#screen1');
  canvas.width = 150;
  canvas.height = 150;
  ctx = canvas.getContext('2d');

  // 二次曲線の例
  ctx.beginPath();
  ctx.moveTo(75,25);
  ctx.quadraticCurveTo(25,25,25,62.5);
  ctx.quadraticCurveTo(25,100,50,100);
  ctx.quadraticCurveTo(50,120,30,125);
  ctx.quadraticCurveTo(60,120,65,100);
  ctx.quadraticCurveTo(125,100,125,62.5);
  ctx.quadraticCurveTo(125,25,75,25);
  ctx.stroke();
};

const drawHurt = () => {

  canvas = document.querySelector('#screen2');
  canvas.width = 150;
  canvas.height = 150;
  ctx = canvas.getContext('2d');

  // 三次ベジェ曲線の例
  ctx.beginPath();
  ctx.moveTo(75,40);
  ctx.bezierCurveTo(75,37,70,25,50,25);
  ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
  ctx.bezierCurveTo(20,80,40,102,75,120);
  ctx.bezierCurveTo(110,102,130,80,130,62.5);
  ctx.bezierCurveTo(130,62.5,130,25,100,25);
  ctx.bezierCurveTo(85,25,75,37,75,40);
  ctx.fill();

};

const drawPacman = () => {

  let i;

  // 角丸の四角形を描画するためのユーティリティ関数

  const roundedRect = (ctx,x,y,width,height,radius) => {
    ctx.beginPath();
    ctx.moveTo(x,y+radius);
    ctx.lineTo(x,y+height-radius);
    ctx.arcTo(x,y+height,x+radius,y+height,radius);
    ctx.lineTo(x+width-radius,y+height);
    ctx.arcTo(x+width,y+height,x+width,y+height-radius,radius);
    ctx.lineTo(x+width,y+radius);
    ctx.arcTo(x+width,y,x+width-radius,y,radius);
    ctx.lineTo(x+radius,y);
    ctx.arcTo(x,y,x,y+radius,radius);
    ctx.stroke();
  };

  canvas = document.querySelector('#screen3');
  canvas.width = 150;
  canvas.height = 150;
  ctx = canvas.getContext('2d');

  roundedRect(ctx,12,12,150,150,15);
  roundedRect(ctx,19,19,150,150,9);
  roundedRect(ctx,53,53,49,33,10);
  roundedRect(ctx,53,119,49,16,6);
  roundedRect(ctx,135,53,49,33,10);
  roundedRect(ctx,135,119,25,49,10);

  ctx.beginPath();
  ctx.arc(37,37,13,Math.PI/7,-Math.PI/7,false);
  ctx.lineTo(31,37);
  ctx.fill();

  for (i=0;i<8;i++){
    ctx.fillRect(51+i*16,35,4,4);
  }

  for (i=0;i<6;i++){
    ctx.fillRect(115,51+i*16,4,4);
  }

  for (i=0;i<8;i++){
    ctx.fillRect(51+i*16,99,4,4);
  }

  ctx.beginPath();
  ctx.moveTo(83,116);
  ctx.lineTo(83,102);
  ctx.bezierCurveTo(83,94,89,88,97,88);
  ctx.bezierCurveTo(105,88,111,94,111,102);
  ctx.lineTo(111,116);
  ctx.lineTo(106.333,111.333);
  ctx.lineTo(101.666,116);
  ctx.lineTo(97,111.333);
  ctx.lineTo(92.333,116);
  ctx.lineTo(87.666,111.333);
  ctx.lineTo(83,116);
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(91,96);
  ctx.bezierCurveTo(88,96,87,99,87,101);
  ctx.bezierCurveTo(87,103,88,106,91,106);
  ctx.bezierCurveTo(94,106,95,103,95,101);
  ctx.bezierCurveTo(95,99,94,96,91,96);
  ctx.moveTo(103,96);
  ctx.bezierCurveTo(100,96,99,99,99,101);
  ctx.bezierCurveTo(99,103,100,106,103,106);
  ctx.bezierCurveTo(106,106,107,103,107,101);
  ctx.bezierCurveTo(107,99,106,96,103,96);
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(101,102,2,0,Math.PI*2,true);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(89,102,2,0,Math.PI*2,true);
  ctx.fill();

};

const drawUsingPath2d = () => {

  const canvas = document.getElementById('screen4');
  canvas.width = 150;
  canvas.height = 80;
  const ctx = canvas.getContext('2d');

  const rectangle = new Path2D();
  rectangle.rect(10, 10, 50, 50);

  const circle = new Path2D();
  circle.moveTo(125, 35);
  circle.arc(100, 35, 25, 0, 2 * Math.PI);

  ctx.stroke(rectangle);
  ctx.fill(circle);

};

/**
 *
 * Ref. くねくねする円を作ってみた。 - JavaScriptはじめました。
 *      http://kkoo.hateblo.jp/entry/2015/02/18/192007
 */
const drawWavingCircle = () => {

  const MAX = 10; //ポインターの数
  const RADIUS = 100;
  const CENTER = {x:200, y:200};
  const canvas = document.getElementById("screen5");
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext("2d");
  const point = [];
  let mouseFlag = true;

  const Point = function(c, r, rota) {
    this.x, this.y;
    this.centerX = c.x;
    this.centerY = c.y;
    this.radian = rota * (Math.PI / 180);
    this.radius = r;

    this.speed = Math.random() * 10 + 5;
    this.r = Math.random() * 2 + 1;
    this.rota = 0;

    this.update = () => {

      const plus = Math.cos(this.rota * (Math.PI / 180)) * this.r;

      this.radius += plus;

      const cos = Math.cos(this.radian) * this.radius;
      const sin = Math.sin(this.radian) * this.radius;

      this.x = cos + this.centerX;
      this.y = sin + this.centerY;

      this.rota += this.speed;

      if(this.rota > 360){ this.rota -= 360; }
    }
  }

  const initialize = () => {
    const rota = 360 / MAX;
    let i;
    for(i = 0; i < MAX; i++)
    {
      point[i] = new Point(CENTER, RADIUS, rota * i);
    }
  };

  const update = () => {
    let i;
    for(i = 0; i < MAX; i++)
    {
      point[i].update();
    }
    draw();
  }

  const draw = () => {
    let i;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(mouseFlag) {
      ctx.fiiStyle = "rgba(0, 0, 0, 0)";

    } else {
      ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
      ctx.lineWidth = 1;
    }

    ctx.beginPath();

    const xc1 = (point[0].x + point[MAX - 1].x) / 2;
    const yc1 = (point[0].y + point[MAX - 1].y) / 2;

    ctx.moveTo(xc1, yc1);

    for(i = 0; i < MAX - 1; i++) {

      const xc = (point[i].x + point[i + 1].x) / 2;
      const yc = (point[i].y + point[i + 1].y) / 2;

      ctx.quadraticCurveTo(point[i].x, point[i].y, xc, yc);
    }

    ctx.quadraticCurveTo(point[i].x, point[i].y, xc1, yc1);

    ctx.closePath();

    if(mouseFlag) {
      ctx.fill();
    } else {
      ctx.stroke();
    }

    if(mouseFlag) return;

    for(i = 0; i < MAX; i++) {
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.beginPath();
      ctx.arc(point[i].x, point[i].y, 2, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
    }
  };

  const changeFlag = () => {
    mouseFlag = (mouseFlag) ? false : true;
  }

  initialize();

  const loop = (/*timestamp*/) => {
    update();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);

  window.addEventListener("click", changeFlag);
};
