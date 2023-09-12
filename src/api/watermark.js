let watermark = {}

let setWatermark = (str1,str2,str3,sourceBody) => {
  let id = '1.23452384164.123412415'
  // let id = 'watermark_fjq_' + parseInt(Math.random() * 100000);
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }
  //创建一个画布
  let can = document.createElement('canvas')
  //设置画布的长宽
  can.width = 400; //设置水印之间的左右间距
  can.height = 200; //设置水印之间的上下间距

  let cans = can.getContext('2d')
  //旋转角度
  cans.rotate(-15 * Math.PI / 180)
  cans.font = '15px Vedana'
  //设置填充绘画的颜色、渐变或者模式
  //cans.fillStyle = 'rgba(200, 200, 200, 0.40)'
  cans.fillStyle = '#666666'
  //设置文本内容的当前对齐方式
  cans.textAlign = 'center'
  //设置在绘制文本时使用的当前文本基线
  cans.textBaseline = 'Middle'
  //在画布上绘制填色的文本（输出的文本，开始绘制文本的x坐标位置，开始绘制文本的Y坐标位置）
  cans.fillText(str1, can.width / 2, can.height )
  cans.fillText(str2, can.width / 2, can.height+22 )
  cans.fillText(str3, can.width / 2, can.height+44 )

  //设置插入div样式
  let water_div = document.createElement('div');
  water_div.id = id;
  water_div.style.pointerEvents = 'none';
  water_div.style.overflow = 'hidden';
  water_div.style.opacity = '0.3'
  water_div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
  if (sourceBody) {
    sourceBody.style.position = 'relative';
    water_div.style.width = '100%';
    water_div.style.height = '100%';
    water_div.style.position = 'absolute';
    water_div.style.top = '0';
    water_div.style.left = '0';
    sourceBody.appendChild(water_div);
  } else {
    water_div.style.top = '3px';
    water_div.style.left = '0px';
    water_div.style.position = 'fixed';
    water_div.style.zIndex = '9999';
    water_div.style.width = document.documentElement.clientWidth + 'px';
    water_div.style.height = document.documentElement.clientHeight + 'px';
    document.body.appendChild(water_div);
  }
  return id
}

//添加水印方法
watermark.set = (str1,str2,str3,sourceBody) => {
  let id = setWatermark(str1,str2,str3,sourceBody)
  setInterval(() => {
    if (document.getElementById(id) === null) {
      id = setWatermark(str1,str2,str3,sourceBody)
    }
  }, 2000)
  window.onresize = () => {
    setWatermark(str)
  }
}

//添加水印方法
watermark.set = (str1,str2,str3,sourceBody) => {
  let id = setWatermark(str1,str2,str3,sourceBody)
  if (document.getElementById(id) === null) {
    id = setWatermark(str1,str2,str3,sourceBody)
  }
}


//添加水印方法
watermark.remove = () => {
  let id = '1.23452384164.123412415'
  if (document.getElementById(id) !== null) {
    //document.body.removeChild(document.getElementById(id))
    const div = document.getElementById(id)
    div.style.display = 'none'
  }
}


export default watermark
