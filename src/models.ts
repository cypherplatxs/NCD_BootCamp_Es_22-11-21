import { PersistentMap } from "near-sdk-core";

export enum Status {
	voting,
	financing,
	reached
}


@nearBindgen
export class Project {
	id: string;
	title: string;
	description: string;
	status: Status;
	votes: i32;
	fundingGoal: i32;
	funds: i32;
	voters: Array<string>
	owner: string;

	constructor(
		id: string,
		title: string,
		description: string,
		fundingGoal: i32,
		owner: string
	) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.status = Status.voting;
		this.owner = owner;
		this.votes = 0;
		this.fundingGoal = 0;
		this.funds = 0;
		this.voters = new Array()

	}
}



/* STORAGE */
export let projectsForVoting = new PersistentMap<string, Project>("projectsForVoting")
export let projectsForVoting = new PersistentMap<string, Project>("projectsForVoting")
export let projectsForFinancing = new PersistentMap<string, Project>("projectsForFinancing")
export let projectsReached = new PersistentMap<string, Project>("projectsReached")