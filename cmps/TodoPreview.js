export default {
    props: ['todo'],
    template: `
        <article class="todo-preview">
            <button class="toggle-btn" @click="onToggleTodoStatus">{{ todo.isDone ? '✔' : '' }}</button>
            <span class="todo-name">{{ todo.name }}</span>
            <button class="edit-btn" @click="onEditTodo">Edit</button>
            <RouterLink :to="'/todo/' + todo._id"><button class="detail-btn">Details</button></RouterLink>
            <button class="remove-btn" @click="onRemove">Remove</button>
        </article>
    `,
    methods: {
        onRemove() {
            this.$emit('remove', this.todo)
        },
        onToggleTodoStatus() {
            this.$emit('toggleTodoStatus', this.todo)
        },
        onEditTodo() {
            this.$emit('edit', this.todo)
        },
        onViewDetails() {
            this.$router.push({ name: 'TodoDetails', params: { todoId: this.todo._id } })
        },

    }
}