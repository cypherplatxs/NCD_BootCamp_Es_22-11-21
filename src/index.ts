import { Context } from "near-sdk-as";
import {
	projectsForVoting,
	projectsForFinancing,
	projectsReached,
	Project, Status
} from "./models";

export function createProject(
	title: string,
	description: string,
): void {
	// TODO: make better verifications
	assert(title.length > 0, "debes incluir un titulo")
	assert(description.length > 0 && description.length < 50, 'Incluye una descripcion corta')

	projectsForVoting.push(
		new Project(Project.length, title, description)
	);
}

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

export function avalProject(
	id: i32,
	amount: i32,
): Project {
	assert(<i32>amount > 0, "debes incluir al menos 1 near")
	let project = Project[id]
	project.avalCount += amount
	Project.replace(<i32>id, project)
	return project
}

export function changeStatus(id: i32): Project {
	let project = Project[id]
	project.status = Status.goal_reached
	Project.replace(<i32>id, project)
	return project
}

export function eliminateProject(id: i32): void {
	assert(id >= 0, "No tenemos contratos con id negativos")
	Project.swap_remove(<i32>id)
}