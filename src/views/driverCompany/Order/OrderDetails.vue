<template>
  <el-form ref="ruleForm" style="margin-top: 2%" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
    <el-row>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="distance" label="送货距离">
          <el-input v-model="ruleForm.distance" disabled />
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="driver" label="送货司机">
          <el-select v-model="ruleForm.driver" placeholder="请选择" disabled>
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
          <el-select v-model="ruleForm.truck" placeholder="请选择" disabled>
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
          <el-select v-model="ruleForm.time" placeholder="请选择" disabled>
            <el-option label="上午" value="上午" />
            <el-option label="下午" value="下午" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="date" label="送货日期">
          <el-date-picker v-model="ruleForm.date" type="date" placeholder="请选择送货日期" disabled @change="dataChange" />
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="address" label="送货地址">
          <el-input v-model="ruleForm.address" disabled />
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="isCompensate" label="是否有额">
          <el-select v-model="ruleForm.isCompensate" placeholder="请选择" disabled>
            <el-option label="是" value="0" selected />
            <el-option label="否" value="1" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="compensate" label="额外奖励">
          <el-input v-model="ruleForm.compensate" :disabled="InfoFormDisabled" disabled @input="compensateFormat" />
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item prop="prices" label="总价">
          <el-input v-model="ruleForm.prices" disabled />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" style="margin-left: 40%;margin-top: 10%" @click="goback('ruleForm')">返回</el-button>
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
        prices: '',
        compensate: '',
        isCompensate: '',
        address: '',
        date: '',
        time: '',
        truck: '',
        driver: '',
        distance: ''
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
    goback() {
      // 回跳查询页面
      this.$router.push('/OrderList')
    }
  }
}
</script>
