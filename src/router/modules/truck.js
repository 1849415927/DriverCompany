import Layout from '@/layout'

const truckRouter = {
  path: '/TruckList',
  name: '卡车信息管理',
  component: Layout,
  meta: {
    title: '卡车信息管理',
    icon: 'el-icon-truck'
  },
  children: [
    {
      path: '/TruckList',
      name: '卡车信息列表',
      component: () => import('@/views/driverCompany/Truck/TruckList'),
      meta: {
        title: '卡车信息列表'
      }
    },
    {
      path: '/TruckAdd',
      name: '增加卡车信息',
      // hidden: true,
      component: () => import('@/views/driverCompany/Truck/TruckAdd'),
      meta: {
        title: '增加卡车信息'
      }
    },
    {
      path: '/TruckUpdate',
      name: '修改卡车信息',
      hidden: true,
      component: () => import('@/views/driverCompany/Truck/TruckUpdate'),
      meta: {
        title: '修改卡车信息'
      }
    }
  ]
}
export default truckRouter
