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