<template>
  <div class="page-container box-v-justify align-stretch" >
    <div clas="btns">
      <button class="btn" @click="handleWarm">提示框</button>
      <button class="btn" @click="handleConfirm">确认框</button>
    </div>
  
    <warm v-if="isShowWarm" v-on:warm="warm"   :title="warmObj.title"  :content="warmObj.content" >
    </warm>
    <confirm v-if="isShowConfirm" v-on:confirm="dialog.confirm" v-on:cancel="dialog.cancel" :type="confirmObj.type" :title="confirmObj.title"  :content="confirmObj.content">
    </confirm>
    <div id="select-down" class="m10">
      <p>下拉框：</p>
      <div class="box-start m10">
          <selectDown v-on:change="selectChange" :selectData="selectData"></selectDown>
          <div style="margin-left:10px">emit触发所得值：<span>{{selectItem.name}}</span></div>
      </div>
    </div>
    <div id="radio" class="m10">
      <p>单选框：</p>
      <div class="box-start m10">
          <radio v-on:change="radioChange" :radioData="radioData"></radio>
          <div style="margin-left:20px">emit触发所得值：<span>{{radioSelectItem.name}}</span></div>
      </div>
    </div>
    <div  class="m10">
      <p>lightbox：</p>
      <div class="box-start m10">
          <lightbox  :imgList="imgList"></lightbox>
      </div>
    </div>
    <div  class="m10">
      <p>switch：</p>
      <div class="box-start m10">
          <mySwitch v-on:change="switchChange" :switchData = "switchData"></mySwitch>
           <div style="margin-left:20px">emit触发所得值：<span>{{switchData.open}}</span></div>
      </div>
    </div>
    <div  class="m10">
      <p>slide：</p>
      <div class="box-start m10">
          <slide >请向左滑动</slide>
      </div>
    </div>
  </div>

</template>


<script>
    
import warm from './warm.vue';
import confirm from './confirm.vue';
import selectDown from './select-down.vue';
import radio from './radio.vue';
import lightbox from './lightbox.vue';
import mySwitch from './switch.vue';
import slide from './slide.vue';
export default {
    components: {
      warm,confirm,selectDown,radio,lightbox,mySwitch,slide
    },
    data:function() { 
          return {
            /*warm begin*/
            warmObj:{
              content : ""
            },
            isShowWarm : false,
            /**warm end*/
            /**confirm begin*/
            confirmObj:{
              content : "",
              type : "",
            },
            isShowConfirm : false,
            dialog : null,
            /**confirm end*/
            /**select begin**/
            selectData : {
               selectIndex : 1,//list数组的索引 
               list : [
                  {
                    value : "1",name : "选项1"
                  },
                  {
                    value : "2",name : "选项2"
                  },
                  {
                    value : "3",name : "选项3"
                  },
               ]
            },
            selectItem : {},
            /**select end***/
            /**radio begin**/
            radioData : {
               selectIndex : 1,//list数组的索引 
               list : [
                  {
                    value : "1",name : "选项1"
                  },
                  {
                    value : "2",name : "选项2"
                  },
                  {
                    value : "3",name : "选项3"
                  },
               ]
            },
            radioSelectItem : {},
            /**radio end***/
            /**lightbox begin**/
            imgList : [
              {originalUrl : "images/image-3.jpg",thumbUrl : "images/thumb-3.jpg"},
              {originalUrl : "images/image-4.jpg",thumbUrl : "images/thumb-4.jpg"},
            ],
            /**lightbox end***/
           /***switch begin***/
           switchData : {
              open : true,
           }
           /***switch end***/
          }
    }, 
    created:function(){
      var that=this;
      console.log($("body").html())
        
    },
   
    methods: {
        /**warm begin**/
        warm : function(){
          var that = this;
          that.isShowWarm = false;
          setTimeout(function(){
            
          },2000);
        },
        handleWarm : function(){
          var that = this;
          that.isShowWarm = true;
          that.warmObj.content="这是一个提示框";
        },
        /**warm end**/

        /**confirm begin**/
        confirmDialog : function(callback){
          var that = this;
          var callback = callback;
          var confirm = function(){
            if(arguments[0]){
              callback(arguments[0]);
            }
            else{
              callback();
            }
          }
          var cancel = function(){
            that.isShowConfirm = false;
          }
          var obj = {
            confirm : confirm,
            cancel : cancel
          };
          return obj;
        },
        handleConfirm : function(){
          var that = this;
          that.isShowConfirm = true;
          that.confirmObj.type="input";
          that.confirmObj.content = "请输入内容";
          that.dialog = that.confirmDialog(function(data){
            that.isShowConfirm = false;
            if(!data){
              that.warmObj.content ="内容不能为空";
              that.isShowWarm = true;
              return;
            }
          
          });
        },
        /**confirm end***/
        /***select begin**/
        selectChange : function(selectItem){
          var that = this;
          that.selectItem = selectItem;
        },
        /**select end**/
        /**radio begin**/
        radioChange : function(selectItem){
          var that = this;
          that.radioSelectItem = selectItem;
        },
        /***radio end**/
        switchChange : function(data){
          var that = this;
          that.switchData = data;
        }
    } 
    
  } 
  
</script>
<style>
html,body{
  height:100%;
}
 body{
    font-size:15px;
 }
 .container{
    padding:0;
 }
 input:focus{
    outline:none;
 }
 .m10{
  margin:10px;
 }
 .btns{
  padding:10px 0;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  background: #f1f4f8;
 }
 .btn{
    display:block;
    margin:10px auto;
    width:90%;
    height:46px;
    background-color:#4bacf3;
    color:#fff;
    text-align:center;
    border-radius:6px;
    font-size:18px;
 }


 
  /*******************************************************************************************/
</style>
