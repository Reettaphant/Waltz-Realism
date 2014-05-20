/*Various helper functions for simulation animation*/

function getAllianceColour(num){
    
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
    var classes = $(div).attr('class').split(' ');
    for (var k=0; k<classes.length; k++){
        if (classes[k].match(pattern)){
            $(div).removeClass(classes[k]);
        }
    }	
}

function removeContent(div) {
    $('#'+div).empty().append('<br>');
}	

function removeQuizContent(div) {
    $('#'+div).empty();
}	

function addContent(div, content){
    $('#'+div).append(content + '<br>');
}

function initialPowerSort(a, b){
    return b[0] - a[0];
}

function initialOrderSort(a, b){
    return a[3] - b[3]
}


function hideStories(){
    var stories = $('.story.visible');   
    for (var i=0; i < stories.length; i++){
        $(stories[i]).removeClass('visible').addClass('hidden'); 
    }
}


