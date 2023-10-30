<template>
  <el-form ref="ruleForm" style="margin-top: 2%" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">

    <el-form-item label="驾驶证号" prop="idcard">
      <el-input v-model="ruleForm.idcard" @input="filteIdcard" />
    </el-form-item>

    <el-form-item label="姓名" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>

    <el-form-item label="电话" prop="phone">
      <el-input v-model="ruleForm.phone" />
    </el-form-item>

    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" disabled />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password" />
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email" @blur="sendEmail" />
    </el-form-item>

    <el-form-item label="状态" prop="state">
      <el-select v-model="ruleForm.state" placeholder="请选择">
        <el-option label="在岗" value="0" selected />
        <el-option label="不在岗" value="1" />
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
      <el-button @click="goback('ruleForm')">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      ruleForm: {
        id: '',
        idcard: '',
        name: '',
        phone: '',
        username: '',
        password: '',
        email: '',
        state: ''
      },
      rules: {
        idcard: [
          { required: true, message: '请输入驾驶证号', trigger: 'blur' },
          { min: 12, max: 12, message: '长度为 12 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          {
            validator: function(rule, value, callback) {
              if (!value) {
                callback()
              } else if (/^1[34578]\d{9}$/.test(value) === false) {
                callback(new Error('手机号格式错误'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        // username: [
        //   { required: true, message: '请输入用户名', trigger: 'change' }
        // ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'change' }
        ],
        state: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    const _this = this
    axios.get('http://58.87.91.31:8088/driver/selectById/' + this.$route.query.id).then(function(resp) {
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
          axios.put('http://58.87.91.31:8088/driver/update', _this.ruleForm).then(function(resp) {
            console.log(resp)
            if (resp.data.code === 20000) {
              _this.$message({
                message: '修改成功',
                type: 'success'
              })
              // 回跳查询页面
              _this.$router.push('/DriverList')
            } else {
              _this.$message.error(resp.data.message)
            }
          })
        } else {
          return false
        }
      })
    },
    // 邮箱验证
    sendEmail: function() {
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (this.ruleForm.email !== '' && !regEmail.test(this.ruleForm.email)) {
        this.$message({
          message: '请输入合法邮箱',
          type: 'error'
        })
        this.ruleForm.email = ''
      }
    },
    // 用户名取驾驶证号后6位
    filteIdcard() {
      this.ruleForm.username = this.ruleForm.idcard.slice(6)
      return this.ruleForm.username
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    goback() {
      // 回跳查询页面
      this.$router.push('/DriverList')
    }
  }
}
</script>
