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
    SET_USER_SELECTED(state, user) {
      state.userSelected = user
    },
    REMOVE_USER_BY_INDEX(state, index) {
      state.users.splice(index, 1);
    },
    TOGGLE_FAVORITE(state, index) {
      state.users[index].favorite = !state.users[index].favorite
    }
  },
  getters: {
    getUsers(state) {
      return state.users
    },
    getUserSelected(state) {
      return state.userSelected
    }
  },
  actions: {
    async loadUsers({ commit }) {
      commit('SET_USERS', await getUsers())
    },

    deleteAll({ commit }) {
      commit('SET_USERS', [])
    },

    async setUserSelectedById({ commit, dispatch, state }, id) {
      const index = await dispatch('findUser', id);
      commit('SET_USER_SELECTED', state.users[index])
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

    favoriteUsers({ commit, dispatch }, selected) {
      selected.forEach(async (userSelected) => {
        const index = await dispatch('findUser', userSelected.id);
        if (index >= 0) {
          commit('TOGGLE_FAVORITE', index)
        }
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