<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="title-item" :class="{active:currentIndex==index}" @click="titleClcik(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data(){
    return {
      titles: ['商品','参数','评论','推荐',],
      currentIndex:0
    }
  },
  methods:{
    titleClcik(index){
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .title{
    display: flex;
  }
  .title-item{
    flex: 1;
    font-size: 13px;
  }
  .active{
    color: red;
  }
  .back img{
    margin-left: 10px;
    margin-top: 12px;
  }
</style>
