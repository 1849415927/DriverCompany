import Layout from '@/layout'

const statementRouter =
  {
    path: '/StatementList',
    name: '月度报表',
    component: Layout,
    meta: {
      title: '月度报表',
      icon: 'el-icon-document'
    },
    children: [
      {
        path: '/StatementList',
        name: '报表列表',
        component: () => import('@/views/driverCompany/Statement/StatementList'),
        meta: {
          title: '报表列表'
        }
      },
      {
        path: '/StatementCreate',
        name: '生成报表',
        component: () => import('@/views/driverCompany/Statement/StatementCreate'),
        meta: {
          title: '生成报表'
        }
      },
      {
        path: '/StatementDetails',
        name: '报表详情',
        hidden: true,
        component: () => import('@/views/driverCompany/Statement/StatementDetails'),
        meta: {
          title: '报表详情'
        }
      }
    ]
  }
export default statementRouter

