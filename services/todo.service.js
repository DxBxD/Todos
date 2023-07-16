'use strict'

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TODO_KEY = 'todoDB'
const PAGE_SIZE = 5

_createTodos()

export const todoService = {
    query,
    get,
    remove,
    save,
    getEmptyTodo,
}

function query(filterBy = {}, sortBy = {}) {
    return storageService.query(TODO_KEY)
        .then(todos => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                todos = todos.filter(todo => regex.test(todo.name))
            }
            if (filterBy.status === 'done') {
                todos = todos.filter(todo => todo.isDone === true)
            } else if (filterBy.status === 'active') {
                todos = todos.filter(todo => todo.isDone === false)
            }
        
            if (sortBy.type) {
                const diff = sortBy.direction
                switch (sortBy.type) {
                    case 'txt':
                        todos.sort((todoA, todoB) => (todoA.name.localeCompare(todoB.name)) * diff)
                        break
                    case 'isDone':
                        todos.sort((todoA, todoB) => (todoA.isDone - todoB.isDone) * -diff)
                        break
                    case 'createdAt':
                        todos.sort((todoA, todoB) => {
                            const dateA = new Date(todoA.createdAt)
                            const dateB = new Date(todoB.createdAt)
                            console.log('dateA:', dateA, 'dateB:', dateB)
                            return (dateA.getTime() - dateB.getTime()) * diff
                        })
                        break
                }
            }

            if (filterBy.pageIdx) {
            const startPageIdx = filterBy.pageIdx * PAGE_SIZE
            todos = todos.slice(startPageIdx, startPageIdx + PAGE_SIZE)
            }

            return todos
        })
}

function get(todoId) {
    return storageService.get(TODO_KEY, todoId)
}

function remove(todoId) {
    return storageService.remove(TODO_KEY, todoId)
}

function save(todo) {
    if (todo._id) {
        return storageService.put(TODO_KEY, todo)
    } else {
        return storageService.post(TODO_KEY, todo)
    }
}

function getEmptyTodo(name = '', isDone = false, createdAt = Date.now()) {
    return { _id: '', name, isDone , createdAt}
}

function _createTodos() {
    let todos = utilService.loadFromStorage(TODO_KEY)
    if (!todos || !todos.length) {
        todos = []
        todos.push(_createTodo('Wash the dishes', false))
        todos.push(_createTodo('Buy groceries', false))
        todos.push(_createTodo('Call grandma', true))
        todos.push(_createTodo('Finish the report', false))
        todos.push(_createTodo('Go for a run', true))
        todos.push(_createTodo('Finish project proposal', false))
        todos.push(_createTodo('Schedule dentist appointment', false))
        todos.push(_createTodo('Prepare dinner', false))
        todos.push(_createTodo('Attend yoga class', true))
        todos.push(_createTodo('Read a chapter of a book', false))
        todos.push(_createTodo('Pay bills', true))
        todos.push(_createTodo('Clean the house', false))
        todos.push(_createTodo('Write a blog post', true))
        todos.push(_createTodo('Call a friend', false))
        todos.push(_createTodo('Go to the gym', true))
        todos.push(_createTodo('Take the dog for a walk', true))
        todos.push(_createTodo('Plan weekend activities', false))
        todos.push(_createTodo('Organize closet', true))
        todos.push(_createTodo('Watch a movie', false))
        todos.push(_createTodo('Attend a meeting', true))
        todos.push(_createTodo('Go grocery shopping', false))
        todos.push(_createTodo('Clean the car', true))
        todos.push(_createTodo('Pay utility bills', false))
        todos.push(_createTodo('Send an email to clients', true))
        todos.push(_createTodo('Prepare for the presentation', false))
        todos.push(_createTodo('Call the plumber', true))
        todos.push(_createTodo('Fix the broken shelf', false))
        todos.push(_createTodo('Read a new book', true))
        todos.push(_createTodo('Exercise for 30 minutes', false))
        todos.push(_createTodo('Water the plants', false))
        todos.push(_createTodo('Update the website content', false))
        todos.push(_createTodo('Take a break and relax', true))
        todos.push(_createTodo('Visit the art gallery', false))
        todos.push(_createTodo('Learn a new skill', false))
        todos.push(_createTodo('Finish knitting project', true))
        todos.push(_createTodo('Write a thank-you note', false))
        todos.push(_createTodo('Explore a new hiking trail', true))
        todos.push(_createTodo('Try a new recipe', false))
        utilService.saveToStorage(TODO_KEY, todos)
    }
}

function _createTodo(name, isDone) {
    const todo = getEmptyTodo(name, isDone)
    todo._id = utilService.makeId()
    return todo
}