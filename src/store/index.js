import Vue from "vue";
import VueX from 'vuex'

import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

Vue.use(VueX)
const state = {
  cartList: []
}



const  store = new VueX.Store({
  state,
  getters,
  mutations,
  actions
})


export default store;
