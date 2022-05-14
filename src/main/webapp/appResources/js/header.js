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