/* model starts here*/
var locations =[{
    title: 'Lotus Temple',
    location: {
      lat: 28.5535,
      lng: 77.2588
    },
    show: true,
    selected: false,
    id: '4ba48dc3f964a520e2a338e3'
  },
  {
    title: 'Red Fort',
    location: {
      lat: 28.6562,
      lng: 77.2410
    },
    show: true,
    selected: false,
    id:'bf214b83506ef3b1d7abd22'
    },
  {
    title: 'India Gate',
    location: {
      lat: 28.6129,
      lng: 77.2295
    },
    show: true,
    selected: false,
    id: '4b5eeab3f964a520ca9d29e3'
    },
  {
    title: 'Qutub Minar',
    location: {
      lat: 28.5244,
      lng: 77.1855
    },
    show: true,
    selected: false,
    id:'4ba47c9bf964a520fe9f38e3'
    },
  {
    title: 'Jama Masjid',
    location: {
      lat: 28.6507,
      lng: 77.2334
    },
    show: true,
    selected: false,
    id:'4ba47c9bf964a520fe9f38e3'
  },
  {
    title: 'Connaught Place',
    location: {
      lat: 28.6315,
      lng: 77.2167
    },
    show: true,
    selected: false,
    id:'4b489b54f964a520595026e3'
  }
];
var markers = [];
var viewModel = function() {
  var self = this;;
  var largeinfowindow = new google.maps.InfoWindow();
  for(var i = 0; i<locations.length;i++) {
    var position = locations[i].location;
    var title = locations[i].title;
    var defaultIcon = makeMarkerIcon('0091ff');
    var highlightedIcon = makeMarkerIcon('FFFF24');
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      show: ko.observable(locations[i].show),
      selected: ko.observable(locations[i].selected),
      venue: locations[i].id
    });
    markers.push(marker);
    /*marker.addListener('click',function(){
      populateInfoWindow(this, largeinfowindow);
    });*/
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
      bounceIcon(this);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });
  }
  function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21, 34));
  return markerImage;
  }
  function populateInfoWindow(marker, infowindow) {
      // Check to make sure the infowindow is not already opened on this marker.
          infowindow.marker = marker;
          infowindow.setContent('<div>' + '<h3>' + marker.title + '</h3>' + "<h4>Ratings:" + marker.rating + '</h4> </div><div><img src="' + marker.image + '"></div>');
            if(marker.rating!=null || marker.image!=null)
            {
            infowindow.open(map, marker);
            }
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
              infowindow.marker = null;
          });
      }
  function bounceIcon(marker)
  {
    marker.setAnimation(google.maps.Animation.BOUNCE);
   setTimeout(function(){ marker.setAnimation(null); }, 750);
   populateInfoWindow(marker, largeinfowindow)

  }
  this.Bounce = function(marker) {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      marker.setIcon(highlightedIcon);
      setTimeout(function() {
          marker.setAnimation(null);
          marker.setIcon(defaultIcon);
      }, 700);
      populateInfoWindow(marker,largeinfowindow)
  };
}
