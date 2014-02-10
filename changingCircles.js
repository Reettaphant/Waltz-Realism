/* Copyright Reetta Vaahtoranta. All rights reserved. */
/*passing the buck not always working, sometimes only one alliance
 * ===
 * need to think about the layout more
 * identation 
 * comments
 *somewhere in multipolar a winner/ defender image was not removed properly
 * problem with states disappearing from the world
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
	var bipolarCounter = 0; 	
	
	function generateParameterForm(){
		/*generate the intial form to ask about how the simulation should be run*/
		$('#stateNumbers').removeClass('visible').addClass('hidden'); 
		var stateDetails = $('#statePowers'); 
		$('#statePowers').removeClass('hidden').addClass('visible');  
		$('#statePowers').addClass('form' +  num); 
		var statePowerForms = $('.statePowers');
		var statePowerLabels = $('.powerLabel'); 
	    	var stateTerritoryForms = $('.stateTerritory');
		var stateTerritoryLabels = $('.territoryLabel'); 
		var stateIntellectForms = $('.stateIntellect');
		var stateIntellectLabels = $('.intellectLabel'); 
		var fieldsets = $('.fieldsets'); 
		var labels = $('.legends'); 
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
	        		$(power).removeClass('hidden').addClass('visible'); 
	        		$(powerLabel).removeClass('hidden').addClass('visible');
	        		$(territory).removeClass('hidden').addClass('visible'); 
				$(territoryLabel).removeClass('hidden').addClass('visible');
				$(intellect).removeClass('hidden').addClass('visible'); 
				$(intellectLabel).removeClass('hidden').addClass('visible');
				$(fieldset).removeClass('hidden').addClass('visible');
				$(label).removeClass('hidden').addClass('visible');
	    		}
			else{
		   		$(power).removeClass('visible').addClass('hidden');  
				$(powerLabel).removeClass('visible').addClass('hidden');
				$(territory).removeClass('visible').addClass('hidden');  
				$(territoryLabel).removeClass('visible').addClass('hidden');
				$(intellect).removeClass('visible').addClass('hidden');  
				$(intellectLabel).removeClass('visible').addClass('hidden');
				$(fieldset).removeClass('visible').addClass('hidden');
				$(label).removeClass('hidden').addClass('visible');
	   		}	
  		}
 		button=$('#powerButton'); 
		$(button).removeClass('hidden').addClass('visible'); 
	  	manual = true; 
		$(function(){
			$("#powerButton").click(startTheSimulation);
  		});
  	}
	$(function(){
		$("#advancedButton1").click(function(){
			var button1 = $('#advancedButton1').removeClass('visible').addClass('hidden'); 
			var button2 = $('#advancedButton2').removeClass('hidden').addClass('visible'); 
			var advanced = $('#advancedOptions').removeClass('hidden').addClass('visible'); 
		}); 
		$("#advancedButton2").click(function(){
			var button2 = $('#advancedButton2').removeClass('visible').addClass('hidden'); 
			var button1 = $('#advancedButton1').removeClass('hidden').addClass('visible'); 
			var advanced = $('#advancedOptions').removeClass('visible').addClass('hidden'); 
		}); 
	
		onlyOnce = true; 	
		$("#buttonForStates").click(function(){
			$("#turnErrorButton").click(function(){
				$('#stateNumbers').removeClass('hidden').addClass('visible'); 
				$('#firstFormTurnError').removeClass('visible').addClass('hidden');
			});
			
			$("#checkErrorButton").click(function(){
				$('#stateNumbers').removeClass('hidden').addClass('visible'); 
				$('#checkError').removeClass('visible').addClass('hidden');
			});
			
			num = ($("#numberOfStates").val());
			if (num == 1){
				num = Math.round(Math.random()*5)+5;
			}
			numOfTurns = 1; 	
			$('#stateNumbers').removeClass('visible').addClass('hidden');
			if (!$("input[name='initialiseStates'][value='multipolar']").prop('checked') && !$("input[name='initialiseStates'][value='biplar']").prop('checked') && !$("input[name='initialiseStates'][value='unipolar']").prop('checked') && !$("input[name='initialiseStates'][value='automatic']").prop('checked')){
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
				if($("input[name='initialiseStates'][value='unipolar']").prop('checked')){
					automaticUni = true; 
					startTheSimulation(); 	
				}	
				if($("input[name='initialiseStates'][value='biplar']").prop('checked')){
					automaticBi = true; 
					startTheSimulation(); 	
				}	
				if($("input[name='initialiseStates'][value='multipolar']").prop('checked')){
					automaticMulti = true; 
					startTheSimulation(); 	
				}	
			
				else if($("input[name='initialiseStates'][value='automatic']").prop('checked')){
					 generateParameterForm(); 
					
				}

			}
	  
		});
	});

	function startTheSimulation(){
		/*starts runnign the simulation with the given parameters*/

		function ajaxGetsQuiz(group_name, pause, contDiv, continueFunction, checkbox){
			var control = false;
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
				var completed = 'empty';
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
					var ends = [];	
					var groupName = url.split("/")[2]; 
					lastSeenFromGroup[groupName]= data['quiz_name'];
					var answers = data['answers'];
					if (answers== undefined){
						var toAppend = '<form class = "quiz small">';
					}
					
					else {
						var toAppend = '<form class = "quiz medium">';
					}
					toAppend += data['question'] +'<br>';
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
							toAppend += '<input type = "radio" name = "' + url + '" value = "' + answer[0][1];
							ends.push(answer[0][2]);
							if (answer[0][1] == true){
								var corr = m;
							}
							toAppend += '">' + answer[0][0] + '</input> <br>';
							answers.splice(num, answer);
							m++; 
						}
						toAppend += '<br> <div class = "fill"> </div> <input type = "button" class = "quizButton" value = "submit">';
						toAppend += '<div class = "hidden errorMsg"> </div> <div class = "hidden correctMsg">  </div> <div class = "hidden noMsg"> You did not choose an answer </div>';
					}
					else{
						toAppend += '<input type = "button" class = "continueButton" value = "continue">';
					}
					toAppend += '</form>';
					addContent(pause, toAppend);
					$(".quizButton").click(function(){
						var children = $($('.quiz')[0]).contents(); 
						var radios = [];
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
									$('#checkbox').prop('checked', false); 
									msgW = $('.errorMsg')[0]; 
									$(msgW).removeClass('visible').addClass('hidden');
									$(msgW).empty();	
									msgC = $('.correctMsg')[0]; 
									$(msgC).removeClass('hidden').addClass('visible');
									$(msgC).append(ends[k]); 	
									$($('.noMsg')[0]).removeClass('visible').addClass('hidden'); 
									$('#'+pause).find('.quiz').find('.quizButton').addClass('hidden');
									$('#'+contDiv).removeClass('hidden').addClass('visible');
								}
								else{
									msgW = $('.errorMsg')[0]; 
									$(msgW).removeClass('hidden').addClass('visible'); 
									msgW.innerHTML = ends[k];
									$($('.correctMsg')[0]).removeClass('visible').addClass('hidden'); 
									$($('.noMsg')[0]).removeClass('visible').addClass('hidden'); 
								}
								break; 
							}
							if (found == false){
								$($('.noMsg')[0]).removeClass('hidden').addClass('visible'); 
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
					$('.continueButton').click(function(){
						if (control == false){
							control = true;
							if ($('#'+checkbox).prop('checked')){
								if (group_name in completedQuizzes){
									var addToList = '0'+data['quiz_name'];
									completedQuizzes[group_name]+=addToList;
								}
								else{
									completedQuizzes[group_name] = data['quiz_name'];
								}
							}
							$('#'+ contDiv).contents()[1].innerHTML = '';
							$('#'+contDiv).removeClass('visible').addClass('hidden'); 
							removeQuizContent(pause);
							continueFunction(); 	
						}
								
					});  

			}); 
		}	
		function displayExplanation(prefix, ajax1, ajax2, ajax3, ajax4, ajax5){
		/*checks if the relevant explantion has to be shown, shows it if this is needed and then takes the student to the relavant quiz*/	
			
			var visitVar = false;
			if (explControl[prefix+'Know'] == true){
				if (visitVar == false){
					visitVar = true;
					ajaxGetsQuiz(ajax1, ajax2, ajax3, ajax4, ajax5);
				}
			}
			else{
				$('#'+prefix+'Expl').removeClass('hidden').addClass('visible');
				var string = '#'+'elaborate'+prefix.slice(0, 1) +prefix.slice(1, prefix.length);
				$('#'+'elaborate'+prefix.slice(0, 1).toUpperCase()+prefix.slice(1, prefix.length)).click(function(){
					$('#'+prefix+'Expl').removeClass('visible').addClass('hidden');
					if ($('#'+prefix+'Know').prop('checked')){
						explControl[prefix+'Know'] = true;
					}
					if (visitVar === false){
						visitVar = true;
						ajaxGetsQuiz(ajax1, ajax2, ajax3, ajax4, ajax5);
					}

				});
			}
		}

	$('.state').hover(function(){
		$(this).find('.powerDesc').removeClass('hidden').addClass('visible'); 
		},
		function(){
			$(this).find('.powerDesc').removeClass('visible').addClass('hidden'); 
		});

	var powersOfStates=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var frame = $('#stateFrame'); 
	var storyFrame = $('#storyFrame'); 
	
	$('#onceButtons').addClass('visible').removeClass('hidden'); 
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
	
		
		
		$('#powerButton').removeClass('visible').addClass('hidden'); 
		$('#powerHeading').removeClass('visible').addClass('hidden');
		$('#statePowers').removeClass('visible').addClass('hidden'); 
	 
		for (i=0; i<num; i++){		
			$('statePowerForms[i]').removeClass('visible').addClass('hidden');  
			$('statePowerLabels[i]').removeClass('visible').addClass('hidden');
			$('stateTerritoryForms[i]').removeClass('visible').addClass('hidden');
			$('stateTerritoryLabels[i]').removeClass('visible').addClass('hidden');
			$('stateIntellectForms[i]').removeClass('visible').addClass('hidden');
			$('stateIntellectLabels[i]').addClass('hidden').removeClass('visible');
		}	
	
	}
	else{
		function automaticMultipolar(){
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
		function automaticBipolar(){
			for (var k=2; k<initialStates.length; k++){
				if (initialStates[k][0] > 4){
					totalInitial -= Math.floor(0.6*initialStates[k][0]);
					initialStates[k][0] -= Math.floor(0.6 * initialStates[k][0]);
					powersOfStates[initialStates[k][3]] = initialStates[k][0];
				}
				else{
					totalInitial -= (initialStates[k][0]-1);
					initialStates[k][0] = 1;
					powersOfStates[initialStates[k][3]] = initialStates[k][0];
				}
			}
			var currentInitial = mostInitial + secondInitial;
			var powerNeeded = Math.round((2 * totalInitial) - (currentInitial/0.4));    
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
				initialStates[0][0] += (Math.floor(-(diff/2)+1));	
				totalInitial -= mostInitial+secondInitial;
				powersOfStates[initialStates[0][3]] = initialStates[0][0];
				initialStates[1][0] += (Math.floor((diff/2)+1));
				powersOfStates[initialStates[1][3]] = initialStates[1][0];
				mostInitial = initialStates[0][0]; 
				secondInitial = initialStates[1][0];
			        totalInitial += mostInitial + secondInitial; 	
			}
			
		}
		function automaticUnipolar(){
			for (var k=1; k<initialStates.length; k++){
				if (initialStates[k][0] > 8){
					totalInitial -= Math.floor(0.8*initialStates[k][0]);
					initialStates[k][0] -= Math.floor(0.8 * initialStates[k][0]);
					powersOfStates[initialStates[k][3]] = initialStates[k][0];
				}
				else{
					totalInitial -= (initialStates[k][0])-1;
					initialStates[k][0] = 1;
					powersOfStates[initialStates[k][3]] = initialStates[k][0];
				}
			}
                        var powerNeeded = Math.round(3 * (0.6 * totalInitial * 2 - mostInitial));
			if (powerNeeded > 0){
				initialStates[0][0] += powerNeeded; 
	    			powersOfStates[initialStates[0][3]] = initialStates[0][0];			

			}
		}
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
		var secondInitial = initialStates[1][0];
		if (automaticMulti == true){
      			automaticMultipolar();
		}	
		
		if (automaticBi == true){ 
		       automaticBipolar();	
		}
		
		if (automaticUni == true){
			automaticUnipolar();
		}
		initialStates.sort(initialOrderSort); 
	}
	if (parameterError == true){
	      	var error = $('#secondFormError'); 
	      	$("#secondErrorButton").click(function(){
				($('#stateNumbers')).removeClass('hidden').addClass('visible'); 
				$(error).removeClass('visible').addClass('hidden');
				generateParameterForm(); 
		});
	    
	  
	  	$(error).removeClass('hidden').addClass('visible');    
		$('#onceButtons').removeClass('visible').addClass('hidden'); 	
	      
      	}
      	else{
      		var states = $('.state'); 
    			for (i=0; i<num; i++){
       				state=states[((i%4)*4 + Math.floor(i/4))];        
	   			$(state).removeClass('hidden').addClass('visible');  
	  			addPower(state, powersOfStates[i], i);     
       			}
		
		function addPower(state, power, label){
		/*replaces the power of the given state with a new power and updates the states label*/
			
			if (terrIntel != undefined){
				var terr = terrIntel[label][0]; 
				var intel = terrIntel[label][1]; 
			}
			else{
				var terr = initialStates[label][1];
				var intel = initialStates[label][2]; 
			}
			var powerDiv = state.getElementsByClassName('powerDesc')[0]; 
			powerDiv.innerHTML = 'Power: '+ power + '<br>';
			powerDiv.innerHTML += 'Intellect: ' + intel+ '<br>';
			powerDiv.innerHTML += 'Territory: ' + terr + '<br>';
			
			removeWithRegex(state, /^power/);
			if (power < 60){
				$(state).addClass('power' +power);
		    }
			else{
			    $(state).addClass('power60');
		    }   
		}	  
        	function initialiseStateBeforeTurn(turnNumber, stateNumber){
			function multipolarIni(){
				if (turnNumber> 0){
					if(events[turnNumber-1].polarity == 'multipolar'){
						if (events[turnNumber-1].statesAfterUpdate[stateNumber].length == 2){
							var alliance = 'alliance' + events[turnNumber-1].statesAfterUpdate[stateNumber][1];
						}
						else{
							var alliance = 0; 	
						}
					}
					else{
						var alliance = 'alliance0';	
					}
				}	
				else{
					var alliance = 'alliance0';		
				}
				return alliance;
			}

			function bipolarIni(){
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
					var alliance = 'sphere' + sphNum; 
					}
					else{
						var alliance = 'alliance0'; 	
					}
				}
				else{
					var alliance = 'alliance0'; 	
				}	 	
				return alliance;

			}
			function unipolarIni(){ 
				if (turnNumber>0){
					if (events[turnNumber-1].polarity == 'unipolar'){
						var stateNum = stateNumber+1; 
						if (stateNum == events[turnNumber].hegemon){
							var alliance = 'alliance100'; 	
						}	
						else{
							var alliance = 'alliance001'; 	
						}
					}
					else{
						var alliance = 'alliance0';	
					}
				}
				else{
					var alliance = 'alliance0'; 	
				}	
				return alliance;
			}
				
	        	var state = states[((stateNumber%4)*4 + Math.floor(stateNumber/4))];
			if (events[turnNumber].statesAfterUpdate[stateNumber].length == 2){
				var power = events[turnNumber].statesAfterScaling[stateNumber][0]; 
				if (events[turnNumber].polarity == 'multipolar'){
					var alliance = multipolarIni(); 
				}
				else if (events[turnNumber].polarity == 'bipolar'){
					var alliance = bipolarIni();
				}
				else{
					var alliance = unipolarIni();
				}
				
				removeWithRegex(state, /^alliance|^sphere/);
				$(state).addClass(alliance); 
				addPower(state, power, stateNumber);
			}
			else{
				removeWithRegex(state, /^alliance|^sphere/); 
				$(state).addClass('hidden').removeClass('visible').addClass('alliance0'); 
			}
	}
    
        function unipolarAlliances(){
	        function initialiseUnipolar(){
		        if (m != events[j].hegemon-1 && events[j].statesAfterUpdate[m].length != 1){
		        	state = states[(((m)%4)*4 + Math.floor((m)/4))]; 
				$(state).removeClass('alliance0').addClass('alliance001');
			}
			if (m < events[j].statesAfterUpdate.length-1){
				m++; 
				if (events[j].statesAfterUpdate[m].length == 1){
					initialiseUnipolar(); 
				}
				else{
					if (m != events[j].hegemon-1){
						setTimeout(initialiseUnipolar, 1000); 
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
        	
       		function displayUniPeace(){ 
			$('#unipolarWar').removeClass('visible').addClass('hidden');
			removeContent('unipolarDetails');
			$('#peacefulUnipolar').removeClass('hidden').addClass('visible'); 
			setTimeout(toNewTurn, 2000); 
		}

		function interventionOver(){
			hideStories(); 
		       	$('#interventionOver').removeClass('hidden').addClass('visible');
			var hege = states[(((events[j].hegemon-1)%4)*4 + Math.floor((events[j].hegemon-1)/4))]; 
			var medd =  states[(((events[j].meddled-1)%4)*4 + Math.floor((events[j].meddled-1)/4))];
			$(hege).find('.attackImage').removeClass('visible').addClass('hidden');
			$(medd).find('.defenderImage').removeClass('visible').addClass('hidden');
			setTimeout(unipolarAlliances,4000); 	
		}
		function addWarPictures(){
			var hege = states[(((events[j].hegemon-1)%4)*4 + Math.floor((events[j].hegemon-1)/4))]; 
			var medd =  states[(((events[j].meddled-1)%4)*4 + Math.floor((events[j].meddled-1)/4))];
			$(hege).find('.attackImage').removeClass('hidden').addClass('visible');
			$(medd).find('.defenderImage').removeClass('hidden').addClass('visible');
			addContent('interventionDetails', 'The hegemon is intevening in the affairs of state ' + String.fromCharCode(64+parseInt(events[j].meddled))); 	
			setTimeout(interventionOver, 5000); 	
		}
		function animateUnipolarWar(){
			/*add attacker to hege, defender to meddled, make a new story and a quiz asking what is happenign.*/
		  		
			removeContent('interventionDetails');	
			$('#interventionStory').removeClass('hidden').addClass('visible');
			if (interventionVisit == false){
				interventionVisit = true; 
				displayExplanation('intervention', 'intervention_questions', 'interventionQuiz', 'interventionCont', addWarPictures, 'interventionCheck');
			}
		}

	        function disintegrateUnipolar(){
		        if (n != events[j].hegemon-1 && events[j].statesAfterUpdate[n].length != 1){
		        	state = states[(((n)%4)*4 + Math.floor((n)/4))]; 
				$(state).removeClass('alliance001').addClass('alliance0');
			}
			if (n < events[j].statesAfterUpdate.length-1){
				n++; 
				if (events[j].statesAfterUpdate[n].length == 1){
					disintegrateUnipolar(); 
				}
				else{
					if (n != events[j].hegemon-1){
						setTimeout(disintegrateUnipolar, 1000); 
					}
					else{
						disintegrateUnipolar(); 
					}
				}
			}
			else{	
				previously = 'unipolar'; 
				setTimeout(toNewTurn, 2000); 
			}
		}
	
		function firstHege(){
			if (unipolarVisit == false){
				$('#unipolarInitialisation').removeClass('hidden').addClass('visible'); 
				removeContent('unipolarDetails0');
				unipolarVisit = true;
				displayExplanation('unipolar', 'unipolar_transform_questions', 'unipolarQuiz', 'unipolarCont', unipolarAlliances, 'unipolarCheck'); 
			}
			else{
				$('#unipolarDetails0').removeClass('hidden').addClass('visible'); 
				k=events[j].hegemon;
				var state = states[(((k-1)%4)*4 + Math.floor((k-1)/4))]; 
				$(state).removeClass('alliance0').addClass('alliance100');  
				addContent('unipolarDetails0', 'The new hegemon is state ' + String.fromCharCode(64+parseInt(k)));
				i++; 
				setTimeout(initialiseUnipolar, 2000); 		
			}	
		}	
			
		function firstRound(){
			if (events[j].changedStates.length != 1){ 
				if (visitedWar == false){
					visitedWar = true;
					animateUnipolarWar();
				}
			
				else{
					hideStories(); 
					i++; 
					$('#decliningUnipolar').removeClass('hidden').addClass('visible'); 
					declineVisit = true;
					ajaxGetsQuiz('unipolar_power_questions', 'unipolarPowerQuiz', 'unipolarPowerCont', unipolarAlliances, 'unipolarPowerCheck'); 
					
				}
			
			
			}
			else{
				$('#unipolarDetails0').removeClass('visible').addClass('hidden');
				if (unipolarWarVisit == false && events[j].flags.firstHegemon == true){
					$('#unipolarWar').removeClass('hidden').addClass('visible');
					unipolarWarVisit = true;
					ajaxGetsQuiz('unipolar_war', 'unipolarWarQuiz', 'unipolarWarCont', displayUniPeace, 'unipolarWarCheck');
			
				}
				else if (events[j].flags.firstHegemon == false){
					displayUniPeace(); 
				}
			}

		}

		function hegeChanges(){
				hideStories(); 
				removeContent('unipolarDecline'); 
				$('#unipolarDecline').addClass('visible').addClass('hidden'); 
				$('#unipolarDetails').addClass('hidden').addClass('visible'); 
				addContent('unipolarDecline', 'The new power of the hegemon is ' + events[j].changedStates[1][0]); 
				if (events[j].endPolarity != 'unipolar'){
					addContent('unipolarDecline', 'The world is no longer unipolar'); 	
					unipolarEnd = true; 
				}
				var k = events[j].hegemon; 
				var state = states[(((k-1)%4)*4 + Math.floor((k-1)/4))]; 
				removeWithRegex(state, /^alliance|^sphere/);
				if (events[j].endPolarity != 'unipolar'){
					$(state).addClass('alliance0');
				}
				else{
					$(state).addClass('alliance100');
				}
				addPower(state, events[j].changedStates[1][0], k-1);
				i=0
				if (events[j].endPolarity != 'unipolar'){
					setTimeout(disintegrateUnipolar, 4000);  
				} 
				else{
					$('#unipolarDetails').addClass('visible').removeClass('hidden');
					addContent('unipolarDetails', 'The world remains unipolar');
					
					setTimeout(toNewTurn, 2000);	
				}
		}
	        var m = 0; 
	        var n = 0; 
	        var toDisintegrate = false; 
		removeContent('unipolarDecline'); 
		if (i==0){
			hideStories(); 
			if (events[j].flags.firstHegemon == true){
				firstHege();
			}
			else{
				firstRound();
			}
		}
		else{
			if (events[j].changedStates.length != 1){ 
				hegeChanges();
			}
			else{
				$('#unipolarDetails0').removeClass('visible').addClass('hidden');
				$('#unipolarWar').removeClass('hidden').addClass('visible');
				if (unipolarWarVisit == false){
					unipolarWarVisit = true;
					ajaxGetsQuiz('unipolar_war', 'unipolarWarQuiz', 'unipolarWarCont', displayUniPeace, 'unipolarWarCheck');
			
				}
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
				setTimeout(clearFirst, 1000); 	
			}
			else{
				k=0;
				setTimeout(clearSecond, 1000); 	
			}
	        }
	        function clearSecond(){
		    	var stateNumber = events[j].spheres[1][k]; 
			var state = states[((stateNumber-1)%4)*4 + Math.floor((stateNumber-1)/4)]; 
			$(state).removeClass('shpere2');
			$(state).addClass('alliance0');
			k++; 
			if (k< events[j].spheres[1].length){
				setTimeout(clearSecond, 1000); 	
			}
			else{
				k=0;
				previously = 'bipolar'; 
				setTimeout(toNewTurn, 2000); 	
			}
	        }
	        var k = 0; 
		hideStories(); 
		$('#noMoreBipolar').removeClass('hidden').addClass('visible'); 
		setTimeout(clearFirst, 2000);    
	}
		
			 		
	function bipolarSystemChange(){		
		if (i==0){
			if (disinVisit == false){
				hideStories(); 
				bipolarEnd = true;
				bipolarCounter = 0;
				$('#bipolarSystemicChange').removeClass('hidden').addClass('visible'); 
				removeContent('bipolarSystemDetails');
				i++;
				disinVisit = true;
				displayExplanation('disin', 'disintegration_questions', 'disintegrationQuiz', 'disintegrationCont', bipolarSystemChange, 'disintegrationCheck'); 
			}
		}
		else if (i!=0){
			stateNumber = events[j].changedStates[i][1]; 	
			power = events[j].changedStates[i][0];
			state = states[((stateNumber-1)%4)*4 + Math.floor((stateNumber-1)/4)]; 
			if (events[j].statesAfterUpdate[stateNumber-1] != 0){
				if (power != 0){
					/*
					removeWithRegex(state, /^alliance|^sphere/);
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
					*/
					addPower(state, power, stateNumber-1);
					addContent('bipolarSystemDetails', 'State ' + String.fromCharCode(65+parseInt(stateNumber)-1) + ' lost power, power is now  ' + power);		
					
				}
				else{
					$(state).removeClass('visible').addClass('hidden');  	
					addContent('bipolarSystemDetails', 'State ' +  String.fromCharCode(65+parseInt(stateNumber)-1)+ ' has disappeared from the world.');
				}
			}
			else{
				removeWithRegex(state, /^alliance|^sphere/);
				$(state).addClass('alliance0'); 
				addPower(state, power, stateNumber-1);
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
	        function displayWar(){
			hideStories(); 
			$('#afterWar').removeClass('hidden').addClass('visible');
			removeContent('afterWarDetails');
			removeContent('bipolarDetails1'); 
			removeContent('bipolarDetails2');
			var winner; 
			var loser;
		    	var changing;
			var string;
		        changing = $('.defender')[0]; 
			var bipolarStates = $('.attacker'); 
			if (events[j].flags.didAttackerWin == true){
				string = 'The blue alliance won the war and ' + String.fromCharCode(65+parseInt(events[j].war[1][0]-1))+ ' now belongs to the blue sphere of influence'; 
				addContent('afterWarDetails', string);  
				i++; 
				for (var k=0; k<2; k++){
					if ($(bipolarStates[k]).hasClass('sphere1')){
						winner = bipolarStates[k]; 
					}	
					else{
						loser = bipolarStates[k]; 
					}
				}
				$(changing).removeClass('alliance0').addClass('sphere1');
		        }
			else{ 
			    	string = 'The red alliance won the war and ' + String.fromCharCode(65+parseInt(events[j].war[1][0]-1))+ ' now belongs to the red sphere of influence'; 
			    	addContent('afterWarDetails', string); 
			    	i++; 
				for (var k=0; k<2; k++){
					if ($(bipolarStates[k]).hasClass('sphere2')){
						winner = bipolarStates[k]; 
					}	
					else{
						loser = bipolarStates[k]; 
					}
				}
			    	$(changing).removeClass('alliance0').addClass('sphere2');
		    	}
			$(winner).find('.attackImage').removeClass('visible').addClass('hidden');
			$(winner).find('.winnerImage').removeClass('hidden').addClass('visible');
			$(loser).find('.attackImage').removeClass('visible').addClass('hidden');
			$(loser).find('.loserImage').removeClass('hidden').addClass('visible');
			$(changing).removeClass('defender');
		        $(changing).find('.defenderImage').removeClass('visible').addClass('hidden');	
		       	setTimeout(bipolarOutcomes, 3000);       

		}	

		function displayResult(){
		      	var blue= false; 	
		   	var power = events[j].changedStates[i][0];
		       	var stateNumber = events[j].changedStates[i][1];
		       	var string = 'The power of state ' + String.fromCharCode(65+parseInt(stateNumber)-1) + ' is now ' + power; 
		       	addContent('afterWarDetails', string);
		       	var state = states[((stateNumber-1)%4)*4 + Math.floor((stateNumber-1)/4)]; 
		       	if ($(state).hasClass('sphere1')){
				blue = true;
			}
			removeWithRegex(state, /^alliance|^sphere/);
		       	addPower(state, power, stateNumber-1); 
		       	if (blue == false){
			    	$(state).addClass('sphere2'); 
		       	}
		       	else{
			       $(state).addClass('sphere1');   
		       	}
			$(state).find('.winnerImage').removeClass('visible').addClass('hidden');
			$(state).find('.loserImage').removeClass('visible').addClass('hidden');
		    	if (i < events[j].changedStates.length-1){
			 		i++; 
			 		setTimeout(bipolarOutcomes, 3000);    
		    	}	   
		    	else{
				i=0;	
				setTimeout(toNewTurn, 3000);   
		    	}
		}
	    	if (i==0){
			displayWar();
            	}
	        else{
		       displayResult();	
	       }   
       	}
          
	function bipolarWars(){ 
		bipolarCounter += 1;	
	   	hideStories(); 
	    	if (events[j].war== 0){  
		    	$('#bipolarPeace').removeClass('hidden').addClass('visible');
		    	setTimeout(toNewTurn, 3000);
	    	}
	    	else{
			if(i==0){
				$('#bipolarWar').removeClass('hidden').addClass('visible'); 
				removeContent('bipolarWarDetails');
				for (var a = 0; a<2; a++){
					var k = events[j].war[0][a] -1;
					var attacker = states[((k%4)*4 + Math.floor(k/4))];
					$(attacker).addClass('attacker');
					$(attacker).find('.attackImage').removeClass('hidden').addClass('visible');
					
				}
				var l =  events[j].war[1][0] -1;
				var defender = states[((l%4)*4 + Math.floor(l/4))];
				$(defender).addClass('defender');
				$(defender).find('.defenderImage').removeClass('hidden').addClass('visible');
				var string = 'The war is being fought in state ' + String.fromCharCode(64+parseInt(events[j].war[1][0]));
				addContent('bipolarWarDetails', string);   
				setTimeout(bipolarOutcomes, 3000); 
			}
		}
	}
	
		
	function bipolarAlliances(){
		function secondSphere(){
			k = i-events[j].spheres[0].length;
			if (k==0){
				var n = events[j].spheres[1][k];
				state = states[(((n-1)%4)*4 + Math.floor((n-1)/4))]; 
				$(state).removeClass('alliance0').addClass('sphere2');
				$('#bipolarDetails2').removeClass('hidden').addClass('visible');
				var sphere2 = '<br>States in the sphere of influence of state ' + String.fromCharCode(64+parseInt(n)); 
				addContent('bipolarDetails2', sphere2);
				i++; 
				setTimeout(bipolarAlliances, 3000); 
			}
			else{
				var m= events[j].spheres[1][k];
				state = states[(((m-1)%4)*4 + Math.floor((m-1)/4))]; 
				$(state).removeClass('alliance0').addClass('sphere2');
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
		function firstSphere(){
			if (i==0){
				$('#bipolarDetails1').removeClass('hidden').addClass('visible');
				var n = events[j].spheres[0][i];
				state = states[(((n-1)%4)*4 + Math.floor((n-1)/4))]; 
				$(state).removeClass('alliance0').addClass('sphere1');
				var sphere1 = 'States in the sphere of influence of state ' +String.fromCharCode(65+parseInt(n)-1); 
				addContent('bipolarDetails1', sphere1);
				i++; 
				setTimeout(bipolarAlliances, 3000);
			}
			else{
				var n= events[j].spheres[0][i];
				state = states[(((n-1)%4)*4 + Math.floor((n-1)/4))]; 
				$(state).removeClass('alliance0').addClass('sphere1');
				sphere1text='state ' + String.fromCharCode(64+parseInt(n));
				addContent('bipolarDetails1', sphere1text);
				i++;
				setTimeout(bipolarAlliances, 3000);
			}  
		}
		if (events[j].flags.sorted == false){
			if (bipolarVisit == false){
				hideStories(); 
				$('#bipolarAlliances').removeClass('hidden').addClass('visible');    
				removeContent('bipolarDetails1');
				removeContent('bipolarDetails2');
				bipolarVisit = true; 
				displayExplanation('bipolar', 'first_bipolar', 'bipolarQuiz', 'bipolarCont', bipolarAlliances, 'bipolarCheck'); 
			}
			else{
				changed = true; 
				events[j].flags.sorted = true;
				setTimeout(bipolarAlliances, 3000);
			}
		}
		else if (changed == true){ 	
			if (i < events[j].spheres[0].length){
				firstSphere();
			}
			else {
				secondSphere();
			}
		}
		
		else{	
			if (events[j].polarity == events[j].endPolarity || events[j].endPolarity == undefined){ 
				thinkWar();  	
			}
			else{
				i=0; 
				bipolarSystemChange();
			}
		}		
	}	     	
		function goBack(turns){
			if (controlClick== false){
				$('#controlError').removeClass('visible').addClass('visible'); 
				controlClick = true;
			       	j = j-turns; 
			       	if (j == -2){
				        j=0;
					controlClick = false;
				        $('#controlError').removeClass('hidden').addClass('visible'); 
			       	}
			       	else{
					hideStories(); 
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
		}
		
		$('#againOnce').click(function(){
				goBack(1)
		}); 
			
		$('#backwardsOnceButton').click(function(){
			goBack(2); 
				
		}); 
		$('#forwardsOnceButton').click(function(){
			if (controlClick == false){
				hideStories(); 
				$('#controlError').removeClass('visible').addClass('hidden');	
				controlClick = true; 
				if (j < events.length-1){
					transitionToNewTurn()	
				}
				else{
			    		var newOutput = getWorldEvents(2, [], true, world, events[j], previously, bipolarCounter); 
					events.push(newOutput[0]); 
					world = newOutput[1]; 
					terrIntel= newOutput[2];
					transitionToNewTurn();
				}
			}
		  });
		     
		$('#exitOnce').click(function(){
			if (controlClick == false){
				hideStories(); 
				controlClick = true;
		        	$('#theEnd').removeClass('hidden').addClass('visible'); 
		        	var children = $('#onceButtons').children();
			     	for (var k= 0; k< children.length - 1; k++){
				     	$(children[k]).removeClass('active').addClass('passive'); 
			     	}
		        
			}
				
			
	     	}); 
		function transitionToNewTurn(){
			/*mkae sure that this is working*/
			var children = $('#onceButtons').children();
		     	for (var k= 0; k< children.length - 1; k++){
				$(children[k]).removeClass('active').addClass('passive'); 
		     	}			
			if (events[j+1].polarity == 'multipolar'){
				$('#newTurnMulti').removeClass('hidden').addClass('visible');
				removeContent('turnDetailsMulti');
				addContent('turnDetailsMulti', 'This is turn ' + (j+2)); 
			}     
			else if (events[j+1].polarity == 'bipolar'){
				$('#newTurnBi').removeClass('hidden').addClass('visible');
				removeContent('turnDetailsBi');
				addContent('turnDetailsBi', 'This is turn ' + (j+2)); 
			}  
			else if (events[j+1].polarity == 'unipolar'){
				$('#newTurnUni').removeClass('hidden').addClass('visible');
				removeContent('turnDetailsUni');
				addContent('turnDetailsUni', 'This is turn ' + (j+2));
			}      
     			i=0;
     			j++;
		   	setTimeout(scaling, 3000);	   		
		}	
			
	function toNewTurn(){
		buckPassVisit = false; 
		disinVisit = false; 
		thinkingWarVisit = false; 
		visitedWar = false;
		interventionVisit = false; 
		declineVisit = false;
		unipolarWarVisit = false;
		perfectVisit = false; 
		controlClick = false; 
		limitVisit = false; 
		escalationVisit = false;
		noPowerVisit = false; 
		unipolarPowerVisit = false; 
		thinkWarVisit = false;
		visitedAlliance = false;
	       	scalingVisit = false;	
		bipolarVisit = false; 
		unipolarVisit = false;
	        powerVisit = false; 	
		hideStories();
		if (unipolarEnd == true){
			unipolarEnd = false; 
			$('#unipolarEnd').removeClass('hidden').addClass('visible'); 
		}
		else if (bipolarEnd == true){
			bipolarEnd = false; 
			$('#bipolarEnd').removeClass('hidden').addClass('visible'); 
		}
		else if (multipolarEnd == true){
			multipolarEnd = false; 
			$('#multipolarEnd').removeClass('hidden').addClass('visible'); 
		}
		else if (limitedEnd == true){
			limitedEnd = false; 
			$('#limitedEnd').removeClass('hidden').addClass('visible'); 
		}
	
		var children = $('#onceButtons').children();
		for (var k= 0; k< children.length - 1; k++){
			$(children[k]).removeClass('passive').addClass('active');     		
		}
	}
 	
 		function limitedFix(){
			if (limitVisit == false){
				limitedEnd = true; 
				hideStories(); 
				$('#limitedChange').removeClass('hidden').addClass('visible'); 
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
								removeWithRegex(state, /^alliance|^sphere/);
								$(state).addClass('alliance0');
								addPower(state, events[j].statesAfterUpdate[k][0]);  
							}
						}	
					}
				}
				setTimeout(toNewTurn, 2000); 	
			}
		}	
		function outcomes(){
			function addStories(state, stateNumber, power){
				var chil = $(state).find('.loserImage').removeClass('visible').addClass('hidden');
				var chil = $(state).find('.winnerImage').removeClass('visible').addClass('hidden');
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
						removeWithRegext(statei, /^alliance|^sphere/); 
						$(state).addClass('alliance0'); 
					}
					else{	
						addContent('afterWarDetails', 'State ' + String.fromCharCode(64+parseInt(stateNumber)) +' has power ' + power + '.' + extra); 
					}
	          		}
			}
			
			function winnersLosers(){

				hideStories(); 
				var story = $('#afterWar');
				$(story).removeClass('hidden').addClass('visible');
				removeContent('afterWarDetails');
				var winners; 
				var losers;
				var oldDefenders = $('.defender');
				for (var m=0; m<oldDefenders.length; m++){
					$(oldDefenders[m]).find('.defenderImage').removeClass('visible').addClass('hidden');
				}
				var oldAttackers = $('.attacker'); 
				for (var m=0; m<oldAttackers.length; m++){
					$(oldAttackers[m]).find('.attackImage').removeClass('visible').addClass('hidden');
				}
				i++;
				if (events[j].flags.didAttackerWin == true){
					addContent('afterWarDetails', 'The attacking alliance won the war'); 
					winners = $('.attacker');
					losers = $('.defender');
				}
			    	else{
					addContent('afterWarDetails', 'The attacking alliance lost the war'); 
					winners = $('.defender');
		            		losers = $('.attacker');
		        	}	
		        	for (var n = 0; n< winners.length; n++){
			        	state= winners[n];
			         	$(state).addClass('winner');   
					$(state).find('.winnerImage').removeClass('hidden').addClass('visible');
			   	}
			   		
			   	for (var n=0; n<losers.length; n++){
					state=losers[n];
				   	$(state).addClass('loser'); 	
					$(state).find('.loserImage').removeClass('hidden').addClass('visible');
			   	}
			    	i++; 
		        	setTimeout(outcomes, 1500); 		   	
			}

			function updateStates(){

				power = events[j].changedStates[i-1][0];
				stateNumber = events[j].changedStates[i-1][1];
				var state =  states[(((stateNumber-1)%4)*4 + Math.floor((stateNumber-1)/4))];
				removeWithRegex(state, /^alliance|^sphere/);    	
				addPower(state, power, stateNumber-1); 
				addStories(state, stateNumber, power); 
				if (events[j].flags.worldWar == true || events[j].flags.limitedChange == true){
					if (events[j].flags.limitedChange == true){
						$(state).addClass('alliance0');
					}
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
			
			if (i==0){
            			winnersLosers();
			}
            		else{
				updateStates();
   			}
		}
		
		function fightingWar(){
			hideStories(); 
			$('#fightingWar').removeClass('hidden').addClass('visible');    
			setTimeout(outcomes, 2300);	
		}
		   			
		function escalateWars(){
			if (events[j].flags.worldWar == false){
				setTimeout(fightingWar, 100);   
			}
			else{
				if (escalationVisit == false){
					hideStories();
					multipolarEnd = true;
					escalationVisit = true;
					$('#systemicWar').removeClass('hidden').addClass('visible');
					displayExplanation('escalation', 'escalation_questions', 'escalationQuiz', 'escalationCont', escalateWars, 'escalationCheck');
				}
				else{
					var attackers = [];
	   				var defenders = [];
	   				for (var k=0; k<events[j].escalation[0].length; k++){
	   					var at = $('.'+events[j].escalation[0][k]);
	   					for (var l=0; l<at.length; l++){
		   					attackers.push(at[l]); 	
	   					}
   					}	
   					for (var k=0; k<events[j].escalation[1].length; k++){
	   					def = $('.'+events[j].escalation[1][k]); 
	   					for (var l=0; l<def.length; l++){
		   					defenders.push(def[l]); 
		   				
	   					}
   					}
	   			
	   				for (var k =0; k < events[j].escalation[0].length; k++){
		   				string = getAllianceColour(events[j].escalation[0][k].charAt(8))+ ' Alliance joins the attacking coalition ' + '<br>';
		   				$('#systWarDetails'+ events[j].escalation[0][k].charAt(8)).removeClass('hidden').addClass('visible');
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
						$(chil[m]).removeClass('hidden').addClass('visible'); 
	   				}
	   			  
	   				for (var k =0; k<events[j].escalation[1].length; k++){
		   				string = getAllianceColour(events[j].escalation[1][k].charAt(8))+ ' Alliance joins the defeding coalition ' + '<br>';
		   				$('#systWarDetails' + events[j].escalation[1][k].charAt(8)).removeClass('hidden').addClass('visible');
	   					removeContent('systWarDetails'+ events[j].escalation[1][k].charAt(8));
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
						$(chil[m]).removeClass('hidden').addClass('visible'); 
	   				}
					previsouly = 'multipolar'; 
	   				setTimeout(fightingWar, 4000);
          			}       
      			}
		}
      		function assessWars(){
			hideStories(); 
			var war = events[j].war;
			if (war == 0){
	   			if (events[j].flags.perfectBalancing == true){
						$('#perfectPause').removeClass('hidden').addClass('visible');
						if (perfectVisit == false){
							perfectVisit = true;
							ajaxGetsQuiz('perfect_questions', 'perfectQuiz', 'perfectCont', toNewTurn, 'perfectCheck');
						}	
		       		}
				else{
					$('#peaceful').removeClass('hidden').addClass('visible');
					removeContent('peaceDetails');
			    		setTimeout(toNewTurn, 5000);
				}
		    	}
			else{
				for (var k=1; k<=6; k++){
					removeContent('warDetails' +k); 	
				}
				$('#limitedWar').removeClass('hidden').addClass('visible');
				var attackers = $('.'+war[0]);
				var defenders = $('.'+war[1]);
				var attackNumber = war[0].charAt(8); 
				var defendNumber = war[1].charAt(8);
				$('#warDetails' + attackNumber).removeClass('hidden').addClass('visible');
				$('#warDetails' + defendNumber).removeClass('hidden').addClass('visible');
				removeContent('warDetails' + attackNumber); 
				addContent('warDetails' + attackNumber, getAllianceColour(attackNumber) + ' Alliance is starting a war');
				removeContent('warDetails' + defendNumber); 
				addContent('warDetails' + defendNumber, getAllianceColour(defendNumber)  + ' Alliance is defending itself'); 
				for (var k = 0; k < attackers.length; k++){
					attacker = attackers[k]; 
				        var chil = attacker.childNodes; 
					for (var m=0; m<chil.length; m++){
						if ($(chil[m]).hasClass( 'attackImage')){
							break;
						}
					}	
					$(attacker).addClass('attacker');
				        $(chil[m]).removeClass('hidden').addClass('visible'); 	
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
				       	$(chil[m]).removeClass('hidden').addClass('visible'); 	
				}
				i=0; 
				setTimeout(escalateWars, 2000);		   
		    	}	
		   
		}
          
 		function thinkWar(){
	 		if (changed == true){
		 		changed = false;
		 		events[j].flags.sorted = false; /*this is changed back to false in case this turn is playd again */
	 		}     
	    		hideStories(); 
			$('#thinkingPause').removeClass('hidden').addClass('visible');
			if (thinkWarVisit == false){
				thinkWarVisit = true;
				if (events[j].polarity == 'multipolar'){
					displayExplanation('thinking', 'thinking_war', 'thinkingQuiz', 'thinkingCont', thinkWar, 'thinkingCheck');
				}
				else if (events[j].polarity == 'bipolar'){
					displayExplanation('bipolarThinking', 'thinking_bipolar', 'thinkingQuiz', 'thinkingCont', thinkWar, 'thinkingCheck');
				}
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
      	
	
		function buckPassing(){
			hideStories();
			$('#buckPass').removeClass('hidden').addClass('visible'); 
			if (buckPassVisit == false){
				buckPassVisit = true; 
				ajaxGetsQuiz('buckpass_questions', 'buckPassQuiz', 'buckPassCont', thinkWar, 'buckPassCheck'); 
			}

		}	
		function updateAlliances(){
	    		function evaluateAlliances(){
				var found = false;
				if (events[j].flags.buckPass != false){
					var k; 
					for (var k=0; k< events[j].flags.buckPass.length; k++){
						if (events[j].flags.buckPass[k] == m+1){
							found = true;
						}
					}
				}
				if (found == false){
					var stateNumber = events[j].alliances[m][n];
					var alliance = m+1;
					var info = events[j].statesAfterUpdate[stateNumber-1];  
					power=info[0];
					state = states[(((stateNumber-1)%4)*4 + Math.floor((stateNumber-1)/4))]; 
					removeWithRegex(state, /^alliance|^sphere/); 
					$(state).addClass('alliance' + alliance); 
					addPower(state, power, stateNumber-1);
					$('#desc'+alliance).removeClass('hidden').addClass('visible');
					if (n==0){
						addContent('desc' + alliance, getAllianceColour(alliance) + ' Alliance');
					}
					if (i==0){
					}	
					var num = parseInt(stateNumber)+65-1;
					addContent('desc' + alliance, 'State ' + String.fromCharCode(65+parseInt(stateNumber)-1) + ' joins ' + getAllianceColour(alliance) + ' Alliance'); 		 
			
				}
				
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
						if (events[j].flags.buckPass != false){
							setTimeout(buckPassing, 3000); 
						}
						else{
	       						setTimeout(thinkWar, 3000);
						}
	       					
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
					$('#alliancePause').removeClass('hidden').addClass('visible');
				        visitedAlliance = true;
					displayExplanation('alliance', 'alliance_questions', 'allianceQuiz', 'allianceCont', updateAlliances, 'allianceCheck');
				}
			    	else{	
			    		$('#assessAlliances').removeClass('hidden').addClass('visible');
	       				for (k=1; k<=6; k++){
       		   				removeContent('desc' + k);
   		   			}
	   				var changed = compareAlliances(1); 
		   			if (changed == false){
			   			hideStories(); 
		   			    	$('#allianceDetails').removeClass('hidden').addClass('visible'); 
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
		        function noUpdate(){
				i=0; 
				if (noPowerVisit = false && j != 0){
					noPowerVisit = true; 
					hideStories(); 
					$('#noUpdates').removeClass('hidden').addClass('visible');
					ajaxGetsQuiz('no_power_questions', 'noPowerQuiz', 'noPowerCont', updatePower, 'noPowerCheck'); 
   				}
				else{
					if (events[j].polarity == 'multipolar'){
						setTimeout(updateAlliances, 4000);
					}
					else if (events[j].polarity == 'bipolar'){
						setTimeout(bipolarAlliances, 4000);
					}
					else{
						setTimeout(unipolarAlliances, 4000);
					}
				}
			}
			function toExplanations(){
				hideStories();
				removeContent('powerDetails');
				powerVisit = true;
				if (polarity == 'multipolar'){
					$('#updatePowers').removeClass('hidden').addClass('visible');
					displayExplanation('power', 'power_questions', 'powerQuiz', 'powerCont', updatePower, 'powerCheck');

				}	
				else if (polarity == 'bipolar'){
					$('#updateBipolarPowers').removeClass('hidden').addClass('visible');
					displayExplanation('bipolarPower', 'bipolar_power', 'bipolarPowerQuiz', 'bipolarPowerCont', updatePower, 'bipolarPowerCheck');

				}	
				else{
					$('#updateUnipolarPowers').removeClass('hidden').addClass('visible');
					displayExplanation('unipolarPower', 'uni_questions', 'unipolarUpdateQuiz', 'unipolarUpdateCont', updatePower, 'unipolarUpdateCheck');

				}
						
			}

			function changeState(){
				if ((events[j].flags.decliningHegemon == true && events[j].hegemon == i+1 && events[j].polarity == 'unipolar')==false){
					var info = events[j].statesAfterUpdate[i]; 
					var power=info[0];
					state = states[((i%4)*4 + Math.floor(i/4))]; 
					addPower(state, power, i);
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
							extra = ' Power decreased by '+diff +'. The state is an old hegemonic power whose powers continue to decline. '
						}
						else{
							diff = power-oldPower; 
							extra = ' Power increased by '+diff; 
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
						setTimeout(updateAlliances, 4000);
					}	
					else if (events[j].polarity == 'bipolar'){
						setTimeout(bipolarAlliances, 4000); 
					}
					else if (events[j].polarity == 'unipolar'){
						setTimeout(unipolarAlliances, 4000); 
					}	
				
				}
			}	
			if (events[j].flags.powersUpdated == false){
				noUpdate(); 	
			}
			else{
				var polarity = events[j].polarity; 
		   		if (powerVisit == false){
					toExplanations();	
				}
				else{
					$('#updatingPowers').removeClass('hidden').addClass('visible');
					if (events[j].statesAfterUpdate[i] == 0){
		    				if (i <15){
							i++; 
							updatePower();
						}
					        else{

							i=0;  
							if (events[j].polarity == 'multipolar'){    
								setTimeout(updateAlliances, 4000); 
							}	
							else if (events[j].polarity == 'bipolar'){
								setTimeout(bipolarAlliances, 4000);  
							}
							else if (events[j].polarity == 'unipolar'){
								setTimeout(unipolarAlliances, 4000); 
							}	
						}	
					
					}	
					else{
						if (events[j].statesAfterScaling[i][0] != events[j].statesAfterUpdate[i][0]){
							changeState();
						}

						else{
							if(i < 15){
								i++; 
								updatePower();
							}		
							else{	
								i=0;  
								if (events[j].polarity == 'multipolar'){    
									updateAlliances(); 
								}	
								else if (events[j].polarity == 'bipolar'){
									bipolarAlliances();  
								}
								else if (events[j].polarity == 'unipolar'){
									unipolarAlliances(); 
								}	
							
							}

						}
					}

				}
			}	
		}		
	
			   
	    
		function scaling(){
			visited = false;
			if (events[j].flags.scaledDown == false || events[j].flags.skipScaling == true){
				updatePower()
			}    
			else if (scalingVisit == false){
				hideStories(); 
				scalingVisit = true; 
				$('#scalingPause').removeClass('hidden').addClass('visible'); 
				ajaxGetsQuiz('scaling_questions', 'scalingQuiz', 'scalingCont', scaling, 'scalingCheck');
			}
			else{
				if (events[j].statesAfterUpdate[i].length == 2){
					state = states[((i%4)*4 + Math.floor(i/4))];
					power = events[j].statesAfterScaling[i][0]; 
					addPower(state, power, i);
					if (i<15){
						i++; 
						setTimeout(scaling, 1500); 	
					}
					else{
						i=0; 
						setTimeout(updatePower, 1500);    
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
		/*initialise variables to start the simulation*/
		var output = getWorldEvents(1, initialStates, false, previously);
		var events =[]; 
		for (var k=0; k<output.length-2; k++){
			events.push(output[k]);    
		} 
		var world = output[output.length -2]; 
		var terrIntel = output[output.length -1]; 
		j=0;
		i=0;
	       
		var alliances=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		var sphere1text = ''; 
		var sphere2text = '';
		/*variables for keeping track of quizzes that need ot be fetched*/
		var buckPassVisit = false; 
		var disinVisit = false; 
		var noPowerVisit = false; 	
		var visitedAlliance = false;
		var visitedWar = false;
		var clickedWar = false; 
		var thinkingWarVisit = false; 
		var interventionVisit = false;
		var thinkWarVisit = false; 
		var scalingVisit = false;
	        var bipolarVisit = false;
		var declineVisit = false; 
		var unipolarVisit = false; 	
		var unipolarPowerVisit = false; 
		var powerVisit = false; 
		var perfectVisit = false;
		var escalationVisit = false;
	        var limitVisit = false;
	       	var unipolarWarVisit = false;	
		/*other variables to keep track of simulation*/
		var visitedWar = false;
		var changed = false; 
		var visited = false; 
	        var controlClick = true; 	
		var limitedEnd = false; 
		var multipolarEnd = false; 
		var bipolarEnd = false;
		var unipolarEnd = false;
		
		/*for keeping track of which explanations have been seen*/
		var explControl = {'allianceKnow': false, 'thinkingKnow': false, 'bipolarKnow': false, 'bipolarThinkingKnow': false, 'disinKnow': false, 'declineKnow': false, 'interventionKnow': false, 'unipolarKnow': false, 'uniDisKnow': false, 'powerKnow': false, 'unipolarPowerKnow': false, 'bipolarPowerKnow': false} 
		
	    	$(storyFrame).removeClass('hidden').addClass('visible'); 	
      		$(frame).removeClass('hidden').addClass('visible'); 	
		if (events[0].polarity == 'multipolar'){
			$('#newTurnMulti').removeClass('hidden').addClass('visible');
			removeContent('turnDetailsMulti');
			addContent('turnDetailsMulti', 'This is turn ' + (j+1)); 
		}     
		else if (events[0].polarity == 'bipolar'){
			$('#newTurnBi').removeClass('hidden').addClass('visible');
			removeContent('turnDetailsBi');
			addContent('turnDetailsBi', 'This is turn ' + (j+1)); 
		}  
		else if (events[0].polarity == 'unipolar'){
			$('#newTurnUni').removeClass('hidden').addClass('visible');
			removeContent('turnDetailsUni');
			addContent('turnDetailsUni', 'This is turn ' + (j+1)); 
		}      
	       setTimeout(scaling, 1000);
	       
	}
}


});  
