var currentIMG;
function onDeviceReady(){
	/* General */
	function gei(id) {
	    var e = document.getElementById(id);
	    return e;
	};
	function gec(cln) {
	    var e = document.getElementsByClassName(cln);
	    return e;
	};
	function refreshHome(){
		location.reload();
	};
	function fail(error, from){
		alert('From: ' + from +' Error: ' + error.code);
	};
	/* Create Folder/Move Picture */
	function getFS(imageURI){
		/* Get File System */
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getFile, function(error){fail(error, 'File System')});
		function getFile(fs){  
			/* Get Image File */
			window.resolveLocalFileSystemURI(imageURI, getDestination, function(error){fail(error, 'Get File')});
			function getDestination(file){  
				/* Create Folder */
				fs.root.getDirectory('Epics', {create: true, exclusive: false}, gotDir, function(error){fail(error, 'Create Directory')});
				function gotDir(destination){
					/* Move Image and Rename */
					var fName = gei('iName').value + '.jpg';
					file.moveTo(destination, fName, moveSuccess, function(error){fail(error, 'Move File')});
					function moveSuccess(){
						/* Update Image on Template */
						destination.getFile(fName, {create: false, exclusive: false}, finishPic, function(error){fail(error, 'Get Image')});
						function finishPic(newIMG){
							gei('tPic').innerHTML = '<img alt="Your Item" src="' + newIMG.fullPath + '?time=' + new Date().getTime() + '"></img>';
							currentIMG = fName;
						};
					};
				};
			};
		};
	};
	/* Post Native Features */
	function postLoc(position){
		gei('tLoc').innerHTML = 'Item found at ' + position.coords.latitude + ' latitude' + '<br/>' + 'and ' + position.coords.longitude + ' longitude';
	};
	/* Native Features Success/Error */
	function onSuccess(position){
		navigator.notification.alert(
			'Location added!',
			postLoc(position),
			'SUCCESS',
			'OK'
        );
	};
	function onError(){
		navigator.notification.beep(1);
		navigator.notification.alert(
			'Location failed!',
			null,
			'ERROR',
			'OK'
        );
	};
	function cameraSuccess(imageURI){
		navigator.notification.alert(
			'Picture added!',
			getFS(imageURI),
			'SUCCESS',
			'OK'
        );
	};
	function cameraError(){
		navigator.notification.beep(1);
		navigator.notification.alert(
			'Picture failed!',
			null,
			'ERROR',
			'OK'
        );
	};
	/* Get Native Features */
	function addPic(){
		function takePic(){
			navigator.camera.getPicture( cameraSuccess, cameraError, { quality: 50, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: false });
		};
		function removeOld(){
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getDir, function(error){fail(error, 'Get File System')});
			function getDir(fs) {
	    		fs.root.getDirectory('Epics', {create: false, exclusive: false}, getImage, function(error){fail(error, 'Get Directory')});
	    		function getImage(dir){
	    			dir.getFile(currentIMG, {create: false, exclusive: false}, delImage, function(error){fail(error, 'Get Image')});
	        		function delImage(image){
	        			currentIMG = '';
	        			image.remove(takePic, function(error){fail(error, 'Remove Image')});
	        		};
	        	};
	        };
		};
		function newPic(buttonIndex){
			if(buttonIndex === 1){
				removeOld();
			} else {
				alert('Picture not added!');
			};
		};	
		if(gei('iName').value === ''){
			navigator.notification.beep(2);
			alert('Please enter item name first');
		} else {
			if(currentIMG === ''){
				takePic();
			} else {
				navigator.notification.confirm(
	            'Replace existing picture with a new one?',
	            newPic,
	            'Confirm Picture',
	            'Yes,No'
	        	);
			};
		};
	};
	function addLoc(){
		navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true, maximumAge: Infinity, timeout: 15000 });
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
		var id 		= currentIMG;
		item 		= {};
		item.name	= [gei('iName').value];
		item.main	= [gei('iMStat').value];
		item.stat2	= [gei('iStat2').value];
		item.stat3	= [gei('iStat3').value];
		item.stat4	= [gei('iStat4').value];
		item.loc	= [gei('tLoc').innerHTML];
    	currentIMG = '';
	    localStorage.setItem(id, JSON.stringify(item));
	    navigator.notification.alert(
			'Item saved to stash!',
			refreshHome,
			'SUCCESS',
			'OK'
        );
        
	};
	/* Edit Item */
	function editItem(){
		newItem();
		/* Add Stats */
		var key = this.key;
			item = localStorage.getItem(key);
			iVal = JSON.parse(item);
		gei('iName').value = iVal.name[0];
		gei('tName').innerHTML = iVal.name[0];
		gei('iMStat').value = iVal.main[0];
		gei('tMStat').innerHTML = iVal.main[0];
		gei('iStat2').value = iVal.stat2[0];
		gei('tStat2').innerHTML = iVal.stat2[0];
		gei('iStat3').value = iVal.stat3[0];
		gei('tStat3').innerHTML = iVal.stat3[0];
		gei('iStat4').value = iVal.stat4[0];
		gei('tStat4').innerHTML = iVal.stat4[0];
		gei('tLoc').innerHTML = iVal.loc[0];
		/* Add Picture */
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getDir, function(error){fail(error, 'Get File System')});
		function getDir(fs) {
    		fs.root.getDirectory('Epics', {create: false, exclusive: false}, getImage, function(error){fail(error, 'Get Directory')});
    		function getImage(dir){
    			dir.getFile(key, {create: false, exclusive: false}, addImage, function(error){fail(error, 'Get Image')});
        		function addImage(image){
        			gei('tPic').innerHTML = '<img alt="Your Item" src="' + image.fullPath + '?time=' + new Date().getTime() + '"></img>'
					currentIMG = key;
				};
        	};
        };
	};
	/* Delete Item */
	function deleteItem(){
		var key = this.key
		navigator.notification.confirm(
            'Delete this item?',
            deleteConfirm,
            'Confirm Delete',
            'Yes,No'
    	);
    	function deleteConfirm(buttonIndex){
    		if(buttonIndex === 1){
				localStorage.removeItem(key);
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getDir, function(error){fail(error, 'Get File System')});
				function getDir(fs) {
		    		fs.root.getDirectory('Epics', {create: false, exclusive: false}, getImage, function(error){fail(error, 'Get Directory')});
		    		function getImage(dir){
		    			dir.getFile(key, {create: false, exclusive: false}, delImage, function(error){fail(error, 'Get Image')});
		        		function delImage(image){
		        			image.remove(delSuccess, function(error){fail(error, 'Remove Image')});
		        			function delSuccess(){
			        			alert('Item deleted!');
			        			stash();
		        			};
		        		};
		        	};
		        };
    		} else {
    			alert('Item deletion cancelled!');
    		};
    	};
    };
	/* Edit/Delete Listeners */
	function EDListen(){
		var eLink = gec('editButton');
		for(var i = 0, l=eLink.length; i<l; i++){
			eLink[i].addEventListener('click', editItem);
		};
		var dLink = gec('delButton');
		for(var d = 0, k=dLink.length; d<k; d++){
			dLink[d].addEventListener('click', deleteItem);
		};
	};
	
	/* Populate Stash */
	function popStash(){
		/* Image Adder */
		function getStashImage(key, imgDiv){
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getDir, function(error){fail(error, 'Get File System')});
			function getDir(fs) {
	    		fs.root.getDirectory('Epics', {create: false, exclusive: false}, getImage, function(error){fail(error, 'Get Directory')});
	    		function getImage(dir){
	    			dir.getFile(key, {create: false, exclusive: false}, popImage, function(error){fail(error, 'Get Image')});
	        		function popImage(image){
	        			imgDiv.innerHTML = '<img alt="Your Item" src="' + image.fullPath + '?time=' + new Date().getTime() + '"></img>'
	        		};
	        	};
	        };
    	};
		for(i=0, l=localStorage.length; i<l; i++) {
            /* Create Div for Item */
			var iDiv = document.createElement('div');
			if (i%2 === 0){
				gei('lList').appendChild(iDiv);
			} else {
				gei('rList').appendChild(iDiv);
			};
			/* Get Item Info */
			var key = localStorage.key(i);
			var	value = localStorage.getItem(key);
			var	epic = JSON.parse(value);
            /* Item Name */
            var nameH2 = document.createElement('h2');
            nameH2.innerHTML = epic.name[0];
            iDiv.appendChild(nameH2);
            /* Create Div for Image */
			var imgDiv = document.createElement('div');
			iDiv.appendChild(imgDiv);
			iDiv.style.margin = '0 0 3.5em 0';
			/* Add Image */
			getStashImage(key, imgDiv);
        	/* Add Stat1 */
            var statP1 = document.createElement('h3');
            statP1.innerHTML = epic.main[0];
            iDiv.appendChild(statP1);
            /* Add Stat2 */
            var statP2 = document.createElement('p');
            statP2.innerHTML = epic.stat2[0];
            iDiv.appendChild(statP2);
            /* Add Stat3 */
            var statP3 = document.createElement('p');
            statP3.innerHTML = epic.stat3[0];
            iDiv.appendChild(statP3);
            /* Add Stat4 */
            var statP4 = document.createElement('p');
            statP4.innerHTML = epic.stat4[0];
            iDiv.appendChild(statP4);
            /* Add Location */
            var loc = document.createElement('p');
            loc.innerHTML = epic.loc[0];
            iDiv.appendChild(loc);
            /* Add Edit/Delete */
            var 
            	edit = document.createElement('div'),
            	del = document.createElement('div');
            iDiv.appendChild(edit);
            iDiv.appendChild(del);
            edit.key = key;
            edit.className = 'editButton';
            edit.innerHTML = '<p>Edit</p>'
            del.key = key;
            del.className = 'delButton';
            del.innerHTML = '<p>Delete</p>'
    	};
	};
	/* Clear Stash */
	function clearStash(buttonIndex){
		if(buttonIndex === 1){
			function clearSuccess(){
				alert('All items cleared from stash!')
				refreshHome();
			};
			localStorage.clear();
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getDir, function(error){fail(error, 'Get File System')});
			function getDir(fs) {
	    		fs.root.getDirectory('Epics', {create: false, exclusive: false}, deleteDir, function(error){fail(error, 'Get Directory')});
	    		function deleteDir(dir){
	    			dir.removeRecursively(clearSuccess, function(error){fail(error, 'Remove Directory')});
	        	};
	        };
        } else {
        	alert('Stash clearing cancelled!');
        };
	};
	/* Confirm Clear */
	function confClear(){
		navigator.notification.confirm(
            'Clear all items from stash?',
            clearStash,
            'Confirm Clear',
            'Yes,No'
        );
	};
	/* Display Toggles */
	function newItem(){
		gei('home').style.display = 'none';
		gei('stash').style.display = 'none';
		gei('newItem').style.display = '';
		gei('backHome').style.display = '';
		gei('tPic').innerHTML = '';
		currentIMG = '';
	};
	function stash(){
		gei('home').style.display = 'none';
		gei('stash').style.display = '';
		gei('backHome').style.display = '';
		gei('clear').style.display = '';
		gei('lList').innerHTML = '';
		gei('rList').innerHTML = '';
		popStash();
		EDListen();
	};
	function goHome(){
		gei('home').style.display = '';
		gei('newItem').style.display = 'none';
		gei('stash').style.display = 'none';
		gei('backHome').style.display = 'none';
		gei('clear').style.display = 'none';
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
	
	var si = gei('saveItem');
	si.addEventListener('click', saveItem);
	
	var clr = gei('clear');
	clr.addEventListener('click', confClear);
};	
document.addEventListener("deviceready", onDeviceReady());