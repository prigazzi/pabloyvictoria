jQuery(document).ready(function(){ 
	tfuse_reservations_form();
});

function tfuse_reservations_form(){ 
	var my_error;
	jQuery("#send").bind("click", function(){

		my_error = false;
		jQuery("#reservationForm input, #reservationForm textarea, #reservationForm radio, #reservationForm select").each(function(i)
		{
			var surrounding_element = jQuery(this);
			var value               = jQuery(this).attr("value");
			var check_for 			= jQuery(this).attr("id");
			var required 			= jQuery(this).hasClass("required");

			if(check_for == "email"){
				surrounding_element.removeClass("error valid");
				baseclases = surrounding_element.attr("class");
				if(!value.match(/^\w[\w|\.|\-]+@\w[\w|\.|\-]+\.[a-zA-Z]{2,4}$/)){
					surrounding_element.attr("class",baseclases).addClass("error");
					my_error = true;
				}else{
					surrounding_element.attr("class",baseclases).addClass("valid");
				}
			}

			if(required && check_for != "email"){
				surrounding_element.removeClass("error valid");
				baseclases = surrounding_element.attr("class");
				if(value == ""){
					surrounding_element.attr("class",baseclases).addClass("error");
					my_error = true;
				}else{
					surrounding_element.attr("class",baseclases).addClass("valid");
				}
			}

		   if(jQuery("#reservationForm input, #reservationForm textarea, #reservationForm radio, #reservationForm select").length  == i+1){
				if(my_error == false){
					jQuery("#reservationForm").slideUp(400);
					jQuery(".ajax_form #send").fadeOut(100);

					jQuery.ajax({
					   type: "POST",
					   url: "./rsvp.php",
					   data: jQuery('#reservationForm').serialize(),
					   success: function(response) {
					   jQuery("#reservationForm").before("<div class='ajaxresponse' style='display: none;'></div>");
					   jQuery(".ajaxresponse").html("<strong>"+response+"</strong>").slideDown(400);
					   jQuery("#reservationForm #send").fadeIn(400);
					   jQuery("#reservationForm input, #reservationForm textarea, #reservationForm radio, #reservationForm select").val("");
						   }
						});
					}
			}

		});
		return false;
	});
}
