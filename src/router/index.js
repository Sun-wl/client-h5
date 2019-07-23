//vue 路由配置
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export default new Router({
  routes: [
    //路由为懒加载模式
    { //空白页 缓存
      path: '/blankpage',
      name: 'blankpage',
      component: resolve => require(['@/components/blankpage'], resolve)
    },
    {  //设置
      path: '/setting',
      name: 'setting',
      component: resolve => require(['@/components/xike/settings/setting'], resolve)
    },
    {  // 设置 邀请码
      path: '/setting/inviteCode',
      name: 'inviteCode',
      component: resolve => require(['@/components/xike/settings/inviteCode'], resolve)
    },
    {  //设置  法律条款
      path: '/setting/legalProvision',
      name: 'legalProvision',
      component: resolve => require(['@/components/xike/settings/legalProvision'], resolve)
    },
    { //设置  注册协议
      path: '/setting/legalProvision/registerProvision/:name',
      name: 'registerProvision',
      component: resolve => require(['@/components/xike/settings/registerProvision'], resolve)
    },
    { //设置  服务协议
      path: '/setting/legalProvision/serviceProvision/:name',
      name: 'serviceProvision',
      component: resolve => require(['@/components/xike/settings/serviceProvision'], resolve)
    },
    { //设置  关于我们
      path: '/setting/aboutUs',
      name: 'aboutUs',
      component: resolve => require(['@/components/xike/settings/aboutUs'], resolve)
    },
    { //设置  关于我们  反馈
      path: '/setting/aboutUs/feedback',
      name: 'feedback',
      component: resolve => require(['@/components/xike/settings/feedback'], resolve)
    },
    { //运费标准
      path: '/freight',
      name: 'freight',
      component: resolve => require(['@/components/xike/freight'], resolve)
    },
    { //消息
      path: '/message',
      name: 'message',
      component: resolve => require(['@/components/xike/message'], resolve)
    },
    { //账单明细
      path: '/bill',
      name: 'bill',
      component: resolve => require(['@/components/xike/bill'], resolve)
    },
    { //订单进度
      path: '/orderProgress/:orderNo',
      name: 'orderProgress',
      component: resolve => require(['@/components/xike/orderProgress'], resolve)
    },
    { //订单详情
      path: '/details',
      name: 'details',
      component: resolve => require(['@/components/gidoorRunner/orderDetails'], resolve)
    },
    { //我的钱包
      path: '/wallet',
      name: 'wallet',
      component: resolve => require(['@/components/gidoorRunner/wallet'], resolve)
    },
    { //入团申请-选择公司
      path: '/teamApply1/:type',
      name: 'teamApply1',
      component: resolve => require(['@/components/gidoorRunner/myTeam/teamApply1'], resolve)
    },
    { //入团申请-选择公司
      path: '/teamApply2/:companyName/:companyId',
      name: 'teamApply2',
      component: resolve => require(['@/components/gidoorRunner/myTeam/teamApply2'], resolve)
    },
    { //入团申请-选择公司
      path: '/teamApply3/:companyName',
      name: 'teamApply3',
      component: resolve => require(['@/components/gidoorRunner/myTeam/teamApply3'], resolve)
    },
    { //入团申请-选择公司
      path: '/teamApply4',
      name: 'teamApply4',
      component: resolve => require(['@/components/gidoorRunner/myTeam/teamApply4'], resolve)
    },
    { //入团申请-选择公司
      path: '/teamInfo',
      name: 'teamInfo',
      component: resolve => require(['@/components/gidoorRunner/myTeam/teamInfo'], resolve)
    }
  ]
})
