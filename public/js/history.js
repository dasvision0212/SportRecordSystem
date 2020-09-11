let myTeam;

let playerMainStatsTitle = {
    serve_error_rate: '發失率',
    receive_error_rate: '接失率',
    attack_error_rate: '攻失率',
    attack_score_rate: '攻擊率',
    block_score_rate: '攔網率',
};

let matchDetailedStatsTitle = {
    atk: {
        title: '攻擊次數',
        subStats: {
            perfect_atk: {
                title: '強攻',
                subStats: {
                    perfect_atk_score: '得分',
                    perfect_atk_lose: '失分',
                    perfect_atk_normal_set: '正舉次數',
                    perfect_atk_bad_set: '失舉次數'
                }
            },
            normal_atk: {
                title: '普攻',
                subStats: {
                    normal_atk_score: '得分',
                    normal_atk_lose: '失分',
                    normal_atk_normal_set: '正舉次數',
                    normal_atk_bad_set: '失舉次數'
                }
            },
            bad_atk: {
                title: '虛攻',
                subStats: {
                    bad_atk_score: '得分',
                    bad_atk_lose: '失分',
                    bad_atk_normal_set: '正舉次數',
                    bad_atk_bad_set: '失舉次數'
                }
            },
            special_atk: {
                title: '佯攻',
                subStats: {
                    special_atk_score: '得分',
                    special_atk_lose: '失分',
                    special_atk_normal_set: '正舉次數',
                    special_atk_bad_set: '失舉次數'
                }
            }
        }
    },
    block: {
        title: '攔網次數',
        subStats: {
            perfect_block:{
                title: '攔滿',
                subStats: {
                    perfect_block_score: '得分',
                    perfect_block_lose: '失分'
                }
            },
            normal_block:{
                title: '被閃躲',
                subStats: {
                    normal_block_perfect_atk: '敵方強攻',
                    normal_block_special_atk: '敵方佯攻'
                }
            },
            bad_block:{
                title: '攔穿',
                subStats: {

                }
            }
        }
    },
    serve: {
        title: '發球次數',
        subStats: {
            perfect_serve:{
                title: '爆擊發球',
                subStats: {
                    perfect_serve_score: '得分',
                    perfect_serve_enemy_error: '干擾'
                }
            },
            normal_serve:{
                title: '一般發球',
                subStats: {
                    normal_serve_score: '得分',
                    normal_serve_enemy_error: '干擾'
                }
            },
            bad_serve: {
                title: '發球失誤',
                subStats: {
                    bad_serve_net: '掛網',
                    bad_serve_outside: '出界'
                }
            }
        }
    },
    receive: {
        title: '接球次數',
        subStats: {
            perfect_receive: {
                title: '嗆司',
                subStats: {
                    perfect_receive_normal_set: '舉正',
                    perfect_receive_bad_set: '失舉'
                }
            },
            normal_receive: {
                title: '一般接球',
                subStats: {
                    normal_receive_normal_set: '舉正',
                    normal_receive_bad_set: '失舉'
                }
            },
            bad_receive: {
                title: '接噴',
                subStats: {
                    bad_receive_lose: '失分',
                    bad_receive_cover: '修正'
                }
            }
        }
    }
}

let playerDetailedStatsTitle = {
    atk: {
        title: '攻擊次數',
        subStats: {
            perfect_atk: {
                title: '強攻',
                subStats: {
                    perfect_atk_score: '得分',
                    perfect_atk_lose: '失分',
                    perfect_atk_normal_set: '正舉次數',
                    perfect_atk_bad_set: '失舉次數'
                }
            },
            normal_atk: {
                title: '普攻',
                subStats: {
                    normal_atk_score: '得分',
                    normal_atk_lose: '失分',
                    normal_atk_normal_set: '正舉次數',
                    normal_atk_bad_set: '失舉次數'
                }
            },
            bad_atk: {
                title: '虛攻',
                subStats: {
                    bad_atk_score: '得分',
                    bad_atk_lose: '失分',
                    bad_atk_normal_set: '正舉次數',
                    bad_atk_bad_set: '失舉次數'
                }
            },
            special_atk: {
                title: '佯攻',
                subStats: {
                    special_atk_score: '得分',
                    special_atk_lose: '失分',
                    special_atk_normal_set: '正舉次數',
                    special_atk_bad_set: '失舉次數'
                }
            }
        }
    },
    block: {
        title: '攔網次數',
        subStats: {
            perfect_block:{
                title: '攔滿',
                subStats: {
                    perfect_block_score: '得分',
                    perfect_block_lose: '失分'
                }
            },
            normal_block:{
                title: '被閃躲',
                subStats: {
                    normal_block_perfect_atk: '敵方強攻',
                    normal_block_special_atk: '敵方佯攻'
                }
            },
            bad_block:{
                title: '攔穿',
                subStats: {

                }
            }
        }
    },
    serve: {
        title: '發球次數',
        subStats: {
            perfect_serve:{
                title: '爆擊發球',
                subStats: {
                    perfect_serve_score: '得分',
                    perfect_serve_enemy_error: '干擾'
                }
            },
            normal_serve:{
                title: '一般發球',
                subStats: {
                    normal_serve_score: '得分',
                    normal_serve_enemy_error: '干擾'
                }
            },
            bad_serve: {
                title: '發球失誤',
                subStats: {
                    bad_serve_net: '掛網',
                    bad_serve_outside: '出界'
                }
            }
        }
    },
    receive: {
        title: '接球次數',
        subStats: {
            perfect_receive: {
                title: '嗆司',
                subStats: {
                    perfect_receive_normal_set: '舉正',
                    perfect_receive_bad_set: '失舉'
                }
            },
            normal_receive: {
                title: '一般接球',
                subStats: {
                    normal_receive_normal_set: '舉正',
                    normal_receive_bad_set: '失舉'
                }
            },
            bad_receive: {
                title: '接噴',
                subStats: {
                    bad_receive_lose: '失分',
                    bad_receive_cover: '修正'
                }
            }
        }
    },
    set: {
        title: '舉球次數',
        subStats: {
            normal_set: {
                title: '舉正',
                subStats: {
                    normal_set_perfect_atk: '舉正後強攻',
                    normal_set_normal_atk: '舉正後普攻',
                    normal_set_bad_atk: '舉正後虛攻'
                }
            },
            bad_set: {
                title: '失舉',
                subStats: {
                    bad_set_perfect_atk: '失舉後強攻',
                    bad_set_normal_atk: '失舉後普攻',
                    bad_set_bad_atk: '失舉後虛攻'
                }
            }
        }
    }
}

let playerDetailedMainStatsTitle = [
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
        // initPlayerInfo();
        initMatchInfo();
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
    matches = myTeam.games.reverse();

    matches.map((match) => {
         getMatchPoints(match)
         .done(function(res){
            renderMatch(match);
        });
    });

}

function renderMatch(match) {
    if(!match.confirm)
        return;
    var gameTitle = ['第一局', '第二局', '第三局', '第四局', '第五局'];

    var ownedTeam = '台大資管'; //temp
    var oppositeTeam = (match.guest == ownedTeam) ? match.master : match.guest;
    var isGuest = (match.guest == ownedTeam);
    var isVictory = isGuest ? (match.g_point > match.m_point) : (match.g_point < match.m_point);
    var totalGames = match.g_point + match.m_point;
    var row = '';
    row += "<a href='#chart' class='btn match-record' id='" + match._id + "'><div class='card " + (isVictory ? "victory" : "defeat") + "'><div class='row'><div class='lineup'>";
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
    $(".match-record").on('click', function(){
        initMatchInfo();
        renderMatchInfoById($(this).attr("id"));
    })
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
    Object.keys(playerMainStatsTitle).forEach(function (key) {
        title = playerMainStatsTitle[key];
        head += "<th scope=\"col\">" + title + "</th>";
    });
    head += "</tr>"
    $(".tab-content .player-table thead").append(head)
}

function renderPlayerRow(player) {
    var row = ""
    row += "<tr onclick=\"window.location='#chart';\" class=\"player-row\" id=\"" + player._id + "\"><th scope='row'>" + player.name + "</th>";

    Object.keys(playerMainStatsTitle).forEach(function (key) {
        row += "<td>" + formatRate(player[key]) + "</td>";
    });
    row += "</tr>";
    $(".tab-content .player-table").append(row);
    $('.player-row').on('click', function () {
        initPlayerInfo();
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

function renderMatchInfoById(gid){
    var game = myTeam.games.find((game) => game._id == gid);
    $(".plot-info #name").contents().filter(function () {
        return this.nodeType == 3;
    })[0].nodeValue = game.name
    $(".plot-info #pos").html(formatDate(game.date));

    var row = ""
    Object.keys(matchDetailedStatsTitle).forEach(function (field) {
        get('/api/game/'+gid+'/records?cond='+ field)
        .done(function(res){
            $(".plot-info #" + field).html(res.count.toString(10));
        })
        Object.keys(matchDetailedStatsTitle[field].subStats).forEach(function(stat){
            get('/api/game/'+gid+'/records?cond='+ stat)
            .done(function(res){
                $(".plot-info #" + stat).html(res.count.toString(10));
            })
            Object.keys(matchDetailedStatsTitle[field].subStats[stat].subStats).forEach(function(subStat){
                get('/api/game/'+gid+'/records?cond='+ subStat)
                .done(function(res){
                    $(".plot-info #" + stat+'_'+subStat).html(res.count.toString(10));
                })
            })
        })
    });
}

function renderPlayerInfoById(pid) {
    // find player by playerName
    var player = myTeam.players.find((player) => player._id == pid);
    $(".plot-info #name").contents().filter(function () {
        return this.nodeType == 3;
    })[0].nodeValue = player.name
    $(".plot-info #pos").html(player.position);

    var row = ""
    Object.keys(playerDetailedStatsTitle).forEach(function (field) {
        get('/api/player/'+pid+'/records?cond='+ field)
        .done(function(res){
            $(".plot-info #" + field).html(res.count.toString(10));
        })
        Object.keys(playerDetailedStatsTitle[field].subStats).forEach(function(stat){
            get('/api/player/'+pid+'/records?cond='+ stat)
            .done(function(res){
                $(".plot-info #" + stat).html(res.count.toString(10));
            })
            Object.keys(playerDetailedStatsTitle[field].subStats[stat].subStats).forEach(function(subStat){
                get('/api/player/'+pid+'/records?cond='+ subStat)
                .done(function(res){
                    $(".plot-info #" + stat+'_'+subStat).html(res.count.toString(10));
                })
            })
        })
    });
}

function initMatchInfo() {
    $(".plot-info .info-overview ul").empty();
    Object.keys(matchDetailedStatsTitle).forEach(function (key) {
        var row = ""
        row += "<li class=\"list-group-item\" id=\"" + key + '-title' + "\"><span id=\"" + key + "\"> </span>" + matchDetailedStatsTitle[key].title + "</li>";
        $(".plot-info .info-overview ul").append(row);
        $("#"+key+"-title").hover(function(){
            $(this).attr('style', 'background-color: #f0f0f0');
        },function(){
            $(this).attr('style', '');
        })
    });


    $(".plot-info .info-detailed").empty();
    Object.keys(matchDetailedStatsTitle).forEach(field => {
        var row = ""
        row += '<table class="table" id="'+ field +'-table" style="display: none;"><caption>'+matchDetailedStatsTitle[field].title+"</caption><tbody>"
        let stats = matchDetailedStatsTitle[field].subStats;
        Object.keys(matchDetailedStatsTitle[field].subStats).forEach(key => {
            row += "<tr class=\"section-head\"><th scope=\"row\" colspan=\"1\">" + stats[key].title + "</th><th id=\"" + key + "\"> </th></tr>";
            Object.keys(stats[key].subStats).forEach(subKey => {
                row += "<tr><th scope=\"row\">" + stats[key].subStats[subKey] + "</th><td id=\"" + key+'_'+subKey + "\"> </td></tr>"
            })
        });
        row += '</tbody></table>'
        $(".plot-info .info-detailed").append(row);
    })
    
    Object.keys(matchDetailedStatsTitle).forEach(function (key) {
        $('#'+key+'-title').on('click', function(){
            $('.plot-info table').attr('style', 'display: none');
            $('.plot-info #'+key+'-table').attr('style', '');
        })
    });
}

function initPlayerInfo() {
    $(".plot-info .info-overview ul").empty();
    Object.keys(playerDetailedStatsTitle).forEach(function (key) {
        var row = ""
        row += "<li class=\"list-group-item\" id=\"" + key + '-title' + "\"><span id=\"" + key + "\"> </span>" + playerDetailedStatsTitle[key].title + "</li>";
        $(".plot-info .info-overview ul").append(row);
        $("#"+key+"-title").hover(function(){
            $(this).attr('style', 'background-color: #f0f0f0');
        },function(){
            $(this).attr('style', '');
        })
    });


    $(".plot-info .info-detailed").empty();
    Object.keys(playerDetailedStatsTitle).forEach(field => {
        var row = ""
        row += '<table class="table" id="'+ field +'-table" style="display: none;"><caption>'+playerDetailedStatsTitle[field].title+"</caption><tbody>"
        let stats = playerDetailedStatsTitle[field].subStats;
        Object.keys(playerDetailedStatsTitle[field].subStats).forEach(key => {
            row += "<tr class=\"section-head\"><th scope=\"row\" colspan=\"1\">" + stats[key].title + "</th><th id=\"" + key + "\"> </th></tr>";
            Object.keys(stats[key].subStats).forEach(subKey => {
                row += "<tr><th scope=\"row\">" + stats[key].subStats[subKey] + "</th><td id=\"" + key+'_'+subKey + "\"> </td></tr>"
            })
        });
        row += '</tbody></table>'
        $(".plot-info .info-detailed").append(row);
    })
    
    Object.keys(playerDetailedStatsTitle).forEach(function (key) {
        $('#'+key+'-title').on('click', function(){
            $('.plot-info table').attr('style', 'display: none');
            $('.plot-info #'+key+'-table').attr('style', '');
        })
    });
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
