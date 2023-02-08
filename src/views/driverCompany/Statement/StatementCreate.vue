<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
    <el-row>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="year" label="报销年份">
          <el-date-picker v-model="ruleForm.year" type="year" placeholder="请选择年份" @change="dataChange" />
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="month" label="报销月份">
          <el-select v-model="ruleForm.month" placeholder="请选择">
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
            <el-option label="3" value="3" />
            <el-option label="4" value="4" />
            <el-option label="5" value="5" />
            <el-option label="6" value="6" />
            <el-option label="7" value="7" />
            <el-option label="8" value="8" />
            <el-option label="9" value="9" />
            <el-option label="10" value="10" />
            <el-option label="11" value="11" />
            <el-option label="12" value="12" />
          </el-select>
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
        year: '',
        month: ''
      },
      rules: {
        year: [
          { required: true, message: '请选择年份', trigger: 'blur' }
        ],
        month: [
          { required: true, message: '请选择月份', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$router.push('/StatementDetails')
      // _this表示当前vue对象
      // const _this = this
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     axios.post('http://localhost:8088/order/insert', _this.ruleForm).then(function (resp) {
      //       console.log(resp)
      //       _this.$message({
      //         message: '添加成功',
      //         type: 'success'
      //       })
      //       // 回跳查询页面
      //       _this.$router.push('/StatementDetails')
      //     })
      //   } else {
      //     return false
      //   }
      // })
    },
    // 格式化日期 'YYYY-MM-DD'
    dataChange() {
      this.ruleForm.date = moment(this.ruleForm.date).format('YYYY-MM-DD')
      return this.ruleForm.date
    },
    created() {
      const _this = this
      axios.get('http://localhost:8088/order/selectById/' + this.$route.query.id).then(function(resp) {
        console.log(resp)
        _this.ruleForm = resp.data
      })
    }
  }
}
</script>
