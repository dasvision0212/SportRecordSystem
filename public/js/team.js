// Logout
$('#logout').on('click', function() {
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.location.href = '/';
})

// Menu
var $showUser = $('#show-user-btn');
$showUser.on('click', function(e){
    $.ajax({
        "url": "/api/user/self",
        "method": "GET",
      })
      .done(function (res) {
    
        $('#show-user').text(JSON.stringify(res, null, 2));
        var account = res.account;
        $('.author-card-name').text(account);
        console.log(res);
      })
      .fail(function(error) {
        console.log(error)     
    })
})

var $menu = $('#menu');
$menu.on('click', function(e) {
    var $target =  $(e.target);
    if ($target.is('li')) {
        $menu.find('li').removeClass('active');
        $target.addClass('active');
    }
})


// Player
var $showPlayer = $('#show-player-btn');
$showPlayer.on('click', function(e){
    $.ajax({
        "url": "/api/team/self",
        "method": "GET",
      })
      .done(function (res) {
    
        $('#show-player').text(JSON.stringify(res, null, 2));
        console.log(res);
      })
      .fail(function(error) {
        console.log(error)     
    })
})

$('#add-player').on('submit', function(e) {
    e.preventDefault();

    var body = {
        name: $('#add-player-name').val(),
        grade: $('#add-player-grade').val(),
        birth: $('#add-player-birth').val(),
        number: $('#add-player-number').val(),
        position: $('#add-player-position').val(),
    } 

    console.log(body);

    post('/api/team/self/player', body)
    .done(function(res) {
        console.log(res)
    })
    .fail(function(error) {
        console.log(error)
    })
})


// Team

$('#add-team').on('submit', function(e) {
    e.preventDefault();

    var body = {
        name: $('#add-team-name').val(),
        sport_type: $('#add-team-sport_type').val(),
        description: $('#add-team-description').val(),
    } 

    console.log(body);

    post('/api/user/self/team', body)
    .done(function(res) {
        console.log(res)
    })
    .fail(function(error) {
        console.log(error)        
    })
})
var $showTeam = $('#show-team-btn');
$showTeam.on('click', function(e){
    $.ajax({
        "url": "/api/user/self/team",
        "method": "GET",
      })
      .done(function (res) {
    
        $('#show-team').text(JSON.stringify(res, null, 2));
        console.log(res);
      })
      .fail(function(error) {
        console.log(error)     
    })
})

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
