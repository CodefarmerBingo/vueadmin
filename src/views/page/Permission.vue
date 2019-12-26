<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="14">
        <div class="grid-content bg-purple">
          <el-row>
            <!-- 部门tree -->
            <el-col :span="12">
              <div class="treeDiv">
                <el-tree :data="deptTreeData" :props="deptTreeProps" 
                accordion @node-click="deptNodeClick" node-key="code"
                :default-expanded-keys="defaultExpandDeptCode">
                </el-tree>
              </div>
            </el-col>
            <!-- 省市tree -->
            <el-col :span="12">
              <div class="treeDiv">
                <el-tree :data="areaTreeData" :props="areaTreeProps"
                accordion show-checkbox @check="areaNodeCheck" :check-strictly="true" ref="areaTree"
                node-key="code" :default-expanded-keys="defaultExpandAreaCode">
                </el-tree>
              </div>
            </el-col>
          </el-row>
          <!-- 左下角table -->
          <el-row>
            <el-col :span="24">
              <!-- 搜索筛选 -->
                  <el-form :inline="true" :model="formInline" class="user-search">
                    <el-form-item label="">
                      <el-input size="mini" v-model="formInline.code" placeholder="输入工号"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                      <el-input size="mini" v-model="formInline.name" placeholder="输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button size="mini" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                    </el-form-item>
                  </el-form>
                  <!--列表-->
                  <el-table size="mini" :data="listData" highlight-current-row border element-loading-text="拼命加载中"
                   height="260" @row-click="handleRowChange" ref="configurationTable">
                    <el-table-column align="center" prop="name" label="姓名" width="110">
                    </el-table-column>
                    <el-table-column align="center" prop="code" label="工号" width="80">
                    </el-table-column>
                    <el-table-column align="center" prop="dept" label="部门" width="180">
                    </el-table-column>
                    <el-table-column align="center" prop="position" label="岗位职务" width="170">
                    </el-table-column>
                    <el-table-column align="center" prop="line" label="次序" width="50">
                    </el-table-column>
                    <el-table-column align="center" prop="account" label="域账号" width="100">
                    </el-table-column>
                    <el-table-column align="center" prop="region" label="地区代码" width="150">
                    </el-table-column>
                  </el-table>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="10">
        <!-- 所有权限列表 -->
        <el-row>
          <el-col :span="24">
            <el-table size="mini" :data="priviAllList" stripe border highlight-current-row ref="priviAllListTable" height="300" @selection-change="selectPriviAll" style="width: 100%">
              <el-table-column type="selection" width="40" align="center"></el-table-column>
              <el-table-column label="序号" type="index" width="46" align="center"></el-table-column>
              <el-table-column prop="functionShow" label="功能名称" width="192" align="center"></el-table-column>
              <el-table-column prop="privilegeShow" label="权限" width="90" align="center"></el-table-column>
              <el-table-column prop="regionShow" label="地区代码" align="center"></el-table-column>          
            </el-table>
          </el-col>
        </el-row>
        <!-- 中间授权权限控件 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-col :span="1" :offset="10">
              <el-button type="primary" icon="el-icon-arrow-down" size="mini" circle title="授权选中权限" @click="addPrivi"></el-button>
            </el-col>
            <el-col :span="1" :offset="2">
              <el-button type="primary" icon="el-icon-arrow-up" size="mini" circle title="删除选中权限" @click="deletePrivi"></el-button>
            </el-col>
          </el-col>
        </el-row>
        <!-- 已授权权限列表 -->
        <el-row>
          <el-col :span="24">
            <el-table size="mini" :data="priviExitList" stripe border highlight-current-row ref="priviExitListTable" height="300" @selection-change="selectPriviExit" style="width: 100%">
              <el-table-column type="selection" width="40" align="center"></el-table-column>
              <el-table-column label="序号" type="index" width="46" align="center"></el-table-column>
              <el-table-column prop="functionShow" label="功能名称" width="192" align="center"></el-table-column>
              <el-table-column prop="privilegeShow" label="权限" width="90" align="center"></el-table-column>
              <el-table-column prop="regionShow" label="地区代码" align="center"></el-table-column>          
            </el-table>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { deptMenu, areaMenu, getTable, privilegeAllList, privilegeExitList, privilegeAdd, privilegeDelete} from '@/api/commonMG.js'
import store from '@/store/store'
// 导出模块
export default {
  // 模块名字
  name: "Permission",
  // 模块数据
  data() {
    //数据  
    return {
      formInline: {          // 搜索条件
        code:'',
        name:'',
        dept:''
      },
      listData: [],          // 部门列表数据
      deptTreeList: [],      // 部门tree接口数据处理数组
      deptTreeData: [],      // 部门tree接口数据显示数组
      defaultExpandDeptCode: [],   // 部门tree控件默认展开2级
      deptTreeProps: {            // 部门tree节点回显参数设置
        children: 'levelDto',
        label: 'treeName'
      },          
      deptAreaList: [],      // 地区tree接口数据处理数组
      areaTreeData: [],      // 地区tree接口数据显示数组
      defaultExpandAreaCode: [],   // 省市tree控件默认展开2级
      areaTreeProps: {            // 省市tree节点回显参数设置
        children: 'levelDto',
        label: 'treeName'
      },
      priviAllList: [],       // 所有权限列表数据    
      priviExitList: [],      // 已授权权限列表数据
      areaSelectList: [],     // 省市节点已选择数据数组
      priviAllSelectList: [], // 全部权限列表已选择数据数组
      priviExitSelectList: [],// 已选择权限列表已选择数据数组
      priviCode: '',           // 要授权的部门工号
      accountCode: JSON.parse(localStorage.getItem('userdata')).code   // 登录用户的工号code
    };
  },
  // 监听指定值，只有指定值变化，才会触发
  watch: {},
  // 里面的函数只有调用才会执行（实时计算）里面是定义的方法
  created(){
    this.getAreaData()
    this.getDeptData()
  },
  methods: {
    // 部门tree数据获取
    getDeptData(){
      let _this = this
      deptMenu().then(res => {
        let result = res.result
        for(var i=0;i<result.length;i++){
          if(result[i].father != '0'){
            _this.deptTreeList.push(result[i])
            _this.defaultExpandDeptCode.push(result[i].code)
          }else{
            _this.deptTreeList[0].levelDto.push(result[i])
          }
        }
        this.deptTreeData = _this.deptTreeList
      })
    },
    // 省市tree数据获取
    getAreaData(){
      let _this = this
      let areaList = JSON.parse(localStorage.getItem("areaList"))
      if(areaList == null){
        areaMenu().then(res => {
          let result = res.result
          for(var i=0;i<result.length;i++){
            if(result[i].father != '0'){
              _this.deptAreaList.push(result[i])
              _this.defaultExpandAreaCode.push(result[i].code)
            }else{
              _this.deptAreaList[0].levelDto.push(result[i])
            }
          }
          _this.areaTreeData = _this.deptAreaList
          localStorage.setItem("areaList", JSON.stringify(_this.deptAreaList))
        })
      }else{
        _this.areaTreeData = areaList
        this.defaultExpandAreaCode.push(areaList[0].code)
      }
    },
    // 部门节点选择
    deptNodeClick(params){
      this.formInline.dept = params.node
      this.search()
    },
    // 条件搜索
    search(){
      let params = {code:this.formInline.code,name:this.formInline.name,dept:this.formInline.dept}
      getTable(params).then(res => {
        if(res.success){
          if(res.result.length == 0){
            this.priviAllList = []
            this.priviExitList = []
          }
          this.listData = res.result
          this.$refs.configurationTable.$el.style.width = '98%'
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 部门列表点击
    handleRowChange(row){
      this.priviCode = row.code
      privilegeAllList(this.accountCode,row.code).then(res => {
        if(res.success){
          this.priviAllList = res.result
          this.$refs.priviAllListTable.$el.style.width = '99.1%'
        }
      }).catch(error => {
        console.log(error)
      }),
      privilegeExitList(row.code).then(res => {
        if(res.success){
          this.priviExitList = res.result
          this.$refs.priviExitListTable.$el.style.width = '99.1%'
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 省市节点选择
    areaNodeCheck(data){
      this.areaSelectList = [].concat(this.$refs.areaTree.getCheckedKeys())
    },
    // 所有权限列表选择状态
    selectPriviAll(data){
      this.priviAllSelectList = [].concat(data)
    },
    // 已授权权限列表选择状态
    selectPriviExit(data){
      this.priviExitSelectList = [].concat(data)
    },
    // 授权权限
    addPrivi(){
      if(this.areaSelectList.length == 0){
        this.$message({
            type: 'warning',
            message: '请至少选择一个省市区！'
        })
        return
      }else if(this.priviAllSelectList.length == 0){
        this.$message({
            type: 'warning',
            message: '请至少选择一个权限！'
        })
        return
      }else{
        let priviAllList = []
        for(var i=0;i<this.priviAllSelectList.length;i++){
          priviAllList.push({
            function:this.priviAllSelectList[i].function,
            privilege:this.priviAllSelectList[i].privilege
          })
        }
        let params = {code:this.priviCode,regions:this.areaSelectList,privileges:priviAllList}
        privilegeAdd(params).then(res => {
          console.log(res)
          if(res.success){
            this.$refs.priviAllListTable.clearSelection();
            privilegeExitList(this.priviCode).then(res => {
              if(res.success){
                this.$message({
                    type: 'success',
                    message: '添加权限成功！'
                })
                this.priviExitList = res.result
                this.$refs.priviExitListTable.$el.style.width = '99.1%'
              }
            }).catch(error => {
              console.log(error)
            })
          }
        }).catch(error => {
          this.$message({
              type: 'error',
              message: '添加权限失败！'
          })
        })
      }
    },
    // 删除权限
    deletePrivi(){
      let priviExitList = []
      for(var i=0;i<this.priviExitSelectList.length;i++){
        priviExitList.push({
          code:this.priviExitSelectList[i].code,
          function:this.priviExitSelectList[i].function,
          privilege:this.priviExitSelectList[i].privilege,
          region:this.priviExitSelectList[i].region,
        })
      }
      console.log(priviExitList)
      if(priviExitList.length != 0){
        privilegeDelete(priviExitList).then(res => {
          privilegeExitList(this.priviCode).then(res => {
            if(res.success){
              this.$refs.priviAllListTable.clearSelection();
              this.$message({
                  type: 'success',
                  message: '删除权限成功！'
              })
              this.priviExitList = res.result
              this.$refs.priviExitListTable.$el.style.width = '99.1%'
            }
          }).catch(error => {
            console.log(error)
          })
        }).catch(error => {
          this.$message({
            type: 'warning',
            message: '删除权限失败！'
          })
        })
      }else{
        this.$message({
            type: 'warning',
            message: '请至少选择一个权限！'
        })
      }
    }
  }
};
</script>
// scoped 样式只在本组件使用
<style scoped>
.el-row {
    margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-row  .el-col {
  border-radius: 0px;
}
.el-row  .bg-purple-dark {
  background: #99a9bf;
}
.el-row .bg-purple {
  background: #fff;
}
.el-row  .bg-purple-light {
  background: #e5e9f2;
}
.el-row  .grid-content {
  border-radius: 0px;
  min-height: 36px;
  height: 674px
}
.el-row .treeDiv {
  border-radius: 0px;
  height: 337px;
  /* border: 1px solid #ccc; */
  overflow: auto;
}
</style>
