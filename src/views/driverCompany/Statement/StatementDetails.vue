<template>
  <div>
    <el-row style="margin-top: 1%;margin-bottom: 2%">
      <h3 style="margin-left: 45%">{{ this.$route.query.date.slice(0,4) +'年'+this.$route.query.date.slice(5) +'月' }}薪酬报表</h3>
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
        width="250"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="driver"
        label="姓名"
        width="200"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="ordercount"
        label="订单数"
        width="200"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="orderprice"
        label="订单薪酬"
        width="200"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="expensetotal"
        label="报销总金额"
        width="200"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="pricetotal"
        label="薪酬合计"
        width="200"
      />
    </el-table>
    <b style="margin-left: 8%">总计</b>
    <b style="margin-left: 32%">{{ ordercount() }}</b>
    <b style="margin-left: 14%">{{ orderprice() }}</b>
    <b style="margin-left: 11%">{{ expensetotal() }}</b>
    <b style="margin-left: 11%">{{ pricetotal() }}</b>
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
    axios.post('http://58.87.91.31:8088/statement/statementList/' + _this.$route.query.date).then(function(resp) {
      console.log(resp)
      _this.tableData = resp.data
    })
  },
  methods: {
    ordercount() {
      let ordercount = 0
      for (let i = 0; i < this.tableData.length; i++) {
        ordercount += this.tableData[i].ordercount
      }
      return ordercount
    },
    orderprice() {
      let orderprice = 0
      for (let i = 0; i < this.tableData.length; i++) {
        orderprice += this.tableData[i].orderprice
      }
      return orderprice.toFixed(2)
    },
    expensetotal() {
      let expensetotal = 0
      for (let i = 0; i < this.tableData.length; i++) {
        expensetotal += this.tableData[i].expensetotal
      }
      return expensetotal.toFixed(2)
    },
    pricetotal() {
      let pricetotal = 0
      for (let i = 0; i < this.tableData.length; i++) {
        pricetotal += this.tableData[i].pricetotal
      }
      return pricetotal.toFixed(2)
    }
  }
}
</script>
