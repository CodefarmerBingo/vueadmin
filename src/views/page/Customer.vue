<template>
  <div>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="customerFormInline">
      <el-form-item>
        <el-input size="small" v-model="customerFormInline.keyWord" placeholder="输入关键字"></el-input>
      </el-form-item>
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
        <el-button size="small" type="primary" icon="el-icon-refresh" @click="refresh">清空</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-edit" @click="modify">修改</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" height="402" @row-click="handleRowChange" ref="configurationTable" stripe :data="customerListData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中">
      <el-table-column align="center" prop="customerId" label="客户编号" width="160">
      </el-table-column>
      <el-table-column align="center" prop="customerName" label="客户名称" width="230">
      </el-table-column>
      <el-table-column align="center" prop="address" label="地址" width="450">
      </el-table-column>
      <el-table-column align="center" prop="custTelephone" label="电话号码" width="110">
      </el-table-column>
      <el-table-column align="center" prop="region" label="地区代码" width="70">
      </el-table-column>
      <el-table-column align="center" prop="provinceAndCity" label="地区名称" width="200">
      </el-table-column>
      <el-table-column align="center" prop="tradeName" label="行业类别名称" width="95">
      </el-table-column>
      <el-table-column align="center" prop="industryName" label="行业名称" width="180">
      </el-table-column>
      <el-table-column align="center" prop="aliasName" label="客户别名" width="100">
      </el-table-column>
      <el-table-column align="center" prop="custCode" label="客户编码" width="350">
      </el-table-column>
      <el-table-column align="center" prop="updateTime" label="更新时间" width="150">
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination v-if="personnelPaginationShow" class="page-box" @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="pagination.currentPage" :page-sizes="[100,200, 500, 1000, 2000]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"></el-pagination>
    <!-- 显示详情 -->
    <el-form :inline="true" :model="customerEditForm" class="user-search">
      <el-form-item>
        <el-input size="small" v-model="customerEditForm.keyWord" placeholder="关键字"></el-input>
      </el-form-item>
      <el-input size="small" v-model="customerEditForm.rrwId" placeholder="列ID" style="display:none"></el-input>
      <el-form-item>
        <el-input size="small" v-model="customerEditForm.customerId" placeholder="客户编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="customerEditForm.customerName" placeholder="客户名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="customerEditForm.address" placeholder="地址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="customerEditForm.custTelephone" placeholder="电话号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="customerEditForm.region" placeholder="地区代码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="customerEditForm.provinceAndCity" placeholder="地区名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="customerEditForm.tradeName" placeholder="行业类别名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="customerEditForm.industryName" placeholder="行业名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="customerEditForm.aliasName" placeholder="客户别名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="customerEditForm.custCode" placeholder="客户编码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="customerEditForm.updateTime" placeholder="更新时间"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { customerList, modifyKeyWord } from '@/api/commonMG'
export default {
  data() {
    return {
      loading: false, //是显示加载
      personnelPaginationShow:true, //控制分页页面显示与否
      customerDetailsFormVisible: false, //详情页面显示与否
      customerFormInline: {
        keyWord: '',
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
      customerEditForm:{
        keyWord: '',
        rrwId: '',
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
        pageSize: 100,
        total: 0
      },
      params:{}
    }
  },
  created() {
    this.customerFormInline.region = JSON.parse(localStorage.getItem('userdata')).region.substring(0,2);
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
        keyWord:this.customerFormInline.keyWord,
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
        currentPage:this.pagination.currentPage,
        pageSize:this.pagination.pageSize,
      }
      customerList(this.params).then(res =>{
        this.loading = false
        if(res.success){
          this.customerListData = res.result;
          this.pagination.total = res.total
          this.$refs.configurationTable.$el.style.width = '99%'
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
    // 分页组件的当前页和分页变化
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.getdata()
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.getdata()
    },
    // 清空搜索条件
    refresh(){
      this.customerFormInline.keyWord = ''
      this.customerFormInline.customerId = ''
      this.customerFormInline.customerName = ''
      this.customerFormInline.address = ''
      this.customerFormInline.custTelephone = ''
      this.customerFormInline.region = ''
      this.customerFormInline.provinceAndCity = ''
      this.customerFormInline.tradeName = ''
      this.customerFormInline.industryName = ''
      this.customerFormInline.aliasName = ''
      this.customerFormInline.custCode = ''
      this.customerFormInline.updateTime = ''
    },
    // 点击行下方显示详情
    handleRowChange(row){
      this.customerEditForm.keyWord = row.keyWord
      this.customerEditForm.rrwId = row.rrwId
      this.customerEditForm.customerId = row.customerId
      this.customerEditForm.customerName = row.customerName
      this.customerEditForm.address = row.address
      this.customerEditForm.custTelephone = row.custTelephone
      this.customerEditForm.region = row.region
      this.customerEditForm.provinceAndCity = row.provinceAndCity
      this.customerEditForm.tradeName = row.tradeName
      this.customerEditForm.industryName = row.industryName
      this.customerEditForm.aliasName = row.aliasName
      this.customerEditForm.custCode = row.custCode
      this.customerEditForm.updateTime = row.updateTime
    },
    // 修改关键字
    modify(){
      modifyKeyWord(this.customerEditForm.keyWord,this.customerEditForm.rrwId).then(res => {
        if(res.success){
          this.getdata()
        }else{
          this.$message({
            type: 'warning',
            message: '修改关键字失败！'
        })
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.user-search {
  border: 1px solid #dddddd;
  padding: 10px 0 0 15px
}
</style>

 
 