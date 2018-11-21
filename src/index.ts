/*     Global Types & Interfaces
 =================================== */

export interface IMyInterface {
	creator: "danny hinshaw"
}

export interface IMessageObject {
	data: string
	key: string
}


/*     Global Util Functions
 =================================== */

/**
 * Convert name to Title Case.
 * @param {string} name
 * @returns {string}
 */
export const formatCreatorName = (name: string) => {
	return name.replace(/\w\S*/g, (txt: string) => {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	})
};
