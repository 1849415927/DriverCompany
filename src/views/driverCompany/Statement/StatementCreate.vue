<template>
  <el-form ref="ruleForm" style="margin-top: 2%" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
    <el-row>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="date" label="报销年月">
          <el-date-picker v-model="ruleForm.date" type="month" placeholder="请选择年月" @change="dataChange" />
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-button type="primary" @click="submitForm('ruleForm')">生成报表</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  props: {
    value: {
      required: true
    }
  },
  data() {
    return {
      ruleForm: {
        date: ''
      },
      rules: {
        date: [
          { required: true, message: '请选择年月', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      // _this表示当前vue对象
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://58.87.91.31:8088/statement/insertStatementList', _this.ruleForm).then(function(resp) {
            console.log(resp)
            if (resp.data === 0) {
              _this.$message({
                message: '没有查询到数据',
                type: 'warning'
              })
            } else {
              _this.$message({
                message: '生成成功',
                type: 'success'
              })
              // 回跳查询页面
              _this.$router.push('/StatementList')
            }
          })
        } else {
          return false
        }
      })
    },
    // 格式化日期 'YYYY-MM'
    dataChange() {
      this.ruleForm.date = moment(this.ruleForm.date).format('YYYY-MM')
      return this.ruleForm.date
    }
  }
}
</script>
