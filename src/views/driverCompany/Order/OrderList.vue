<template>
  <div>
    <el-row style="margin-top: 1%;margin-bottom: 2%;margin-left: 1%">
      <el-button type="primary" icon="el-icon-plus" @click="update">新增</el-button>

      <el-input v-model="data.requestBody.driver" type="text" placeholder="请输入送货司机姓名" style="width: 20%;margin-left: 150px">
        <el-button slot="append" icon="el-icon-search" @click="refresh" />
      </el-input>
      <el-input v-model="data.requestBody.truck" type="text" placeholder="请输入车牌号" style="width: 20%;margin-left: 100px">
        <el-button slot="append" icon="el-icon-search" @click="refresh" />
      </el-input>

    </el-row>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        fixed
        align="center"
        label="订单号"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="distance"
        label="送货距离"
        width="160"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="driver"
        label="送货司机"
        width="150"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="truck"
        label="送货卡车"
        width="150"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="time"
        label="送货时间"
        width="150"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="date"
        label="送货日期"
        width="330"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="address"
        label="送货地址"
        width="150"
      />
      <el-table-column align="center" prop="isCompensate" label="是否有额" width="150">
        <template scope="scope">
          {{ scope.row.isCompensate === '0' ? '是': '' }}
          {{ scope.row.isCompensate === '1' ? '否': '' }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="compensate"
        label="额外奖励"
        width="150"
      />
      <el-table-column
        align="center"
        prop="prices"
        label="总价"
        width="150"
      />

      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="300"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="detailsClick(scope.row)">查看详情</el-button>
          <el-button type="primary" size="mini" @click="handleClick(scope.row)">修改</el-button>
          <el-button type="danger" size="mini" @click="del(scope.row)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="data.pageSize"
      :total="total"
      @current-change="page"
      @size-change="handleSizeChange"
    />
    <!--    </el-form>-->
  </div>
</template>

<script>
import axios from 'axios'
import { OrderList } from '@/api/order'

export default {
  inject: ['reload'],

  data() {
    return {
      data: {
        driver: '',
        truck: '',
        pageSize: 10,
        pageNo: 1,
        requestBody: {
          driver: '',
          truck: ''
        }
      },
      total: 0,
      tableData: []
    }
  },
  created() {
    // const _this = this
    // axios.get('http://58.87.91.31:8088/order/pagelist/1/5').then(function(resp) {
    //   console.log(resp)
    //   _this.tableData = resp.data.records
    //   _this.pageSize = resp.data.size
    //   _this.total = resp.data.total
    // })
    this.refresh()
  },
  methods: {
    refresh() {
      OrderList(this.data).then(res => {
        this.tableData = res.data.orderPage.records
        this.total = res.data.orderPage.total
      })
    },
    update() {
      this.$router.push('OrderAdd')
    },
    detailsClick(row) {
      this.$router.push({
        path: 'OrderDetails',
        query: {
          id: row.orderId
        }
      })
      console.log(row)
    },
    handleClick(row) {
      this.$router.push({
        path: 'OrderUpdate',
        query: {
          id: row.orderId
        }
      })
      console.log(row)
    },
    // 条数
    handleSizeChange(val) {
      this.data.pageSize = val
      OrderList(this.data).then(res => {
        this.tableData = res.data.orderPage.records
      })
    },
    // 页数
    page(val) {
      // const _this = this
      // axios.get('http://58.87.91.31:8088/order/pagelist/' + currentPage + '/5').then(function(resp) {
      //   _this.tableData = resp.data.records
      //   _this.pageSize = resp.data.size
      //   _this.total = resp.data.total
      // })
      this.data.pageNo = val
      OrderList(this.data).then(res => {
        this.tableData = res.data.orderPage.records
      })
    },
    async del(row) {
      const _this = this
      const confirmResult = await this.$confirm('是否确认取消该订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消操作')
      }
      axios.delete('http://58.87.91.31:8088/order/deleteById/' + row.orderId).then(function(resp) {
        _this.$message('取消订单成功')
        // 回跳查询页
        _this.$router.push('/OrderList')
        window.location.reload()
      })
    }
  }
}
</script>
