'use strict';
angular.module('socialApp')
  .controller('ChatCtrl', function ($scope,$timeout) {
    var rootRef=new Firebase('https://blazing-fire-119.firebaseio.com/');
    var messagesRef=rootRef.child('messages');

    $scope.currentText=null;
    $scope.currentUser=null;
    $scope.messages=[];

    messagesRef.on('child_added',function(snapshot){
      $timeout(function(){
        var snapVal=snapshot.val();
        $scope.messages.push({
          user:snapVal.user,
          text:snapVal.text,
          name:snapshot.key()
        });
      });
    });
    messagesRef.on('child_changed',function(snapshot){
      $timeout(function(){
        var snapVal=snapshot.val();
        var message=findMessageByName(snapshot.key());
        message.text=snapVal.text;
      });
    });
    messagesRef.on('child_removed',function(snapshot){
      $timeout(function(){
        deleteMessageByName(snapshot.key());
      });
    });
    function turnFeedOff(){
      messagesRef.off();
    }
    function findMessageByName(name){
      var messageFound=null;
      for (var i =$scope.messages.length - 1; i >= 0; i--) {
        var currentMessage=$scope.messages[i];
        if(currentMessage.name==name){
          messageFound=currentMessage;
          break;
        }
      };
      return messageFound;
    }
    function deleteMessageByName(name){
      for (var i =$scope.messages.length - 1; i >= 0; i--) {
        var currentMessage=$scope.messages[i];
        if(currentMessage.name==name){
          $scope.messages.splice(i,1);
          break;
        }
      };
    }
    $scope.sendMessage=function(){
      messagesRef.push({
        user:$scope.currentUser,
        text:$scope.currentText
      });
    }
  });
