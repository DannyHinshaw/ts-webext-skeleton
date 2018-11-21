import { IMessageObject } from "../index";
import { handleSubmit } from "./handlers";
import { EVENT_FLAGS } from "./index";
import Port = browser.runtime.Port;


// Generate random uid for port
const uid: string = Math.random().toString(36).substring(5);
// @ts-ignore
export const contentPort: Port = browser.runtime.connect({ name: uid });


/*           Message Port Listeners
 ============================================== */

contentPort.onMessage.addListener((msgObj: IMessageObject) => {
	console.log("content::msgObj::", msgObj);
	const checkMsgKey = (msgKey: string) => msgObj.key.includes(msgKey);

	// Standard back and forth
	if (msgObj.data.includes("ping") && !EVENT_FLAGS.MESSAGE) {
		EVENT_FLAGS.MESSAGE = true;
		contentPort.postMessage({ data: "pong" });
	}

	// Catch submissions
	if (checkMsgKey("submit")) {
		handleSubmit(msgObj.data);
	}
});

// Standard logging
contentPort.onDisconnect.addListener((port: Port) => {
	if (port.error) {
		// @ts-ignore
		console.log(`Disconnected due to an error: ${port.error.message}`);
	}
});

contentPort.postMessage({ data: "pong" });
