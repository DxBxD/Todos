import { userService } from "../../services/user.service.js"

export const userStore = {
    state() {
        return {
            user: userService.getLoggedinUser(),
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
    },
    actions: {
        updateUser(context, user) {
            return userService.updateUser(user)
                .then(updatedUser => {
                    context.commit('setUser', updatedUser)
                    context.dispatch({type: 'addActivity', txt: 'Updated his\\her settings'})
                })
                .catch(error => {
                    console.error('Failed to update user', error)
                    console.log(user)
                })
        },
        addActivity(context, {txt}) {
            return userService.addActivity(txt)
                .then(updatedUser => {
                    context.commit('setUser', updatedUser)
            })
        }
    },
    getters: {
        currentUser(state) { return state.user },
    }
}
