import Port = browser.runtime.Port;
import { IMessageObject } from "../index";
import { exampleHandler } from "./handlers";


/*     Types & Interfaces
 =================================== */

export interface IPortsHash {
	[key: string]: Port
}

export interface IBGMessageFlags {
	DATA_SENT: boolean
}

/*      Messaging Ports Configuration
 ========================================== */

export const EVENT_FLAGS: IBGMessageFlags = {
	DATA_SENT: false
};

const ports: IPortsHash = {};


/**
 * Add message handlers to ports.
 * @param {browser.runtime.Port} p
 */
const registerMessageHandlers = (p: Port) => {
	p.onMessage.addListener((msgObj: IMessageObject) => {
		console.log("background::msgObj::", msgObj);
		const isPing: boolean = msgObj.data.includes("pong");

		if (isPing && !EVENT_FLAGS.DATA_SENT) {
			EVENT_FLAGS.DATA_SENT = true;
			p.postMessage({ data: "ping" });
		}

		if (!isPing) {
			exampleHandler()
				.then((msg: string) => console.log(msg))
				.then(() => p.postMessage({ key: "submit", data: "SOME DATA" }))
				.catch(console.error);
		}
	});

	p.onDisconnect.addListener((port: Port) => {
		if (port.error) {
			// @ts-ignore
			console.log(`Disconnected due to an error: ${port.error.message}`);
		}
	});

	return p;
};

/**
 * Register content-script ports and assign listeners.
 * @param {browser.runtime.Port} p
 * @returns {IPortsHash}
 */
export const createPort = (p: Port): Port => {
	if (p && p.sender && p.sender.tab && p.sender.tab.id) {
		ports[p.sender.tab.id] = p;

		return registerMessageHandlers(ports[p.sender.tab.id]);
	}

	return p;
};
