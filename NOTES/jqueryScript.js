// jquery script from tutorial


**********get rid of code below, just practice:
$(document).ready(function(){
  $("CSS class or id selector goes here").actionnamedhere(parameters).moreactions(parameters)endwithsemicolon;
$('#div').slideToggle(1000).toggle(3000);
$("#container").css({
	color:'red',
	fontWeight:'bold',
	display:absolute
})

or: 
// hash tag refers to CSS class, a dot in these paranthesis would refer to css class, not a js accessor
$("#panel1").hide();
$("#panel2").css({opacity:'0.5'});
})


$(function() {
	$('#panel1').on('click', function(){
		$('#panel1').slideToggle(200);

	});
$(function() {
	$('#panel2').on('mouseover', function(){
		$('#panel2').fadeToggle(200);
})

	$(function() {
	$('#panel2').on('mouseover', function(){
		$('#panel2 .panel-body').html('my new panel');
})

	$(document).ready(function(){

$(function() {

	var content = "my new content";

	$('.Button').on('click', function() {
	var panelId = $(this).attr('data-panelid');
		//this takes whatever the action was on, which button assuming there are more than one
		// and keeps track of it to use it: then .attr('data-panelId) looks for attribute of panelId and tell me which one
		// was clicked. Or we could ahve it do something to the attribute it identifies as the one that was clicked, or tie an action to it
		// var content = 'my content' can be called to fill another element 
		$('#' + panelId).toggle();
		$('#' + panelId + '.panel-body').html(content);

		//content in parenthesis but NO QUOTES makes it a variable! so it's getting the variable above, not printing the word content
	//	change id's to classes in css

	});

	// DOM TRAVERSAL
 //browser reads file and turns things into styles
$(function(){
	
})




**********************************************************************
