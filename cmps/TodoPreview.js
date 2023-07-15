export default {
    props: ['todo'],
    template: `
        <article class="todo-preview">
            <button class="toggle-btn" @click="onToggleTodoStatus">{{ todo.isDone ? '✔' : '' }}</button>
            <span class="todo-name">{{ todo.name }}</span>
            <button class="detail-btn" @click="onViewDetails">Details</button>
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
        onViewDetails() {
            this.$router.push({ name: 'TodoDetails', params: { todoId: this.todo._id } })
        }
    }
}