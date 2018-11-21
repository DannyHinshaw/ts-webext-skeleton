/*         Types, Interfaces & Exports
 ============================================= */

export interface IEventFlags {
	DATA_SENT: boolean
	MESSAGE: boolean
}


/*          Content Globals
 ==================================== */

export const EVENT_FLAGS: IEventFlags = {
	DATA_SENT: false,
	MESSAGE: false
};

export * from "./message";
