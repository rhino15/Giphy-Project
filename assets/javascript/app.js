$(document).ready(function() {
	//======================================================================
	//Variables for app
	var gifArray = [];

	//======================================================================
	//functions for app
	function renderButtons() {
		//empty buttons or they will keep appending to the page
		$('#displayGifButtons').empty();

		for (var i = 0; i < gifArray.length; i++) {
			var gifButton = $('<button>');
			gifButton.addClass("gifs");
			gifButton.attr('data-name', gifArray[i]);
			gifButton.text(gifArray[i]);
			$('#displayGifButtons').append(gifButton);
		}
	}

	$('#addGif').on('click', function() {
		$('#gif-input').empty();
		var gif = $('#gif-input').val().trim();
		gifArray.push(gif);

		renderButtons();

		return false;
	});

	function displayGifs() {
		$('#displayGifs').empty();
		var showGifs = $(this).attr("data-name");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + showGifs + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			for (var i = 0; i < 10; i++) {
				var gifDiv = $('<div>');
				gifDiv.addClass("col-md-4 sportsGif");
				var displayRatings = $('<p class=buttonText>').text("Rating: " + response.data[i].rating);
				gifDiv.append(displayRatings);
				
				var gifImage = $('<img>');
				gifImage.attr('src', response.data[i].images.original_still.url);
				gifImage.attr('data-still', response.data[i].images.original_still.url);
				gifImage.attr('data-animate', response.data[i].images.original.url);
				gifImage.attr('data-state', "still");
				gifImage.addClass('actualGif');
				gifDiv.append(gifImage);

				$('#displayGifs').append(gifDiv);
			}
			startAndStopGifs();
		});

	}

	function displayRatings() {

	}

	function startAndStopGifs() {
		$('.actualGif').on('click', function() {
			var state = $(this).attr('data-state');

			if (state === "still") {
				$(this).attr('src', $(this).data('animate'));
				$(this).attr('data-state', 'animate');
			} else {
				$(this).attr('src', $(this).data('still'));
				$(this).attr('data-state', 'still');
			}
		});
	}

	$(document).on('click', '.gifs', displayGifs);

});




