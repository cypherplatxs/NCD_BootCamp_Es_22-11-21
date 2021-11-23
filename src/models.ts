import { PersistentVector } from "near-sdk-core";

export enum Status {
	voting,
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
	fundingGoal: i32;
	funds: u64;
	voters: Array<string>
	owner: string;

	constructor(
		id: u64,
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
export let projectsForVoting = new PersistentVector<Project>("projectsForVoting")
export let projectsForFinancing = new PersistentVector<Project>("projectsForFinancing")
export let projectsReached = new PersistentVector<Project>("projectsReached")