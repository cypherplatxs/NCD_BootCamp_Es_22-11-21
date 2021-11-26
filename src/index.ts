import { Context } from "near-sdk-as";
import {
	projectsForVoting,
	projectsForFinancing,
	projectsReached,
	Project,
	Status
} from "./models";

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

	projectsForVoting.push(
		new Project(projectsForVoting.length, title, description, fundingGoal, owner)
	);
}

/*
* getters
*/
export function getAllProjectsForVoting(): Array<Project> {
	const arr = projectsForVoting
	const length = arr.length
	const result = new Array<Project>(length);
	for (let i = 0; i < length; i++) {
		result[i] = arr[i];
	}
	return result;
}

export function getAllProjectsForFinancing(): Array<Project> {
	const arr = projectsForFinancing
	const length = arr.length
	const result = new Array<Project>(length);
	for (let i = 0; i < projectsForFinancing.length; i++) {
		result[i] = arr[i];
	}
	return result;
}

export function getAllProjectsReached(): Array<Project> {
	const arr = projectsReached
	const length = arr.length
	const result = new Array<Project>(length);
	for (let i = 0; i < length; i++) {
		result[i] = arr[i];
	}
	return result;
}

/*
* mutators
*/
export function voteProject(
	id: i32,
): Project {
	//TODO: avoid vote duplication usign map
	let project = projectsForVoting[id]
	project.voters.push(Context.sender)
	project.votes += 1
	if (project.votes >= 100) {
		project.status = Status.financing
		projectsForVoting.swap_remove(<i32>id)
		// TODO replace array w/ map
		projectsForFinancing.push(project)
		return project
	}
	projectsForVoting.replace(<i32>id, project)
	return project
}

export function fundProject(
	id: i32,
	amount: i32
): Project {
	//TODO: avoid vote duplication usign map
	let project = projectsForFinancing[id]
	// TODO: support funds transfer
	project.funds += amount
	if (project.funds >= project.fundingGoal) {
		project.status = Status.reached
		projectsForFinancing.swap_remove(<i32>id)
		// TODO replace array w/ map
		projectsReached.push(project)
		return project
	}
	projectsForFinancing.replace(<i32>id, project)
	return project
}

// TODO: support funds withdraw