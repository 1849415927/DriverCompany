<template>
  <div>
    <el-row style="margin-top: 1%;margin-bottom: 2%">
      <el-button type="primary" icon="el-icon-plus" @click="add">生成报表</el-button>
    </el-row>

    <el-table
      :data="tableData"
      border
      style="width: 100%;height: 100%"
    >
      <el-table-column
        fixed
        align="center"
        prop="id"
        label="ID"
        width="300"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="year"
        label="生成年份"
        width="300"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="month"
        label="生成月份"
        width="300"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="orders"
        label="订单数"
        width="150"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="totalPrice"
        label="薪酬合计"
        width="150"
      />
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="detailsClick(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    add(row) {
      this.$router.push({
        path: 'StatementCreate',
        query: {
          id: row.id
        }
      })
    },
    detailsClick(row) {
      this.$router.push({
        path: 'StatementDetails',
        query: {
          id: row.id
        }
      })
    }
  }
}
</script>
