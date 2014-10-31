/* global angular */

angular.module('tg').factory('AuthService', ['$http',
  function($http) {
    var currentUser;

    var requestCurrentUser = function() {

      var responsePromise = $http.get("/user");

      responsePromise.success(function(data, status, headers, config) {
        currentUser = data;
      });

    };

    requestCurrentUser();

    return {
      login: function(user) {
        currentUser = user;
      },
      logout: function() {},
      isLoggedIn: function() {
        return !!currentUser;
      },
      currentUser: function() {
        return currentUser;
      }
    };
  }
]);