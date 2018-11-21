/**
 * Send message to window for scripts to intercept, then reload.
 * @param {string} data
 */
export const handleSubmit = (data: string) => {
	// Send a message to the window object
	const windowMessage = { from: "EXTENSION", text: "data::" + data };
	window.postMessage(windowMessage, "*");
};


