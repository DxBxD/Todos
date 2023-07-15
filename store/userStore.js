import { todoService } from "../services/todo.service.js"
import { userService } from "../services/user.service.js"
import { utilService } from "../services/util.service.js"

const { createStore } = Vuex

const storeOptions = {
    strict: true,
    state() {
        return {
            user: userService.getLoggedinUser(),
            isLoading: false,
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setLoading(state, isLoading) {
            state.isLoading = isLoading
        }
    },
    actions: {
        updateUser(context, user) {
            return userService.update(user)
                .then(updatedUser => {
                    context.commit('setUser', updatedUser)
                })
                .catch(error => {
                    console.error('Failed to update user', error)
                })
        },
        setFilterBy(context, filterBy) {
            return context.commit('setFilterBy', filterBy)
        },
        setSortBy(context, sortBy) {
            return context.commit('setSortBy', sortBy)
        }
    },
    getters: {
        doneTodosCount(state) {
            return state.todos.filter(todo => todo.isDone).length
        },
        todosCount(state) {
            return state.todos.length
        },
        todos(state) { return state.todos },
        isLoading(state) { return state.isLoading },
        currentUser(state) { return state.user },
        activeTodosCount(state) {
            return state.todos.filter(todo => !todo.isDone).length
        },
        completedTodosCount(state) {
            return state.todos.filter(todo => todo.isDone).length
        },
        todosFilter(state) { return state.currentFilterBy },
        getEmptyTodo(state) {
            return state.todoToEdit
        },
    }
}
export const userStore = createStore(storeOptions)