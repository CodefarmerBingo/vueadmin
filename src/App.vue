<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: "App"
};
</script>

<style> 
html,
body {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    widows: 100%;
    height: 100%;
}
body .el-table th.gutter{
  display: table-cell!important;
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
