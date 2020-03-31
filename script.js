$("#login-btn").click(function(){
    console.log('i was clicked');
    $(".signup__form").hide();
    $(".login__form").show();
    $(".modal-title").html('Log In');
  });

  $('#login').submit(function( event ) {
    event.preventDefault();
    var emailval = $(".email_login").val();
    var passwordval = $(".password_login").val();
    $('.login_submit').html('loading..');
    $.ajax({ url: "https://vanhackacton.herokuapp.com/api/v1/users/signin",
    method: 'POST',
    data: {
        email: emailval,
        password: passwordval
    },
     success: function(response){
        $("#login-btn").remove();
        $("#signup-btn").remove();
         $('#exampleModal').modal('hide');
         alert('login successful');
         localStorage.setItem('token', response.token)
     },
     error:function(response) {
        $('.login_submit').html('submit');
        alert('wrong user name or password');
     }
  });
  })

  $("#signup-btn").click(function(){
    console.log('i was clicked');
    $(".login__form").hide();
    $(".signup__form").show();
    $(".modal-title").html('Sign Up');
  });

  $(document).ready(function(){
    $.ajax({ url: "https://vanhackacton.herokuapp.com/api/v1/events/readall",
           method: 'GET',
            success: function(response){
               console.log(response);
             Object.keys(response.data).forEach(function(element, i) {
                var item = document.createElement('div');
                item.className = 'card';
                item.style.width = '18rem';
                item.style.margin = '4rem';

                var image = document.createElement('img');
                image.className = 'card-img-top';
                image.src = response.data[element].imageUrl;
                item.appendChild(image);

                var content = document.createElement('div');
                content.className = 'card-body';

                var cardTitle = document.createElement('h5');
                cardTitle.className = 'card-title';
                cardTitle.innerHTML= response.data[element].name;

                var location = document.createElement('div');
                var date =document.createElement('div');
                
                location.innerHTML = response.data[element].location;
                date.innerHTML= new Date(response.data[element].date).toString().slice(0, 15);
                
                var button =document.createElement('a');
                button.className='btn btn-primary';
                button.innerHTML='Book Event';
                button.style.color='#FFFFFF';
                button.style.marginTop = '10px';
                button.id = response.data[element].id;

                content.appendChild(cardTitle);
                content.appendChild(location);    
                content.appendChild(date);
                content.appendChild(button);
                item.appendChild(content);

                
                $('.event__list').append(item);
               });
            }});
    });

    
