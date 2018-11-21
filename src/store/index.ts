import StorageObject = browser.storage.StorageObject;


/*            Types & Interfaces
 ============================================= */

export interface ISettingsState {
	settings: 1 | 2
}

export interface IExtensionState {
	extension: boolean
	settings: ISettingsState
	user: string
}


/*            Data Structures
 ============================================= */

export const state: IExtensionState = {
	extension: true,
	// @ts-ignore
	settings: 1,
	user: ""
};


/*        Store Operational Functions
 ============================================= */

/**
 * Initialize the local store.
 * @returns {Promise<browser.storage.StorageObject>}
 */
export const initStateStore = (): Promise<StorageObject> => {
	console.log("Initializing local state store");

	return browser.storage.local.get()
		.then((storedState: StorageObject) => {
			return Object.keys(storedState).length
				? storedState
				: browser.storage.local.set(state as unknown as StorageObject)
					.then(() => browser.storage.local.get());
		});
};

/**
 * Get the current state of the extension (off/on).
 * @returns {Promise<number>}
 */
export const storeGetExtensionState = (): Promise<boolean> => {
	return browser.storage.local.get("extension")
		.then((storedState: StorageObject) => {
			return storedState.extension as boolean;
		});
};

/**
 * Set current state of the extension (off/on).
 * @param {boolean} n
 * @returns {Promise<any>}
 */
export const storeSetExtensionState = (n: boolean): Promise<any> => {
	return browser.storage.local.get("extension")
		.then((storedState: StorageObject) => {
			const _state = storedState as unknown as IExtensionState;
			_state.extension = n;

			return browser.storage.local.set(_state as unknown as StorageObject)
				.then(() => _state);
		});
};

/**
 * Set current extension setting (all (prefer mine), agreed's, only mine).
 * @returns {Promise<number>}
 */
export const storeGetSettingsState = (): Promise<ISettingsState> => {
	return browser.storage.local.get("settings")
		.then((storedState: StorageObject) => {
			const _state = storedState as unknown as IExtensionState;
			return _state.settings;
		});
};

/**
 * Set current extension settings.
 * @param {ISettingsState} settings
 * @returns {Promise<any>}
 */
export const storeSetSettingsState = (settings: ISettingsState): Promise<any> => {
	return browser.storage.local.get("settings")
		.then((storedState: StorageObject) => {
			const _state = storedState as unknown as IExtensionState;
			_state.settings = settings;

			return browser.storage.local.set(_state as unknown as StorageObject)
				.then(() => _state);
		});
};

/**
 * Get current extension user.
 * @returns {Promise<any>}
 */
export const storeGetUser = (): Promise<string> => {
	return browser.storage.local.get("settings")
		.then((storedState: StorageObject) => {
			const _state = storedState as unknown as IExtensionState;
			return _state.user;
		});
};

/**
 * Set current extension user.
 * @param {string} u
 * @returns {Promise<any>}
 */
export const storeSetUser = (u: string): Promise<any> => {
	return browser.storage.local.get("user")
		.then((storedState: StorageObject) => {
			const _state = storedState as unknown as IExtensionState;
			_state.user = u;

			return browser.storage.local.set(_state as unknown as StorageObject)
				.then(() => _state);
		});
};


/*             Initialize store
 ============================================= */

initStateStore().then((res: StorageObject) => {
	const storedState = res as unknown as IExtensionState;
	console.info("State store initialized:", storedState);

	return res as unknown as IExtensionState;
}).catch(err => {
	console.error("Error initializing StateStore:", err);
});
