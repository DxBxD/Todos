import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const USER_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  getLoggedinUser,
  updateUser,
  login,
  logout,
  signup,
  addActivity
}

// Demo Data:
_createUser()

function getLoggedinUser() {
  let user = JSON.parse(
    sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || null
  )
  if (!user) {
    user = { username: 'baba', password: '123' }
    login({ username: 'baba', password: '123' })
  }
  return user
}

function updateUser(userToUpdate) {
  return storageService.put(USER_KEY, userToUpdate)
    .then(updatedUser => {
      _saveUserToStorage(updatedUser)
      return updatedUser
    })
    .catch(error => Promise.reject(error))
}

function login(credentials) {
  return storageService.query(USER_KEY).then(users => {
    const user = users.find(u => u.username === credentials.username)
    if (user) {
      return _saveUserToStorage(user)
    } else {
      return Promise.reject('Invalid credentials')
    }
  })
}

function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  return Promise.resolve()
}

function signup(credentials) {
  return storageService.query(USER_KEY).then(users => {
    const user = users.find(u => u.username === credentials.username)
    if (user) return Promise.reject('Username already taken')
    return storageService
      .post(USER_KEY, { ...credentials, balance: 600, activities: [{ txt: 'Created account', at: Date.now() }], prefs: {color: 'black', bgColor: 'whitesmoke'}, todos: [] })
      .then(user => {
        return _saveUserToStorage(user)
      })
  })
}

function addActivity(txt) {
  const user = getLoggedinUser()
  const activity = {
    txt,
    at: Date.now()
  }
  user.activities.unshift(activity)
  return storageService.put(USER_KEY, user).then(updatedUser => {
    _saveUserToStorage(updatedUser)
    return updatedUser.activities
  })
}

function _saveUserToStorage(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function _createUser() {
  const user = localStorage.getItem(USER_KEY)
  if (!user) signup({ fullname: 'Baba Ji', username: 'baba', password: '123'})
  login({ username: 'baba', password: '123' })
}