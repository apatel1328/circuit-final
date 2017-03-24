  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAic9Bb1Z6G8GVURs7LuCZxkFiRH-62CVg",
    authDomain: "reservation-site-ce3ff.firebaseapp.com",
    databaseURL: "https://reservation-site-ce3ff.firebaseio.com",
    storageBucket: "reservation-site-ce3ff.appspot.com",
    messagingSenderId: "415572993774"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var reservationData = {};

	$('.reservation li').on('click', function(){
		reservationData.day = $(this).text();

	});

	$('.form-inline').on('submit', function(event){
		event.preventDefault();
		reservationData.name = $('.reservation-name').val();
		var reservationReference = database.ref('reservations');
		reservationReference.push(reservationData);
	});

	function getReservations(){
		database.ref('reservations').on('value', function(results){
			var pulledReservation = results.val();
			$('.reservations').empty();
			for( var reservation in pulledReservation){

				var source = $('#reservation-template').html();

				var template = Handlebars.compile(source);

				var context = {
					name : pulledReservation[reservation].name,
					day : pulledReservation[reservation].day
				};

				var reservationListItem = template(context);

				$('.reservation-list').append(reservationListItem);
			}
		});
	};

	getReservations();

	function initMap(){
		var map = new google.maps.Map(document.getElementById('map'), {
    	center: {lat: 40.8054491, lng: -73.9654415},
    	zoom: 10,
    	scrollwheel: false
  		});

  		var marker = new google.maps.Marker({
	    position: {lat: 40.8054491, lng: -73.9654415},
	    map: map,
	    title: 'Monks Café'
	 	 });
	};



