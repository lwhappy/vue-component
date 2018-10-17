<template>
    <div class="radio-container">
      <div @click="change(item,index)" v-for="(item,index) in radioData.list" class="box-start radio-wrapper">
          <p  class="radio radio-selected" >
            <img v-show="radioData.selectIndex === index" src="images/radio-selected.png">
            <img v-show="radioData.selectIndex !== index" src="images/radio.png">
          </p>
          <p>{{item.name}}</p>
                  
      </div>
    </div>
   
</template> 
<style>

.bd{
  border: 1px solid #e7ecf0;
}
.bd-bottom{
  border-bottom: 1px solid #e7ecf0;
}
.radio-wrapper{
  margin-top:10px;
}
.radio{
  margin-right:10px;
}

</style>
<script>
export default {
  props: {
    radioData: {
      type: Object,
      required: true,
      default : {}
    },
   
  },
  data:function() { 
        return { 
            isShow : false,
            currentItem : {},

        } 
  },
  created:function(){

      var that = this;
      for(var i=0,len=that.radioData.list.length;i<len;i++){
        if(i === that.radioData.selectIndex){
          that.currentItem = that.radioData.list[i];
        }
      }
    
  },

  methods: {

    
    change : function(item,index){
      var that = this;
      that.currentItem = item;
      that.radioData.selectIndex = index;
      that.$emit("change",that.currentItem);
    }
   
  }
}
</script>
