<template>
  <div style="margin-top: 50px">
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" readonly />
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
      <el-form-item label="礼金" prop="money">
        <el-input v-model="ruleForm.money" readonly />
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
      <el-form-item label="地址" prop="address">
        <el-input v-model="ruleForm.address" readonly />
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
      <el-form-item label="礼品" prop="present">
        <el-input v-model="ruleForm.present" readonly />
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
      <el-form-item label="类型" prop="type">
        <el-input v-model="ruleForm.type" readonly />
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
      <el-form-item label="人员" prop="personnel">
        <el-input v-model="ruleForm.personnel" readonly />
      </el-form-item>
    </el-col>

    <el-form-item>
      <el-button type="primary" style="margin-left: 40%;margin-top: 10%" @click="goback('ruleForm')">返回</el-button>
    </el-form-item>

  </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import {list, save, update, detail, deleted, importExcel, exportExcel} from '@/api/luoJiaoyue'

export default {
  data() {
    return {
      ruleForm: {
        id: '',
        name: '',
        money: '',
        address: '',
        present: '',
        type: '',
        personnel: ''
      }
    }
  },
  created() {
    // const _this = this
    // axios.get('http://localhost:8080/luoJiaoyue/' + this.$route.query.id).then(function(resp) {
    //   console.log(resp)
    //   _this.ruleForm = resp.data.data.detail
    // })
    detail(this.$route.query.id).then(res => {
      console.log(res)
      this.ruleForm = res.data.detail
    })

  },
  methods: {
    goback() {
      // 回跳查询页面
      this.$router.push('/LiboList')
    }
  }
}
</script>
<style>
.demo-ruleForm >>>.el-input__inner {
  border: 0;
}
</style>
