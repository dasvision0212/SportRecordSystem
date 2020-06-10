let myTeam;

$.ajax({
    "url": "/api/user/self/team",
    "method": "GET",
    })
    .done(function (res) {
        myTeam = res;

        fetchMatchRecord();
        fetchPlayerList();
    })
    .fail(function (error) {
        console.log(error);
})

$(document).ready(() => { resizeCanvas(); drawPlot('serve', {}); });

$(window).resize(resizeCanvas());

$('.plot-list .dropdown-item').on('click', function () {
    var type = $(this).attr('id');
    $('.plot-list .displayed').html($(this).html());
    drawPlot(type, {});
})


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

function resizeCanvas() {
    var imgHeight = $('#volleyball_court').height()
    var imgWidth = $('#volleyball_court').width()
    $('.plot-body').height(imgHeight);
    $('.plot-body').width(imgWidth);
    $.each($('.plot-body').children('.plot-canvas'), function () {
        $(this)[0].getContext("2d").canvas.height = imgHeight;
    });
    $.each($('.plot-body').children('.plot-canvas'), function () {
        $(this)[0].getContext("2d").canvas.width = imgWidth;
    });
}

function drawPlot(type, query) {
    let canvas = document.getElementById("hotspot-plot");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // get 'type' datas and draw it
    if (type == 'serve') {
        drawDot(ctx, 100, 100)
        drawDot(ctx, 150, 120)
        drawDot(ctx, 130, 200)
        drawDot(ctx, 140, 300)
    }
    else {
        drawDot(ctx, 500, 700)
        drawDot(ctx, 750, 920)
        drawDot(ctx, 330, 500)
        drawDot(ctx, 740, 1300)
    }
}

function drawDot(ctx, x, y, size = 5) {
    var h = ctx.canvas.height;
    var w = ctx.canvas.width;
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
    ctx.arc(x / 900 * w, y / 1800 * h, size / 1000 * w, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
}

function fetchMatchRecord() {
    // request match records
    var temp = { //temp
        date: new Date('June 6, 2020 03:24:00'),
        championship: "台大盃",
        guest: "合大資管",
        master: "台大資管",
        g_players: [],
        m_players: [],
        g_point: 1,
        m_point: 3,
        confirm: true,
        records: []
    };
    matches = [temp, temp, temp, temp, temp, temp];

    matches.map((match) => { getMatchPoints(match); renderMatch(match); });

}

function renderMatch(match) {
    var gameTitle = ['第一局', '第二局', '第三局', '第四局', '第五局'];
    var statsTitle = ['攻擊得分', '攔網得分', 'Ace', '失誤得分', '一傳失誤率'];

    var ownedTeam = '台大資管'; //temp
    var oppositeTeam = (match.guest == ownedTeam) ? match.master : match.guest;
    var isGuest = (match.guest == ownedTeam);
    var isVictory = isGuest ? (match.g_point > match.m_point) : (match.g_point < match.m_point);
    var totalGames = match.g_point + match.m_point;
    var row = '';
    row += "<a href='#chart' class='btn match-record'><div class='card " + (isVictory ? "victory" : "defeat") + "'><div class='row'><div class='card-leading'></div><div class='col card-content'><ul class='list-group list-group-horizontal'>";
    row += "<li class='list-group-item lineup'><b> vs. &nbsp " + oppositeTeam + "</b>";
    row += "<p>" + formatDate(match.date) + "</p></li>";
    for (var i = 0; i < 5; i++) {
        row += "<li class='list-group-item score'><p>" + gameTitle[i] + "</p>";
        if (isGuest && i < totalGames) {
            row += "<h3>" + match.g_game_point[i].toString() + " : " + match.m_game_point[i].toString() + "</h3></li>"
        }
        else if (!isGuest && i < totalGames) {
            row += "<h3>" + match.m_game_point[i].toString() + " : " + match.g_game_point[i].toString() + "</h3></li>"
        }
    }
    for (var i = 0; i < 5; i++) {
        row += "<li class='list-group-item stats'><p>" + statsTitle[i] + "</p>"
        if (i == 0) {
            row += "<h3>" + "</h3></li>";
        }
    }
    row += "</ul></div></div></div></div></a>"
    $(".matches").append(row);
}

function getMatchPoints(match) {
    match['g_game_point'] = getEachGamePoints(match['records'], team = 'guest');
    match['m_game_point'] = getEachGamePoints(match['records'], team = 'master');

    return match;
}

function getEachGamePoints(records, team) {
    if (team == 'guest') { //temp
        return [18, 18, 26, 19];
    }
    if (team == 'master') { //temp
        return [25, 25, 24, 25];
    }
}

function formatDate(date) {
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    return [date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('/');
};

function formatRate(rate) {
    if (rate >= 1){
        return rate.toFixed(3);
    }
    return rate.toFixed(3).substr(1);
}

function fetchPlayerList() {
    
    myTeam.players.map((player) => {renderPlayerRow(player)});
    renderTableHead();
}

function renderTableHead() {

    var statsTitle = {
        serve_error_rate: '發失率',
        receive_error_rate: '接失率',
        attack_error_rate: '攻失率',
        attack_score_rate: '攻擊率',
        block_score_rate: '攔網率'
    };
    var head = "<tr><th scope=\"col\">選手</th>"
    Object.keys(statsTitle).forEach(function (key) {
        title = statsTitle[key];
        head += "<th scope=\"col\">" + title + "</th>";
    });
    head += "</tr>"
    $(".tab-content .player-table thead").append(head)
}

function renderPlayerRow(player) {

    var statsTitle = {
        serve_error_rate: '發失率',
        receive_error_rate: '接失率',
        attack_error_rate: '攻失率',
        attack_score_rate: '攻擊率',
        block_score_rate: '攔網率'
    };
    $.when(getPlayerStats(player._id)).done(function(){
        var row = ""
        row += "<tr onclick=\"window.location='#chart';\" class=\"player-row\" id=\"" + player._id + "\"><th scope='row'>" + player.name + "</th>";
    
        Object.keys(statsTitle).forEach(function (key) {
            row += "<td>" + formatRate(player[key]) + "</td>";
        });
        row += "</tr>";
        $(".tab-content .player-table").append(row);
        $('.player-row').on('click', function () {
            renderPlayerInfo($(this).attr("id"));
        })
    })
}


function getPlayerStats(pid) {
    return $.ajax({
        "url": "/api/records/maker/" + pid.toString(),
        "method": "GET",
    })
    .done(function (res) {
        var records = res;
        console.log(records)
        var player = myTeam.players.find((player) => player._id == pid);
        player['serve_error_rate'] = getServeErrorRate(records);
        player['receive_error_rate'] = getReceiveErrorRate(records);
        player['attack_error_rate'] = getAttackErrorRate(records);
        player['attack_score_rate'] = getAttackScoreRate(records);
        player['block_score_rate'] = getBlockScoreRate(records);
    })
    .fail(function (error) {
        console.log(error);
    })
}

function renderPlayerInfo(pid) {
    // find player by playerName
    var player = myTeam.players.find((player) => player._id == pid);
    $(".plot-info #name").contents().filter(function () {
        return this.nodeType == 3;
    })[0].nodeValue = player.name
    $(".plot-info #pos").html(player.position);

    $.ajax({
        "url": "/api/records/maker/" + pid.toString(),
        "method": "GET",
    })
    .done(function (res) {
        var records = res;
        console.log(res);
    })
    .fail(function (error) {
        console.log(error);
    })
}

function getServeErrorRate(records){
    var error_count = records.filter((rec) => rec.event == "SERVE" && rec.value <= 60).length;
    var serve_count = records.filter((rec) => rec.event == "SERVE").length;
    if (serve_count == 0){
        return 0.0;
    }
    return error_count / serve_count;
}

function getReceiveErrorRate(records){
    var error_count = records.filter((rec) => rec.event == "DIG" && rec.value <= 60).length;
    var receive_count = records.filter((rec) => rec.event == "DIG").length;
    if (receive_count == 0){
        return 0.0;
    }
    return error_count / receive_count;
}

function getAttackErrorRate(records){
    var error_count = records.filter((rec) => rec.event == "ATK" && rec.value <= 60).length;
    var attack_count = records.filter((rec) => rec.event == "ATK").length;
    if (attack_count == 0){
        return 0.0;
    }
    return error_count / attack_count;
}

function getAttackScoreRate(records){
    var score_count = records.filter((rec) => rec.event == "ATK" && rec.value > 80).length;
    var attack_count = records.filter((rec) => rec.event == "ATK").length;
    if (attack_count == 0){
        return 0.0;
    }
    return score_count / attack_count;
}

function getBlockScoreRate(records){
    var score_count = records.filter((rec) => rec.event == "BLOCK" && rec.value > 80).length;
    var block_count = records.filter((rec) => rec.event == "BLOCK").length;
    if (block_count == 0){
        return 0.0;
    }
    return score_count / block_count;
}