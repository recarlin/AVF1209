function onDeviceReady() {
	
	function gei(id) {
	    var e = document.getElementById(id);
	    return e;
	};
	function newItem(){
		gei('home').style.display = 'none';
		gei('newItem').style.display = '';
		gei('backHome').style.display = '';
	};
	function stash(){
		gei('home').style.display = 'none';
		gei('stash').style.display = '';
		gei('backHome').style.display = '';
	};
	function goHome(){
		gei('home').style.display = '';
		gei('newItem').style.display = 'none';
		gei('stash').style.display = 'none';
		gei('backHome').style.display = 'none';
	};
	function addPic(){
		
	};
	function postLoc(position){
		gei('locPlace').innerHTML = 'Latitude: ' + position.coords.latitude + '<br/>' + 'Longitude: ' + position.coords.longitude;
	};
	function onSuccess(position){
		
        alert(position);
	};
	function onError(){
		navigator.notification.beep(2);
		navigator.notification.alert(
			'Location failed!',
			addPic(),
			'ERROR',
			'OK'
        );
	};
	function addLoc(){
		var geoOptions = { timeout: 10000, enableHighAccuracy: true }
		navigator.geolocation.getCurrentPosition(onSuccess, onError, geoOptions);
	};
	function chngDsply(){
		var chngTxt = this.value,
			chngItem = this.id;
		if(chngItem === 'iName'){
			gei('tName').innerHTML = (chngTxt);
		} else {
			if(chngItem === 'iMStat'){
				gei('tMStat').innerHTML = (chngTxt);
			} else {
				if(chngItem === 'iStat2'){
					gei('tStat2').innerHTML = (chngTxt);
				} else {
					if(chngItem === 'iStat3'){
						gei('tStat3').innerHTML = (chngTxt);
					} else {
						gei('tStat4').innerHTML = (chngTxt);
					};
				};
			};
		};
	};
	
	var cn = gei('clickNew');
	cn.addEventListener('click', newItem);
	
	var cs = gei('clickStash');
	cs.addEventListener('click', stash);
	
	var bh = gei('backHome');
	bh.addEventListener('click', goHome);
	
	var cl = gei('location');
	cl.addEventListener('click', addLoc);
	
	var cp = gei('picture');
	cp.addEventListener('click', addPic);
	
	var nm = gei('iName');
	nm.addEventListener('change', chngDsply);
	
	var st1 = gei('iMStat');
	st1.addEventListener('change', chngDsply);
	
	var st2 = gei('iStat2');
	st2.addEventListener('change', chngDsply);
	
	var st3 = gei('iStat3');
	st3.addEventListener('change', chngDsply);
	
	var st4 = gei('iStat4');
	st4.addEventListener('change', chngDsply);
};	
document.addEventListener("deviceready", onDeviceReady());