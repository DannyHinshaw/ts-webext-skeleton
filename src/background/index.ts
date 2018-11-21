import { createPort } from "./message";
import { changeUserAgentHeader, urls } from "./request";


/*     HTTPRequest Listeners
 =================================== */

browser.webRequest.onBeforeSendHeaders.addListener(
	changeUserAgentHeader,
	{ urls: [urls.mozilla] },
	["blocking", "requestHeaders"]
);

// Listen for message port connections
browser.runtime.onConnect.addListener(createPort);
