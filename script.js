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
    headers: {
        "Content-Type": "application/json"
    },
    data: JSON.stringify({
        email: emailval,
        password: passwordval
    }),
     success: function(response){
        $("#login-btn").addClass('none');
        $("#signup-btn").addClass('none');
         $('#exampleModal').modal('hide');
         alert('login successful');
         localStorage.setItem('token', response.token)
     },
     error:function(response) {
        $('.login_submit').html('submit');
        $("#login-btn").removeClass('none');
        $("#signup-btn").removeClass('none');
        alert('wrong user name or password');
     }
  });
  })

  $('#signUp').submit(function( event ) {
    event.preventDefault();
    $('.login_submit').html('loading..');
    var firstnameVal = $(".firstname_signup").val();
    var lastnameVal = $(".lastname_signup").val();
    var emailval = $(".email_signup").val();
    var passwordval = $(".password_signup").val();
    var checboxval = $(".form-check-input").is(':checked') ? true : false;
    console.log(checboxval, "the checkbox val");

    $('.signup_submit').html('loading..');
    $.ajax({ url: "https://vanhackacton.herokuapp.com/api/v1/users/signup",
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    data: JSON.stringify({
        firstname: firstnameVal,
        lastname: lastnameVal,
        email: emailval,
        password: passwordval,
        isPremium: checboxval
        }),
     success: function(response){
        $("#login-btn").addClass('none');
        $("#signup-btn").addClass('none');
         $('#exampleModal').modal('hide');
         $('.signup-btn').html('sign up');
         alert('signup successful');
         localStorage.setItem('token', response.token)
     },
     error:function(response) {
        $('.login_submit').html('submit');
        $('.signup-btn').html('sign up');
        $("#login-btn").removeClass('none');
        $("#signup-btn").removeClass('none');
        console.log('this is the response', response);
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
      $(".loader").html('Loading....');
    $.ajax({ url: "https://vanhackacton.herokuapp.com/api/v1/events/readall",
           method: 'GET',
            success: function(response){
               console.log(response);
               $(".loader").html('');
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

                var premium =document.createElement('div');
                premium.className='badge badge-info bag';
                premium.innerHTML='premium';
                if(response.data[element].isPremium) cardTitle.appendChild(premium);

                var location = document.createElement('div');
                var date =document.createElement('div');
                
                location.innerHTML = response.data[element].location;
                date.innerHTML= new Date(response.data[element].date).toString().slice(0, 15);
                
                var button =document.createElement('div');
                button.className='btn btn-primary book__event';
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
            },
            error:function(response) {
                $(".loader").html('');  
            }
        });
    }    
);

$(document).on('click', '.book__event', function (e) {
    e.preventDefault();
  var id =  e.target.attributes.id.value;
  var token = localStorage.getItem('token');
  console.log('event is', e);
  e.target.textContent = 'Loading...';
  $.ajax({ url: `https://vanhackacton.herokuapp.com/api/v1/events/subscribe/${id}`,
  method: 'GET',
  headers: {
    "Authorization": localStorage.getItem('token')
  },
  success: function(response) {
      console.log('success...');
        alert(`Hello ${response.data.firstname} you have successfully booked the event a mail will be sent to you shortly`);
        e.target.textContent = 'Booked';
     },
     error:function(response) {
         if(response.status === 401){
            alert(`Kindly login or sign up`);
         }
         if(response.status === 403){
             alert('you are not a premium user kindly upgrade your plan');
         }

        e.target.textContent = 'Book event';
     }
  });
});

$(window).on('load', function(){
    $.ajax({ url: "https://vanhackacton.herokuapp.com/api/v1/users/details",
    method: 'GET',
    headers: {
      "Authorization": localStorage.getItem('token')
    },
    success: function(response) {
      $("#login-btn").addClass('none');
      $("#signup-btn").addClass('none');
       },
       error:function(response) {
          $("#login-btn").removeClass('none');
          $("#signup-btn").removeClass('none');
       }
    });
});
    
