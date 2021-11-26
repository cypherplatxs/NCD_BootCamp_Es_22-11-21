import { Context, PersistentMap } from "near-sdk-as";
import {
	projectsForVoting,
	projectsForFinancing,
	projectsReached,
	Project,
	Status
} from "./models";

/*
* Helpers
*/
function getNewProjectId(blockNumber: u64, owner: string): string {
	return blockNumber.toString().concat("@").concat(owner)
}

/*
* setters
*/
export function createProject(
	title: string,
	description: string,
	fundingGoal: i32,
	owner: string
): void {
	// TODO: make better validations
	assert(title.length > 0, "debes incluir un titulo")
	assert(description.length > 0 && description.length < 50, 'Incluye una descripcion corta')
	let projectId = getNewProjectId(Context.blockIndex, owner)
	projectsForVoting.set(
		projectId,
		new Project(projectId, title, description, fundingGoal, owner)
	);
}

/*
* getters
*/
export function getAllProjectsForVoting(): PersistentMap<string, Project> {
	// const arr = projectsForVoting
	// const length = arr.length
	// const result = new Array<Project>(length);
	// for (let i = 0; i < length; i++) {
	// 	result[i] = arr[i];
	// }
	return projectsForVoting;
}

export function getAllProjectsForFinancing(): PersistentMap<string, Project> {
	// const arr = projectsForFinancing
	// const length = arr.length
	// const result = new Array<Project>(length);
	// for (let i = 0; i < projectsForFinancing.length; i++) {
	// 	result[i] = arr[i];
	// }
	return projectsForFinancing;
}

export function getAllProjectsReached(): PersistentMap<string, Project> {
	// const arr = projectsReached
	// const length = arr.length
	// const result = new Array<Project>(length);
	// for (let i = 0; i < length; i++) {
	// 	result[i] = arr[i];
	// }
	return projectsReached;
}

/*
* mutators
*/
export function voteProject(
	id: string,
): Project | null {
	//TODO: avoid vote duplication usign map
	let project = projectsForVoting.get(id)
	if (!project) {
		return null
	}
	project.voters.push(Context.sender)
	project.votes += 1
	if (project.votes >= 100) {
		project.status = Status.financing
		projectsForVoting.delete(id)
		// TODO replace array w/ map
		projectsForFinancing.set(project.id, project)
		return project
	}
	projectsForVoting.set(id, project)
	return project
}

export function fundProject(
	id: string,
	amount: i32
): Project | null {
	//TODO: avoid vote duplication usign map
	let project = projectsForFinancing.get(id)
	if (!project) {
		return null
	}
	// TODO: support funds transfer
	project.funds += amount
	if (project.funds >= project.fundingGoal) {
		project.status = Status.reached
		projectsForFinancing.delete(id)
		// TODO replace array w/ map
		projectsReached.set(project.id, project)
		return project
	}
	projectsForFinancing.set(project.id, project)
	return project
}

// TODO: support funds withdraw