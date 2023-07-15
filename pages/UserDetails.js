export default {
    template: `
        <form @submit.prevent="updateUser" class="user-prefs" v-if="user">
            <h3 @click="printUser">{{ user.username }}'s profile</h3>
            <label>Full name: <input v-model="user.fullname" type="text"></label>
            <label>Balance: <input v-model="user.balance" type="text"></label>
            <label>Text color: <input v-model="user.prefs.color" type="color"></label>
            <label>Background color: <input v-model="user.prefs.bgColor" type="color"></label>
            <button class="save-user-btn">Save</button>
        </form>`,
    created() { 
            this.user = JSON.parse(JSON.stringify(this.$store.state.user))
            console.log(this.user) 
    },
    methods: {
        printUser() {
            console.log(this.user)
        },
        updateUser() {
            this.$store.dispatch('updateUser', this.user)
        }
    }
}