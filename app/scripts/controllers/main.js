'use strict';

/**
 * @ngdoc function
 * @name socialApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the socialApp
 */
angular.module('socialApp')
  .controller('MainCtrl', function ($scope,$timeout) {
	var rootRef=new Firebase('https://blazing-fire-119.firebaseio.com/');
	var childRef=rootRef.child('message');
	childRef.on('value',function(snapshot){
		$timeout(function(){
		console.log("snapshot.hasChildren()"+snapshot.hasChildren());
		console.log("snapshot.hasChild('text')"+snapshot.hasChild('text'));
		console.log("snapshot.numChildren()"+snapshot.numChildren());
		console.log("snapshot.key()"+snapshot.key());
		console.log("Loop");
		snapshot.forEach(function(item){
			console.log(item.key()+" : "+item.val());
			console.log(item.ref());

		});

		var snapVal=snapshot.val();
		$scope.message=snapVal;	
		});
	});
	$scope.$watch('message.text',function(newVal){
		if(!newVal){
			return;
		}
		childRef.update({
    		text:newVal,
    		changedOn:new Date()
    	});
	});
    $scope.setMessage=function(){
    	childRef.set({
    		user:'Ammar',
    		text:'my status'
    	});
    }
    $scope.updateMessage=function(){
    	childRef.update({
    		user:'Ammar Hasan',
    		postedOn:new Date()
    	});
    }
    $scope.deleteMessage=function(){
    	childRef.remove();
    }
  });
