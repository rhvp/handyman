$(document).ready(function() {


const myForm = document.querySelector('#search');
const select = document.querySelector('#select-technician');
let searchBtn = $('#search-btn');
const getTec = (technicians) => {
  for (let i=0; i<technicians.length; i++) {
    if (technicians[i].available) {
      let list = document.querySelector('#list');
      let li = document.createElement('li');

      let span1 = document.createElement('span')
      let span2 = document.createElement('span')
      let span3 = document.createElement('span')

      span1.innerHTML = technicians[i].first_name;
      span2.innerHTML = "+234 " + technicians[i].phone;
      span3.innerHTML = Math.floor(technicians[i].dist.calculated) + " meters away";

      list.appendChild(li);

      li.appendChild(span1);
      li.appendChild(span2);
      li.appendChild(span3);
    }
  }
  searchBtn.hide();
}

const geocoder = new google.maps.Geocoder()

myForm.addEventListener('submit', (e) => {
  searchBtn.html('searching..');
  searchBtn.attr('disabled', true);
  e.preventDefault();
  let address = myForm.elements.namedItem('address').value;
  let lat = myForm.elements.namedItem('lat').value;
  let lng = myForm.elements.namedItem('lng').value;
  let technician = select.value;
  geocoder.geocode({'address': address}, function(results, status){
    if (status == google.maps.GeocoderStatus.OK) {
      address = results[0].formatted_address;
      console.log(address);
      $('#address').val(address);
      $('#address').attr('disabled', true)
      lat = results[0].geometry.location.lat()
      lng = results[0].geometry.location.lng()
      let tech = technician.toLowerCase();
      
      

        $.ajax({
          type: "GET",
          url: "/"+ tech + "s" + "?lat=" + lat + "&lng=" + lng,
          success: function(technicians) {
            if (technicians.length > 0) {
            getTec(technicians);
          } else {
            let list = document.getElementById('list');
            let li = document.createElement('li');
            list.appendChild(li);
            let span = document.createElement('span');
            span.innerHTML = `Sorry No ${technician}s available around your location :(`;
            li.appendChild(span);
            searchBtn.hide();
          }
        },
        error: function () {
          alert('Error processing request');
        }
        });
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
    searchBtn.show()
    $('#address').removeAttr('disabled');
  }
      

});