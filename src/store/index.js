import Vue from 'vue'
import Vuex from 'vuex'
import { getUsers } from "../plugins/api";

Vue.use(Vuex)

const userStore = new Vuex.Store({
  state: {
    users: [],
    userSelected: null
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users
    },
    SET_USER(state, { user, index }) {
      state.users[index] = user
    },
    REMOVE_USER_BY_INDEX(state, index) {
      state.users.splice(index, 1);
    }
  },
  getters: {
    getUsers(state) {
      return state.users
    }
  },
  actions: {
    async loadUsers({ commit }) {
      commit('SET_USERS', await getUsers())
    },

    deleteAll({ commit }) {
      commit('SET_USERS', [])
    },

    deleteUsers({ dispatch, commit, state }, selected) {
      if (selected.length === state.users.length) {
        dispatch('deleteAll')
        return
      }
      selected.forEach(async (userToDelete) => {
        const index = await dispatch('findUser', userToDelete.id);
        if (index >= 0) {
          commit('REMOVE_USER_BY_INDEX', index)
        }
      });
    },

    favoriteUsers({ commit, state, dispatch }, selected) {
      selected.forEach((userToFavorite) => {
        const index = dispatch('findUser', userToFavorite.id);
        const user = Object.assign({}, state.users[index])
        user.favorite = true;
        commit('SET_USER', { user, index })
      })
    },

    findUser({ state }, id) {
      let index = -1;
      state.users.forEach((user, idx) => {
        if (user.id === id) {
          index = idx;
        }
      });
      return index
    }
  }
})

export { userStore }