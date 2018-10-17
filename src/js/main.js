require("../css/common.css");
import index from '../../components/index.vue'


var routes=[  
    { path: '/',  // 默认进入路由
      redirect: '/index'   //重定向
    },
    {
        path:'/index/',
        name:'index',
        component:index,
       
    },
  
];  
var router=new VueRouter({  
        routes  
    }); 


 Vue.filter("timeFormat",function(value){
      return value.replace("T"," ");
    })
var app = new Vue({
  el: '#app',
  //template : '<index/>',
  router,
  
  data: {
    title : "",
  },
  components: {
    index,
    //show
   },
  filters : {
    timeFormat : function(value){
      return value.replace("T"," ");
    }
  },
  methods: {
      
  }
}) 

