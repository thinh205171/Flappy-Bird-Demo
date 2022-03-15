var bird_top = 150;
var bird_left = 50;
var bird = document.getElementById('bird');
bird.style.top = bird_top + 'px';
bird.style.left = bird_left + 'px';
var point = 0;
var time = 1;
/*var cloud = [
  {
    top: 50,
    left: 50,
    e: 0
  },
  {
    top: 350,
    left: 400,
    e: 0
  },
  {
    top: 200,
    left: 450,
    e: 0
  },
  {
    top: 50,
    left: 400,
    e: 0
  },
  {
    top: 300,
    left: 50,
    e: 0
  },
  {
    top: 150,
    left: 250,
    e: 0
  },
  {
    top: 20,
    left: 225,
    e: 0
  }
]
for(var i = 0;i < cloud.length; i++)
  {
    cloud[i].e = document.getElementById('cloud'+i);
    cloud[i].e.style.top = cloud[i].top + 'px';
    cloud[i].e.style.left = cloud[i].left + 'px';
  }
*/
var p = [
  {
    top: 250,
    left: 250,
    e: 0
  },
  {
    top: 350,
    left: 610,
    e: 0
  },
  {
    bottom: 450,
    left: 250,
    e: 0
  },
  {
    bottom: 350,
    left: 610,
    e: 0
  }
]
//var origin_pile = p.slice(0);

for(var i = 0;i < 2; i++)
  {
    p[i].e = document.getElementById('pile'+i);
    p[i].e.style.height = (550 - p[i].top) + 'px';
    p[i].e.style.top = p[i].top + 'px';
    p[i].e.style.left = p[i].left + 'px';
  }
for(var i = 2;i < 4; i++)
  {
    p[i].e = document.getElementById('pile'+i);
    p[i].e.style.height = (550 - p[i].bottom) + 'px';
    p[i].e.style.bottom = p[i].bottom + 'px';
    p[i].e.style.left = p[i].left + 'px';
  }

var pileAuto;
var cloudAuto
var birdAuto;

function up()
{
  bird_top = bird_top - +document.getElementById('Setup').value;
  bird.style.top = bird_top + 'px';
}

var current_pile = 0;
function down()
{
  bird_top = bird_top + +document.getElementById('Setdown').value;
  bird.style.top = bird_top + 'px';
  if(((bird_left + 55 > p[current_pile].left) 
    &&(p[current_pile].left + 100 > bird_left)
    &&(bird_top + 45 > p[current_pile].top))
    ||
    ((bird_left + 55 > p[current_pile+2].left) 
    &&(p[current_pile+2].left + 100 > bird_left)
    &&(bird_top  < 550 - p[current_pile+2].bottom))
    ||
    (bird_top + 5<= 0)
    ||
    (bird_top + 50 >= 550))
  {
    stop();
    document.featurePolicy.allowsFeature('speaker');
    var audio = new Audio('https://www.freesoundslibrary.com/wp-content/uploads/2018/01/ding-sound-effect.mp3');
    var playPromise = audio.play();
    document.getElementById('MakeOpacity').style.opacity = 0.8;
    document.getElementById('Lost').style.display = 'inline-block';
    document.getElementById('Lost').innerHTML = 'Point ' + point + ' Time ' + time + 's';
    document.getElementById('Setup').value = 0;
    document.getElementById('Setdown').value = 0;
    document.getElementById('Setleft').value = 0;
  }

  else {
    current_pile ^= 1;
  }
  
}

function left()
{
  stepLeft = +document.getElementById('Setleft').value;
  for(i=0;i<2;i++)
    {
      p[i].left -= stepLeft;
      p[i].e.style.left = p[i].left + 'px';
      if(p[i].left <= -100)
      {
        p[i].left = 600;
        p[i].top = Math.round(Math.random()*200+300);
        p[i].e.style.top = p[i].top + 'px';
        p[i].e.style.left = p[i].left + 'px';
        p[i].e.style.height = (550 - p[i].top) + 'px';
      }
      if(p[i].left === -50 )
      {
        point++;
        console.log(point);
      }
      if(p[i].left >= 600)
        p[i].e.style.display = 'none';
      if(p[i].left < 600 && p[i].left >= 500)
      {
        p[i].e.style.width = (600 - p[i].left) + 'px';
        p[i].e.style.display = 'inline-block'; 
      }
    }
  for(i=2;i<4;i++)
    {
      p[i].left -= stepLeft;
      p[i].e.style.left = p[i].left + 'px';
      if(p[i].left <= -100)
      {
        p[i].left = 600;      
        p[i].bottom = 700 - p[i-2].top
        p[i].e.style.bottom = p[i].bottom + 'px';
        p[i].e.style.left = p[i].left + 'px';
        p[i].e.style.height = (550 - p[i].bottom) + 'px';
      }
      if(p[i].left >= 600)
      {
        p[i].e.style.display = 'none';
      }
      if(p[i].left < 600 && p[i].left >= 500)
      {
        p[i].e.style.width = (600 - p[i].left) + 'px';
        p[i].e.style.display = 'inline-block'; 
      }
    }
}

function run()
{
  pileAuto = setInterval(left,50);
  birdAuto = setInterval(down,50);
  var result = document.getElementById('result');
  setInterval(function(){result.innerHTML ='Time ' + time;time++;},1000);
  
}
var start = Date.now();

function stop()
{
  for(var j=1;j<=birdAuto+pileAuto;j++)
    clearInterval(j);
}

function reset()
{
  bird_top = 150;
  bird_left = 50;
  bird = document.getElementById('bird');
  bird.style.top = bird_top + 'px';
  bird.style.left = bird_left + 'px';
  point = 0;
  time = 1;
  p = [
  {
    top: 250,
    left: 250,
    e: 0
  },
  {
    top: 350,
    left: 610,
    e: 0
  },
  {
    bottom: 450,
    left: 250,
    e: 0
  },
  {
    bottom: 350,
    left: 610,
    e: 0
  }
]
  for(var i = 0;i < 2; i++)
  {
    p[i].e = document.getElementById('pile'+i);
    p[i].e.style.height = (550 - p[i].top) + 'px';
    p[i].e.style.top = p[i].top + 'px';
    p[i].e.style.left = p[i].left + 'px';
  }
  for(var i = 2;i < 4; i++)
  {
    p[i].e = document.getElementById('pile'+i);
    p[i].e.style.height = (550 - p[i].bottom) + 'px';
    p[i].e.style.bottom = p[i].bottom + 'px';
    p[i].e.style.left = p[i].left + 'px';
  }
  document.getElementById('Lost').style.display = 'none';
  document.getElementById('MakeOpacity').style.opacity = 0;
  document.getElementById('Setup').value = 60;
  document.getElementById('Setdown').value = 3.5;
  document.getElementById('Setleft').value = 5;
}