var myForm = document.getElementById('search');

myForm.addEventListener('submit', function(e){
  e.preventDefault();
var lat = myForm.elements.namedItem('lat').value;
var lng = myForm.elements.namedItem('lng').value;

$.ajax({
  type: "GET",
  url: "/plumbers?lat=" + lat + "&lng=" + lng,
  success: function(plumbers) {
    for(var i=0;i<plumbers.length;i++){
      if(plumbers[i].available){
        var list = document.getElementById('list');
        li = document.createElement('li');
        list.appendChild(li);
        span1 = document.createElement('span')
        span2 = document.createElement('span')
        span3 = document.createElement('span')
        span1.innerHTML = plumbers[i].name;
        span2.innerHTML = plumbers[i].number;
        span3.innerHTML = Math.floor(plumbers[i].dist.calculated/1000) + " km away";
        li.appendChild(span1);
        li.appendChild(span2);
        li.appendChild(span3);
      }
    }
  }
});
});
