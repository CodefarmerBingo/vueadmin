<template>
  <div>
    <el-tabs :tab-position="tabPosition" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="员工设置" name="员工设置">
        <!-- 员工设置搜索筛选 -->
        <el-form :inline="true" :model="personnelFormInline">
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.region" maxlength="6" show-word-limit placeholder="输入地区代码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.dept" maxlength="12" show-word-limit placeholder="输入部门代码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.line" maxlength="4" show-word-limit placeholder="输入显示次序"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.position" maxlength="8" show-word-limit placeholder="输入岗位职务"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.name" placeholder="输入姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.engName" placeholder="输入英文姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.code" maxlength="8" show-word-limit placeholder="输入工号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.account" placeholder="输入域账号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.email" placeholder="输入Email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.idCardNumber" maxlength="18" show-word-limit placeholder="输入身份证号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="personnelFormInline.note1" placeholder="输入备注"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
          </el-form-item>
        </el-form>
        <!-- 员工设置列表-->
        <el-table size="small" height="460" stripe ref="configurationTable" :data="personnelListData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中">
          <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
          <el-table-column align="center" prop="region" label="地区代码/名称" width="150">
          </el-table-column>
          <el-table-column align="center" prop="dept" label="部门代码/名称" width="250">
          </el-table-column>
          <el-table-column align="center" prop="line" label="显示次序" width="70">
          </el-table-column>
          <el-table-column align="center" prop="position" label="岗位职务代码/名称" width="170">
          </el-table-column>
          <el-table-column align="center" prop="name" label="姓名" width="100">
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
          <el-table-column align="center" label="操作" width="140" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="success" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" circle title="编辑"></el-button>
              <el-button size="mini" type="primary" icon="el-icon-view" @click="handleView(scope.$index, scope.row)" circle title="详情"></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteUser(scope.$index, scope.row)" circle title="删除"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 员工设置分页组件 -->
        <el-pagination v-if="personnelPaginationShow" class="page-box" @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="pagination.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="岗位变动历史" name="岗位变动历史">
        <!-- 岗位变动历史搜索筛选 -->
        <el-form :inline="true" :model="historyFormInline">
          <el-form-item>
            <el-input size="small" maxlength="6" show-word-limit v-model="historyFormInline.region" placeholder="输入地区代码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" maxlength="12" show-word-limit v-model="historyFormInline.dept" placeholder="输入部门代码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" maxlength="4" show-word-limit v-model="historyFormInline.line" placeholder="输入显示次序"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" maxlength="8" show-word-limit v-model="historyFormInline.position" placeholder="输入岗位职务代码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="historyFormInline.name" placeholder="输入姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="historyFormInline.engName" placeholder="输入英文姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" maxlength="8" show-word-limit v-model="historyFormInline.code" placeholder="输入工号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="historyFormInline.account" placeholder="输入域账号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="historyFormInline.email" placeholder="输入Email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" maxlength="18" show-word-limit v-model="historyFormInline.idCardNumber" placeholder="输入身份证号码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="small" v-model="historyFormInline.note1" placeholder="输入备注"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" icon="el-icon-search" @click="historySearch">搜索</el-button>
          </el-form-item>
        </el-form>
        <!-- 岗位变动历史列表 -->
        <el-table size="small" height="460" stripe ref="historyConfigurationTable" :data="historyListData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中">
          <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
          <el-table-column align="center" prop="startTime" label="开始时间" width="90">
          </el-table-column>
          <el-table-column align="center" prop="endTime" label="结束时间" width="90">
          </el-table-column>
          <el-table-column align="center" prop="deptShow" label="部门代码" width="110">
          </el-table-column>
          <el-table-column align="center" prop="line" label="显示次序" width="70">
          </el-table-column>
          <el-table-column align="center" prop="positionShow" label="岗位职务" width="160">
          </el-table-column>
          <el-table-column align="center" prop="name" label="姓名" width="100">
          </el-table-column>
          <el-table-column align="center" prop="engName" label="英文姓名" width="100">
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
          <el-table-column align="center" prop="regionShow" label="地区代码" width="150">
          </el-table-column>
          <el-table-column align="center" label="操作" width="65" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-view" @click="historyHandleView(scope.$index, scope.row)" circle title="详情"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 岗位变动历史分页组件 -->
        <el-pagination v-if="historyPaginationShow" class="page-box" @size-change="historyHandleSizeChange" @current-change="historyHandleCurrentChange" background :current-page="historyPagination.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="historyPagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="historyPagination.total"></el-pagination>
      </el-tab-pane>
    </el-tabs>
    <!-- 人员设置新增/编辑界面 -->
    <el-dialog :title="personnelTitle" :visible.sync="personnelEditFormVisible" width="30%" @click="closeDialog" class="dialog" v-if="personnelEditFormVisible">
      <el-form label-width="120px" :model="personnelEditForm" :rules="personnelRules" ref="personnelEditForm" class="dialogForm">
        <el-form-item label="地区代码" prop="region">
          <el-input size="small" v-model="personnelEditForm.region" maxlength="6" show-word-limit auto-complete="off" placeholder="请输入地区代码" class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="部门代码" prop="dept">
          <el-input size="small" v-model="personnelEditForm.dept" maxlength="12" show-word-limit auto-complete="off" placeholder="请输入部门代码" class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="显示次序" prop="line">
          <el-input size="small" v-model="personnelEditForm.line" maxlength="4" show-word-limit auto-complete="off" placeholder="请输入显示次序" class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="岗位职务代码" prop="position">
          <el-select v-model="deptOption" placeholder="请选择" class="selectWidth">
            <el-option size="small" v-for="item in deptOptions" :key="item.code" :label="item.label" :value="item.code"></el-option>
          </el-select>
          <!-- <el-input size="small" v-model="personnelEditForm.position" maxlength="8" show-word-limit auto-complete="off" placeholder="请输入岗位职务代码" class="comWidth"></el-input> -->
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input size="small" v-model="personnelEditForm.name" auto-complete="off" placeholder="请输入姓名" class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="英文姓名" prop="engName">
          <el-input size="small" v-model="personnelEditForm.engName" auto-complete="off" placeholder="请输入英文姓名" class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="code">
          <el-input size="small" v-model="personnelEditForm.code" maxlength="8" show-word-limit auto-complete="off" placeholder="请输入工号" class="comWidth" :disabled="codeDis"></el-input>
        </el-form-item>
        <el-form-item label="域账号" prop="account">
          <el-input size="small" v-model="personnelEditForm.account" auto-complete="off" placeholder="请输入域账号" class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input size="small" v-model="personnelEditForm.email" auto-complete="off" placeholder="请输入Email" class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCardNumber">
          <el-input size="small" v-model="personnelEditForm.idCardNumber" maxlength="18" show-word-limit auto-complete="off" placeholder="请输入身份证号码" class="comWidth"></el-input>
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
    <el-dialog title="详情" :visible.sync="personnelDetailsFormVisible" width="30%" @click="closeDialog()" class="dialog">
      <el-form label-width="120px" :model="personnelEditForm" ref="personnelEditForm" class="dialogForm">
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
    <!-- 岗位变动历史详情界面 -->
    <el-dialog title="详情" :visible.sync="historyDetailsFormVisible" width="30%" @click="historyCloseDialog()" class="dialog">
      <el-form label-width="120px" :model="historyDetailForm" ref="historyDetailForm" class="dialogForm">
        <el-form-item label="开始时间" prop="startTime">
          <el-input size="small" v-text="historyDetailForm.startTime" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-input size="small" v-text="historyDetailForm.endTime" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="部门代码" prop="deptShow">
          <el-input size="small" v-text="historyDetailForm.deptShow" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="显示次序" prop="line">
          <el-input size="small" v-text="historyDetailForm.line" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="岗位职务" prop="positionShow">
          <el-input size="small" v-text="historyDetailForm.positionShow" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input size="small" v-text="historyDetailForm.name" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="英文姓名" prop="engName">
          <el-input size="small" v-text="historyDetailForm.engName" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="code">
          <el-input size="small" v-text="historyDetailForm.code" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="域账号" prop="account">
          <el-input size="small" v-text="historyDetailForm.account" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input size="small" v-text="historyDetailForm.email" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCardNumber">
          <el-input size="small" v-text="historyDetailForm.idCardNumber" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note1">
          <el-input size="small" v-text="historyDetailForm.note1" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="地区代码" prop="regionShow">
          <el-input size="small" v-text="historyDetailForm.regionShow" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { personnelList, personnelSave, personnelDelete, personnelView, personnelUpdate, historyList, historySave, historyDelete, historyView, historyUpdate, postList } from '@/api/commonMG'
export default {
  data() {
    return {
      loading: false, //是显示加载
      personnelEditFormVisible: false, //控制编辑页面显示与隐藏
      personnelPaginationShow:true, //控制分页页面显示与否
      personnelDetailsFormVisible: false, //详情页面显示与否
      personnelTitle: '添加',
      historyPaginationShow:true, //控制分页页面显示与否
      historyDetailsFormVisible: false, //详情页面显示与否
      codeDis: false,
      historyCodeDis: false,
      tabPosition: 'top',
      activeName: '员工设置',
      deptOptions: [],
      deptOption: '',
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
        email: [{ required: false, trigger: 'blur',validator:(rule,value,callback)=> {
          if(value==''||value==undefined||value==null){
            callback();
          }else{
            if(!(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/).test(value)){
              callback(new Error('请输入正确的邮箱地址'))
            }else{
              callback()
            }
          }
        }}],
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
      params:{},


      // 岗位变动历史参数
      historyDetailForm: {
        startTime: '',
        endTime: '',
        dept: '',
        deptShow: '',
        line: '',
        position: '',
        positionShow: '',
        code: '',
      },
      historyFormInline: {
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
      historyListData: [], //用户数据
      // 分页参数
      historyPagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      historyParams:{},
    }
  },
  created() {
    this.getdata()
    this.getDeptOptions()
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    handleClick(tab) {
        if(tab.name == '人员设置'){
          this.getdata()
        }else{
          this.historyGetdata()
        }
    },
    // 获取人员列表
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
        if(res.success){
          this.personnelListData = res.result
          this.pagination.total = res.total
          this.$refs.configurationTable.$el.style.width = '98%'
        }else{
          if(res.code == '403'){
            this.$message({
                 type: 'warning',
                 message: res.msg
            })
          }
        }
      }).catch(error =>{
        this.loading = false
        this.$message({
            type: 'warning',
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
    },
    // 显示新增界面
    handleAdd: function(index, row) {
      this.personnelEditFormVisible = true
      this.personnelTitle = '添加'
      this.codeDis = false
      this.personnelEditForm.region = ''
      this.personnelEditForm.dept = ''
      this.personnelEditForm.line = ''
      this.personnelEditForm.position = this.deptOptions[0].code
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
        this.$refs[personnelEditForm].validate(valid => {
          if (valid) {
            personnelSave(this.personnelEditForm)
              .then(res => {
                console.log(res)
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
                    type: 'warning',
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
                    type: 'warning',
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
                  type: 'warning',
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
            type: 'warning',
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
    },
    getDeptOptions(){
      let params = {currentPage:1,pageSize:100}
      postList(params).then(res => {
        this.deptOptions = res.result
        this.deptOption = this.deptOptions[0].code
      }).catch(error => {
        console.log(error)
      })
    },

    // 岗位变动历史页面方法
    // 获取岗位历史变动页面列表
    historyGetdata() {
      this.loading = true
      this.historyParams = {
        region:this.historyFormInline.region,
        dept:this.historyFormInline.dept,
        line:this.historyFormInline.line,
        position:this.historyFormInline.position,
        name:this.historyFormInline.name,
        engName:this.historyFormInline.engName,
        code:this.historyFormInline.code,
        account:this.historyFormInline.account,
        email:this.historyFormInline.email,
        idCardNumber:this.historyFormInline.idCardNumber,
        note1:this.historyFormInline.note1,
        currentPage:this.historyPagination.currentPage,
        pageSize:this.historyPagination.pageSize
      }
      historyList(this.historyParams).then(res =>{
        this.loading = false
        if(res.success){
          this.historyListData = res.result
          this.historyPagination.total = res.total
          this.$refs.historyConfigurationTable.$el.style.width = '98%'
        }else{
          if(res.code == '403'){
            this.$message({
                 type: 'warning',
                 message: res.msg
            })
          }
        }
      }).catch(error =>{
        this.loading = false
        this.$message({
            type: 'warning',
            message: error
        })
      })
    },
    // 搜索事件
    historySearch() {
      this.historyPaginationShow = false
      this.historyHandleCurrentChange(1)
      this.$nextTick(function () {
        this.historyPaginationShow = true;
      })
      this.historyGetdata()
    },
    // 显示详情页
    historyHandleView:function(index,row){
      this.historyDetailsFormVisible = true
      this.historyDetailForm.startTime = row.startTime
      this.historyDetailForm.endTime = row.endTime
      this.historyDetailForm.deptShow = row.deptShow
      this.historyDetailForm.line = row.line
      this.historyDetailForm.positionShow = row.positionShow
      this.historyDetailForm.name = row.name
      this.historyDetailForm.engName = row.engName
      this.historyDetailForm.code = row.code
      this.historyDetailForm.account = row.account
      this.historyDetailForm.email = row.email
      this.historyDetailForm.idCardNumber = row.idCardNumber
      this.historyDetailForm.note1 = row.note1
      this.historyDetailForm.regionShow = row.regionShow
    },
    // 关闭编辑、增加弹出框
    historyCloseDialog() {
      this.historyDetailsFormVisible = false
    },
    // 分页组件的当前页和分页变化
    historyHandleSizeChange(val) {
      this.historyPagination.pageSize = val
      this.historyGetdata()
    },
    historyHandleCurrentChange(val) {
      this.historyPagination.currentPage = val
      this.historyGetdata()
    },
  }
}
</script>

<style scoped>
.dialog /deep/ .historyForm{
  height: 320px
}
.selectWidth /deep/ .el-select {
  width: 240px
}
.selectWidth /deep/ .el-input__inner {
  width: 240px
}
</style>

 
 