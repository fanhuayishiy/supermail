<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data(){
    return {
      scroll:null
    }

  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted() {
  //  创建BScroll对象
  this.scroll= new BScroll(this.$refs.wrapper, {
    click:true,
    probeType:this.probeType,
    pullUpLoad: this.pullUpLoad,
    // scrollbar: true,
  })
  //监听滚动位置
  this.scroll.on('scroll',(positon)=>{
    // console.log('xy',positon)
   this.$emit('scroll',positon)
  })
  //监听上拉加载更多
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })

    this.scroll.scrollTo(0,0)
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time);
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      console.log('--------')
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>
