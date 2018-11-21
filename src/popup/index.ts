import { IExtensionState, storeGetExtensionState, storeSetExtensionState } from "../store";
import "./popup.scss";


const togglePower = document.querySelector("input[type=checkbox]")! as HTMLInputElement;

//  Display current state
storeGetExtensionState().then((state: boolean) => togglePower.checked = state);

// Listener for toggling state
togglePower!.addEventListener("click", (e) => {
	// @ts-ignore
	const checkbox: HTMLInputElement = e.target;

	storeSetExtensionState(checkbox.checked)
		.then((state: IExtensionState) => {
			console.log("extension_state::", state.extension);
		});
});
