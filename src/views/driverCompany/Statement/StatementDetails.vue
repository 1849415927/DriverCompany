<template>
  <div>
    <el-row style="margin-top: 1%;margin-bottom: 2%">
      <h3 style="margin-left: 45%">2022年4月薪酬报表</h3>
    </el-row>

    <el-table
      :data="tableData"
      style="width: 100%;height: 100%;"
    >
      <el-table-column
        align="center"
        fixed="left"
        prop="idcard"
        label="驾驶证号"
        width="300"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="name"
        label="姓名"
        width="200"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="orders"
        label="订单数"
        width="200"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="orderPrice"
        label="订单薪酬"
        width="300"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="expensePrice"
        label="报销总金额"
        width="300"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="totalPrice"
        label="薪酬合计"
        width="300"
      />
    </el-table>
    <b style="margin-left: 8%">总计</b>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      tableData: ''
    }
  },
  created() {
    const _this = this
    axios.get('http://localhost:8088/statement/selectList').then(function(resp) {
      console.log(resp)
      _this.tableData = resp.data
    })
  },
  methods: {
  }
}
</script>
