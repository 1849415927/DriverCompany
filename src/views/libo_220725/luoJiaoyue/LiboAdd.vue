<template>
  <div style="margin-top: 50px">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
      <el-row>
      <el-col :span="12">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"/>
        </el-form-item>
      </el-col>
    <el-col :span="12">
      <el-form-item label="礼金" prop="money">
        <el-input v-model="ruleForm.money"/>
      </el-form-item>
    </el-col>

    <el-col :span="12">
      <el-form-item label="地址" prop="address">
        <el-input v-model="ruleForm.address"/>
      </el-form-item>
    </el-col>

    <el-col :span="12">
       <el-form-item label="已还礼金" prop="paidMoney">
         <el-input v-model="ruleForm.paidMoney" disabled/>
       </el-form-item>
    </el-col>

    <el-col :span="12">
      <el-form-item label="礼品" prop="present">
        <el-input v-model="ruleForm.present"/>
      </el-form-item>
    </el-col>

    <el-col :span="12">
      <el-form-item label="类型" prop="type">
        <el-input v-model="ruleForm.type"/>
      </el-form-item>
    </el-col>

    <el-col :span="12">
      <el-form-item label="人员" prop="personnel">
        <el-input v-model="ruleForm.personnel"/>
      </el-form-item>
    </el-col>

    <el-col :span="12">
      <el-form-item label="备注" prop="remark">
       <el-input v-model="ruleForm.remark"/>
      </el-form-item>
    </el-col>
      </el-row>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
      <el-button @click="goback('ruleForm')">返回</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import {list, save, update, detail, deleted, importExcel, exportExcel} from '@/api/luoJiaoyue'

export default {
  props: {
    value: {
      required: true
    }
  },
  data() {
    return {
      ruleForm: {
        id: '',
        name: '',
        money: '',
        address: '',
        paidMoney: 0,
        residueMoney: '',
        present: '',
        type: '',
        personnel: '',
        remark: ''
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
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const confirmResult = await this.$confirm('是否确认新增该条信息?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).catch(err => err)
          if (confirmResult !== 'confirm') {
            return this.$message.info('已取消新增')
          }
          save(this.ruleForm).then(res => {
            console.log(res)
            this.$message({
              message: '添加成功',
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
