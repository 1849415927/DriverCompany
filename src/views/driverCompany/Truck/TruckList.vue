<template>
  <div>
    <el-row style="margin-top: 1%;margin-bottom: 2%">
      <el-col :span="15">
        <el-input v-model="license" type="text" placeholder="请输入车牌号" style="width: 40%">
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
      <el-table-column fixed align="center" prop="id" label="ID" width="100" />

      <el-table-column align="center" prop="license" label="车牌号" width="300" />

      <el-table-column align="center" fixed="left" prop="status" label="状态" width="150">
        <template scope="scope">
          {{ scope.row.status === '0' ? '正常': '' }}
          {{ scope.row.status === '1' ? '维修': '' }}
          {{ scope.row.status === '2' ? '报废': '' }}
        </template>
      </el-table-column>

      <el-table-column align="center" fixed="right" label="操作" width="300">

        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleClick(scope.row)">修改</el-button>
          <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
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
import { selectByLike } from '@/api/driver'

export default {
  inject: ['reload'],

  data() {
    return {
      license: '',
      pageSize: '',
      total: '',
      tableData: ''
    }
  },
  created() {
    const _this = this
    axios.get('http://localhost:8088/truck/pagelist/1/5').then(function(resp) {
      console.log(resp)
      _this.tableData = resp.data.records
      _this.pageSize = resp.data.size
      _this.total = resp.data.total
    })
  },
  methods: {
    refresh() {
      const _this = this
      if (_this.license === '') {
        // 回跳查询页
        axios.get('http://localhost:8088/truck/pagelist/1/5').then(function(resp) {
          console.log(resp)
          _this.tableData = resp.data.records
          _this.pageSize = resp.data.size
          _this.total = resp.data.total
        })
      } else {
        axios.get('http://localhost:8088/truck/getFindByLicense/' + _this.license).then(function(resp) {
          console.log(resp)
          _this.tableData = resp.data
        })
      }
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
    page(currentPage) {
      const _this = this
      axios.get('http://localhost:8088/truck/pagelist/' + currentPage + '/5').then(function(resp) {
        _this.tableData = resp.data.records
        _this.pageSize = resp.data.size
        _this.total = resp.data.total
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
