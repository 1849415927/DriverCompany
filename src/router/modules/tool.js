export default {
  //tool.js
  addWaterMark() {
    const strArr = `${localStorage.getItem(
      "loginUserName"
    )}${localStorage
      .getItem("logunUserPhone")
      .slice(7, 11)}[${new Date()}]`;
    let ctx = document.createElement("canvas");
    ctx.width = 250;
    ctx.height = 100;
    ctx.style.display = "none";
    let cans = ctx.getContext("2d");
    cans.rotate((-20 * Math.PI) / 180);
    cans.font = "12px Microsoft YaHei";
    cans.fillStyle = "rgba(17, 17, 17, 0.20)";
    cans.textAlign = "left";
    cans.textBaseline = "Middle";
    cans.fillText(strArr, 0, 100);
    cans.save();
    return ctx.toDataURL();
  }
}
