import {ADD_COUNTER ,ADD_TO_CART} from "@/store/mutation-types";
export default {
  addCart(context, payload) {
    // let oldProduct = null;
    // for (let item of context.state.cartList){
    //   console.log(item.iid , payload.iid)
    //   if(item.iid === payload.iid){
    //     oldProduct = item;
    //   }
    // }

    let oldProduct =context.state.cartList.find(item => item.iid === payload.iid);


    if(oldProduct){
      context.commit(ADD_COUNTER,oldProduct)
    }else{
      payload.count =1
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART,payload)
    }


  }
}
