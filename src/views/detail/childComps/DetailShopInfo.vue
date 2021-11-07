<template>
  <div v-if="Object.keys(shop).length !== 0 " class="shop-info">
    <div class="shop-img-name">
      <div class="shop-img">
        <img :src="shop.log" alt="">
      </div>
      <div class="shop-name">{{shop.name}}</div>
    </div>
    <div class="shop-info-box">
      <div class="shop-left">
        <div class="shop-left-item">
          <p>{{shop.sells}}</p>
          <span>总销量</span>
        </div>
        <div class="shop-left-item">
          <p>{{shop.goodsCount}}</p>
          <span>全部宝贝</span>
        </div>
      </div>
      <div class="shop-right">
        <div class="shop-right-item" v-for="(item,index) in shop.score" :key="index">
          <span>{{item.name}}</span>
          <span :class="{red:item.isBetter}">{{item.score}}</span>
          <span :class="{red:item.isBetter}" v-if="item.isBetter">高</span>
          <span :class="{red:item.isBetter}" v-else>低</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props:{
    shop:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .shop-info{
    padding: 30px 8px 0 8px;
  }
  .shop-img-name{
    display: flex;
    align-items: center;

  }
  .shop-img{
    border: 1px solid #ddd;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .shop-img img{
    width: 100%;
    height: 100%;
  }
  .shop-name{
    font-size: 15px;
  }
  .shop-info-box{
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
  }
  .shop-info-box>div{
    flex: 1;
  }
  .shop-left{
    display: flex;
    justify-content: space-around;
    text-align: center;
    border-right: 1px solid #f2f5f8;
  }
  .shop-left-item p{
    font-size: 20px;
    line-height: 30px;
    font-weight: bold;
  }
  .shop-left-item span{
    font-size: 10px;
    margin-top: 15px;
  }
  .shop-right{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    height: 100%;
  }
  .shop-right-item{
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
  }
  .shop-right-item span:nth-last-of-type(2){
    color: #42b983;
  }
  .shop-right-item span:nth-last-of-type(2).red{
    color: var(--color-high-text);
  }

  .shop-right-item span:last-child{
    color: #ffffff;
    background-color: #42b983;
    padding: 2px;
    border-radius: 2px;
  }
  .shop-right-item span:last-child.red{
    background-color: var(--color-high-text);
  }

  .title h3{
    font-size: 14px;
  }
  .price-box{
    display: flex;
    align-items: center;
    padding: 10px;
  }
  .price-box div{
    margin-right: 10px;
  }
  .now-price{
    font-size: 24px;
    color: var(--color-high-text);
  }
  .old-price{
    font-size: 13px;
    text-decoration: line-through;
  }
  .discount{
    background-color: var(--color-high-text);
    border-radius: 5px;
    color: white;
    font-size: 12px;
    padding: 5px;
    margin-top: -5px;
  }
  .goods-info{
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    border-bottom: 1px solid #ededed;
  }
  .goods-img{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .img-item{
    padding: 20px 0;
    display: flex;
    font-size: 10px;
  }
  .img-item img{
    width: 10px;
    height: 10px;
  }
</style>
