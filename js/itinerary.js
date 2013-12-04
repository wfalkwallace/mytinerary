	
function displayItin(itinToDisplay) {
	pqresult.get(itinToDisplay, {
		success: function(itinObject) {
			$("#introHome").hide();
			$("#introAbout").hide();
			var finalHTML = "<h2>My "+itinObject.get("name")+" Itinerary</h2>";
			var venues = itinObject.get("venues");
			var markerObject = new Array();
			if (venues != undefined) {
				venues.sort(function(a,b){return a.timeStart - b.timeStart});
				for (var i=0; i<venues.length; i++) {
					finalHTML = finalHTML+'<div class="panel panel-primary"><div class="panel-heading"><div class="row"><div class="col-md-6"><h3 class="panel-title">'+venues[i].name+'</h3></div><div class="col-md-6 text-right"><span class="event-btn glyphicon glyphicon-plus-sign"></span><span class="event-btn glyphicon glyphicon-minus-sign"></span><span class="event-btn glyphicon glyphicon-question-sign"></span></div></div></div><div class="panel-body"><span class="event-time pull-left">'+venues[i].timeStart+' - '+venues[i].timeEnd+'</span><br><p>'+venues[i].location.address+'</p><p>'+venues[i].description+'</p></div></div>';					
					var currentMarkerObject = { type: 'Feature', geometry: { type: 'Point', coordinates: [venues[i].location.lng, venues[i].location.lat]}, properties: { title: venues[i].name } };
					markerObject.push(currentMarkerObject);
				}
				$(".itin").html(finalHTML);
				var markerLayer = L.mapbox.markerLayer(markerObject).addTo(map);
				window.map.setView([markerObject[0].geometry.coordinates[1],markerObject[0].geometry.coordinates[0]], 11)
			} else {
				$(".itin").html(finalHTML);
			}
			$("#addNewButton").animate({opacity:1},500);
			$("#deleteItinButton").animate({opacity:1},500);
			$("#venuesMap").animate({height:"300px"},500);
			$(".itin .glyphicon").click(function() { venueEdit($(this).attr("class")); });
	    }
	});
}

$(function () {
	window.map = L.mapbox.map('venuesMap', 'nilkanthjp.gejogbbl');
});