$(document).ready(function() {

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  

  $('#get-all-button').on('click', function() {
      $('tbody').empty();
      $.getJSON("/contacts" , function(data) {
        console.log(JSON.stringify(data));

        data.forEach(function(value) {
          $('tbody').append("<tr data-id=" + value.id + ">" 
            + "<td>" + value.firstname + "</td>" 
            + "<td>" + value.lastname + "</td>" 
            + "<td>" + value.email + "</td>" 
            + "<td>" + "<button class='delete-btn btn btn-danger'>" 
            + "Delete" + "</button>" 
            + "</td>" + "</tr>");

        })

      })
    });

  $('#create-button').on('click', function() {
      $('.create-form').slideToggle();

    });

  $('#new-contact-form').submit(function(e) {
    e.preventDefault();
    console.log("submited form");
    var firstname = $('.firstname-input').val();
    var lastname = $('.lastname-input').val();
    var email = $('.email-input').val();
    $.ajax({
      url: '/contacts',
      method: 'post',
      data: {firstname: firstname, lastname: lastname, email: email},
      success: function(response) {
        console.log(response);
        $('tbody').append("<tr data-id=" + response.id + ">" 
          + "<td>" + response.firstname + "</td>" 
          + "<td>" + response.lastname + "</td>" 
          + "<td>" + response.email + "</td>" 
          + "<td>" + "<button class='delete-btn btn btn-danger'>" 
          + "Delete" + "</button>" 
          + "<td>" + "</tr>");
      }
    });
  });

  $('.search-input').on('input', function() {
    var gen = $('.search-input').val();
    $.ajax({
      url: '/search',
      method: 'get',
      data: {gen: gen},
      success: function(response) {
        $('tbody').empty();
        console.log(arguments);
        response.forEach(function(contact) {
          $('tbody').append("<tr data-id=" + contact.id + ">" 
            + "<td>" + contact.firstname + "</td>" 
            + "<td>" + contact.lastname + "</td>" 
            + "<td>" + contact.email + "</td>" 
            + "<td>" + "<button class='delete-btn btn btn-danger'>" 
            + "Delete" + "</button>" 
            + "</td>" + "</tr>");
        });
      }
    })

  })

  $(document).on('click', '.delete-btn', function() {
      var btn = $(this).parent().parent();
      $(this).css("background", "grey");
      console.log("in click");
      var id = btn.data('id');
      console.log(id);
      $.ajax({
        url: '/contacts/'+ id,
        method: 'delete',
        data: {id: id},
        success: function(response) {
          console.log(btn);
          btn.hide();

        }
         
      });


  });




});
