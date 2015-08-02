var organizationController = {
  list : new signals.Signal(),
  remove : new signals.Signal(),
  save : new signals.Signal(),
  saveComplete : new signals.Signal()
};

organizationController.remove.add(function(key,id) {
});

organizationController.list.add(function(key,target) {
  console.log('organization:list');
    var url = configuration.scormfu + key + "/organization/all";
    var html = '';

    $.ajax({
        url:url, 
        jsonp: "callback",
        dataType: "jsonp",
        success: function( response ) {
          var source   = $("#organization-list-template").html();
          var template = Handlebars.compile(source);
          var html = template(response);
          $(target).html(html);
        }
    });

});

organizationController.save.add(function(key,name,id) {
  var url = configuration.scormfu + key + "/organization/new/"+name+"/"+id;
  $.ajax({
      url:url, 
      jsonp: "callback",
      dataType: "jsonp",
      success: function( response ) {
        organizationController.saveComplete.dispatch(response);
      }
  });
});
