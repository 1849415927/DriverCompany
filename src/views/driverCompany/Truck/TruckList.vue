<template>
  <div>
    <el-row style="margin-top: 1%;margin-bottom: 2%;margin-left: 1%">
      <el-col :span="15">
        <el-input v-model="data.requestBody.license" type="text" placeholder="请输入车牌号" style="width: 40%">
          <el-button slot="append" icon="el-icon-search" @click="refresh" />
        </el-input>
      </el-col>
      <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
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
        label="ID"
        width="200"
      >
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="license" label="车牌号" width="300" />

      <el-table-column align="center" fixed="left" prop="status" label="状态" width="200">
        <template scope="scope">
          {{ scope.row.status === '0' ? '正常': '' }}
          {{ scope.row.status === '1' ? '维修': '' }}
          {{ scope.row.status === '2' ? '报废': '' }}
        </template>
      </el-table-column>

      <el-table-column align="center" fixed="right" label="操作" width="500">

        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleClick(scope.row)">修改</el-button>
          <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
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
import { TruckList } from '@/api/truck'
import { DriverList } from '@/api/driver'

export default {
  inject: ['reload'],

  data() {
    return {
      data: {
        license: '',
        pageSize: 10,
        pageNo: 1,
        requestBody: {
          license: ''
        }
      },
      total: 0,
      tableData: []
    }
  },
  created() {
    // const _this = this
    // axios.get('http://localhost:8088/truck/pagelist/1/5').then(function(resp) {
    //   console.log(resp)
    //   _this.tableData = resp.data.records
    //   _this.pageSize = resp.data.size
    //   _this.total = resp.data.total
    // })
    this.refresh()
  },
  methods: {
    refresh() {
      // const _this = this
      // if (_this.license === '') {
      //   // 回跳查询页
      //   axios.get('http://localhost:8088/truck/pagelist/1/5').then(function(resp) {
      //     console.log(resp)
      //     _this.tableData = resp.data.records
      //     _this.pageSize = resp.data.size
      //     _this.total = resp.data.total
      //   })
      // } else {
      //   axios.get('http://localhost:8088/truck/getFindByLicense/' + _this.license).then(function(resp) {
      //     console.log(resp)
      //     _this.tableData = resp.data
      //   })
      // }
      TruckList(this.data).then(res => {
        this.tableData = res.data.truckPage.records
        this.total = res.data.truckPage.total
      })
    },
    update() {
      this.$router.push('TruckAdd')
    },
    handleClick(row) {
      this.$router.push({
        path: 'TruckUpdate',
        query: {
          id: row.id
        }
      })
      console.log(row)
    },
    // 条数
    handleSizeChange(val) {
      this.data.pageSize = val
      DriverList(this.data).then(res => {
        this.tableData = res.data.truckPage.records
      })
    },
    // 页数
    page(val) {
      // const _this = this
      // axios.get('http://localhost:8088/truck/pagelist/' + currentPage + '/5').then(function(resp) {
      //   _this.tableData = resp.data.records
      //   _this.pageSize = resp.data.size
      //   _this.total = resp.data.total
      // })
      this.data.pageNo = val
      DriverList(this.data).then(res => {
        this.tableData = res.data.truckPage.records
      })
    },
    async del(row) {
      const _this = this
      const confirmResult = await this.$confirm('是否确认删除该司机?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      axios.delete('http://localhost:8088/truck/deleteById/' + row.id).then(function(resp) {
        _this.$message('删除成功')
        // 回跳查询页
        _this.$router.push('/TruckList')
        window.location.reload()
      })
    }
  }
}
</script>
