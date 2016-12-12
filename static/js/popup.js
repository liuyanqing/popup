(function (window) {
var makeArray = function(obj){
    var res = [];
    for(var i = 0,len = obj.length; i < len; i++ ){
    	res.push(obj[i]);
    }
    return res;
};
var clearHideClass = function(classObj){
	var classObjNew = [];
	for ( var n = 0,len = classObj.length; n < len; n++) {
		if( classObj[n] != "hide"){
			classObjNew.push(classObj[n]);
		}
	}
	return classObjNew.join(" ");
};

var popup = function() {

	document.onclick = function(e) {
		var e = e ? e : window.event,
    	tar = e.srcElement || e.target,
    	classNa = tar.className.split(" "),
    	obj = tar.getAttribute("data-target"),
    	popupList = document.getElementsByClassName("popup"),
    	popupSideList = document.getElementsByClassName("popupSide"),
    	list = [];
    	list = list.concat(makeArray(popupList), makeArray(popupSideList));
    	for( var i in classNa) {
			if(classNa[i] == "popup-dismissed") {
				for( var j = 0,len = list.length; j < len; j++ ) {
					if(list[j].getAttribute("data-popup") == obj) {
						list[j].className += " hide";
						return;
					}
				}
				return;
			};
			if(classNa[i] == "popup-open") {
				for( var k = 0,len = list.length; k < len; k++ ) {
					if(list[k].getAttribute("data-popup") == obj) {
						var classObj = list[k].className.split(" ");
						list[k].className = clearHideClass( classObj );
						return;
					}
				}
				return;
			}
    	}

	}
};
window.popup = popup;

})(window);
