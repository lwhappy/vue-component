<template>
    <div class="warm-container">
      <div class="mask"></div>
      <div class="warm-wrapper">
        <h3>{{title}}</h3>
        <div class="warm-content">{{content}}</div>
        <div class="box-center warm-btns bd-top">
          
          <button class="warm-btn" type="button" v-on:click="warm">确定</button>
        </div>
      </div>
    </div>
</template> 
<style>
.warm-container{
  position:fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  z-index:1000;
}
.warm-container .mask{
  position:absolute;
  left:0;
  top:0;
  z-index:1;
  background-color:rgba(0, 0, 0, 0.5);

}
.warm-container .warm-wrapper{
  background-color:#fff;
  width:70%;
  position:absolute;
  left:50%;
  top:40%;
  margin-left:-35%;
  z-index:10;
}
.warm-container{
  padding:10px;
}
.warm-container .warm-wrapper{
  border-radius:6px;
}
.warm-container h3{
  font-size:18px;
  padding:18px 0 0 0;
  color:#000;
  font-weight:600;
  text-align:center;
}
.warm-container .warm-content{
  padding:12px 0 24px 20px;
  color:#333;
}
.warm-container .warm-btn{
  width:50%;
  box-sizing:border-box;
  padding:16px 0;
  color:#4cacf3;
  font-size:17px;
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
   
  },
  data:function() { 
        return { 
          
            

        } 
  },
  created:function(){
   
    
  },
  methods: {
    warm : function(){
      this.$emit("warm");
    },
   
  }
}
</script>
