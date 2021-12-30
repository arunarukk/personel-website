/**
* PHP Email Form Validation - v3.2
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!')
        return;
      }
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData( thisForm );

      if ( recaptcha ) {
        if(typeof grecaptcha !== "undefined" ) {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
              .then(token => {
                formData.set('recaptcha-response', token);
                php_email_form_submit(thisForm, action, formData);
              })
            } catch(error) {
              displayError(thisForm, error)
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then(response => {
      if( response.ok ) {
        return response.text()
      } else {
        throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
      }
    })
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      if (data.trim() == 'OK') {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset(); 
      } else {
        throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
      }
    })
    .catch((error) => {
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();




var pname = document.getElementById('name')
var pmail = document.getElementById('email')
var Lmesage = document.getElementById('Message')
var pmobile = document.getElementById('subject')
var errbox = document.getElementsByClassName('errormsg')
var submit = document.getElementById('submit-form')
var charecters = /^[a-zA-Z]+$/
var mailcode =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var phonenumber = /^((\+[1-9]{1,4}[ \-])|(\([0-9]{2,3}\)[ \-])|([0-9]{2,4})[ \-])?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
var def=0

$("#submit-form").submit((e)=>{

    def=0;
     e.preventDefault()
     validation()
     emailpart()
     mobilepart()
     messagepart()
     if(def==4){


     $.ajax({
         url:"https://script.google.com/macros/s/AKfycbwV3CZni70BnOezJ4c7htuXiuLPUMijejJZ55awpGV5iZdwr1WffJmr3MCnL3o1gNxS9A/exec",
         data:$("#submit-form").serialize(),
         method:"post",
         success:function (response){
             alert("Form submitted successfully")
             window.location.reload()
             //window.location.href="https://google.com"
         },
         error:function (err){
             alert("Something Error")

         }
     })
   }
 })



        // Namepart validation

function validation(){
    if(pname.value =="" ){
        errbox[0].innerHTML="Please Enter your Name"
    }else if(pname.value.trim()==" "){
        errbox[0].innerHTML="Please do not enter spaces"
    }else if(charecters.test(pname.value)==false){
        
        errbox[0].innerHTML="Please Enter charecters only"
    }else{
        errbox[0].innerHTML=""
        def=def+1;
    }
        
    
    

}

         // emailpart validation

function emailpart(){
    if(mailcode.test(pmail.value)==false){
        errbox[1].innerHTML="Please Enter a valid email id"
    }else{
        errbox[1].innerHTML=""
        def=def+1;
    }

}

         // mobile number part



function mobilepart(){
    var m=pmobile.value
    if(m.length<10 || m.length>10){
        errbox[2].innerHTML="Please Enter 10 digit mobile number"
    }else{
        errbox[2].innerHTML=""
        def=def+1;
    }
}


        // message part  
    
function messagepart(){
    var k=Lmesage.value
    if(k.length<10){
        errbox[3].innerHTML="Please enter atleast 10 words"
    }else{
        errbox[3].innerHTML=""
        def=def+1;
    }
}

// function printError(id, Msg) {
//   document.getElementById(id).innerHTML = Msg;
// }

// function validateForm(){
// var name = document.Form.name.value;
// var email = document.Form.name.value;
// var phone = document.Form.name.value;

// var nameErr = emailErr = mobileErr = true;
// if(name == "") {
//   printError("nameErr", "Please enter your name");
//   var elem = document.getElementById("name");
//       elem.classList.add("input-2");
//       elem.classList.remove("input-1");
// } else {
//   var regex = /^[a-zA-Z\s]+$/;                
//   if(regex.test(name) === false) {
//       printError("nameErr", "Please enter a valid name");
//       var elem = document.getElementById("name");
//       elem.classList.add("input-2");
//       elem.classList.remove("input-1");
//   } else {
//       printError("nameErr", "");
//       nameErr = false;
//       var elem = document.getElementById("name");
//       elem.classList.add("input-1");
//       elem.classList.remove("input-2");

      
//   }
// }


// if(email == "") {
//   printError("emailErr", "Please enter your email address");
//    var elem = document.getElementById("email");
//       elem.classList.add("input-2");
//       elem.classList.remove("input-1");
// } else {
  
//   var regex = /^\S+@\S+\.\S+$/;
//   if(regex.test(email) === false) {
//       printError("emailErr", "Please enter a valid email address");
//       var elem = document.getElementById("email");
//       elem.classList.add("input-2");
//       elem.classList.remove("input-1");
//   } else{
//       printError("emailErr", "");
//       emailErr = false;
//        var elem = document.getElementById("email");
//       elem.classList.add("input-1");
//       elem.classList.remove("input-2");

//   }
// }


// if(phone == "") {
//   printError("mobileErr", "Please enter your mobile number");
//   var elem = document.getElementById("phone");
//       elem.classList.add("input-2");
//       elem.classList.remove("input-1");
// } else {
//   var regex = /^[1-9]\d{10}$/;
//   if(regex.test(phone) === false) {
//       printError("mobileErr", "Please enter a valid 10 digit mobile number");
//       var elem = document.getElementById("phone");
//       elem.classList.add("input-2");
//       elem.classList.remove("input-1");
//   } else{
//       printError("mobileErr", "");
//       mobileErr = false;
//       var elem = document.getElementById("phone");
//       elem.classList.add("input-1");
//       elem.classList.remove("input-2");
//   }
// }
// }
// const nname = document.getElementById('name')
// const email = document.getElementById('email')
// const form = document.getElementById('form')

// var nameErr = emailErr = mobileErr = true;

// form.addEventListener('submit', (e)=> {
  
//   var regex = /^[a-zA-Z\s]+$/;
//   if(nname.value == "") {
//     messages.push('Name is required')
//     printError("nameErr", "Name is required");
//   }
//   if(regex.test(email) === false){
//     printError("nameErr", "Please enter a valid name");
//   }
//   e.preventDefault()
// })



// function validate() {
//   var name = document.forms["myform"]["name"].value;
//   if(name==""){
//   //alert("Please enter the name");
// document.getElementById("nameErr").innerHTML = "Please enter the name"
//   return false;
//   }
//   var email = document.forms["myform"]["email"].value;
//   if(email==""){
//   //alert("Please enter the email");
// document.getElementById("emailErr").innerHTML = "Please enter the email"
//   return false;
//   }else{
//   var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
//   var x=re.test(email);
//   if(x){
//   }else{
// document.getElementById("emailErr").innerHTML = "Email id not in correct format"
//   //alert("Email id not in correct format");
//   return false;
//   } 
//   } 
//   var mobile = document.forms["myform"]["phone"].value;
//   if(mobile==""){
//   //alert("Please enter the mobile");
// document.getElementById("mobileErr").innerHTML = "Please enter the mobile"
//   return false;
//   }else{
//   if(isNaN(mobile)){
//  // alert("Mobile number not valid");
// document.getElementById("mobileErr").innerHTML = "Mobile number not valid"
//   return false;
//   }
//   } 
//   var address = document.forms["myform"]["message"].value;
//   if(address==""){
//  //  alert("Please enter the address");
// document.getElementById("messErr").innerHTML = "Please enter the address"
//   return false;
//   }
//  }


