/*Copyright Reetta Vaahtoranta. All rights reserved */

function getWorldEvents(numberOfTurns, initialStates, continuationOfOld, oldWorld, lastEvent, previously, bipolarCounter){

	function addContent(content){
		if (debug == true){		
			$('#simulationOutput').innerHTML += content+ '<br>';
		}
	}
      	
	function getStateName(states){
	/*returns the label of the state that should be initialised next in the world*/
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
     
	/*functions for sorting states and coalitions*/	
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
	/*packs states in an order that can be used by the animation code*/
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

     	function World(label){
	/*represents the world. Has states, coalitions, wars, history and polarity. Has methods for checkign the polarity,
	 * updating the world after a peaceful round, updatating state alliances, sortin and scaling state powers
	 */
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
	 	this.challenger  =0; 
		this.decliningHegemon = false; 
	 	this.firstHegemon = false; 
	 	this.perfectBalancing = false;
	 	this.scaled = false; 
	 	this.worldWar = false; 
	 	this.bipolarChange = false; 
	 	this.unipolarChange = false; 
	        this.buckPass = false; 
		this.multipolarCounter = 0;
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
		
		addCoalition: function(coalition){
			if (this.coalitions == 0){
				this.coalitions = [coalition];
			}
			else{
				this.coalitions.push(coalition);
			}
		},
		
		update: function(){
	    		addContent('updating world'); 
			if (h>0){
				addContent('with polarity ' + 	this.polarity[this.polarity.length-1] + ' and with history ' + this.worldHistory[this.worldHistory.length-1]); 
			}
			this.updatedPower = false; 
			this.scaled = false; 
			if (this.polarity[this.polarity.length-1] == 'multipolar' && this.worldHistory[this.worldHistory.length-1] == 'peaceful' && h != 0){
				this.multipolarUpdate();
			}
			else if (this.polarity[this.polarity.length-1] == 'unipolar' && this.polarity[this.polarity.length-2] == 'unipolar'){
				this.unipolarUpdate();
			}
			else if (this.polarity[this.polarity.length -1] == 'bipolar' && this.polarity[this.polarity.length -2] == 'bipolar'){
				this.bipolarUpdate();
			}
		},
		
		multipolarUpdate: function(){
			for (var k=0; k < world.states.length; k++){
				var current = world.states[k]; 
				if (current.decliningHegemon != true){
					var prob = current.getProbability(); 
					if (prob > 2*Math.random()){
						if (current.power < 3){
							current.addPower(1); 
						}
						else{
							current.addPower(Math.round(0.30 * current.power)); 
						}
						this.updatedPower = true;
					}
					else if (prob > Math.random()){
						current.addPower(Math.round(0.15 * current.power)); 
						this.updatedPower = true;
					}	
				}
				else{
					this.updatedPower = true; 
					world.decliningHegemon = true;
					current.addPower(Math.floor(-0.5 * current.power)); 
				}
			}
			for (var k=0; k<world.states.length; k++){
				var current = world.states[k]; 
				if (current.decliningHegemon == true && this.worldHistory[this.worldHistory.lenght-1] != 'systemic change' && this.polarity == 'multipolar'){
					current.decliningHegemon = false; 
					current.noWin = true;
				}
			}
		},

		bipolarUpdate: function(){
			this.updatedPower = true;
			this.states.sort(stateSort);
			this.states[0].addPower(Math.round(0.10* this.states[0].power));
			this.states[1].addPower(Math.round(0.10*this.states[1].power));	
			for (var k=0; k<world.states.length; k++){
				if (world.states[k].decliningHegemon == true){
					world.states[k].decliningHegemon = false;
					world.decliningHegemon = false; 	
				}
			}	

		},
		
	        unipolarUpdate: function(){
			this.updatedPower = true; 
			var k; 
			var greatestProb = 0; 
			var challenger; 
			for (k=0; k<this.states.length; k++){
				if (this.states[k].label != this.hegemon){
					var prob = this.states[k].territory + this.states[k].innovation; 
					if (prob > greatestProb){
						greatestProb = prob;
						challenger = this.states[k]; 
					}
				}
			}
			this.challenger = challenger.label;
			if (challenger.power < 4){
				challenger.addPower(7); 
			}
			else{
				challenger.addPower(Math.floor(challenger.power * 0.75)+1);
				for (k=0; k<this.states.length; k++){
					if (this.states[k].label != this.hegemon && this.states[k] != this.challenger){
						var prob = this.states[k].getProbability(); 
						if (prob > 2*Math.random()){
							this.states[k].addPower(1); 
						}
					}
					else if (prob > Math.random()){
						this.states[k].addPower(Math.round(0.10 * this.states[k].power)); 
						this.updatedPower = true;
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
			if (this.worldGovernment == true){
				this.polarity.push('world government');
			}
			else{
				this.states.sort(stateSort); 
				if (this.states.length == 2){
					this.polarity.push('bipolar');	
				}
				else{
					if (this.states[0].power >= this.getTotalPower() * 0.50 && (this.states[0].power - this.states[1].power >= 0.3 * this.getTotalPower()) ){
							this.hegemon = this.states[0].label;
							var polarity =  'unipolar';
					}
					
					else{
						var largestDifference = Math.floor(this.getTotalPower()/5); 
						var secondThirdDifference = Math.floor(this.getTotalPower()/8); 
						if(this.states[0].power + this.states[1].power > 0.78*this.getTotalPower()){
							if (this.states[0].power - this.states[1].power<= largestDifference && this.states[1].power - this.states[2].power > secondThirdDifference){
								var polarity =  'bipolar'; 
							}
							else{
								var polarity =  'multipolar';	
							}
						}
						else{
							var polarity =  'multipolar';	
						}
					}
					this.polarity.push(polarity);
				}	
			}
		}, 
		
		getNumberOfCoalitions: function(){
			var totalPower = this.getTotalPower();
			if (this.states[0].power >= totalPower * 0.45){
				return 2; 
			}	
			else if (this.states[0].power >= totalPower *0.35 && this.states.length >= 6){
				return 3; 
			}
			else{
				return (Math.round((this.states.length-1)/3)+1); 
			}
		},

		
		setStateCoalitionProperties: function(coalitionNumber){
			for (var k=0; k<this.states.length; k++){
				var st = this.states[k];
				st.inCoalition = false;  
			}
			this.coalitions = 0; 
			for (var j=0; j<coalitionNumber; j++){
				var coal = new Coalition([new State(0, 'dummy', 0, 0)]);
				this.addCoalition(coal); 
			}
		},

		setOldCoalitions: function(){
			if (this.coalitions == 0){
				return 0;	
			}
			else{
				return this.coalitions.slice();
			} 
		},	
		

		findSmallestCoalition: function(){
			smallestCoalition = this.coalitions[0];
			for (var k=0; k<this.coalitions.length; k++){
				if (this.coalitions[k].power < smallestCoalition.power){
					smallestCoalition = this.coalitions[k]; 	
				}
			}
			return smallestCoalition; 
		}, 

		multipolarAlliances: function(){
			var totalPower = this.getTotalPower();
			var coalitionNumber = this.getNumberOfCoalitions();
			var averagePower = Math.floor(totalPower/coalitionNumber); 
			var largestOverAverage = Math.floor(averagePower/8) + 1;
			var states = this.states.slice();
			var oldCoalitions = this.setOldCoalitions(); 
			this.setStateCoalitionProperties(coalitionNumber);	
			while (states.length != 0){
				var stateNumber = Math.floor(Math.random() * states.length);
				var currentState = states[stateNumber];	
				states.splice(stateNumber, 1);
				if (oldCoalitions != 0){
					var oldCoalitionNumber = this.findOldCoalition(currentState);
					if (oldCoalitionNumber != undefined){
						var addingCoalition = this.coalitions[oldCoalitionNumber]; 
					}
				}
				if (currentState.inCoalition == false){
					for (var i =0; i<coalitionNumber; i++){
						if (this.coalitions[i].power < averagePower && this.coalitions[i].power + currentState.power <= largestOverAverage + averagePower && currentState.inCoalition == false){

							this.coalitions[i].addState(currentState); 
							var addingCoalition = this.coalitions[i];
							break;
						}	
					}
				}
				if (currentState.inCoalition == false){
					var smallesCoalition = this.findSmallestCoalition(); 
					smallestCoalition.addState(currentState); 
					addingCoalition = smallestCoalition; 
				}
				
				if (oldCoalitions != 0 && oldCoalitionNumber != undefined && oldCoalitions[oldCoalitionNumber] != undefined){
					this.addRestInCoalition(oldCoalitions, oldCoalitionNumber, addingCoalition, averagePower, largestOverAverage); 
				}
			}

			this.removeExtraCoalitions(); 
			this.removeExtraState(); 
		},

		findOldCoalition: function(currentState){
			var oldCoalitionNumber = undefined; 
			if (events[h-1].statesAfterUpdate[parseInt(currentState.label-1)].length == 2 && events[h-1].polarity == 'multipolar'){
				var oldCoalitionNumber = events[h-1].statesAfterUpdate[parseInt(currentState.label-1)][1]-1;
				addContent('oldCoalitionNumber was set to ' + oldCoalitionNumber + ' with h being ' + h);
				if (this.coalitions.length > oldCoalitionNumber && this.coalitions[oldCoalitionNumber] != undefined){
					if (this.coalitions[oldCoalitionNumber].states.length == 1){
						this.coalitions[oldCoalitionNumber].addState(currentState); 
					}
				}
			}
			return oldCoalitionNumber;
		}, 
	      	
		addRestInCoalition: function (oldCoalitions, oldCoalitionNumber, addingCoalition, averagePower, largestOverAverage){
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
		},

		removeExtraCoalitions: function(){
			for (var i=0; i < this.coalitions.length; i++){
				if(this.coalitions[i].power == 0 || this.coalitions[i].states == undefined){
					this.coalitions.splice(i, 1); 	
				}
			}
		}, 

		removeExtraState: function(){
			for (var i=0; i < this.coalitions.length; i++){
				this.coalitions[i].states.sort(stateSort); 
				this.coalitions[i].states.splice(this.coalitions[i].states.length-1, 1); 	
			}

		}, 
		
		recordInformation: function(k){
			var stateLabel = [];
			for (var j=0; j<this.coalitions[k].states.length; j++){
				stateLabel.push(this.coalitions[k].states[j].label); 
			}
			this.animCoalitions.push(stateLabel); 
		},

		assessAlliances: function(){
			if (this.polarity[this.polarity.length-1] == 'multipolar'){
				this.states.sort(stateSort); 
				if (this.worldHistory.length > 0){
					if (this.worldHistory[this.worldHistory.length-1] != 'peaceful' || this.updatePower != false){
						this.multipolarAlliances();
						for (var k=0; k<this.coalitions.length; k++){
							this.recordInformation(k); 
						}	
					}
				}
				else{
					this.multipolarAlliances(); 
					var buckPass = [];	
					addContent('length of coalitions now ' + this.coalitions.length); 
					for (var k=0; k<this.coalitions.length; k++){
						if (this.coalitions[k].states.length == 1){
							var without = (this.getTotalPower() - this.coalitions[k].power)/(this.coalitions.length-1);
							if (without > this.coalitions[k].power+3){
								buckPass.push(k+1);
								this.coalitions.splice(k, 1); 
							}
							else{
								this.recordInformation(k); 
							}
						}	
						else{
							this.recordInformation(k); 
						}
					}
					if (buckPass != []){
						this.buckPass = buckPass; 
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
	/*represents the world's coalitions, has methods for adding new atates into the coalition 
	 * and for indentifying coalitions with same states
	 **/
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
		},

		coalitionNumber: function(worldCoalitions){
			for (var k = 0; k< worldCoalitions.length; k++){
				if (worldCoalitions[k].states[0] == this.states[0]){
					return k;
				}
			}
		}
	}
	
	function MultipolarWar(world){
		this.world = world; 
		this.wars = 0; 
		this.outcomes=0;
		this.limitedWar = 0; 
		this.escalation = []; 	
		this.changedStates = [[0]]; 
	}

	MultipolarWar.prototype = {
		calculateWar: function(){
			var isWar = false; 
			for (var k=0; k<this.world.coalitions.length; k++){
				this.world.coalitions[k].atWar = false; 	
			}
			coalitions = this.world.coalitions.slice();	
			if (world.perfectBalancing == false && this.multipolarCounter != 0){
				for (var k=0; k<coalitions.length; k++){
					var num = Math.floor(Math.random() * coalitions.length);
					currentCoalition = coalitions[num];
					coalitions.splice[num, 1]; 
					for (var m=0; m<coalitions.length; m++){
						var testCoal = coalitions[m]; 
						if (testCoal != currentCoalition && testCoal.atWar == false && currentCoalition.atWar == false){
							if (currentCoalition.power*0.9 - testCoal.power > 0){ 
								if (Math.random() < 0.25 + (2*currentCoalition.power*0.9 - testCoal.power)/(testCoal.power+0.9*currentCoalition.power)){ 
									isWar = true; 
									this.wars=[[currentCoalition], [testCoal], false]; 
									currentCoalition.atWar = true; 
									testCoal.atWar=true;
									for (var k=0; k<this.world.coalitions.length; k++){
										if(currentCoalition.states[0] == this.world.coalitions[k].states[0]){
											var atNum = k+1;
											this.world.states[k].atWar == true;
										}	
										if (testCoal.states[0] == this.world.coalitions[k].states[0]){
											var defNum = k+1; 
											this.world.states[k].atWar == true;
										}
									}
									this.limitedWar = ['alliance'+atNum, 'alliance'+defNum]; 
								}	
							}	
						}
					}
					if(currentCoalition.atWar == true){
						break; 
					}
				}
				this.calculateEvent(isWar);
			}	
			else{		
				this.world.worldHistory.push('peaceful');	 
			}
		},
		
		calculateEvent: function(isWar){
			if(isWar){
				if (this.calculateEscalation()){
					this.world.worldHistory.push('systemic war');	 
				}
				else{
					this.world.worldHistory.push('limited war');	 
				}
			}
			else{  
				this.world.worldHistory.push('peaceful');	 
			}
		},

		weakerAttacker: function(){
			this.wars[0].push(coalitionToJoin); 
			coalitionToJoin.atWar == true; 
			for (var k=0; k<this.world.coalitions.length; k++){
				if (this.world.coalitions[k] == coalitionToJoin){
					var alNum = k+1; 
					return 'alliance'+alNum;  
				}	
			}
		},

		strongerAttacker: function(){
			this.wars[1].push(coalitionToJoin);
			coalitionToJoin.atWar == true;
			for (var k=0; k<this.world.coalitions.length; k++){
				if (this.world.coalitions[k] == coalitionToJoin){
					var alNum = k+1; 
					return 'alliance'+alNum;
				}	
			}	 	
		}, 

		statesNotFighting: function(){
			var result = []; 
			for (var k =0; k<this.world.coalitions.length; k++){
				if(this.world.coalitions[k].atWar == false){
					result.push(this.world.coalitions[k]);	
				}
			}
			return result; 
		}, 

		calculateEscalation: function(){
			var esc1 = [];
			var esc2 = [];
			var notInWar = this.statesNotFighting();;
			if ((this.world.coalitions.length <=3 && notInWar.length == 0) || (this.world.coalitions.length > 3 && notInWar.length <2)){
				this.wars[2]=true;
				this.world.worldWar = true; 
				return true; 	
			}
			else{
				if ((Math.random()<1.00 )|| this.world.multipolarCounter >= 3){ /*changed from 0,25*/
					this.wars[2]=true; 
					this.world.worldWar = true; 
					while (notInWar.length != 0){
						coalitionToJoin = notInWar[0]; 
						notInWar.splice(0, 1);
						var aPower = 0; 
						var dPower = 0; 
						for (var k=0; k< this.wars[0].length; k++){
							aPower += this.wars[0][k].power; 	
						}	
						aPower *= 0.9; 
						for (var k=0; k< this.wars[1].length; k++){
							dPower += this.wars[1][k].power; 	
						}		
						if (aPower < dPower){
							esc1.push(this.weakerAttacker()); 
						}
						else{
							esc2.push(this.strongerAttacker()); 
						}
					}
					this.escalation.push(esc1);
					this.escalation.push(esc2); 
					return true;
				}	
			}
		},
		calculateWinner: function(){
		/*calculates the winner of a war*/

			if(this.wars == 0){
				;    
			}
			else{
				this.checkDecliningState();	
			}
		},
		
		checkDecliningState: function(){
				var foundDec = false;
				var attackPower = 0; 
				var defencePower = 0;
				for (var k=0; k<this.wars[0].length; k++){
					for (l=0; l<this.wars[0][k].states.length; l++){
						if (this.wars[0][k].states[l].decliningHegemon == true || this.wars[0][k].states[l].noWin == true){
							this.outcomes = [this.wars, false]; 
							this.wars[0][k].states[l].noWin = false;
							foundDec = true;
						}
					}

				}	
				if (foundDec == false){
					for (var k=0; k<this.wars[1].length; k++){
						for (l=0; l<this.wars[1][k].states.length; l++){
							if (this.wars[1][k].states[l].decliningHegemon == true || this.wars[1][k].states[l].noWin == true){
								this.outcomes = [this.wars, true];
								foundDec=true;	
								this.wars[0][k].states[l].noWin = false;
							}
						}	

					}		
				}
				if (foundDec == false){
					this.calculateWithoutDeclining();
				}

		}, 

		calculateWithoutDeclining: function(){
				addContent('calculating winner'); 
				var attackPower = 0; 
				var defencePower = 0;
				for (var k=0; k< this.wars[0].length; k++){
					attackPower += 	this.wars[0][k].power; 
				}
				for (var k=0; k< this.wars[1].length; k++){
					defencePower += this.wars[1][k].power; 
				}	
				if ((attackPower - defencePower)/(attackPower + defencePower) >= 0.2){
					this.outcomes = [this.wars, true];
				}
				else if((attackPower - defencePower)/(attackPower + defencePower) <= -0.2){
					this.outcomes = [this.wars, false];
				}
				else{
					if (Math.random()< 0.7){
						this.outcomes = [this.wars, true];
					}
					else{
						this.outcomes = [this.wars, false]; 
					} 	
				}
		}, 


		dealWithAttackerWin: function(attackingCoalitions, defendingCoalitions, increasePower){
			addContent('dealing with attacker win'); 
			var attackPower = attackingCoalitions[0].power * 0.9; 
			var defendPower = attackingCoalitions[0].power; 
			if (Math.random() < 0.7){
				for (var k =0; k<attackingCoalitions.length; k++){
					for(var j=0; j<attackingCoalitions[k].states.length; j++){
						var state = attackingCoalitions[k].states[j]; 
						if (increasePower == true){
							state.addPower(Math.round(0.5 * state.power));
							this.changedStates.push([state.power, parseInt(state.label)]); 
						}
						else{
							state.addPower(Math.round(0.2 * state.power));
							this.changedStates.push([state.power, parseInt(state.label)]);  
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
							this.changedStates.push([state.power, parseInt(state.label)]); 
							
						}
						else{
							state.addPower(Math.round(0.1 * state.power));
							this.changedStates.push([state.power, parseInt(state.label)]);
						}		
					}
				}
			}
		},

		dealWithDefenderWin: function(attackingCoalitions, defendingCoalitions){
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
						this.changedStates.push([state.power, parseInt(state.label)]); 
					}		
				}
			}
			else{
				for (var k =0; k<defendingCoalitions.length; k++){
					for(var j=0; j<defendingCoalitions[k].states.length; j++){
						var state = defendingCoalitions[k].states[j]; 
						state.power = (Math.round(0.3 * state.power + state.power));
						this.changedStates.push([state.power, parseInt(state.label)]);  
					}		
				}
			}
		},

		dealWithLoser: function(losingState, turbo){
			var numOfStates = this.world.states.length; 
			if(losingState.power == 1){
				if (Math.random() < 0.10){
					losingState.power = 0; 	
				}	
			}
			else if (losingState.power == 2){
				if(Math.random() < 0.05){
					losingState.power = 0; 
				}
				else if (turbo == true){
					if (Math.random() < 0.10){
						losingState.power = 0;
					}	
				}
				else{
					losingState.addPower(-1); 	
				}	
			}
			else if (losingState.power == 3){
				if(Math.random() < 0.05){
					losingState.power = 0; 	
				}
				else if (turbo == true){
					if (Math.random() < 0.075){
						losingState.power = 0; 	
					}
				}
				else{
					losingState.addPower(-1); 
				}	
			}
			else if (losingState.power < 10){
				if (Math.random() < 0.2 && numOfStates < 16){
					var label = getStateName(this.world.states); 
					this.world.states.push(new State(Math.round(0.3 * losingState.power), label, 0, 0)); 
					this.changedStates.push([Math.round(0.3 * losingState.power), parseInt(label)]); 
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
					var label = getStateName(this.world.states); 
					this.world.states.push(new State(Math.round(0.15 * losingState.power), label, 0, 0)); 
					this.changedStates.push([Math.round(0.15 * losingState.power), parseInt(label)]); 
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
			this.changedStates.push([losingState.power, parseInt(losingState.label)]); 

		},

		powerOfSmallerStates: function(strongest, secondStrongest){
			var result= 0;
			for (var k=0; k<this.world.states.length; k++){
				var state = this.world.states[k]; 
				if (state != strongest && state != secondStrongest){
					if (state.power >= 3){
						state.addPower(Math.floor(state.power * -0.2));
					} 
					result += state.power; 	
					this.changedStates.push([state.power, parseInt(state.label)]); 
				}	
			}
			return result;
		},

		addPowerNeeded: function(totalPower, currentPower){
			this.world.states.sort(stateSort); 
			var strongest = this.world.states[0];
			var secondStrongest = this.world.states[1];
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
			this.changedStates.push([strongest.power, parseInt(strongest.label)]); 
			this.changedStates.push([secondStrongest.power, parseInt(secondStrongest.label)]); 
			return strongest.power+secondStrongest.power;
		},

		oldAlliesSpheres: function(sphere1, sphere2) {
			for (var k=2; k<this.world.states.length-2; k++){
				var state = this.world.states[k]; 
				if ((sphere2.length < (this.world.states.length-3)/2)){
					sphere2.push(state); 
				}
				else{
					sphere1.push(state); 
				}
			}	
			return [sphere1, sphere2]; 		
		},
		
		oldEnemiesSpheres: function(sphere1, sphere2, strongestCoal, secondStrongestCoal) {
			var counter = 0; 
			for (var k=0; k<secondStrongestCoal.states.length; k++){
				var state = secondStrongestCoal.states[k]; 
				if (state != secondStrongest && counter < this.world.states.length - 4){
					sphere2.push(state); 
					counter ++; 	
				}	
			}
			for (var k=0; k<strongestCoal.states.length; k++){
				var state = strongestCoal.states[k]; 
				if (state != strongest && counter < this.world.states.length - 4){
					sphere1.push(state); 
					counter++;
				}	
			}
			for (var k=0; k<this.world.states.length; k++){
				if (counter < this.world.states.length -4){
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
						if(Math.random()<0.5){
							sphere2.push(state);
					       		counter++;	
						}
						else{
							sphere1.push(state);
							counter++;	
						}
					}
				}
				else{
					break; 
				}
			}

			return [sphere1, sphere2]; 	
		},


		bipolarChange: function(){
			this.world.states.sort(stateSort);
			var totalPower = this.world.getTotalPower(); 
			var numOfStates = this.world.states.length; 
			var strongest = this.world.states[0];
			var secondStrongest = this.world.states[1];
			if((Math.floor(totalPower/numOfStates)) > 0){
				totalPower = strongest.power + secondStrongest.power; 
				var smallerPower = this.powerOfSmallerStates(strongest, secondStrongest); 
				totalPower += smallerPower; 
				var currentPower = strongest.power + secondStrongest.power; 
				var toAdd = this.addPowerNeeded(totalPower, currentPower);
				addContent('current power is ' + currentPower); 
				totalPower = smallerPower + toAdd; 
				var sphere1 = [strongest]; 
				var sphere2 = [secondStrongest]; 
				for (var k =0; k<this.world.coalitions.length; k++){
					for (var j=0; j<this.world.coalitions[k].states.length; j++){
						if (this.world.coalitions[k].states[j]== strongest){
							var strongestCoal = coalitions[k]; 
						}
						else if(this.world.coalitions[k].states[j] == secondStrongest){
							var secondStrongestCoal = coalitions[k]; 	
						}
					}	
				}
				if (strongestCoal == secondStrongestCoal){
					return this.oldAlliesSpheres(sphere1, sphere2);	
				}
				else{
					return this.oldEnemiesSpheres(sphere1, sphere2, strongestCoal, secondStrongestCoal);
				}
			}
		},

		unipolarChange: function(){
			var numOfStates = this.world.states.length; 
			this.world.states.sort(stateSort);
			var strongest = this.world.states[0];
			var secondStrongest = this.world.states[1];
			var totalPower = strongest.power; 
			for (var k=0; k<numOfStates; k++){
				if (this.world.states[k] != strongest){
					var decliningState = this.world.states[k]; 
					if (decliningState.power >=5){
					decliningState.addPower(Math.round(decliningState.power * -0.7));
					}
					else{
						decliningState.power = 1; 
					}
					this.changedStates.push([decliningState.power, parseInt(decliningState.label)]); 
					totalPower += decliningState.power; 
				}
			}	
			
			var powerNeeded = Math.round((5/2) * (0.6 * totalPower * 2 - strongest.power)); 
			if (strongest.power < powerNeeded){
				strongest.addPower(powerNeeded); 	
				this.changedStates.push([strongest.power, parseInt(strongest.label)]); 
			}
			
		},
			
		updateLimitedWar: function(){
			var attackers = this.outcomes[0][0]; 
			var defenders = this.outcomes[0][1]; 
			var didAttackerWin = this.outcomes[1];
			this.changedStates = [[0]];
			if (didAttackerWin == true){
				if(Math.random() < 0.2){
					this.dealWithAttackerWin(attackers, defenders, false); 
				}	
				else{
					this.dealWithAttackerWin(attackers, defenders, true);	
				}
				addContent('dealing with losing defenders'); 
				for (var i=0; i<defenders.length; i++){
					for (var j=0; j<defenders[i].states.length; j++){
						var losingState = defenders[i].states[j]; 
						this.dealWithLoser(losingState, false); 
					}	
				}
			}
			else{
				addContent('deal with losing attackers'); 
				this.dealWithDefenderWin(attackers, defenders); 
				for (var i=0; i<attackers.length; i++){
					for (var j=0; j<attackers[i].states.length; j++){
						var losingState = attackers[i].states[j]; 
						this.dealWithLoser(losingState, false); 
					}	
				}		
			}

		},

		updateSystemChange: function(){
			var attackers = this.outcomes[0][0]; 
			var defenders = this.outcomes[0][1]; 
			var didAttackerWin = this.outcomes[1];
			this.changedStates = [[0]];
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
			
			if (winningStates.length != 1){
				var secondStrongest = winningStates[1]; 
			}
			else{
				var secondStrongest =0;
			}
			if(secondStrongest == 0){
				this.unipolarChange(); 
			}
			else{
				if ((strongest.power - secondStrongest.power)/winningPower < (1/6) && previously != 'bipolar'){ 
					this.world.spheres = this.bipolarChange(); 
					this.world.bipolarChange = true; 
				}
				else{	
					if (previously == 'unipolar'){
						this.bipolarChange(); 
					}
					else{
						this.unipolarChange(); 	
						this.world.unipolarChange = true; 
						this.world.firstHegemon = true; 
					}
				}
			}
		},
		updateWorld: function(){
				
			if (this.outcomes == 0){
				; 	
			}
			else{
				if (this.outcomes[0][2] == false){ 
					this.updateLimitedWar();
				}
				else{
					this.updateSystemChange();
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
			
			for (var k=0; k<this.world.states.length; k++){
				if (this.world.states[k].power <= 0){
					this.world.states.splice(k ,1); 	
				}	
			}
			addContent('exiting update world with changed states length ' + this.changedStates.length); 
		}
	}	
	function UnipolarWar(world){
		this.world = world; 
		this.changedStates = [[0]]; 
	}
	UnipolarWar.prototype = {
		calculateWar: function(){
			this.world.states.sort(stateSort); 
			var age = this.world.polarity.length;
			if (age >=3){
				if(this.world.polarity[age-3] == 'unipolar' && this.world.polarity[age-2] == 'unipolar' && this.world.polarity[age-1] == 'unipolar'){
					this.world.states[0].addPower(Math.round(-1 * this.world.states[0].power/(3.5))); 
					this.changedStates.push([this.world.states[0].power, parseInt(this.world.states[0].label)]);
					this.world.states[0].decliningHegemon= true;	
					this.world.decliningHegemon = true; 
				}
			}	
			if (this.world.states[0].power > 0.5 * this.world.getTotalPower()){
				this.world.worldHistory.push('peaceful'); 	
			}
			else{
				this.world.worldHistory.push('systemic change');
				
			}

		} 

	}
	
	function BipolarWar(world){
		this.limitedWar = 0;
		this.world = world; 
		this.bipState = 0; 
		this.didAttackerWin = false; 
		this.changedStates = [[0]]; 
	}
	
	BipolarWar.prototype = {
		whoIsAttacked: function(){
			while (true){
				var num = Math.floor(Math.random() * (this.world.states.length));
				this.bipState = this.world.states[num]; 
				var found = false; 
				for (var k=0; k<this.world.spheres[0].length; k++){
					if (this.world.spheres[0][k] == this.bipState){
						found = true
					}
				}
				if (found == false){
					for (var k=0; k<this.world.spheres[1].length; k++){
						if (this.world.spheres[1][k] == this.bipState){
							found = true; 
						}
					}
				}
				if (found == false){	
					break;
				}					
			}
			return [[this.world.spheres[0][0].label, this.world.spheres[1][0].label], [this.bipState.label]];
		},
		
		calculatePowerChanges: function(){
			var power1 = this.world.spheres[0][0]; 
			var power2 = this.world.spheres[1][0];
			if (this.didAttackerWin == true){
				power1.addPower(Math.round(0.05 * power1.power)); 
				power2.addPower(Math.round(-0.02 * power2.power)); 
				this.changedStates.push([power1.power, parseInt(power1.label)]); 
				this.changedStates.push([power2.power, parseInt(power2.label)]);
			} 
			else{
				power1.addPower(Math.round(-0.02 * power1.power));
				power2.addPower(Math.round(0.05 * power2.power)); 
				this.changedStates.push([power2.power, parseInt(power2.label)]);
				this.changedStates.push([power1.power, parseInt(power1.label)]); 
			
			}
		},

		calculateBipolarWar: function(){
			if (bipolarCounter == -10){/*changed from 0*/
				this.world.worldHistory.push('peaceful'); 	
			}
			else if (((bipolarCounter == 2 && Math.random() <0.5) || bipolarCounter == 1 ) && this.world.spheres[0].length > 1 && this.world.spheres[1].length > 1){ 
				this.limitedWar = this.whoIsAttacked(); 
				if (Math.random()<0.5){
					this.world.spheres[0].push(this.bipState); 
					this.didAttackerWin = true; 	
				}	
				else{
					this.world.spheres[1].push(this.bipState); 
				}
				this.calculatePowerChanges();
				this.world.worldHistory.push('bipolar war'); 
			}
		}, 

		calculateWar: function(){
			this.world.states.sort(stateSort); 
			var age = this.world.polarity.length;
			/*and this separate calculate bipolar war fun*/
			if (age >= 4){
				if(this.world.polarity[age-4]== 'bipolar' && this.world.polarity[age-3]== 'bipolar' &&  this.world.polarity[age-2]== 'bipolar' &&  this.world.polarity[age-1]== 'bipolar'){
					this.bipolarDisintegration();
				}
			}
			else{
				this.calculateBipolarWar();
			}
		},
		bipolarDisintegration: function(){
			addContent('polarities bipolar, now assessing decline'); 
			var changed = false; 
			var decCounter = 0;
			var prob;
			/*these probs the other way round when finished debugging*/	
			if (previously == 'unipolar'){
				prob = 2;
			}
			else if (previously == 'multipolar'){
				prob =1
			}
			else{	
				if (Math.random() < 0.5){
					prob = 1; 		
				}
				else{
					prob = 2;
				}
			}
			for (var k=0; k < prob; k++){
				decCounter += 1;  
				changed = true; 
				this.world.states[k].addPower(Math.round(-1*this.world.states[k].power * (5/6))); 
				this.changedStates.push([this.world.states[k].power, parseInt(this.world.states[k].label)]); 
				if (this.world.states[k].power != 0){
					if (Math.random() < 0.5 && this.world.states.length < 15){ 
						var label = getStateName(this.world.states); 
						this.changedStates.push([Math.round(this.world.states[k].power * 0.8), parseInt(label)]);  
						addContent('pushed a new state from bipolar disintegration, with power: ' + Math.round(this.world.states[k].power * 0.2) + ' and with label ' + label); 
						this.world.states.push(new State(Math.round(this.world.states[k].power * 0.8), label, this.world.states[k].territory, this.world.states[k].innovation));
					}	
				}	
			}	 	
			
			if (changed == true){
				this.world.worldHistory.push('systemic change'); 	
			}
		

		} 
	}
	function War(world){
	/*represents war happening tin the world, calculates if a war is going to occur, keeps records of the winner 
	 , outcomes, escalations and disintegration of current world order*/
		this.world = world; 
		this.wars = 0; 
		this.didAttackerWin = false; 
		this.outcomes=0;
		this.limitedWar = 0; 
		this.escalation = []; 	
		this.changedStates = [[0]]; 
	}


	
	
	function State(power, label, territory, innovation){
		this.power = power; 
	 	this.label = label; 
	 	this.territory = territory; 
	 	this.innovation = innovation; 
	 	this.inCoalition = false; 
	 	this.decliningHegemon= false;   
	        this.noWin = false;	
	}
    	State.prototype = {
	     	addPower: function(power){
		     	this.power += power;
	     	},
	     	getProbability: function(){
		  	return (this.territory + this.innovation)/10 + 0.1;  
	     	}
     	}
     
     	function worldEvent(){
	     /*a world event gets returned to the animation code*/
		this.polarity = '';
		this.statesAfterScaling = [];
		this.statesAfterUpdate = [[0]];
		this.war = 0;
		this.alliances = [];
		this.escalation = [];
		this.changedStates = [[0]];
		this.flags = {'limitedChange' : false, 'skipScaling' : false, 'didAttackerWin' : false, 'perfectBalancing' : false, 'powersUpdated' : false, 'decliningHegemon' : false, 'scaledDown' : false, 'firstHegemon' : false, 'worldWar' : false, 'sorted' : false, 'buckPass' : false}
		this.endPolarity = ''
		this.spheres = []
		this.hegemon = 0;
		this.meddled = NaN; 
	  }
    
	 if (continuationOfOld == false){
     		var world = new World('world');
		var stateArray = []; 
		var debug = false;
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
				world.polarity.push(events[h-1].endPolarity); 	
		}
	 	world.update(); 
	 	if (world.updatedPower == true){
		 	world.updatedPower = false;
		 	turn.flags.powersUpdated = true; 	
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
			        var stateNum = (world.states.length-3)/2;	
				var str1 = world.states[0];
				var str2 = world.states[1]; 
				var sphs = [[str1.label], [str2.label]];
				world.spheres = [[str1], [str2]]; 
				for (var k=2; k< world.states.length-2; k++){
					if (Math.random() <= 0.5){
					       	if (sphs[0].length < stateNum){
							sphs[0].push(world.states[k].label); 
							world.spheres[0].push(world.states[k]); 
						}
						else{
							sphs[1].push(world.states[k].label); 
							world.spheres[1].push(world.states[k]); 	
						}
					}
					else{
						if (sphs[1].length < stateNum){
							sphs[1].push(world.states[k].label); 
							world.spheres[1].push(world.states[k]); 
						}
						else{
							sphs[0].push(world.states[k].label); 
							world.spheres[0].push(world.states[k]); 
						}	
					}
				}
				return sphs; 
		 	};
		 	 
		 	if (h==0){
				turn.spheres = sortIntoSpheres(); 
				turn.flags.sorted = false; 
	 		}
	 		else if (events[h-1].flags.limitedChange == true || events[h-1].polarity == 'unipolar'){
				turn.spheres = sortIntoSpheres(); 	
				turn.flags.sorted = false; 
	 		}
	 		else{
				var spheres1 = []; 
				var spheres2 =[]; 
				for (var k=0; k< world.spheres[0].length; k++){
					spheres1.push(world.spheres[0][k].label); 	
				}
				for (var k=0; k< world.spheres[1].length; k++){
					spheres2.push(world.spheres[1][k].label); 	
				}
				turn.spheres = [spheres1, spheres2]; 
			}
			if (world.polarity[world.polarity.length-2] != 'bipolar'){
				turn.flags.sorted = false; 
			}
			else{
				turn.flags.sorted = true;
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
	if (world.buckPass != false){
		turn.flags.buckPass = world.buckPass;
		world.buckPass = false; 
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
     	if  (turn.polarity == 'multipolar'){
		var testWar = new MultipolarWar(world); 
	}
	else if (turn.polarity == 'bipolar'){
		var testWar = new BipolarWar(world); 
	}	
	else{ 
		var testWar = new  UnipolarWar(world);
	}
     	addContent('after creation changed states length in testwar ' + testWar.changedStates.length); 
     	testWar.calculateWar();
     	turn.war = testWar.limitedWar;
     	turn.escalation = testWar.escalation;
     	if (testWar.world.worldWar == true){
	     	addContent('now escaltion flag was true and there will be a systemic war'); 
	     	testWar.world.worldWar = false; 
	     	turn.flags.worldWar = true;	
     	}
     	
     	if (turn.polariy == 'multipolar'){
		testWar.calculateWinner();
		
     		if (testWar.outcomes[1] == true){
	     		turn.flags.didAttackerWin = true; 	
     		}
	}
     	
     	else if (world.worldHistory[h] == 'bipolar war'){
	    	turn.flags.didAttackerWin = testWar.didAttackerWin; 
     	}
	if (world.polarity[world.polarity.length-1] == 'bipolar' && turn.war != 0){
		if (testWar.didAttackerWin == true){
			turn.spheres[0].push(testWar.bipState.label); 
		}	
		else{
			turn.spheres[1].push(testWar.bipState.label); 
		}
	}
     	if (turn.polarity == 'multipolar'){
		testWar.updateWorld(); 
	}
     	turn.changedStates = testWar.changedStates.slice(); 
     	addContent('changed states : '); 
     	for  (var k=0; k<turn.changedStates.length; k++){
	     	addContent(turn.changedStates[k][1]); 	
     	}
     	/*turn.hegemon = world.hegemon;*/ 
 
	if (world.decliningHegemon == true){
		world.decliningHegemon = false;
		turn.flags.decliningHegemon = true;
		var randNum; 
		while (true){
			randNum = Math.floor(Math.random() * (world.states.length-1) + 1); 
			if (randNum !=world.hegemon && randNum != world.challenger){
				break;		
			}
		}
		turn.meddled = randNum;  	
	}

	if (turn.polarity == 'multipolar' || (turn.polarity == 'bipolar' && world.worldHistory[world.worldHistory.length-1] == 'systemic change')|| (turn.polarity == 'unipolar' && turn.flags.decliningHegemon == true)){
     		world.setPolarity(); 
     		turn.endPolarity = world.polarity[world.polarity.length-1];
	    	world.polarity.splice(world.polarity.length-1, 1); 
	}
	else{	
	    	turn.endPolarity = world.polarity[world.polarity.length-1];
	}
     	if (turn.endPolarity != turn.polarity && world.worldHistory[world.worldHistory.length-1] != 'systemic change' && world.worldHistory[world.worldHistory.length-1] != 'systemic war'){
		turn.flags.limitedChange = true; 
		world.worldHistory.splice(world.worldHistory.length-1, 1); 
		world.worldHistory.push('systemic war'); 
	    	if (turn.endPolarity == 'bipolar'){
		    	turn.flags.sorted = false; 
    		}
     	}
     	if ((turn.endPolarity != turn.polarity) && turn.polarity == 'multipolar'){
		world.multipolarCounter = 0;
	}	
     	if (turn.endPolarity == turn.polarity && turn.polarity == 'multipolar'){
		world.multipolarCounter +=1;
	}	
    	events.push(turn); 
    	world.animCoalitions = []; 
	}
	events.push(world);  
	if (continuationOfOld == true){
		events.splice(0, 1);	
	}
	var terrIntel=[];
	for (var k=0; k<16; k++){
		terrIntel.push('empty');
	}
	for (var k=0; k<world.states.length; k++){
		terrIntel[parseInt(world.states[k].label)-1]=[world.states[k].territory, world.states[k].innovation]; 
	}
	events.push(terrIntel); 
   	return events; 
}
  
 
