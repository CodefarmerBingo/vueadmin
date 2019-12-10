<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="员工设置">
        <!-- 搜索筛选 -->
        <el-form :inline="true" :model="personnelFormInline" class="user-search">
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.region" placeholder="输入地区代码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.dept" placeholder="输入部门代码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.line" placeholder="输入显示次序"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.position" placeholder="输入岗位职务"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.name" placeholder="输入姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.engName" placeholder="输入英文姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.code" placeholder="输入工号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.account" placeholder="输入域账号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.email" placeholder="输入Email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.idCardNumber" placeholder="输入身份证号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.note1" placeholder="输入备注"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
          </el-form-item>
        </el-form>
        <!--列表-->
        <el-table size="small" height="490" :data="personnelListData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中">
          <el-table-column align="center" prop="region" label="地区代码/名称" width="150">
          </el-table-column>
          <el-table-column align="center" prop="dept" label="部门代码/名称" width="200">
          </el-table-column>
          <el-table-column align="center" prop="line" label="显示次序" width="70">
          </el-table-column>
          <el-table-column align="center" prop="position" label="岗位职务代码/名称" width="170">
          </el-table-column>
          <el-table-column align="center" prop="name" label="姓名" width="80">
          </el-table-column>
          <el-table-column align="center" prop="engName" label="英文姓名" width="80">
          </el-table-column>
          <el-table-column align="center" prop="code" label="工号" width="80">
          </el-table-column>
          <el-table-column align="center" prop="account" label="域账号" width="80">
          </el-table-column>
          <el-table-column align="center" prop="email" label="Email" width="100">
          </el-table-column>
          <el-table-column align="center" prop="idCardNumber" label="身份证号码" width="150">
          </el-table-column>
          <el-table-column align="center" prop="note1" label="备注" width="180">
          </el-table-column>
          <el-table-column align="center" label="操作" width="300">
            <template slot-scope="scope">
              <el-button size="mini" type="success" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="primary" icon="el-icon-view" @click="handleView(scope.$index, scope.row)">详情</el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-pagination v-if="personnelPaginationShow" class="page-box" @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="pagination.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="岗位变动历史">
        <!-- 搜索筛选 -->
        <el-form :inline="true" :model="personnelFormInline" class="user-search">
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.deptName" placeholder="输入角色代码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.deptNo" placeholder="输入角色名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
          </el-form-item>
        </el-form>
        <!--列表-->
        <el-table size="small" :data="personnelListData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中">
          <el-table-column align="center" prop="deptName" label="角色代码" width="300">
          </el-table-column>
          <el-table-column align="center" prop="deptNo" label="角色名称" width="300">
          </el-table-column>
          <el-table-column align="center" prop="editTime" label="备注" width="300">
          </el-table-column>
          <el-table-column align="center" label="操作" width="355">
            <template slot-scope="scope">
              <el-button size="mini" type="success" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="primary" icon="el-icon-view" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <!-- <Pagination v-bind:child-msg="pagination" @callFather="callFather"></Pagination> -->
      </el-tab-pane>
    </el-tabs>
    <!-- 人员设置新增/编辑界面 -->
    <el-dialog :title="personnelTitle" :visible.sync="personnelEditFormVisible" width="30%" @click="closeDialog" class="dialog">
      <el-form label-width="120px" :model="personnelEditForm" :rules="personnelRules" ref="personnelEditForm">
        <el-form-item label="地区代码" prop="region">
          <el-input size="small" v-model="personnelEditForm.region" auto-complete="off" placeholder="请输入地区代码" class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="部门代码" prop="dept">
          <el-input size="small" v-model="personnelEditForm.dept" auto-complete="off" placeholder="请输入部门代码" class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="显示次序" prop="line">
          <el-input size="small" v-model="personnelEditForm.line" auto-complete="off" placeholder="请输入显示次序" class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="岗位职务代码" prop="position">
          <el-input size="small" v-model="personnelEditForm.position" auto-complete="off" placeholder="请输入岗位职务代码" class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input size="small" v-model="personnelEditForm.name" auto-complete="off" placeholder="请输入姓名" class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="英文姓名" prop="engName">
          <el-input size="small" v-model="personnelEditForm.engName" auto-complete="off" placeholder="请输入英文姓名" class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="code">
          <el-input size="small" v-model="personnelEditForm.code" auto-complete="off" placeholder="请输入工号" class="comWidth" :disabled="codeDis"></el-input>
        </el-form-item>
        <el-form-item label="域账号" prop="account">
          <el-input size="small" v-model="personnelEditForm.account" auto-complete="off" placeholder="请输入域账号" class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input size="small" v-model="personnelEditForm.email" auto-complete="off" placeholder="请输入Email" class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCardNumber">
          <el-input size="small" v-model="personnelEditForm.idCardNumber" auto-complete="off" placeholder="请输入身份证号码" class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note1">
          <el-input size="small" v-model="personnelEditForm.note1" auto-complete="off" placeholder="请输入备注" class="comWidth"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('personnelEditForm')">保存</el-button>
      </div>
    </el-dialog>
    <!-- 人员设置详情界面 -->
    <el-dialog title="详情" :visible.sync="personnelDetailsFormVisible" width="30%" @click="closeDialog()">
      <el-form label-width="120px" :model="personnelEditForm" ref="personnelEditForm" >
        <el-form-item label="地区代码" prop="region">
          <el-input size="small" v-text="personnelEditForm.region" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="dept">
          <el-input size="small" v-text="personnelEditForm.dept" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="显示次序" prop="line">
          <el-input size="small" v-text="personnelEditForm.line" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="岗位职务代码" prop="position">
          <el-input size="small" v-text="personnelEditForm.position" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input size="small" v-text="personnelEditForm.name" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="英文姓名" prop="engName">
          <el-input size="small" v-text="personnelEditForm.engName" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="code">
          <el-input size="small" v-text="personnelEditForm.code" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="域账号" prop="account">
          <el-input size="small" v-text="personnelEditForm.account" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input size="small" v-text="personnelEditForm.email" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCardNumber">
          <el-input size="small" v-text="personnelEditForm.idCardNumber" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note1">
          <el-input size="small" v-text="personnelEditForm.note1" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { personnelList, personnelSave, personnelDelete,personnelView,personnelUpdate } from '@/api/commonMG'
export default {
  data() {
    return {
      loading: false, //是显示加载
      personnelEditFormVisible: false, //控制编辑页面显示与隐藏
      personnelPaginationShow:true, //控制分页页面显示与否
      personnelDetailsFormVisible: false, //详情页面显示与否
      personnelTitle: '添加',
      codeDis: false,
      personnelEditForm: {
        region: '',
        dept: '',
        line: '',
        position: '',
        name: '',
        engName: '',
        code: '',
        account: '',
        email: '',
        idCardNumber: '',
        note1: '',
      },
      // personnelRules表单验证
      personnelRules: {
        region: [{ required: true, trigger: 'change',validator:(rule,value,callback)=> {
          if(!(/^[0-9]*$/).test(value) || value.length != 6){
            callback(new Error('请输入6位数地区代码'))
          }else{
            callback()
          }
        }}],
        dept: [{ required: true, trigger: 'change', validator:(rule,value,callback)=> {
          if(!(/^[0-9]*$/).test(value) || value.length != 12){
            callback(new Error('请输入12位数地区部门代码'))
          }else{
            callback()
          }
        }}],
        line: [{ required: true, trigger: 'change',validator:(rule,value,callback)=> {
          if(!(/^[0-9]*$/).test(value) || value.length != 4){
            callback(new Error('请输入4位数显示次序'))
          }else{
            callback()
          }
        }}],
        position: [{ required: true, trigger: 'change',validator:(rule,value,callback)=> {
          if(!(/^[0-9]*$/).test(value) || value.length != 8){
            callback(new Error('请输入8位数岗位职务代码'))
          }else{
            callback()
          }
        }}],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur', }],
        code: [{ required: true,trigger: 'change',validator:(rule,value,callback)=> {
          if(!(/^[0-9]*$/).test(value) || value.length != 8){
            callback(new Error('请输入8位数工号'))
          }else{
            callback()
          }
        }}],
        account: [{ required: true, message: '请输入域账号', trigger: 'blur' }],
        // email: [{ required: false, trigger: 'blur',validator:(rule,value,callback)=> {
        //   if(!(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/).test(value)){
        //     callback(new Error('请输入正确的邮箱地址'))
        //   }else{
        //     callback()
        //   }
        // }}],
        idCardNumber: [{ required: true, trigger: 'change',validator:(rule,value,callback)=> {
          if(!(/^[0-9]*$/).test(value) || value.length != 18){
            callback(new Error('请输入18位数身份证号码'))
          }else{
            callback()
          }
        }}],
        note1: [{ required: false, trigger: 'blur',validator:(rule,value,callback)=> {
          if(value != '' && value != null){
            if(value.length > 128){
              callback(new Error('请输入不多余128字备注'))
            }else{
              callback()
            }
          }else{
            callback()
          }
        }}],
      },
      personnelFormInline: {
        region: '',
        dept: '',
        line: '',
        position: '',
        name: '',
        engName: '',
        code: '',
        account: '',
        email: '',
        idCardNumber: '',
        note1: '',
      },
      personnelListData: [], //用户数据
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
    // 获取公司列表
    getdata() {
      this.loading = true
      this.params = {
        region:this.personnelFormInline.region,
        dept:this.personnelFormInline.dept,
        line:this.personnelFormInline.line,
        position:this.personnelFormInline.position,
        name:this.personnelFormInline.name,
        engName:this.personnelFormInline.engName,
        code:this.personnelFormInline.code,
        account:this.personnelFormInline.account,
        email:this.personnelFormInline.email,
        idCardNumber:this.personnelFormInline.idCardNumber,
        note1:this.personnelFormInline.note1,
        currentPage:this.pagination.currentPage,
        pageSize:this.pagination.pageSize
      }
      personnelList(this.params).then(res =>{
        this.loading = false
        if(res.success == false){
          this.$message({
               type: 'info',
               message: res.errors
          })
        }else{
          this.personnelListData = res.result;
          this.pagination.total = res.total
        }
      }).catch(error =>{
        this.loading = false
        this.$message({
            type: 'info',
            message: error
        })
      })
    },
    // 搜索事件
    search() {
      this.personnelPaginationShow = false
      this.handleCurrentChange(1)
      this.$nextTick(function () {
        this.personnelPaginationShow = true;
      })
      this.getdata()
    },
    // 显示新增界面
    handleAdd: function(index, row) {
      this.personnelEditFormVisible = true
      this.personnelTitle = '添加'
      this.codeDis = false
      this.personnelEditForm.region = ''
      this.personnelEditForm.dept = ''
      this.personnelEditForm.line = ''
      this.personnelEditForm.position = ''
      this.personnelEditForm.name = ''
      this.personnelEditForm.engName = ''
      this.personnelEditForm.code = ''
      this.personnelEditForm.account = ''
      this.personnelEditForm.email = ''
      this.personnelEditForm.idCardNumber = ''
      this.personnelEditForm.note1 = ''
    },
    // 显示编辑界面
    handleEdit:function(index,row){
      this.personnelEditFormVisible = true
      this.personnelTitle = '修改'
      personnelView(row.code).then(res =>{
        this.codeDis = true
        this.personnelEditForm.region = res.result.region
        this.personnelEditForm.dept = res.result.dept
        this.personnelEditForm.line = (res.result.line).toString()
        this.personnelEditForm.position = res.result.position
        this.personnelEditForm.name = res.result.name
        this.personnelEditForm.engName = res.result.engName
        this.personnelEditForm.code = res.result.code
        this.personnelEditForm.account = res.result.account
        this.personnelEditForm.email = res.result.email
        this.personnelEditForm.idCardNumber = res.result.idCardNumber
        this.personnelEditForm.note1 = res.result.note1
      }).catch(error => {
        console.log(error)
      })
    },
    // 显示详情页
    handleView:function(index,row){
      this.personnelDetailsFormVisible = true
      this.personnelEditForm.region = row.region
      this.personnelEditForm.dept = row.dept
      this.personnelEditForm.line = row.line
      this.personnelEditForm.position = row.position
      this.personnelEditForm.name = row.name
      this.personnelEditForm.engName = row.engName
      this.personnelEditForm.code = row.code
      this.personnelEditForm.account = row.account
      this.personnelEditForm.email = row.email
      this.personnelEditForm.idCardNumber = row.idCardNumber
      this.personnelEditForm.note1 = row.note1
    },
    // 编辑、增加页面保存方法
    submitForm(personnelEditForm) {
      if(this.personnelTitle == "添加"){
        console.log(this.personnelEditForm);
        this.$refs[personnelEditForm].validate(valid => {
          if (valid) {
            personnelSave(this.personnelEditForm)
              .then(res => {
                this.personnelEditFormVisible = false
                this.loading = false
                if (res.success) {
                  this.$message({
                    type: 'success',
                    message: '人员保存成功！'
                  })
                  this.getdata()
                } else {
                  this.$message({
                    type: 'info',
                    message: res.msg
                  })
                }
              })
              .catch(err => {
                this.personnelEditFormVisible = false
                this.loading = false
                this.$message.error('人员保存失败，请稍后再试！')
              })
          } else {
            return false
          }
        })
      }else{
        this.$refs[personnelEditForm].validate(valid => {
          if (valid) {
            personnelUpdate(this.personnelEditForm)
              .then(res => {
                this.personnelEditFormVisible = false
                this.loading = false
                if (res.success) {
                  this.getdata()
                  this.$message({
                    type: 'success',
                    message: '人员编辑成功！'
                  })
                } else {
                  console.log(res)
                  this.$message({
                    type: 'info',
                    message: res.msg
                  })
                }
              })
              .catch(err => {
                console.log(err)
                this.personnelEditFormVisible = false
                this.loading = false
                this.$message.error('人员编辑失败，请稍后再试！')
              })
          } else {
            return false
          }
        })
      }
      
    },
    // 删除人员
    deleteUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          personnelDelete(row.code)
            .then(res => {
              if (res.data.success) {
                this.$message({
                  type: 'success',
                  message: '人员已删除!'
                })
                this.getdata()
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('人员删除失败，请稍后再试！')
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.personnelEditFormVisible = false
      this.personnelDetailsFormVisible = false
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
.el-form--inline .el-form-item {
  margin-right: 9px;
}
.comWidth {
  width:240px
}
.page-box {
  margin: 10px auto;
}
.el-dialog__body {
  padding: 0px 20px;
}
.el-form-item {
  margin-bottom: 12px;
}
.el-form-item__error {
  padding-top: 0px;
}
</style>

 
 