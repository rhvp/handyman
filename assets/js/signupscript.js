$(document).ready(function () {
  let lat;
  let lng;
const geocoder = new google.maps.Geocoder();
$('#address').change(function() {
  let address = $('#address').val();
  geocoder.geocode( { 'address': address}, function(results, status) {

  if (status == google.maps.GeocoderStatus.OK) {
  lat = results[0].geometry.location.lat();
  lng = results[0].geometry.location.lng();
  console.log(results[0].formatted_address);
  $('#userlat').val(lat);
  $('#userlong').val(lng);
    } 
  }); 
})




  let regForm = document.querySelector('.techform');
  let technician = document.querySelector('#select-field');
  let $first_name = regForm.elements.namedItem('first_name');
  let $last_name = regForm.elements.namedItem('last_name');
  let $email = regForm.elements.namedItem('email');
  let $phone = regForm.elements.namedItem('phone');
  let $password = regForm.elements.namedItem('password');
  let $cpassword = regForm.elements.namedItem('password_confirmation');
  let $lat = regForm.elements.namedItem('lat');
  let $lng = regForm.elements.namedItem('lng');

  regForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let $geo = [$lat.value, $lng.value];
      let post_data = {
        first_name: $first_name.value,
        last_name: $last_name.value,
        email: $email.value,
        password: $password.value,
        phone: $phone.value,
        geometry: {
          coordinates: $geo
        }
      }



      let json_data = JSON.stringify(post_data);
      console.log(json_data);
      console.log(post_data);

      const param = technician.value.toLowerCase();
        $.ajax({
          type: "POST",
          url: '/' + param,
          contentType: "application/json",
          data: json_data,
          success: function(newtech) {
            console.log('success');
            console.log(JSON.stringify(newtech));
             window.location.href ="/";
          },
          error: function() {
            alert('Error posting Technician');

          }
        });
    })

})
