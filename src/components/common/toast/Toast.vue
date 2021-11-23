<template>
  <div class="toast"  v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // show: {
    //   type:Boolean,
    //   default: false
    // }
  },
  data(){
    return {
      message:'',
      isShow: false
    }
  },
  methods: {
    show(message, duration=2000){
      this.message=message;
      this.isShow=true;
      setTimeout(()=>{
        this.message='';
        this.isShow=false;
      },duration)
    }
  }
}
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 8px 10px;
    border-radius: 5px;
    color: white;
    background-color: rgba(0,0,0,.65);
    z-index: 9999;
  }
</style>
