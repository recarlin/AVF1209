// Russell Carlin
// MIU 1202
// Project 4
var types = {
        LoL:['Bruiser', 'AP Carry', 'AD Carry', 'Support', 'Jungle'],
        WoW:['Death Knight', 'Druid', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior'],
        Skyrim:['Caster', 'Melee', 'Ranger', 'Stealth', 'Tank'],
        MC: ['Redstone', 'Builds', 'Servers', 'Textures', 'Adventure'],
        TQ: ['Earth', 'Defense', 'Dream', 'Hunting', 'Nature', 'Rogue', 'Spirit', 'Storm', 'Warfare']
};

$(document).ready(function(){

	$.mobile.page.prototype.options.addBackBtn= true;
/*
$('#gHome').live('pageLoad', function(){
		var logoHTML='<div class="logoImage"><img width="300px" id="logo" src="Images/GuideHax.png"/></div>';
		$('.ui-page&ui-body-null).before(logoHTML);
	});
*/
    $('#clickLoL').click(function(){
     window.location=$(this).find('a').attr('href');
     return false;
    });
    
    $('#clickWoW').click(function(){
     window.location=$(this).find('a').attr('href');
     return false;
    });
    
    $('#clickSky').click(function(){
     window.location=$(this).find('a').attr('href');
     return false;
    });
    
    $('#clickTQ').click(function(){
     window.location=$(this).find('a').attr('href');
     return false;
    });
   
    $('#clickMC').click(function(){
     window.location=$(this).find('a').attr('href');
     return false;
    });
    
    $('#gGame').change(function() {
    	var x= $('#gGame').val()
    	$('#gType option').not('#default').remove()
        for(index in types[x]) {
        	$('#gType').append('<option value="' + types[x][index] + '">' + types[x][index] + '</option>')
        };
    	$('#gType').selectmenu('refresh', true);
    });
    
    $('#bGame').change(function() {
    	var x= $('#bGame').val()
    	$('#bType option').not('#default').remove()
        for(index in types[x]) {
        	$('#bType').append('<option value="' + types[x][index] + '">' + types[x][index] + '</option>')
        };
    	$('#bType').selectmenu('refresh', true);
    });
    
    $('#gGuideForm').validate({
    	invalidHandler: function(form, validator){},
    	submitHandler: function(){
    		alert('Guide saved!');
    		location.reload();
    	}
    });
    
    $('#bGuideForm').validate({
    	invalidHandler: function(form, validator){
    		alert('Error saving guide.');
    		location.reload();
    	},
    	submitHandler: function(){
    		alert('Guide saved!');
    		location.reload();
    	}
    });
    
    $('#gSlide').hide();
    
    $('#gELO').click(function(){
	    if ($('#gELO').is(':checked')){
	    	$('#gSlide').show()
    	} else {
			$('#gSlide').hide()
		};
    });
    
    $('#bELO').click(function(){
	    if ($('#bELO').is(':checked')){
	    	$('#bSlide').show()
    	} else {
			$('#bSlide').hide()
		};
    });
});