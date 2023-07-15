import TodoFilter from "../cmps/TodoFilter.js"
import TodoEdit from "../cmps/TodoEdit.js"
import TodoList from "../cmps/TodoList.js"
import Spinner from "../cmps/Spinner.js"

export default {
    template: `
    <section v-if="todos" class="todos-page router-view"> 
      <TodoFilter @filter="setFilterBy" @sort="setSortBy"/>
      <TodoEdit />
      <TodoList v-if="todos" @remove="removeTodo" @toggleTodoStatus="toggleTodoStatus" :todos="todos" />
    </section>
    <section v-else class="Spinner">
      <Spinner />
    </section>
  `,
    computed: {
        todos() {
            return this.$store.getters.todos
        }
    },
    methods: {
        removeTodo(todo) {
            this.$store.dispatch('removeTodo', todo)
                .then(() => {
                    this.$store.dispatch('loadTodos')
                })
        },
        toggleTodoStatus(todo) {
            const updatedTodo = { ...todo, isDone: !todo.isDone }
            this.$store.dispatch('updateTodo', updatedTodo)
                .then(() => {
                    this.$store.dispatch('loadTodos')
                })
        },
        setFilterBy(filterBy) {
            this.$store.dispatch('setFilterBy', filterBy)
                .then(() => {this.$store.dispatch('loadTodos')})
        },
        setSortBy(sortBy) {
            this.$store.dispatch('setSortBy', sortBy)
            .then(() => {this.$store.dispatch('loadTodos')})
        }
    },
    components: {
        TodoFilter,
        TodoEdit,
        TodoList,
        Spinner,
    }
}