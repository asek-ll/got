angular.module('tg').factory 'SocketService', (socketFactory) ->
  mySocket = socketFactory()
  #mySocket.forward('error');
  mySocket
