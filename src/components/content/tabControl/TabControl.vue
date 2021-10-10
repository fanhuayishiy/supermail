<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="item"
         :class="{active : index === currentIndex}" class="tab-control-item" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data(){
    return {
      currentIndex:0
    }
  },
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex=index;
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
.tab-control{
  display: flex;
  text-align: center;
  font-size: 15px;
  background-color: white;
}
.tab-control-item{
  flex: 1;
  line-height: 40px;
  height: 40px;
}
.tab-control-item span{
  padding: 5px;
}
.active{
  color: var(--color-tint);

}
.active span{
  border-bottom: 3px solid var(--color-tint);
}
</style>
