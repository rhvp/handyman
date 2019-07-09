      // Try HTML5 geolocation.
      $(document).ready(function(){

          navigator.geolocation.getCurrentPosition(successCb, failureCb);


    function successCb(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          console.log(pos.lat);
          console.log(pos.lng);


          var myform = document.getElementById('search');
          myform.elements.namedItem('lat').value = pos.lat;
          myform.elements.namedItem('lng').value = pos.lng;



        }

        function failureCb() {
          console.log("didnt work")
        }
      })
