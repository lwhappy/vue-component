
function getRequest(method) {
    var handle = function(data){
        if(method && method === "encodeURIComponent") {
            return decodeURIComponent(data);
        } else {
            return unescape(data);
        }
    };

    var rel = window.location.href;
    var index = rel.indexOf("?");

    var url = rel.substring(index); //获取url中"?"符后的字串
    var theRequest = {};
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            var arr = strs[i].split("=");
            theRequest[arr[0]] = handle(arr[1]);
        }
    }
    return theRequest;
}



String.prototype.replaceAll = function(s1,s2)
{
    return this.replace(new RegExp(s1,"gm"),s2);
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



 
//获取n位随机数
  function getRandom(n) {
      var arrTemp=[];
      var stringTemp='';
      for(var i=0;i<n;i++){
          arrTemp.push(Math.floor(Math.random()*10))
      }
      stringTemp=arrTemp.join('');
      return stringTemp;
  }
  /**
   * 选择人员
   * @param _fun成功的返回函数；_errorFunc失败返回函数
   */
  function selectContacts(_fun,_errorFunc){
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > 1 || u.indexOf('Linux') > 1;
      window['selectUserRet']=_fun;
      try{
          if (!isAndroid) {
              try{
                    wpt.selectContacts(
                        "com.sie.mp.activity.SelectContactsActivity",
                        "true",
                        {
                            'requestCode':1, //回调eventCode,如是startForResult是true，则requestCode必须传入，否则不用传入
                            'requestTip':'0,1,2', //显示那几个标签页，0组织、1岗位、2联系人、3群组、4公众号,默认全部
                            'isCheckBox':false, //是否带CheckBox框 true带   false
                            'scopePublicNO':'ALL', //公众号:ALL-查询所有公众号、SYS--系统级、MINE--我订阅的、OTHER--未订阅的
                            'scopeGroup':'ALL'// MINE--只查询我所在的群 OTHER--我没有加入的群  什么都不传，或者ALL都是查询所有群
                        }
                      
                    );
              }
              catch(e){
                    alert(e)
                    if(config.debug){
                      _fun({"targetCode" : "11063563","targetName" : "test"});
                    }
              }
          }else{
              
              try{
                window.wpt.selectContacts();
              }
              catch(e){
                alert(e)
                if(config.debug){
                  _fun({"targetCode" : "11063563","targetName" : "test"});
                }
              }
          }  
      }
      catch(e){
          if(config.debug){
            _fun({"targetCode" : "11063563","targetName" : "test"});
          }
      }
  }
  /**
   * android的选择人员后执行事件
   * @param
   */
  function setSelectUser(param) {
      window['selectUserRet'](param);
  }
  /**
   打开图片
   */
  function openImage(params){
      
      window.wpt.openImage(params);
  }


