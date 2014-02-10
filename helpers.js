/*Various helper functions for simulation animation*/

function getAllianceColour(num){
	/*matches the alliance number with its colour*/

	if (num == 1){
		return 'Blue'; 
	}
	else if (num == 2){
		return 'Green';
	}
	else if (num == 3){
		return 'Orange'; 
	}
	else if (num == 4){
		return 'Purple'; 
	}
	else if (num == 5){
		return 'Yellow'; 
	}
	else{
		return 'Pink'; 
	}
}

function removeWithRegex(div, pattern){
	/*removes all classes matching a given pattern from a given div*/
	var classes = $(div).attr('class').split(' ');
	for (var k=0; k<classes.length; k++){
		if (classes[k].match(pattern)){
			$(div).removeClass(classes[k]);
		}
	}	
}

function removeContent(div) {
	/*removes stories*/
	$('#'+div).empty().append('<br>');
}	

function removeQuizContent(div) {
	/*removes quizzes*/
	$('#'+div).empty();
}	

function addContent(div, content){
	/*content and inserts a line break*/
	$('#'+div).append(content + '<br>');
}

function initialPowerSort(a, b){
	/*a function to sort states according to their powers*/
	return b[0] - a[0];
}

function initialOrderSort(a, b){
	/*a function to sort states according to their id number*/
	return a[3] - b[3]
}


function hideStories(){
	/*hides all the currently visible stories*/
	var stories = $('.story.visible');   
	for (var i=0; i < stories.length; i++){
		$(stories[i]).removeClass('visible').addClass('hidden'); 
	}
}


