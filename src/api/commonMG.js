import axios from 'axios';
import { req } from './axiosFun';

// 登录接口 
export const login = (params) => { return req("post", "platform-web/login", params) };
// 获取左侧menu菜单
export const menu = (params) => { return req("post", "platform-web/v1.0/query/getConfig?code=" + params) };
// 退出接口
export const loginout = () => { return axios.delete("/api/login?&token=" + localStorage.getItem('logintoken')).then(res => res.data) };

/**
 * 部门设置接口 
 **/
// 部门-获取数据
export const deptList = (params) => { return req("post", "platform-web/dept/page", params) };
// 部门-添加数据
export const deptSave = (params) => { return req("post", "platform-web/dept/insertSelective", params) };
// 部门-修改数据
export const deptUpdate = (params) => { return req("post", "platform-web/dept/updateSelective", params) };
// 部门-删除数据
export const deptDelete = (params) => { return  axios.delete("platform-web/dept/delete?code=" + params)};

/**
 * 岗位设置接口 
 **/
// 岗位-获取数据
export const postList = (params) => { return req("post", "platform-web/position/page", params) };
// 岗位-添加数据
export const postSave = (params) => { return req("post", "platform-web/position/insertSelective", params) };
// 岗位-修改数据
export const postUpdate = (params) => { return req("post", "platform-web/position/updateSelective", params) };
// 岗位-删除数据
export const postDelete = (params) => { return  axios.delete("platform-web/position/delete?code=" + params)};

/**
 * 角色设置接口 
 **/
// 角色-获取数据
export const roleList = (params) => { return req("post", "platform-web/role/page", params) };
// 角色-添加数据
export const roleSave = (params) => { return req("post", "platform-web/role/insertSelective", params) };
// 角色-修改数据
export const roleUpdate = (params) => { return req("post", "platform-web/role/updateSelective", params) };
// 角色-删除数据
export const roleDelete = (params) => { return  axios.delete("platform-web/role/delete?code=" + params)};

/**
 * 员工设置 
 **/
// 员工设置-获取数据列表
export const personnelList = (params) => { return req("post", "platform-web/worker/page", params) };
// 员工设置-保存数据
export const personnelSave = (params) => { return req("post", "platform-web/worker/insertSelective", params) };
// 员工设置-查询数据
export const personnelView = (params) => { return req("post", "platform-web/worker/getByCode?code=" +params) };
// 员工设置-编辑数据
export const personnelUpdate = (params) => { return req("post", "platform-web/worker/updateSelective" , params) };
// 员工设置-删除数据
export const personnelDelete = (params) => { return  axios.delete("platform-web/worker/delete?code=" + params)};

/**
 * 岗位变动历史 
 **/
// 岗位变动历史-获取数据列表
export const historyList = (params) => { return req("post", "platform-web/workerHistory/page", params) };
// 岗位变动历史-保存数据
export const historySave = (params) => { return req("post", "platform-web/workerHistory/insertSelective", params) };
// 岗位变动历史-查询数据
export const historyView = (params) => { return req("post", "platform-web/workerHistory/getByCode?code=" +params) };
// 岗位变动历史-编辑数据
export const historyUpdate = (params) => { return req("post", "platform-web/workerHistory/updateSelective" , params) };
// 岗位变动历史-删除数据
export const historyDelete = (params) => { return  axios.delete("platform-web/workerHistory/delete?code=" + params)};

/**
 * 权限管理
 **/
// 权限管理-获取部门菜单
export const deptMenu = (params) => { return req("get", "platform-web/permission/user/getDeptDto" , params) };
// 权限管理-获取地区菜单
export const areaMenu = (params) => { return req("get", "platform-web/permission/user/getCityDto" , params) };
// 权限管理-获取表格数据
export const getTable = (params) => { return req("post", "platform-web/permission/user/getByWorker" , params) };
// 权限管理-获取所有权限菜单
export const privilegeAllList = (accountCode,code) => { return req("post", "platform-web/permission/user/notExistAuthority?accountCode=" + accountCode + "&code=" + code) };
// 权限管理-获取已授权权限菜单
export const privilegeExitList = (params) => { return req("post", "platform-web/permission/user/existAuthority?code=" + params) };
// 权限管理-点击授权权限
export const privilegeAdd = (params) => { return req("post", "platform-web/permission/user/insert", params) };
// 权限管理-点击删除权限
export const privilegeDelete = (params) => { return req("post", "platform-web/permission/user/delete" , params) };

/**
 * 客户信息
 **/
// 客户信息-获取数据列表
export const customerList = (params) => { return req("post", "platform-web/customer/page", params) };
// 客户信息-修改关键字
export const modifyKeyWord = (keyWord,rowId) => { return req("post", "platform-web/customer/keyword?keyWord=" + keyWord + '&rowId=' + rowId) };

/**
 * 报表图形
 **/
// 报表图形-获取数据列表
export const telRecordList = (params) => { return req("post", "platform-web/report/telRecordStatistics", params) };

/**
 * 来电记录
 **/
// 来电记录-获取数据列表
export const reportList = (params) => { return req("post", "platform-web/report/page", params) };