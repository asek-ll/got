angular.module('tg').factory 'GameService', ($resource) ->
  $resource '/api/games/:id'
