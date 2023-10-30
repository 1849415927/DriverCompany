<template>
  <div>
    <el-row style="margin-top: 1%;margin-bottom: 2%;margin-left: 1%">
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
        label="ID"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
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
        width="280"
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
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="danger" size="mini" :disabled="scope.row.state!=='已提交'?true:false" @click="handleClick(scope.row)">审批</el-button>
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
    axios.get('http://58.87.91.31:8088/expense/selectList').then(function(resp) {
      console.log(resp)
      _this.tableData = resp.data
    })
  },
  methods: {
    update() {
      this.$router.push('ExpenseClaim')
    },
    handleClick(row) {
      this.$router.push({
        path: 'ExpenseApproval',
        query: {
          id: row.id
        }
      })
      console.log(row)
    }
  }
}
</script>
