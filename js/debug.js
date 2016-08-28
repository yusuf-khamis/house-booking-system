$(function(){
    $.post('php/session.php', { confirm: 'session' }, function(data){
        if(data != 1){
//            console.log("not set");
//        } else {
            $('#logout').html('<a href="#"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span> Logout</a>');
            $('#user').html('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>&nbsp;<a href="#" class="navbar-link">' + data +'</a>&nbsp;&nbsp;');
        }
    });
});