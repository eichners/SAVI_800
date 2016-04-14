

$(document).ready(function () {
  // Use jQuery to call the SQL API
  var url = 'https://eichnersara.cartodb.com/api/v2/sql?' + $.param({
    q: 'SELECT DISTINCT neighbourhood FROM listings LIMIT 10'
	//format: 'GeoJSON'
  });
  $.getJSON(url)
    
    // When it's done it will pass the parsed response in data
    .done(function (data) {
	 
	  
    console.log(data);
      // For each row in the response...
      $.each(data.rows, function () {
        // ... select the results list and append a 
		//new item for this host
        // $('<li></li>') probably looks weird. 
		//It creates a new <li> element.
        $('.hoods').append($('<option></option>').text(this.neighbourhood));
      });
    })
   
    // This function is called if the API call fails
    .fail(function (resp) {
      $('body').append(
        $('<div></div>')
          .text(resp.responseJSON.error[0])
          .addClass('error')
		  );
    });
});