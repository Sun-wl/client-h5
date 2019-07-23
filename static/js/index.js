/**
 * Created by admin on 2017/7/19.
 */
//判断机型为Android/iOS
var u = navigator.userAgent;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

//设置baseUrl
var baseUrl = 'http://renwu.gidoor.com/api/';
if (window.location.host.indexOf("10.0.0") >= 0 || window.location.host.indexOf("localhost") >= 0) {
  baseUrl = 'http://10.0.0.43:8080/api/';
}else if (window.location.host.indexOf("test.tenlant.client.gidoor.com") >= 0){
  baseUrl = 'http://test.gidoor.com/api/';
}

export {isiOS,baseUrl};
