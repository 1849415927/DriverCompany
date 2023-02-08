import Layout from '@/layout'

const permissionRouter =
  {
    path: '/PermissionList',
    name: '权限设置',
    component: Layout,
    meta: {
      title: '权限设置',
      icon: 'el-icon-menu'
    },
    children: [
      {
        path: '/PermissionList',
        name: '角色列表',
        component: () => import('@/views/driverCompany/Permission/PermissionList'),
        meta: {
          title: '角色列表'
        }
      },
      {
        path: '/PermissionAdd',
        name: '增添角色',
        // hidden: true,
        component: () => import('@/views/driverCompany/Permission/PermissionAdd'),
        meta: {
          title: '增添角色'
        }
      },
      {
        path: '/PermissionUpdate',
        name: '修改角色',
        hidden: true,
        component: () => import('@/views/driverCompany/Permission/PermissionUpdate'),
        meta: {
          title: '修改角色'
        }
      }
    ]
  }
export default permissionRouter
