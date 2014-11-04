angular.module('tg').factory("GameService", function($resource) {
  return $resource("/api/games/:id");
});