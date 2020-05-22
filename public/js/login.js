$username = $('#username')
$password = $('#password')
$warning  = $('.warning')

$username[0].focus();

$('.forget a').on('click', function(e) {
    e.preventDefault();
    alert('抱歉，請你記得。');
})


$('#submit').on('click', function(e) {
    e.preventDefault();

    reset();

    if ($username[0].value == "") {
        $username.focus();
        $username.addClass('invalid');
        $warning.text('請輸入使用者名稱!');
        return;
    }
    
    if($password[0].value == "") {
        $password.focus();
        $password.addClass('invalid');
        $warning.text('請輸入密碼!');
        return;
    }
    
    var body = {
        account: $username[0].value,
        password: $password[0].value
    } 

    post('http://34.87.51.47:8787/api/login', body)
    .done(function(res) {
        console.log('Post Login: ',res)
        document.location.href = res.url;
    })
    .fail(function(error) {
        console.log(error)
        handleError(error);        
    })
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