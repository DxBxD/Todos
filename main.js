'use strict'

const { createApp } = Vue

import { router } from './router.js'
import { store } from './store/store.js'

import { userService } from './services/user.service.js'
import { showSuccessMsg } from './services/event-bus.service.js'
import { todoService } from './services/todo.service.js'

import AppHeader from './cmps/AppHeader.js'
import UserMsg from './cmps/UserMsg.js'

const options = {
    template: `
        <section>
            <AppHeader/>
            <RouterView/>
            <UserMsg />
        </section>
    `,
    created() {
        this.$store.dispatch({ type: 'loadTodos' })
        showSuccessMsg('HomePage Loaded')
    },
    components: {
        AppHeader,
        UserMsg,
    },
}
const app = createApp(options)

app.use(router)
app.use(store)

app.mount('#app')
