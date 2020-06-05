
if (getCookie('session') != null) {
    $('#login').hide()
    $('#signup').hide()
} else {
    $('#logout').hide()
}

$('#logout').on('click', function() {
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.location.href = '/';
})

$('#disclaimer-knew').on('click', function(e) {
    var $target = $(e.target);
    $target.text('感謝您的諒解')
})



function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
} 