$(document).ready(function() {

const myForm = document.querySelector('#search');
const select = document.querySelector('#select-technician');
let searchBtn = $('#search-btn');
const getTec = (technicians) => {
  technicians.map(technician=>{
      let list = document.querySelector('#list');
      let li = document.createElement('li');

      let span1 = document.createElement('span')
      let span2 = document.createElement('a')
      let span3 = document.createElement('span')

      span1.innerHTML = technician.first_name;
      span2.innerHTML = "+234 " + technician.phone;
      span2.href = "tel: +234-"+ technician.phone;
      span3.innerHTML = Math.floor(technician.dist.calculated) + " meters away";

      list.appendChild(li);

      li.appendChild(span1);
      li.appendChild(span2);
      li.appendChild(span3);
  })
  searchBtn.hide();
}

const geocoder = new google.maps.Geocoder()

myForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchBtn.html('searching..');
  searchBtn.attr('disabled', true);
  
  let address = myForm.elements.namedItem('address').value;
  let lat = myForm.elements.namedItem('lat').value;
  let lng = myForm.elements.namedItem('lng').value;
  let technician = select.value;
  geocoder.geocode({'address': address}, function(results, status){
    if (status == google.maps.GeocoderStatus.OK) {
      address = results[0].formatted_address;
      $('#address').val(address);
      $('#address').attr('disabled', true);
      lat = results[0].geometry.location.lat();
      lng = results[0].geometry.location.lng();
      let tech = technician.toLowerCase();
      
      

        $.ajax({
          type: "GET",
          url: "/"+ tech + "s" + "?lat=" + lat + "&lng=" + lng,
          success: function(technicians) {
            if (technicians.length > 0) {
            getTec(technicians);
            $('#clear-btn').show();
          } else {
            let list = document.getElementById('list');
            let li = document.createElement('li');
            list.appendChild(li);
            let span = document.createElement('span');
            span.innerHTML = `Sorry, No ${technician}s are available around your location :(`;
            li.appendChild(span);
            searchBtn.hide();
            $('#clear-btn').show();
          }
        },
        error: function () {
          alert('Error processing request');
        }
        });
        } else {
          alert('Error Parsing Address! Make sure to enter a valid address.');
          searchBtn.html('Search');
          $('#address').removeAttr('disabled');
          $('#address').val('');
          searchBtn.removeAttr('disabled');
        }
        });

      });

  select.onchange = () => {
    let list = document.querySelector('#list');
    while(list.firstChild) {
      list.removeChild(list.firstChild)
    }
    searchBtn.html('Search');
    searchBtn.removeAttr('disabled');
    searchBtn.show();
    $('#address').removeAttr('disabled');
    $('#clear-btn').hide();
  }

  $('#clear-btn').on('click', ()=>{
    let list = document.querySelector('#list');
    while(list.firstChild) {
      list.removeChild(list.firstChild)
    }
    searchBtn.html('Search');
    searchBtn.removeAttr('disabled');
    searchBtn.show();
    $('#address').removeAttr('disabled');
    $('#address').val('');
    $('#clear-btn').hide();
  })

});
