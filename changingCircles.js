


$(document).ready(function(){

	var num = 0;
	var numOfTurns = 0;
	var initialStates; 
	var manual; 
	var automatic = undefined;
	var showMany = undefined; 
	var onlyOnce = undefined; 
	var goBack = false; 
	var goForth = false; 
	
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
	
	$('#input1').change(function(){
		var more = document.getElementById('initialExtraOptions'); 
		$(more).removeClass('hidden'); 
		$(more).addClass('visible'); 
		showMany = true;
		onlyOnce = false; 
	});
	
	$('#input2').change(function(){
		var more = document.getElementById('initialExtraOptions'); 
		$(more).removeClass('visible'); 
		$(more).addClass('hidden'); 
		showMany = false;
		onlyOnce = true; 
	});
	
	$("#buttonForStates").click(function(){
		$("#firstErrorButton").click(function(){
			var error = document.getElementById('firstFormError'); 
			($('#stateNumbers')).removeClass('hidden'); 
			($('#stateNumbers')).addClass('visible'); 
			$(error).removeClass('visible'); 
			$(error).addClass('hidden');
		});
		
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
		
		if (showMany != undefined){
			numOfTurns = Math.round(($("#numberOfTurns").val()));
		}
		else{
			numOfTurns = 1; 	
		}
		($('#stateNumbers')).removeClass('visible'); 
			($('#stateNumbers')).addClass('hidden'); 
		
		if (numOfTurns > 50){
			var error = document.getElementById('firstFormTurnError'); 
			$(error).removeClass('hidden'); 
			$(error).addClass('visible'); 		
		}

		else if ((isNaN(num) || isNaN(numOfTurns) || numOfTurns < 1) && showMany == true){
			
			var error = document.getElementById('firstFormError'); 
			$(error).removeClass('hidden'); 
			$(error).addClass('visible'); 
		}	
		else if (document.numberOfStates.initialiseStates[0].checked == false && document.numberOfStates.initialiseStates[1].checked == false){
			var error = document.getElementById('checkError'); 
			$(error).removeClass('hidden'); 
			$(error).addClass('visible'); 
		}
		else{
			if(document.numberOfStates.initialiseStates[1].checked == true){
				automatic = true; 
				startTheSimulation(); 	
			}	
		
			if(document.numberOfStates.initialiseStates[0].checked == true){
				 generateParameterForm(); 
	 			
			}

		}
  
	});
});



function startTheSimulation(){

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
	
	if (onlyOnce == true){
		var buttons = document.getElementById('onceButtons'); 
		$(buttons).addClass('visible'); 
		$(buttons).removeClass('hidden'); 	
	}
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
		for (var k=0; k<num; k++){
			var n = k+1; 	
			var pwr = Math.floor(Math.random() * 15 +1);
			var terri = Math.floor(Math.random() * 5 +1);; 
			var intell = Math.floor(Math.random() * 5 +1);;
			initialStates.push([pwr, terri, intell]);   
			powersOfStates[k] = pwr;
		}	   
	      
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
          
       	
          
		function removeContent(div) {

   			document.getElementById(div).innerHTML = "<br>";
        }
        
        function addContent(div, content){  
	      document.getElementById(div).innerHTML += content;
	      document.getElementById(div).innerHTML += '<br>';
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
	        $("#declineQuestion").click(function(){
		        	var unClicked = document.getElementById('declineQuestion'); 
					var clicked = document.getElementById('clickedDecline'); 
					$(unClicked).removeClass('visible'); 
					$(unClicked).addClass('hidden');
					$(clicked).removeClass('hidden'); 
					$(clicked).addClass('visible');
					declineClick = true; 
				});
	       	
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
				   			setTimeout(initialiseUnipolar, 600); 
			   		}
			   			else{
				   			initialiseUnipolar(); 
			   			}
			   		}
		   		}
			   	else{
				   	
				   		setTimeout(unipolarAlliances, 600); 
		   		}
        	}
        	
        	function answeringDecline(){
	        	/*toDisinterate true goes to disintegrate unipolar, else goes toNewTurn*/
	        	var story = document.getElementById('declineAnswer'); 
	    		$(story).removeClass('hidden'); 
	    		$(story).addClass('visible'); 
	    		declineClick = false; 
	    		$("#backDecline").click(function(){
					$(story).removeClass('visible'); 
	    			$(story).addClass('hidden'); 
	    			var unClicked = document.getElementById('declineQuestion'); 
					var clicked = document.getElementById('clickedDecline'); 
					$(unClicked).removeClass('hidden'); 
					$(unClicked).addClass('visible');
					$(clicked).removeClass('visible'); 
					$(clicked).addClass('hidden'); 
		    			if (toDisintegrate == true){
			    			toDisintegrate = false; 
	   						disintegrateUnipolar(); 
		 				}
		 			
	 					else{
		 					toNewTurn(); 
	 				}
	    		});     
	     	   
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
				   			setTimeout(disintegrateUnipolar, 600); 
			   		}
			   			else{
				   			disintegrateUnipolar(); 
			   			}
			   		}
		   		}
			   	else{
				   	setTimeout(toNewTurn, 600); 
			   	}
	        
	        }
	         
				
			if (noPowerClick == true){
				noPowerQuestion(); 	
			}	
			else{
	        removeContent('unipolarDecline'); 
	    	if (i==0){
		    	hideStories(); 
		    	if (events[j].flags.firstHegemon == true){
			    	var story = document.getElementById('unipolarInitialisation'); 
		       		$(story).removeClass('hidden'); 
		       		$(story).addClass('visible');
		       		removeContent('unipolarDetails0'); 
		       		k=events[j].hegemon;
		       		var state = states[(((k-1)%4)*4 + Math.floor((k-1)/4))]; 
		       		$(state).removeClass('alliance0');
		       		$(state).addClass('alliance100');  
		       		addContent('unipolarDetails0', 'The new hegemon is state ' + k);
		       		i++; 
			       	setTimeout(initialiseUnipolar, 2000); 			
		   			}	
		    	else{
		       		var story = document.getElementById('unipolarAlliances'); 
		       		if (events[j].changedStates.length != 1){ 
		       			i++; 
		       			var story = document.getElementById('decliningUnipolar'); 
		       			hideStories(); 
		       			$(story).removeClass('hidden'); 
		       			$(story).addClass('visible');
		       			removeContent('unipolarDetails');
		       			addContent('unipolarDetails', 'The hegemon\'s powers are declining!');
		        		setTimeout(unipolarAlliances, 2000);
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
		       			if (declineClick == true){
			       			toDisintegrate = true; 
		       	   			answeringDecline(); 
	       	   			}
	       	   			else{
	       	   				setTimeout(disintegrateUnipolar, 2000);  
       	   				}	
       				} 
       				else{
	       				var s = document.getElementById('unipolarDetails');
	       				$(s).addClass('visible');
	       				$(s).removeClass('hidden'); 
	       				addContent('unipolarDetails', 'The world remains unipolar');
	       				
	       				if (declineClick == true){
		       	   			answeringDecline(); 
	       	   			}
	       	   			else{
	       	   				setTimeout(toNewTurn, 2000);	
       	   				}	
       				}
       	   		}
       	   		else{
	       	   		var s = document.getElementById('unipolarDetails');
	       			$(s).addClass('visible');
	       			$(s).removeClass('hidden'); 
	       	   		addContent('unipolarDetails0', 'The unipolar world is peaceful'); 
	       	   		if (declineClick == true){
		       	   		answeringDecline(); 
	       	   		}
	       	   		else{
	       	   			setTimeout(toNewTurn, 2000);	
       	   			}
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
					setTimeout(clearFirst, 700); 	
				}
				else{
					k=0
					setTimeout(clearSecond, 700); 	
				}
	        }
	        function clearSecond(){
		    	var stateNumber = events[j].spheres[1][k]; 
			   	var state = states[((stateNumber-1)%4)*4 + Math.floor((stateNumber-1)/4)]; 
				$(state).removeClass('shpere2');
				$(state).addClass('alliance0');
				k++; 
				if (k< events[j].spheres[1].length){
					setTimeout(clearSecond, 700); 	
				}
				else{
					k=0
					setTimeout(toNewTurn, 700); 	
				}
	        }
	        var k = 0; 
		    setTimeout(clearFirst, 700);    
		}
		
		function answeringDisintegration(){
			var story = document.getElementById('disintegrationAnswer'); 
	    	$(story).removeClass('hidden'); 
	    	$(story).addClass('visible'); 
	    	disintegrationClick = false; 
	    	$("#backDisintegration").click(function(){
		    	var unClicked = document.getElementById('distintegrationQuestion'); 
				var clicked = document.getElementById('clickedDistintegration'); 
				$(unClicked).removeClass('hidden'); 
				$(unClicked).addClass('visible');
				$(clicked).removeClass('visible'); 
				$(clicked).addClass('hidden'); 
				$(story).removeClass('visible'); 
	    		$(story).addClass('hidden'); 
		    	if (i < events[j].changedStates.length -1){
						i++;
						bipolarSystemChange(); 
					}
					else{
						i=0; 
						clearBipolar();	
					}		
	    	});
			 		
		}
		function bipolarSystemChange(){		
			$("#disintegrationQuestion").click(function(){
					var unClicked = document.getElementById('disintegrationQuestion'); 
					var clicked = document.getElementById('clickedDisintegration'); 
					$(unClicked).removeClass('visible'); 
					$(unClicked).addClass('hidden');
					$(clicked).removeClass('hidden'); 
					$(clicked).addClass('visible'); 
					disintegrationClick = true; 
				}); 
			if (i==0){
				hideStories(); 
				story = document.getElementById('bipolarSystemicChange'); 
				$(story).removeClass('hidden'); 
				$(story).addClass('visible');
				removeContent('bipolarSystemDetails');
				i++; 
				setTimeout(bipolarSystemChange, 2000); 
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
						addContent('bipolarSystemDetails', 'State ' + stateNumber + ' lost power, power is now  ' + power);		
						
					}
					else{
				    	$(state).removeClass('visible');
				    	$(state).addClass('hidden');  	
				    	addContent('bipolarSystemDetails', 'State ' + stateNumber + ' has disappeared from the world.');
				 	}
				}
				else{
					$(state).removeClass();
					$(state).addClass('state'); 
					$(state).addClass('alliance0'); 
					$(state).addClass('visible');
					addPower(state, power);
					addContent('bipolarSystemDetails', 'A new state ' + stateNumber +' with power ' + power +' was created from disintegration of the bipolar power ');
				}
				
				if (disintegrationClick == true){
					setTimeout(answeringDisintegration, 3000); 	
				}
				else{
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
		          	$(winner).removeClass('attacker');
		          	$(loser).removeClass('defender');
		           	$(winner).addClass('winner');
		          	$(loser).addClass('loser');
	           } 
		       setTimeout(bipolarOutcomes, 1500);       
            }
	        else{   
		   		var power = events[j].changedStates[i][0];
		       	var stateNumber = events[j].changedStates[i][1];
		       	var string = 'The power of state ' + stateNumber + ' is now ' + power; 
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
		    	if (i < events[j].changedStates.length-1){
			 		i++; 
			 		setTimeout(bipolarOutcomes, 1500);    
		    	}	   
		    	else{
			 		i=0;	
			 		setTimeout(toNewTurn, 1500);   
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
	        		}
	        		var string = 'State ' + events[j].war[0][0] + ' is attacking state ' + events[j].war[1][0];
		        	addContent('bipolarWarDetails', string);   
		        	setTimeout(bipolarOutcomes, 2000); 
	      		}
       		}
		}
		
		function bipolarAlliances(){
			if (noPowerClick == true){
				noPowerQuestion(); 
			}	
			else{
	      		if (events[j].flags.sorted == false){
		      		changed = true; 
			    	events[j].flags.sorted = true;
			    	hideStories(); 
			    	var newStory = document.getElementById('bipolarAlliances');    
			    	removeContent('bipolarDetails1');
			    	removeContent('bipolarDetails2');
			    	$(newStory).removeClass('hidden');
	   				$(newStory).addClass('visible');
	   				setTimeout(bipolarAlliances, 1000);
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
			       		var sphere1 = 'States in the sphere of influence of state ' + n; 
				    	addContent('bipolarDetails1', sphere1);
				    	i++; 
				    	setTimeout(bipolarAlliances, 1000);
			    	}
					else{
			    		var n= events[j].spheres[0][i]
			     		state = states[(((n-1)%4)*4 + Math.floor((n-1)/4))]; 
			     		$(state).removeClass('alliance0');
			    	 	$(state).addClass('sphere1');
			     		sphere1text='state ' + n;
			      		addContent('bipolarDetails1', sphere1text);
			      		i++;
			      		setTimeout(bipolarAlliances, 1000);
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
			       		var sphere2 = '<br>States in the sphere of influence of state ' + n; 
				    	addContent('bipolarDetails2', sphere2);
				    	i++; 
				    	setTimeout(bipolarAlliances, 1000); 
			    	}
			    	else{
			    		var m= events[j].spheres[1][k];
			     		state = states[(((m-1)%4)*4 + Math.floor((m-1)/4))]; 
			     		$(state).removeClass('alliance0');
			     		$(state).addClass('sphere2');
			     		sphere2text='state ' + m;
			     		addContent('bipolarDetails2', sphere2text);
		     			if (i < events[j].spheres[0].length + events[j].spheres[1].length -1){
			     			i++; 
			     			setTimeout(bipolarAlliances, 1000); 	
		     			}
		     			else{
			     			i=0; 
			     			setTimeout(thinkWar, 2000); 
		     			
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
		}
		function answeringPeace(){
			var story = document.getElementById('perfectBalanceAnswer'); 
	    	$(story).removeClass('hidden'); 
	    	$(story).addClass('visible'); 
	    	peaceClick = false; 
	    	$("#backToPeace").click(function(){
		    	var unClicked = document.getElementById('peaceQuestion'); 
				var clicked = document.getElementById('clickedPeace'); 
				$(unClicked).removeClass('hidden'); 
				$(unClicked).addClass('visible');
				$(clicked).removeClass('visible'); 
				$(clicked).addClass('hidden'); 
				$(story).removeClass('visible'); 
	    		$(story).addClass('hidden'); 
		    		toNewTurn()
	    	});     
		}
		function toNewTurn(){
			function goBack(turns){
				if (visitedOnce == false){
					visitedOnce = true;
			       	j = j-turns; 
			       	if (j <= -2){
				       	j = j+ turns;
				       	visitedOnce = false; 
				    	toNewTurn();  	
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
				if (visitedForwardOnce == false){
					visitedForwardOnce = true; 
					if (j < events.length-1){
						transitionToNewTurn()	
					}
					else{
			    		var newOutput = getWorldEvents(2, [], true, world, events[j]); 
			    		numberOfTurns += 1; 
						events.push(newOutput[0]); 
						world = newOutput[1]; 
						transitionToNewTurn();
					}
				}
		     });
		     
		     $('#exitOnce').click(function(){
				if (visitedOnce == false){
					visitedOnce = true;
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
			function displayOptions(){
				var option = document.getElementById('options'); 
		        $(option).removeClass('hidden'); 
		        $(option).addClass('visible');
		        $("#backErrorButton").click(function(){
			        var story = document.getElementById('backError'); 
			        $(story).removeClass('visible'); 
			        $(story).addClass('hidden'); 
			        var query = document.getElementById('backwardsQuery'); 
			        $(query).removeClass('hidden'); 
			        $(query).addClass('visible'); 
		        });
		        $("#forwardErrorButton").click(function(){
			        var story = document.getElementById('forwardError'); 
			        $(story).removeClass('visible'); 
			        $(story).addClass('hidden'); 
			        var query = document.getElementById('forwardsQuery'); 
			        $(query).removeClass('hidden'); 
			        $(query).addClass('visible'); 
		        });
				$("#backwardsButton").click(function(){
					$("#backwardsQueryButton").click(function(){
					var backwardsQuery = document.getElementById('backwardsQuery'); 
		        	$(backwardsQuery).removeClass('visible'); 
		        	$(backwardsQuery).addClass('hidden');
		        	if (parseInt($("#backTurns").val()) > j+1){
			        	var story = document.getElementById('backError'); 
			        	$(story).removeClass('hidden'); 
			        	$(story).addClass('visible'); 	
		        	}
		        	else{
		        	 	j = j - parseInt($("#backTurns").val());
						events[j+1].flags.skipScaling = true; 
						if (j>=0 && events.length > 1){
							if (events[j].polarity != 'bipolar' && events[j+1].polarity == 'bipolar'){
								events[j+1].flags.sorted = false;
							}
						}
					}
						for (var k=0; k<16; k++){
							initialiseStateBeforeTurn(j+1, k);
						}
						transitionToNewTurn(); 
				});
					var option = document.getElementById('options'); 
		        	$(option).removeClass('visible'); 
		        	$(option).addClass('hidden');
		        	var backwardsQuery = document.getElementById('backwardsQuery'); 
		        	$(backwardsQuery).removeClass('hidden'); 
		        	$(backwardsQuery).addClass('visible');
		       	});
		       
		       
		       $("#forwardsButton").click(function(){
			       $("#forwardsQueryButton").click(function(){
				    if (parseInt($("#forwardTurns").val()) > 50){
					    var forwardsQuery = document.getElementById('forwardsQuery'); 
		        		$(forwardsQuery).removeClass('visible'); 
		        		$(forwardsQuery).addClass('hidden');
					    var story = document.getElementById('forwardError'); 
			        	$(story).removeClass('hidden'); 
			        	$(story).addClass('visible'); 
				    }
				    else{
				     	if (visited != true){
					      	visited = true; 
						    var forwardsQuery = document.getElementById('forwardsQuery'); 
		        			$(forwardsQuery).removeClass('visible'); 
		        			$(forwardsQuery).addClass('hidden');
		        			var newTurnCounter = parseInt($("#forwardTurns").val()) + 1; 
							numberOfTurns += forwardTurns; 
							var newOutput = getWorldEvents(newTurnCounter, [], true, world, events[j]); 
							for (var k=0; k<newOutput.length-1; k++){
								events.push(newOutput[k]); 
							}
							world = newOutput[newOutput.length -1]; 
							transitionToNewTurn();
						}
					} 
				});
			       var option = document.getElementById('options'); 
		        	$(option).removeClass('visible'); 
		        	$(option).addClass('hidden');
		        	var forwardsQuery = document.getElementById('forwardsQuery'); 
		        	$(forwardsQuery).removeClass('hidden'); 
		        	$(forwardsQuery).addClass('visible');
		       }); 
		       
		       $("#exitButton").click(function(){
			    	var option = document.getElementById('options'); 
		        	$(option).removeClass('visible'); 
		        	$(option).addClass('hidden');
		        	var story = document.getElementById('theEnd'); 
		        	$(story).removeClass('hidden'); 
		        	$(story).addClass('visible');
		        
			   		      
		       	});
		       
				
			}
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
			
			hideStories();
			var question = document.getElementById('peaceQuestion'); 
			$(question).removeClass('visible'); 
			$(question).addClass('hidden'); 
			if (peaceClick == true){
				answeringPeace(); 
			}
			if (j == events.length-1 || onlyOnce == true){	/*here chooses if continue simulation or if should stop showing the simulation*/
				if (showMany == true){
		        	displayOptions(); 
	        	}
		        else{
			     	var children = document.getElementById('onceButtons').childNodes;
			     	for (var k= 0; k< children.length - 2; k++){
				     	$(children[k]).removeClass('passive'); 
				     	$(children[k]).addClass('active'); 
				     		
			     	}   
		        }
	       	 
	  
	        }
			else{
	   			transitionToNewTurn();
	   		}
 	}
 	
 	function limitedFix(){
	 	hideStories(); 
	 	var story = document.getElementById('limitedChange'); 
	 	$(story).removeClass('hidden'); 
	 	$(story).addClass('visible'); 
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
		function outcomes(){     
			function addStories(state, stateNumber, power){
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
	   		      		addContent('afterWarDetails', 'State ' + stateNumber +' was destroyed during the war and will disappear from the world.'); 
	   		      		$(state).removeClass(); 
	   		      		$(state).addClass('state'); 
	   		      		$(state).addClass('alliance0'); 
	   		      		$(state).addClass('hidden'); 
   		      			}
   		      		else{	
		           		addContent('afterWarDetails', 'State ' + stateNumber +' has power ' + power + '.' + extra); 
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
			   	}
			   		
			   	for (var m=0; m<losers.length; m++){
					state=losers[m];
				   	$(state).addClass('loser'); 	
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
		        hideStories(); 
		        var newStory = document.getElementById('systemicWar');    
			    $(newStory).removeClass('hidden');
	   			$(newStory).addClass('visible');
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
       		         $(attack).addClass('attacker');
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
		   			$(defend).addClass('defender'); 
	   			}
	   			
	   			setTimeout(fightingWar, 4000);
          }       
      }
      	function assessWars(){
	      	$("#peaceQuestion").click(function(){
		      		var unClicked = document.getElementById('peaceQuestion'); 
					var clicked = document.getElementById('clickedPeace'); 
					$(unClicked).removeClass('visible'); 
					$(unClicked).addClass('hidden');
					$(clicked).removeClass('hidden'); 
					$(clicked).addClass('visible');
					peaceClick = true; 
				}); 
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
					$(attacker).addClass('attacker'); 
				}
					   
				for (var k = 0; k < defenders.length; k++){
					defender = defenders[k];   
					$(defender).addClass('defender'); 
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
	        var newStory = document.getElementById('thinkingOfWar');    
			$(newStory).removeClass('hidden');
	   		$(newStory).addClass('visible');
	   		if (events[j].polarity == 'multipolar'){
          		setTimeout(assessWars, 2500);
      		}
          	else if (events[j].polarity == 'bipolar'){  
	          	i=0;
          		setTimeout(bipolarWars, 2500); 
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
       		   		addContent('desc' + alliance, 'State ' + stateNumber + ' joins alliance ' + alliance); 		 
       		   		
	       			if (n < events[j].alliances[m].length - 1){
		       			n++;
		       			setTimeout(evaluateAlliances, 1000);
	       			}
	       			else{
		       			if (m < events[j].alliances.length-1){
			       			m++; 
			       			n=0;
			       			setTimeout(evaluateAlliances, 1000);
		       			}
		       			else{
	       					i=0; 
	       					setTimeout(thinkWar, 4000);
	       					
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
		    
		    if (noPowerClick == true){
				noPowerQuestion();     
		    }   
	        else if (i==0){      
			    	hideStories(); 
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
		   			    setTimeout(thinkWar, 3000); 
	   			    }
	   		 		else{
		   				var m = 0; 
		   				var n = 0;
		   				setTimeout(evaluateAlliances, 3000); 
	   				}	    		
      	 		}
  	 		}
       
        function powerQuestion(){
	        var story = document.getElementById('powerAnswer'); 
	    	$(story).removeClass('hidden'); 
	    	$(story).addClass('visible'); 
	    	powerClick = false; 
	    	$("#backToUpdate").click(function(){
		    	var unClicked = document.getElementById('powerQuestion'); 
				var clicked = document.getElementById('clickedPower'); 
				$(unClicked).removeClass('hidden'); 
				$(unClicked).addClass('visible');
				$(clicked).removeClass('visible'); 
				$(clicked).addClass('hidden'); 
				$(story).removeClass('visible'); 
	    		$(story).addClass('hidden'); 
	    			if (i<15){
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
	 					else{
		 					unipolarAlliances(); 
	 				}
 				}
	    	});     
	     	   
        }
        
        function noPowerQuestion(){
	        var story = document.getElementById('noPowerAnswer'); 
	    	$(story).removeClass('hidden'); 
	    	$(story).addClass('visible'); 
	    	noPowerClick = false; 
	    	$("#backNoUpdate").click(function(){
				$(story).removeClass('visible'); 
	    		$(story).addClass('hidden'); 
	    		var unClicked = document.getElementById('noPowerQuestion'); 
				var clicked = document.getElementById('clickedNoPower'); 
				$(unClicked).removeClass('hidden'); 
				$(unClicked).addClass('visible');
				$(clicked).removeClass('visible'); 
				$(clicked).addClass('hidden'); 
		    		if (events[j].polarity == 'multipolar'){
	   					updateAlliances(); 
		 			}
		 			else if (events[j].polarity == 'bipolar'){
	   					bipolarAlliances(); 
	 				}
	 				else{
		 				unipolarAlliances(); 
	 				}
	    	});        
        }
		function updatePower(){ 
			var visitedPowerStory = false; 
			visitedOnce = false;  /*this is to control the button for going back one turn*/
			visitedForwardOnce = false; 
			var powerClick = false;
			$("#powerContinue").click(function(){
					if (powerClick == false){
						powerClick = true; 
						visitedPowerStory = true; 
						var story =  document.getElementById('updateExplanation');    
						$(story).removeClass('visible'); 
						$(story).addClass('hidden'); 
						updatePower();
					} 
				}); 
				
			$("#noPowerQuestion").click(function(){
					var unClicked = document.getElementById('noPowerQuestion'); 
					var clicked = document.getElementById('clickedNoPower'); 
					$(unClicked).removeClass('visible'); 
					$(unClicked).addClass('hidden');
					$(clicked).removeClass('hidden'); 
					$(clicked).addClass('visible'); 
					noPowerClick = true; 
				}); 	
			
			if (events[j].flags.powersUpdated == false){
				i=0; 
				if (j != 0){
					hideStories(); 
					var newStory = document.getElementById('noUpdates');    
			    	$(newStory).removeClass('hidden');
	   				$(newStory).addClass('visible'); 
   				}
	   			if (events[j].polarity == 'multipolar'){
	   				setTimeout(updateAlliances, 3000);
		 		}
		 		else if (events[j].polarity == 'bipolar'){
	   				setTimeout(bipolarAlliances, 3000);
	 			}
	 			else{
		 			setTimeout(unipolarAlliances, 3000);
	 			}
 			}
		    else{
		   		if (visitedPowerStories = false){
			    	hideStories(); 
			       	var expStory = document.getElementById('updateExplanation');    
	   			   	removeContent('powerDetails');
	   			   	$(expStory).removeClass('hidden'); 
	   			   	$(expStory).addClass('visible'); 
	            }
	            else{
		            if (i==0){
			        	var newStory = document.getElementById('updatePowers');   
			        	$(newStory).removeClass('hidden');
	   			   		$(newStory).addClass('visible');    
		            }
		    		if (events[j].statesAfterUpdate[i] == 0){
						if (i<15){
							if (powerClick == true){
								setTimeout(powerQuestion, 3000); 	
							}
							else{
								i++; 
			        			updatePower();  
		        			}
	        			}	 
		         		else{
			     			i=0; 
			     			if (powerClick == true){
				     			setTimeout(powerQuestion, 3000); 	
			     			}   
			       			else if (events[j].polarity == 'multipolar'){    
			       				setTimeout(updateAlliances, 3000);
		       				}
		         			else if (events[j].polarity == 'bipolar'){
			     				setTimeout(bipolarAlliances, 3000); 
		         			}
		         			else if (events[j].polarity == 'unipolar'){
			     				setTimeout(unipolarAlliances, 3000); 
		         			}
		         		}		    
		    		}
		    		else{ 
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
       					addContent('powerDetails', 'State ' + num + ' has power ' + power + '.' + extra + hegeDecline);
       					if(i < 15){
	       					if (powerClick == true){
		       					setTimeout(powerQuestion, 1000); 	
	       					}
	       					else{
	       						i++; 
	       						setTimeout(updatePower, 1000);
       						}
   						}		
       					else{
	       					i=0;  
	       					if (powerClick == true){
		       					setTimeout(powerQuestion, 3000); 	
	       					}
	       					else{
	       						if (events[j].polarity == 'multipolar'){    
			        				setTimeout(updateAlliances, 3000);
		       						}	
		         				else if (events[j].polarity == 'bipolar'){
			     					setTimeout(bipolarAlliances, 3000); 
		         				}
		         				else if (events[j].polarity == 'unipolar'){
			     					setTimeout(unipolarAlliances, 3000); 
		         				}	
	         				}
			   			}
	   				}
   				}
			}	
		}		
	
		function scalingQuestion(){
		var story = document.getElementById('scalingAnswer'); 
	    	$(story).removeClass('hidden'); 
	    	$(story).addClass('visible'); 
	    	scalingClick = false; 
	    	$("#backToScaling").click(function(){
	    		var unClicked = document.getElementById('scalingQuestion'); 
				var clicked = document.getElementById('clickedScaling'); 
				$(unClicked).removeClass('hidden'); 
				$(unClicked).addClass('visible');
				$(clicked).removeClass('visible'); 
				$(clicked).addClass('hidden'); 
				$(story).removeClass('visible'); 
	    		$(story).addClass('hidden'); 
		    		if (i < 15){
			    		i++; 
			    		scaling(); 	
		    		}
		    		else{
			    		i=0; 
			    		updatePower(); 	
		    		}
	    	});     
	     	   
        }
    
    function scaling(){
	    visited = false;
	    var alliance; 
	    $("#scalingQuestion").click(function(){
		    var unClicked = document.getElementById('scalingQuestion'); 
			var clicked = document.getElementById('clickedScaling'); 
			$(unClicked).removeClass('visible'); 
			$(unClicked).addClass('hidden');
			$(clicked).removeClass('hidden'); 
			$(clicked).addClass('visible'); 
			scalingClick = true; 
		}); 
		if (events[j].flags.scaledDown == false || events[j].flags.skipScaling == true){
			updatePower()
		}    
	   else{
			if (i==0){
		    	hideStories(); 
				story = document.getElementById('scaled'); 
				$(story).removeClass('hidden'); 
				$(story).addClass('visible');
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
       			if (scalingClick == true){
    				setTimeout(scalingQuestion, 1000); 	
       			}	
       			else{
					if (i<15){
						i++; 
						setTimeout(scaling, 1000); 	
					}
					else{
						i=0; 
	    				setTimeout(updatePower, 1000);    
    				}
    			}
			}
	    	else{
		    	if (scalingClick == true){
			    	scalingQuestion(); 	
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
    }
	if (showMany == true){
     	var output = getWorldEvents(numOfTurns, initialStates, false);
 	}
 	else{
	 	var output = getWorldEvents(1, initialStates, false);
 	}
     var events =[]; 
     for (var k=0; k<output.length-1; k++){
	  	events.push(output[k]);    
     } 
     var world = output[output.length -1]; 
       j=0;
       i=0;
       
   		var powerClick; 
   		var noPowerClick;
   		var scalingClick; 
   		var peaceClick;
   		var disintegrationClick;
   		var declineClick; 
       	var alliances=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
 	  	var sphere1text = ''; 
	   	var sphere2text = '';
       	var changed = false; 
       	var visited = false; 
      	var visitedOnce; 
      	var visitedForwardOnce; 
      	
      	
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
	  