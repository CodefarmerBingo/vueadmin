<template>
  <el-menu :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b">
    <div class="logobox">
      <!-- <img class="logoimg" src="../assets/img/logo.png" alt=""> -->
      <p>{{this.collapsed ? '号百' : '号百信息服务系统'}}</p>
    </div>
    <el-submenu v-for="menu in allmenu" :key="menu.node" :index="'/' + menu.url">
      <template slot="title">
        <i :class="menu.icon"></i>
        <span>{{menu.name}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="chmenu in menu.menus" :key="chmenu.node" :index="'/' + chmenu.url">
          <i :class="chmenu.icon"></i>
          <span>{{chmenu.name}}</span>
        </el-menu-item>
      </el-menu-item-group>
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
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
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
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
}
.logoimg {
  height: 40px;
}
</style>