import Layout from '@/layout'

const luoJiaoyueRouter = {
  path: '/',
  name: '礼簙信息管理',
  redirect: '/LiboList',
  component: Layout,
  meta: {
    title: '礼簙信息管理',
    icon: 'el-icon-user'
  },
  children: [
    {
      path: '/LiboList',
      name: '礼簙信息列表',
      component: () => import('@/views/libo_220725/luoJiaoyue/LiboList'),
      meta: {
        title: '礼簙信息列表'
      }
    },
    {
      path: '/LiboAdd',
      name: '增加礼簙信息',
      hidden: true,
      component: () => import('@/views/libo_220725/luoJiaoyue/LiboAdd'),
      meta: {
        title: '增加礼簙信息'
      }
    },
    {
      path: '/LiboUpdate',
      name: '修改礼簙信息',
      hidden: true,
      component: () => import('@/views/libo_220725/luoJiaoyue/LiboUpdate'),
      meta: {
        title: '修改礼簙信息'
      }
    },
    {
      path: '/LiboDetails',
      name: '查看礼簙信息',
      hidden: true,
      component: () => import('@/views/libo_220725/luoJiaoyue/LiboDetails'),
      meta: {
        title: '查看礼簙信息'
      }
    }
  ]

}
export default luoJiaoyueRouter
