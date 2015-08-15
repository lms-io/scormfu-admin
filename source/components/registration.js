<script language="javascript">

var registrationController = {
  list : new signals.Signal(),
  create : new signals.Signal(),
  save : new signals.Signal(),
  saveComplete : new signals.Signal()
};

registrationController.list.add(function(org) {
  var url = configuration.scormfu + _KEY_ + "/" + org + "/registration/all";
  var html = '';

  $.ajax({
    url:url, 
    jsonp: "callback",
    dataType: "jsonp",
    success: function( response ) {
      var source   = $("#registration-list-template").html();
      var template = Handlebars.compile(source);
      var html = template(response);
      $('.registration-list').empty().append(html).modal('show');
    }
  });
});

registrationController.create.add(function(org) {
  var url = configuration.scormfu + _KEY_ + "/" + org + "/course/all";
  $.ajax({
    url:url, 
    jsonp: "callback",
    dataType: "jsonp",
    success: function( response ) {
      var source   = $("#registration-create-template").html();
      var template = Handlebars.compile(source);
      var html = template({organization:org,courses:response});
      $('.registration-create').empty().append(html).modal();
    }
  });
});

registrationController.save.add(function(org) {
  var name = $('.registration-create #name').val();
  var id = $('.registration-create #id').val();
  var url = configuration.scormfu + _KEY_ + "/" + org + "/registration/new/"+name+"/"+id;
  $.ajax({
      url:url, 
      jsonp: "callback",
      dataType: "jsonp",
      success: function( response ) {
        $('.registration-create #course').each(function() {
          
          var url = configuration.scormfu + _KEY_ + "/" + org + "/link/"+response.id+"/"+$(this).val();
          $.ajax({
              url:url, 
              jsonp: "callback",
              dataType: "jsonp",
              success: function( response ) {
                console.log(response);
              }
          });
          $('.registration-create').modal('hide');
        });
      }
  });
});
</script>
