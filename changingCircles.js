
/*need to make sure that power update quizzes are working correctly, some variables might be set to false in the wrong place
remember to add escaping when generating quizzes before allowing anyone else to generate quizzes
to do: 
size of board
the first options still need styling
how to prevent unipolar - multipolar - unipolar again, extra argument to check polarity that will only allow polarity shift when the state is very weak?
perfect balancing has no quizzes!
need more explanations when system is changing polarity: ask, before click to new turn think what is now the polarity of the new world
also somehow need to make sure that bipolar war happens once but only once for each bipolar world
bipolar war question: first major wars? answer no, only smaller second: why is this
now old hege power continues to decline not working at all?
smaller steps in sizes for power transforms??
correct/ incorrect boxes could be prettier
need to make beginning questionaires that explain simu: probabilities and tendencies: why is this? (one q) pause with quizzes: get most out if basic familiarity, can help to test understanding
*/
$(document).ready(function(){

	var num = 0;
	var initialStates; 
	var manual; 
	var automaticMulti = undefined;
	var automaticBi = undefined; 
	var automaticUni = undefined; 
	var onlyOnce = undefined; 
	var goBack = false; 
	var goForth = false; 
	var completedQuizzes = {}	
	var lastSeenFromGroup={}
	var previously = 'default';
	
	
	$(function(){
		$("#powerButton").click(startTheSimulation);
  	});
  	
	function generateParameterForm(){	
		var firstForm = document.getElementById('stateNumbers'); 
		$(firstForm).removeClass('visible'); 
		$(firstForm).addClass('hidden');
		var stateDetails = document.getElementById('statePowers'); 
		$(stateDetails).addClass('visible'); 
        $(stateDetails).removeClass('hidden');
		var stateForm = document.getElementById('statePowers'); 
		$(stateForm).addClass('form' +  num); 
		var statePowerForms = document.getElementsByClassName('statePowers');
		var statePowerLabels = document.getElementsByClassName('powerLabel'); 
	    var stateTerritoryForms = document.getElementsByClassName('stateTerritory');
		var stateTerritoryLabels = document.getElementsByClassName('territoryLabel'); 
		var stateIntellectForms = document.getElementsByClassName('stateIntellect');
		var stateIntellectLabels = document.getElementsByClassName('intellectLabel'); 
		var fieldsets = document.getElementsByClassName('fieldsets'); 
		var labels = document.getElementsByClassName('legends'); 
		for (var i=0; i<statePowerForms.length; i++){
	    	var power = statePowerForms[i];
	    	var powerLabel = statePowerLabels[i]; 
	    	var territory = stateTerritoryForms[i]; 
	    	var territoryLabel = stateTerritoryLabels[i]; 
	    	var intellect = stateIntellectForms[i]; 
	    	var intellectLabel = stateIntellectLabels[i]; 
	    	var fieldset = fieldsets[i];
	    	var label = labels[i];
	    	if (i<num){  
	        	$(power).removeClass('hidden');
	        	$(power).addClass('visible'); 
	        	$(powerLabel).removeClass('hidden');
	        	$(powerLabel).addClass('visible');
	        	$(territory).removeClass('hidden');
	        	$(territory).addClass('visible'); 
	        	$(territoryLabel).removeClass('hidden');
	        	$(territoryLabel).addClass('visible');
	        	$(intellect).removeClass('hidden');
	        	$(intellect).addClass('visible'); 
	        	$(intellectLabel).removeClass('hidden');
	        	$(intellectLabel).addClass('visible');
	        	$(fieldset).removeClass('hidden');
	        	$(fieldset).addClass('visible');
	        	$(label).removeClass('hidden');
	        	$(label).addClass('visible');
	    		}
			else{
		   		$(power).removeClass('visible');
	       		$(power).addClass('hidden');  
	       		$(powerLabel).removeClass('visible');
	       		$(powerLabel).addClass('hidden');
	       		$(territory).removeClass('visible');
	       		$(territory).addClass('hidden');  
	       		$(territoryLabel).removeClass('visible');
	       		$(territoryLabel).addClass('hidden');
	       		$(intellect).removeClass('visible');
	       		$(intellect).addClass('hidden');  
	       		$(intellectLabel).removeClass('visible');
	       		$(intellectLabel).addClass('hidden');
	       		$(fieldset).removeClass('visible');
	        	$(fieldset).addClass('hidden');
	        	$(label).removeClass('hidden');
	        	$(label).addClass('visible');
	   		}	
  		}
 		button=document.getElementById('powerButton'); 
    	$(button).removeClass('hidden');
	  	$(button).addClass('visible'); 
	  	manual = true; 
  		}
$(function(){

	$("#advancedButton1").click(function(){
		var button1 = document.getElementById('advancedButton1'); 
		$(button1).removeClass('visible'); 
		$(button1).addClass('hidden'); 
		var button2 = document.getElementById('advancedButton2'); 
		$(button2).removeClass('hidden'); 
		$(button2).addClass('visible'); 
		var advanced = document.getElementById('advancedOptions'); 
		$(advanced).removeClass('hidden'); 
		$(advanced).addClass('visible'); 
	}); 
	$("#advancedButton2").click(function(){
		var button2 = document.getElementById('advancedButton2'); 
		$(button2).removeClass('visible'); 
		$(button2).addClass('hidden'); 
		var button1 = document.getElementById('advancedButton1'); 
		$(button1).removeClass('hidden'); 
		$(button1).addClass('visible'); 
		var advanced = document.getElementById('advancedOptions'); 
		$(advanced).removeClass('visible'); 
		$(advanced).addClass('hidden'); 
	}); 
	
 	onlyOnce = true; 	
	$("#buttonForStates").click(function(){
		
		$("#turnErrorButton").click(function(){
			var error = document.getElementById('firstFormTurnError'); 
			($('#stateNumbers')).removeClass('hidden'); 
			($('#stateNumbers')).addClass('visible'); 
			$(error).removeClass('visible'); 
			$(error).addClass('hidden');
		});
		
		$("#checkErrorButton").click(function(){
			var error = document.getElementById('checkError'); 
			($('#stateNumbers')).removeClass('hidden'); 
			($('#stateNumbers')).addClass('visible'); 
			$(error).removeClass('visible'); 
			$(error).addClass('hidden');
		});
		
		
		num = ($("#numberOfStates").val());
		numOfTurns = 1; 	
		($('#stateNumbers')).removeClass('visible'); 
			($('#stateNumbers')).addClass('hidden'); 
		



		if (document.numberOfStates.initialiseStates[0].checked == false && document.numberOfStates.initialiseStates[1].checked == false && document.numberOfStates.initialiseStates[2].checked == false && document.numberOfStates.initialiseStates[3].checked == false){
			
			var lotteryNumber = Math.random();
			if (lotteryNumber < 0.333){
				automaticUni = true;	
				startTheSimulation(); 
			}
	
			else if (lotteryNumber < 0.666){
				automaticBi = true; 
				startTheSimulation(); 
			}
			else{
				automaticMulti = true; 
				startTheSimulation(); 
			}
		}
		else{
			if(document.numberOfStates.initialiseStates[2].checked == true){
				automaticUni = true; 
				startTheSimulation(); 	
			}	
			if(document.numberOfStates.initialiseStates[1].checked == true){
				automaticBi = true; 
				startTheSimulation(); 	
			}	
			if(document.numberOfStates.initialiseStates[0].checked == true){
				automaticMulti = true; 
				startTheSimulation(); 	
			}	
		
			else if(document.numberOfStates.initialiseStates[3].checked == true){
				 generateParameterForm(); 
	 			
			}

		}
  
	});
});
/*various functions to deal with Ajax requests*/

function removeContent(div) {

	document.getElementById(div).innerHTML = "<br>";
}	
function removeQuizContent(div) {

	document.getElementById(div).innerHTML = "";
}	

function addContent(div, content){ 
	document.getElementById(div).innerHTML += content;
	document.getElementById(div).innerHTML += '<br>';
}

function initialPowerSort(a, b){
	return b[0] - a[0];
}

function initialOrderSort(a, b){
	return a[3] - b[3]
}
function startTheSimulation(){
	
	function ajaxGetsQuiz(group_name, pause, contDiv, continueFunction, checkbox){
		var control = false;
		/*here first, get values from dicts. if keys are not there, just set 
		i * them to empty, remember to update how values are updated below */
		if (group_name in lastSeenFromGroup){
			var lastSeen = lastSeenFromGroup[group_name]; 
		}
		else{
			var lastSeen = 'empty'
		}
		if (group_name in completedQuizzes){
			var completed = completedQuizzes[group_name];

		}
		else{
			var completed = 'empty'
		}
		var url = '/quiz/';
		url+=group_name;
		url +='/';
		url += completed; 
		url += '/'; 
		url += lastSeen;
		url += '/send'; 
		$.get(url, 
			function(data){
		/*keeping track of what was the last quiz seen in a quiz group, keeping track of which quizzes no more
		remember to remove all content before continuing onwards
			var completedQuizzes=[]
			var lastSeenFromGroup={}
		/*need to add two new messages, one in case has already seen, another if has already seen all the quizzes, making forms of different size
		 * now: send finsihed quizzes and last seen quizzes only as relevant 
		 * to that group, send by usign the url
		 * according to length*/		 
				var groupName = url.split("/")[2]; 
				lastSeenFromGroup[groupName]= data['quiz_name'];
				var answers = data['answers']
				if (answers== undefined){
					var toAppend = '<form class = "quiz small">';
				}
				
				else if (answers.length == 3){
					var toAppend = '<form class = "quiz medium">';
				}
				else if (answers.length == 2){
					var toAppend = '<form class = "quiz medium">';
				}
				toAppend += data['question'];
				toAppend += '<br>';
				if (answers != undefined){
					var m=0
					var mapping = [];
					var orgi = answers.slice(); 
					while(answers.length != 0){
						var num = Math.floor(Math.random() * answers.length);
						add=0;
						for (k=0; k<orgi.length; k++){
							if (orgi[k] == answers[num]){
								mapping.push(k); 
							}
						}
						answer = answers.splice(num, 1); 
						toAppend += '<input type = "radio" name = "'
						toAppend += url
						toAppend += '" value = "'
						toAppend += answer[0][1];
						if (answer[0][1] == true){
							var corr = m;
						}
						toAppend += '">';
						toAppend += answer[0][0]
						toAppend += '</input> <br>'
						answers.splice(num, answer);
						m++; 
					}
					toAppend += '<br>'
					toAppend += '<input type = "button" class = "quizButton" value = "submit">';
					toAppend += '<div class = "hidden errorMsg"> Sorry, your answer was incorrect </div> <div class = "hidden correctMsg"> Your answer was correct! </div> <div class = "hidden noMsg"> You did not choose an answer </div>';
				}
				else{
					toAppend += '<input type = "button" class = "continueButton" value = "continue">';
				}
				toAppend += '</form>';
				addContent(pause, toAppend);
				$('.continueButton').click(function(){
					/*checkbox: not part of the form but appears with the continue button? */
					/*why not reacting to click?*/
					if (control == false){
						control = true;
						var cont = document.getElementById(contDiv);
						var check = document.getElementById(checkbox);
						if (check.checked==true){
							if (group_name in completedQuizzes){
								var addToList = '0'+data['quiz_name'];
								completedQuizzes[group_name]+=addToList;
							}
							else{
								completedQuizzes[group_name] = data['quiz_name'];
							}
						}
					        var expl = cont.childNodes;
						expl[1].innerHTML='';
						$(cont).removeClass('visible'); 
						$(cont).addClass('hidden'); 
						removeQuizContent(pause);
						continueFunction(); 	
					}
							
				});  
				$(".quizButton").click(function(){
									
					var q= document.getElementsByClassName('quiz')[0]; 
					var children = q.childNodes; 
					var radios = []
					for (var k=2; k<21; k+=3){
						if (children.length > k + 1){
							radios.push(children[k]); 
						}
					}
					var found = false; 
					for (var k=0; k<radios.length-1; k++){
						if (radios[k].checked){
							found = true; 
							if (k == corr){
								msgW = document.getElementsByClassName('errorMsg')[0]; 
								$(msgW).removeClass('visible'); 
								$(msgW).addClass('hidden'); 
								msgC = document.getElementsByClassName('correctMsg')[0]; 
								$(msgC).removeClass('hidden'); 
								$(msgC).addClass('visible'); 
								msgW = document.getElementsByClassName('noMsg')[0]; 
								$(msgW).removeClass('visible'); 
								$(msgW).addClass('hidden'); 
								var cont = document.getElementById(contDiv); 
								$(cont).addClass('visible'); 
								$(cont).removeClass('hidden');
								var addInfo = cont.children[0];
								addInfo.innerHTML += data['end'];
								var children = document.getElementById(pause).childNodes;
								var formChildren = children[1].childNodes;
								var qButton = formChildren[formChildren.length-6];
							        $(qButton).addClass('hidden'); 	
							}
							else{
								msgW = document.getElementsByClassName('errorMsg')[0]; 
								$(msgW).removeClass('hidden'); 
								$(msgW).addClass('visible'); 
								msgC = document.getElementsByClassName('correctMsg')[0]; 
								$(msgC).removeClass('visible'); 
								$(msgC).addClass('hidden'); 
								msgW = document.getElementsByClassName('noMsg')[0]; 
								$(msgW).removeClass('visible'); 
								$(msgW).addClass('hidden'); 
							}
							break; 
						}
						if (found == false){
							msgW = document.getElementsByClassName('noMsg')[0]; 
							$(msgW).removeClass('hidden'); 
							$(msgW).addClass('visible'); 
						}
					}
					if (found == true){
						var orgiNumber = mapping[k];
						var url2 = '/quiz/'+ data['quiz_name'] + '/submit/';
						$.get(url2, {chosen: orgiNumber})
							.done(function(){
							});
					}
				});							

		}); 
	}	


	var state1 = document.getElementById('state1'); 
	$(state1).hover(function(){
		var powerDe = state1.getElementsByClassName('powerDesc')[0]; 
		$(powerDe).removeClass('hidden'); 
		$(powerDe).addClass('visible'); 
		},
		function(){
			var powerDe = state1.getElementsByClassName('powerDesc')[0]; 
			$(powerDe).removeClass('visible'); 
			$(powerDe).addClass('hidden'); 
			});
	$(state2).hover(function(){
		var powerDe = state2.getElementsByClassName('powerDesc')[0]; 
		$(powerDe).removeClass('hidden'); 
		$(powerDe).addClass('visible'); 
		},
		function(){
			var powerDe = state2.getElementsByClassName('powerDesc')[0]; 
			$(powerDe).removeClass('visible'); 
			$(powerDe).addClass('hidden'); 
			});
	$(state3).hover(function(){
		var powerDe = state3.getElementsByClassName('powerDesc')[0]; 
		$(powerDe).removeClass('hidden'); 
		$(powerDe).addClass('visible'); 
		},
		function(){
			var powerDe = state3.getElementsByClassName('powerDesc')[0]; 
			$(powerDe).removeClass('visible'); 
			$(powerDe).addClass('hidden'); 
			});
	$(state4).hover(function(){
		var powerDe = state4.getElementsByClassName('powerDesc')[0]; 
		$(powerDe).removeClass('hidden'); 
		$(powerDe).addClass('visible'); 
		},
		function(){
			var powerDe = state4.getElementsByClassName('powerDesc')[0]; 
			$(powerDe).removeClass('visible'); 
			$(powerDe).addClass('hidden'); 
			});
	$(state5).hover(function(){
		var powerDe = state5.getElementsByClassName('powerDesc')[0]; 
		$(powerDe).removeClass('hidden'); 
		$(powerDe).addClass('visible'); 
		},
		function(){
			var powerDe = state5.getElementsByClassName('powerDesc')[0]; 
			$(powerDe).removeClass('visible'); 
			$(powerDe).addClass('hidden'); 
			});
	$(state6).hover(function(){
		var powerDe = state6.getElementsByClassName('powerDesc')[0]; 
		$(powerDe).removeClass('hidden'); 
		$(powerDe).addClass('visible'); 
		},
		function(){
			var powerDe = state6.getElementsByClassName('powerDesc')[0]; 
			$(powerDe).removeClass('visible'); 
			$(powerDe).addClass('hidden'); 
			});
	$(state7).hover(function(){
		var powerDe = state7.getElementsByClassName('powerDesc')[0]; 
		$(powerDe).removeClass('hidden'); 
		$(powerDe).addClass('visible'); 
		},
		function(){
			var powerDe = state7.getElementsByClassName('powerDesc')[0]; 
			$(powerDe).removeClass('visible'); 
			$(powerDe).addClass('hidden'); 
			});
			
	$(state8).hover(function(){
		var powerDe = state8.getElementsByClassName('powerDesc')[0]; 
		$(powerDe).removeClass('hidden'); 
		$(powerDe).addClass('visible'); 
		},
		function(){
			var powerDe = state8.getElementsByClassName('powerDesc')[0]; 
			$(powerDe).removeClass('visible'); 
			$(powerDe).addClass('hidden'); 
			});
	$(state9).hover(function(){
		var powerDe = state9.getElementsByClassName('powerDesc')[0]; 
		$(powerDe).removeClass('hidden'); 
		$(powerDe).addClass('visible'); 
		},
		function(){
			var powerDe = state9.getElementsByClassName('powerDesc')[0]; 
			$(powerDe).removeClass('visible'); 
			$(powerDe).addClass('hidden'); 
			});
	$(state10).hover(function(){
		var powerDe = state10.getElementsByClassName('powerDesc')[0]; 
		$(powerDe).removeClass('hidden'); 
		$(powerDe).addClass('visible'); 
		},
		function(){
			var powerDe = state10.getElementsByClassName('powerDesc')[0]; 
			$(powerDe).removeClass('visible'); 
			$(powerDe).addClass('hidden'); 
			});
	$(state11).hover(function(){
		var powerDe = state11.getElementsByClassName('powerDesc')[0]; 
		$(powerDe).removeClass('hidden'); 
		$(powerDe).addClass('visible'); 
		},
		function(){
			var powerDe = state11.getElementsByClassName('powerDesc')[0]; 
			$(powerDe).removeClass('visible'); 
			$(powerDe).addClass('hidden'); 
			});
	$(state12).hover(function(){
		var powerDe = state12.getElementsByClassName('powerDesc')[0]; 
		$(powerDe).removeClass('hidden'); 
		$(powerDe).addClass('visible'); 
		},
		function(){
			var powerDe = state12.getElementsByClassName('powerDesc')[0]; 
			$(powerDe).removeClass('visible'); 
			$(powerDe).addClass('hidden'); 
			});
	$(state13).hover(function(){
		var powerDe = state13.getElementsByClassName('powerDesc')[0]; 
		$(powerDe).removeClass('hidden'); 
		$(powerDe).addClass('visible'); 
		},
		function(){
			var powerDe = state13.getElementsByClassName('powerDesc')[0]; 
			$(powerDe).removeClass('visible'); 
			$(powerDe).addClass('hidden'); 
			});
	$(state14).hover(function(){
		var powerDe = state14.getElementsByClassName('powerDesc')[0]; 
		$(powerDe).removeClass('hidden'); 
		$(powerDe).addClass('visible'); 
		},
		function(){
			var powerDe = state14.getElementsByClassName('powerDesc')[0]; 
			$(powerDe).removeClass('visible'); 
			$(powerDe).addClass('hidden'); 
			});
	$(state15).hover(function(){
		var powerDe = state15.getElementsByClassName('powerDesc')[0]; 
		$(powerDe).removeClass('hidden'); 
		$(powerDe).addClass('visible'); 
		},
		function(){
			var powerDe = state15.getElementsByClassName('powerDesc')[0]; 
			$(powerDe).removeClass('visible'); 
			$(powerDe).addClass('hidden'); 
			});
	$(state16).hover(function(){
		var powerDe = state16.getElementsByClassName('powerDesc')[0]; 
		$(powerDe).removeClass('hidden'); 
		$(powerDe).addClass('visible'); 
		},
		function(){
			var powerDe = state16.getElementsByClassName('powerDesc')[0]; 
			$(powerDe).removeClass('visible'); 
			$(powerDe).addClass('hidden'); 
			});
			
	var powersOfStates=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var frame = document.getElementById('stateFrame'); 
	var storyFrame = document.getElementById('storyFrame'); 
	
	var buttons = document.getElementById('onceButtons'); 
	$(buttons).addClass('visible'); 
	$(buttons).removeClass('hidden'); 	
	initialStates = []; 
	var parameterError = false; 
	if (manual == true){	
		for (var k=0; k<num; k++){
			var n = k+1; 	
			var pw = '#powerState'+n;
			var terr = '#territoryState' + n; 
			var intel = '#intellectState' + n;
			if (isNaN($(pw).val()) || isNaN(($(terr).val())) || isNaN($(intel).val()) || ($(pw).val()) < 1 || ($(terr).val()) <1 || ($(intel).val()) < 1){
				parameterError = true; 
				break;	
			}
			initialStates.push([Math.floor($(pw).val()), Math.floor($(terr).val()), Math.floor($(intel).val())]);   
		}		
		powersOfStates[0] = ($("#powerState1").val());
		powersOfStates[1] = ($("#powerState2").val());
		powersOfStates[2] = ($("#powerState3").val());
		powersOfStates[3] = ($("#powerState4").val());
		powersOfStates[4] = ($("#powerState5").val());
		powersOfStates[5] = ($("#powerState6").val());
		powersOfStates[6] = ($("#powerState7").val());
		powersOfStates[7] = ($("#powerState8").val());
		powersOfStates[8] = ($("#powerState9").val());
		powersOfStates[9] = ($("#powerState10").val());
	
		
		var statePowerForms = document.getElementsByClassName('statePowers');
		var statePowerLabels = document.getElementsByClassName('powerLabel'); 
		var stateTerritoryForms = document.getElementsByClassName('stateTerritory');
		var stateTerritoryLabels = document.getElementsByClassName('territoryLabel'); 
		var stateIntellectForms = document.getElementsByClassName('stateIntellect');
		var stateIntellectLabels = document.getElementsByClassName('intellectLabel'); 
		
		($('#powerButton')).removeClass('visible'); 
		($('#powerButton')).addClass('hidden'); 
		($('#powerHeading')).removeClass('visible'); 
		($('#powerHeading')).addClass('hidden');
		($('#statePowers')).removeClass('visible'); 
		($('#statePowers')).addClass('hidden'); 
	 
		for (i=0; i<num; i++){		
			var power = statePowerForms[i]; 
			var powerLabel=statePowerLabels[i]; 
			var territory = stateTerritoryForms[i]; 
			var territoryLabel = stateTerritoryLabels[i]; 
			var intellect = stateIntellectForms[i]; 
			var intellectLabel = stateIntellectLabels[i]; 
			$(power).removeClass('visible');
			$(power).addClass('hidden');  
			$(powerLabel).removeClass('visible');
			$(powerLabel).addClass('hidden');
			$(territory).removeClass('visible');
			$(territory).addClass('hidden');
			$(territoryLabel).removeClass('visible');
			$(territoryLabel).addClass('hidden');  
			$(intellect).removeClass('visible');
			$(intellect).addClass('hidden');
			$(intellectLabel).addClass('hidden');
			$(intellectLabel).removeClass('visible');
		}	
	
	}
	else{
		var totalInitial = 0;
		for (var k=0; k<num; k++){
			var n = k+1; 	
			var pwr = Math.floor(Math.random() * 15 +1);
			totalInitial += pwr;
			var terri = Math.floor(Math.random() * 5 +1);; 
			var intell = Math.floor(Math.random() * 5 +1);;
			initialStates.push([pwr, terri, intell, k]);   
			powersOfStates[k] = pwr;
		}	


		initialStates.sort(initialPowerSort); 
		var mostInitial = initialStates[0][0];
		var secondInitial = initialStates[0][1];
		if (automaticMulti == true){
      		
			while (true){
				initialStates.sort(initialPowerSort); 
				mostInitial = initialStates[0][0];
				secondInitial = initialStates[0][1];
				if (mostInitial >= totalInitial * 0.55 && mostInitial - secondInitial >= 0.3*totalInitial){
					totalInitial -= 0.5 * mostInitial; 
					mostInitial *= 0.5; 
					initialStates[0][0] *= 0.5;


				}		
				else if((mostInitial + secondInitial) > 0.78 * totalInitial && mostInitial - secondInitial <= totalInitial/5){

					totalInitial -= 0.5 * mostInitial; 
					mostInitial *= 0.5; 
					initialStates[0][0] *= 0.5; 
					totalInitial -= 0.2 * secondInitial; 
					secondInitial *= 0.5; 
					initialStates[1][0] *= 0.5; 
				}
				else{
					break;
				}
			}
		}	
	
		
		if (automaticBi == true){  
			for (var k=2; k<initialStates.length; k++){
				if (initialStates[k][0] > 8){
					totalInitial -= Math.floor(0.8*initialStates[k][0]);
					initialStates[k][0] -= Math.floor(0.8 * initialStates[k][0]);
					powersOfStates[initialStates[k][3]] = initialStates[k][0];
				}
				else{

					totalInitial -= (initialStates[k][0])-1;
					initialStates[k][0] == 1;
					powersOfStates[initialStates[k][3]] = initialStates[k][0];
				}
			}
			var currentInitial = mostInitial + secondInitial;
			var powerNeeded = Math.round((5/2) * (0.85*totalInitial + 2 -currentInitial) + 0.2*totalInitial);                                
			if(powerNeeded > 0){			                                    
				initialStates[0][0] += powerNeeded;
			        initialStates[1][0] += powerNeeded; 
				mostInitial += powerNeeded; 
				secondInitial += powerNeeded;	
			        totalInitial += 2*powerNeeded;			          
				powersOfStates[initialStates[0][3]] = initialStates[0][0];
				powersOfStates[initialStates[1][3]] = initialStates[1][0];
			}                                
			var greatestDifference = Math.floor(totalInitial/15 + 1);					        
			if (mostInitial - secondInitial > greatestDifference){		
				diff = mostInitial- secondInitial- greatestDifference;							
				initialStates[0][0] += (Math.floor((-diff/2)+1));	
				powersOfStates[initialStates[0][3]] = initialStates[0][0];
				initialStates[1][0] += (Math.floor((diff/2)+1));
				powersOfStates[initialStates[1][3]] = initialStates[1][0];
			}
		}
		
		if (automaticUni == true){
			for (var k=1; k<initialStates.length; k++){
				if (initialStates[k][0] > 5){
					totalInitial -= Math.floor(0.5*initialStates[k][0]);
					initialStates[k][0] -= Math.floor(0.5 * initialStates[k][0]);
					powersOfStates[initialStates[k][3]] = initialStates[k][0];
				}
				else{

					totalInitial -= (initialStates[k][0])-1;
					initialStates[k][0] == 1;
					powersOfStates[initialStates[k][3]] = initialStates[k][0];
				}
			}
                        var powerNeeded = Math.round((5/2) * (0.5 * totalInitial * 2 - mostInitial));
			if (powerNeeded > 0){
				initialStates[0][0] += powerNeeded; 
	    			powersOfStates[initialStates[0][3]] = initialStates[0][0];			

			}
		}
		initialStates.sort(initialOrderSort); 
	}
	if (parameterError == true){
	      	var error = document.getElementById('secondFormError'); 
	      	$("#secondErrorButton").click(function(){
				($('#stateNumbers')).removeClass('hidden'); 
				($('#stateNumbers')).addClass('visible'); 
				$(error).removeClass('visible'); 
				$(error).addClass('hidden');
				generateParameterForm(); 
		});
	    
	  
	  	$(error).removeClass('hidden'); 
	  	$(error).addClass('visible');     
	      
      	}
      	else{
	    
		function addPower(state, power){
	       		var powerDiv = state.getElementsByClassName('powerDesc')[0]; 
	       		powerDiv.innerHTML = 'Power:  '+ power;
	   		if (power < 60){
       				$(state).addClass('power' +power);
   		    }
   		    	else{
	   		    $(state).addClass('power60');
   		    }   
        	}	  
	    	$(storyFrame).removeClass('hidden'); 
		$(storyFrame).addClass('visible'); 	
      		$(frame).removeClass('hidden'); 
		$(frame).addClass('visible'); 	
      		var states = document.getElementsByClassName('state'); 
    			for (i=0; i<num; i++){
       				state=states[((i%4)*4 + Math.floor(i/4))];        
	   			$(state).removeClass('hidden');
	   			$(state).addClass('visible');  
	  			addPower(state, powersOfStates[i]);     
       		}
		function hideStories(){
	   		var stories = document.getElementsByClassName('story');   
	       		for (var i=0; i < stories.length; i++){
		   		story = stories[i];  
		   		$(story).removeClass('visible');
	   			$(story).addClass('hidden'); 
	       		}
        	}
          
        
        	function initialiseStateBeforeTurn(turnNumber, stateNumber){
	        	var state = states[((stateNumber%4)*4 + Math.floor(stateNumber/4))];
			if (events[turnNumber].statesAfterUpdate[stateNumber].length == 2){
				var power = events[turnNumber].statesAfterScaling[stateNumber][0]; 
				$(state).removeClass(); 
				if (events[turnNumber].polarity == 'multipolar'){
					if (turnNumber> 0){
						if(events[turnNumber-1].polarity == 'multipolar'){
							if (events[turnNumber-1].statesAfterUpdate[stateNumber].length == 2){
								alliance = 'alliance' + events[turnNumber-1].statesAfterUpdate[stateNumber][1];
							}
							else{
								alliance = 0; 	
							}
						}
						else{
							alliance = 'alliance0';	
						}
					}	
					else{
						alliance = 'alliance0';		
					}
				}
				else if (events[turnNumber].polarity == 'bipolar'){
					if (turnNumber> 0){
						if (events[turnNumber-1].polarity == 'bipolar'){
							var sphNum; 
							var stateNum = stateNumber+1; 
							for (var k=0; k<events[turnNumber].spheres[0].length; k++){
								if(events[turnNumber].spheres[0][k] == stateNum){
									sphNum = 1; 
									break; 
								}	
							}
							if(sphNum != 1){
								sphNum = 2; 	
							}
						alliance = 'sphere' + sphNum; 
						}
						else{
							alliance = 'alliance0'; 	
						}
					}
					else{
						alliance = 'alliance0'; 	
					}	 	
				}
				else{
					if (turnNumber>0){
						if (events[turnNumber-1].polarity == 'unipolar'){
							var stateNum = stateNumber+1; 
							if (stateNum == events[turnNumber].hegemon){
								alliance = 'alliance100'; 	
							}	
							else{
								alliance = 'alliance001'; 	
							}
						}
						else{
							alliance = 'alliance0'	
						}
					}
					else{
						alliance = 'alliance0'; 	
					}	
				}
       				$(state).addClass('visible');
				$(state).addClass('state'); 
     				$(state).addClass(alliance); 
       				addPower(state, power);
			}
    		else{
	    		$(state).removeClass(); 
		    	$(state).addClass('state'); 
		    	$(state).addClass('alliance0'); 
		    	$(state).addClass('hidden'); 
	    		$(state).addClass('hidden');  	
    		}
	}
    
        function unipolarAlliances(){
	        var m = 0; 
	        var n = 0; 
	        var toDisintegrate = false; 
	       	
	        function initialiseUnipolar(){
		        if (m != events[j].hegemon-1 && events[j].statesAfterUpdate[m].length != 1){
		        	state = states[(((m)%4)*4 + Math.floor((m)/4))]; 
				$(state).removeClass('alliance0');
				$(state).addClass('alliance001');
			}
			if (m < events[j].statesAfterUpdate.length-1){
				m++; 
				if (events[j].statesAfterUpdate[m].length == 1){
					initialiseUnipolar(); 
				}
				else{
					if (m != events[j].hegemon-1){
						setTimeout(initialiseUnipolar, 2000); 
				}
					else{
						initialiseUnipolar(); 
					}
				}
			}
			else{
				
				setTimeout(unipolarAlliances, 2000); 
			}
		}
        	
        	
	        function disintegrateUnipolar(){
		 
		        if (n != events[j].hegemon-1 && events[j].statesAfterUpdate[n].length != 1){
		        	state = states[(((n)%4)*4 + Math.floor((n)/4))]; 
				$(state).removeClass('alliance001');
				$(state).addClass('alliance0');
			}
			if (n < events[j].statesAfterUpdate.length-1){
				n++; 
				if (events[j].statesAfterUpdate[n].length == 1){
					disintegrateUnipolar(); 
				}
				else{
					if (n != events[j].hegemon-1){
						setTimeout(disintegrateUnipolar, 2000); 
					}
					else{
						disintegrateUnipolar(); 
					}
				}
			}
			else{
				setTimeout(toNewTurn, 2000); 
			}
		}
	
	        	
			removeContent('unipolarDecline'); 
			if (i==0){
				hideStories(); 
				if (events[j].flags.firstHegemon == true){
					if (unipolarVisit == false){
						var story = document.getElementById('unipolarInitialisation'); 
						$(story).removeClass('hidden'); 
						$(story).addClass('visible');
						removeContent('unipolarDetails0'); 
						unipolarVisit = true; 
						ajaxGetsQuiz('unipolar_transform_questions', 'unipolarQuiz', 'unipolarCont', unipolarAlliances, 'unipolarCheck'); 
					}
					else{
						var unipolar = document.getElementById('unipolarDetails0'); 
						$(unipolar).removeClass('hidden'); 
						$(unipolar).addClass('visible'); 
						k=events[j].hegemon;
						var state = states[(((k-1)%4)*4 + Math.floor((k-1)/4))]; 
						$(state).removeClass('alliance0');
						$(state).addClass('alliance100');  
						addContent('unipolarDetails0', 'The new hegemon is state ' + String.fromCharCode(64+parseInt(k)));
						i++; 
						setTimeout(initialiseUnipolar, 2000); 		
					}	
				}	
				else{
					var story = document.getElementById('unipolarAlliances'); 
					if (events[j].changedStates.length != 1){ 
						if (unipolarPowerVisit == false){
							unipolarPowerVisit = true;
							var story = document.getElementById('decliningUnipolar'); 
							hideStories(); 
							$(story).removeClass('hidden'); 
							$(story).addClass('visible');
							ajaxGetsQuiz('unipolar_power_questions', 'unipolarPowerQuiz', 'unipolarPowerCont', unipolarAlliances, 'unipolarPowerCheck'); 
						}
						else{
							i++; 
							removeContent('unipolarDetails');
							addContent('unipolarDetails', 'The hegemon\'s powers are declining!');
							setTimeout(unipolarAlliances, 4000);
						}
					}
					else{
						var story = document.getElementById('peacefulUnipolar'); 
						hideStories();
						removeContent('unipolarDetails');
						$(story).removeClass('hidden'); 
						$(story).addClass('visible');
						setTimeout(toNewTurn, 2000); 
					}
				}
   			}
			else{
				if (events[j].changedStates.length != 1){ 
					var st = document.getElementById('unipolarDecline');
					removeContent('unipolarDecline'); 
					$(st).addClass('visible'); 
					$(st).removeClass('hidden'); 
					st = document.getElementById('unipolarDetails');
					$(st).addClass('hidden'); 
					$(st).removeClass('visibe'); 
					addContent('unipolarDecline', 'The new power of the hegemon is ' + events[j].changedStates[1][0]); 
					if (events[j].endPolarity != 'unipolar'){
						addContent('unipolarDecline', 'The world is no longer unipolar'); 	
					}
					var k = events[j].hegemon; 
					var state = states[(((k-1)%4)*4 + Math.floor((k-1)/4))]; 
					$(state).removeClass(); 
					if (events[j].endPolarity != 'unipolar'){
						$(state).addClass('alliance0');
					}
					else{
						$(state).addClass('alliance100');
					}
					$(state).addClass('state'); 
					$(state).addClass('visible');
					addPower(state, events[j].changedStates[1][0]);
					i=0
					if (events[j].endPolarity != 'unipolar'){
						setTimeout(disintegrateUnipolar, 4000);  
					} 
					else{
						var s = document.getElementById('unipolarDetails');
						$(s).addClass('visible');
						$(s).removeClass('hidden'); 
						addContent('unipolarDetails', 'The world remains unipolar');
						
						setTimeout(toNewTurn, 2000);	
					}
				}
				else{
					var s = document.getElementById('unipolarDetails');
					$(s).addClass('visible');
					$(s).removeClass('hidden'); 
					addContent('unipolarDetails0', 'The unipolar world is peaceful'); 
					setTimeout(toNewTurn, 2000);	
				} 
			}
		}	
       
		
	function clearBipolar(){
	    	function clearFirst(){
		    	var stateNumber = events[j].spheres[0][k];  
			var state = states[((stateNumber-1)%4)*4 + Math.floor((stateNumber-1)/4)]; 
			$(state).removeClass('shpere1');
			$(state).addClass('alliance0');
			k++; 
			if (k< events[j].spheres[0].length){
				setTimeout(clearFirst, 2000); 	
			}
			else{
				k=0
				setTimeout(clearSecond, 2000); 	
			}
	        }
	        function clearSecond(){
		    	var stateNumber = events[j].spheres[1][k]; 
			var state = states[((stateNumber-1)%4)*4 + Math.floor((stateNumber-1)/4)]; 
			$(state).removeClass('shpere2');
			$(state).addClass('alliance0');
			k++; 
			if (k< events[j].spheres[1].length){
				setTimeout(clearSecond, 2000); 	
			}
			else{
				k=0
				setTimeout(toNewTurn, 2000); 	
			}
	        }
	        var k = 0; 
		setTimeout(clearFirst, 3000);    
	}
		
			 		
	function bipolarSystemChange(){		
		if (i==0){
			if (disintegrationVisit == false){
				hideStories(); 
				story = document.getElementById('bipolarSystemicChange'); 
				$(story).removeClass('hidden'); 
				$(story).addClass('visible');
				removeContent('bipolarSystemDetails');
				disintegrationVisit = true; 
				ajaxGetsQuiz('disintegration_questions', 'disintegrationQuiz', 'disintegrationCont', bipolarSystemChange, 'disintegrationCheck'); 
			}
			else{
				i++; 
				setTimeout(bipolarSystemChange, 2000); 
			}
		}
		else if (i!=0){
			stateNumber = events[j].changedStates[i][1]; 	
			power = events[j].changedStates[i][0];
			state = states[((stateNumber-1)%4)*4 + Math.floor((stateNumber-1)/4)]; 
			if (events[j].statesAfterUpdate[stateNumber-1] != 0){
				if (power != 0){
					$(state).removeClass(); 
					$(state).addClass('visible'); 
					$(state).addClass('state');
					var sphere1 = false; 
					for (var k=0; k< events[j].spheres[0].length; k++){
						if (stateNumber == events[j].spheres[0][k]){
							sphere1 = true; 
						}
					}
					if (sphere1 == true){
						$(state).addClass('sphere1');
					}
					else{
						$(state).addClass('sphere2');
					}
					addPower(state, power);
					addContent('bipolarSystemDetails', 'State ' + String.fromCharCode(65+parseInt(stateNumber)-1) + ' lost power, power is now  ' + power);		
					
				}
				else{
					$(state).removeClass('visible');
					$(state).addClass('hidden');  	
					addContent('bipolarSystemDetails', 'State ' +  String.fromCharCode(65+parseInt(stateNumber)-1)+ ' has disappeared from the world.');
				}
			}
			else{
				$(state).removeClass();
				$(state).addClass('state'); 
				$(state).addClass('alliance0'); 
				$(state).addClass('visible');
				addPower(state, power);
				addContent('bipolarSystemDetails', 'A new state ' +  String.fromCharCode(65+parseInt(stateNumber)-1)+' with power ' + power +' was created from disintegration of the bipolar power ');
			}
				
			if (i < events[j].changedStates.length -1){
				i++;
				setTimeout(bipolarSystemChange, 3000);
			}
			else{
				i=0; 
				setTimeout(clearBipolar, 3000);	
			}	
		}
	}
	function bipolarOutcomes(){      
	    	if (i==0){
			hideStories(); 
			var story = document.getElementById('afterWar');
			$(story).removeClass('hidden');
			$(story).addClass('visible');
			removeContent('afterWarDetails');
			removeContent('bipolarDetails1'); 
			removeContent('bipolarDetails2');
			var winners; 
			var losers;
			if (events[j].flags.didAttackerWin == true){
				addContent('afterWarDetails', 'The attacking state won the war'); 
				i++; 
				winners = document.getElementsByClassName('attacker');
				losers = document.getElementsByClassName('defender');
		        }
			else{
			    addContent('afterWarDetails', 'The attacking state lost the war'); 
			    i++; 
					winners = document.getElementsByClassName('defender');
			    losers = document.getElementsByClassName('attacker');
		    	} 
		        for (var k=0; k<2; k++){
			        winner = winners[k]; 
			        loser = losers[k]; 
		          	var winnerChildren = winner.childNodes; 
				alert(winnerChildren.length);
			       	alert($(winnerChildren[0]).hasClass('attackImage')); 	
				for (var n=0; n<winnerChildren.length; n++){
					if ($(winnerChildren[n]).hasClass('attackImage') || $(winnerChildren[n]).hasClass('defenderImage')){
						$(winnerChildren[n]).removeClass('visible'); 
						$(winnerChildren[n]).addClass('hidden'); 
					}
					if ($(winnerChildren[n]).hasClass('winnerImage')){
						$(winnerChildren[n]).addClass('visible'); 
						$(winnerChildren[n]).removeClass('hidden'); 
					}
				}
				var loserChildren = loser.childNodes; 
				for (var n=0; n<loserChildren.length; n++){
					if ($(loserChildren[n]).hasClass('attackImage') || $(loserChildren[n]).hasClass('defenderImage')){
						$(loserChildren[n]).removeClass('visible'); 
						$(loserChildren[n]).addClass('hidden'); 
					}
					if ($(loserChildren[n]).hasClass('loserImage')){
						$(loserChildren[n]).addClass('visible'); 
						$(loserChildren[n]).removeClass('hidden'); 
					}
				}
				$(winner).removeClass('attacker');
		          	$(loser).removeClass('defender');
		           	$(winner).addClass('winner');
		          	$(loser).addClass('loser');
	           	} 
		       	setTimeout(bipolarOutcomes, 3000);       
            	}
	        else{   
		   	var power = events[j].changedStates[i][0];
		       	var stateNumber = events[j].changedStates[i][1];
		       	var string = 'The power of state ' + String.fromCharCode(65+parseInt(stateNumber)-1) + ' is now ' + power; 
		       	addContent('afterWarDetails', string);
		       	var state = states[((stateNumber-1)%4)*4 + Math.floor((stateNumber-1)/4)]; 
		       	$(state).removeClass(); 
		       	$(state).addClass('state');
		       	$(state).addClass('visible'); 
		       	addPower(state, power); 
		       	if (i < 3){
			    	$(state).addClass('sphere2'); 
		       	}
		       	else{
			       $(state).addClass('sphere1');   
		       	}
			var children = state.childNodes; 
			for (var m=0; m< children.length; m++){
				if ($(children[m]).hasClass('winnerImage') || $(children[m]).hasClass('loserImage')){
					$(children[m]).removeClass('visible');
					$(children[m]).addClass('hidden'); 	

				}
			}	
		    	if (i < events[j].changedStates.length-1){
			 		i++; 
			 		setTimeout(bipolarOutcomes, 3000);    
		    	}	   
		    	else{
				i=0;	
				setTimeout(toNewTurn, 3000);   
		    	}
	       }   
       	}
          
	function bipolarWars(){      
	   	hideStories(); 
	    	if (events[j].war== 0){  
		    	story = document.getElementById('bipolarPeace');
	    		$(story).removeClass('hidden'); 
	    		$(story).addClass('visible'); 	
		    	setTimeout(toNewTurn, 3000);
	    	}
	    	else{
		    	story = document.getElementById('bipolarWar');
	    		$(story).removeClass('hidden'); 
	    		$(story).addClass('visible'); 	    
				if(i==0){
					removeContent('bipolarWarDetails');
		    		addContent('bipolarWarDetails', 'There is a small war occuring in the world');   
		       	 	for (var a = 0; a<2; a++){
		        		k = events[j].war[0][a] -1
		        		l =  events[j].war[1][a] -1
		        		attacker = states[((k%4)*4 + Math.floor(k/4))];
		        		defender = states[((l%4)*4 + Math.floor(l/4))];
		        		$(attacker).addClass('attacker');
		        		$(defender).addClass('defender');
					var attackerChil = attacker.childNodes; 
					for (var m=0; m< attackerChil.length; m++){
						if ($(attackerChil[m]).hasClass('attackImage')){
							$(attackerChil[m]).removeClass('hidden'); 
							$(attackerChil[m]).addClass('visible'); 
						}
					
					}
					var defenderChil = defender.childNodes; 
					for (var m=0; m< defenderChil.length; m++){
						if ($(defenderChil[m]).hasClass('defenderImage')){
							$(defenderChil[m]).removeClass('hidden'); 
							$(defenderChil[m]).addClass('visible'); 
						}
					
					}
	        		}
	        		var string = 'State ' + String.fromCharCode(64+ parseInt(events[j].war[0][0])) + ' is attacking state ' + String.fromCharCode(64+parseInt(events[j].war[1][0]));
		        	addContent('bipolarWarDetails', string);   
		        	setTimeout(bipolarOutcomes, 3000); 
	      		}
       		}
	}
		
	function bipolarAlliances(){
		if (events[j].flags.sorted == false){
			if (bipolarVisit == false){
				bipolarVisit = true; 
				hideStories(); 
				var newStory = document.getElementById('bipolarAlliances');    
				removeContent('bipolarDetails1');
				removeContent('bipolarDetails2');
				$(newStory).removeClass('hidden');
				$(newStory).addClass('visible');
				ajaxGetsQuiz('first_bipolar', 'bipolarQuiz', 'bipolarCont', bipolarAlliances, 'bipolarCheck'); 
			}
			else{
				changed = true; 
				events[j].flags.sorted = true;
				setTimeout(bipolarAlliances, 3000);
			}
		}
		else if (changed == true){ 	
			if (i < events[j].spheres[0].length){
				if (i==0){
					var story = document.getElementById('bipolarDetails1');
					$(story).removeClass('hidden'); 
					$(story).addClass('visible'); 
					var n = events[j].spheres[0][i];
					state = states[(((n-1)%4)*4 + Math.floor((n-1)/4))]; 
					$(state).removeClass('alliance0');
					$(state).addClass('sphere1');
					var sphere1 = 'States in the sphere of influence of state ' +String.fromCharCode(65+parseInt(n)-1); 
					addContent('bipolarDetails1', sphere1);
					i++; 
					setTimeout(bipolarAlliances, 3000);
				}
				else{
					var n= events[j].spheres[0][i]
					state = states[(((n-1)%4)*4 + Math.floor((n-1)/4))]; 
					$(state).removeClass('alliance0');
					$(state).addClass('sphere1');
					sphere1text='state ' + String.fromCharCode(64+parseInt(n));
					addContent('bipolarDetails1', sphere1text);
					i++;
					setTimeout(bipolarAlliances, 3000);
				}  
			}
			else {
				k = i-events[j].spheres[0].length;
				if (k==0){
					var n = events[j].spheres[1][k];
					state = states[(((n-1)%4)*4 + Math.floor((n-1)/4))]; 
					$(state).removeClass('alliance0');
					$(state).addClass('sphere2');
					var story = document.getElementById('bipolarDetails2');
					$(story).removeClass('hidden'); 
					$(story).addClass('visible'); 
					var sphere2 = '<br>States in the sphere of influence of state ' + String.fromCharCode(64+parseInt(n)); 
					addContent('bipolarDetails2', sphere2);
					i++; 
					setTimeout(bipolarAlliances, 3000); 
				}
				else{
					var m= events[j].spheres[1][k];
					state = states[(((m-1)%4)*4 + Math.floor((m-1)/4))]; 
					$(state).removeClass('alliance0');
					$(state).addClass('sphere2');
					sphere2text='state ' + String.fromCharCode(64+parseInt(m));
					addContent('bipolarDetails2', sphere2text);
					if (i < events[j].spheres[0].length + events[j].spheres[1].length -1){
						i++; 
						setTimeout(bipolarAlliances, 3000); 	
					}
					else{
						i=0; 
						setTimeout(thinkWar, 3000); 
					
					}
				}
			}
		}
		
		else{	
			if (events[j].polarity == events[j].endPolarity || events[j].endPolarity == undefined){ /*maybe this in need of a change?*/
				thinkWar();  	
			}
			else{
				i=0; 
				bipolarSystemChange();
				}
		}		
	}	     	
		function goBack(turns){
			var errorStory = document.getElementById('controlError'); 
			$(errorStory).removeClass('visible'); 
			$(errorStory).addClass('hidden');	
			/*j incremented in the next function */
			if (controlClick== false){
				controlClick = true;
			       	j = j-turns; 
			       	if (j == -2){
				        j=0;
					controlClick = false;
				        var errorStory = document.getElementById('controlError'); 
					$(errorStory).removeClass('hidden'); 
					$(errorStory).addClass('visible');	
			       	}
			       	else{
			       		events[j+1].flags.skipScaling = true; 
			       		if (j>=0 && events.length > 1){
						if (events[j].polarity != 'bipolar' && events[j+1].polarity == 'bipolar'){
								events[j+1].flags.sorted = false;
						}
					}
					for (var k=0; k<16; k++){
						initialiseStateBeforeTurn(j+1, k);
					}
					transitionToNewTurn(); 
				}
			}
			else{
				;
			}
		};
			 
		$('#againOnce').click(function(){
				goBack(1)
		}); 
			
		$('#backwardsOnceButton').click(function(){
			goBack(2); 
				
		}); 
		$('#forwardsOnceButton').click(function(){
			var errorStory = document.getElementById('controlError'); 
			$(errorStory).removeClass('visible'); 
			$(errorStory).addClass('hidden');	
			if (controlClick == false){
				controlClick = true; 
				if (j < events.length-1){
					transitionToNewTurn()	
				}
				else{
			    		var newOutput = getWorldEvents(2, [], true, world, events[j], previously); 
					events.push(newOutput[0]); 
					world = newOutput[1]; 
					transitionToNewTurn();
				}
			}
		  });
		     
		$('#exitOnce').click(function(){
			if (controlClick == false){
				controlClick = true;
				var story = document.getElementById('theEnd'); 
		        	$(story).removeClass('hidden'); 
		        	$(story).addClass('visible');
		        	var children = document.getElementById('onceButtons').childNodes;
			     	for (var k= 0; k< children.length - 2; k++){
				     	$(children[k]).removeClass('active'); 
				     	$(children[k]).addClass('passive'); 
			     	}
		        
			}
			else{
				
			}
			
	     	}); 
		function transitionToNewTurn(){
			var children = document.getElementById('onceButtons').childNodes;
		     	for (var k= 0; k< children.length - 2; k++){
				$(children[k]).removeClass('active'); 
			     	$(children[k]).addClass('passive'); 
		     	}			
			if (events[j+1].polarity == 'multipolar'){
				var story = document.getElementById('newTurnMulti');
				$(story).removeClass('hidden');
				$(story).addClass('visible');
				removeContent('turnDetailsMulti');
				addContent('turnDetailsMulti', 'This is turn ' + (j+2)); 
			}     
			else if (events[j+1].polarity == 'bipolar'){
				var story = document.getElementById('newTurnBi');
				$(story).removeClass('hidden');
				removeContent('turnDetailsBi');
				addContent('turnDetailsBi', 'This is turn ' + (j+2)); 
			}  
			else if (events[j+1].polarity == 'unipolar'){
				var story = document.getElementById('newTurnUni');
				$(story).removeClass('hidden');
				$(story).addClass('visible');
				removeContent('turnDetailsUni');
				addContent('turnDetailsUni', 'This is turn ' + (j+2));
			}      
     			i=0;
     			j++;
		   	setTimeout(scaling, 3000);	   		
		   	}	
			
	function toNewTurn(){
		controlClick = false; 
		limitVisit = false; 
		escalationVisit = false;
		noPowerVisit = false; 
		unipolarPowerVisit = false; 
		disintegrationVisit = false; 
		thinkWarVisit = false;
		visitedAlliance = false;
	       	scalingVisit = false;	
		bipolarVisit = false; 
		unipolarVisit = false;
	        powerVisit = false; 	
		hideStories();
		var children = document.getElementById('onceButtons').childNodes;
		for (var k= 0; k< children.length - 2; k++){
			$(children[k]).removeClass('passive'); 
			$(children[k]).addClass('active');     		
		}
	}
 	
 		function limitedFix(){
			if (limitVisit == false){
				hideStories(); 
				var story = document.getElementById('limitedChange'); 
				$(story).removeClass('hidden'); 
				$(story).addClass('visible');
			        limitVisit = true;
				ajaxGetsQuiz('limit_questions', 'limitQuiz', 'limitCont', limitedFix, 'limitCheck'); 
			}
			else{
				for (var k=0; k<16; k++){
					var found = false; 
					for (var m=0; m<events[j].changedStates.length; m++){
						if (events[j].changedStates.length == 2){
							if (events[j].changedStates[0][1] == k+1){
								var found = true; 	
							}
						}
						if (found == false){
							if (events[j].statesAfterUpdate[k].length == 2){
								var state = states[(k%4)*4 + Math.floor(k/4)];
								$(state).removeClass();
								$(state).addClass('state');
								$(state).addClass('alliance0')
								$(state).addClass('visible');
								$(state).addClass('power' + events[j].statesAfterUpdate[k][0]);  
							}
						}	
					}
				}
				setTimeout(toNewTurn, 2000); 	
			}
		}	
		function outcomes(){     
			function addStories(state, stateNumber, power){
				var chil = state.childNodes;
				for (var m=0; m<chil.length; m++){
					if ($(chil[m]).hasClass( 'loserImage')){
						$(chil[m]).removeClass('visible'); 
						$(chil[m]).addClass('hidden');
					}
					if ($(chil[m]).hasClass( 'winnerImage')){
						$(chil[m]).removeClass('visible'); 
						$(chil[m]).addClass('hidden');
					}
				}	
			   	
				extra = '';
				disappear = false;
				if (events[j].statesAfterUpdate[stateNumber-1] == 0){
	       				extra = ' This is a new state was born from the war'; 
	       		    		$(state).addClass('alliance0');   	
       		    		}		
       		    		if (power != events[j].statesAfterUpdate[stateNumber-1][0]){
	       				if (power < events[j].statesAfterUpdate[stateNumber-1][0]){
		       				if (power <= 0){
			       				disappear = true; 
						}
						else{
							var diff = powersOfStates[stateNumber-1] - power;
							if (diff > 0){
								extra = ' Power of the state has decreased by ' + diff;
							}
							else{
								diff = -diff; 
								extra = ' Power of the state has increased by ' + diff;	
							}	
						}	
					}
					else{
						var diff = power - events[j].statesAfterUpdate[stateNumber-1][0]; 
						if (diff > 0){
							extra = ' Power of the state has increased by ' + diff; 
						}
						else{
							diff = -diff; 	
							extra = ' Power of the state has decreased by ' + diff;
						}
					}
					if (disappear == true){
						addContent('afterWarDetails', 'State ' + String.fromCharCode(64+parseInt(stateNumber)) +' was destroyed during the war and will disappear from the world.'); 
						$(state).removeClass(); 
						$(state).addClass('state'); 
						$(state).addClass('alliance0'); 
						$(state).addClass('hidden'); 
					}
					else{	
						addContent('afterWarDetails', 'State ' + String.fromCharCode(64+parseInt(stateNumber)) +' has power ' + power + '.' + extra); 
					}
	          		}
			}
			
			if (i==0){
				hideStories(); 
				var story = document.getElementById('afterWar');
				$(story).removeClass('hidden');
				$(story).addClass('visible');
				removeContent('afterWarDetails');
				var winners; 
				var losers;
				var oldDefenders = document.getElementsByClassName('defender');
				for (var m=0; m<oldDefenders.length; m++){
					var oldDefender = oldDefenders[m]; 
					var chil = oldDefender.childNodes; 
					for (var n=0; n<chil.length; n++){
						if ($(chil[n]).hasClass( 'defenderImage')){
							$(chil[n]).removeClass('visible'); 
							$(chil[n]).addClass('hidden'); 
						}
					}	
				}
				var oldAttackers = document.getElementsByClassName('attacker'); 
				for (var m=0; m<oldAttackers.length; m++){
					var oldAttacker = oldAttackers[m]; 
					var chil = oldAttacker.childNodes; 
					for (var n=0; n<chil.length; n++){
						if ($(chil[n]).hasClass( 'attackImage')){
							$(chil[n]).removeClass('visible'); 
							$(chil[n]).addClass('hidden'); 
						}
					}	
				}
				
				if (events[j].flags.didAttackerWin == true){
					addContent('afterWarDetails', 'The attacking alliance won the war'); 
					i++; 
					winners = document.getElementsByClassName('attacker');
					losers = document.getElementsByClassName('defender');
				}
			    	else{
					addContent('afterWarDetails', 'The attacking alliance lost the war'); 
				    	i++; 
					winners = document.getElementsByClassName('defender');
		            		losers = document.getElementsByClassName('attacker');
		        	}	
		        	for (var n = 0; n< winners.length; n++){
			        	state= winners[n];
			         	$(state).addClass('winner');   
					var chil = state.childNodes;
					for (var m=0; m<chil.length; m++){
						if ($(chil[m]).hasClass( 'winnerImage')){
							$(chil[m]).removeClass('hidden'); 
							$(chil[m]).addClass('visible');
						       	break;	
						}
					}	
			   	}
			   		
			   	for (var n=0; n<losers.length; n++){
					state=losers[n];
				   	$(state).addClass('loser'); 	
					var chil = state.childNodes;
					for (var m=0; m<chil.length; m++){
						if ($(chil[m]).hasClass( 'loserImage')){
							$(chil[m]).removeClass('hidden'); 
							$(chil[m]).addClass('visible');
						       	break;	
						}
					}	
			   	}
			    	i++; 
		        	setTimeout(outcomes, 1500); 		   	
            		}
            		else{
				power = events[j].changedStates[i-1][0];
				stateNumber = events[j].changedStates[i-1][1];
				var state =  states[(((stateNumber-1)%4)*4 + Math.floor((stateNumber-1)/4))];
				$(state).removeClass();    	
				$(state).addClass('visible');
				$(state).addClass('state'); 
				addPower(state, power); 
				addStories(state, stateNumber, power);      
				if (events[j].flags.worldWar == true || events[j].flags.limitedChange == true){
					if (events[j].flags.limitedChange == true){
					}
					$(state).addClass('alliance0');
				}
				else{
					if (events[j].statesAfterUpdate[(stateNumber-1)].length == 2){
						$(state).addClass('alliance' + events[j].statesAfterUpdate[(stateNumber-1)][1]);
					}
					else{
						$(state).addClass('alliance0');
					}  	
				}	
				if (i < (events[j].changedStates).length ){
					i++;
					setTimeout(outcomes, 1000); 
				}
				else{
					i=0; 	
					if (events[j].flags.limitedChange == true){
						setTimeout(limitedFix, 2000); 	
					}
					else{
						setTimeout(toNewTurn, 2000);
					}
				}
   			}
		}
		
		function fightingWar(){
			hideStories(); 
			var newStory = document.getElementById('fightingWar');    
			$(newStory).removeClass('hidden');
	   		$(newStory).addClass('visible');   
			setTimeout(outcomes, 2300);	
		}
		   			
		function escalateWars(){
			if (events[j].flags.worldWar == false){
				setTimeout(fightingWar, 100);   
			}
			else{
				if (escalationVisit == false){
					escalationVisit = true; 
					hideStories(); 
					var newStory = document.getElementById('systemicWar');    
			 		$(newStory).removeClass('hidden');
	   				$(newStory).addClass('visible');
					ajaxGetsQuiz('escalation_questions', 'escalationQuiz', 'escalationCont', escalateWars, 'escalationCheck');
				}
				else{
	   				var attackers = [];
	   				var defenders = [];
	   				for (var k=0; k<events[j].escalation[0].length; k++){
	   					var at = document.getElementsByClassName(events[j].escalation[0][k]);
	   					for (var l=0; l<at.length; l++){
		   					attackers.push(at[l]); 	
	   					}
   					}	
   					for (var k=0; k<events[j].escalation[1].length; k++){
	   					def = document.getElementsByClassName(events[j].escalation[1][k]); 
	   					for (var l=0; l<def.length; l++){
		   					defenders.push(def[l]); 
		   				
	   					}
   					}
	   			
	   				for (var k =0; k < events[j].escalation[0].length; k++){
		   				string = 'Alliance ' + events[j].escalation[0][k].charAt(8)+ ' joins the attacking coalition ' + '<br>';
		   				var warStory = document.getElementById('systWarDetails'+ events[j].escalation[0][k].charAt(8));
		   				$(warStory).removeClass('hidden');
	   					$(warStory).addClass('visible');
	   					removeContent('systWarDetails'+ events[j].escalation[0][k].charAt(8)); 
		   				addContent('systWarDetails'+ events[j].escalation[0][k].charAt(8), string);
		   			
	   				}
	   				for (var k=0; k<attackers.length; k++){ 
		   				var attack = attackers[k];
						var chil = attack.childNodes; 
						for (var m=0; m<chil.length; m++){
							if ($(chil[m]).hasClass( 'attackImage')){
								break;
							}
						}	
       		         			$(attack).addClass('attacker');
						$(chil[m]).removeClass('hidden'); 
						$(chil[m]).addClass('visible'); 
	   				}
	   			  
	   				for (var k =0; k<events[j].escalation[1].length; k++){
		   				string = 'Alliance ' + events[j].escalation[1][k].charAt(8)+ ' joins the defeding coalition ' + '<br>';
		   				var warStory = document.getElementById('systWarDetails' + events[j].escalation[1][k].charAt(8));
	   					removeContent('systWarDetails'+ events[j].escalation[1][k].charAt(8));
	   					$(warStory).removeClass('hidden');
	   					$(warStory).addClass('visible');
		   				addContent('systWarDetails'+ events[j].escalation[1][k].charAt(8), string);
	   				}
		   			
	   				for (var k=0; k<defenders.length; k++){	   
		   				var defend = defenders[k];
						var chil = defend.childNodes; 
						for (var m=0; m<chil.length; m++){
							if ($(chil[m]).hasClass( 'defenderImage')){
								break;
							}
						}	
       		         			$(defend).addClass('defender');
						$(chil[m]).removeClass('hidden'); 
						$(chil[m]).addClass('visible'); 
	   				}
	   			
	   				setTimeout(fightingWar, 4000);
          			}       
      			}
		}
      		function assessWars(){
			hideStories(); 
			var war = events[j].war;
			if (war == 0){
				var newStory = document.getElementById('peaceful');    
			    	$(newStory).removeClass('hidden');
	   			$(newStory).addClass('visible');
	   			removeContent('peaceDetails');
	   			if (events[j].flags.perfectBalancing == true){
		   			addContent('peaceDetails', 'Because the alliances were so evenly balanced, <br> there was no motivation for the states to go to war'); 
		   			var question = document.getElementById('peaceQuestion'); 
		   			$(question).addClass('visible'); 
		   			$(question).removeClass('hidden'); 
		       		}	
			    	setTimeout(toNewTurn, 5000);
		    	}
			else{
				for (var k=1; k<=6; k++){
					removeContent('warDetails' +k); 	
				}
				var newStory = document.getElementById('limitedWar');    
				$(newStory).removeClass('hidden');
				$(newStory).addClass('visible');
				var attackers = document.getElementsByClassName(war[0]);
				var defenders = document.getElementsByClassName(war[1]);
				var attackNumber = war[0].charAt(8); 
				var defendNumber = war[1].charAt(8);
				var attackStory = document.getElementById('warDetails' + attackNumber);
				var defendStory = document.getElementById('warDetails' + defendNumber);
				$(attackStory).removeClass('hidden'); 
				$(attackStory).addClass('visible');
				removeContent('warDetails' + attackNumber); 
				addContent('warDetails' + attackNumber, 'Alliance number ' + attackNumber + ' is starting a war');
				$(defendStory).removeClass('hidden'); 
				$(defendStory).addClass('visible');
				removeContent('warDetails' + defendNumber); 
				addContent('warDetails' + defendNumber, 'Alliance number ' + defendNumber + ' is defending itself'); 
				for (var k = 0; k < attackers.length; k++){
					attacker = attackers[k]; 
				        var chil = attacker.childNodes; 
					for (var m=0; m<chil.length; m++){
						if ($(chil[m]).hasClass( 'attackImage')){
							break;
						}
					}	
					$(attacker).addClass('attacker');
				        $(chil[m]).removeClass('hidden'); 
					$(chil[m]).addClass('visible'); 	
				}
					   
				for (var k = 0; k < defenders.length; k++){
					defender = defenders[k];  
				        var chil = defender.childNodes; 
					for (var m=0; m<chil.length; m++){
						if ($(chil[m]).hasClass( 'defenderImage')){
							break;
						}
					}	
					$(defender).addClass('defender');
				       	$(chil[m]).removeClass('hidden'); 
					$(chil[m]).addClass('visible'); 	
				}
				i=0; 
				setTimeout(escalateWars, 2000);		   
		    	}	
		   
		}
          
 		function thinkWar(){
	 		var visitedAlliance = false;
	 		if (changed == true){
		 		changed = false;
		 		events[j].flags.sorted = false; /*this is changed back to false in case this turn is playd again */
	 		}     
	    		hideStories(); 
	        	var newStory = document.getElementById('thinkingPause');    
			$(newStory).removeClass('hidden');
	   		$(newStory).addClass('visible');
			if (thinkWarVisit == false){
				if (events[j].polarity == 'multipolar'){
					ajaxGetsQuiz('thinking_war', 'thinkingQuiz', 'thinkingCont', thinkWar, 'thinkingCheck');
				}
				else if (events[j].polarity == 'bipolar'){
					ajaxGetsQuiz('thinking_bipolar', 'thinkingQuiz', 'thinkingCont', thinkWar, 'thinkingCheck');
				}
				thinkWarVisit = true; 
			}
			else{
	   			if (events[j].polarity == 'multipolar'){
          				setTimeout(assessWars, 2500);
      				}
          			else if (events[j].polarity == 'bipolar'){  
	          			i=0;
          				setTimeout(bipolarWars, 2500); 
      				}
      			}
		}
      	
		
		function updateAlliances(){
	    		function evaluateAlliances(){
				var stateNumber = events[j].alliances[m][n];
			   	var alliance = m+1;
			   	var info = events[j].statesAfterUpdate[stateNumber-1];  
		       		power=info[0];
			   	state = states[(((stateNumber-1)%4)*4 + Math.floor((stateNumber-1)/4))];  
			   	$(state).removeClass(); 
       				$(state).addClass('visible');
       				$(state).addClass('state'); 
       		   		$(state).addClass('alliance' + alliance); 
       		   		addPower(state, power);
       		   		/*removeContent('description');*/
       		   		var story = document.getElementById('desc' + alliance);
       		   		$(story).removeClass('hidden');
       		   		$(story).addClass('visible');
       		   		
       		   		if (n==0){
	       		   		addContent('desc' + alliance, 'Alliance ' + alliance);
       		   		}
				if (i==0){
				}	
				var num = parseInt(stateNumber)+65-1;
				addContent('desc' + alliance, 'State ' + String.fromCharCode(65+parseInt(stateNumber)-1) + ' joins alliance ' + alliance); 		 
       		   		
	       			if (n < events[j].alliances[m].length - 1){
		       			n++;
		       			setTimeout(evaluateAlliances, 3000);
	       			}
	       			else{
		       			if (m < events[j].alliances.length-1){
			       			m++; 
			       			n=0;
			       			setTimeout(evaluateAlliances, 3000);
		       			}
		       			else{
	       					i=0; 
	       					setTimeout(thinkWar, 3000);
	       					
       					}
   				}
			} 
			
		    	function compareAlliances(){
			    	if (j==0){
		   			return true;	
	   			}
	   			else{
		   			for (k=0; k<16; k++){
			   			if (events[j].statesAfterUpdate[k].length != events[j-1].statesAfterUpdate[k].length){
			   				return true; 
		   				}	
		   				if (events[j].statesAfterUpdate[k].length  == 2 && events[j-1].statesAfterUpdate[k].length ==2 && events[j].statesAfterUpdate[k][1] != events[j-1].statesAfterUpdate[k][1]){
			   				return true;
		   				}
	   				} 
   				}	
			  	return false;  
		    	}
		    
	        	if (i==0){     
			    	hideStories(); 
			    	if (visitedAlliance == false){
					var pause = document.getElementById('alliancePause'); 
					$(pause).removeClass('hidden'); 
					$(pause).addClass('visible'); 
					group_name = 'alliance_questions'
					ajaxGetsQuiz(group_name, 'allianceQuiz', 'allianceCont', updateAlliances, 'allianceCheck');
					visitedAlliance = true; 
			    	}
			    	else{
			    		var newStory = document.getElementById('assessAlliances');    
			    		$(newStory).removeClass('hidden');
	   				$(newStory).addClass('visible');
	       				for (k=1; k<=6; k++){
       		   				removeContent('desc' + k);
   		   			}
	   				var changed = compareAlliances(1); 
		   			if (changed == false){
			   			hideStories(); 
			   			var str = document.getElementById('allianceDetails'); 
		   			    	$(str).removeClass('hidden'); 
		   			    	$(str).addClass('visible'); 
		   			    	setTimeout(thinkWar, 4000); 
	   			    	}
	   		 		else{
		   				var m = 0; 
		   				var n = 0;
		   				setTimeout(evaluateAlliances, 4000); 
	   				}	    		
      	 			}
  	 		}
		}      
        
		function updatePower(){ 
			
			if (events[j].flags.powersUpdated == false){
				i=0; 
				if (noPowerVisit = false && j != 0){
					noPowerVisit = true; 
					hideStories(); 
					var newStory = document.getElementById('noUpdates');    
					$(newStory).removeClass('hidden');
					$(newStory).addClass('visible');	
					ajaxGetsQuiz('no_power_questions', 'noPowerQuiz', 'noPowerCont', updatePower, 'noPowerCheck'); 
   				}
				else{
					if (events[j].polarity == 'multipolar'){
						setTimeout(updateAlliances, 3000);
					}
					else if (events[j].polarity == 'bipolar'){
						previously = 'bipolar';
						setTimeout(bipolarAlliances, 3000);
					}
					else{
						previously = 'unipolar';
						setTimeout(unipolarAlliances, 3000);
					}
				}
			
			}
			else{
		   		if (powerVisit == false){
			    		hideStories();
					var newStory = document.getElementById('updatePowers');   
					$(newStory).removeClass('hidden');
					$(newStory).addClass('visible');    
					powerVisit= true; 
					removeContent('powerDetails');
					if (events[j].polarity == 'multipolar'){
						ajaxGetsQuiz('power_questions', 'powerQuiz', 'powerCont', updatePower, 'powerCheck');
					}
					else{
						ajaxGetsQuiz('uni_questions', 'powerQuiz', 'powerCont', updatePower, 'powerCheck');

					}
				}
				else{
					var newStory = document.getElementById('updatingPowers');   
					$(newStory).removeClass('hidden');
					$(newStory).addClass('visible');    
					if (events[j].statesAfterUpdate[i] == 0){
						if (i<15){
							i++; 
							updatePower();  
						}
						 
		         			else{
			     				i=0; 
			       				if (events[j].polarity == 'multipolar'){ 	
			       					setTimeout(updateAlliances, 3000);
		       					}
		         				else if (events[j].polarity == 'bipolar'){
								previously = 'bipolar';
			     					setTimeout(bipolarAlliances, 3000); 
		         				}
		         				else if (events[j].polarity == 'unipolar'){
								previosuly = 'unipolar';
			     					setTimeout(unipolarAlliances, 3000); 
		         				}
		         			}		    
		    			}	
					else{
						if ((events[j].flags.decliningHegemon == true && events[j].hegemon == i+1 && events[j].polarity == 'unipolar')==false){
							var info = events[j].statesAfterUpdate[i]; 
							var power=info[0];
							state = states[((i%4)*4 + Math.floor(i/4))]; 
							$(state).removeClass(); 
							$(state).addClass('visible');
							$(state).addClass('state'); 
							if (j == 0){
								$(state).addClass('alliance0'); 
							}
							if (events[j-1].polarity == 'unipolar' && events[j].polarity == 'unipolar'){
								var stateNum = i+1; 
								if (stateNum == events[j].hegemon){
								$(state).addClass('alliance100'); 	
								}	
								else{
									$(state).addClass('alliance001'); ; 	
								}	
							}
							else if (events[j-1].polarity != 'multipolar'){
									$(state).addClass('alliance0'); 
							}
							else{
								$(state).addClass('alliance' + events[j-1].statesAfterUpdate[i][1]); 
							}
							
							addPower(state, power);
							var extra = "";
							var diff; 
							var oldPower = events[j].statesAfterScaling[i][0];	
							var hegemon = 0;
							var hegeDecline = '';
							var decline = false;
							if (events[j].flags.decliningHegemon == true){
								hegemon = events[j].hegemon; 
							}
							if ((i+1) == hegemon){
								decline = true; 
							}
						
						
							if (power != oldPower){
								if (decline == true){
									diff = oldPower-power; 
									extra = ' Power decreased by '; 
									extra += diff; 
									extra += '. The state is an old hegemonic power whose powers continue to decline. '
								}
								else{
									diff = power-oldPower; 
									extra = ' Power increased by '; 
									extra += diff; 
								}
							}
							var num = i+1; 
							addContent('powerDetails', 'State ' + String.fromCharCode(64+parseInt(num)) + ' has power ' + power + '.' + extra + hegeDecline);
						}
						if(i < 15){
							i++; 
							setTimeout(updatePower, 3000);
						}		
						else{
							i=0;  
							if (events[j].polarity == 'multipolar'){    
								setTimeout(updateAlliances, 3000);
								}	
							else if (events[j].polarity == 'bipolar'){
								previously = 'bipolar';
								setTimeout(bipolarAlliances, 3000); 
							}
							else if (events[j].polarity == 'unipolar'){
								previously = 'unipolar';
								setTimeout(unipolarAlliances, 3000); 
							}	
						
						}
					}
				}
			}	
		}		
	
			   
	    
		function scaling(){
			visited = false;
			var alliance;
			if (events[j].flags.scaledDown == false || events[j].flags.skipScaling == true){
				updatePower()
			}    
			else if (scalingVisit == false){
				hideStories(); 
				story = document.getElementById('scalingPause'); 
				scalingVisit = true; 
				$(story).removeClass('hidden'); 
				$(story).addClass('visible');
				ajaxGetsQuiz('scaling_questions', 'scalingQuiz', 'scalingCont', scaling, 'scalingCheck');
			}
			else{
				if (i==0){
					var alliance; 
				}
				if (events[j].statesAfterUpdate[i].length == 2){
					if (events[j].polarity == 'multipolar'){
						if (j> 0){
							if(events[j-1].polarity == 'multipolar'){
								alliance = 'alliance' + events[j-1].statesAfterUpdate[i][1];
							}
							else{
								alliance = 'alliance0';	
							}
						}	
						else{
							alliance = 'alliance0';		
						}
					}
					else if (events[j].polarity == 'bipolar'){
						if (j > 0){
							if (events[j-1].polarity == 'bipolar'){
								var sphNum; 
								var stateNum = i+1; 
								for (var k=0; k<events[j].spheres[0].length; k++){
									if(events[j].spheres[0][k] == stateNum){
										sphNum = 1; 
										break; 
									}	
								}
								if(sphNum != 1){
									sphNum = 2; 	
								}
							alliance = 'sphere' + sphNum; 
							}
							else{
								alliance = 'alliance0'; 	
							}
						}
						else{
							alliance = 'alliance0'; 	
						}	 	
					}
					else{
						if (j>0){
							if (events[j-1].polarity == 'unipolar'){
								var stateNum = i+1; 
								if (stateNum == events[j].hegemon){
									alliance = 'alliance100'; 	
								}	
								else{
									alliance = 'alliance001'; 	
								}
							}
							else{
								alliance = 'alliance0'	
							}
						}
						else{
							alliance = 'alliance0'; 	
						}	
					}
					state = states[((i%4)*4 + Math.floor(i/4))];
					power = events[j].statesAfterScaling[i][0]; 
					$(state).removeClass(); 
					$(state).addClass('visible');
					$(state).addClass('state'); 
					$(state).addClass(alliance); 
					addPower(state, power);
					if (i<15){
						i++; 
						setTimeout(scaling, 2000); 	
					}
					else{
						i=0; 
						setTimeout(updatePower, 2000);    
					}	
				}
				else{
					if (i<15){
						i++; 
						scaling();	
					}	
					else{
						i=0; 
						updatePower(); 	
					}	
				}
			}
		}
		var output = getWorldEvents(1, initialStates, false, previously);
		var events =[]; 
		for (var k=0; k<output.length-1; k++){
			events.push(output[k]);    
		} 
		var world = output[output.length -1]; 
		j=0;
		i=0;
	       
		var alliances=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		var sphere1text = ''; 
		var sphere2text = '';
		var changed = false; 
		var visited = false; 
		/*for pause stories */
		var noPowerVisit = false; 	
		var visitedAlliance = false;
		var visitedWar = false;
		var clickedWar = false; 
		var thinkWarVisit = false; 
		var scalingVisit = false;
	        var bipolarVisit = false;
		var unipolarVisit = false; 	
		var disintegrationVisit = false; 
		var unipolarPowerVisit = false; 
		var powerVisit = false; 
		var escalationVisit = false;
	        var limitVisit = false; 
	        var controlClick = true; 		
		if (events[0].polarity == 'multipolar'){
			var story = document.getElementById('newTurnMulti');
			$(story).removeClass('hidden');
			$(story).addClass('visible');
			removeContent('turnDetailsMulti');
			addContent('turnDetailsMulti', 'This is turn ' + (j+1)); 
		}     
		else if (events[0].polarity == 'bipolar'){
			var story = document.getElementById('newTurnBi');
			$(story).removeClass('hidden');
			$(story).addClass('visible');
			removeContent('turnDetailsBi');
			addContent('turnDetailsBi', 'This is turn ' + (j+1)); 
		}  
		else if (events[0].polarity == 'unipolar'){
			var story = document.getElementById('newTurnUni');
			$(story).removeClass('hidden');
			$(story).addClass('visible');
			removeContent('turnDetailsUni');
			addContent('turnDetailsUni', 'This is turn ' + (j+1)); 
		}      

	       setTimeout(scaling, 1000);
	       
	}
}


}); 
	  
