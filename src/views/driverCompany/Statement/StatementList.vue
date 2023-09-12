<template>
  <div>
    <el-row style="margin-top: 1%;margin-bottom: 2%;margin-left: 1%">
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
        label="ID"
        width="150"
      >
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="left"
        prop="year"
        label="生成年份"
        width="200"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="month"
        label="生成月份"
        width="200"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="number"
        label="司机人数"
        width="200"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="totalprices"
        label="应付金额"
        width="200"
      />
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="300"
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
    axios.get('http://localhost:8088/statement/selectAll').then(function(resp) {
      console.log(resp)
      _this.tableData = resp.data
      _this.tableData.forEach(function(item) {
        item.year = item.date.substring(0, 4)
        item.month = item.date.slice(5)
      })
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
          id: row.id,
          date: row.date
        }
      })
    }
  }
}
</script>
