// $email = $('#email')
$username = $('#username')
$password = $('#password')
$password2 = $('#password2')
$warning  = $('.warning')

// var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

// $email.on('input', function(e) {
//     if (!emailReg.test($email[0].value)) {
//         $email.addClass('invalid');
//         return;
//     }
//     if (emailReg.test($email[0].value)) {
//         $email.removeClass('invalid');
//         return;
//     }
// })

$password2.on('input', function(e) {
    if($password[0].value != $password2[0].value) {
        $password2.addClass('invalid');
        return;
    }

    if($password[0].value == $password2[0].value) {
        $password2.removeClass('invalid');
        return;
    }
})

$('#submit').on('click', function(e) {
    e.preventDefault();
    
    reset();

    // if ($email[0].value == "") {
    //     $email.focus();
    //     $email.addClass('invalid');
    //     $warning.text('請輸入信箱!');
    //     return;
    // }

    // if (!emailReg.test($email[0].value)) {
    //     $email.focus();
    //     $email.addClass('invalid');
    //     $warning.text('信箱格式錯誤!');
    //     return;
    // }

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

    if($password2[0].value == "") {
        $password2.focus();
        $password2.addClass('invalid');
        $warning.text('請確認密碼!');
        return;
    }

    if($password[0].value != $password2[0].value) {
        $password.focus();
        $password.addClass('invalid');
        $password2.addClass('invalid');
        $warning.text('密碼不一致！');
        return;
    }
    
    var body = {
        account: $username[0].value,
        password: $password[0].value,
    } 

    post('api/register', body)
    .done(function(res) {
        console.log(res)
        document.location.href = '/login';
    })
    .fail(function(error) {
        console.log(error)
        handleError(error);        
    })
})

function post(url, body) {
    return $.ajax({
        url: url,
        method: 'POST',
        xhrFields: { withCredentials: true },
        contentType: 'application/json',
        data: JSON.stringify(body),
        timeout: 30000
    })
}

function reset() {
    // $email.removeClass('invalid');
    $username.removeClass('invalid');
    $password.removeClass('invalid');
    $password2.removeClass('invalid');
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