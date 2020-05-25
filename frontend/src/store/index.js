import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'

Vue.use(Vuex);


const types = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'
}

const state = {
    logged: localStorage.getItem('token')
}

const getters = {
    isLogged: state => state.logged
}

const actions = {
    login ({commit}, credentials) {
        axios.post('/api/admin/login', credentials)
        .then((res) => {
            localStorage.setItem('usertoken', res.data.token);
            commit(types.LOGIN);
            router.push({path: '/admin'});
        })
        .catch((err) => {
            console.log("Błąd: " + err);
        })
    },

    logout({commit}) {
        axios.get('/api/admin/logout')
        .then(() => {
            localStorage.removeItem('usertoken');
            commit(types.LOGOUT);
            router.push({path: '/'});
        })
        .catch((err) => {
            console.log(err);
        })
    },

    refreshSession({commit}) {
        if(localStorage.getItem('usertoken')) {
            commit(types.LOGIN);
        }
    },

    refreshToken: () => {
        axios.get('/api/admin/token/refresh')
        .then((response) => {
            console.log(response);
            localStorage.setItem('usertoken', response.data.new_token);
        })
    }
}

const mutations = {
    [types.LOGIN] (state) {
        state.logged = 1;
    },

    [types.LOGOUT] (state) {
        state.logged = 0;
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})