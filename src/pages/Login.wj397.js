// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import { authentication } from 'wix-members-frontend';

$w.onReady(function () {

	// Write your Javascript code here using the Velo framework API

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