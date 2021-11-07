<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll ref="scroll" class="content"  :pull-up-load="true">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" />
      <detail-comment-info :comment-info="commentInfo" />
      <goods-list :goods="recommends"/>
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

import Scroll from "@/components/common/scroll/Scroll";

import {debounce} from "@/common/utils";
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
    GoodsList
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
    }
  },
  updated() {
    this.$refs.scroll.refresh()
  },
  activated() {

  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then(res=>{
      const data = res.result;
      //1.获取顶部轮播图片
      this.topImages=res.result.itemInfo.topImages;

      console.log(res)

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
