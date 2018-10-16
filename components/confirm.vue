<template>
    <div class="confirm-container">
      <div class="mask"></div>
      <div class="confirm-wrapper">
        <h3>{{title}}</h3>
        <div class="confirm-content">
          <textarea v-if="type === 'input'" v-model="remark" :placeholder="content"></textarea>
          <div v-if="type === ''">{{content}}</div>
        </div>
        <div class="box-justify confirm-btns bd-top">
          
          <button class="confirm-btn bd-right" type="button" v-on:click="cancel">取消</button>
          <button class="confirm-btn" type="button" v-on:click="confirm">确定</button>
        </div>
      </div>
    </div>
</template> 
<style>
.confirm-container{
  position:fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
}
.confirm-container .mask{
  position:absolute;
  left:0;
  top:0;
  z-index:1;
  background-color:rgba(0, 0, 0, 0.5);

}
.confirm-container .confirm-wrapper{
  background-color:#fff;
  width:70%;
  position:absolute;
  left:50%;
  top:40%;
  margin-left:-35%;
  z-index:10;
}
.confirm-container{
  padding:10px;
}
.confirm-container .confirm-wrapper{
  border-radius:6px;
}
.confirm-container h3{
  font-size:18px;
  padding:20px;
  color:#000;
  font-weight:600;
  text-align:center;
}
.confirm-container .confirm-content{
  padding:0 0 20px 20px;
  font-size:16px;
  color:#333;
}
.confirm-container .confirm-btn{
  width:50%;
  box-sizing:border-box;
  padding:16px 0;
  font-size:17px;
}
.confirm-container .confirm-btn:nth-of-type(1){
  color:#333;
}
.confirm-container .confirm-btn:nth-of-type(2){
  color:#4cacf3;
}
</style>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default : "提示"
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
   
  },
  data:function() { 
        return { 
          
          remark : "",  

        } 
  },
  created:function(){
   
    
  },
  methods: {
    confirm : function(){
      var that = this;
      this.$emit("confirm",that.remark);
    },
    cancel : function(){
      var that = this;
      this.$emit("cancel");
    },
    /*handleRight : function(){
      this.$emit("right");
    }*/
  }
}
</script>
