<template>
  <div>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="">
        <el-input size="small" v-model="formInline.code" maxlength="12" show-word-limit placeholder="输入部门代码"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.name" placeholder="输入部门名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" stripe highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" height="488">
      <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
      <el-table-column align="center" prop="code" label="部门代码" width="235">
      </el-table-column>
      <el-table-column align="center" prop="name" label="部门名称" width="235">
      </el-table-column>
      <el-table-column align="center" prop="note1" label="部门设立日期" width="235">
      </el-table-column>
      <el-table-column align="center" prop="note2" label="部门撤销日期" width="235">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteDept(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination v-if="paginationShow" class="page-box" @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="pagination.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"></el-pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog()" class="dialog">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm" class="dialogShortForm">
        <el-form-item label="部门代码" prop="code">
          <el-input size="small" maxlength="12" show-word-limit v-model="editForm.code" auto-complete="off" placeholder="请输入部门代码" class="comWidth" :disabled="codeDis"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入部门名称"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="部门设立日期" prop="note1">
          <el-date-picker v-model="editForm.note1" type="date" value-format="yyyy-MM-dd" placeholder="选择设立日期"  class="comWidth"></el-date-picker>
        </el-form-item>
        <el-form-item label="部门撤销日期" prop="note2">
          <el-date-picker v-model="editForm.note2" type="date" value-format="yyyy-MM-dd" placeholder="选择撤销日期"  class="comWidth"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog()">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {deptList,deptSave,deptUpdate,deptDelete} from '@/api/commonMG.js'
export default {
  data() {
    return {
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      detailsFormVisible:false, //控制详情页面显示与隐藏
      paginationShow:true, //控制分页页面显示与否
      codeDis: false,
      title: '添加',
      editForm: {
        name: '',
        code: '',
        note1:'',
        note2:''
      },
      // rules表单验证
      rules: {
        name: [{ required: true, message: '请输入部门名称', trigger: 'change' }],
        code: [{ required: true, message: '请输入部门代码', trigger: 'blur' }]
      },
      formInline: {
        code: '',
        name: ''
      },
      listData: [], //用户数据
      // 分页参数
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      params:{}
    }
  },
  created() {
    this.getdata()
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 获取部门数据列表
    getdata(parameter) {
      this.loading = true
      this.params = {
        code:this.formInline.code,
        name:this.formInline.name,
        currentPage:this.pagination.currentPage,
        pageSize:this.pagination.pageSize
      }
      deptList(this.params).then(res => {
        this.loading = false
        if(res.success){
          this.listData = res.result;
          this.pagination.total = res.total
        }else{
          if(res.code == '403'){
            this.$message({
                 type: 'warning',
                 message: res.msg
            })
          }
        }
      }).catch(a =>{
        console.log(a);
        this.loading = false
      })
    },
    // 搜索事件
    search() {
      this.paginationShow = false
      this.handleCurrentChange(1)
      this.$nextTick(function () {
        this.paginationShow = true;
      })
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      if (row != undefined && row != 'undefined') {
        this.title = '修改'
        this.codeDis = true
        this.editForm.name = row.name
        this.editForm.code = row.code
        this.editForm.note1 = row.note1
        this.editForm.note2 = row.note2
      } else {
        this.title = '添加'
        this.codeDis = false
        this.editForm.name = ''
        this.editForm.code = ''
        this.editForm.note1 = ''
        this.editForm.note2 = ''
      }
    },
    // 增加页面保存方法
    submitForm(editData) {
      if(this.title == '添加'){
        this.$refs[editData].validate(valid => {
          if (valid) {
            deptSave(this.editForm)
              .then(res => {
                this.editFormVisible = false
                this.loading = false
                if (res.success) {
                  this.getdata()
                  this.$message({
                    type: 'success',
                    message: '部门保存成功！'
                  })
                } else {
                  this.$message({
                    type: 'warning',
                    message: res.msg
                  })
                }
              })
              .catch(err => {
                this.editFormVisible = false
                this.loading = false
                this.$message.error('部门保存失败，请稍后再试！')
              })
          } else {
            return false
          }
        })
      }else{
        this.$refs[editData].validate(valid => {
          if (valid) {
            deptUpdate(this.editForm)
              .then(res => {
                this.editFormVisible = false
                this.loading = false
                if (res.success) {
                  this.getdata()
                  this.$message({
                    type: 'success',
                    message: '部门编辑成功！'
                  })
                } else {
                  this.$message({
                    type: 'warning',
                    message: res.msg
                  })
                }
              })
              .catch(err => {
                this.editFormVisible = false
                this.loading = false
                this.$message.error('部门编辑失败，请稍后再试！')
              })
          } else {
            return false
          }
        })
      }
    },
    // 重置表单校验
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 删除部门
    deleteDept(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deptDelete(row.code)
            .then(res => {
              if (res.data.success) {
                this.$message({
                  type: 'success',
                  message: '部门已删除!'
                })
                this.getdata()
              } else {
                this.$message({
                  type: 'warning',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('公司删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'warning',
            message: '已取消删除'
          })
        })
    },
    // 关闭编辑、增加、详情弹出框
    closeDialog(formRule) {
      this.editFormVisible = false
      this.detailsFormVisible = false
      resetForm(editForm)
    },
    // 分页组件的当前页和分页变化
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.getdata()
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.getdata()
    }
  }
}
</script>

<style scoped>
</style>

 
 