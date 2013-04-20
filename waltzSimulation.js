
 
 function getWorldEvents(numberOfTurns, initialStates, continuationOfOld, oldWorld, lastEvent){
	 
	function addContent(content){   
			div = "simulationOutput"; 
		      document.getElementById(div).innerHTML += content;
	    	  document.getElementById(div).innerHTML += '<br>';
        	}
      	
     function getStateName(states){
	 	var stateNames = [];
	 	for (var i=0; i<16; i++){
			stateNames.push(false); 	
	 	}   
	 	for (var i=0; i<states.length; i++){
		 	var state = states[i];
		 	var number = parseInt(state.label); 
		 	stateNames[number-1] = true;	
	 	}
	 	for (var i=0; i<stateNames.length; i++){
		 	if (stateNames[i] == false){
			 	var num = i+1; 
			 	return (num + ''); 
		 	}
	 	}
	 	
     }
        
     function changedStatesSort(a, b){
	  	return b[0] - a[0]; 
     }
     
     function stateSort(a, b){
	 	return (b.power-a.power);
     }
     
     function coalitionSort(a, b){
	  	return (b.power - a.power);   
     }
     
     function packStates(states){
	 	var newStateList = []; 
	 	for (var k = 0; k<16; k++){
		 	newStateList.push([0]); 	
	 	}   
	 	for (var k = 0; k<states.length; k++){
			var num = parseInt(states[k].label)-1; 	 
			newStateList[num] = [states[k].power, 0]; 	
	 	}
	 	return newStateList; 
     }
     
     
     
     /*array.sort(sortfunction)*/
     
     function World(label){
	 	this.label = label; 
	 	this.states = [];
	 	this.coalitions = 0;
	 	this.animCoalitions = []; 
	 	this.sorted = false; 
	 	this.polarity = [];
	 	this.worldHistory = [];
	 	this.worldGovernment = false; 
	 	this.onlyTwo = [false];
	 	this.updatedPower = false;
	 	this.spheres = [[],[]];
	 	this.hegemon = 0; 
	 	this.decliningHegemon = false; 
	 	this.firstHegemon = false; 
	 	this.perfectBalancing = false;
	 	this.scaled = false; 
	 	this.worldWar = false; 
	 	this.bipolarChange = false; 
	 	this.unipolarChange = false; 
	 	
     }
     
     World.prototype = {
	    getTotalPower: function(){
			power = 0;
			for(var i =0; i < this.states.length; i++){
				power += this.states[i].power;
				}
			return power;		
		},
	    sortWorld: function(){
	    	if (this.sorted == false){
		    	this.states.sort(stateSort); 
		    	this.sorted = true; 
	    	}
    	}, 
    	
    	scale: function(){
    		if ((this.getTotalPower() / this.states.length) > 20){
	    		this.scaled = true; 
			    for (var k=0; k < world.states.length; k++){
		    		var scaling = world.states[k]; 
		    		if (Math.round(scaling.power * 0.3)  >= 1){
			    		scaling.power = Math.round(scaling.power * 0.3);
		    		}
		    		else{
			    		scaling.power = 1; 	
		    		}
	    		}
    		}
		},
		
    	update: function(){
	    	addContent('updating world'); 
	    	if (h>0){
		    	addContent('with polarity ' + 	this.polarity[this.polarity.length-1] + ' and with history ' + this.worldHistory[this.worldHistory.length-1]); 
	    	}
	    	this.updatedPower = false; 
	    	this.scaled = false; 
	    	if (this.polarity[this.polarity.length-1] != 'bipolar' && this.worldHistory[this.worldHistory.length-1] == 'peaceful' && h != 0){
		    	addContent('now assessing world update'); 
	    		for (var k=0; k < world.states.length; k++){
		    		var current = world.states[k]; 
		    		if (this.hegemon != current.label){
		    			if (current.decliningHegemon != true){
			    			var prob = current.getProbability(); 
			    			if (prob < 2*Math.random()){
				    			if (current.power < 3){
					    			current.addPower(1); 
				    			}
				    			else{
					    			current.addPower(Math.round(0.30 * current.power)); 
				    			}
					    		this.updatedPower = true; 	
			    			}	
							else if (prob < Math.random()){
								current.addPower(Math.round(0.15 * current.power)); 
								this.updatedPower = true;
							}	
						}
						else {
							if (current.power > 7){
				 				current.addPower(Math.round(current.power * -0.7)); 
			 				}
			 				else{
				 				current.power = 1; 	
			 				}	
				 			this.decliningHegemon = true; 
				 			current.decliningHegemon = false;  
				 			this.updatedPower = true;  
			    		}
		    		}
    			}
			}
		}, 
		
		deleteStates: function (){
			for (var k=0; k < this.states.length; k++){
	    		var deleting = this.states[k]; 
	    		if (deleting.power < 0){
		    		this.states.splice(k, 1); 
	    		}
    		}
		},
		
		setPolarity: function(){
			function assessPolarity(){
				addContent('assessing polarity'); 
				if (strongest.power >= totalPower * 0.55 && (strongest.power - secondStrongest.power >= 0.3 * totalPower) ){
						hegemon = strongest.label;
						alert('returning unipolar'); 
						return 'unipolar';
				}
				
				else{
					var largestDifference = Math.floor(totalPower/5); 
					var secondThirdDifference = Math.floor(totalPower/8); 
					var powerTwoStrongest = strongest.power + secondStrongest.power;
					if(powerTwoStrongest > 0.78*totalPower){
						if (strongest.power - secondStrongest.power <= largestDifference && secondStrongest.power - thirdStrongest.power > secondThirdDifference){
							alert('returning bipolar'); 
							return 'bipolar'; 
						}
						else{
							alert ('returning multipolar'); 
							return 'multipolar';	
						}
					}
					else{
						alert('returning multipolar'); 
						return 'multipolar';	
					}
				}
			}
			
			if (this.worldGovernment == true){
				this.polarity.push('world government');
			}
			else{
				alert('in set polarity'); 
				this.states.sort(stateSort); 
				var totalPower = this.getTotalPower();
				powerMinusStrongest = totalPower - this.states[0].power; 
				powerMinusTwoStrongest = powerMinusStrongest - this.states[1].power;
				var strongest = this.states[0]; 
				var secondStrongest = this.states[1];
				var thirdStrongest = this.states[2]; 
				var hegemon = this.hegemon;
				if (this.states.length == 2){
					this.polarity.push('bipolar');	
				}
				else{
					var hist = this.worldHistory[this.worldHistory.length-1];
					alert('now going to call assess polarity'); 
					polarity = assessPolarity(); 
					this.hegemon = hegemon; 
					this.polarity.push(polarity);
					}	
				}
		}, 
		
		assessAlliances: function(){
			function multipolarAlliances(){
				addContent('assessing alliances'); 
				var coalitionNumber;
				for (var k=0; k<states.length; k++){
					var st = states[k];
					st.inCoalition = false;  
				}
				if (states[0].power >= totalPower * 0.45){
					coalitionNumber = 2; 
				}	
				else if (states[0].power >= totalPower *0.35 && states.length >= 6){
					coalitionNumber =3; 
				}
				else{
					coalitionNumber = (Math.floor((states.length-1)/3) + 2); 
				}
				for (var j=0; j<coalitionNumber; j++){
					var coal = new Coalition([new State(0, 'dummy', 0, 0)]);
					coalitions.push(coal); 
				}
				
				var averagePower = Math.floor(totalPower/coalitionNumber); 
				var largestOverAverage = Math.floor(averagePower/8) + 1; 
				
				while (states.length != 0){
					var stateString = '';
					for (var k=0; k<states.length; k++){
						stateString += states[k].label + ', '; 	
					}
					addContent('top of while loop states are : ' + stateString); 
					var stateNumber = Math.floor(Math.random() * states.length);
					var currentState = states[stateNumber];	
					addContent('chose state ' + stateNumber); 
					states.splice(stateNumber, 1);
					if (oldCoalitions != 0){
						oldCoalitionNumber = undefined; 
						if (events[h-1].statesAfterUpdate[parseInt(currentState.label-1)].length == 2 && events[h-1].polarity == 'multipolar'){
							oldCoalitionNumber = events[h-1].statesAfterUpdate[parseInt(currentState.label-1)][1]-1;
							addContent('oldCoalitionNumber was set to ' + oldCoalitionNumber + ' with h being ' + h); 
							if (coalitions.length > oldCoalitionNumber){
								if (coalitions[oldCoalitionNumber].states.length == 1){
									coalitions[oldCoalitionNumber].addState(currentState); 
									var addingCoalition = coalitions[oldCoalitionNumber]; 
								}
							}
						}
					}
					if (currentState.inCoalition == false){
						for (var i =0; i<coalitionNumber; i++){
							if (coalitions[i].power < averagePower && coalitions[i].power + currentState.power <= largestOverAverage + averagePower && currentState.inCoalition == false){

								coalitions[i].addState(currentState); 
								var addingCoalition = coalitions[i];
								break;
							}	
						}
					}
					if (currentState.inCoalition == false){
						smallestCoalition = coalitions[0];
						for (var k=0; k<coalitions.length; k++){
							if (coalitions[k].power < smallestCoalition.power){
								smallestCoalition = coalitions[k]; 	
							}
						}
						smallestCoalition.addState(currentState); 
						addingCoalition = smallestCoalition; 
					}
					
					if (oldCoalitions != 0 && oldCoalitionNumber != undefined){
						addContent('now searching for old coalitions and oldCoalitionsNumber is ' + oldCoalitionNumber); 
						if (oldCoalitionNumber < oldCoalitions.length){
							for (var n=0; n< oldCoalitions[oldCoalitionNumber].states.length; n++){
								var anotherState = oldCoalitions[oldCoalitionNumber].states[n];
								addContent('and the state found was ' + anotherState.label); 
								if (anotherState.inCoalition == false){
									if (addingCoalition.power < averagePower && addingCoalition.power + anotherState.power <= largestOverAverage + averagePower){
										addingCoalition.addState(anotherState);
										addContent('added another state to coalition ' + anotherState.label); 
										for (var m =0; m< states.length; m++){
											if (states[m] == anotherState){
												states.splice[m, 1]; 	
												break;	
												}
											} 
										}
										
										}
									}			
								}
							}	
						}
				
				for (var i=0; i < coalitions.length; i++){
					if(coalitions[i].power == 0){
						coalitions.splice(i, 1); 	
					}
					else{
						coalitions[i].states.sort(stateSort); 
						coalitions[i].states.splice(coalitions[i].states.length-1, 1); 	
						}		
				}
			
				for (var i=0; i < coalitions.length; i++){
					if(coalitions[i].states == undefined){
							coalitions.splice(i, 1); 
						}	
					else{
						for (var j=0; j<coalitions[i].states.length; j++){
							if(coalitions[i].states[j].label == 'dummy'){
								coalitions[i].states.splice(j, 1); 
							}
						}	
						
					}
				}
			 
		
			}
			if (this.polarity[this.polarity.length-1] == 'multipolar'){
				/*if (this.coalitions != 0){
					this.coalitions.sort(coalitionSort);
				}	
				*/
				this.states.sort(stateSort); 
				var coalitions = [];
				if (this.coalitions == 0){
					var oldCoalitions = 0;	
				}
				else{
					var oldCoalitions = this.coalitions.slice();
					addContent('sliced old coalitions with length ' + oldCoalitions.length); 
				} 
				var states = this.states.slice(); 
				var totalPower = this.getTotalPower();
			
				
				if (this.worldHistory.length > 0){
					if (this.worldHistory[this.worldHistory.length-1] != 'peaceful' || this.updatePower != false){
						multipolarAlliances();
						this.coalitions = coalitions; 
						
						for (var k=0; k<coalitions.length; k++){
							var stateLabel = [];
							for (var j=0; j<coalitions[k].states.length; j++){
								stateLabel.push(coalitions[k].states[j].label); 
							}
							
							this.animCoalitions.push(stateLabel); 
						}	
					}
				}
				else{
					multipolarAlliances(); 	
					this.coalitions = coalitions; 
					addContent('length of coalitions now ' + this.coalitions.length); 
					for (var k=0; k<coalitions.length; k++){
							var stateLabel = [];
							for (var j=0; j<coalitions[k].states.length; j++){
								stateLabel.push(coalitions[k].states[j].label); 
							}
							this.animCoalitions.push(stateLabel); 
						}
					}
				}
			}, 
			
	perfectBalance: function(){
			this.perfectBalancing = false; 	
			var found = false; 
			for (var k=0; k<this.coalitions.length; k++){
				for (var i=0; i<this.coalitions.length; i++){
					if (i != k){
						if (this.coalitions[k].power *0.9 > this.coalitions[i].power){
							found = true; 	
						}
					}
				}
			}
			if (found == false){
				this.perfectBalancing = true; 	
			}
			else{
				this.perfectBalancing = false; 	
			}
		}
	}
	
	function Coalition(states, label){
		this.states = states; 
		var power = 0; 
		for (var k=0; k<states.length; k++){
			power += states[k].power; 	
		}	
		this.power = power; 
		this.atWar=false; 
		this.foughtWar=[];
		for (var k=0; k<states.length; k++){
			states[k].inCoalition = true; 	
		}
	}
	
	Coalition.prototype = {
		addState: function(state){
			this.states.push(state); 
			this.power += state.power; 
			state.inCoalition = true; 	
		}
	}
	
	function War(world){
		this.world = world; 
		this.wars = 0; 
		this.didAttackerWin = false; 
		this.outcomes=0;
		this.limitedWar = 0; 
		this.escalation = []; 	
		this.changedStates = [[0]]; 
	}
	
	War.prototype = {
		calculateWar: function(){
			function calculateMultipolarWar(){
				addContent('calculating multipolar war'); 
				coalitionCounter = coalitions.slice(); 
				for (var k=0; k<coalitions.length; k++){
					coalitions[k].atWar = false; 	
				}
				
				var smallestCoalition = coalitions[coalitions.length-1];
				var secondSmallestCoalition = coalitions[coalitions.length -2];
				if (smallestCoalition.power <= (2/3) * secondSmallestCoalition.power && smallestCoalition.states.length == 1 && coalitions.length >=3){
					coalitions.splice[coalitions.length-1, 1]; 
				}
				
				if (world.perfectBalancing == false){
					var isWars = false; 
					for (var k=0; k<coalitions.length; k++){
						var num = Math.floor(Math.random() * coalitions.length);
						currentCoalition = coalitions[num];
						coalitions.splice[num, 1]; 
						var attackPower = 0.9 * currentCoalition.power
						for (var m=0; m<coalitions.length; m++){
							var testCoal = coalitions[m]; 
							if (testCoal != currentCoalition && testCoal.atWar == false && currentCoalition.atWar == false){
								var defencePower = testCoal.power; 
								var powerDifference = attackPower - defencePower; 
								if (powerDifference >= 0){
									var prob = (0.25 + (2*powerDifference)/(defencePower+attackPower));
                           			if (Math.random() < 0.50 + (2*powerDifference)/(defencePower+attackPower)){
	                           			isWar = true; 
	                           			wars=[[currentCoalition], [testCoal], false]; 
	                           			alert('found a limited war'); 
	                           			currentCoalition.atWar = true; 
	                           			testCoal.atWar=true; 
	                           			for (var k=0; k<coalitionCounter.length; k++){
		                           			if(coalitionCounter[k] == currentCoalition){
	                           					var atNum = k+1; 
                           					}
                           					else if (coalitionCounter[k] == testCoal){
	                           					var defNum = k+1; 
                           					}
                           				}
	                           			limitedWar = ['alliance'+atNum, 'alliance'+defNum]; 
	                           			addContent('there will be a limited war in the world with alliance ' + atNum + ' attacking and ' + defNum + ' defending'); 
                           			}	
								}	
							}
						}
						if(currentCoalition.atWar == true){
							break; 
						}
					}
				var found = false;
					if(wars != 0){
						for (var k =0; k<coalitionCounter.length; k++){
							if	(coalitionCounter[k].atWar == false){
								notInWar.push(coalitionCounter[k]);	
								found = true; 
							}
						}
					}
					if (found == false){
						wars[2]=true;
						worldWar = true; 
						addContent('escalated into systemic becasue everyone was fighting'); 
						return 'systemic war' 	
					}
					else{
						var escProb = Math.random(); 
						if (escProb<0.25){ 
							addContent('escalated into systemic because other states joined'); 
							alert('war is now escalating'); 
							wars[2]=true; 
							worldWar = true; 
							while (notInWar.length != 0){
								coalitionToJoin = notInWar[0]; 
								notInWar.splice(0, 1);
								var aPower = 0; 
								var dPower = 0; 
								for (var k=0; k< wars[0].length; k++){
									aPower += wars[0][k].power; 	
								}	
								aPower *= 0.9; 
								for (var k=0; k< wars[1].length; k++){
									dPower += wars[1][k].power; 	
								}		
								if (aPower < dPower){
									wars[0].push(coalitionToJoin); 
									for (var k=0; k<coalitionCounter.length; k++){
										if (coalitionCounter[k] == coalitionToJoin){
											var alNum = k+1; 
											esc1.push('alliance'+alNum);  
											break; 	
										}	
									}
									coalitionToJoin.atWar == true; 	
								}
								else{
									wars[1].push(coalitionToJoin);
									for (var k=0; k<coalitionCounter.length; k++){
										if (coalitionCounter[k] == coalitionToJoin){
											var alNum = k+1; 
											esc2.push('alliance'+alNum);
											break; 	
										}	
									} 	
									coalitionToJoin.atWar == true;
								}
							}
							return 'systemic war'
						}
					}
					if (isWar = true){
						return 'limited war'; 
					}
					else{
						return 'peaceful'; 	
					}
			}
			else{
					return 'peaceful'; 	
			}
		}
		function calculateBipolarWar(){
			var x = Math.random(); 
			if (x < 0.2 && spheres[0].length > 1 && spheres[1].length > 1){ 
				bipolarWar = true; 
				var sph1=[]; 
				var sph2=[]; 
				var power1 = spheres[0][0]; 
				var power2 = spheres[1][0];
				for (var k=1; k<spheres[0].length; k++){
					sph1.push(spheres[0][k]); 
				}
				for (var k=1; k<spheres[1].length; k++){
					sph2.push(spheres[1][k]); 
				}	
				var sph1Power = 0; 
				var sph2Power = 0; 
				for (var k=0; k<spheres[0].length; k++){
					sph1Power += spheres[0][k].power; 	
				}
				for (var k=0; k<spheres[1].length; k++){
					sph2Power += spheres[1][k].power; 	
				}
				var num1 = Math.floor(Math.random() * sph1.length);
				var num2 = Math.floor(Math.random() * sph2.length)
				var state1 = sph1[num1]; 
				var state2 = sph2[num2]; 
				limitedWar = [[power1.label, state1.label], [power2.label, state2.label]]; 
				if (state1.power >= state2.power && sph1.power >= sph2.power){
					state1Won = true; 	
				}
				else if (state2.power >= state1.power && sph2.power >= sph1.power){
					State1Won = false; 
				}
				else if (Math.random() < 0.5){
					State1Won = true; 	
				}
				else{
					State1Won = false; 	
				}
                if (state1Won == true){
	                power1.addPower(Math.round(0.05 * power1.power)); 
	                state1.addPower(Math.round(0.1*state1.power)); 
	            	power2.addPower(Math.round(-0.02 * power2.power)); 
	            	changedStates.push([state1.power, parseInt(state1.label)]);
	            	changedStates.push([power1.power, parseInt(power1.label)]); 
	            	changedStates.push([power2.power, parseInt(power2.label)]);
	            	if (state2.power >= 2){
		            	state2.addPower(Math.round(-0.2 * state2.power()));
		            	changedStates.push([state2.power, parseInt(state2.label)]);  
	            	}
		            else{
			         	changedStates.push([state1.power, parseInt(state1.label)]);
		            }	
		            return true; 	
		            	
	            	} 
	            else{
	            	power1.addPower(Math.round(-0.02 * power1.power));
	            	changedStates.push([state2.power, parseInt(state2.label)]);
	            	changedStates.push([power2.power, parseInt(power2.label)]);
	            	changedStates.push([power1.power, parseInt(power1.label)]); 
	            	if (state1.power >= 2){
		            	state1.addPower(Math.round(-0.2 * state1.power)); 
		            	changedStates.push([state1.power, parseInt(state1.label)]);
	            	} 
		            else{
			         	changedStates.push([state1.power, parseInt(state1.label)]);
		            }	
		            power2.addPower(Math.round(0.05 * power2.power)); 
	            	state2.addPower(Math.round(0.1*state2.power)); 
		            return true; 	
		            	
	            	}
            	}
	            return false;  
            }
		if (this.world.polarity[this.world.polarity.length -1] == 'multipolar'){
			var wars =0; 
			this.world = world; 
			var worldWar = false; 
			var coalitions = this.world.coalitions.slice(); 
			var escCoal = this.world.coalitions.slice();
			var limitedWar = this.limitedWar; 
			var esc1 = []; 
			var esc2 =[]; 
			var notInWar = []
			var changed = false;
			var result = calculateMultipolarWar(); 
			if(wars !=0){
				this.limitedWar = limitedWar; 
			}
			this.world.worldWar = worldWar; 
			this.escalation.push(esc1);
			this.escalation.push(esc2); 
			this.wars = wars;
			this.world.worldHistory.push(result);	 
			}
		else{
			this.world.states.sort(stateSort); 
			var age = this.world.polarity.length;
			var changedStates = this.changedStates; 
			if (this.world.polarity[age -1] == 'unipolar'){
				if (age >=4){
					if(this.world.polarity[age-4]== 'unipolar' && this.world.polarity[age-3]== 'unipolar' && this.world.polarity[age-2] == 'unipolar' && this.world.polarity[age-1] == 'unipolar'){
						if (Math.random() < 0.95){
							this.world.states[0].addPower(Math.round(-1 * this.world.states[0].power/4)); 
							this.changedStates.push([this.world.states[0].power, parseInt(this.world.states[0].label)]);
							this.world.states[0].decliningHegemon= true;		
						}	
					}
				}	
				if (this.world.states[0].power > 0.5 * this.world.getTotalPower()){
					this.world.worldHistory.push('peaceful'); 	
				}
				else{
					this.world.worldHistory.push('systemic change');
					
				}
			}
			else{ 
				var changed = false; 
				if(age >=4){
					addContent('now assessing whether bipolar decline because age was big enough'); 
					if(this.world.polarity[age-4]== 'bipolar' && this.world.polarity[age-3]== 'bipolar' &&  this.world.polarity[age-2]== 'bipolar' &&  this.world.polarity[age-1]== 'bipolar'){
						addContent('polarities bipolar, now assessing decline'); 
						var decCounter = 0; 
						for (var k =0; k<2; k++){
							var prob = Math.random()
							if (prob < 0.4){
								decCounter += 1;  
								changed = true; 
								this.world.states[k].addPower(Math.round(-1*this.world.states[k].power * (5/6))); 
								this.changedStates.push([this.world.states[k].power, parseInt(this.world.states[k].label)]); 
								if (this.world.states[k].power != 0){
									if (Math.random() < 1 && this.world.states.length < 15){ 
										var label = getStateName(this.world.states); 
										this.changedStates.push([Math.round(this.world.states[k].power * 0.8), parseInt(label)]);  
										addContent('pushed a new state from bipolar disintegration, with power: ' + Math.round(this.world.states[k].power * 0.2) + ' and with label ' + label); 
										this.world.states.push(new State(Math.round(this.world.states[k].power * 0.8), label, this.world.states[k].territory, this.world.states[k].innovation));
									}
								}	
							} 	
						}	
					}
				}
				if (changed == true){
					if (decCounter == 1){
						changedPolarities = 'unipolar'; 	
					}
					else{
						changedPolarities = 'bipolar'; 	
					}
					this.world.worldHistory.push('systemic change'); 	
				}
				else{
					var state1Won; 
					spheres = this.world.spheres; 
					var bipWar = calculateBipolarWar(); 
					if (bipWar == true){
						this.limitedWar = limitedWar;
						this.world.worldHistory.push('bipolar war'); 
						if(state1Won == true){
							this.didAttackerWin = true; 	
						}
					}
					else{
						this.world.worldHistory.push('peaceful'); 	
					} 
				}
			}	
		}		
	}, 
    calculateWinner: function(){
	    if(this.wars == 0){
		    alert('no wars, no action taken'); 
		 	;    
	    }
		else{
			 addContent('calculating winner'); 
			var wars = this.wars;
			attackPower = 0; 
			defencePower = 0; 
			for (var k=0; k< wars[0].length; k++){
				attackPower += 	wars[0][k].power; 
			}
			for (var k=0; k< wars[1].length; k++){
				defencePower += wars[1][k].power; 
			}	
			if ((attackPower - defencePower)/(attackPower + defencePower) >= 0.2){
				this.outcomes = [wars, true];
			}
			else if((attackPower - defencePower)/(attackPower + defencePower) <= -0.2){
				this.outcomes = [wars, false];
			}
			else{
				if (Math.random()< 0.7){
					this.outcomes = [wars, true];
				}
				else{
					this.outcomes = [wars, false]; 
				} 	
			}
		}
	},
	
	updateWorld: function(){
		function dealWithLoser(losingState, turbo){
			addContent('dealing with loser'); 
			var numOfStates = states.length; 
			if(losingState.power == 1){
				if (Math.random() < 0.10){
					losingState.power = 0; 	
					addContent('disappears');
				}	
			}
			else if (losingState.power == 2){
				if(Math.random() < 0.05){
					losingState.power = 0; 
					addContent('disappears'); 
				}
				else if (turbo == true){
					if (Math.random() < 0.10){
						losingState.power = 0;
						addContent('disappears');  	
					}	
				}
				else{
					losingState.addPower(-1); 	
				}	
			}
			else if (losingState.power == 3){
				if(Math.random() < 0.05){
					losingState.power = 0; 	
					addContent('disappears'); 
				}
				else if (turbo == true){
					if (Math.random() < 0.075){
						losingState.power = 0; 	
						addContent('!!removing state with power 3 after losing'); 
					}
				}
				else{
					losingState.addPower(-1); 
				}	
			}
			else if (losingState.power < 10){
				if (Math.random() < 0.2 && numOfStates < 16){
					var label = getStateName(states); 
					states.push(new State(Math.round(0.3 * losingState.power), label, 0, 0)); 
					changedStates.push([Math.round(0.3 * losingState.power), parseInt(label)]); 
				}	
				if (Math.random()< 0.02){
					losingState.power = 0; 
					addContent('disappears'); 	
				}
				if (turbo == true){
					var add = Math.round(-0.8 * losingState.power); 
					losingState.addPower(add); 	
				}
				else{
					var add = Math.round(-0.7*losingState.power);
					losingState.addPower(add); 
				}
			}
			else{	
				if (Math.random() < 0.3 && numOfStates < 15){
					var label = getStateName(states); 
					states.push(new State(Math.round(0.15 * losingState.power), label, 0, 0)); 
					changedStates.push([Math.round(0.15 * losingState.power), parseInt(label)]); 
				}
				if (turbo == true){
					add = Math.round(-0.8 * losingState.power); 
					losingState.addPower(add); 	
				}	
				else{
					add = Math.round(-0.7 * losingState.power); 
					losingState.addPower(add);
				}
			}
			
            addContent('now pushing in a losing state ' + losingState.label + ' with power ' + losingState.power); 
        	changedStates.push([losingState.power, parseInt(losingState.label)]); 
		}	
		
		function dealWithAttackerWin(attackingCoalitions, defendingCoalitions, increasePower){
			addContent('dealing with attacker win'); 
			var attackPower = attackingCoalitions[0].power * 0.9; 
			var defendPower = attackingCoalitions[0].power; 
			if (Math.random() < 0.7){
				for (var k =0; k<attackingCoalitions.length; k++){
					for(var j=0; j<attackingCoalitions[k].states.length; j++){
						var state = attackingCoalitions[k].states[j]; 
						if (increasePower == true){
							state.addPower(Math.round(0.5 * state.power));
							changedStates.push([state.power, parseInt(state.label)]); 
						}
						else{
							state.addPower(Math.round(0.2 * state.power));
							changedStates.push([state.power, parseInt(state.label)]);  
						}		
					}
				}
			}
		else{
			for (var k =0; k<attackingCoalitions.length; k++){
					for(var j=0; j<attackingCoalitions[k].states.length; j++){
						var state = attackingCoalitions[k].states[j]; 
						if (increasePower == true){
							state.addPower(Math.round(0.4 * state.power));
							changedStates.push([state.power, parseInt(state.label)]); 
							
						}
						else{
							state.addPower(Math.round(0.1 * state.power));
							changedStates.push([state.power, parseInt(state.label)]);
						}		
					}
				}
			}
		}
		
		function dealWithDefenderWin(attackingCoalitions, defendingCoalitions){
			addContent('dealing with defender win'); 
			var attackPower = 0; 
			var defendPower = 0; 
			for (var k =0; k<attackingCoalitions.length; k++){
				attackPower += attackingCoalitions[k].power * 0.9;
			}
			for (var k =0; k<attackingCoalitions.length; k++){
				defendPower += defendingCoalitions[k].power;
			}
			
			if (Math.random < 0.7){
				for (var k =0; k<defendingCoalitions.length; k++){
					for(var j=0; j<defendingCoalitions[k].states.length; j++){
						var state = defendingCoalitions[k].states[j]; 
						state.power = (Math.round(0.1 * state.power + state.power)); 
						changedStates.push([state.power, parseInt(state.label)]); 
					}		
				}
			}
			else{
				for (var k =0; k<defendingCoalitions.length; k++){
					for(var j=0; j<defendingCoalitions[k].states.length; j++){
						var state = defendingCoalitions[k].states[j]; 
						state.power = (Math.round(0.3 * state.power + state.power));
						changedStates.push([state.power, parseInt(state.label)]);  
					}		
				}
			}
		}
		
		function bipolarChange(){
			alert('now in bipolar change'); 
			if((Math.floor(totalPower/numOfStates)) > 0){
				totalPower = strongest.power + secondStrongest.power; 
				var smallerPower = 0; 
				for (var k=0; k<states.length; k++){
					var state = states[k]; 
					if (state != strongest && state != secondStrongest){
						if (state.power >= 3){
							state.addPower(Math.floor(state.power * -0.2));
						} 
						smallerPower += state.power; 	
						changedStates.push([state.power, parseInt(state.label)]); 
					}	
				}
				totalPower += smallerPower; 
				currentPower = strongest.power + secondStrongest.power; 
				addContent('current power is ' + currentPower); 
				powerNeeded = Math.round((5/2) * (0.8*totalPower + 2 -currentPower) + 0.2*totalPower); 
				if(powerNeeded > 0){
					strongest.addPower(powerNeeded); 
					secondStrongest.addPower(powerNeeded); 
				}
				var greatestDifference = Math.floor(totalPower/15 + 1);
				if (strongest.power - secondStrongest.power > greatestDifference){
					diff = strongest.power - secondStrongest.power - greatestDifference; 		
					strongest.addPower(Math.floor((-diff/2)+1)); 
					secondStrongest.addPower(Math.floor((diff/2)+1));
				}
				changedStates.push([strongest.power, parseInt(strongest.label)]); 
				changedStates.push([secondStrongest.power, parseInt(secondStrongest.label)]); 
				totalPower = smallerPower + strongest.power + secondStrongest.power; 
				var sphere1 = [strongest]; 
				var sphere2 = [secondStrongest]; 
				var sphere2Power = secondStrongest.power; 
				var sphere1Power =  strongest.power; 
				halfPower = Math.round(totalPower/2); 
				for (var k =0; k<coalitions.length; k++){
					for (var j=0; j<coalitions[k].length; j++){
						if (coalitions[k][j]== strongest){
							var strongestCoal = coalitions[k]; 
						}
						else if(coalitions[k][j] == secondStrongest){
							var secondStrongestCoal = coalitions[k]; 	
						}
					}	
				}
				if (strongestCoal == secondStrongestCoal){
					for (var k=0; k<states.length; k++){
						
						var state = states[k]; 
						if(state != strongest && state != secondStrongest){
							addContent('now looking at state ' + state.label + 'and power if added  to sph2 is ' + state.power+'+'+sphere2Power); 
							if (sphere2Power + state.power <= halfPower){
								sphere2.push(state); 
								sphere2Power += state.power; 	
								addContent('added state to sph2'); 
							}
							else{
								sphere1.push(state); 
							}
						}	
					}	
					return [sphere1, sphere2]; 		
				}
				else{
					for (var k=0; k<secondStrongestCoal.length; k++){
						var state = secondStrongestCoal[k]; 
						if (state != secondStrongest){
							sphere2.push(state); 	
							sphere2Power += state.power; 
						}	
					}
					for (var k=0; k<strongestCoal.length; k++){
						var state = strongestCoal[k]; 
						if (state != strongest){
							sphere1.push(state); 
							sphere1Power += state.power; 	
						}	
					}
					for (var k=0; k<states.length; k++){
						var state = states[k]; 
						var inSphere = false; 
						for (var j=0; j<sphere1.length; j++){
							if (sphere1[j] == state){
								inSphere = true; 	
							}	
						}
					
						if (inSphere == false){
							for (var j=0; j<sphere2.length; j++){
								if (sphere2[j] == state){
									inSphere = true; 	
								}	
							}	
						}
						if (inSphere == false){
							if(sphere2power + state.power <= halfPower){
								sphere2.push(state); 
								sphere2Power += state.power; 	
							}
							else{
								sphere1.push(state); 	
						}
					}
				
				return [sphere1, sphere2]; 	
				}
			}
		}
	
	}
		
		function unipolarChange(){
			alert('now in unipolar change!'); 
			totalPower = strongest.power; 
			for (var k=0; k<numOfStates; k++){
				if (states[k] != strongest){
					var decliningState = states[k]; 
					if (decliningState.power >=3){
					decliningState.addPower(Math.round(decliningState.power * -0.2));
					}
					changedStates.push([decliningState.power, parseInt(decliningState.label)]); 
					totalPower += decliningState.power; 
				}
			}	
			
			var powerNeeded = Math.round((5/2) * (0.5 * totalPower * 2 - strongest.power)); 
			if (strongest.power < powerNeeded){
				strongest.addPower(powerNeeded); 	
				changedStates.push([strongest.power, parseInt(strongest.label)]); 
			}
			
		}
		
		if (this.outcomes == 0){
			alert('outcomes was 0, there will be no changes'); 
			; 	
		}
		else{
			var attackers = this.outcomes[0][0]; 
			var defenders = this.outcomes[0][1]; 
			var didAttackerWin = this.outcomes[1];
			var states = this.world.states; 
			var changedStates = [[0]];
			if (this.outcomes[0][2] == false){ 
				if (didAttackerWin == true){
					if(Math.random() < 0.2){
						dealWithAttackerWin(attackers, defenders, false); 
					}	
					else{
						dealWithAttackerWin(attackers, defenders, true);	
					}
					addContent('dealing with losing defenders'); 
					for (var i=0; i<defenders.length; i++){
						for (var j=0; j<defenders[i].states.length; j++){
							var losingState = defenders[i].states[j]; 
							dealWithLoser(losingState, false); 
							this.world.states = states; 	
						}	
					}
				}
				else{
					addContent('deal with losing attackers'); 
					dealWithDefenderWin(attackers, defenders); 
					for (var i=0; i<attackers.length; i++){
						for (var j=0; j<attackers[i].states.length; j++){
							var losingState = attackers[i].states[j]; 
							dealWithLoser(losingState, false); 
							this.world.states = states; 
						}	
					}		
				}
			}
			else{
				var winningStates = []; 
				if(didAttackerWin == true){
					for (var i=0; i<attackers.length; i++){
						for (var j=0; j<attackers[i].states.length; j++){
							winningStates.push(attackers[i].states[j]);  
						}	
					}
				}
				else{
					for (var i=0; i<defenders.length; i++){
						for (var j=0; j<defenders[i].states.length; j++){
							winningStates.push(defenders[i].states[j]); 	
						}	
					}
				}
				var winningPower = 0; 
				for (var k =0; k< winningStates.length; k++){
					winningPower += winningStates[k].power; 	
				}
				this.world.coalitions = 0;
				winningStates.sort(stateSort); 
				var strongest = winningStates[0];
				var totalPower = this.world.getTotalPower(); 
				var numOfStates = this.world.states.length; 
				var states = this.world.states;
				var coalitions = this.world.coalitions; 
				var changedStates = [[0]]; ; 
				
				if (winningStates.length != 1){
					var secondStrongest = winningStates[1]; 
				}
				else{
					var secondStrongest =0;
				}
				if(secondStrongest == 0){
					unipolarChange(); 
				}
				else{
					if ((strongest.power - secondStrongest.power)/winningPower < (1/5)){ 
						this.world.spheres = bipolarChange(); 
						this.world.bipolarChange = true; 
					}
					else{
						unipolarChange(); 	
						this.world.unipolarChange = true; 
						this.world.firstHegemon = true; 
					}
				}
			}
		
		
		this.world.sorted=false;
		if (this.world.states.length == 1){
			this.worldGovernment = true; 	
		}	 
		else if (this.world.states.length == 2){
			this.world.onlyTwo.push(true); 	
			if (this.world.onlyTwo[this.world.onlyTwo.length -2] == false && this.world.onlyTwo[this.world.onlyTwo.length -1] == true){
				this.world.worldHistory(this.world.worldHistory.length-1) = 'systemic change'; 
			}
		}
		
		for (k=0; k<this.world.states.length; k++){
			if(this.world.states[k].power <=0){
				this.world.states.splice(k, 1);	
			}	
		}
     	}
     	
     	if (changedStates != undefined){
     		this.changedStates = changedStates; 
 		}
 		for (var k=0; k<this.world.states.length; k++){
	 		if (this.world.states[k].power <= 0){
		 		this.world.states.splice(k ,1); 	
	 		}	
 		}
     	addContent('exiting update world with changed states length ' + this.changedStates.length); 
	}
}
	
	
    function State(power, label, territory, innovation){
		this.power = power; 
	 	this.label = label; 
	 	this.territory = territory; 
	 	this.innovation = innovation; 
	 	this.inCoalition = false; 
	 	this.decliningHegemon= false;    
     }
     State.prototype = {
	     addPower: function(pw){
		     this.power += pw
	     },
	     getProbability: function(){
		  return (this.territory + this.innovation)/10 + 0.1    
	     }
     }
     
     function worldEvent(){
		  this.polarity = ''
		  this.statesAfterScaling = [];
		  this.statesAfterUpdate = [[0]];
		  this.war = 0;
		  this.alliances = [];
		  this.escalation = [];
		  this.changedStates = [[0]];
		  this.flags = {'limitedChange' : false, 'skipScaling' : false, 'didAttackerWin' : false, 'perfectBalancing' : false, 'powersUpdated' : false, 'decliningHegemon' : false, 'scaledDown' : false, 'firstHegemon' : false, 'worldWar' : false, 'sorted' : false}
		  this.endPolarity = ''
		  this.spheres = []
		  this.hegemon = 0; 
	  }
    
	 if (continuationOfOld == false){
     	var world = new World('world'); 
     	var stateArray = []; 
     	for (var h=0; h<initialStates.length; h++){
	    	var stnum = h+1; 
	    	var label = stnum + ''; 
     		var state = new State(parseInt(initialStates[h][0]), label, parseInt(initialStates[h][1]), parseInt(initialStates[h][2])); 
    		stateArray.push(state);  
 			}
     	world.states = stateArray; 
     	 var events = []; 
 	}
 	else{
		var world = oldWorld; 
		var events = [lastEvent]; 
 	}
 	
  
    
     for (var h=0; h<numberOfTurns; h++){
	    changedPolarity = false; 
	 	if (continuationOfOld == true && h==0){
			h++; 	   
	    }
	     addContent('------------ Now unpacking info for turn  ' + h  + ' --------------------------------'); 
	    var turn = new worldEvent();	
	    if (world.firstHegemon == true){
		 	turn.flags.firstHegemon = true;
		 	world.firstHegemon = false; 
	    } 
	    world.scale(); 
	    addContent('packing states after scaling'); 
	    var afterScale = packStates(world.states); 
	    turn.statesAfterScaling = afterScale.slice(); 
	    if(world.scaled == true){
		    world.scaled = false; 
		 	turn.flags.scaledDown = true;    
	    }
     	if (h==0){
     		world.setPolarity(); 
 		}
 		else{
	 		alert('h is now ' + h); 
	 		world.polarity.push(events[h-1].endPolarity); 	
 		}
	 	world.update(); 
	 	if (world.updatedPower == true){
		 	world.updatedPower = false; 
		 	turn.flags.powersUpdated = true; 	
	 	}
	 	if (world.decliningHegemon == true){
		 	world.decliningHegemon = false; 
		 	turn.flags.decliningHegemon = true; 	
	 	}
	 	
	 	world.deleteStates(); 
	 	addContent('packing states after deleting');
	 	var afterUpdate = packStates(world.states); 
	 	turn.statesAfterUpdate = afterUpdate.slice(); 

	 	
	 
	 	
	 	turn.polarity = world.polarity[world.polarity.length - 1];
	 	if (turn.polarity == 'unipolar' && h == 0){
		 	turn.flags.firstHegemon = true; 
	 	}
	 	else if (h>0){
		 	if (events[h-1].polarity != 'unipolar'){
				turn.flags.firstHegemon = true; 	
			}
			else{
				turn.flags.firstHegemon = false; 	
			} 
	 	}
	 	
	 
	 	if (turn.polarity == 'bipolar'){
		 	function sortIntoSpheres(){ 
			 	world.states.sort(stateSort); 
				var str1 = world.states[0];
				var str2 = world.states[1]; 
				var pwr1 = str1.power; 
				var sphs = [[str1.label], [str2.label]];
				world.spheres = [[str1], [str2]]; 
				var half = Math.round(world.getTotalPower()/2); 
				for (var k=2; k< world.states.length; k++){
					if (pwr1 < half){
						sphs[0].push(world.states[k].label); 
						
						world.spheres[0].push(world.states[k]); 
						pwr1 += world.states[k].power; 
					}
					else{
						sphs[1].push(world.states[k].label); 
						
						world.spheres[1].push(world.states[k]); 	
					}
				}
				
				
				return sphs; 
		 	};
		 	 
		 	if (h==0){
				turn.spheres = sortIntoSpheres(); 	
				turn.flags.sorted = false; 
	 		}
	 		else if (events[h-1].flags.limitedChange == true){
				turn.spheres = sortIntoSpheres(); 	
				turn.flags.sorted = false; 
	 		}
	 		else{
		 		if (events[h-1].polarity != 'bipolar'){
		 			var spheres1 = []; 
		 			var spheres2 =[]; 
		 			for (var k=0; k< world.spheres[0].length; k++){
			 			spheres1.push(world.spheres[0][k].label); 	
		 			}
		 			for (var k=0; k< world.spheres[1].length; k++){
			 			spheres2.push(world.spheres[1][k].label); 	
		 			}
		 			turn.spheres = [spheres1, spheres2]; 
		 			turn.flags.sorted = false; 
	 			}
	 		else{
		 		turn.flags.sorted= true; 
		 		turn.spheres = events[h-1].spheres; 	
	 		}
 		}
	}
	 	
	 	if (turn.polarity == 'unipolar'){
		 	if (h == 0){
			 	turn.hegemon = world.hegemon; 
		 	}
		 	else{
		 		if (events[h-1].polarity != 'unipolar'){
	    			turn.hegemon = world.hegemon; 	
     			}
     			else{
		 			turn.hegemon = events[h-1].hegemon; 	
	 			}
 			}
	 	}
	 	if (h != 0){
		 	events[h-1].endPolarity = turn.polarity;    
	    }
	  
     	world.assessAlliances(); 
     	turn.alliances = world.animCoalitions.slice();  
     	world.perfectBalance(); 
     	if (world.perfectBalancing == true){
		 	turn.flags.perfectBalancing = true; 	
	 	}
	 	
		addContent('now unpacking alliances in the world');
     	for (k=0; k < world.coalitions.length; k++){
	   		var num = k+1;
	 		addContent('alliance number: ' + num + ' with power: ' + world.coalitions[k].power);
	 		var states = '';     
	 		for (var j=0; j<world.coalitions[k].states.length; j++){
		 		states += world.coalitions[k].states[j].label + ', '
	 		}
	 		addContent('with states ' + states); 
     	}
     
     	for (k=0; k< world.coalitions.length; k++){
	     	var allianceNumber = k+1;  
	    	for (var j=0; j<world.coalitions[k].states.length; j++){
		    	var st = world.coalitions[k].states[j]; 
		    	var stNumber = parseInt(st.label) - 1; 
		    	turn.statesAfterUpdate[stNumber][1] = allianceNumber;  	
	    	}	
     	}
     	alert('hello!');
     	var testWar = new War(world);  
     	addContent('after creation changed states length in testwar ' + testWar.changedStates.length); 
     	testWar.calculateWar();
     	turn.war = testWar.limitedWar;
 		alert('turn.war is now ' + turn.war); 
     	turn.escalation = testWar.escalation;
     	if (testWar.world.worldWar == true){
	     	addContent('now escaltion flag was true and there will be a systemic war'); 
	     	testWar.world.worldWar = false; 
	     	turn.flags.worldWar = true;	
     	}
     	
     	testWar.calculateWinner(); 
     	if (testWar.outcomes[1] == true){
	     	turn.flags.didAttackerWin = true; 	
     	}
     	
     	else if (world.worldHistory[h] == 'bipolar war'){
	    	turn.flags.didAttackerWin = testWar.didAttackerWin; 
     	}
     	testWar.updateWorld(); 
     	turn.changedStates = testWar.changedStates.slice(); 
     	addContent('changed states : '); 
     	for  (var k=0; k<turn.changedStates.length; k++){
	     	addContent(turn.changedStates[k][1]); 	
     	}
     	turn.hegemon = world.hegemon; 
 
     	
	    if (turn.polarity != 'bipolar' || world.worldHistory[h] == 'systemic change'){
     		world.setPolarity(); 
     		turn.endPolarity = world.polarity[world.polarity.length-1];
	    	world.polarity.splice(world.polarity.length-1, 1); 
 		}
	 	else{	
	    	turn.endPolarity = world.polarity[world.polarity.length-1];
    	}
	    alert('end polarity was set to ' + turn.endPolarity); 
     	if (turn.endPolarity != turn.polarity && world.worldHistory[h] != 'systemic change' && world.worldHistory[h] != 'systemic war'){
	   		turn.flags.limitedChange = true; 
	   		world.worldHistory.splice(world.worldHistory.length-1, 1); 
	   		world.worldHistory.push('systemic war'); 
	    	alert('limited change set to true in simulation'); 
	    	if (turn.endPolarity == 'bipolar'){
		    	turn.flags.sorted = false; 
    		}
     	}
     	
    	events.push(turn); 
    	world.animCoalitions = []; 
    	 
    	
	}
	events.push(world);  
	if (continuationOfOld == true){
		events.splice(0, 1);	
	}
   	return events; 
	}
  
 
