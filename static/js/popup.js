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

var popup = function(funOpen, funClose) {

    document.onclick = function(e) {
        var e = e ? e : window.event,
            tar = e.srcElement || e.target,
            tarName = tar.tagName.toLowerCase(),
            classNa;
        if(tarName === 'svg') {
            tar = tar.parentNode;
        } else if(tarName === 'use') {
            tar = tar.parentNode.parentNode;
        }
        var obj = tar.getAttribute("data-target");
        if(!obj) return;
        e.stopPropagation();
        e.preventDefault();
        classNa = tar.className.split(" ");
        // tar.tagName.toLowerCase() !== "svg"?tar.className.split(" "):tar.className.animVal.split(" ");
        var popupList = document.getElementsByClassName("popup"),
            popupSideList = document.getElementsByClassName("popupSide"),
            list = [];
        list = list.concat(makeArray(popupList), makeArray(popupSideList));
        for( var i in classNa) {
            if(classNa[i] == "popup-open") {
                for( var k = 0,len = list.length; k < len; k++ ) {
                    if(list[k].getAttribute("data-popup") == obj) {
                        var classObj = list[k].className.split(" ");
                        list[k].className = clearHideClass( classObj );
                        if(typeof funOpen === 'function') {
                            funOpen(obj, list[k], tar);
                        }
                        return;
                    }
                }
                return;
            }
            if(classNa[i] == "popup-dismissed") {
                for( var j = 0,len = list.length; j < len; j++ ) {
                    if(list[j].getAttribute("data-popup") == obj) {
                        list[j].className += " hide";
                        if(typeof funClose === 'function') {
                            funClose(obj, list[j], tar);
                        }
                        return;
                    }
                }
                return;
            };
        }

    }
};

//2016年12月22日20:00:59临时加的下载文件
//var download = function(){
//	$(document).on('click','.download-way',function() {		
//  	window.location.href="/static/img/aaaa.txt";
//	});
//}
//window.download = download;

window.popup = popup;

})(window);
