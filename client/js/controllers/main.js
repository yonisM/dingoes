'use strict';

/**
 * @ngdoc function
 * @name dingoesWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dingoesWebApp
 */

 
 
 angular.module('app')
 
 .controller('MainCtrl', ['$scope', 'About', function ($scope,About) {
	 
	 //return all faculty
	 $scope.faculty = About.find(); 
	 //Return only the headteacher
	 $scope.headTeacher = About.findOne({"Faculty": "Head Teacher"}); 
	 
	 
	 }
	 ])
	 
	 
	 
.controller('ExamResultsCtrl',['$scope','StudentMark','Reviewer','$rootScope','NonMultipleChoice','MultipleChoice',function($scope,StudentMark,Reviewer,$rootScope,NonMultipleChoice,MultipleChoice){
	
	 //return results 
$scope.counterResults = Reviewer.studentMarks.count({id:$rootScope.currentUser.id});
$scope.studentMarks = Reviewer.studentMarks({id:$rootScope.currentUser.id});


 $scope.nonMultipleChoice = NonMultipleChoice.find(); 
   $scope.multipleChoice = MultipleChoice.find();
	
}



])	 
	 

.controller('examCtrl',['$scope','NonMultipleChoice', 'MultipleChoice','StudentMark','Reviewer','AuthService','$rootScope'
,function ($scope,NonMultipleChoice,MultipleChoice,StudentMark,Reviewer,AuthService,$rootScope) {
   
 
   $scope.instruction = true;
   $scope.MultipleChoice= false;
   $scope.youEnter= false;
   $scope.evaluations= false; 
   
 
 var countCorrect = 0;
  var countIncorrect = 0;
  

	//return questions
   $scope.nonMultipleChoice = NonMultipleChoice.find(); 
   $scope.multipleChoice = MultipleChoice.find(); 
   
   
  
	 
	 
	 
	 
   
  $scope.startS1 = function(){
	  $scope.instruction = false;
	  $scope.MultipleChoice= true; 
	  
  };
  
    $scope.startS2 = function(){
	   $scope.MultipleChoice= false;
	   $scope.youEnter= true;
    
  };
	
	 $scope.showResults = function(){
	  $scope.youEnter= false;
	  $scope.evaluations= true;
	  $scope.CheckanswerButton = true; 
	   
  };
   
   
   $scope.checkAnswer = function(){
	  $scope.showScore = true; 
	  //$scope.evaluations= false;
	  $scope.CheckanswerButton = false; 

	  var multipleChoice = $scope.multipleChoice;
	   var nonMultipleChoice = $scope.nonMultipleChoice;
	   
	   //checks answer for non multiple choice question
	 for ( var i = 0; i < nonMultipleChoice.length ;i++){
	
	   if (nonMultipleChoice[i].userResponse == nonMultipleChoice[i].answer){
		   nonMultipleChoice[i].evaluation = (String.fromCharCode(10004));;
		   countCorrect++;
	   }
	   else {
		   nonMultipleChoice[i].evaluation = (String.fromCharCode(10008));
		   countIncorrect++;
	  }
	 } 
	  
	  //check answer for multiple choice
	  
	  for (var j = 0; j < multipleChoice.length; j++ ){
		  
	   if (multipleChoice[j].userResponse == multipleChoice[j].answer){
		   multipleChoice[j].evaluation = (String.fromCharCode(10004));
		   countCorrect++;   
		   
	   }else {
		   multipleChoice[j].evaluation = (String.fromCharCode(10008)) ;
		   countIncorrect++;
	  }
	  }
	  //Save result into Database 
	 
	 var CorrectCounter = {

		 "results": countCorrect 
	 };
	 
	 $scope.CorrectCounter = CorrectCounter;
		  
	  Reviewer.studentMarks.create({id:$rootScope.currentUser.id},CorrectCounter);
	  
	 
	  //evaluation messages
	  
	 var totalQuestion = multipleChoice.length + nonMultipleChoice.length ;
	 var passMark = 0.7 * totalQuestion; //pass test at 70% threshold
	   
	  
	  if(countCorrect >= passMark){
		  $scope.pass = "Well done! You Passed";
		  $scope.passShow = true;
	  }else{
		  $scope.fail = "You Failed to acheive the threshold of "+ passMark + " out of "+ totalQuestion+". Please Keep Practicing!";
		  $scope.failShow= true;
	  }
	  
	  $scope.countCorrect = countCorrect;
	   $scope.countIncorrect = countIncorrect;
	  
	 
	  
   };

  
  }
  
  ])
  
  
    .controller('ContactusCtrl',['$scope','Contact','$location','$timeout', function ($scope,Contact,$location,$timeout) {
		

		
		$scope.contactForm = true;
		$scope.tyMessage = false;
		
	var contactus = {
		fullName:"",
		email:"",
		message:""
	}; 
	
	$scope.contactus = contactus; 
	

	$scope.sendMessage = function (){
		Contact.create(contactus);
		$scope.contactForm = false;
		$scope.tyMessage = true;
		$timeout(function(){$location.path('/')},3000 ); 
		
	};
		

	}
	])
  

  
  
  
    