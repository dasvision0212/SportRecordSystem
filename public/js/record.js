var p_locationX = 0;
var p_locationY = 0;
var p_maker = '';
var p_quality = -20;
var p_behavior = 'NONE';
var p_allyScore = 0;
var p_enemyScore = 0;
var p_allyPoint = 0;
var p_enemyPoint = 0;
var p_videotime = 0;
var score_team = 'none'
var g_gid = '';
let myTeam;
//onload, load the playerList in the modal
window.onload = function () {
    get('api/team/self')
        .done(function (res) {
            console.log(res);
            myTeam = res;
            if (res.games.length > 0) {
                let last_game = res.games[res.games.length - 1];
                if (!last_game.confirm) { // Resume the unconfirmed game
                    g_gid = last_game._id;
                    $(".lineup").text(last_game.name);
                    $("#m-team-name").text(last_game.master);
                    $("#g-team-name").text(last_game.guest);
                    get('api/game/' + g_gid + '/m_scores').done(function (res) {
                        $('#a-score').text(res[res.length - 1]);
                        p_allyScore = parseInt(res[res.length - 1], 10);
                    })
                    get('api/game/' + g_gid + '/g_scores').done(function (res) {
                        $('#e-score').text(res[res.length - 1]);
                        p_enemyScore = parseInt(res[res.length - 1], 10);
                    })
                    $('#a-point').text(last_game.m_point);
                    p_allyPoint = parseInt(last_game.m_point, 10);
                    $('#e-point').text(last_game.g_point);
                    p_enemyPoint = parseInt(last_game.g_point, 10);
                }
                else {
                    $("#newGameButton").trigger('click');
                }
            }
            else {
                $("#newGameButton").trigger('click');
            }


            for (i = 0; i < res.players.length; i++) { // Create player list
                var name = res.players[i].name;
                var number = res.players[i].number;
                var position = res.players[i].position;
                playerRow =
                    '<tr id="' + res.players[i]._id + '">\
                    <th scope="row">' + number + '</th>\
                    <td>' + name + '</td>\
                    <td>' + position + '</td>\
                </tr>'
                $('#player-list-modal tbody').append(playerRow);
            }

            var enemyRow =
                '<tr id="0" style="display: none;">\
                <th scope="row">0</th>\
                <td>敵方球員</td>\
                <td>敵人</td>\
            </tr>';
            $('#player-list-modal tbody').append(enemyRow);

            $('#player-list-modal tr').on('click', function () {
                var id = $(this).attr('id');
                if ($('#player-list ul').find('#' + id).length) {
                    return;
                }
                var number = $(this).children()[0].innerHTML;
                var name = $(this).children()[1].innerHTML;
                var position = $(this).children()[2].innerHTML;
                var row =
                    '<li class="list-group-item" id="' + $(this).attr('id') + '">\
                    <div id="num">&nbsp' + number + '</div>\
                    <div id="name">' + name + '<div id="pos">' + position + '</div></div>\
                </li>';
                $(row).attr('class', 'NameDragable')
                    .attr('ondragstart', 'onDragStart(event);')
                    .attr("draggable", true)
                    .prependTo("#player-list ul"); // Insert right before enemy player in the list

                if (id != "0") { // Imaginary enemy player can't be post
                    post('/api/game/' + g_gid + '/m_player', { pid: id, number: number })
                        .fail(function (error) {
                            console.log(error);
                        })
                }
            })

            $('#player-list-modal #0').trigger('click'); // Automatically add in enemy player
            if (g_gid != '') {
                get('/api/game/' + g_gid + '/m_player') // Resume added players
                    .done(function (res) {
                        for (var p in res) {
                            const id = res[p].player;
                            $('#player-list-modal #' + id).trigger('click');
                        }
                    })
            }
        })
        .fail(function (error) {
            console.log(error)
        })
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

$(document).on('click', '#start-new-game', function () {
    var enemyName = $('#enemy-name').val();
    var matchDate = $('#match-date').val();
    var m_point = $('#a-gap').text();
    var g_point = $('#e-gap').text();
    console.log(enemyName, matchDate, m_point, g_point);
    createNewGame(enemyName, matchDate);
})

$(document).on('click', '#confirmEndGame', function () {
    post('/api/game/' + g_gid + '/confirm', {});
    document.location.href = '/history';
})

function createNewGame(enemyName, matchDate) {
    post('api/team/self/game', {
        master: myTeam.name,
        guest: enemyName,
        date: matchDate,
        name: myTeam.name + " v.s " + enemyName,
        m_point: "0",
        g_point: "0",
    })
        .done(function (res) {
            var newGame = res.games[res.games.length - 1]
            g_gid = newGame._id
            console.log(res);
            $(".lineup").text(newGame.name);
            $("#m-team-name").text(newGame.master);
            $("#g-team-name").text(newGame.guest);
        })
}
// player drag handlers
function onDragStart(event) {
    var id = event.target.id;
    var num = event.target.querySelector('#num').innerHTML.substring(6);
    var pin =
        '<div class="pin"> \
    <img class="pin-img" src="img/pin-icon.png" alt="">\
    <p style="position: relative; left: 0px; top: -50px; text-align: center; font-weight: bold;">'+ num + '</p>\
    </div>';
    $(pin).attr("style", "left: -1000px; top: 0px;").attr("id", id + '-pin').insertBefore('#court-img');
    event.dataTransfer.setDragImage($('#' + id + '-pin').get(0), 0, 0);
    event.dataTransfer.setData('player_id', id);
    event.dataTransfer.setData('player_num', num)
}

function onDragOver(event) {
    event.preventDefault();
}
function onDrop(event) {
    const id = event.dataTransfer.getData('player_id');
    const num = event.dataTransfer.getData('player_num');
    var rect = event.target.getBoundingClientRect();
    var pos_x = event.clientX - rect.left;
    var pos_y = event.clientY - rect.top;

    var width = rect.right - rect.left;
    var height = rect.bottom - rect.top;

    $('#' + id + '-pin')
        .attr('style', 'top: ' + pos_y.toString(10) + 'px; left: ' + pos_x.toString(10) + 'px;');
    p_locationY = ((pos_y + 60).toString(10) / height).toPrecision(5);
    p_locationX = ((pos_x + 30).toString(10) / width).toPrecision(5);
    p_maker = id;
    event.dataTransfer.clearData();
}

// behavior buttons
$(document).on('mousedown', '#atk-btn', function (event) {
    p_behavior = "ATK";
    displayOption(event, 100, '../img/atk-100.png'); //top (強攻)
    displayOption(event, 75, '../img/atk.png'); //mid （普攻）
    displayOption(event, 50, '../img/atk-50.png'); //right （佯攻）
    displayOption(event, 25, '../img/atk-25.png'); //bottom （虛攻）
    displayOption(event, 0, '../img/foul.png'); //left （犯規）
})

$(document).on('mousedown', '#block-btn', function (event) {
    p_behavior = "BLOCK";
    displayOption(event, 100, '../img/block-100.png'); //top （攔網）
    displayOption(event, 75, '../img/block-75.png'); //mid （被閃躲）
    displayOption(event, 25, '../img/block-25.png'); //bottom （攔穿）
    displayOption(event, 0, '../img/foul.png'); //left （犯規）
})

$(document).on('mousedown', '#receive-btn', function (event) {
    p_behavior = "RCV";
    displayOption(event, 100, '../img/receive-100.png'); //top （嗆司）
    displayOption(event, 75, '../img/receive.png'); //mid （一般接球）
    displayOption(event, 25, '../img/receive-25.png'); //bottom （接噴）
    displayOption(event, 0, '../img/foul.png'); //left （犯規）
})

$(document).on('mousedown', '#serve-btn', function (event) {
    p_behavior = "SERVE";
    displayOption(event, 100, '../img/serve-100.png'); //top （爆擊發球）
    displayOption(event, 75, '../img/serve.png'); //mid （一般發球）
    displayOption(event, 25, '../img/serve-25.png'); //bottom （發球失誤）
    displayOption(event, 0, '../img/foul.png'); //left （犯規）
})

$(document).on('mousedown', '#set-btn', function (event) {
    p_behavior = "SET";
    displayOption(event, 75, '../img/set.png'); //mid （舉正）
    displayOption(event, 25, '../img/set-25.png'); //bottom （失舉）
    displayOption(event, 0, '../img/foul.png'); //left （犯規）
})

$(document).on('mousedown', '#replay-btn', function (event) {
    p_behavior = "REPLAY";
    displayOption(event, 75, '../img/replay.png'); //mid （公正球）
})

$(document).on('mouseup', function (event) {
    dismissOption(event, 100);
    dismissOption(event, 75);
    dismissOption(event, 50);
    dismissOption(event, 25);
    dismissOption(event, 0);
    $('.mask').css('opacity', '0').css('z-index', '-2');
})

$(document).on('mouseover', '.submit-btn-img', function(event){
    var original_src = $(this).attr('src');
    original_src = original_src.substring(0, original_src.length - 4);
    $(this).attr('src', original_src + '-hover.png');
})

$(document).on('mouseout', '.submit-btn-img', function () {
    var original_src = $(this).attr('src');
    original_src = original_src.substring(0, original_src.length - 10) + '.png';
    $(this).attr('src', original_src);
})


function displayOption(event, quality, imgsrc) {
    $('.mask').css('opacity', '0.7').css('z-index', '5');
    var option =
        '<div class="behavior-opt">\
        <img draggable="false" class="behavior-btn-img" style="display: table-row;" id="atk" src="' + imgsrc + '">\
    </div>';

    var rect = event.target.getBoundingClientRect();

    if (quality == 100) { //top
        var pos_x = rect.left;
        var pos_y = rect.top - 75;
    }
    else if (quality == 75) { //mid
        var pos_x = rect.left;
        var pos_y = rect.top;
    }
    else if (quality == 50) { //right
        var pos_x = rect.left + 75;
        var pos_y = rect.top;
    }
    else if (quality == 25) { //bottom
        var pos_x = rect.left;
        var pos_y = rect.top + 75;
    }
    else if (quality == 0) { //left
        var pos_x = rect.left - 75;
        var pos_y = rect.top;
    }


    $(option)
        .attr('id', 'quality-' + quality.toString(10))
        .attr('style', 'z-index: 6; position: absolute; top: ' + pos_y.toString(10) + 'px; left: ' + pos_x.toString(10) + 'px;')
        .appendTo('body');


    $(document).on('mouseover', '.behavior-opt#' + 'quality-' + quality.toString(10), function () {
        p_quality = parseInt($(this).attr('id').substring(8), 10);
        var original_src = $(this).children('img').attr('src');
        original_src = original_src.substring(0, original_src.length - 4);
        $(this).children('img').attr('src', original_src + '-hover.png');
    })

    $(document).on('mouseout', '.behavior-opt#' + 'quality-' + quality.toString(10), function () {
        var original_src = $(this).children('img').attr('src');
        original_src = original_src.substring(0, original_src.length - 10) + '.png';
        $(this).children('img').attr('src', original_src);
    })
}

function dismissOption(event, quality) {
    $(document).off('mouseover', '.behavior-opt#' + 'quality-' + quality.toString(10));
    $(document).off('mouseout', '.behavior-opt#' + 'quality-' + quality.toString(10));
    $('.behavior-opt#' + 'quality-' + quality.toString(10)).remove();
}

function submit(event) {
    score_team = event.target.id;
    var body = {
        time: p_videotime,
        event: p_behavior,
        maker: p_maker,
        quality: p_quality,
        score_team: score_team,
        x_loc: p_locationX,
        y_loc: p_locationY,
    }
    if (p_behavior == 'NONE') {
        if (score_team == 'ally') {
            $('#p-ally').trigger('click');
            $('.pin').remove();
            return;
        }
        else if (score_team == 'enemy') {
            $('#p-enemy').trigger('click');
            $('.pin').remove();
            return;
        }
    }
    if (p_maker == '') {
        return;
    }
    console.log(body);
    post('/api/game/' + g_gid + '/record', body)
        .done(function (res) {
            console.log('record: ', res)
        })
        .fail(function (error) {
            console.log(error)
        })

    if (score_team == 'ally') {
        var temp = document.getElementById('a-score');
        var s = parseInt(temp.innerHTML) + 1;
        p_allyScore = s;
        temp.innerHTML = s;
    }
    else if (score_team == 'enemy') {
        var temp = document.getElementById('e-score');
        var s = parseInt(temp.innerHTML) + 1;
        p_enemyScore = s;
        temp.innerHTML = s;
    }

    p_quality = -20;
    p_behavior = 'NONE';
    p_locationX = 0;
    p_locationY = 0;
    p_maker = '';
    score_team = 'none';


    if (p_allyScore >= 25 && p_allyScore - p_enemyScore >= 2) {
        p_allyScore = 0;
        p_enemyScore = 0;
        $('#a-score').text('0');
        $('#e-score').text('0');
        var newPoint = parseInt($('#a-point').html(), 10) + 1;
        p_allyPoint = newPoint
        $('#a-point').html(newPoint);

        let body = {
            point: newPoint
        }
        post('/api/game/' + g_gid + '/m_point', body)
            .done(function (res) {
                console.log(res);
            });
    }
    if (p_enemyScore >= 25 && p_enemyScore - p_allyScore >= 2) {
        p_allyScore = 0;
        p_enemyScore = 0;
        $('#a-score').text('0');
        $('#e-score').text('0');
        var newPoint = parseInt($('#e-point').html(), 10) + 1;
        p_enemyPoint = newPoint
        $('#e-point').html(newPoint);

        let body = {
            point: newPoint
        }
        post('/api/game/' + g_gid + '/g_point', body)
            .done(function (res) {
                console.log(res);
            });
    }

    $('.pin').remove();
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
function changeScore(event) {
    //plus
    if (event.currentTarget.getAttribute('id') == "p-ally") {
        var temp = document.getElementById('a-score');
        var s = parseInt(temp.innerHTML) + 1;
        p_allyScore = s;
        score_team = 'ally';
        temp.innerHTML = s;
    }
    else if (event.currentTarget.getAttribute('id') == "p-enemy") {
        var temp = document.getElementById('e-score');
        var s = parseInt(temp.innerHTML) + 1;
        p_enemyScore = s;
        score_team = 'enemy';
        temp.innerHTML = s;
    }

    var body = {
        time: p_videotime,
        event: "NONE",
        score_team: score_team,
    }
    post('/api/game/' + g_gid + '/record', body)
        .fail(function (error) {
            console.log(error)
        })

    score_team = 'none'

    if (p_allyScore >= 25 && p_allyScore - p_enemyScore >= 2) {
        p_allyScore = 0;
        p_enemyScore = 0;
        $('#a-score').text('0');
        $('#e-score').text('0');
        var newPoint = parseInt($('#a-point').html(), 10) + 1;
        p_allyPoint = newPoint
        $('#a-point').html(newPoint);

        let body = {
            point: newPoint
        }
        post('/api/game/' + g_gid + '/m_point', body)
            .done(function (res) {
                console.log(res);
            });
    }
    if (p_enemyScore >= 25 && p_enemyScore - p_allyScore >= 2) {
        p_allyScore = 0;
        p_enemyScore = 0;
        $('#a-score').text('0');
        $('#e-score').text('0');
        var newPoint = parseInt($('#e-point').html(), 10) + 1;
        p_enemyPoint = newPoint
        $('#e-point').html(newPoint);

        let body = {
            point: newPoint
        }
        post('/api/game/' + g_gid + '/g_point', body)
            .done(function (res) {
                console.log(res);
            });
    }
}

function clears() {
    var temp = document.getElementById('a-score');
    p_allyScore = 0;
    temp.innerHTML = '0';
    temp = document.getElementById('e-score');
    p_enemyScore = 0;
    temp.innerHTML = '0';
}
function backtoTeam(event) {
    window.location.href = '/team';
}