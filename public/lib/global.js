var config = {
   // "url" : "http://172.20.62.194:8010/IntegrateService/InvokeAction"
    "url" : "http://172.20.112.178:9000/IntegrateService/InvokeAction"
};
var currentUserCode = "";//10933172
var vplus = new VplusApi();
var getNativeUser = {
    nativeSucessCallback : function(data){
        alert(data);
        this.businessSucessCallback(data);
    },
    nativeFailCallback : function(data){
        alert(data);
        this.businessFailCallback();
    },
    businessSucessCallback : function(){
       
    },
    businessFailCallback : function(){
       
    },

}
var userInfoSuccess = function(data){
    alert(data)
    //successCallback(data);
}
var userInfoFail = function(data){
    alert(data)
    //successCallback(data);
}
function global_getUserInfo(params,successCallback,failCallback){
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > 1 || u.indexOf('Linux') > 1;
    try{
        if(isAndroid){
            data = wpt.getUserInfo();
            successCallback(data);
        }
        else{
            getNativeUser.businessSucessCallback = successCallback;
            getNativeUser.businessFailCallback = failCallback;
            try{
                // wpt.getUserInfo(params,"getNativeUser.nativeSucessCallback","getNativeUser.nativeFailCallback");
            }
            catch(e){
                alert(e)
            }
        }
    }catch(e){
        alert(e)
        //successCallback("11063563");
    }
}
function global_getBpmParams(params,successCallback,failCallback){
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > 1 || u.indexOf('Linux') > 1;
    try{
        if(isAndroid){
            var data = wpt.getBpmParams(params);
            successCallback(data);
        }
        else{

            wpt.getBpmParams(params,function(data){
                successCallback(data);
            },function(data){
                failCallback(data);
            });
        }
    }catch(e){
        alert(e)
        /*var sign = {"Mac":"","IVKParameter":"{\"strRequest\":\"H4sIAAAAAAAAAKtWCi1OLXLOT0lVslIyNDQwMzY1M1aqBQDZuF+EFwAAAA==\"}","UserKey":"e4486adf6cc649df8ca784c5171bfc84","UserAccount":"11063563","IVKDateTime":"1524900377172","OSType":"vAgent","IVKLanguage":"1","OSVer":"ANDROID 7.1.1","Sign":"noA2gSOnSx5ZpiWAExJhwOKiXBWZokG+u/GsmlbeLTpuLluTDFxAZtCnx26qUQ/OB8SW7DJeaQv87JGvwr9gaFqZps+OhBkCUVlAEbJL2tZr7pDu7yE2k/0Z+Mogk4zQLHUTeTZeELuXtgnCyo6Nde6L9C1sFrnQ3LddgriDlCs=","IVKCode":"F5000065"}
        successCallback(sign);*/
    }
}
function VplusApi()
{
    
}
VplusApi.prototype.desKey = "";
VplusApi.prototype.desIv = "";

//初始化加密解密
VplusApi.prototype.initDes = function(key,iv){
    this.desKey = CryptoJS.enc.Utf8.parse(key); 
    this.desIv = CryptoJS.enc.Utf8.parse(iv); 
}

//加密
VplusApi.prototype.encrypt = function(word,tempDesKey,tempDesIv){
    if(tempDesKey){
        desKey = CryptoJS.enc.Utf8.parse(tempDesKey); 
    }
    else{
        desKey = this.desKey;
    }
    if(tempDesIv){
        desIv = CryptoJS.enc.Utf8.parse(tempDesIv); 
    }
    else{
        desIv = this.desIv;
    }

    try{
        
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, desKey, { iv: desIv, mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
        return encrypted.toString();  
    }catch(e){
        console.log("加密出错",word);
        return word
    }
}

//解密
VplusApi.prototype.decrypt = function(encrypted,tempDesKey,tempDesIv){
    if(tempDesKey){
        desKey = CryptoJS.enc.Utf8.parse(tempDesKey); 
    }
    else{
        desKey = this.desKey;
    }
    if(tempDesIv){
        desIv = CryptoJS.enc.Utf8.parse(tempDesIv); 
    }
    else{
        desIv = this.desIv;
    }
    if (!encrypted) return encrypted;
    if (encrypted.indexOf("\n")>-1) encrypted = encrypted.replaceAll("\n","");
    try{
        var decrypted = CryptoJS.AES.decrypt(encrypted,desKey, { iv:desIv, mode:CryptoJS.mode.CBC, padding:CryptoJS.pad.Pkcs7 });
        return decrypted.toString(CryptoJS.enc.Utf8) || encrypted;
    }catch(e){
        console.log("解密出错",encrypted); //此处会有解密的是有换行符的,会报错
        return encrypted
    }
}