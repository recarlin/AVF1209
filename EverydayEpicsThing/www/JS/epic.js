var currentImage,
	fileSystem;

function onDeviceReady(){
	
	function gei(id) {
	    var e = document.getElementById(id);
	    return e;
	};
	
	/* Display Toggles */
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
	
	function fail(error, from){
		error = error;
		from = from;
		alert('From: ' + from +' Error: ' + error.code);
	};
	function moveSuccess(){
		alert('Yay!');
	};
	
	
	
	function gotFile(file){  
		window.resolveLocalFileSystemURI('Epics', gotDestination, function(error){fail(error, 'Get Directory')});
		function gotDestination(destination){
			var fName = gei('iName');
			file.moveTo(destination, fName, moveSuccess, function(error){fail(error, 'Move File')});
		};
	};
	
	function gotDirectory(){
		window.resolveLocalFileSystemURI(currentImage, gotFile, function(error){fail(error, 'Get File')});
	};
	
	function gotFileSystem(fs){
		fileSystem = fs
		fs.root.getDirectory('Epics', {create: true, exclusive: false}, gotDirectory, function(error){fail(error, 'Create Directory')});
		alert(currentImage);
	};
	
	function getFS(){
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFileSystem, function(error){fail(error, 'File System')});
	};
	
	/* Post Native Features */
	function postLoc(position){
		gei('tLoc').innerHTML = 'Latitude: ' + position.coords.latitude + '<br/>' + 'Longitude: ' + position.coords.longitude;
	};
	function postPic(imageURI){
		gei('tPic').innerHTML = '<img alt="Your Item" src="' + imageURI + '"></img>';
		var currentImage = imageURI;
		getFS();
	};
	
	/* Native Features Success/Error */
	function onSuccess(position){
		navigator.notification.beep(1);
		navigator.notification.alert(
			'Location added!',
			postLoc(position),
			'SUCCESS',
			'OK'
        );
	};
	function onError(){
		navigator.notification.beep(2);
		navigator.notification.alert(
			'Location failed!',
			null,
			'ERROR',
			'OK'
        );
	};
	function cameraSuccess(imageURI){
		navigator.notification.beep(1);
		navigator.notification.alert(
			'Picture added!',
			postPic(imageURI),
			'SUCCESS',
			'OK'
        );
	};
	function cameraError(){
		navigator.notification.beep(2);
		navigator.notification.alert(
			'Picture failed!',
			null,
			'ERROR',
			'OK'
        );
	};
	
	/* Get Native Features */
	function addPic(){
		var picOptions = { quality: 50, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true };
		navigator.camera.getPicture( cameraSuccess, cameraError, picOptions );
	};
	function addLoc(){
		var geoOptions = { timeout: 10000, enableHighAccuracy: true };
		navigator.geolocation.getCurrentPosition(onSuccess, onError, geoOptions);
	};
	
	/* Form/Preview Update Manager */
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
	
	/* Save New Item */
	function saveItem(){
		var item = {};
			item.name	= gei('iName').value;
            item.main	= gei('iMStat').value;
            item.stat2	= gei('iStat2').value;
            item.stat3	= gei('iStat3').value;
            item.stat4	= gei('iStat4').value;
    
	    localStorage.setItem(item.name, JSON.stringify(item));
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