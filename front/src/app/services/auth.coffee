angular.module('tg').factory 'AuthService', ($http) ->
  currentUser = undefined

  requestCurrentUser = ->
    responsePromise = $http.get('/user')
    responsePromise.success (data, status, headers, config) ->
      currentUser = data

  requestCurrentUser()

  {
    login: (user) ->
    logout: ->
    isLoggedIn: ->
      !!currentUser
    currentUser: ->
      currentUser
  }
