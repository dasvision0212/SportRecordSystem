function startGame(event){
	  var body = {
        date: 19990203,
        championship: 'NTU',
        name:'IM vs BA',
        master:'IM',
        guest:'BA',
       	g_point:0,
       	m_point:0,
  }
    post('/api/team/self/game',body)
    .done(function(res) {
     	console.log('startGame!')
    	window.location.href='/record';
    })
    .fail(function(error) {
        console.log(error)      
    })

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