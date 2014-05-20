
    function addContent(content){
        if (debug == true){		
            $('#simulationOutput').innerHTML += content+ '<br>';
        }
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
