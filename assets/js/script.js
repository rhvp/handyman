$(document).ready(function() {


const myForm = document.querySelector('#search');
const select = document.querySelector('#select-technician');

const getTec = (technicians) => {
  for (let i=0; i<technicians.length; i++) {
    if (technicians[i].available) {
      let list = document.querySelector('#list');
      let li = document.createElement('li');

      let span1 = document.createElement('span')
      let span2 = document.createElement('span')
      let span3 = document.createElement('span')

      span1.innerHTML = technicians[i].name;
      span2.innerHTML = "+234 " + technicians[i].number;
      span3.innerHTML = Math.floor(technicians[i].dist.calculated) + " meters away";

      list.appendChild(li);

      li.appendChild(span1);
      li.appendChild(span2);
      li.appendChild(span3);
    }
  }
}


myForm.addEventListener('submit', (e) => {
  e.preventDefault();
let lat = myForm.elements.namedItem('lat').value;
let lng = myForm.elements.namedItem('lng').value;
let technician = select.value;

if (technician === 'Plumber') {
  $.ajax({
    type: "GET",
    url: "/plumbers?lat=" + lat + "&lng=" + lng,
    success: function(plumbers) {
      if (plumbers.length > 0) {
      getTec(plumbers);
    } else {
      let list = document.getElementById('list');
      let li = document.createElement('li');
      list.appendChild(li);
      let span = document.createElement('span');
      span.innerHTML = `Sorry :( No ${technician}s available around your location`;
      li.appendChild(span);
    }
    }
  });
} else  if (technician === 'Carpenter'){
  $.ajax({
    type: "GET",
    url: "/carpenters?lat=" + lat + "&lng=" + lng,
    success: function(carpenters) {
      if (carpenters.length > 0) {
      getTec(carpenters);
    } else {
      let list = document.getElementById('list');
      let li = document.createElement('li');
      list.appendChild(li);
      let span = document.createElement('span');
      span.innerHTML = `Sorry :( No ${technician}s available around your location`;
      li.appendChild(span);
    }
    }
  });
}



  // $.ajax({
  //   type: "GET",
  //   url: "/plumbers?lat=" + lat + "&lng=" + lng,
  //   success: function(plumbers) {
  //     if (plumbers.length > 0) {
  //     getTec(plumbers);
  //   } else {
  //     console.log("Something is wrong")
  //     let list = document.getElementById('list');
  //     let li = document.createElement('li');
  //     list.appendChild(li);
  //     let span = document.createElement('span');
  //     span.innerHTML = `Sorry :( No E available around your location`;
  //     li.appendChild(span);
  //   }
  //   }
  // });



});

select.onchange = () => {
  let list = document.querySelector('#list');
  while(list.firstChild) {
    list.removeChild(list.firstChild)
  }
}

});
