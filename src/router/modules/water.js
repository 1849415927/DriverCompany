import Layout from '@/layout'

const waterRouter = {
  path: '/',
  name: '水印',
  redirect: '/watermark',
  hidden: true,
  component: Layout,
  meta: {
    title: '水印',
    icon: 'el-icon-user'
  },
  children: [
    {
      path: '/watermark',
      name: '水印',
      component: () => import('@/views/libo_220725/watermark'),
      meta: {
        title: '水印'
      }
    }
    ],

}
export default waterRouter
