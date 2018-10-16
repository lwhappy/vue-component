<template>
    <div class="select-container bd">
        <p @click="showList" class="select-current box-justify">
          <span>{{currentItem.name}}</span>
          <img v-show="!isShow" src="images/select-triangle.png">
          <img v-show="isShow" src="images/select-triangle-active.png">
        </p>
        <ul v-show="isShow" class="select-list bd ">
          <li @click="change(item,index)" :class="[index === selectData.selectIndex ? 'active' : '']" v-for="(item,index) in selectData.list" value="item.value" class="select-item bd-bottom ">{{item.name}}</li>
        </ul>
    </div>
</template> 
<style>
.bd{
  border: 1px solid #e7ecf0;
}
.bd-bottom{
  border-bottom: 1px solid #e7ecf0;
}
.select-container{
    width:100px;
    position:relative;
    background-color:#fff;
    box-sizing:content-box;
    border-radius:8px;

}
.select-container .select-current{
    height:30px;
    line-height:30px;

    border-radius:6px;
    padding-left:10px;
    cursor:pointer;
}
.select-container .select-current img{
  width:12px;
  height:12px;
  margin-right:10px;
}
/*.select-container .select-current.active{
    background-image:url(images/select-triangle-active.png);
}*/
.select-container .select-list{
    background-color:#fff;
    position:absolute;
    z-index:200;
    left:-1px;
    top:35px;
    width:100%;
    height:146px;
    overflow:auto;
    box-sizing:content-box;
    border-radius:8px;
}
.vtalk-setting-dialog .setting-item-font .select-container .select-list{
    height:90px;
}
.select-container .select-list .select-item:last-of-type{
    border-bottom:none;
}
.select-container .select-list .select-item{
    height:30px;
    line-height:30px;
    padding-left:10px;
    cursor:pointer;
}
.select-container .select-list .select-item:hover{
    background-color:#f0f3f6;
}
.select-container .select-list .select-item.active{
    background-color:#f0f3f6;
}

</style>
<script>
export default {
  props: {
    selectData: {
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
      for(var i=0,len=that.selectData.list.length;i<len;i++){
        if(i === that.selectData.selectIndex){
          that.currentItem = that.selectData.list[i];
        }
      }
    
  },
  methods: {
    showList : function(){
      var that = this;
      that.isShow = !that.isShow;
    },
    change : function(item,index){
      var that = this;
      that.currentItem = item;
      that.selectData.selectIndex = index;
      that.isShow = false;
      that.$emit("change",that.currentItem);
    }
   
  }
}
</script>
