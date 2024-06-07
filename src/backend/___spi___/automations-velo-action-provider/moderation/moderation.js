/**
 * Autocomplete function declaration, do not delete
 * @param {import('./__schema__.js').Payload} options
 */
import wixData from 'wix-data';
import {fetch} from 'wix-fetch';
import { Permissions, webMethod } from 'wix-web-module';
import { notifications } from 'wix-crm-backend';

export const invoke = async ({payload}) => {
  const message = JSON.parse(payload.postMessage)
  const messageUrl = payload.postUrl
  const toInsert = {
    "username": payload.contact.name.first,
    "post" : message.blocks[0].text,
  };

  // Insert the customer data into our site collection
  // of contact data for plan purchasers
  try {
    const results = await wixData.insert('UserPosts', toInsert);
    console.log('Data inserted successfully:', results._id); // Log the ID of the inserted item
  } catch (error) {
    console.error('Error inserting data:', error);
    // Handle the error
  }

const content = String(message.blocks[0].text)
const options = {
  method: 'POST',
  headers: {
    Authorization: 'Bearer proj_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjI1ODc4M2I5ODc2NGQ1M2YyNzM1ZCIsInVzZXJJZCI6IjY2NjI1ODEyZjYzMmE3NTYxOGI0ZTEyYSIsInRpbWVzdGFtcCI6MTcxNzcyMTIwODE2NSwiaWF0IjoxNzE3NzIxMjA4fQ.V0VYh2v5dUHUCId_TsEKGHZBFQrcffZSZ87eMaXZGnE',
    'Content-Type': 'application/json'
  },
  body: `{"value": "${content}" }`
};

fetch('https://moderationapi.com/api/v1/moderate/text', options)
  .then(response => response.json())
  .then(response => {
    if (response.toxicity.label != "NEUTRAL" || response.nsfw.label == "UNSAFE") {
      notifyOwnerOnDashboard()
    }
  })
  .catch(err => console.error(err));

const notifyOwnerOnDashboard = webMethod(Permissions.Anyone, () => {
  notifications.notify(
    "Notification body",
    ["Dashboard", "Browser", "Mobile"],
    {
      "title": "Review Group Post",
      "actionTitle": "Review this flagged post!",
      "actionTarget": { "url": String(messageUrl) },
      "recipients": { "role": "All_Contributors" }
    }
  );
});

  return {}; // The function must return an empty object
}