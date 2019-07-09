$(document).ready(function() {


var myForm = document.getElementById('search');

myForm.addEventListener('submit', (e) => {
  e.preventDefault();
var lat = myForm.elements.namedItem('lat').value;
var lng = myForm.elements.namedItem('lng').value;

  $.ajax({
    type: "GET",
    url: "/plumbers?lat=" + lat + "&lng=" + lng,
    success: function(plumbers) {
      if (plumbers.length > 0) {
      for(var i=0;i<plumbers.length;i++){
        if(plumbers[i].available){
          let list = document.getElementById('list');
          let li = document.createElement('li');
          list.appendChild(li);
          let span1 = document.createElement('span')
          let span2 = document.createElement('span')
          let span3 = document.createElement('span')
          span1.innerHTML = plumbers[i].name;
          span2.innerHTML = "+234 " + plumbers[i].number;
          span3.innerHTML = Math.floor(plumbers[i].dist.calculated/1000) + " km away";
          li.appendChild(span1);
          li.appendChild(span2);
          li.appendChild(span3);
        }
      }
    } else {
      let list = document.getElementById('list');
      let li = document.createElement('li');
      list.appendChild(li);
      let span = document.createElement('span');
      span.innerHTML = "Sorry :( No plumbers available around your location";
      li.appendChild(span);
    }
    }
  });
});
});
