<template>
  <div style="margin-top: 50px">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="礼金" prop="money">
            <el-input v-model="ruleForm.money" disabled/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="地址" prop="address">
            <el-input v-model="ruleForm.address"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="礼品" prop="present">
            <el-input v-model="ruleForm.present"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="类型" prop="type">
            <el-input v-model="ruleForm.type" disabled/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="人员" prop="personnel">
            <el-input v-model="ruleForm.personnel" disabled/>
          </el-form-item>
        </el-col>
      </el-row>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
      <el-button @click="resetForm('ruleForm')" disabled>重置</el-button>
      <el-button @click="goback('ruleForm')">返回</el-button>
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
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入礼金', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入类型', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    // const _this = this
    // axios.get('http://58.87.91.31:8088/driver/selectById/' + this.$route.query.id).then(function(resp) {
    //   console.log(resp)
    //   _this.ruleForm = resp.data
    // })
    detail(this.$route.query.id).then(res => {
      console.log(res)
      this.ruleForm = res.data.detail
    })
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const confirmResult = await this.$confirm('是否确认修改该条信息?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).catch(err => err)
          if (confirmResult !== 'confirm') {
            return this.$message.info('已取消修改')
          }
          update(this.ruleForm).then(res => {
            console.log(res)
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            // 回跳查询页面
            this.$router.push('/LiboList')
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
      this.$router.push('/LiboList')
    }
  }
}
</script>
