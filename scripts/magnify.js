let zoom;

let maxZoom = 5, minZoom = 1.25;

function magnify(imgID, init_zoom) {
	var img, glass, w, h, bw = 3;
	
	zoom = init_zoom;
	
	img = document.getElementById(imgID);
  
	/* Create magnifier glass: */
	glass = document.createElement("DIV");
	glass.setAttribute("class", "img-magnifier-glass");
  
	/* Insert magnifier glass: */
	img.parentElement.insertBefore(glass, img);
  
	/* Set background properties for the magnifier glass: */
	glass.style.backgroundImage = "url('" + img.src + "')";
	glass.style.backgroundRepeat = "no-repeat";
	w = glass.offsetWidth / 2;
	h = glass.offsetHeight / 2;
  
	/* Execute a function when someone moves the magnifier glass over the image: */
	img.addEventListener("mousemove", moveMagnifier);
	glass.addEventListener("mousemove", moveMagnifier);
  
	/*and also for touch screens:*/
	img.addEventListener("touchmove", moveMagnifier);
	glass.addEventListener("touchmove", moveMagnifier);

	img.addEventListener("wheel", zoomMagnifier);
	glass.addEventListener("wheel", zoomMagnifier);
	
	function moveMagnifier(e) {
		var pos, x, y;
		/* Prevent any other actions that may occur when moving over the image */
		e.preventDefault();

		/* Get the cursor's x and y positions: */
		pos = getRelativeCursorPos(e);
		x = pos.x;
		y = pos.y;

		/* Prevent the magnifier glass from being positioned outside the image: */
		if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
		if (x < w / zoom) {x = w / zoom;}
		if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
		if (y < h / zoom) {y = h / zoom;}

		/* Set the position of the magnifier glass: */
		glass.style.left = (x - w + img.offsetLeft) + "px";
		glass.style.top = (y - h + img.offsetTop) + "px";

		/* Display what the magnifier glass "sees": */
		glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
	}
  
	function getRelativeCursorPos(e) {
		var a, x = 0, y = 0;
		e = e || window.event;

		/* Get the x and y positions of the image: */
		a = img.getBoundingClientRect();

		/* Calculate the cursor's x and y coordinates, relative to the image: */
		x = e.pageX - a.left;
		y = e.pageY - a.top;

		/* Consider any page scrolling: */
		x = x - window.pageXOffset;
		y = y - window.pageYOffset;
		return {x : x, y : y};
	}

	function zoomMagnifier(e) {
		e.preventDefault();

		zoom -= e.deltaY / 500.0;
		if (zoom < minZoom)
			zoom = minZoom;
		if (zoom > maxZoom)
			zoom = maxZoom;
		glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";

		moveMagnifier(e);
	}
}
