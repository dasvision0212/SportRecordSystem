$(document).ready(function() 
{
     var objHeight = 0;
     var imgHeight = $('#volleyball_court').height()
     var imgWidth = $('#volleyball_court').width()
     $('.plot-body').height(imgHeight);
     $('.plot-body').width(imgWidth);
     $.each($('.plot-body').children('.plot-canvas'), function(){
         $(this)[0].getContext("2d").canvas.height = imgHeight;
     });
     $.each($('.plot-body').children('.plot-canvas'), function(){
         $(this)[0].getContext("2d").canvas.width = imgWidth;
     });

    let canvas = document.getElementById("serve-plot");
    console.log(canvas)
    let ctx = canvas.getContext("2d");
    drawDot(ctx, 100, 100)
    drawDot(ctx, 150, 120)
    drawDot(ctx, 130, 200)
    drawDot(ctx, 140, 300)
})

for (var r = 0; r < 25; r++) {
    var row = ("<tr><th scope='row'>黃心" + r.toString() + "</th><td>.980</td><td>.880</td><td>.793</td><td>.320</td><td>.550</td></tr>");
    $(".player-table").append(row);
}

for (var r = 0; r < 10; r++) {
    var row = '';
    row += "<a href='#chart' class='btn match-record'><div class='card victory'><div class='row'><div class='card-leading'></div><div class='col card-content'><ul class='list-group list-group-horizontal'>";
    row += "<li class='list-group-item lineup'><b> vs. &nbsp "+"台大生傳"+"</b>";
    row += "<p>"+"2020/05/24"+"</p></li>";
    for(var i = 0; i < 5; i++) {
        row += "<li class='list-group-item score'><p>第一局</p><h3>18 : 25</h3></li>"
    }
    for(var i = 0; i < 5; i++) {
        row += "<li class='list-group-item stats'><p>攻擊得分</p><h3>6</h3></li>"
    }
    row += "</ul></div></div></div></div></a>"
    $(".matches").append(row);
}


function post(url, body) {
    return $.ajax({
        url: url,
        headers: {
        },
        method: 'POST',
        data: JSON.stringify(body),
        timeout: 0
    })
}

function reset() {
    $username.removeClass('invalid');
    $password.removeClass('invalid');
    $warning.text('');
}

function handleError(error) {
    if (error.statusText == "timeout") {
        return alert('連線發生問題，請檢察網路狀態。');
    } else if (error.status == 401) {
        $username.addClass('invalid');
        $password.addClass('invalid');
        $warning.text(error.responseText);
    } else {
        return alert('連線發生問題，請檢察網路狀態。');
    }
}

function drawDot(ctx, x, y, size=3) {
    ctx.beginPath()
    //沿用寬度及色彩設定
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000000"
    ctx.fillStyle = "#000000"
    /*使用arc(x,y,r,s,e)畫一個圓
    x,y是圓心的座標，r是半徑，s和e是起點和終點的角度*/
    ctx.arc(x,y,size,0,Math.PI*2)
    ctx.fill()
    ctx.stroke()
}