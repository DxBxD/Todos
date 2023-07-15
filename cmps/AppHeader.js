import { userService } from "../services/user.service.js"

export default {
    template: `
        <header>
            <routerLink to='/'><h1 class="main-title">Todos</h1></routerLink> 

            <nav>
                <router-link to="/todo">Todo List</router-link> | 
                <router-link to="/user">User Profile</router-link>
            </nav>

            <router-link to="/user">
                <section v-if="user" class="user-info" :style="userPrefsStyle">
                    <span>
                        {{user.username }}
                    </span> 
                    <span>\${{ user.balance }}</span>
                </section>
            </router-Link>

            <span class="todo-progress">{{ progressPercentage + ' done' }}<progress :value="doneTodosCount" :max="todosCount"></progress></span>
        </header>
    `,
    computed: {
        user() {
            return this.$store.getters.currentUser
        },
        doneTodosCount() {
            return this.$store.getters.doneTodosCount
        },
        todosCount() {
            return this.$store.getters.todosCount
        },
        userPrefsStyle() {
            if (!this.user || !this.user.prefs) return {}
            return {
                color: this.user.prefs.color,
                backgroundColor: this.user.prefs.bgColor,
            }
        },
        progressPercentage() {
            if (!this.todosCount) return '0%'
            return `${Math.round((this.doneTodosCount / this.todosCount) * 100)}%`
        }
    },
}
