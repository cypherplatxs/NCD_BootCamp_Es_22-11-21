import { PersistentVector } from "near-sdk-core";

export enum Status {
	voting,
	rejected,
	approved,
	financing,
	reached
}


@nearBindgen
export class Project {
	id: u64
	title: string;
	description: string;
	status: Status;
	votes: u64;
	voters: Array<string>

	constructor(
		id: u64,
		title: string,
		description: string
	) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.status = Status.growing;
		this.avalCount = 0;
		this.voters = new Array()
	}
}



/* STORAGE */
export let projectsForVoting = new PersistentVector<Project>("projectsForVoting")
export let projectsForFinancing = new PersistentVector<Project>("projectsForFinancing")
export let projectsReached = new PersistentVector<Project>("projectsReached")