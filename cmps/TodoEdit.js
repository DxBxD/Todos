export default {
    template: `
        <section class="edit-todo">
            <form @submit.prevent="saveTodo">
                <input type="text" placeholder="What needs to be done?" v-model="localTodoName"/>
                <button>Save</button>
                <button @click.prevent="cancelEdit">Clear</button>
            </form>
        </section>
    `,
    computed: {
        todoToEdit() {
            return this.$store.getters.getEmptyTodo
        }
    },
    data() {
        return {
            isEditing: false,
            localTodoName: ''
        }
    },
    methods: {
        saveTodo() {
            if (!this.localTodoName) return
            this.isEditing = false
            const updatedTodo = { ...this.todoToEdit, name: this.localTodoName }
            if (updatedTodo._id) {
                this.$store.dispatch('updateTodo', updatedTodo).then(() => {
                    this.$store.commit('resetTodo')
                    this.localTodoName = ''
                })
            } else {
                this.$store.dispatch('addTodo', updatedTodo).then(() => {
                    this.$store.commit('resetTodo')
                    this.localTodoName = ''
                })
            }
        },
        cancelEdit() {
            this.isEditing = false
            this.$store.commit('resetTodo')
            this.localTodoName = ''
        }
    },
    watch: {
        todoToEdit(newValue) {
            this.isEditing = !!newValue.name
            this.localTodoName = newValue.name || ''
        }
    }
}