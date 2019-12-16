<template>
  <div>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="callFormInline" class="user-search">
      <el-form-item>
        <el-input size="small" v-model="callFormInline.flowNo" placeholder="输入流水号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="callFormInline.region" placeholder="输入地区代码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="callFormInline.differenceKey" placeholder="输入一级分键值"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="callFormInline.inPhoneNum" placeholder="输入主叫号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="callFormInline.areaCode" placeholder="输入区号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" height="490" ref="configurationTable" :data="callListData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中">
      <el-table-column align="center" prop="monthNo" label="日期段" width="60">
      </el-table-column>
      <el-table-column align="center" prop="flowNo" label="呼叫流水号" width="150">
      </el-table-column>
      <el-table-column align="center" prop="differenceKey" label="一级分键值" width="85">
      </el-table-column>
      <el-table-column align="center" prop="inPhoneNum" label="主叫号码" width="110">
      </el-table-column>
      <el-table-column align="center" prop="userType" label="主叫号码用户类型" width="140">
        <template slot-scope="scope">
　　　　　　<span v-if="scope.row.userType == '00'">外部用户</span>
　　　　　　<span v-if="scope.row.userType == '01'">灵通助理</span>
　　　　　　<span v-if="scope.row.userType == '10'">企业总机</span>
　　　　　　<span v-if="scope.row.userType == '11'">灵通助理和企业总机共有</span>
　　　　</template>
      </el-table-column>
      <el-table-column align="center" prop="district" label="局向名称" width="100">
      </el-table-column>
      <el-table-column align="center" prop="districtCode" label="局向码" width="100">
        <template slot-scope="scope">
　　　　　　<span v-if="scope.row.districtCode == '1'">本省电信固话</span>
　　　　　　<span v-if="scope.row.districtCode == '2'">电信手机</span>
　　　　　　<span v-if="scope.row.districtCode == '3'">本省联通固话</span>
　　　　　　<span v-if="scope.row.districtCode == '4'">联通手机</span>
　　　　　　<span v-if="scope.row.districtCode == '5'">移动固话</span>
　　　　　　<span v-if="scope.row.districtCode == '6'">移动手机</span>
　　　　　　<span v-if="scope.row.districtCode == '7'">外省固话</span>
　　　　　</template>
      </el-table-column>
      <el-table-column align="center" prop="strorgCalled" label="原始被叫号码" width="100">
      </el-table-column>
      <el-table-column align="center" prop="lzlzlogontel" label="LZLZLOGONTEL" width="120">
      </el-table-column>
      <el-table-column align="center" prop="beginTime" label="呼叫起始时间" width="140">
      </el-table-column>
      <el-table-column align="center" prop="endTime" label="呼叫结束时间" width="140">
      </el-table-column>
      <el-table-column align="center" prop="callTime" label="呼叫时长" width="70">
      </el-table-column>
      <el-table-column align="center" prop="queueTimes" label="排队次数" width="70">
      </el-table-column>
      <el-table-column align="center" prop="queueTime" label="排队时长" width="70">
      </el-table-column>
      <el-table-column align="center" prop="overTimes" label="超时次数" width="70">
      </el-table-column>
      <el-table-column align="center" prop="errorTimes" label="错误次数" width="70">
      </el-table-column>
      <el-table-column align="center" prop="refuseTimes" label="话务员拒绝次数" width="110">
      </el-table-column>
      <el-table-column align="center" prop="noAnswerTimes" label="话务员应答超时次数" width="130">
      </el-table-column>
      <el-table-column align="center" prop="appraiseTimes" label="有效评价次数" width="100">
      </el-table-column>
      <el-table-column align="center" prop="endReason" label="中止原因" width="140">
        <template slot-scope="scope">
　　　　　　<span v-if="scope.row.endReason == '1'">前导音过程挂机</span>
　　　　　　<span v-if="scope.row.endReason == '2'">按键过程挂机</span>
　　　　　　<span v-if="scope.row.endReason == '3'">排队中挂机</span>
　　　　　　<span v-if="scope.row.endReason == '4'">排队超时释放</span>
　　　　　　<span v-if="scope.row.endReason == '5'">排队超时挂机</span>
　　　　　　<span v-if="scope.row.endReason == '6'">排队成功，但未产生连接坐席结果挂机</span>
　　　　　　<span v-if="scope.row.endReason == '8'">排队成功，话务员应答</span>
　　　　　　<span v-if="scope.row.endReason == '9'">未评价话务员前挂机</span>
　　　　　　<span v-if="scope.row.endReason == 'a'">评价期间超时释放</span>
　　　　　　<span v-if="scope.row.endReason == 'b'">重新选择排队时用户挂机</span>
　　　　　　<span v-if="scope.row.endReason == 'c'">重新选择排队超时释放</span>
　　　　　　<span v-if="scope.row.endReason == 'd'">排队成功，话务员拒绝，不评价</span>
　　　　　　<span v-if="scope.row.endReason == 'e'">排队成功，话务员不应答，不评价</span>
　　　　　　<span v-if="scope.row.endReason == 'f'">评价话务员后挂机</span>
　　　　　　<span v-if="scope.row.endReason == 'g'">排队成功，话务员拒绝，评价</span>
　　　　　　<span v-if="scope.row.endReason == 'h'">排队成功，话务员不应答，评价</span>
　　　　　</template>
      </el-table-column>
      <el-table-column align="center" prop="topStaffNo" label="首位应答操作员工号" width="130">
      </el-table-column>
      <el-table-column align="center" prop="staffNo" label="评价操作员工号" width="110">
      </el-table-column>
      <el-table-column align="center" prop="qBeginTime" label="排队起始时间" width="140">
      </el-table-column>
      <el-table-column align="center" prop="qEndTime" label="排队结束时间" width="140">
      </el-table-column>
      <el-table-column align="center" prop="answerTime" label="应答时间" width="70">
      </el-table-column>
      <el-table-column align="center" prop="appraise" label="用户评价" width="70">
        <template slot-scope="scope">
　　　　　　<span v-if="scope.row.appraise == '1'">满意</span>
　　　　　　<span v-if="scope.row.appraise == '2'">一般</span>
　　　　　　<span v-if="scope.row.appraise == '3'">不满意</span>
　　　　　　<span v-else>未评价</span>
　　　　　</template>
      </el-table-column>
      <el-table-column align="center" prop="accessCode" label="接入码" width="80">
      </el-table-column>
      <el-table-column align="center" prop="skillNo" label="排队技能" width="70">
      </el-table-column>
      <el-table-column align="center" prop="areaCode" label="区号" width="55">
      </el-table-column>
      <el-table-column align="center" prop="flowFlag" label="流程状态标志" width="200">
        <template slot-scope="scope">
　　　　　　<span v-if="scope.row.flowFlag == '0'">排队前挂机</span>
　　　　　　<span v-if="scope.row.flowFlag == '1'">号码查询台自动业务记录的日志</span>
　　　　　　<span v-if="scope.row.flowFlag == '2'">非号码查询台自动业务记录的日志</span>
　　　　　　<span v-if="scope.row.flowFlag == '3'">企业总机自动业务记录的日志</span>
　　　　　　<span v-if="scope.row.flowFlag == '4'">灵通助理记录的自动业务日志</span>
　　　　　　<span v-if="scope.row.flowFlag == '5'">gis自动业务记录的日志</span>
　　　　　　<span v-if="scope.row.flowFlag == '6'">访客呼转到118114 灵通助理</span>
　　　　　　<span v-if="scope.row.flowFlag == '7'">访客呼转到118114 企业总机</span>
　　　　　　<span v-if="scope.row.flowFlag == '8'">进座席查询台没有返回</span>
　　　　　　<span v-if="scope.row.flowFlag == '9'">订房订餐</span>
　　　　　　<span v-if="scope.row.flowFlag == '10'">订票</span>
　　　　　　<span v-if="scope.row.flowFlag == '11'">黑龙江电话代拨业务</span>
　　　　　</template>
      </el-table-column>
      <el-table-column align="center" prop="platform" label="平台" width="50">
        <template slot-scope="scope">
　　　　　　<span v-if="scope.row.platform == '1'">中兴</span>
　　　　　　<span v-if="scope.row.platform == '2'">华为</span>
　　　　　　<span v-if="scope.row.platform == '3'">候补数据</span>
　　　　　</template>
      </el-table-column>
      <el-table-column align="center" prop="differenceKey2" label="二级分键" width="80">
      </el-table-column>
      <el-table-column align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-view" @click="handleView(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination v-if="callPaginationShow" class="page-box" @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="pagination.currentPage" :page-sizes="[100,200, 500, 1000, 2000]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"></el-pagination>
    <!-- 报表图形详情界面 -->
    <el-dialog title="详情" :visible.sync="callDetailsFormVisible" width="30%" @click="closeDialog()" class="dialog">
      <el-form label-width="140px" :model="callDetailsForm" ref="callDetailsForm" class="dialogForm">
        <el-form-item label="日期段" prop="monthNo">
          <el-input size="small" v-text="callDetailsForm.monthNo" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="呼叫流水号" prop="flowNo">
          <el-input size="small" v-text="callDetailsForm.flowNo" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="一级分键值" prop="differenceKey">
          <el-input size="small" v-text="callDetailsForm.differenceKey" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="主叫号码" prop="inPhoneNum">
          <el-input size="small" v-text="callDetailsForm.inPhoneNum" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="主叫号码用户类型" prop="userType">
          <el-input size="small" v-text="callDetailsForm.userType" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="局向名称" prop="district">
          <el-input size="small" v-text="callDetailsForm.district" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="局向码" prop="districtCode">
          <el-input size="small" v-text="callDetailsForm.districtCode" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="原始被叫号码" prop="strorgCalled">
          <el-input size="small" v-text="callDetailsForm.strorgCalled" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="LZLZLOGONTEL" prop="lzlzlogontel">
          <el-input size="small" v-text="callDetailsForm.lzlzlogontel" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="呼叫起始时间" prop="beginTime">
          <el-input size="small" v-text="callDetailsForm.beginTime" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="呼叫结束时间" prop="endTime">
          <el-input size="small" v-text="callDetailsForm.endTime" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="呼叫时长" prop="callTime">
          <el-input size="small" v-text="callDetailsForm.callTime" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="排队次数" prop="queueTimes">
          <el-input size="small" v-text="callDetailsForm.queueTimes" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="排队时长" prop="queueTime">
          <el-input size="small" v-text="callDetailsForm.queueTime" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="超时次数" prop="overTimes">
          <el-input size="small" v-text="callDetailsForm.overTimes" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="错误次数" prop="errorTimes">
          <el-input size="small" v-text="callDetailsForm.errorTimes" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="话务员拒绝次数" prop="refuseTimes">
          <el-input size="small" v-text="callDetailsForm.refuseTimes" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="话务员应答超时次数" prop="noAnswerTimes">
          <el-input size="small" v-text="callDetailsForm.noAnswerTimes" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="有效评价次数" prop="appraiseTimes">
          <el-input size="small" v-text="callDetailsForm.appraiseTimes" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="中止原因" prop="endReason">
          <el-input size="small" v-text="callDetailsForm.endReason" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="首位应答操作员工号" prop="topStaffNo">
          <el-input size="small" v-text="callDetailsForm.topStaffNo" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="评价操作员工号" prop="staffNo">
          <el-input size="small" v-text="callDetailsForm.staffNo" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="排队起始时间" prop="qBeginTime">
          <el-input size="small" v-text="callDetailsForm.qBeginTime" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="排队结束时间" prop="qEndTime">
          <el-input size="small" v-text="callDetailsForm.qEndTime" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="应答时间" prop="answerTime">
          <el-input size="small" v-text="callDetailsForm.answerTime" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="用户评价" prop="appraise">
          <el-input size="small" v-text="callDetailsForm.appraise" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="接入码" prop="accessCode">
          <el-input size="small" v-text="callDetailsForm.accessCode" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="排队技能" prop="skillNo">
          <el-input size="small" v-text="callDetailsForm.skillNo" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="区号" prop="areaCode">
          <el-input size="small" v-text="callDetailsForm.areaCode" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="流程状态标志" prop="flowFlag">
          <el-input size="small" v-text="callDetailsForm.flowFlag" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="平台" prop="platform">
          <el-input size="small" v-text="callDetailsForm.platform" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
        <el-form-item label="二级分键" prop="differenceKey2">
          <el-input size="small" v-text="callDetailsForm.differenceKey2" :disabled="true"  class="comWidth"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { reportList } from '@/api/commonMG'
export default {
  data() {
    return {
      loading: false, //是显示加载
      callPaginationShow:true, //控制分页页面显示与否
      callDetailsFormVisible: false, //详情页面显示与否
      callFormInline: {
        flowNo: '',
        region: '',
        differenceKey: '',
        inPhoneNum: '',
        areaCode: ''
      },
      callDetailsForm: {
        monthNo: '',
        flowNo: '',
        differenceKey: '',
        inPhoneNum: '',
        userType: '',
        district: '',
        districtCode: '',
        strorgCalled: '',
        lzlzlogontel: '',
        beginTime: '',
        endTime: '',
        callTime: '',
        queueTimes: '',
        queueTime: '',
        overTimes: '',
        errorTimes: '',
        refuseTimes: '',
        noAnswerTimes: '',
        appraiseTimes: '',
        endReason: '',
        topStaffNo: '',
        staffNo: '',
        qBeginTime: '',
        qEndTime: '',
        answerTime: '',
        appraise: '',
        accessCode: '',
        skillNo: '',
        areaCode: '',
        flowFlag: '',
        platform: '',
        differenceKey2: '',
      },
      callListData: [], //用户数据
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
    this.callFormInline.region = JSON.parse(localStorage.getItem('userdata')).region.substring(0,2);
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
        flowNo:this.callFormInline.flowNo,
        differenceKey:this.callFormInline.differenceKey,
        region:this.callFormInline.region,
        inPhoneNum:this.inPhoneNum,
        areaCode:this.areaCode,
        currentPage:this.pagination.currentPage,
        pageSize:this.pagination.pageSize
      }
      reportList(this.params).then(res =>{
        this.loading = false
        if(res.success == false){
          this.$message({
               type: 'info',
               message: res.errors
          })
        }else{
          this.callListData = res.result;
          this.pagination.total = res.total
          this.$refs.configurationTable.$el.style.width = '98%'
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
      this.callPaginationShow = false
      this.handleCurrentChange(1)
      this.$nextTick(function () {
        this.callPaginationShow = true;
      })
      this.getdata()
    },
    // 显示详情页
    handleView:function(index,row){
      console.log(row)
      this.callDetailsFormVisible = true
      this.callDetailsForm.monthNo = row.monthNo
      this.callDetailsForm.flowNo = row.flowNo
      this.callDetailsForm.differenceKey = row.differenceKey
      this.callDetailsForm.inPhoneNum = row.inPhoneNum
      switch (row.userType) {
        case "00":
            this.callDetailsForm.userType = "外部用户";
            break; 
        case "01":
            this.callDetailsForm.userType = "灵通助理";
            break; 
        case "10":
            this.callDetailsForm.userType = "企业总机";
            break; 
        default: 
            this.callDetailsForm.userType = "灵通助理和企业总机共有";
      }
      this.callDetailsForm.district = row.district
      switch (String(row.districtCode)) {
        case "1":
            this.callDetailsForm.districtCode = "本省电信固话";
            break; 
        case "2":
            this.callDetailsForm.districtCode = "电信手机";
            break; 
        case "3":
            this.callDetailsForm.districtCode = "本省联通固话";
            break; 
        case "4":
            this.callDetailsForm.districtCode = "联通手机";
            break; 
        case "5":
            this.callDetailsForm.districtCode = "移动固话";
            break; 
        case "6":
            this.callDetailsForm.districtCode = "移动手机";
            break; 
        default: 
            this.callDetailsForm.districtCode = "外省固话";
      }
      this.callDetailsForm.strorgCalled = row.strorgCalled
      this.callDetailsForm.lzlzlogontel = row.lzlzlogontel
      this.callDetailsForm.beginTime = row.beginTime
      this.callDetailsForm.endTime = row.endTime
      this.callDetailsForm.callTime = row.callTime
      this.callDetailsForm.queueTimes = row.queueTimes
      this.callDetailsForm.queueTime = row.queueTime
      this.callDetailsForm.overTimes = row.overTimes
      this.callDetailsForm.errorTimes = row.errorTimes
      this.callDetailsForm.refuseTimes = row.refuseTimes
      this.callDetailsForm.noAnswerTimes = row.noAnswerTimes
      this.callDetailsForm.appraiseTimes = row.appraiseTimes
      switch (row.endReason) {
        case "1":
            this.callDetailsForm.endReason = "前导音过程挂机";
            break; 
        case "2":
            this.callDetailsForm.endReason = "按键过程挂机";
            break; 
        case "3":
            this.callDetailsForm.endReason = "排队中挂机";
            break; 
        case "4":
            this.callDetailsForm.endReason = "排队超时释放";
            break; 
        case "5":
            this.callDetailsForm.endReason = "排队超时挂机";
            break; 
        case "6":
            this.callDetailsForm.endReason = "排队成功，但未产生连接坐席结果挂机";
            break; 
        case "8":
            this.callDetailsForm.endReason = "排队成功，话务员应答";
            break; 
        case "9":
            this.callDetailsForm.endReason = "未评价话务员前挂机";
            break; 
        case "a":
            this.callDetailsForm.endReason = "评价期间超时释放";
            break; 
        case "b":
            this.callDetailsForm.endReason = "重新选择排队时用户挂机";
            break; 
        case "c":
            this.callDetailsForm.endReason = "重新选择排队超时释放";
            break; 
        case "d":
            this.callDetailsForm.endReason = "排队成功，话务员拒绝，不评价";
            break; 
        case "e":
            this.callDetailsForm.endReason = "排队成功，话务员不应答，不评价";
            break; 
        case "f":
            this.callDetailsForm.endReason = "评价话务员后挂机";
            break; 
        case "g":
            this.callDetailsForm.endReason = "排队成功，话务员拒绝，评价";
            break; 
        default: 
            this.callDetailsForm.endReason = "排队成功，话务员不应答，评价";
      }
      this.callDetailsForm.topStaffNo = row.topStaffNo
      this.callDetailsForm.staffNo = row.staffNo
      this.callDetailsForm.qBeginTime = row.qBeginTime
      this.callDetailsForm.qEndTime = row.qEndTime
      this.callDetailsForm.answerTime = row.answerTime
      switch (String(row.appraise)) {
        case "1":
            this.callDetailsForm.appraise = "满意";
            break; 
        case "2":
            this.callDetailsForm.appraise = "一般";
            break; 
        case "3":
            this.callDetailsForm.appraise = "不满意";
            break; 
        default: 
            this.callDetailsForm.appraise = "未评价";
      }
      this.callDetailsForm.accessCode = row.accessCode
      this.callDetailsForm.skillNo = row.skillNo
      this.callDetailsForm.areaCode = row.areaCode
      this.callDetailsForm.flowFlag = row.flowFlag
      switch (row.flowFlag) {
        case "0":
            this.callDetailsForm.flowFlag = "排队前挂机";
            break; 
        case "1":
            this.callDetailsForm.flowFlag = "号码查询台自动业务记录的日志";
            break; 
        case "2":
            this.callDetailsForm.flowFlag = "非号码查询台自动业务记录的日志";
            break; 
        case "3":
            this.callDetailsForm.flowFlag = "企业总机自动业务记录的日志";
            break; 
        case "4":
            this.callDetailsForm.flowFlag = "灵通助理记录的自动业务日志";
            break; 
        case "5":
            this.callDetailsForm.flowFlag = "gis自动业务记录的日志";
            break; 
        case "6":
            this.callDetailsForm.flowFlag = "访客呼转到118114灵通助理";
            break; 
        case "7":
            this.callDetailsForm.flowFlag = "访客呼转到118114企业总机";
            break; 
        case "8":
            this.callDetailsForm.flowFlag = "进座席查询台没有返回";
            break; 
        case "9":
            this.callDetailsForm.flowFlag = "订房订餐";
            break; 
        case "10":
            this.callDetailsForm.flowFlag = "订票";
            break;
        default: 
            this.callDetailsForm.flowFlag = "黑龙江电话代拨业务";
      }
      switch (row.platform) {
        case "1":
            this.callDetailsForm.platform = "中兴";
            break;
        case "2":
            this.callDetailsForm.platform = "华为";
            break;
        default: 
            this.callDetailsForm.platform = "候补数据";
      }
      this.callDetailsForm.differenceKey2 = row.differenceKey2

    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.callDetailsFormVisible = false
      this.callDetailsFormVisible = false
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

 
 