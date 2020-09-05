let myTeam;

let mainStatsTitle = {
    serve_error_rate: '發失率',
    receive_error_rate: '接失率',
    attack_error_rate: '攻失率',
    attack_score_rate: '攻擊率',
    block_score_rate: '攔網率',
};

let detailedStatsTitle = [
    {
        title: '基本資料',
        objects: {
            grade: '年級',
            birth: '生日',
        }
    },
    {
        title: '攻擊',
        objects: {
            attack_times: '攻擊次數',
            avg_attack_times_per_game: '每局平均攻擊次數',
        }
    },
    {
        title: '防守',
        objects: {
            receive_times: '接球次數',
            block_times: '攔網次數',
            avg_receive_times_per_game: '每局平均接球次數',
            avg_block_times_per_game: '每局平均攔網次數',
        }
    }
]

$.ajax({
    "url": "/api/user/self/team",
    "method": "GET",
})
    .done(function (res) {
        myTeam = res;
        fetchMatchRecord();
        fetchPlayerList();
        initPlayerInfo();
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
    matches = myTeam.games.reverse();

    matches.map((match) => {
         getMatchPoints(match)
         .done(function(res){
            renderMatch(match);
        });
    });

}

function renderMatch(match) {
    var gameTitle = ['第一局', '第二局', '第三局', '第四局', '第五局'];
    var mainStatsTitle = ['攻擊得分', '攔網得分', 'Ace', '失誤得分', '一傳失誤率'];

    var ownedTeam = '台大資管'; //temp
    var oppositeTeam = (match.guest == ownedTeam) ? match.master : match.guest;
    var isGuest = (match.guest == ownedTeam);
    var isVictory = isGuest ? (match.g_point > match.m_point) : (match.g_point < match.m_point);
    var totalGames = match.g_point + match.m_point;
    var row = '';
    row += "<a href='#chart' class='btn match-record'><div class='card " + (isVictory ? "victory" : "defeat") + "'><div class='row'><div class='lineup'>";
    row += "<b> vs. &nbsp " + oppositeTeam + "</b>";
    row += "<p>" + formatDate(match.date) + "</p>";
    row += "</div><div class='col card-content'><ul class='list-group list-group-horizontal'>"
    for (var i = 0; i < 5; i++) {
        row += "<li class='list-group-item score'><p>" + gameTitle[i] + "</p>";
        if (isGuest && i < totalGames) {
            row += "<h3>" + match.g_scores[i] + " : " + match.m_scores[i] + "</h3></li>"
        }
        else if (!isGuest && i < totalGames) {
            row += "<h3>" + match.m_scores[i] + " : " + match.g_scores[i] + "</h3></li>"
        }
    }
    for (var i = 0; i < match.mainStats.length; i++) {
        row += "<li class='list-group-item stats'><p>" + match.mainStats[i].title + "</p>"
        row += "<h3>" + match.mainStats[i].value + "</h3></li>";
    }
    row += "</ul></div></div></div></a>"
    $(".matches").append(row);
}

function getMatchPoints(match) {
    var g = get('/api/game/'+match._id+'/g_scores').done(function(res){
        match['g_scores'] = res;
    });
    var m = get('/api/game/'+match._id+'/m_scores').done(function(res){
        match['m_scores'] = res;
    });

    return $.when(g, m);
}


function formatDate(datetime) { // yyyy-mm-ddThh:mm:ss.fffZ
    var date = datetime.substr(0,10);
    date = date.replace(/-/g, '/');
    return date;
};

function formatRate(rate) {
    if (rate >= 1) {
        return rate.toFixed(3);
    }
    return rate.toFixed(3).substr(1);
}

function fetchPlayerList() {
    $.when.apply($, myTeam.players.map(player => getPlayerRecord(player)))
        .done(function () {
            myTeam.players.map((player) => {
                getPlayerMainStats(player);
                getPlayerDetailedStats(player);
                renderPlayerRow(player);
            })
        })
        .fail(error => console.log(error));
    renderTableHead();
}

function renderTableHead() {
    var head = "<tr><th scope=\"col\">選手</th>"
    Object.keys(mainStatsTitle).forEach(function (key) {
        title = mainStatsTitle[key];
        head += "<th scope=\"col\">" + title + "</th>";
    });
    head += "</tr>"
    $(".tab-content .player-table thead").append(head)
}

function renderPlayerRow(player) {
    var row = ""
    row += "<tr onclick=\"window.location='#chart';\" class=\"player-row\" id=\"" + player._id + "\"><th scope='row'>" + player.name + "</th>";

    Object.keys(mainStatsTitle).forEach(function (key) {
        row += "<td>" + formatRate(player[key]) + "</td>";
    });
    row += "</tr>";
    $(".tab-content .player-table").append(row);
    $('.player-row').on('click', function () {
        renderPlayerInfoById($(this).attr("id"));
    })
}


function getPlayerRecord(player) {
    var pid = player._id;
    return $.ajax({
        "url": "/api/records/maker/" + player._id.toString(),
        "method": "GET",
    })
        .done(function (res) {
            var player = myTeam.players.find((p) => p._id == pid);
            player['records'] = res;
        })
        .fail(function (error) {
            console.log(error);
        })
}

function getPlayerMainStats(player) {
    player['serve_error_rate'] = getServeErrorRate(player['records']);
    player['receive_error_rate'] = getReceiveErrorRate(player['records']);
    player['attack_error_rate'] = getAttackErrorRate(player['records']);
    player['attack_score_rate'] = getAttackScoreRate(player['records']);
    player['block_score_rate'] = getBlockScoreRate(player['records']);
}

function getPlayerDetailedStats(player) {
    player['attack_times'] = getAttackTimes(player['records']);
    player['avg_attack_times_per_game'] = getAvgAttackTimesPerGame(player['records']);
    player['receive_times'] = getReceiveTimes(player['records']);
    player['block_times'] = getBlockTimes(player['records']);
    player['avg_receive_times_per_game'] = getAvgReceiveTimesPerGame(player['records']);
    player['avg_block_times_per_game'] = getAvgBlockTimesPerGame(player['records']);
}

function renderPlayerInfoById(pid) {
    // find player by playerName
    var player = myTeam.players.find((player) => player._id == pid);
    $(".plot-info #name").contents().filter(function () {
        return this.nodeType == 3;
    })[0].nodeValue = player.name
    $(".plot-info #pos").html(player.position);

    var row = ""
    Object.keys(mainStatsTitle).forEach(function (key) {
        $(".plot-info #" + key).html(formatRate(player[key]));
    });

    detailedStatsTitle.map(field => {
        Object.keys(field.objects).forEach(key => {
            $(".plot-info #" + key).html((player[key]));
        })
    })
}

function initPlayerInfo() {
    var row = ""
    Object.keys(mainStatsTitle).forEach(function (key) {
        row += "<li class=\"list-group-item\"><span id=\"" + key + "\"> </span>" + mainStatsTitle[key] + "</li>";
    });
    $(".plot-info .info-overview ul").append(row);

    var row = ""
    detailedStatsTitle.map(field => {
        row += "<tr class=\"section-head\"><th scope=\"row\" colspan=\"2\">" + field.title + "</th></tr>";
        Object.keys(field.objects).forEach(key => {
            row += "<tr><th scope=\"row\">" + field.objects[key] + "</th><td id=\"" + key + "\"> </td></tr>"
        })
    })

    $(".plot-info .info-detailed tbody").append(row);
}

function getServeErrorRate(records) {
    var error_count = records.filter((rec) => rec.event == "SERVE" && rec.value <= 60).length;
    var serve_count = records.filter((rec) => rec.event == "SERVE").length;
    if (serve_count == 0) {
        return 0.0;
    }
    return error_count / serve_count;
}

function getReceiveErrorRate(records) {
    var error_count = records.filter((rec) => rec.event == "RCV" && rec.value <= 60).length;
    var receive_count = records.filter((rec) => rec.event == "RCV").length;
    if (receive_count == 0) {
        return 0.0;
    }
    return error_count / receive_count;
}

function getAttackErrorRate(records) {
    var error_count = records.filter((rec) => rec.event == "ATK" && rec.value <= 60).length;
    var attack_count = records.filter((rec) => rec.event == "ATK").length;
    if (attack_count == 0) {
        return 0.0;
    }
    return error_count / attack_count;
}

function getAttackScoreRate(records) {
    var score_count = records.filter((rec) => rec.event == "ATK" && rec.value > 80).length;
    var attack_count = records.filter((rec) => rec.event == "ATK").length;
    if (attack_count == 0) {
        return 0.0;
    }
    return score_count / attack_count;
}

function getBlockScoreRate(records) {
    var score_count = records.filter((rec) => rec.event == "BLOCK" && rec.value > 80).length;
    var block_count = records.filter((rec) => rec.event == "BLOCK").length;
    if (block_count == 0) {
        return 0.0;
    }
    return score_count / block_count;
}

function getAttackTimes(records) {
    return records.filter((rec) => rec.event == "ATK").length;
}

function getAvgAttackTimesPerGame(records) {
    return 0;
}

function getReceiveTimes(records) {
    return records.filter((rec) => rec.event == "RCV").length;
}

function getAvgReceiveTimesPerGame(records) {
    return 0;
}

function getBlockTimes(records) {
    return records.filter((rec) => rec.event == "BLOCK").length;
}

function getAvgBlockTimesPerGame(records) {
    return 0;
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
