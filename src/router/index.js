// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
// 下列代码是为了防止重复点击路由跳转报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 登录
import login from '@/views/login';
// 首页
import index from '@/views/index';
/**
 * 基础菜单
 */
// // 商品管理
import Goods from '@/views/goods/Goods';
// 部门设置界面
import Departmental from '@/views/page/Departmental';
// 岗位设置界面
import Post from '@/views/page/Post';
// 角色设置界面
import Role from '@/views/page/Role';
// 人员设置界面
import Personnel from '@/views/page/Personnel';
// 权限设置界面
import Permission from '@/views/page/Permission';
// 操作参数界面
// import Operational from '@/views/page/Operational';
// 报表图行界面
import ReportGraph from '@/views/page/ReportGraph';
// 来电记录界面
import IncomingCall from '@/views/page/IncomingCall';
// 客户信息页面
import Customer from '@/views/page/Customer';
// 启用路由
Vue.use(Router);

// 导出路由 
export default new Router({
    routes: [{
        path: '/',
        name: '',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/login',
        name: '登录',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/index',
        name: '首页',
        component: index,
        // iconCls: 'el-icon-tickets',
        children: [
            {
            path: '/page/Departmental',
            name: '部门设置',
            component: Departmental,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/page/Post',
            name: '岗位设置',
            component: Post,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/page/Role',
            name: '角色设置',
            component: Role,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/page/Personnel',
            name: '人员设置',
            component: Personnel,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/page/Permission',
            name: '权限设置',
            component: Permission,
            meta: {
                requireAuth: true
            }
        }, 
        // {
        //     path: '/page/Operational',
        //     name: '操作参数',
        //     component: Operational,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, 
        {
            path: '/page/ReportGraph',
            name: '报表图行',
            component: ReportGraph,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/page/IncomingCall',
            name: '来电记录',
            component: IncomingCall,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/page/Customer',
            name: '客户信息',
            component: Customer,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/goods/Goods',
            name: '商品管理',
            component: Goods,
            meta: {
                requireAuth: true
            }
        }
    ]
    }]
})