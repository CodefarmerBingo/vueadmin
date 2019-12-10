<template>
  <div>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="customerFormInline" class="user-search">
      <el-form-item>
        <el-input size="small" v-model="customerFormInline.customerId" placeholder="输入客户编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="customerFormInline.customerName" placeholder="输入客户名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="customerFormInline.address" placeholder="输入地址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="customerFormInline.custTelephone" placeholder="输入电话号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="customerFormInline.region" placeholder="输入地区代码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="customerFormInline.aliasName" placeholder="输入客户别名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="customerFormInline.custCode" placeholder="输入客户编码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" height="490" :data="customerListData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中">
      <el-table-column align="center" prop="customerId" label="客户编号" width="130">
      </el-table-column>
      <el-table-column align="center" prop="customerName" label="客户名称" width="230">
      </el-table-column>
      <el-table-column align="center" prop="address" label="地址" width="250">
      </el-table-column>
      <el-table-column align="center" prop="custTelephone" label="电话号码" width="100">
      </el-table-column>
      <el-table-column align="center" prop="region" label="地区代码" width="70">
      </el-table-column>
      <el-table-column align="center" prop="provinceAndCity" label="地区名称" width="160">
      </el-table-column>
      <el-table-column align="center" prop="tradeName" label="行业类别名称" width="95">
      </el-table-column>
      <el-table-column align="center" prop="industryName" label="行业名称" width="100">
      </el-table-column>
      <el-table-column align="center" prop="aliasName" label="客户别名" width="100">
      </el-table-column>
      <el-table-column align="center" prop="custCode" label="客户编码" width="200">
      </el-table-column>
      <el-table-column align="center" prop="updateTime" label="更新时间" width="200">
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-view" @click="handleView(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination v-if="personnelPaginationShow" class="page-box" @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="pagination.currentPage" :page-sizes="[200, 500, 1000, 2000]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"></el-pagination>
    <!-- 客户信息详情界面 -->
    <el-dialog title="详情" :visible.sync="customerDetailsFormVisible" width="30%" @click="closeDialog()">
      <el-form label-width="120px" :model="customerDetailsForm" ref="customerDetailsForm" >
        <el-form-item label="客户编号" prop="customerId">
          <el-input size="small" v-text="customerDetailsForm.customerId" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="customerName">
          <el-input size="small" v-text="customerDetailsForm.customerName" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input size="small" v-text="customerDetailsForm.address" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="custTelephone">
          <el-input size="small" v-text="customerDetailsForm.custTelephone" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="地区代码" prop="region">
          <el-input size="small" v-text="customerDetailsForm.region" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="地区名称" prop="provinceAndCity">
          <el-input size="small" v-text="customerDetailsForm.provinceAndCity" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="行业类别名称" prop="tradeName">
          <el-input size="small" v-text="customerDetailsForm.tradeName" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="行业名称" prop="industryName">
          <el-input size="small" v-text="customerDetailsForm.industryName" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="客户别名" prop="aliasName">
          <el-input size="small" v-text="customerDetailsForm.aliasName" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="客户编码" prop="custCode">
          <el-input size="small" v-text="customerDetailsForm.custCode" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="更新时间" prop="updateTime">
          <el-input size="small" v-text="customerDetailsForm.updateTime" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { customerList } from '@/api/commonMG'
export default {
  data() {
    return {
      loading: false, //是显示加载
      personnelPaginationShow:true, //控制分页页面显示与否
      customerDetailsFormVisible: false, //详情页面显示与否
      customerFormInline: {
        customerId: '',
        customerName: '',
        address: '',
        custTelephone: '',
        region: '',
        provinceAndCity: '',
        tradeName: '',
        industryName: '',
        aliasName: '',
        custCode: '',
        updateTime: '',
      },
      customerDetailsForm: {
        customerId: '',
        customerName: '',
        address: '',
        custTelephone: '',
        region: '',
        provinceAndCity: '',
        tradeName: '',
        industryName: '',
        aliasName: '',
        custCode: '',
        updateTime: '',
      },
      customerListData: [], //用户数据
      // 分页参数
      pagination: {
        currentPage: 1,
        pageSize: 200,
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
        customerId:this.customerFormInline.customerId,
        customerName:this.customerFormInline.customerName,
        address:this.customerFormInline.address,
        custTelephone:this.customerFormInline.custTelephone,
        region:this.customerFormInline.region,
        provinceAndCity:this.customerFormInline.provinceAndCity,
        tradeName:this.customerFormInline.tradeName,
        industryName:this.customerFormInline.industryName,
        aliasName:this.customerFormInline.aliasName,
        custCode:this.customerFormInline.custCode,
        updateTime:this.customerFormInline.updateTime,
        currentPage:this.pagination.currentPage,
        pageSize:this.pagination.pageSize,
      }
      customerList(this.params).then(res =>{
        console.log(res)
        this.loading = false
        if(res.success == false){
          this.$message({
               type: 'info',
               message: res.errors
          })
        }else{
          this.customerListData = res.result;
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
    // 显示详情页
    handleView:function(index,row){
      this.customerDetailsFormVisible = true
      this.customerDetailsForm.customerId = row.customerId
      this.customerDetailsForm.customerName = row.customerName
      this.customerDetailsForm.address = row.address
      this.customerDetailsForm.custTelephone = row.custTelephone
      this.customerDetailsForm.region = row.region
      this.customerDetailsForm.provinceAndCity = row.provinceAndCity
      this.customerDetailsForm.tradeName = row.tradeName
      this.customerDetailsForm.industryName = row.industryName
      this.customerDetailsForm.aliasName = row.aliasName
      this.customerDetailsForm.custCode = row.custCode
      this.customerDetailsForm.updateTime = row.updateTime
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.customerDetailsFormVisible = false
      this.customerDetailsFormVisible = false
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
  width:240px;
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

 
 