<template>
  <div id="home" class="wrapper">
    <nav-bar  class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control ref="tabControl1" class="tab-control" v-show="isTabFixed" @tabClick="tabClick" :titles="['流行','新款','精品']" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control ref="tabControl2" @tabClick="tabClick" :titles="['流行','新款','精品']" />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
// import BackTop from "@/components/content/backTop/BackTop";

import {getHomeMultidata,getHomeGoods} from "@/network/home";
import {itemListenerMixin,backTopMixin} from "@/common/mixin";
// import {debounce} from "@/common/utils";


export default {
  name: "home",
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      // isShowBackTop:false,
      //
      tabOffsetTop:10,
      isTabFixed:false,
      saveY: 0,
    }
  },
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list;
    }
  },
  //回来页面的时候滚动到保存的位置，并且刷新防止bug
  activated() {

    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  //离开页面的时候保存滚动到的位置
  deactivated() {
    //1.保存y值
    this.saveY = this.$refs.scroll.scroll.y;
    //2.取消全局事件监听
    this.$bus.$off('itemImgLoad',this.itemListener)
  },
  created() {
    //  获取首页数据
    this.getHomeMultidata()
    //  获取首页数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')


  },
  mounted() {


  },
  methods:{
    /*
    * 事件监听相关方法
    * */
    //防抖
    debounce(func,delay){
      let timer = null;
      return function (...args){
        if(timer) clearInterval(timer)

        timer = setTimeout(()=>{
          func.apply(this,args)
        },delay)
      }
    },
    tabClick(index){
      console.log(index)
      switch (index){
        case 0 :
          this.currentType = 'pop'
          break;
        case 1 :
          this.currentType = 'new'
          break;
        case 2 :
          this.currentType = 'sell'
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // backClick(){
    //   this.$refs.scroll.scrollTo(0,0)
    // },
    contentScroll(position){
      // console.log(position)
      this.isShowBackTop = (-position.y) > 1000;

      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /*
    * 网络请求相关方法
    * */
    getHomeMultidata() {
      getHomeMultidata().then(res=>{
        // console.log(res);
        this.banners=res.data.banner.list;
        this.recommends=res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res=>{
        console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }

  }
}
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: white;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
