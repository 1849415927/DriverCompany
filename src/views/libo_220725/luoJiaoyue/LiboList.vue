<template>
  <div>
    <el-form ref="ruleForm" :model="data" :rules="rules" label-width="100px" class="demo-ruleForm">
    <el-row style="margin-top: 1%;margin-bottom: 2%;margin-left: 1%">

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item label="姓名">
        <el-input v-model="data.name" type="text" placeholder="请输入姓名"></el-input>
        </el-form-item>
      </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="礼金">
        <el-input v-model="data.money" type="text" placeholder="请输入礼金"></el-input>
          </el-form-item>
        </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="地址">
        <el-input v-model="data.address" type="text" placeholder="请输入地址"></el-input>
            </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item label="礼品">
          <el-input v-model="data.present" type="text" placeholder="请输入礼品"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item label="类型">
          <el-input v-model="data.type" type="text" placeholder="请输入类型"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item label="人员">
          <el-input v-model="data.personnel" type="text" placeholder="请输入人员"></el-input>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item label="礼金从">
          <el-input v-model="data.moneyBefore" type="text" placeholder="请输入礼金从"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-form-item label="礼金至">
          <el-input v-model="data.moneyEnd" type="text" placeholder="请输入礼金至"></el-input>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="24">
        <el-button type="primary" icon="el-icon-plus" @click="save" disabled>新增</el-button>
        <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
      <el-button type="primary" @click="reload">重置</el-button>
      <el-button type="primary" icon="el-icon-upload2" style="margin-left: 600px" @click="dialogVisible = true">导入</el-button>
      <el-button type="primary" icon="el-icon-download" style="margin-left: 10px" @click="exportExcels">导出</el-button>
      <a href="http://localhost:8080/luoJiaoyue/templateDownload"><el-button icon="el-icon-upload" style="margin-left: 10px;color: #4A9FF9">下载模板</el-button></a>
      </el-col>
    </el-row>

    <el-dialog
      title="导入礼簙信息"
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
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="姓名"
        width="140"
      />
      <el-table-column
        align="center"
        prop="money"
        label="礼金"
        width="140"
      />
      <el-table-column
        align="center"
        prop="address"
        label="地址"
        width="150"
      />
      <el-table-column
        align="center"
        prop="present"
        label="礼品"
        width="150"
      />
      <el-table-column
        align="center"
        prop="type"
        label="类型"
        width="100"
      />
      <el-table-column
        align="center"
        prop="personnel"
        label="人员"
        width="150"
      />

      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="300"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="details(scope.row)">查看详情</el-button>
          <el-button type="primary" size="mini" @click="update(scope.row)">修改</el-button>
          <el-button type="danger" size="mini" @click="deleted(scope.row)" disabled>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="data.size"
      :total="total"
      @current-change="page"
      @size-change="handleSizeChange"
    />
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import Watermark from '@/api/watermark'
import {list, save, update, detail, deleted, importExcel, exportExcel} from '@/api/luoJiaoyue'

export default {
  // inject: ['reload'],
  //初始化加载
  // mounted() {
  //   // Watermark.set(str1,str2,str3,sourceBody)
  //   // str1,str2,str3: 水印内容   sourceBody: 水印容器。若不传，则全屏水印，若传，则指定容器。
  //   Watermark.set('任浩乾',"罗娇月","");
  // },
  data() {
    return {
      data: {
        size: 10,
        current: 1,
        name: "",
        money: "",
        address:"",
        present:"",
        type:"",
        personnel:"",
        moneyBefore:"",
        moneyEnd:""
      },
      total: 0,
      tableData: [],
      fileList: [], // 上传的文件列表
      limitnum: 2, // 最大允许上传个数
      dialogVisible: false
    }
  },
  created() {
    this.refresh()
  },
  methods: {
    reload() {
      this.data = {
          size:10,
          current: 1,
          name: "",
          money: "",
          address:"",
          present:"",
          type:"",
          personnel:"",
          moneyBefore:"",
          moneyEnd:""
      },
      this.refresh()
    },
    refresh() {
      list(this.data).then(res => {
        this.tableData = res.data.list.records
        this.total = res.data.list.total
      })
    },
    save() {
      this.$router.push('LiboAdd')
    },
    details(row) {
      this.$router.push({
        path: 'LiboDetails',
        query: {
          id: row.id
        }
      })
      console.log(row)
    },
    update(row) {
      this.$router.push({
        path: 'LiboUpdate',
        query: {
          id: row.id
        }
      })
      console.log(row)
    },
    // 条数
    handleSizeChange(val) {
      this.data.size = val
      this.refresh()
    },
    // 页数
    page(val) {
      this.data.current = val
      this.refresh()
    },
    // 导出
    exportExcels() {
      axios({
        method: 'post',
        url: 'http://localhost:8080/luoJiaoyue/exportExcel',
        data: this.data,
        responseType: 'blob',
      })
        .then((res) => {
          console.log(res)
          // 文件下载
          const blob = new Blob([res.data], {
            type: 'application/vnd.ms-excel'
          })
          let link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.setAttribute('download', `礼簙信息.xlsx`)
          link.click()
          link = null
          this.$message.success('导出成功')
        })
        .catch((err) => {
          if (err.response.status === 401) {
            console.log('err' + err) // for debug
          } else {
            this.$message.error(err.message)
          }
        })
    },
    // 删除
    async deleted(row) {
      const _this = this
      const confirmResult = await this.$confirm('是否确认删除该条信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      // axios.delete('http://localhost:8080/Libo/delete/' + row.id).then(function(resp) {
      let idList = []
      idList.push(row.id)
      console.log(idList)
      deleted(idList).then(res => {
        _this.$message('删除成功')
        // 回跳查询页
        _this.$router.push('/LiboList')
        window.location.reload()
      });

      // })
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
      axios.post('http://localhost:8080/luoJiaoyue/importExcel', form).then(res => {
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
