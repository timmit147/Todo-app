var list = {
"new item 1" : "1",
"new item 2" : "2",
"new item 3" : "3",

};

var container = document.querySelector('#container');





// add item to list and refrech page
container.addEventListener('dblclick', function (e) {
	const itemsList = Object.keys(list).length;
	list["new item " + itemsList] = itemsList;
	reloadList();
});

// reload container list items
function reloadList(){
	container.innerHTML = '';

	for (const item in list) {
	    let p = document.createElement("p");
	    p.setAttribute("id", item);
		p.innerHTML = item;
		container.appendChild(p);

		const id = document.getElementById(item);

		var startx;
		var starty;
		id.addEventListener('touchstart', function(e){
			const touchobj = e.changedTouches[0];
			startx = parseInt(touchobj.clientX);
			starty = parseInt(touchobj.clientY);
			
		});


		// Move item around
		id.addEventListener('touchmove', function(e){
			const touchobj = e.changedTouches[0];
			movex = parseInt(touchobj.clientX); 
			movey = parseInt(touchobj.clientY); 
		  	id.style.left = (movex - startx + 20 ) + "px";
			id.style.top = (movey - 20) + "px";
			id.style.position = "fixed";
			if(document.getElementById(Object.keys(list)[Object.keys(list).indexOf(item)+1])){
			document.getElementById(Object.keys(list)[Object.keys(list).indexOf(item)+1]).style.paddingTop = this.clientHeight + "px";
			}

			if(movex > window.innerWidth - 50){
				id.style.opacity = "0.5";
				container.style.boxShadow = "inset  -75px 9px 26px -62px white";
			}
			else{
				id.style.opacity = "1";
				container.style.boxShadow = "unset";
			}

			if(movey > starty + this.clientHeight){
				document.getElementById(Object.keys(list)[Object.keys(list).indexOf(item)+1]).style.paddingTop = "0px";
				document.getElementById(Object.keys(list)[Object.keys(list).indexOf(item)+2]).style.paddingTop = this.clientHeight + "px";

			}
			else{
				document.getElementById(Object.keys(list)[Object.keys(list).indexOf(item)+1]).style.paddingTop = this.clientHeight + "px";
				document.getElementById(Object.keys(list)[Object.keys(list).indexOf(item)+2]).style.paddingTop = "0px";


			}

			// if(movey < starty + this.clientHeight){
			// 	document.getElementById(Object.keys(list)[Object.keys(list).indexOf(item)+1]).style.paddingTop = "0px";
			// 	document.getElementById(Object.keys(list)[Object.keys(list).indexOf(item)-1]).style.paddingBottom = this.clientHeight + "px";
			// }
			// else{
			// 	document.getElementById(Object.keys(list)[Object.keys(list).indexOf(item)+1]).style.paddingTop = this.clientHeight + "px";
			// 	document.getElementById(Object.keys(list)[Object.keys(list).indexOf(item)-1]).style.paddingBottom = "0px";
			// }
		});

		id.addEventListener('touchend', function(e){

			id.style.left = "unset";
			id.style.top = "unset";
			id.style.position = "relative";
			if(document.getElementById(Object.keys(list)[Object.keys(list).indexOf(item)+1])){
				document.getElementById(Object.keys(list)[Object.keys(list).indexOf(item)+1]).style.paddingTop = "0px";
				document.getElementById(Object.keys(list)[Object.keys(list).indexOf(item)+2]).style.paddingTop = "0px";
				// document.getElementById(Object.keys(list)[Object.keys(list).indexOf(item)-1]).style.paddingBottom = "0px";
			}

			if(movex > window.innerWidth - 50){
				delete list[this.id];
				container.style.boxShadow = "unset";
				reloadList();
			}
		});
	}
}



// if page loads show items in list
reloadList();