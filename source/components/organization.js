var organizationController = {
  list : new signals.Signal(),
  create : new signals.Signal(),
  save : new signals.Signal(),
  saveComplete : new signals.Signal()
};


organizationController.list.add(function() {
  var url = configuration.scormfu + _KEY_ + "/organization/all";
  var html = '';

  $.ajax({
    url:url, 
    jsonp: "callback",
    dataType: "jsonp",
    success: function( response ) {
      var source   = $("#organization-list-template").html();
      var template = Handlebars.compile(source);
      var html = template(response);
      $('.organization-list').empty().append(html);
    }
  });

});

organizationController.create.add(function() {
  var source   = $("#organization-create-template").html();
  var template = Handlebars.compile(source);
  var html = template({});
  $('.organization-create').empty().append(html).modal();
});

organizationController.save.add(function() {
  var name = $('.organization-create #name').val();
  var id = $('.organization-create #id').val();
  var url = configuration.scormfu + _KEY_ + "/organization/new/"+name+"/"+id;
  $.ajax({
      url:url, 
      jsonp: "callback",
      dataType: "jsonp",
      success: function( response ) {
        $('.organization-create').modal('hide');
        organizationController.list.dispatch();
      }
  });
});
