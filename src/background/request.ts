
/*            Types & Interfaces
 ============================================= */

interface IHeader {
	name: string,
	value: string
}

/*            HTTP Requests
 ========================================== */

const ua = "Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16";

export const urls = {
	mozilla: "https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions"
};

/**
 * Adds nginx authorization header to acdb requests.
 * @param e
 * @returns {{requestHeaders: IHeader[]}}
 */
export const changeUserAgentHeader = (e) => {
	const requestHeaders = e.requestHeaders.map((h: IHeader) => {
		if (h.name.toLowerCase() === "user-agent") {
			console.log("Setting user-agent header:", ua);
			h.value = ua;
		}
		return h;
	});

	return { requestHeaders };
};
