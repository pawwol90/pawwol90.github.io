// Script from http://ftp.apixml.net/
// Copyright 2017 http://ftp.apixml.net/, DO NOT REMOVE THIS COPYRIGHT NOTICE
var Ftp = {
    createCORSRequest: function (method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            // Otherwise, CORS is not supported by the browser.
            xhr = null;
        }
        return xhr;
    },
    upload: function(token, files) {
        var file = files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load",
            function() {
                var base64 = this.result;               
                var xhr = Ftp.createCORSRequest('POST', "http://ftp.apixml.net/upload.aspx");
                if (!xhr) {
                    throw new Error('CORS not supported');
                }
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4 && xhr.status == 200) {
						Ftp.callback(file);
					}
				};
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.addEventListener('loadstart', handleEvent);
                xhr.addEventListener('load', handleEvent);
                xhr.addEventListener('loadend', handleEvent);
                xhr.addEventListener('progress', handleEvent);
                xhr.addEventListener('error', handleEvent);
                xhr.addEventListener('abort', handleEvent);
                var date = new Date();
                var fileName = "" + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds() + "_";
                fileName += file.name;
                xhr.send("token=" + token + "&data=" + encodeURIComponent(base64) + "&file=" + fileName);
                
            },
            false);
    },
    
    callback: function(){}
    
};

function Guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
};

const log = document.querySelector('.event-log');
function handleEvent(e) {
    console.log(`${e.type}: ${e.loaded} bytes transferred\n`);
    if(e.type == `loadend` && e.loaded > 0)
    {
        alert("Success");
    }
}
