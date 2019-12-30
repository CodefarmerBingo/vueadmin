<template>
  <el-menu :collapse="collapsed" collapse-transition router unique-opened class="el-menu-vertical-demo" background-color="#30426a" text-color="#7a94e1">
    <div class="logobox">
      <!-- <p>{{this.collapsed ? '号百' : '号百信息服务系统'}}</p> -->
      <div v-if="this.collapsed == false"><img src="../assets/img/logo.png" class="logoImg">号百信息服务系统</div>
      <div v-else><img src="../assets/img/logo.png" class="logoImg"></div>
    </div>
    <el-submenu v-for="menu in allmenu" :key="menu.node" :index="menu.node">
      <template slot="title" class="submuneClass">
        <i :class="menu.icon"></i>
        <span>{{menu.name}}</span>
      </template>
      <el-menu-item v-for="chmenu in menu.menus" :key="chmenu.node">
        <router-link class="routerClass" active-class="activeClass" :to="chmenu.url">{{chmenu.name}}</router-link>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
import { menu } from '@/api/commonMG'
export default {
  name: 'leftnav',
  data() {
    return {
      collapsed: false,
      allmenu: []
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    // 获取图形验证码
    let _this = this;
    let userData = JSON.parse(localStorage.getItem('userdata'));
    let params = userData.code
    menu(params).then(res =>{
      if(res.success){
        let menu = res.result
        let firstMenu = []
        let secendMenu = []
        menu.forEach(el =>{
          if(el.node != '0000'){
            if(el.father == '0000'){
              firstMenu.push(el)
              el['menus'] = []
            }else{
              secendMenu.push(el)
            }
          }
        })
        for(let i=0;i<firstMenu.length;i++){
          for(let j=0;j<secendMenu.length;j++){
            if(secendMenu[j].father == firstMenu[i].node){
              firstMenu[i].menus.push(secendMenu[j])
            }
          }
        }
        _this.allmenu = firstMenu
        console.log(_this.allmenu)
      }else{
        if(res.code == '403'){
          this.$message({
            type: 'warning',
            message: res.msg
          })
        }
      }    
    })
    // 监听
    this.$root.Bus.$on('toggle', value => {
      this.collapsed = !value
    })
  }
}
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  height: 753px
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.el-menu--collapse{
  height: 753px
} 
.el-menu-item-group__title {
  padding: 0px;
}
.el-menu-bg {
  background-color: #1f2d3d !important;
}
.el-menu {
  border: none;
}
.logobox {
  height: 80px;
  line-height: 80px;
  margin-top: -20px;
  color: #353c66;
  font-size: 20px;
  text-align: right;
  background-color: #fff;
  box-sizing: border-box;
  padding-top: 10px;
}
.logobox div {
  width: 100%;
  height: 100%;
  vertical-align:middle; 
}
.logoImg {
  width: 25px;
  height: 25px;
  display: inline-block;
  margin-right: 8px;
  margin-top: 5px;
}
.routerClass {
  text-decoration: none;
  color: #90a4d6;
  padding-left: 20px;
}
.activeClass {
  color: #fff
}
</style>