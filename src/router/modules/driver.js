import Layout from '@/layout'

const driverRouter = {
  path: '/',
  name: '司机信息管理',
  redirect: '/DriverList',
  component: Layout,
  meta: {
    title: '司机信息管理',
    icon: 'el-icon-user'
  },
  children: [
    {
      path: '/DriverList',
      name: '司机信息列表',
      component: () => import('@/views/driverCompany/Driver/DriverList'),
      meta: {
        title: '司机信息列表'
      }
    },
    {
      path: '/DriverAdd',
      name: '增加司机信息',
      // hidden: true,
      component: () => import('@/views/driverCompany/Driver/DriverAdd'),
      meta: {
        title: '增加司机信息'
      }
    },
    {
      path: '/DriverUpdate',
      name: '修改司机信息',
      hidden: true,
      component: () => import('@/views/driverCompany/Driver/DriverUpdate'),
      meta: {
        title: '修改司机信息'
      }
    },
    {
      path: '/DriverDetails',
      name: '查看司机信息',
      hidden: true,
      component: () => import('@/views/driverCompany/Driver/DriverDetails'),
      meta: {
        title: '查看司机信息'
      }
    }
  ]

}
export default driverRouter
