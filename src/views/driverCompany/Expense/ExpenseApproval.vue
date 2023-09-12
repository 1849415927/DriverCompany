<template>
  <el-form ref="ruleForm" style="margin-top: 2%" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
    <el-row>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="proposer" label="申请人">
          <el-input v-model="ruleForm.proposer" disabled />
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="type" label="报销类型">
          <el-select v-model="ruleForm.type" placeholder="请选择" disabled>
            <el-option label="汽油费" value="汽油费" />
            <el-option label="卡车维修费" value="卡车维修费" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="price" label="报销金额">
          <el-input v-model="ruleForm.price" disabled />
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="month" label="报销月份">
          <el-select v-model="ruleForm.month" placeholder="请选择" disabled>
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
        <el-form-item prop="datetime" label="申请时间">
          <el-date-picker v-model="ruleForm.datetime" disabled type="datetime" />
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="state" label="状态">
          <el-select v-model="ruleForm.state" placeholder="请选择">
            <el-option label="已提交" value="已提交" />
            <el-option label="审批通过" value="审批通过" />
            <el-option label="驳回" value="驳回" />
          </el-select>
        </el-form-item>
      </el-col>

    </el-row>
    <el-form-item>
      <el-button style="margin-left: 40%;margin-top: 10%" type="primary" @click="submitForm('ruleForm')">确定</el-button>
      <el-button @click="goback('ruleForm')">返回</el-button>
    </el-form-item>
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
        proposer: '',
        type: '',
        price: '',
        month: '',
        datetime: '',
        state: ''
      },
      rules: {
        proposer: [
          { required: true, message: '请输入申请人', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择报销类型', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入报销金额', trigger: 'blur' },
          {
            validator: function(rule, value, callback) {
              if (!value) {
                callback()
              } else if (/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/.test(value) == false) {
                callback(new Error('报销金额必须为数字且最多输入两位小数'))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ],
        month: [
          { required: true, message: '请选择报销月份', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const _this = this
    axios.get('http://localhost:8088/expense/selectById/' + this.$route.query.id).then(function(resp) {
      console.log(resp)
      _this.ruleForm = resp.data
    })
  },
  methods: {
    submitForm(formName) {
      // _this表示当前vue对象
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put('http://localhost:8088/expense/expenseApproval', _this.ruleForm).then(function(resp) {
            console.log(resp)
            _this.$message({
              message: '修改成功',
              type: 'success'
            })
            // 回跳查询页面
            _this.$router.push('/ExpenseApprovalList')
          })
        } else {
          return false
        }
      })
    },
    goback() {
      // 回跳查询页面
      this.$router.push('/ExpenseApprovalList')
    },
    // 额外奖励验证
    compensateFormat() {
      const compensates = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/
      if (this.ruleForm.compensate != '' && !compensates.test(this.ruleForm.compensate)) {
        this.$message({
          message: '额外奖励必须为数字且最多输入两位小数',
          type: 'error'
        })
      }
    }
  }
}
</script>
