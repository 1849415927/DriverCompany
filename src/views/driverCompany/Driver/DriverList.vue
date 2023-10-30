<template>
  <div>
    <el-row style="margin-top: 1%;margin-bottom: 2%;margin-left: 1%">
      <el-col :span="13">
        <el-input v-model="data.requestBody.name" type="text" placeholder="请输入司机姓名" style="width: 40%">
          <el-button slot="append" icon="el-icon-search" @click="refresh" />
        </el-input>
      </el-col>
      <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
      <el-button type="primary" icon="el-icon-plus" style="margin-right: 40px" @click="update">新增</el-button>
      <a href="http://58.87.91.31:8088/driver/templateDownload"><el-button icon="el-icon-upload" style="margin-left: 10px;color: #4A9FF9">下载模板</el-button></a>
      <el-button type="primary" icon="el-icon-upload2" style="margin-left: 10px" @click="dialogVisible = true">导入</el-button>
      <a href="http://58.87.91.31:8088/driver/export_driver_excel"><el-button type="primary" icon="el-icon-download" style="margin-left: 10px">导出</el-button></a>
    </el-row>

    <el-dialog
      title="导入司机信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <span>
        <el-upload
          ref="upload"
          class="upload-demo"
          drag
          action=""
          :before-upload="beforeAvatarUpload"
          :http-request="uploadSectionFile"
          :auto-upload="false"
          :file-list="fileList"
          :limit="limitnum"
          :on-error="uploadFileError"
          :on-success="uploadFileSuccess"
          :on-exceed="exceedFile"
          :on-remove="removeFile"
          multiple
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过100M</div>
          <div />
        </el-upload>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sub">确 定</el-button>
      </span>
    </el-dialog>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        fixed
        align="center"
        label="ID"
        width="150"
      >
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="left"
        prop="name"
        label="姓名"
        width="150"
      />
      <el-table-column
        align="center"
        fixed="left"
        prop="phone"
        label="电话"
        width="287"
      />
      <el-table-column
        align="center"
        prop="username"
        label="用户名"
        width="155"
      />
      <el-table-column
        align="center"
        prop="idcard"
        label="驾驶证号"
        width="320"
      />
      <!--      <el-table-column-->
      <!--        align="center"-->
      <!--        prop="password"-->
      <!--        label="密码"-->
      <!--        width="200">-->
      <!--      </el-table-column>-->
      <el-table-column
        align="center"
        fixed="left"
        prop="email"
        label="邮箱"
        width="290"
      />
      <el-table-column align="center" fixed="left" prop="state" label="状态" width="150">
        <template scope="scope">
          {{ scope.row.state === '0' ? '在岗': '' }}
          {{ scope.row.state === '1' ? '不在岗': '' }}
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="300"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="detailsClick(scope.row)">查看详情</el-button>
          <el-button type="primary" size="mini" @click="handleClick(scope.row)">修改</el-button>
          <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="data.pageSize"
      :total="total"
      @current-change="page"
      @size-change="handleSizeChange"
    />
    <!--    </el-form>-->
  </div>
</template>

<script>
import axios from 'axios'
import { DriverList, importData } from '@/api/driver'

export default {
  // inject: ['reload'],

  data() {
    return {
      data: {
        name: '',
        pageSize: 10,
        pageNo: 1,
        requestBody: {
          name: ''
        }
      },
      total: 0,
      tableData: [],
      fileList: [], // 上传的文件列表
      limitnum: 2, // 最大允许上传个数
      dialogVisible: false
    }
  },
  created() {
    // const _this = this
    // axios.get('http://58.87.91.31:8088/driver/list').then(function(resp) {
    //   console.log(resp)
    //   _this.tableData = resp.data.records
    //   _this.pageSize = resp.data.size
    //   _this.total = resp.data.total
    // })
    this.refresh()
  },
  methods: {
    refresh() {
      DriverList(this.data).then(res => {
        this.tableData = res.data.driverPage.records
        this.total = res.data.driverPage.total
      })
      // const _this = this
      // if (_this.name === '') {
      //   // 回跳查询页
      //   axios.get('http://58.87.91.31:8088/driver/list').then(function(resp) {
      //     console.log(resp)
      //     _this.tableData = resp.data.records
      //     _this.pageSize = resp.data.size
      //     _this.total = resp.data.total
      //   })
      // } else {
      //   axios.get('http://58.87.91.31:8088/driver/getFindByName/' + _this.name).then(function(resp) {
      //     console.log(resp)
      //     _this.tableData = resp.data
      //   })
      // }
    },
    update() {
      this.$router.push('DriverAdd')
    },
    detailsClick(row) {
      this.$router.push({
        path: 'DriverDetails',
        query: {
          id: row.id
        }
      })
      console.log(row)
    },
    handleClick(row) {
      this.$router.push({
        path: 'DriverUpdate',
        query: {
          id: row.id
        }
      })
      console.log(row)
    },
    // 条数
    handleSizeChange(val) {
      this.data.pageSize = val
      DriverList(this.data).then(res => {
        this.tableData = res.data.driverPage.records
      })
    },
    // 页数
    page(val) {
      this.data.pageNo = val
      DriverList(this.data).then(res => {
        this.tableData = res.data.driverPage.records
      })
    },
    // 导出
    driverexport() {
      const _this = this
      axios.get('http://58.87.91.31:8088/driver/export_driver_excel/' + _this.name).then(function(resp) {
        _this.tableData = resp.data.records
        _this.pageSize = resp.data.size
        _this.total = resp.data.total
      })
    },
    // 删除
    async del(row) {
      const _this = this
      const confirmResult = await this.$confirm('是否确认删除该司机?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      axios.delete('http://58.87.91.31:8088/driver/deleteById/' + row.id).then(function(resp) {
        _this.$message('删除成功')
        // 回跳查询页
        _this.$router.push('/DriverList')
        window.location.reload()
      })
    },
    // 导入 弹出框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 上传文件格式限制
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xls'
      const extension2 = testmsg === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 100

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!extension && !extension2) {
        this.$message.error('只能上传xls/xlsx文件')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过100MB!')
      }
      // return isJPG && isLt2M;
      return (extension || extension2) && isLt2M
    },
    // 点击确定按钮上传
    sub() {
      this.$refs.upload.submit()
    },
    // 自定义上传
    uploadSectionFile(param) {
      var fileObj = param.file
      var form = new FormData()
      // 文件对象
      form.append('file', fileObj)
      axios.post('http://58.87.91.31:8088/driver/importData', form).then(res => {
        param.onSuccess(res)
      }).catch(({ err }) => {
        param.onError(err)
      })
    },
    // 上传失败
    // eslint-disable-next-line handle-callback-err
    uploadFileError(err, file, fileList) {
      this.$message.error('上传失败！')
    },
    // 上传成功
    uploadFileSuccess(response, file, fileList) {
      if (response.data.code === 20000) {
        file.response = response.data.data
        this.fileList.push(file)
        this.$message.success(response.data.message)
      } else {
        this.$message.error(response.data.message) // 文件上传错误提示
      }
    },
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$message.error('只能上传' + this.limitnum + '个文件')
    },
    // 删除文件
    removeFile(file, fileList) {
      this.fileList = fileList
    }
  }
}
</script>

<style>
.upload-demo{
  margin: auto;
  width: 50%;
}

</style>
