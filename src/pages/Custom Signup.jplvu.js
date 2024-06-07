import wixUsers from 'wix-users';
import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(function () {
    $w("#button3").onClick(() => {
        const firstName = $w("#input4").value;
        const email = $w("#input3").value;
        const password = $w("#input2").value;

        // Query the database to check if the email is already registered
        wixData.query("Users")
            .eq("email", email)
            .find()
            .then((results) => {
                if (results.items.length == 0) {
                    // Check if the email is valid
                    if (validateEmail(email)) {
                        // Insert user data into the database collection
                        console.log("Hello world!");
                        wixData.insert("Users", {
                            firstName: firstName,
                            email: email,
                            password: password
                        })
                        .then(() => {
                            // Register the user
                            wixUsers.register(email, password, {
                                contactInfo: {
                                    firstName: firstName,
                                    email: email,
                                    password: password
                                }
                            })
                            .then(() => {
                                // Redirect to the home page
                                wixLocation.to("/home-page");
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                    } else {
                        // Display error message for invalid email
                        $w("#text48").text = "Invalid email. Please enter a valid email address.";
                    }
                } else {
                    // Display error message for already registered email
                    $w("#text48").text = "Email already registered. Please choose a different email.";
                }
            })
            .catch((err) => {
                console.error(err);
            });
    });

    // Event handler for the "Already a member? Log In" button
    $w("#text49").onClick(() => {
        // Redirect to the login page
        wixLocation.to("/login-page");
    });
});

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domain = "@stanford.edu";
    return emailRegex.test(email) && email.endsWith(domain);
}