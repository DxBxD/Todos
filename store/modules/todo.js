import { todoService } from "../../services/todo.service.js"

export const todoStore = {
    state() {
        return {
            todos: [],
            todoToEdit: {
                _id: null,
                name: '',
                isDone: false
            },
            isLoading: false,
            currentFilterBy: { txt: '', isDone: false },
            currentSortBy: { type: 'isDone', direction: '-1' }
        }
    },
    mutations: {
        setTodos(state, todos) {
            state.todos = todos
        },
        addTodo(state, todo) {
            state.todos.push(todo)
        },
        updateTodo(state, todo) {
            const idx = state.todos.findIndex((item) => item._id === todo._id)
            state.todos[idx] = { ...todo }
        },
        resetTodo(state) {
            state.todoToEdit = {
                _id: null,
                name: '',
                isDone: false,
            }
        },
        removeTodo(state, todo) {
            const idx = state.todos.findIndex((item) => item._id === todo._Id)
            if (idx !== -1) state.todos.splice(idx, 1)
        },
        setLoading(state, isLoading) {
            state.isLoading = isLoading
        },
        setFilterBy(state, filterBy) {
            state.currentFilterBy = { ...filterBy }
        },
        setSortBy(state, sortBy) {
            state.currentSortBy = { ...sortBy }
        },
    },
    actions: {
        loadTodos(context) {
            context.commit('setLoading', true)
            return todoService.query(context.state.currentFilterBy, context.state.currentSortBy)
                .then(todos => {
                    context.commit('setTodos', todos)
                    context.commit('setLoading', false)
                })
                .catch(error => {
                    console.error('Failed to load todos', error)
                    context.commit('setLoading', false)
                })
        },
        addTodo(context, todo) {
            return todoService.save({...todo, createdAt: Date.now()})
                .then(savedTodo => {
                    context.commit('addTodo', savedTodo)
                    context.dispatch({type: 'addActivity', txt: `Added todo: "${savedTodo.name}"`})
                })
                .catch(error => {
                    console.error('Failed to save todo', error)
                })
        },
        updateTodo(context, todo) {
            return todoService.save(todo)
                .then(updatedTodo => {
                    context.commit('updateTodo', updatedTodo)
                })
                .catch(error => {
                    console.error('Failed to update todo', error)
                })
        },
        removeTodo(context, todo) {
            return todoService.remove(todo._id)
                .then(() => {
                    context.commit('removeTodo', todo)
                    context.dispatch({type: 'addActivity', txt: `Removed todo: "${savedTodo.name}"`})
                })
                .catch(error => {
                    console.error('Failed to remove todo', error)
                })
        },
        setFilterBy(context, filterBy) {
            return context.commit('setFilterBy', filterBy)
        },
        setSortBy(context, sortBy) {
            return context.commit('setSortBy', sortBy)
        },
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
