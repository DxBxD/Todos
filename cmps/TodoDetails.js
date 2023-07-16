export default {
    template: `
    <section v-if="todo" class="todo-details">
        <h1>{{ todo.name }}</h1>
		<!-- <span>Owner: {{todo.owner.fullname}}</span><br> -->
		<span>Status: {{ todo.isDone ? 'Done' : 'Active' }}</span>
		<span>Created at: {{ date }}</span>
		<RouterLink to="/todo"><button class="todo-details-back-btn">Back</button></RouterLink>
    </section>
    `,
    data() {
        return {
            todo: null,
        }
    },
    created() {
        const todos = this.$store.getters.todos
        console.log(todos)
        const { todoId } = this.$route.params
        this.todo = todos.find(todo => todo._id === todoId)
        console.log(this.todo)
    },
    computed: {
        date() {
            let unformattedDate = new Date(this.todo.createdAt)
            return unformattedDate.toDateString() + ', ' + unformattedDate.toLocaleTimeString()
        } 
    }
}
