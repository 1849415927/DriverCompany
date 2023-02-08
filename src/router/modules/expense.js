import Layout from '@/layout'

const expenseRouter =
  {
    path: '/ExpenseClaim',
    name: '报销模块',
    component: Layout,
    meta: {
      title: '报销模块',
      icon: 'el-icon-money'
    },
    children: [
      {
        path: '/ExpenseClaim',
        name: '报销申请',
        component: () => import('@/views/driverCompany/Expense/ExpenseClaim'),
        meta: {
          title: '报销申请'
        }
      },
      {
        path: '/ExpenseApprovalList',
        name: '报销审批列表',
        component: () => import('@/views/driverCompany/Expense/ExpenseApprovalList'),
        meta: {
          title: '报销审批列表'
        }
      }
    ]
  }
export default expenseRouter
