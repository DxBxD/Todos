const { createStore } = Vuex

import { userStore } from './modules/user.js'
import { todoStore } from './modules/todo.js'

const storeOptions = {
    strict: true,
    state() {
        return {
        }
    },
    mutations: {
    },
    getters: {
    },
    actions: {
    },
    modules: {
        user: userStore,
        todo: todoStore,
    }
}
export const store = createStore(storeOptions)
