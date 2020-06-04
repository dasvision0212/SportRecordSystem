
/*Dragging*/
var dragDiv;
var area;
var p_locationX='';
var p_locationY='';
var p_playerID='';
var p_quality='';
var p_behavior='';
var playerName='';
var p_allyScore=0;
var p_enemyScore=0;
var p_allyGap=0;
var p_enemyGap=0;
var dragArea;
var subButton=document.getElementById('SubButton');

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
  playerName=draggableElement.innerHTML+ '<br>';
  /*dropzone.appendChild(draggableElement);*/
  dropArea.appendChild(dragDiv);
  let check = document.getElementsByClassName('drag-Title');
  if(check.length != 1){
    dropArea.removeChild(check[0]);
  }
  SubButton.innerHTML= playerName + p_behavior + ' ' + p_quality;
  console.log(playerName);
  console.log(p_behavior);
  console.log(p_quality);

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

  console.log(p_playerID);
  console.log(p_behavior);
  console.log(p_quality);
  console.log(p_locationX);
  console.log(p_locationY);
  var d=new Date();
  p_quality=' ';
  p_behavior=' ';
  p_locationX=' ';
  p_locationY=' ';
  p_playerID=' ';
   /* var body = {
        date: d.getTime(),
        event: p_behavior,
        sub_type: null,
        maker: "5ebeb11e5a6c20ed3e900f68",
        relateds: ["5ed1244c2cb776dd1e8f32af"],
        time: 87,
        x_loc: p_locationX,
        y_loc: p_locationY,
        comment: 'a good shot',
        value: p_quality
    }*/
    /*var body={
      account: "eethan1",
      password: "jizzzzzz",
      session: "{{session}"
    }
    console.log(body);
    post('http://34.87.51.47:8787/api/register', body)
    .done(function(res) {
        console.log('Post Login: ',res)
    })
    .fail(function(error) {
        console.log(error)      
    })*/
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var settings = {
        "url": "http://34.87.51.47:8787/api/login",
        "method": "POST",
        "timeout": 0,
        "data": {
        "account": "eethan1",
        "password": "jizzzzzz"
        }
  

    };
}
function changeScore(event){
  //plus
  if(event.currentTarget.getAttribute('id')=="p-ally"){
    var temp =document.getElementById('a-score');
    var s =parseInt(temp.innerHTML)+1;
    p_allyScore=s;
    temp.innerHTML=s;
  } 
  else if(event.currentTarget.getAttribute('id')=="p-enemy"){
    var temp =document.getElementById('e-score');
    var s =parseInt(temp.innerHTML)+1;
    p_enemyScore=s;
    temp.innerHTML=s;
  }
  //minus
  if(parseInt(document.getElementById('a-score').innerHTML)> 0 ){
    if(event.currentTarget.getAttribute('id')=="m-ally"){
      var temp =document.getElementById('a-score');
      var s =parseInt(temp.innerHTML)-1;
      p_allyScore=s;
      temp.innerHTML=s;
    }
  }
  if(parseInt(document.getElementById('e-score').innerHTML)> 0 ){
    if(event.currentTarget.getAttribute('id')=="m-enemy"){
      var temp =document.getElementById('e-score');
      var s =parseInt(temp.innerHTML)-1;
      p_enemyScore=s;
      temp.innerHTML=s;
    }
  }
}
function changeGap(event){
  //plus
  if(event.currentTarget.getAttribute('id')=="p-ally"){
    var temp =document.getElementById('a-gap');
    var s =parseInt(temp.innerHTML)+1;
    p_allyGap=s;
    temp.innerHTML=s;
  } 
  else if(event.currentTarget.getAttribute('id')=="p-enemy"){
    var temp =document.getElementById('e-gap');
    var s =parseInt(temp.innerHTML)+1;
    p_enemyGap=s;
    temp.innerHTML=s;
  }
  //minus
  if(parseInt(document.getElementById('a-gap').innerHTML)> 0 ){
    if(event.currentTarget.getAttribute('id')=="m-ally"){
      var temp =document.getElementById('a-gap');
      var s =parseInt(temp.innerHTML)-1;
      p_allyGap=s;
      temp.innerHTML=s;
    }
  }
  if(parseInt(document.getElementById('e-gap').innerHTML)> 0 ){
    if(event.currentTarget.getAttribute('id')=="m-enemy"){
      var temp =document.getElementById('e-gap');
      var s =parseInt(temp.innerHTML)-1;
      p_enemyGap=s;
      temp.innerHTML=s;
    }
  }
}

function clears(){
  console.log('hi');
  var temp =document.getElementById('a-score');
  p_allyScore=0;
  temp.innerHTML='0';
  temp =document.getElementById('e-score');
  p_enemyScore=0;
  temp.innerHTML='0';
}