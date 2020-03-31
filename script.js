$("#login-btn").click(function(){
    console.log('i was clicked');
    $(".signup__form").hide();
    $(".login__form").show();
  });

  $("#signup-btn").click(function(){
    console.log('i was clicked');
    $(".login__form").hide();
    $(".signup__form").show();
  });

  $(document).ready(function(){
    $.ajax({ url: "https://vanhackacton.herokuapp.com/api/v1/events/readall",
           method: 'GET',
            success: function(response){
               alert("done");
               console.log(response);
            }});
    });

