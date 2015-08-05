var courseController = {
  list : new signals.Signal(),
  create : new signals.Signal(),
  save : new signals.Signal(),
  saveComplete : new signals.Signal()
};

courseController.list.add(function(org) {
  var url = configuration.scormfu + _KEY_ + "/" + org + "/course/all";
  var html = '';

  $.ajax({
    url:url, 
    jsonp: "callback",
    dataType: "jsonp",
    success: function( response ) {
      var source   = $("#course-list-template").html();
      var template = Handlebars.compile(source);
      var html = template(response);
      $('.course-list').empty().append(html).modal('show');
    }
  });

});

courseController.create.add(function(org) {
  var source   = $("#course-create-template").html();
  var template = Handlebars.compile(source);
  var html = template({organization:org});
  $('.course-create').empty().append(html).modal();
});

courseController.save.add(function(org) {
  var name = $('.course-create #name').val();
  var id = $('.course-create #id').val();
  var url = configuration.scormfu + _KEY_ + "/" + org + "/course/new/"+name+"/"+id;
  $.ajax({
      url:url, 
      jsonp: "callback",
      dataType: "jsonp",
      success: function( response ) {
        var url = configuration.scormfu + _KEY_ + "/" + org + "/upload/" + response.id;
        var data = new FormData();
        data.append( 'upload', $( '#upload' )[0].files[0] );
        $.ajax({
          url: url, 
          type: "POST",    
          data: data, 
          contentType: false,
          cache: false,           
          processData:false,     
          success: function(data) {
            $('.course-create').modal('hide');
          }
        });
      }
  });
});
