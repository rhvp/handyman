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
      // span3.innerHTML = Math.floor(technicians[i].dist.calculated) + " meters away";

      list.appendChild(li);

      li.appendChild(span1);
      li.appendChild(span2);
      li.appendChild(span3);
    }
  }
  searchBtn.hide();
}


myForm.addEventListener('submit', (e) => {
  e.preventDefault();
let lat = myForm.elements.namedItem('lat').value;
let lng = myForm.elements.namedItem('lng').value;
let technician = select.value;
let tech = technician.toLowerCase();

  $.ajax({
    type: "GET",
    url: "/"+ tech + "s",
    success: function(technicians) {
      if (technicians.length > 0) {
      getTec(technicians);
    } else {
      let list = document.getElementById('list');
      let li = document.createElement('li');
      list.appendChild(li);
      let span = document.createElement('span');
      span.innerHTML = `Sorry :( No ${technician}s available around your location`;
      li.appendChild(span);
    }
  },
  error: function () {
    alert('Error processing request');
  }
  });
 

});

select.onchange = () => {
  let list = document.querySelector('#list');
  while(list.firstChild) {
    list.removeChild(list.firstChild)
  }
  searchBtn.show()
}

});
