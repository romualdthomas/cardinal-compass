// The code in this file will load on every page of your site
import { authentication } from 'wix-members-frontend';

$w.onReady(function () {
	// Write your code here

	const isLoggedIn = authentication.loggedIn();

	if (isLoggedIn) {
		$w("#button81").show();
		$w("#button82").hide();
	} else {
		$w("#button81").hide();
		$w("#button82").show();
	}

	$w('#button81').onClick(() => {
  		authentication.logout();
		$w("#button81").hide();
		$w("#button82").show();
	});
	
});