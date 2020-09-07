var dragDiv;
var area;
var p_locationX='';
var p_locationY='';
var p_playerID='';
var p_maker='';
var p_quality='';
var p_behavior='';
var playerName='';
var p_allyScore=0;
var p_enemyScore=0;
var p_allyGap=0;
var p_enemyGap=0;
var p_videotime=0;
var p_subtype='';
var score_team='none'
var dragArea;
var subButton=document.getElementById('SubButton');
var g_playerList_NAME;
var g_playerList_NUMBER;
var g_gid;
var count = 0;
var sec=0;
var min=0;
const plusTxt='得分';
const minusTxt='失分';
//時間計算等動態表現
let myTeam;
var intervalID = setInterval(setTimer, 1000);
var pause_bt=false;
//onload, load the playerList in the modal
window.onload = function() {

    var modal=document.getElementById('mod');
    get('api/team/self')
    .done(function(res) {
      console.log(res);
      myTeam = res;
      g_playerList_NAME=new Array(res.players.length);
      g_playerList_NUMBER=new Array(res.players.length);
      let last_game = res.games[res.games.length-1]
      if(!last_game.confirm){
        g_gid = last_game._id;
        $(".lineup").text(last_game.name);
        get('api/game/'+g_gid+'/m_scores').done(function(res){
          $('#a-score').text(res[res.length-1]);
          p_allyScore = parseInt(res[res.length-1], 10);
        })
        get('api/game/'+g_gid+'/g_scores').done(function(res){
          $('#e-score').text(res[res.length-1]);
          p_enemyScore = parseInt(res[res.length-1], 10);
        })
        $('#a-gap').text(last_game.m_point);
        p_allyGap = parseInt(last_game.m_point, 10);
        $('#e-gap').text(last_game.g_point);
        p_enemyGap = parseInt(last_game.g_point, 10);
      }
      else{
        $("#newGameButton").trigger('click');
      }
      for(i = 0; i < res.players.length; i++){
        g_playerList_NAME[i]=res.players[i].name;
        g_playerList_NUMBER[i]=res.players[i].number;
        var y = document.createElement("TR");
        modal.appendChild(y);
        var z = document.createElement("TD");
        z.setAttribute("id", g_playerList_NUMBER[i]);
        z.setAttribute('class','Name');
        z.setAttribute('onclick','onField(event);');
        z.setAttribute('value',res.players[i]._id);
        var text = document.createTextNode(g_playerList_NUMBER[i]+'號 '+ g_playerList_NAME[i]);
        z.appendChild(text);  
        modal.appendChild(z);
      }
    })
    .fail(function(error) {
        console.log(error)      
    })

    var t=document.getElementById('PlayerOnTheField');
    var y = document.createElement("TR");
    t.appendChild(y);

    var z = document.createElement("TD");
    z.setAttribute("id", '87');
    z.setAttribute('class','NameDragable');
    z.setAttribute('ondragstart','onDragStart(event);');
    z.setAttribute("draggable",true);
    z.setAttribute('value','548754875487548754875487')
    var text = document.createTextNode('敵方對手');
    z.appendChild(text);
    z.style.backgroundColor='yellow';  
    t.appendChild(z);

    var now = new Date();
    var month = (now.getMonth() + 1);               
    var day = now.getDate();
    if (month < 10) 
        month = "0" + month;
    if (day < 10) 
        day = "0" + day;
    var today = now.getFullYear() + '-' + month + '-' + day;
    $('#match-date').val(today);
};
$(document).on('click', '#start-new-game', function(){
  var enemyName = $('#enemy-name').val();
  var matchDate = $('#match-date').val();
  var m_point = $('#a-gap').text();
  var g_point = $('#e-gap').text();
  console.log(enemyName, matchDate, m_point, g_point);
  createNewGame(enemyName, matchDate);
})

$(document).on('click', '#confirmEndGame', function(){
  post('/api/game/'+g_gid+'/confirm', {});
  document.location.href = '/history';
})

function createNewGame(enemyName, matchDate){
  post('api/team/self/game', {
    master: myTeam.name,
    guest: enemyName,
    date: matchDate,
    name: myTeam.name + " v.s " + enemyName,
    m_point: "0",
    g_point: "0",
  })
  .done(function(res){
    g_gid = res.games[res.games.length-1]._id
    console.log(res);
    $(".lineup").text(res.games[res.games.length-1].name);
    
  })
}

function pauseTime(event){
  if (pause_bt) {
    pause_bt=false;
  }
  else{
    pause_bt=true;
  }
}
function setTimer(){
  var timer_H=document.getElementById('timers');
  if(!pause_bt){
    if(count>=60){
      min=Math.floor(count/60);
    }
    sec=count%60;
    if(sec < 10){
      sec='0'+sec;
    }
    count++;
  }
  timer_H.innerHTML=min+' : '+sec;
  p_videotime=count;
}

function getLog(){
  document.getElementById('board');

}
function onDragStart(event) {
  event.dataTransfer.setData('text', event.target.id);
}
function onDragOver(event) {
  event.preventDefault();
}
function onDrop(event) {
  const id = event.dataTransfer.getData('text');
  console.log(id);
  const draggableElement = document.getElementById(id);
  dropArea = event.target; 
  area={
        left: dropArea.offsetLeft,
        right: dropArea.offsetLeft + dropArea.offsetWidth,
        top: dropArea.offsetTop,
        bottom: dropArea.offsetTop + dropArea.offsetHeight,
  };

  dragDiv=document.createElement("span");
  var t=document.createTextNode(id);
  dragDiv.appendChild(t);
  dragDiv.setAttribute("class", "drag-Title");
  dragDiv.setAttribute("id",id);
  dragDiv.style.backgroundColor='white';
  p_playerID=id;
  p_maker=draggableElement.getAttribute('value');
  console.log(p_maker);
  playerName=draggableElement.innerHTML+ '<br>';
  /*dropzone.appendChild(draggableElement);*/
  dropArea.appendChild(dragDiv);
  let check = document.getElementsByClassName('drag-Title');
  if(check.length != 1){
    dropArea.removeChild(check[0]);
  }
  SubButton.innerHTML= playerName + p_behavior + ' ' + p_quality;

  x = Math.max(Math.min(event.clientX-(dragDiv.offsetWidth/2) , area.right- dragDiv.offsetWidth), area.left);
  y = Math.max(Math.min(event.clientY-(dragDiv.offsetHeight/2) , area.bottom- dragDiv.offsetHeight), area.top);
  dragDiv.style.left = x + 'px';
  dragDiv.style.top = y + 'px';
  p_locationX=x;
  p_locationY=y;

  dragDiv.addEventListener('touchstart', dragStart);
  dragDiv.addEventListener('mousedown', dragStart);
  event.dataTransfer.clearData();
}

function dragStart(e) {
           
            if(e.type=='touchstart'){
               e.preventDefault();
            //記錄點擊相對被點擊物件的座標
              
              startX = e.changedTouches[0].clientX - dragDiv.offsetLeft;
              startY = e.changedTouches[0].clientY - dragDiv.offsetTop;

              document.addEventListener('touchmove', move);
              document.addEventListener('touchend', stop);
            }
            else{
               e.preventDefault();
               console.log('??');
            //記錄點擊相對被點擊物件的座標
              startX = e.clientX - dragDiv.offsetLeft;
              startY = e.clientY - dragDiv.offsetTop;
              document.addEventListener('mousemove', move);
              document.addEventListener('mouseup', stop);
            }
}
function move(e) {
            //計算出拖曳物件最左上角座標
            if(e.type=='touchmove'){
              x = e.changedTouches[0].clientX - startX;
              y = e.changedTouches[0].clientY - startY;
            }
            else{
              x = e.clientX - startX;
              y = e.clientY - startY;
            }

            //console.log(x);
            //console.log(y);
            x = Math.max(Math.min(x, area.right- dragDiv.offsetWidth), area.left);
            y = Math.max(Math.min(y, area.bottom- dragDiv.offsetHeight), area.top);
            p_locationX = x - area.left;
            p_locationY = y - area.top;
            console.log(p_locationX);
            console.log(p_locationY);
            dragDiv.style.left = x + 'px';
            dragDiv.style.top = y + 'px';
}

function stop(e) {
          if(e.type=='touchend'){
            document.removeEventListener('touchmove', move);
            document.removeEventListener('touchend', stop);
          }
          else{
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseend', stop);
          }
}

/*Choose*/
//Make the list to the table at the left or the side
function onField(event) {

  var t=document.getElementById('PlayerOnTheField');
  
  if (event.currentTarget.style.backgroundColor != 'yellow') {
    
    event.currentTarget.style.backgroundColor = 'yellow';
    var y = document.createElement("TR");
    t.appendChild(y);

    var z = document.createElement("TD");
    z.setAttribute("id", event.currentTarget.getAttribute('id'));
    z.setAttribute('class','NameDragable');
    z.setAttribute('ondragstart','onDragStart(event);');
    z.setAttribute("draggable",true);
    
    var text = document.createTextNode(event.currentTarget.innerHTML);
    z.appendChild(text);  
    t.appendChild(z);
  }
  else{    
      event.currentTarget.style.backgroundColor = 'white';
      var playerList=document.getElementsByClassName('NameDragable');
      for(i=0; i<playerList.length; i++){

        if (playerList[i].getAttribute('id')==event.currentTarget.getAttribute('id')) {
          t.removeChild(playerList[i]);
          break;
        }
    }

  }

}
//use for checking if the player is on the board or not
function check(event){
   var playerListField=document.getElementsByClassName('NameDragable');
   var playerList=document.getElementsByClassName('Name');
   for(i =0; i<playerListField.length;i++){
    if(playerListField[i].style.backgroundColor=='yellow'){
      for(j=0;j<playerList.length;j++){
        if(playerListField[i].getAttribute('id')==playerList[j].getAttribute('id')){
          playerListField[i].style.backgroundColor='yellow';
        }
      }
    }
   }
}
//use for judging if the behavior is selected or not
// can write it more simple by getting id
function selectBehavior(event){
  var li=document.getElementsByClassName('beh');
  var color=6;
  var target;
  for(i=0;i<5;i++)
  {
    if(li[i].style.backgroundColor=='yellow'){
      color=i;
    }
    if(li[i].getAttribute('id')==event.currentTarget.getAttribute('id')){
      target=i;
    }
  }
  if(color!=target && color!=6){
    li[target].style.backgroundColor='yellow';
    li[color].style.backgroundColor='white';
  }
  else if (color==6) {
    li[target].style.backgroundColor='yellow';
  }
  if(color==target){
    li[target].style.backgroundColor='white';
  }
  p_behavior = li[target].innerHTML;
  SubButton.innerHTML= playerName + p_behavior + ' ' + p_quality;
}
function selectQuality(event){
  var li=document.getElementsByClassName('qua');
  var color=5;
  var target;
  for(i=0;i<4;i++)
  {
    if(li[i].style.backgroundColor=='yellow'){
      color=i;
    }
    if(li[i].getAttribute('id')==event.currentTarget.getAttribute('id')){
      target=i;
    }
  }
  if(color!=target && color!=5){
    li[target].style.backgroundColor='yellow';
    li[color].style.backgroundColor='white';
  }

  else if (color==5) {
    li[target].style.backgroundColor='yellow';
  }
  if(color==target){
    li[target].style.backgroundColor='white';
  }
  p_quality = li[target].getAttribute('value');
  SubButton.innerHTML= playerName + p_behavior + ' ' + p_quality;
}
//submiting 
function submit(event){
  
  var qua=document.getElementsByClassName('qua');
  var beh=document.getElementsByClassName('beh');
  //find and clear the value should be post
  for(i = 0 ; i < qua.length;i++){
    if(qua[i].style.backgroundColor=='yellow'){
      p_quality=qua[i].getAttribute('value');
      qua[i].style.backgroundColor='white';
      break;
    }
  }
  for(i = 0 ; i < beh.length;i++){
    if(beh[i].style.backgroundColor=='yellow'){
      p_behavior=beh[i].getAttribute('value');
      beh[i].style.backgroundColor='white';
      break;
    }
  }
  let check = document.getElementsByClassName('drag-Title');
  dropArea.removeChild(check[0]);
  SubButton.innerHTML= 'Submit';

  if(p_quality=='A'){
    p_quality=100;
    /*if(p_behavior =='ATK'||p_behavior =='BLOCK'||p_behavior =='SERVE'){
      var temp =document.getElementById('a-score');
      temp.innerHTML=p_allyScore+1;
      p_allyScore++;
    }*/
  }
  if(p_quality=='B'){
    p_quality=50;
  }
  if(p_quality=='C'){
    p_quality=0;
    /*if(p_playerID=='87'){
      var temp =document.getElementById('a-score');
      temp.innerHTML=p_allyScore+1;
      p_allyScore++;
    }
    else{
      var temp =document.getElementById('e-score');
      temp.innerHTML=p_enemyScore+1;
      p_enemyScore++;
    }*/

  }
  if (p_quality=='D') {
    p_quality=25;
    /*if(p_playerID=='87'){
      var temp =document.getElementById('a-score');
      temp.innerHTML=p_allyScore+1;
      p_allyScore++;
    }
    else{
      var temp =document.getElementById('e-score');
      temp.innerHTML=p_enemyScore+1;
      p_enemyScore++;
    }*/

  }

  if(event.currentTarget.getAttribute('id')=='SubButton_plus'){
    var temp =document.getElementById('a-score');
    temp.innerHTML=p_allyScore+1;
    p_allyScore++;
    score_team='ally'
  }
  else if(event.currentTarget.getAttribute('id')=='SubButton_minus'){
    var temp =document.getElementById('e-score');
    temp.innerHTML=p_enemyScore+1;
    p_enemyScore++;
    score_team='enemy'
  }
  /*else{

  }*/
  var body = {
        time:p_videotime,
        event: p_behavior,
        maker: p_maker,
        quality: p_quality,
        score_team: score_team,
        x_loc: Math.floor(p_locationX),
        y_loc: Math.floor(p_locationY),
       
  }
      post('/api/game/'+g_gid+'/record',body)
    .done(function(res) {
        console.log('record: ',res)
    })
    .fail(function(error) {
        console.log(error)      
    })
  p_quality=' ';
  p_behavior=' ';
  p_locationX=' ';
  p_locationY=' ';
  p_playerID=' ';
  p_subtype=' ';
  playerName=' ';
  score_team='none';
}

function post(url, body) {
    return $.ajax({
        url: url,
        headers: {
        },
        method: 'POST',
        data: body,
        timeout: 0
    })
}

function get(url, body) {
    return $.ajax({
        url: url,
        headers: {
        },
        method: 'GET',
        timeout: 0
    })
}


//BUTTON OF CHANGINg score
function changeScore(event){
  //plus
  if(event.currentTarget.getAttribute('id')=="p-ally"){
    var temp =document.getElementById('a-score');
    var s =parseInt(temp.innerHTML)+1;
    p_allyScore=s;
    score_team='ally';
    temp.innerHTML=s;
  } 
  else if(event.currentTarget.getAttribute('id')=="p-enemy"){
    var temp =document.getElementById('e-score');
    var s =parseInt(temp.innerHTML)+1;
    p_enemyScore=s;
    score_team='enemy';
    temp.innerHTML=s;
  }

  var body = {
      time:p_videotime,
      event: "NONE",
      score_team: score_team,
  }
  post('/api/game/'+g_gid+'/record',body)
  .fail(function(error) {
      console.log(error)      
  })
  score_team='none'
  
  if(p_allyScore >= 25 && p_allyScore - p_enemyScore >= 2){
    p_allyScore = 0;
    p_enemyScore = 0;
    $('#a-score').text('0');
    $('#e-score').text('0');
    $('#p-ally').trigger('click');
  }
  if(p_enemyScore >= 25 && p_enemyScore - p_allyScore >= 2){
    p_allyScore = 0;
    p_enemyScore = 0;
    $('#a-score').text('0');
    $('#e-score').text('0');
    $('#p-enemy').trigger('click');
  }
}
function changeGap(event){
  //plus
  if(event.target.getAttribute('id')=="p-ally"){
    var temp =document.getElementById('a-gap');
    var s =parseInt(temp.innerHTML)+1;
    p_allyGap=s;
    temp.innerHTML=s;
    let body = {
      point: s.toString(10)
    }
    post('/api/game/'+g_gid+'/m_point', body)
    .done(function(res){
      console.log(res);
    });
  } 
  else if(event.target.getAttribute('id')=="p-enemy"){
    var temp =document.getElementById('e-gap');
    var s =parseInt(temp.innerHTML)+1;
    p_enemyGap=s;
    temp.innerHTML=s;
    let body = {
      point: s.toString(10)
    }
    post('/api/game/'+g_gid+'/g_point', body)
    .done(function(res){
      console.log(res);
    });
  }
}

function clears(){
  var temp =document.getElementById('a-score');
  p_allyScore=0;
  temp.innerHTML='0';
  temp =document.getElementById('e-score');
  p_enemyScore=0;
  temp.innerHTML='0';
}
function backtoTeam(event){
  window.location.href='/team';
}