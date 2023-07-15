export default {
    template: `
    <section v-if="todo" class="todo-details">
        <h1>{{ todo.name }}</h1>
		<!-- <span>Owner: {{todo.owner.fullname}}</span><br> -->
		<span>Status: {{ todo.isDone ? 'Done' : 'Active' }}</span>
		<span>Created at: {{ todo.createdAt }}</span>
		<RouterLink to="/todo">Back</RouterLink>
    </section>
    `,
    data() {
        return {
            todo: null,
        }
    },
    created() {
        const { todoId } = this.$route.params
        this.$store.getters.getById(todoId)
            .then((todo) => {
                this.todo = todo
            })
            .catch((err) => {
                alert('Cannot load todo')
                this.$router.push('/todo')
            })
    },
}
