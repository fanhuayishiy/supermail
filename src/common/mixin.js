import {debounce} from "@/common/utils";

export const itemListenerMixin = {
  data(){
    return{
      itemListener: null
    }
  },
  mounted(){
    const refresh= debounce(this.$refs.scroll.refresh,100);

    this.itemListener = ()=>{
      // console.log('--------')
      refresh();
      // this.$refs.scroll.refresh();
    }
    this.$bus.$on('itemImageLoad',this.itemListener);
  }
}
