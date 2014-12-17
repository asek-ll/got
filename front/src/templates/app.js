angular.module('templates-main', ['views/game-form.tpl.html', 'views/game-list.tpl.html', 'views/home.tpl.html', 'views/user.tpl.html']);

angular.module("views/game-form.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/game-form.tpl.html",
    "<h1>Game creation</h1>\n" +
    "\n" +
    "<form role=\"form\" name=\"form\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"gameName\">Game name</label>\n" +
    "    <input type=\"input\" class=\"form-control\" id=\"gameName\" ng-model=\"game.name\" required placeholder=\"Enter name\">\n" +
    "  </div>\n" +
    "  <!--\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"exampleInputPassword1\">Password</label>\n" +
    "    <input type=\"password\" class=\"form-control\" id=\"exampleInputPassword1\" placeholder=\"Password\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"exampleInputFile\">File input</label>\n" +
    "    <input type=\"file\" id=\"exampleInputFile\">\n" +
    "    <p class=\"help-block\">Example block-level help text here.</p>\n" +
    "  </div>\n" +
    "  <div class=\"checkbox\">\n" +
    "    <label>\n" +
    "      <input type=\"checkbox\"> Check me out\n" +
    "    </label>\n" +
    "  </div>\n" +
    " --> \n" +
    "  <button ng-disabled=\"form.$invalid\" ng-click=\"createGame(game)\" type=\"submit\" class=\"btn btn-default\">Submit</button>\n" +
    "</form>\n" +
    "");
}]);

angular.module("views/game-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/game-list.tpl.html",
    "<h1>Game list</h1>\n" +
    "<div class=\"btn-toolbar\" role=\"toolbar\">\n" +
    "  <div class=\"btn-group\" role=\"group\">\n" +
    "    <a href=\"games/new\" class=\"btn btn-default\">Create game</a>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<table class=\"table\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th>Id</th>\n" +
    "      <th>name</th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"game in games\">\n" +
    "      <td ng-bind=\"game._id\"></td>\n" +
    "      <td ng-bind=\"game.name\"></td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("views/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/home.tpl.html",
    "<div class=\"starter-template\">\n" +
    "        <h1>Bootstrap starter template</h1>\n" +
    "        <p class=\"lead\">Use this document as a way to quickly start any new project.<br> All you get is this text and a mostly barebones HTML document.</p>\n" +
    "        <div ng-repeat=\"thing in awesomeThings\">\n" +
    "          {{thing}}\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      ");
}]);

angular.module("views/user.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/user.tpl.html",
    "<h1>User</h1>\n" +
    "\n" +
    "{{ currentUser.name }}\n" +
    "");
}]);
