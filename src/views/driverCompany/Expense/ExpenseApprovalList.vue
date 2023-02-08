<template>
  <div>
    <el-row style="margin-top: 1%;margin-bottom: 2%">
      <el-button type="primary" icon="el-icon-plus" @click="update">报销申请</el-button>
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
        width="100"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="proposer"
        label="申请人"
        width="150"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="type"
        label="报销类型"
        width="150"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="price"
        label="报销金额"
        width="150"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="month"
        label="报销月份"
        width="150"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="datetime"
        label="申请时间"
        width="330"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="state"
        label="状态"
        width="150"
      />
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
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
    axios.get('http://localhost:8088/expense/selectList').then(function(resp) {
      console.log(resp)
      _this.tableData = resp.data
    })
  },
  methods: {
    update() {
      this.$router.push('ExpenseClaim')
    },
    async del(row) {
      const _this = this
      const confirmResult = await this.$confirm('是否确认删除该报销?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      axios.delete('http://localhost:8088/expense/deleteById/' + row.id).then(function(resp) {
        _this.$message('删除成功')
        // 回跳查询页
        _this.$router.push('/ExpenseApprovalList')
        window.location.reload()
      })
    }
  }
}
</script>
