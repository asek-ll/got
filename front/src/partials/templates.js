angular.module('templates-main', ['partials/game-list.tpl.html', 'partials/home.tpl.html']);

angular.module("partials/game-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/game-list.tpl.html",
    "<strong>GAME LIST HERE</strong>");
}]);

angular.module("partials/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/home.tpl.html",
    "<div class=\"starter-template\">\n" +
    "        <h1>Bootstrap starter template</h1>\n" +
    "        <p class=\"lead\">Use this document as a way to quickly start any new project.<br> All you get is this text and a mostly barebones HTML document.</p>\n" +
    "        <div ng-repeat=\"thing in awesomeThings\">\n" +
    "          {{thing}}\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      ");
}]);
