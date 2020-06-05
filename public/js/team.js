$('#logout').on('click', function() {
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.location.href = '/';
})


$.ajax({
    "url": "/api/user/self/team",
    "method": "GET",
  })
  .done(function (response) {
    console.log(response);
  })
  .fail(function(error) {
    console.log(error)     
})

$.ajax({
    "url": "/api/user/self",
    "method": "GET",
  })
  .done(function (res) {
    var account = res.account;
    $('.author-card-name').text(account);
    console.log(response);
  })
  .fail(function(error) {
    console.log(error)     
})