<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">

    <el-form-item style="margin-top: 2%" label="角色名" prop="name">
      <el-input v-model="ruleForm.name" style="width: 300px" />
    </el-form-item>

    <el-form-item style="margin-top: 3%" label="角色code" prop="code">
      <el-input v-model="ruleForm.code" style="width: 300px" />
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
        name: '',
        code: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入角色code', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const _this = this
    axios.get('http://localhost:8088/permission/selectById/' + this.$route.query.id).then(function(resp) {
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
          axios.post('http://localhost:8088/permission/insert', _this.ruleForm).then(function(resp) {
            console.log(resp)
            _this.$message({
              message: '添加成功',
              type: 'success'
            })
            // 回跳查询页面
            _this.$router.push('/PermissionList')
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
      this.$router.push('/PermissionList')
    }
  }
}
</script>
