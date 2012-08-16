function onDeviceReady() {
	
	function gei(id) {
	    var e = document.getElementById(id);
	    return e;
	};
	function gec(cln) {
	    var e = document.getElementsByClassName(cln);
	   console.log(e)
	    return e;
	};
	function showDis1(){
		gei('hed').innerHTML = '<h1>DISCUSSION</h1>';
		gei('leftCol').style.display = 'none';
		gei('rightCol').style.display = 'none';
		gei('back').style.display = '';
		gei('dis1').style.display = '';
	};
	function showDis2(){
		gei('hed').innerHTML = '<h1>DISCUSSION</h1>';
		gei('leftCol').style.display = 'none';
		gei('rightCol').style.display = 'none';
		gei('back').style.display = '';
		gei('dis2').style.display = '';
	};
	function showDis3(){
		gei('hed').innerHTML = '<h1>DISCUSSION</h1>';
		gei('leftCol').style.display = 'none';
		gei('rightCol').style.display = 'none';
		gei('back').style.display = '';
		gei('dis3').style.display = '';
	};
	function hideDis(){
		gei('leftCol').style.display = '';
		gei('rightCol').style.display = '';
		gei('back').style.display = 'none';
		gei('dis1').style.display = 'none';
		gei('dis2').style.display = 'none';
		gei('dis3').style.display = 'none';
		gei('hed').innerHTML = '<h1>CHARACTER SHEET</h1>';
	};
	function chngVFW(){
		window.location.href = 'http://recarlin.github.com/LoL_Guide_Builder/';
	};
	function chngAVF(){
		window.location.href = 'epic.html';
	};
	function goEpic(){
		var linkC = gec('goAVF');
		
		for(var i = 0, l=linkC.length; i<l; i++){
			linkC[i].addEventListener('click', chngAVF);
		};
	};
	
	var discuss1 = gei('disClick1');
	discuss1.addEventListener('click', showDis1);
	
	var discuss2 = gei('disClick2');
	discuss2.addEventListener('click', showDis2);
	
	var discuss3 = gei('disClick3');
	discuss3.addEventListener('click', showDis3);
	
	var back = gei('back');
	back.addEventListener('click', hideDis);
	
	var vfw = gei('VFW');
	vfw.addEventListener('click', chngVFW);
	
	goEpic();
	
};
document.addEventListener("deviceready", onDeviceReady());