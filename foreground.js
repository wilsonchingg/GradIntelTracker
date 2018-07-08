$(document).ready(()=>{
	if(!sessionStorage.getItem('lastUpdated')){
		console.log('GradIntelTracker: Initialize session storage');
		sessionStorage.setItem('lastUpdated', $('.document-summary-doc-part > p').text());
	}
	if(sessionStorage.getItem('lastUpdated') === $('.document-summary-doc-part > p').text()){
		console.log('GradIntelTracker: Refreshing in 5 minutes');
		setTimeout(function(){
			location.reload();
		}, 30000);
	}
	else{
		console.log('GradIntelTracker: UPDATED');
		alert('UPDATED')
	}
});
