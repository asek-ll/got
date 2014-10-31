angular.module('tg').factory('SocketService', ['socketFactory',
    function(socketFactory) {
        var mySocket = socketFactory();
        //mySocket.forward('error');
        return mySocket;
    }
]);