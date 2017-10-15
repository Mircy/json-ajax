$(document).ready(function(){
	$('#countries').change(function(){
		$("#feedback").attr("class", "hide_feedback");//hide feedback div upon refresh or change to default
		var country = $(this).val();
		if(country == 'default'){
			$("#cities").attr("class", "hide_cities");//hide cities select upon refresh or change to default
		} else {
			$('#cities').load(country + '-cities.html');
			$("#cities").attr("class", "show_cities");//make cities select visible
		}
		$('#cities').change(function(){
			var city = $(this).val();
			//code initiate only if anything but default option is selected
			if(city != 'Select a City'){
				var key = 'b804f75ec5d60a27310e4c58d4c2c2f9';
				var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?id=' + 
						 city + 
						 '&APPID=' + 
						 key;
				$.ajax({
					url: apiUrl,
					type: 'GET',
					dataType: 'json',
					success: function(response){
						//function to format date
						function getDate(unixTime){
							var time = new Date(unixTime * 1000);
							var day1 = time.getDate().toString();
							if(day1.length < 2){
								var day = '0' + day1;
							}else {
								var day = day1;
							}
							var month1 = (time.getMonth() + 1).toString();
							if(month1.length < 2){
								var month = '0' + month1;
							}else {
								var month = month1;
							}
							var year = time.getFullYear();
							var date = day + '/' + month + '/' + year;
							return date;
						}
						//function to capitalize first letter on each word
						function capString(string){
							//code found on stackoverflow
							var string = string.toLowerCase().replace(/\b[a-z]/g, function(letter) {
								return letter.toUpperCase();
							});
							return string;		
						}
						//function to calculate wind direction
						function formatDirection(degree){
							var direction = '';
							if(degree >= 337.5 && degree <= 22.5){
								direction = 'Northerly';
							}else if(degree > 22.5 && degree < 67.5){
								direction = 'North Easterly';
							}else if(degree >= 67.5 && degree <= 112.5){
								direction = 'Easterly';
							}else if(degree > 112.5 && degree < 157.5){
								direction = 'South Easterly';
							}else if(degree >= 157.5 && degree <= 202.5){
								direction = 'Southerly';
							}else if(degree > 202.5 && degree < 247.5){
								direction = 'South Westerly';
							}else if(degree >= 247.5 && degree <= 292.5){
								direction = 'Westerly';
							}else {
								direction = 'North Westerly';
							}
							return direction;
						}
						$("#feedback").attr("class", "show_feedback");//make feedback div visible
						var name = response.name;
						var currentDate = getDate(response.dt);
						var conditions = capString(response.weather[0].description);
						var temperature = Math.round(response.main.temp - 273.15) + ' &deg;C';
						var windSpeed = Math.round(response.wind.speed * 3.6 * 0.621371) + ' mph';
						var windDirection = formatDirection(response.wind.deg);
						var weatherIcon =   '<img src="http://openweathermap.org/img/w/' + 
											response.weather[0].icon + 
											'.png" alt="icon" width="75" height="75">';
						$('#name').html(name);
						$('#date').html(currentDate);
						$('#cond').html(conditions);
						$('#temp').html(temperature);
						$('#speed').html(windSpeed);
						$('#dir').html(windDirection);
						$('#icon').html(weatherIcon);
					},
					error: function(jqXHR, textStatus, errorThrown){
						$('#error').html(textStatus + ': ' + errorThrown);
					}
				});
			}else {
				$("#feedback").attr("class", "hide_feedback");//hide feedback if cities select is changed to default
			}
		});
	});
});