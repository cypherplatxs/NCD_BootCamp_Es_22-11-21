import { PersistentVector } from "near-sdk-core";

export enum Status {
	growing,
	goal_reached,
}


@nearBindgen
export class ProjectsForAval {
	id: u64
	title: string;
	description: string;
	status: Status;
	avalCount: u64;

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
	}
}



/* STORAGE */
export let projects = new PersistentVector<ProjectsForAval>("project")