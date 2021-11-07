<template>
  <div v-if="Object.keys(goods).length !== 0 " class="base-info">
    <div class="title">
      <h3>{{goods.title}}</h3>
    </div>
    <div class="price-box">
      <div class="now-price">{{goods.newPrice}}</div>
      <div class="old-price">{{goods.oldPrice}}</div>
      <div v-if="goods.discount" class="discount">{{goods.discount}}</div>
    </div>
    <div class="goods-info">
      <div class="info-item" v-for="(item,index) in goods.columns" :key="index">
        {{item}}
      </div>
    </div>
    <div class="goods-img">
      <div class="img-item" v-for="(item,index) in goods.services" :key="index">
        <img v-if="item.icon" :src="item.icon" alt="">
        <p v-if="item.icon">&nbsp;{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props:{
    goods:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .base-info{
    padding: 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
  .title{
    padding-top: 10px;
    color: #222;
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
