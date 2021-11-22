<template>
  <div id="detail">
    <detail-nav-bar ref="nav" @titleClick="titleClick" class="detail-nav"></detail-nav-bar>
    <scroll ref="scroll" class="content" @scroll="contentScroll" :probe-type="3"  :pull-up-load="true">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends"/>
      <detail-bottom-bar />
    </scroll>

  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import GoodsList from "@/components/content/goods/GoodsList";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from  '@/network/detail'
import {itemListenerMixin} from "@/common/mixin";

export default {
  name: "detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  mixins:[itemListenerMixin],
  data(){
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs: [],
      currentIndex:0
    }
  },
  updated() {
    this.$refs.scroll.refresh()
    // this.themeTopYs = []
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    //
    // console.log(this.themeTopYs);
  },
  activated() {

  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then(res=>{
      const data = res.result;
      //1.获取顶部轮播图片
      this.topImages=res.result.itemInfo.topImages;

      // console.log(res)

    //  2.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
    // 3.获取商家信息
      this.shop = new Shop(data.shopInfo)
    // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // 5.获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      // 6.保存商品的评论数据
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }


      // this.$nextTick(()=>{
      //   //根据最新的数据，对应的DOM是已经被渲染出来了
      //   //但是图片还没加载完
      //
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //
      //   console.log(this.themeTopYs);
      // })
    })
    getRecommend().then(res=>{
      this.recommends=res.data.list;
    })
  },
  mounted() {

  },
  destroyed() {
    //取消全局事件监听
    this.$bus.$off('itemImgLoad',this.itemListener)
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()

      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE)
      console.log(this.themeTopYs);
    },
    titleClick(index){
      console.log(index)
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index]+44,100)
    },
    contentScroll(position){
      // console.log(position);
    //  1.获取y值
      const positionY = -position.y
    //  2.positionY与主题中的值进行对比
    // [0, 13780, 15063, 15279,]
    //positonY在0-13780之间 index = 0
    //......
    //positonY在15279之后 index = 3
      let length = this.themeTopYs.length
      for(let i=0; i<length-1;i++){
        // if(positionY>this.themeTopYs[parseInt(i)] && positionY < this.themeTopYs[parseInt(i)+1]){
        //
        // }
        if(this.currentIndex !== i && (positionY>=this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
          this.currentIndex = i;
          console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    }
  }
}
</script>

<style scoped>
 #detail{
   position: relative;
   z-index: 9;
   background-color: #fff;
   height: 100vh;
 }
 .detail-nav{
   position: relative;
   z-index: 9;
   background-color: #fff;
 }
 .content{
   height: calc(100% - 44px);
 }
</style>
