<template>
  <div>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="reportFormInline" class="user-search">
      <el-form-item>
        <el-select v-model="areaValue" placeholder="请选择">
          <el-option size="small" v-for="item in areaOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="timeValue" placeholder="请选择">
          <el-option size="small" v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="reportFormInline.ttime" placeholder="输入时间"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="reportFormInline.region" placeholder="输入地区代码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" height="490" stripe ref="configurationTable" :data="reportListData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中">
      <el-table-column align="center" prop="ttime" label="时间" width="120">
      </el-table-column>
      <el-table-column align="center" prop="provinceCode" label="地区代码" width="70">
      </el-table-column>
      <el-table-column align="center" prop="provinceName" label="地区名称" width="70">
      </el-table-column>
      <el-table-column align="center" prop="callInNumber" label="呼入数量" width="70">
      </el-table-column>
      <el-table-column align="center" prop="connectionNumber" label="接通数量" width="70">
      </el-table-column>
      <el-table-column align="center" prop="connectionRate" label="接通率" width="70">
      </el-table-column>
      <el-table-column align="center" prop="callTime" label="呼入时长" width="70">
      </el-table-column>
      <el-table-column align="center" prop="queueTime" label="坐席时长" width="70">
      </el-table-column>
      <el-table-column align="center" prop="avgCallInTIme" label="平均呼入时间" width="100">
      </el-table-column>
      <el-table-column align="center" prop="answerNo" label="坐席未接数量" width="100">
      </el-table-column>
      <el-table-column align="center" prop="answerNoRate" label="坐席未接率" width="90">
      </el-table-column>
      <el-table-column align="center" prop="answer" label="坐席应答数量" width="100">
      </el-table-column>
      <el-table-column align="center" prop="answerRate" label="坐席应答率" width="90">
      </el-table-column>
      <el-table-column align="center" prop="answer5" label="05秒内坐席应答数量" width="140">
      </el-table-column>
      <el-table-column align="center" prop="answer5Rate" label="05秒内坐席应答率" width="140">
      </el-table-column>
      <el-table-column align="center" prop="answer20" label="20秒内坐席应答数量" width="140">
      </el-table-column>
      <el-table-column align="center" prop="answer20Rate" label="20秒内坐席应答率" width="140">
      </el-table-column>
      <el-table-column align="center" prop="avgQueueTime" label="坐席平均时间" width="100">
      </el-table-column>
      <el-table-column align="center" prop="k0" label="按键0" width="55">
      </el-table-column>
      <el-table-column align="center" prop="k1" label="按键1" width="55">
      </el-table-column>
      <el-table-column align="center" prop="k2" label="按键2" width="55">
      </el-table-column>
      <el-table-column align="center" prop="k3" label="按键3" width="55">
      </el-table-column>
      <el-table-column align="center" prop="k4" label="按键4" width="55">
      </el-table-column>
      <el-table-column align="center" prop="k5" label="按键5" width="55">
      </el-table-column>
      <el-table-column align="center" prop="k6" label="按键6" width="55">
      </el-table-column>
      <el-table-column align="center" prop="k7" label="按键7" width="55">
      </el-table-column>
      <el-table-column align="center" prop="k8" label="按键8" width="55">
      </el-table-column>
      <el-table-column align="center" prop="k9" label="按键9" width="55">
      </el-table-column>
      <el-table-column align="center" label="操作" width="65" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-view" @click="handleView(scope.$index, scope.row)" circle title="详情"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination v-if="reportPaginationShow" class="page-box" @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="pagination.currentPage" :page-sizes="[100,200, 500, 1000, 2000]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"></el-pagination>
    <!-- 报表图形详情界面 -->
    <el-dialog title="详情" :visible.sync="reportDetailsFormVisible" width="30%" @click="closeDialog()" class="dialog">
      <el-form label-width="140px" :model="reportDetailsForm" ref="reportDetailsForm" class="dialogForm">
        <el-form-item label="时间" prop="ttime">
          <el-input size="small" v-text="reportDetailsForm.ttime" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="地区代码" prop="provinceCode">
          <el-input size="small" v-text="reportDetailsForm.provinceCode" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="地区名称" prop="provinceName">
          <el-input size="small" v-text="reportDetailsForm.provinceName" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="呼入数量" prop="callInNumber">
          <el-input size="small" v-text="reportDetailsForm.callInNumber" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="接通数量" prop="connectionNumber">
          <el-input size="small" v-text="reportDetailsForm.connectionNumber" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="接通率" prop="connectionRate">
          <el-input size="small" v-text="reportDetailsForm.connectionRate" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="呼入时长" prop="callTime">
          <el-input size="small" v-text="reportDetailsForm.callTime" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="坐席时长" prop="queueTime">
          <el-input size="small" v-text="reportDetailsForm.queueTime" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="平均呼入时间" prop="avgCallInTIme">
          <el-input size="small" v-text="reportDetailsForm.avgCallInTIme" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="坐席未接数量" prop="answerNo">
          <el-input size="small" v-text="reportDetailsForm.answerNo" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="坐席未接率" prop="answerNoRate">
          <el-input size="small" v-text="reportDetailsForm.answerNoRate" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="坐席应答数量" prop="answer">
          <el-input size="small" v-text="reportDetailsForm.answer" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="坐席应答率" prop="answerRate">
          <el-input size="small" v-text="reportDetailsForm.answerRate" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="05秒内坐席应答数量" prop="answer5">
          <el-input size="small" v-text="reportDetailsForm.answer5" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="05秒内坐席应答率" prop="answer5Rate">
          <el-input size="small" v-text="reportDetailsForm.answer5Rate" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="20秒内坐席应答数量" prop="answer20">
          <el-input size="small" v-text="reportDetailsForm.answer20" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="20秒内坐席应答率" prop="answer20Rate">
          <el-input size="small" v-text="reportDetailsForm.answer20Rate" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="坐席平均时间" prop="avgQueueTime">
          <el-input size="small" v-text="reportDetailsForm.avgQueueTime" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="按键0" prop="k0">
          <el-input size="small" v-text="reportDetailsForm.k0" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="按键1" prop="k1">
          <el-input size="small" v-text="reportDetailsForm.k1" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="按键2" prop="k2">
          <el-input size="small" v-text="reportDetailsForm.k2" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="按键3" prop="k3">
          <el-input size="small" v-text="reportDetailsForm.k3" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="按键4" prop="k4">
          <el-input size="small" v-text="reportDetailsForm.k4" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="按键5" prop="k5">
          <el-input size="small" v-text="reportDetailsForm.k5" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="按键6" prop="k6">
          <el-input size="small" v-text="reportDetailsForm.k6" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="按键7" prop="k7">
          <el-input size="small" v-text="reportDetailsForm.k7" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="按键8" prop="k8">
          <el-input size="small" v-text="reportDetailsForm.k8" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="按键9" prop="k9">
          <el-input size="small" v-text="reportDetailsForm.k9" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { telRecordList } from '@/api/commonMG'
export default {
  data() {
    return {
      loading: false, //是显示加载
      reportPaginationShow:true, //控制分页页面显示与否
      reportDetailsFormVisible: false, //详情页面显示与否
      reportFormInline: {
        ttime: '',
        region: '',
      },
      reportDetailsForm: {
        ttime: '',
        provinceCode: '',
        provinceName: '',
        callInNumber: '',
        connectionNumber: '',
        connectionRate: '',
        callTime: '',
        queueTime: '',
        avgCallInTIme: '',
        answerNo: '',
        answerNoRate: '',
        answer: '',
        answerRate: '',
        answer5: '',
        answer5Rate: '',
        answer20: '',
        answer20Rate: '',
        avgQueueTime: '',
        k0: '',
        k1: '',
        k2: '',
        k3: '',
        k4: '',
        k5: '',
        k6: '',
        k7: '',
        k8: '',
        k9: '',
      },
      reportListData: [], //用户数据
      // 分页参数
      pagination: {
        currentPage: 1,
        pageSize: 100,
        total: 0
      },
      areaOptions: [{
        value: 0,
        label: '直辖市/省/自治区'
      }, {
        value: 1,
        label: '地级市/盟/州/地区'
      }],
      timeOptions: [{
        value: 4,
        label: '年'
      }, {
        value: 7,
        label: '月'
      }, {
        value: 10,
        label: '日'
      }, {
        value: 13,
        label: '小时'
      }],
      areaValue: 1,
      timeValue: 10,
      params:{}
    }
  },
  created() {
    this.reportFormInline.region = JSON.parse(localStorage.getItem('userdata')).region.substring(0,2);
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
        ttime:this.reportFormInline.ttime,
        provinceCode:this.reportFormInline.provinceCode,
        region:this.reportFormInline.region,
        codeNumber:this.areaValue,
        timeNumber:this.timeValue,
        currentPage:this.pagination.currentPage,
        pageSize:this.pagination.pageSize
      }
      telRecordList(this.params).then(res =>{
        this.loading = false
        if(res.success){
          this.reportListData = res.result;
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
      this.reportPaginationShow = false
      this.handleCurrentChange(1)
      this.$nextTick(function () {
        this.reportPaginationShow = true;
      })
      this.getdata()
    },
    // 显示详情页
    handleView:function(index,row){
      this.reportDetailsFormVisible = true
      this.reportDetailsForm.ttime = row.ttime
      this.reportDetailsForm.provinceCode = row.provinceCode
      this.reportDetailsForm.provinceName = row.provinceName
      this.reportDetailsForm.callInNumber = row.callInNumber
      this.reportDetailsForm.connectionNumber = row.connectionNumber
      this.reportDetailsForm.connectionRate = row.connectionRate
      this.reportDetailsForm.callTime = row.callTime
      this.reportDetailsForm.queueTime = row.queueTime
      this.reportDetailsForm.avgCallInTIme = row.avgCallInTIme
      this.reportDetailsForm.answerNo = row.answerNo
      this.reportDetailsForm.answerNoRate = row.answerNoRate
      this.reportDetailsForm.answer = row.answer
      this.reportDetailsForm.answerRate = row.answerRate
      this.reportDetailsForm.answer5 = row.answer5
      this.reportDetailsForm.answer5Rate = row.answer5Rate
      this.reportDetailsForm.answer20 = row.answer20
      this.reportDetailsForm.answer20Rate = row.answer20Rate
      this.reportDetailsForm.avgQueueTime = row.avgQueueTime
      this.reportDetailsForm.k0 = row.k0
      this.reportDetailsForm.k1 = row.k1
      this.reportDetailsForm.k2 = row.k2
      this.reportDetailsForm.k3 = row.k3
      this.reportDetailsForm.k4 = row.k4
      this.reportDetailsForm.k5 = row.k5
      this.reportDetailsForm.k6 = row.k6
      this.reportDetailsForm.k7 = row.k7
      this.reportDetailsForm.k8 = row.k8
      this.reportDetailsForm.k9 = row.k9

    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.reportDetailsFormVisible = false
      this.reportDetailsFormVisible = false
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

 
 