function Download() {
    document.getElementById('resume').src = "../img/back.jpg";
};

function sendEmail() {
      Email.send({
        Host: "smtp.gmail.com",
        Username: "sender@email_address.com",
        Password: "Enter your password",
        To: 'receiver@email_address.com',
        From: "sender@email_address.com",
        Subject: "Sending Email using javascript",
        Body: "Well that was easy!!",
      })
        .then(function (message) {
          alert("mail sent successfully")
        });
    }
    
    
function check(e){
    	var v=document.getElementById(e);
    	var regex=/[`^<>~*]/gi;
    	if (v.value.search(regex)>-1){
    		v.value=v.value.replace(regex,"");
    		document.getElementById(e+"ErrorMsg").style.visibility="visible";
    	}
    	else{
			document.getElementById(e+"ErrorMsg").style.visibility="hidden";
			}
    }