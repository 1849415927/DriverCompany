<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">

    <el-form-item label="车牌号" prop="license">
      <el-input v-model="ruleForm.license" />
    </el-form-item>

    <el-form-item style="margin-top: 5%" label="状态" prop="status">
      <el-select v-model="ruleForm.status" placeholder="请选择">
        <el-option label="正常" value="0" selected />
        <el-option label="维修" value="1" />
        <el-option label="报废" value="2" />
      </el-select>
    </el-form-item>

    <el-form-item style="margin-top: 5%">
      <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
      <el-button @click="goback('ruleForm')">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    value: {
      required: true
    }
  },
  data() {
    return {
      ruleForm: {
        license: '',
        status: '0'
      },
      rules: {
        license: [
          { required: true, message: '请输入车牌号', trigger: 'blur' },
          { min: 5, max: 5, message: '长度为 5 个字符', trigger: 'change' },
          {
            validator: function(rule, value, callback) {
              if (!value) {
                callback()
              } else if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,5}$/.test(value) == false) {
                callback(new Error('车牌号应为数字加字母组合'))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ],
        status: [
          { required: true, message: '请输入状态', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const _this = this
    axios.get('http://localhost:8088/truck/selectById/' + this.$route.query.id).then(function(resp) {
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
          axios.post('http://localhost:8088/truck/insert', _this.ruleForm).then(function(resp) {
            console.log(resp)
            _this.$message({
              message: '添加成功',
              type: 'success'
            })
            // 回跳查询页面
            _this.$router.push('/TruckList')
          })
        } else {
          return false
        }
      })
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    goback() {
      // 回跳查询页面
      this.$router.push('/TruckList')
    }
  }
}
</script>
