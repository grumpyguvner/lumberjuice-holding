
$('#signupform').submit(function (e) {
    e.preventDefault();
    
    $('#signupform button').prop('disabled', true).html('<span class="icon-spin5 animate-spin"></span>');
    var formURL = $(this).attr("action");
    $.ajax(
    {
        url : formURL,
        type: "POST",
        data : {'lumberjuice_email': $('#email').val()},
        success:function(data, textStatus, jqXHR) 
        {
            $('#signupform').html('<div class="alert alert-success" role="alert">Thank you for registering your interest!</div>');
        },
        error: function(jqXHR, textStatus, errorThrown) 
        {
            //if fails      
        }
    });
    
});