angular.module('tg').factory("GameService", ['$resource', function($resource) {
  return $resource("/api/games/:id");
}]);
