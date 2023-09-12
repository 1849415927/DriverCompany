<template>

  <div class="page">
    <div ref="content" style="width: 500px;height: 500px;border: 2px solid red;">
      <br>
      水印原理：<br><br>
      创建canvas元素<br><br>
      给canvas绘制文本，填充样式旋转角度、文字字体颜色等<br><br>
      将绘制好的canvas元素转换成base64格式的图片<br><br>
      动态创建一个div标签，相对位置属性为fixed，宽高设置为屏幕的可见大小，将上一步canvas转换的图片设置为div的背景图片并平铺满整个内部<br><br>
      最后将动态创建的div添加到body中sourceBody是添加的位置
    </div>
  </div>
</template>

<script>
import Watermark from '@/api/watermark'
export default {
  //初始化加载
  mounted() {
    // Watermark.set(str1,str2,str3,sourceBody)
    // str1,str2,str3: 水印内容   sourceBody: 水印容器。若不传，则全屏水印，若传，则指定容器。
    Watermark.set('username',"password","",this.$refs.content);
  },
}
</script>

<style scoped>
.page{
  width: 100%;
  height: 100%;
}
</style>
