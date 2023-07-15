import TodoPreview from './TodoPreview.js'

export default {
    props: ['todos'],
    template: `
        <section class="todo-list">
            <ul>
                <li v-for="todo in todos">
                    <TodoPreview @remove="removeTodo" @toggleTodoStatus="toggleTodoStatus" :todo="todo"/>
                </li>
            </ul>
            <p v-if="!todos.length">No todos to show</p>
        </section>
    `,
    methods: {
        removeTodo(todo) {
            this.$emit('remove', todo)
        },
        toggleTodoStatus(todo) {
            this.$emit('toggleTodoStatus', todo)
        }
    },
    components: {
        TodoPreview,
    }
}