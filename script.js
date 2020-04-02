$("#login-btn").click(function(){
    console.log('i was clicked');
    $(".signup__form").hide();
    $(".login__form").show();
    $(".cta__container").hide();
    $(".modal-title").html('Log In');
    $(".event__details").hide();
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
        alert('wrong user name or password');
     }
  });
  })

  $("#signup-btn").click(function(){
    console.log('i was clicked');
    $(".login__form").hide();
    $(".signup__form").show();
    $(".cta__container").hide();
    $(".modal-title").html('Sign Up');
    $(".event__details").hide();
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
                image.alt=`${response.data[element].id}image`
                image.src = response.data[element].imageUrl;
                item.appendChild(image);

                var content = document.createElement('div');
                content.className = 'card-body';

                var cardTitle = document.createElement('h5');
                cardTitle.className = 'card-title custom__title';
                cardTitle.innerHTML= response.data[element].name;

                var premium =document.createElement('div');
                premium.className='badge badge-info bag';
                premium.innerHTML='premium';
                if(response.data[element].isPremium) cardTitle.appendChild(premium);

                var catgoryElem =document.createElement('div');
                var arr = ['leap', 'mission', 'vanhackaton'];
                var category = response.data[element].category;
                var status = arr.indexOf(category);
                if(status != -1){
                    catgoryElem.className='badge badge-success bag';
                    catgoryElem.style.color='#FFFFFF';
                    catgoryElem.innerHTML = category;
                }

                var arr2 = ['open webinar', 'recruting mission', 'meetup'];
                var status2 = arr2.indexOf(category);
                if(status2 != -1){
                    catgoryElem.className='badge badge-secondary bag';
                    catgoryElem.style.color='#FFFFFF';
                    catgoryElem.innerHTML = category;
                    cardTitle.appendChild(catgoryElem);
                }
                cardTitle.appendChild(catgoryElem);


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
            $(".modal-title").html('Un Authorized');
            $(".signup__form").hide();
            $(".login__form").hide();
            $(".cta__container").show();
            $(".event__details").hide();
            $('#exampleModal').modal('show');
         }else{
             alert('user cannot book event session expired or not found');
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

$(document).on('click', '.card-img-top', function (e) {
    e.preventDefault();
    var alt = e.target.alt;
    var id = alt.slice(0,1);
    $(".modal-title").html('Un Authorized');
    $(".signup__form").hide();
    $(".login__form").hide();
    $(".event__details").show();
    $(".cta__container").hide();
    console.log(id, 'this is the id');
   $.ajax({ url: `https://vanhackacton.herokuapp.com/api/v1/events/read/${id}`,
    method: 'GET',
    headers: {
      "Authorization": localStorage.getItem('token')
    },
    success: function(response) {
            $(".event__title").html(`Name: ${response.data.name}`);  
            $(".event__category").html(`Category: ${response.data.category}`);  
            $(".event__location").html(`Location: ${response.data.location}`);  
            $(".event__date").html(`Date: ${new Date(response.data.date).toString().slice(0, 15)}`); 
            $(".event__date").html(`DeadLine: ${new Date(response.data.deadline).toString().slice(0, 15)}`);  
        $('#exampleModal').modal('show');
       },
       error:function(response) {
              alert(`Kindly login or sign up`);
               e.target.textContent = 'Book event';
       }
    });
  });
    
