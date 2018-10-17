<template>
    <div class="demo-container">
      <a class="example-image-link" v-for="(item,index) in imgList" :href="item.originalUrl" data-lightbox="example-set" data-title="Click the right half of the image to move forward.">
        <img class="example-image thumb" :src="item.thumbUrl" alt="">
      </a>
    </div>
   
</template> 
<style>

.bd{
  border: 1px solid #e7ecf0;
}
.bd-bottom{
  border-bottom: 1px solid #e7ecf0;
}
.thumb{
  width:90px;
  height:90px;
  margin-left:20px;
}

</style>
<script>
  import jquery from 'jquery'
  import lightboxCss from 'lightbox2/dist/css/lightbox.min.css'
  import lightbox2 from 'lightbox2'  
export default {
  props: {
    imgList: {
      type: Array,
      required: true,
      default : {}
    },
   
  },
  data:function() { 
        return { 
           

        } 
  },
  created:function(){

    
  },

  methods: {

    
  
   
  }
}
</script>
