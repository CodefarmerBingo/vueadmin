import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 导出
const store = new Vuex.Store({
    // state 状态，说简单点就是维护的数据
    state: {
        areaList: []
    },
    // mutations 修改器，用于修改state中的定义的状态变量,同步
    mutations: {
        setAreaList: (state, data) => {
            state.areaList = data;
        }
    },
    // action，存放异步操作，由 action 去触发 mutation
    actions: {
        commitAreaList({ commit }, info) {
            commit("setAreaList", info);
        }
    }
});
export default store