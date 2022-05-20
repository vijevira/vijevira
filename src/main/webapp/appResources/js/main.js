function open() {
  document.getElementById("mySidebar").style.display = "block";
}

function close() {
  document.getElementById("mySidebar").style.display = "none";
}
var temp=0;
function openClose(){
	temp=temp+1;
	if (temp%2!=0){
		open();
	}
	else{
		close();
	}
}

function logout(){
	location.href="./login.html"
}


class myHeader extends HTMLElement{
	connectedCallback(){
		this.innerHTML=`
			<head>
				<link rel="stylesheet" href="./appResources/css/header.css">
			</head>
			<body>
				<header class="header">
				<div class="menu" style="float:left;">
			  <button class="button teal xlarge" onclick="openClose()">
			  	<div class="horizontalLine"></div>
  				<div class="horizontalLine"></div>
  				<div class="horizontalLine"></div>
			  </button>
			</div>
					<a href="./index.html"><div class="logo">
					</div></a>
					<a href="./details.html"><div class="imageIcon"></div></a>
					<div class="logout" onclick="logout()"></div>
				</header>
				<div id="mySidebar" style="display:none;width:168px;height:318px; margin:0 0 -318px 0;">
					  <div class="sidebar  border-right xlarge">
					  <a href="./details.html" class="bar-item button">About Me</a>
					  <a href="./404.html" class="bar-item button">Investment</a>
					  <a href="./personalPhoto.html" class="bar-item button">Photos</a>
				</div>
				
			</body>

		`
	}
};
customElements.define('my-header',myHeader);

class myFooter extends HTMLElement{
	connectedCallback(){
		this.innerHTML=`
			<head>
				<link rel="stylesheet" href="./appResources/css/footer.css">
			</head>
			<body>
				<footer class="footer" >
					<span class="copyright">Copyright &copy; vijevira</span>
					<span class="verticleLine"></span>
					<span class="contactMe"><a href="mailto:vijevira@engineer.com" style="color:white;text-decoration:dotted;">Contact Me</a></span>
					<span class="links">
					<a href="https://www.facebook.com/vijevirat" target="_blank"><div class="facebook" ></div></a>
					<a href="https://www.instagram.com/vijevira" target="_blank"><div class="instagram" ></div></a>
					<a href="https://www.wa.me/message/UN3ZFEOSSQDVP1" target="_blank"><div class="whatsapp"></div></a>
					<a href="https://www.linkedin.com/in/vijevira" target="_blank"><div class="linkedin"></div></a>
					<a href="https://www.twitter.com/vijevirat" target="_blank"><div class="twitter"></div></a>
					<!-- <a href="https://www.facebook.com" target="_blank"><div class="youtube"></div></a> -->
					</span>
				</footer>
				
			</body>
		`
	}
};
customElements.define('my-footer',myFooter);