// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import wixUsers from 'wix-users';
import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(function () {
    $w("#submit").onClick(() => {
        const email = $w("#email").value;
        const password = $w("#password").value;

        // Query the database collection for the entered username
        wixData.query("Users")
            .eq("email", email)
            .find()
            .then((results) => {
                console.log("Hello world!");
                console.log(results);
                if (results.items.length > 0) {
                    // Check if the password matches
                    if (results.items[0].password === password) {
                        // Log the user in
                        wixUsers.login(email, password)
                            .then(() => {
                                // Redirect to the home page
                                console.log("Hello world!");
                                wixLocation.to("/home-page");
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    } else {
                        // Display error message for incorrect password
                        $w("#generalErrMsg").text = "Incorrect password. Please try again.";
                    }
                } else {
                    // Display error message for username not found
                    $w("#generalErrMsg").text = "Username not found. Please register.";
                }
            })
            .catch((err) => {
                console.error(err);
            });
    });
});