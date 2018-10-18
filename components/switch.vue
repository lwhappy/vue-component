<template>
    <div class="demo-container">
      <div class="box-start">
          <p @click="change" >
            <img v-show="switchData.open === true" src="images/switch-active.png">
            <img v-show="switchData.open === false" src="images/switch.png">
          </p>
                  
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


</style>
<script>
export default {
  props: {
    switchData: {
      type: Object,
      required: true,
      default : {}
    },
   
  },
  data:function() { 
        return { 
           

        } 
  },
  created:function(){

      var that = this;
    
    
  },

  methods: {

    
    change : function(){
      var that = this;
      that.switchData.open = !that.switchData.open;
      that.$emit("change",that.switchData);
    }
   
  }
}
</script>
