import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import tema from '@/components/tema'
import becomevip from '@/components/becomevip'
import college from '@/components/college'
import mine from '@/components/mine'
import shop from '@/components/shop'
import description from '@/components/description'
import order from '@/components/order'
import address from '@/components/address'
import payment from '@/components/payment'
import newaddress from '@/components/newaddress'
import invitefriends from '@/components/invitefriends'
import ranking from '@/components/ranking'
import profit from '@/components/profit'
import dailydetails from '@/components/dailydetails'
import magazine from '@/components/magazine'
import abc from '@/components/abc'
import withdrawal from '@/components/withdrawal'
import la from '@/components/la'
import merchant from '@/components/merchant'
import ness from '@/components/ness'
import merdata from '@/components/merdata'
import logon from '@/components/logon'
import sign from '@/components/sign'
import filter from '@/components/filter'
import doot from '@/components/doot'
import doots from '@/components/doots'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/tema',
    name: 'tema',
    component: tema
  },
  {
    path: '/becomevip',
    name: 'becomevip',
    component: becomevip
  },
  {
    path: '/college',
    name: 'college',
    component: college
  },
  {
    path: '/mine',
    name: 'mine',
    component: mine
  },
  {
    path: '/shop',
    name: 'shop',
    component: shop
  },
  {
    path: '/description',
    name: 'description',
    component: description
  },
  {
    path: '/order',
    name: 'order',
    component: order
  },
  {
    path: '/address',
    name: 'address',
    component: address
  },
  {
    path: '/payment',
    name: 'payment',
    component: payment
  },
  {
    path: '/newaddress',
    name: 'newaddress',
    component: newaddress
  },
  {
    path: '/invitefriends',
    name: 'invitefriends',
    component: invitefriends
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: ranking
  },
  {
    path: '/profit',
    name: 'profit',
    component: profit
  },
  {
    path: '/dailydetails',
    name: 'dailydetails',
    component: dailydetails
  },
  {
    path: '/magazine',
    name: 'magazine',
    component: magazine
  },
  {
    path: '/abc',
    name: 'abc',
    component: abc
  },
  {
    path: '/withdrawal',
    name: 'withdrawal',
    component: withdrawal
  },
  {
    path: '/la',
    name: 'la',
    component: la
  },
  {
    path: '/merchant',
    name: 'merchant',
    component: merchant
  },
  {
    path: '/ness',
    name: 'ness',
    component: ness
  },
  {
    path: '/merdata',
    name: 'merdata',
    component: merdata
  },
  {
    path: '/logon',
    name: 'logon',
    component: logon
  },
  {
    path: '/sign',
    name: 'sign',
    component: sign
  },
  {
    path: '/filter',
    name: 'filter',
    component: filter
  },
  {
    path: '/doot',
    name: 'doot',
    component: doot
  },
  {
    path: '/doots',
    name: 'doots',
    component: doots
  }
  ]
})
