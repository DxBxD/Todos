const { createRouter, createWebHashHistory} = VueRouter

import HomePage from './pages/HomePage.js'
import TodoIndex from './pages/TodoIndex.js'
import TodoList from './cmps/TodoList.js'
import TodoDetails from './cmps/TodoDetails.js'
import UserDetails from './pages/UserDetails.js'

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/todo',
        component: TodoIndex,
        children: [
            {
                path: '',
                name: 'TodoList',
                component: TodoList
              },
              {
                path: ':todoId',
                name: 'TodoDetails',
                component: TodoDetails
              },
            ]
          },
          {
            path: '/user',
            component: UserDetails,
          }
]

export const router = createRouter({
    routes,
    history: createWebHashHistory()
})