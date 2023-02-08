<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
    <el-row>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="distance" label="送货距离">
          <el-input v-model="ruleForm.distance" />
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="driver" label="送货司机">
          <el-select v-model="ruleForm.driver" placeholder="请选择">
            <el-option label="张三" value="张三" />
            <el-option label="李四" value="李四" />
            <el-option label="王五" value="王五" />
            <el-option label="赵六" value="赵六" />
            <el-option label="法外狂徒" value="法外狂徒" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="truck" label="送货卡车">
          <el-select v-model="ruleForm.truck" placeholder="请选择">
            <el-option label="A6666" value="A6666" />
            <el-option label="A7777" value="A7777" />
            <el-option label="A8888" value="A8888" />
            <el-option label="A9999" value="A9999" />
            <el-option label="AK476" value="AK476" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="time" label="送货时间">
          <el-select v-model="ruleForm.time" placeholder="请选择">
            <el-option label="上午" value="上午" />
            <el-option label="下午" value="下午" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="date" label="送货日期">
          <el-date-picker v-model="ruleForm.date" type="date" placeholder="请选择送货日期" @change="dataChange" />
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="address" label="送货地址">
          <el-input v-model="ruleForm.address" />
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="isCompensate" label="是否有额">
          <el-select v-model="ruleForm.isCompensate" placeholder="请选择">
            <el-option label="是" value="0" selected />
            <el-option label="否" value="1" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="compensate" label="额外奖励">
          <el-input v-model="ruleForm.compensate" :disabled="InfoFormDisabled" @input="compensateFormat" />
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="prices" label="总价">
          <el-input v-model="ruleForm.prices" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button style="margin-left: 40%;margin-top: 10%" type="primary" @click="submitForm('ruleForm')">修改</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
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
        prices: '',
        compensate: '',
        isCompensate: '',
        address: '',
        date: '',
        time: '',
        truck: '',
        driver: '',
        distance: ''
      },
      rules: {
        distance: [
          { required: true, message: '请输入送货距离', trigger: 'blur' },
          {
            validator: function(rule, value, callback) {
              if (!value) {
                callback()
              } else if (/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/.test(value) == false) {
                callback(new Error('送货距离必须为数字且最多输入两位小数'))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ],
        driver: [
          { required: true, message: '请选择送货司机', trigger: 'blur' }
        ],
        truck: [
          { required: true, message: '请选择送货卡车', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请选择送货时间', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择送货日期', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入送货地址', trigger: 'blur' }
        ],
        isCompensate: [
          { required: true, message: '请选择是否有偿', trigger: 'blur' }
        ],
        // compensate: [
        //   { required: true, message: '请输入额外奖励', trigger: 'blur' },
        //   {
        //     validator: function (rule, value, callback) {
        //       if (!value) {
        //         callback()
        //       } else if (/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/.test(value) == false) {
        //         callback(new Error('额外奖励必须为数字且最多输入两位小数'))
        //       } else {
        //         callback()
        //       }
        //     },
        //     trigger: 'change'
        //   }
        // ],
        prices: [
          { required: true, message: '请输入总价格', trigger: 'blur' },
          {
            validator: function(rule, value, callback) {
              if (!value) {
                callback()
              } else if (/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/.test(value) == false) {
                callback(new Error('总价格必须为数字且最多输入两位小数'))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    // 额外奖励禁用
    InfoFormDisabled() {
      return this.ruleForm.isCompensate === '1'
    }
  },
  created() {
    const _this = this
    axios.get('http://localhost:8088/order/selectById/' + this.$route.query.id).then(function(resp) {
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
          axios.put('http://localhost:8088/order/update', _this.ruleForm).then(function(resp) {
            console.log(resp)
            _this.$message({
              message: '修改成功',
              type: 'success'
            })
            // 回跳查询页面
            _this.$router.push('/OrderList')
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
      this.$router.push('/OrderList')
    },
    // 格式化日期 'YYYY-MM-DD'
    dataChange() {
      this.ruleForm.date = moment(this.ruleForm.date).format('YYYY-MM-DD')
      return this.ruleForm.date
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
