$(document).ready(function(){
    var newCuboidForm = $("#add-cuboid"),
       cuboidx = $("#cuboid-x"),
       cuboidy = $("#cuboid-y"),
       cuboidz = $("#cuboid-z"),
       cuboidlength = $("#cuboid-length"),
       cuboidwidth = $("#cuboid-width"),
       cuboidheight = $("#cuboid-height"),
       cuboidcolor = $("#cuboid-color");

    var newSphereForm = $("#add-sphere"),
       spherex = $("#sphere-x"),
       spherey = $("#sphere-y"),
       spherez = $("#sphere-z"),
       sphereradius = $("#sphere-radius"),
       spherewidthsegments = $("#sphere-widthSegments"),
       sphereheightsegments = $("#sphere-heightSegments"),
       spherecolor = $("#sphere-color");
    
    var editObjectForm = $("#edit-object"),
        deleteObjectForm = $("#delete-object"),
        objectx = $("#object-x"),
        objecty = $("#object-y"),
        objectz = $("#object-z"),
        objectcolor = $("#object-color");
    deleteObjectForm.submit(function(event){
        event.preventDefault();
        var objectAttribute;
        if($("#object-attribute").text()=="Cuboid"){
            objectAttribute = "cuboid";
        } else if($("#object-attribute").text()=="Sphere"){
            objectAttribute = "sphere";
        }
        var requestConfig = {
            method: "POST",
            url: "/routes/playground",
            contentType: 'application/json',
            data: JSON.stringify({
                attribute: objectAttribute,
                operation: "delete",
                id: $("#object-id").val()
            })
        }
        $.ajax(requestConfig).then(function(responseMessage){
            ObjManager.remove(responseMessage.id);     
        });
    })

    editObjectForm.submit(function(event){
        event.preventDefault();
        var requestConfig;
        if($("#object-attribute").text()=="Cuboid"){
            requestConfig = {
                method: "POST",
                url: "/routes/playground",
                contentType: 'application/json',
                data: JSON.stringify({
                    attribute: "cuboid",
                    operation: "edit",
                    id: $("#object-id").val(),
                    cuboidx: objectx.val(),
                    cuboidy: objecty.val(),
                    cuboidz: objectz.val(),
                    cuboidlength: $("#object-length").val(),
                    cuboidwidth: $("#object-width").val(),
                    cuboidheight: $("#object-height").val(),
                    cuboidcolor: objectcolor.val()
                })
            };
        } else if($("#object-attribute").text()=="Sphere"){
            requestConfig = {
                method: "POST",
                url: "/routes/playground",
                contentType: 'application/json',
                data: JSON.stringify({
                    attribute: "sphere",
                    operation: "edit",
                    id: $("#object-id").val(),
                    spherex: objectx.val(),
                    spherey: objecty.val(),
                    spherez: objectz.val(),
                    sphereradius: $("#object-radius").val(),
                    spherewidthsegments: $("#object-widthsegments").val(),
                    sphereheightsegments: $("#object-heightsegments").val(),
                    spherecolor: objectcolor.val()
                })
            };
        }
        $.ajax(requestConfig).then(function(responseMessage){
            ObjManager.remove(responseMessage.id);
            if($("#object-attribute").text()=="Cuboid"){
                ObjManager.cuboid.add(responseMessage.body, responseMessage.id);
            } else if($("#object-attribute").text()=="Sphere"){
                ObjManager.sphere.add(responseMessage.body, responseMessage.id);
            }
        });
    })

    newCuboidForm.submit(function(event){
      event.preventDefault();
//    var newContent = $("#newContent");
      var x = cuboidx.val();
      var y = cuboidy.val();
      var z = cuboidz.val();
      var length = cuboidlength.val();
      var width = cuboidwidth.val();
      var height = cuboidheight.val();
      var color = cuboidcolor.val();
      // Have a default config, all attribute is 1.
      var requestConfig = {
          method: "POST",
          url: "/routes/playground",
          contentType: 'application/json',
          data: JSON.stringify({
              attribute: "cuboid",
              operation: "add",
              cuboidx: x,
              cuboidy: y,
              cuboidz: z,
              cuboidlength: length,
              cuboidwidth: width,
              cuboidheight: height,
              cuboidcolor: color
          })
      };

      $.ajax(requestConfig).then(function(responseMessage){
//        console.log(responseMessage.body);
//        newContent.text(JSON.stringify(responseMessage));
          ObjManager.cuboid.add(responseMessage.body, responseMessage.id);
      });
      
   });
    newSphereForm.submit(function(event){
      event.preventDefault();
      var x = spherex.val();
      var y = spherey.val();
      var z = spherez.val();
      var radius = sphereradius.val();
      var widthsegments = spherewidthsegments.val();
      var heightsegments = sphereheightsegments.val();
      var color = spherecolor.val();
      // Have a default config, all attribute is 1.
      var requestConfig = {
          method: "POST",
          url: "/routes/playground",
          contentType: 'application/json',
          data: JSON.stringify({
              attribute: "sphere",
              operation: "add",
              spherex: x,
              spherey: y,
              spherez: z,
              sphereradius: radius,
              spherewidthsegments: widthsegments,
              sphereheightsegments: heightsegments,
              spherecolor: color
          })
      };

      $.ajax(requestConfig).then(function(responseMessage){
          ObjManager.sphere.add(responseMessage.body, responseMessage.id);
      });
   });
    $("#log-out").click(function(){
        window.location.href="/routes/logout";
    })
});
