(function($) {

    "use strict";
	
    $(document).ready(function() {
		
		// PRELOADER
        $("body").toggleClass("loaded");
        setTimeout(function() {
            $("body").addClass("loaded");
        }, 3000);
		
		// PORTFOLIO DIRECTION AWARE HOVER EFFECT
		var item = $("#bl-work-items>div");
		var elementsLength = item.length;
		for (var i = 0; i < elementsLength; i++) {
			$(item[i]).hoverdir();
		}
		
		// TEXT ROTATOR
		$("#selector").animatedHeadline({
             animationType: "clip"
        });
		
		// BOX LAYOUT
        Boxlayout.init();
		
		// REMOVE # FROM URL
		$("a[href='#']").on("click", (function(e) {
			e.preventDefault();
		}));

        // AJAX CONTACT FORM
     

         jQuery('#submit-form').on('submit',function (e){
            $(".name-error").text(""); 
            $(".msg-error").text(""); 
            if(validateName() && validateMsg()){
            $(".error-message").show().removeClass("success")
             $(".error-message").show()
             $(".error-message").text("Sending your details, Please wait...");
             e.preventDefault();
             jQuery.ajax({
              
                 url:"https://script.google.com/macros/s/AKfycbwmuWZAGNRKY2y7un-ifcg5m3BZHEMpI9zyPFAwIW51Nm3vqdBcH1X13xp5w6Gz6l3t/exec",
                 type:'post',
                 data: jQuery('#submit-form').serialize(),
                 success:function(result){
                     console.log(result);
                     $(".submit-form").find(".sent-message").addClass("success");
                     $(".error-message").show()
                     $(".error-message").text("Message Sent!");
                     $("#submit-form").trigger("reset");
                     setTimeout(function(){
                        $(".error_message").hide()
                      }, 3000);
                 }
             });
            }
            else{

                if(!validateName()){
                    $(".name-error").text("Please enter valid name");
                    $(".name").focus()
                    e.preventDefault();
                }
                if(!validateMsg())
                {
                    $(".msg-error").text("Please remove white space at begning");
                    e.preventDefault();
                }
            }
         });

		// MATERIAL CAROUSEL
        $(".carousel.carousel-slider").carousel({
            fullWidth: true,
            indicators: true,
        });
		
		// RESUME CARDS ANIMATION
		if ($(window).width() > 800) {
			$(".resume-list-item, .resume-card").on("click", function() {
				$(".resume-list-item").removeClass("is-active");
				var e = parseInt($(this).data("index"),10);
				$("#resume-list-item-" + e).addClass("is-active");
				var t = e + 1,
					n = e - 1,
					i = e - 2;
				$(".resume-card").removeClass("front back up-front up-up-front back-back"), $(".resume-card-" + e).addClass("front"), $(".resume-card-" + t).addClass("back"), $(".resume-card-" + n).addClass("back-back"), $(".resume-card-" + i).addClass("back")
			});
		}
		
    });

})(jQuery);

function validateName() {
    
    let x = document.forms["submit-form"]["name"].value;
    if (x[0] == " ") {
        return false;
    }
    else{
        return true;
    }
    
}

function validateMsg() {
    
    let x = document.forms["submit-form"]["message"].value;
    if (x[0] == " ") {
        return false;
    }
    else{
        return true;
    }
    
}