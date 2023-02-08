<template>
  <div>
    <el-row style="margin-top: 1%;margin-bottom: 2%">
      <el-button type="primary" icon="el-icon-plus" @click="update">新增</el-button>
    </el-row>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        fixed
        align="center"
        prop="orderId"
        label="订单号"
        width="100"
      />
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
        width="320"
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
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      @current-change="page"
    />
    <!--    </el-form>-->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  inject: ['reload'],

  data() {
    return {
      pageSize: '',
      total: '',
      tableData: ''
    }
  },
  created() {
    const _this = this
    axios.get('http://localhost:8088/order/pagelist/1/5').then(function(resp) {
      console.log(resp)
      _this.tableData = resp.data.records
      _this.pageSize = resp.data.size
      _this.total = resp.data.total
    })
  },
  methods: {
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
    page(currentPage) {
      const _this = this
      axios.get('http://localhost:8088/order/pagelist/' + currentPage + '/5').then(function(resp) {
        _this.tableData = resp.data.records
        _this.pageSize = resp.data.size
        _this.total = resp.data.total
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
      axios.delete('http://localhost:8088/order/deleteById/' + row.orderId).then(function(resp) {
        _this.$message('取消订单成功')
        // 回跳查询页
        _this.$router.push('/OrderList')
        window.location.reload()
      })
    }
  }
}
</script>
