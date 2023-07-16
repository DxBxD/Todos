export default {
    template: `
        <form @submit.prevent="updateUser" class="user-prefs" v-if="user">
            <h3>{{ user.username }}'s profile</h3>
            <label>Full name: <input v-model="user.fullname" type="text"></label>
            <label>Balance: <input v-model="user.balance" type="text"></label>
            <label>Text color: <input v-model="user.prefs.color" type="color"></label>
            <label>Background color: <input v-model="user.prefs.bgColor" type="color"></label>
            <button class="save-user-btn">Save</button>
            <br>
            <h3>{{ user.username }}'s activities</h3>
            <ul v-for="activity in user.activities">
                <li>{{ activity.txt }} - {{ formatDate(activity.at) }}</li>
            </ul>
        </form>
        <section>
            
        </section>`,
    data(){
        return {
            user: {}
        }
    },
    created() { 
            this.user = this.userClone
            console.log(this.user) 
    },
    computed: {
        userClone(){
            return JSON.parse(JSON.stringify(this.$store.getters.currentUser))
        }
    },
    methods: {
        printUser() {
            console.log(this.user)
        },
        updateUser() {
            this.$store.dispatch('updateUser', this.user)
        },
        formatDate(activityTimestamp) {
            let date = new Date(activityTimestamp)
            return `${date.toDateString()} ${date.toLocaleTimeString()}`
        }
    }
}