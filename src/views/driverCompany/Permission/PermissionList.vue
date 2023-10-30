<template>
  <div>
    <el-row style="margin-top: 1%;margin-bottom: 2%;margin-left: 1%">
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
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="name" label="角色名" width="300" />

      <el-table-column align="center" prop="code" label="角色code" width="300" />

      <el-table-column align="center" fixed="right" label="操作" width="500">

        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleClick(scope.row)">修改</el-button>
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
    axios.get('http://58.87.91.31:8088/permission/selectList').then(function(resp) {
      console.log(resp)
      _this.tableData = resp.data
    })
  },
  methods: {
    update() {
      this.$router.push('PermissionAdd')
    },
    handleClick(row) {
      this.$router.push({
        path: 'PermissionUpdate',
        query: {
          id: row.id
        }
      })
      console.log(row)
    },
    async del(row) {
      const _this = this
      const confirmResult = await this.$confirm('是否确认删除该角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      axios.delete('http://58.87.91.31:8088/permission/deleteById/' + row.id).then(function(resp) {
        _this.$message('删除成功')
        // 回跳查询页
        _this.$router.push('/PermissionList')
        window.location.reload()
      })
    }
  }
}
</script>
