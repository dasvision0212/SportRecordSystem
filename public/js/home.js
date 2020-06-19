// Hide login & signup if log-in
if (getCookie('session') != null) {
    $('#login').hide()
    $('#signup').hide()
} 
// Redirect login if not
else {
    $('#logout').hide();
}

$(".animated").addClass("delay-1s");

$('#disclaimer-knew').on('click', function(e) {
    $(e.target).text('感謝您的諒解');
})

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) {
            return null
        };
    } else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
} 