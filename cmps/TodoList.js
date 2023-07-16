import TodoPreview from './TodoPreview.js'

export default {
    props: ['todos'],
    template: `
        <section class="todo-list">
            <ul>
                <li v-for="todo in todos">
                    <TodoPreview @remove="removeTodo" @toggleTodoStatus="toggleTodoStatus" @edit="editTodo" :todo="todo"/>
                </li>
            </ul>
            <p v-if="!todos.length">No todos to show</p>
        </section>
    `,
    methods: {
        removeTodo(todo) {
            this.$emit('remove', todo)
        },
        editTodo(todo) {
            this.$emit('edit', todo)
        },
        toggleTodoStatus(todo) {
            this.$emit('toggleTodoStatus', todo)
        }
    },
    components: {
        TodoPreview,
    }
}