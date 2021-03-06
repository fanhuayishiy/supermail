import Toast from "@/components/common/toast/Toast";

const obj = {}

obj.install = function (Vue){
  // Vue.extend(Toast)

  //1.创建组件构造器
  const  tostContrustor = Vue.extend(Toast)

  //2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new tostContrustor()

  //3.将组件对象，手动挂载到某一元素上
  toast.$mount(document.createElement('div'))

  //4.toast.$el 对应的就是div
  document.body.appendChild(toast.$el)

  // console.log('执行了obj的install函数',Vue)



  Vue.prototype.$toast = toast;
}

export  default obj
