<template>
  <el-form ref="ruleForm" style="margin-top: 2%" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">

    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
      <el-form-item label="驾驶证号" prop="idcard">
        <el-input v-model="ruleForm.idcard" readonly />
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" readonly />
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
      <el-form-item label="电话" prop="phone">
        <el-input v-model="ruleForm.phone" readonly />
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" readonly />
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" readonly />
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" readonly />
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
      <el-form-item label="状态" prop="state">
        <el-select v-model="ruleForm.state" disabled="disabled">
          <el-option label="在岗" value="0" selected />
          <el-option label="不在岗" value="1" />
        </el-select>
      </el-form-item>
    </el-col>

    <el-form-item>
      <el-button type="primary" style="margin-left: 20%;margin-top: 10%" @click="goback('ruleForm')">返回</el-button>
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
    goback() {
      // 回跳查询页面
      this.$router.push('/DriverList')
    }
  }
}
</script>
<style>
.demo-ruleForm >>>.el-input__inner {
  border: 0;
}
</style>
