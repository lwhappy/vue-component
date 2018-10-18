<template>
     <div class="delete">
             <div class="slider">
                   <div class="content box-center" 
                      @touchstart='touchStart'
                      @touchmove='touchMove'
                      @touchend='touchEnd'
                      :style="deleteSlider"
                   >
                <!-- 插槽中放具体项目中需要内容         -->   
                    <slot></slot>
                   </div>
                   <div :style="{zIndex:removeZindex}" class="remove" ref='remove' @click="handleConfirm">
                       删除
                   </div>
            </div>
            <confirm v-if="isShowConfirm" v-on:confirm="dialog.confirm" v-on:cancel="dialog.cancel" :type="confirmObj.type" :title="confirmObj.title"  :content="confirmObj.content">
            </confirm>
     </div>
</template>
<style scoped lang="less" >
    .delete{
      width:100%;
      height:30px;
    }
    .slider{
        width: 100%;
        height:100%;
        position: relative;
         user-select: none;
        .content{
           
            transition: 0.3s;
            border:solid 1px #e5e5e5;
            background:#fff;
            height:30px;
            box-sizing: border-box;

             
        }
        .remove{
            position: absolute;
            width:200px;
            height:30px;
            line-height:30px;
            background:#f16161;
            right: 0;
            top: 0;
            color:#fff;
            text-align: center;
            font-size: 14px;
            z-index:-1;
        }
    }
 
</style>

<script>
  import confirm from './confirm.vue';
  export default {
     components: {
       confirm,
     },
     data() {
     return {
        startX:0,   //触摸位置
        endX:0,     //结束位置
        moveX: 0,   //滑动时的位置
        disX: 0,    //移动距离
        deleteSlider: '',//滑动时的效果,使用v-bind:style="deleteSlider"
        removeZindex : -1,
        /**confirm begin*/
        confirmObj:{
          content : "",
          type : "",
        },
        isShowConfirm : false,
        dialog : null,
        /**confirm end*/
     }
    
     },
     methods:{
         touchStart(ev){
                ev= ev || event
          //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
    
            if(ev.touches.length == 1){
                    // 记录开始位置
                    this.startX = ev.touches[0].clientX;
                }
            },
         touchMove(ev){
                ev = ev || event;
                console.log("ev",ev)
                console.log("this.$refs.remove",this.$refs)
                   //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
                let wd=this.$refs.remove.offsetWidth;
                    if(ev.touches.length == 1) {
                        // 滑动时距离浏览器左侧实时距离
                        this.moveX = ev.touches[0].clientX
                
                        //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
                        this.disX = this.startX - this.moveX;
                   console.log(this.disX)
                        // 如果是向右滑动或者不滑动，不改变滑块的位置
                        if(this.disX < 0 || this.disX == 0) {
                            this.removeZindex = -1;
                            this.deleteSlider = "transform:translateX(0px)";
                        // 大于0，表示左滑了，此时滑块开始滑动 
                        }else if (this.disX > 0) {
                            //this.removeZindex = 1;
                             //具体滑动距离我取的是 手指偏移距离*5。
                            this.deleteSlider = "transform:translateX(-" + this.disX*5 + "px)";
                            
                            // 最大也只能等于删除按钮宽度 
                            if (this.disX*5 >=wd) {
                                this.deleteSlider = "transform:translateX(-" +wd+ "px)";
                             
                            }
                        }
                    }
              },
         touchEnd(ev){
              ev = ev || event;
              let that = this;
              let wd=this.$refs.remove.offsetWidth;
              if (ev.changedTouches.length == 1) {
                    let endX = ev.changedTouches[0].clientX;
                      
                        this.disX = this.startX - endX;
                        console.log(this.disX)
                        //如果距离小于删除按钮一半,强行回到起点
                        
                        if ((this.disX*5) < (wd/2)) {
                          
                            this.deleteSlider = "transform:translateX(0px)";
                            //that.removeZindex = -1;
                            /*setTimeout(function(){
                              that.removeZindex = -1;
                            },300)*/
                            
                        }else{
                            //大于一半 滑动到最大值
                             this.deleteSlider = "transform:translateX(-"+wd+ "px)";
                             this.removeZindex = 1;
                        }
                        
                    }
                },
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
                  //that.confirmObj.type="input";
                  that.confirmObj.content = "确定要删除吗？";
                  that.dialog = that.confirmDialog(function(data){
                    that.isShowConfirm = false;
                    
                  
                  });
                },
                /**confirm end***/      
     }
     }
</script>

