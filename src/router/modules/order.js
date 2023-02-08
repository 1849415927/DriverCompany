import Layout from '@/layout'

const orderRouter =
    {
      path: '/OrderList',
      name: '订单信息管理',
      component: Layout,
      meta: {
        title: '订单信息管理',
        icon: 'el-icon-edit-outline'
      },
      children: [
        {
          path: '/OrderList',
          name: '订单信息列表',
          component: () => import('@/views/driverCompany/Order/OrderList'),
          meta: {
            title: '订单信息列表'
          }
        },
        {
          path: '/OrderAdd',
          name: '增加订单信息',
          // hidden: true,
          component: () => import('@/views/driverCompany/Order/OrderAdd'),
          meta: {
            title: '增加订单信息'
          }
        },
        {
          path: '/OrderUpdate',
          name: '修改订单信息',
          hidden: true,
          component: () => import('@/views/driverCompany/Order/OrderUpdate'),
          meta: {
            title: '修改订单信息'
          }
        },
        {
          path: '/OrderDetails',
          name: '查看订单信息',
          hidden: true,
          component: () => import('@/views/driverCompany/Order/OrderDetails'),
          meta: {
            title: '查看订单信息'
          }
        }
      ]
    }
export default orderRouter
