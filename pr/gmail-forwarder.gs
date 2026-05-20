/**
 * PR Auto-Pilot — Gmail Forwarder (Google Apps Script)
 *
 * SETUP:
 * 1. Go to script.google.com, create a new project
 * 2. Paste this code
 * 3. Fill in the CONFIG variables below
 * 4. Run setup() once to authorize
 * 5. Add a time trigger: every 5 minutes -> checkPREmails()
 *
 * One script per assistant user (each has their own USER_ID/USER_EMAIL)
 */

const CONFIG = {
  WEBHOOK_URL: "https://anamorrison.com/api/pr-autopilot/webhook",
  WEBHOOK_SECRET: "REPLACE_WITH_PR_AUTOPILOT_WEBHOOK_SECRET",
  USER_ID: "REPLACE_WITH_USER_UUID_FROM_PR_USERS_TABLE",
  USER_EMAIL: "REPLACE_WITH_ASSISTANT_EMAIL",

  // PR platforms senders
  PR_PLATFORMS: [
    { label: "HARO/Featured", from: ["haro@helpareporter.com", "noreply@featured.com"] },
    { label: "Qwoted", from: ["queries@qwoted.com"] },
    { label: "Connectively", from: ["queries@connectively.us", "noreply@connectively.us"] },
    { label: "Source of Sources", from: ["queries@sourceofsources.com"] },
    { label: "JournoRequests", from: ["queries@journorequests.com"] },
  ],

  // Label to mark processed emails
  PROCESSED_LABEL: "PR-AutoPilot-Processed",
};

function setup() {
  GmailApp.createLabel(CONFIG.PROCESSED_LABEL);
  Logger.log("Setup complete. Now add a time trigger for checkPREmails() every 5 minutes.");
}

function checkPREmails() {
  const processedLabel = GmailApp.getUserLabelByName(CONFIG.PROCESSED_LABEL);

  CONFIG.PR_PLATFORMS.forEach(function(platform) {
    platform.from.forEach(function(senderEmail) {
      const threads = GmailApp.search(
        `from:${senderEmail} -label:${CONFIG.PROCESSED_LABEL} newer_than:1d`,
        0, 20
      );

      threads.forEach(function(thread) {
        const messages = thread.getMessages();
        messages.forEach(function(msg) {
          forwardToPRAutopilot(msg, platform.label);
        });
        thread.addLabel(processedLabel);
      });
    });
  });
}

function forwardToPRAutopilot(msg, platformLabel) {
  const payload = {
    from: msg.getFrom(),
    subject: msg.getSubject(),
    body: msg.getPlainBody().substring(0, 5000),
    platform: platformLabel,
    userId: CONFIG.USER_ID,
    userEmail: CONFIG.USER_EMAIL,
    receivedAt: msg.getDate().toISOString(),
  };

  const options = {
    method: "post",
    contentType: "application/json",
    headers: { "x-webhook-secret": CONFIG.WEBHOOK_SECRET },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  try {
    const response = UrlFetchApp.fetch(CONFIG.WEBHOOK_URL, options);
    Logger.log(`Forwarded: ${msg.getSubject()} | Status: ${response.getResponseCode()}`);
  } catch(e) {
    Logger.log(`Error forwarding: ${msg.getSubject()} | ${e.toString()}`);
  }
}
