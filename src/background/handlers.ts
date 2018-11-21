/**
 * Example handler, returns a message. Yay.
 * @returns {Promise<string>}
 */
export const exampleHandler = (): Promise<string> => {
	return Promise.resolve("I'm just an example handler... I don't do nothin'");
};
