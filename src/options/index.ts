import { ISettingsState, storeGetSettingsState, storeSetSettingsState } from "../store";


const radios: HTMLInputElement[] = Array.from(document.querySelectorAll("input[type=radio"));

// Grab save settings state and add event listeners to radios.
storeGetSettingsState().then((settings: ISettingsState) => {
	radios.forEach((r: HTMLInputElement) => {

		// Reflect stored settings
		if (r.id.includes(String(settings))) {
			r.checked = true;
		}

		// Clicking radios submits automatically
		r.addEventListener("click", (event) => {
			// @ts-ignore
			const id = event.target.id as string;
			// @ts-ignore
			settings = +id.split("-")[1];

			return storeSetSettingsState(settings);
		});
	});
}).catch(console.error);
