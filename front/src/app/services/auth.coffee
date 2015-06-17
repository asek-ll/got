angular.module('tg').factory 'AuthService', ($http, $q) ->
  currentUser = undefined

  requestCurrentUser = ->
    responsePromise = $http.get('/user')
    responsePromise.success (data, status, headers, config) ->
      currentUser = data

  requestCurrentUser()

  {
    login: (user) ->
      deferred = $q.defer()
      $http.post '/auth/local', user
        .success (data, status, headers, config) ->
          if status == 200
            currentUser = data
            deferred.resolve()
          else
            deferred.reject()
        .error ->
          deferred.reject()

      deferred.promise

    logout: ->
    isLoggedIn: ->
      !!currentUser
    currentUser: ->
      currentUser
  }
