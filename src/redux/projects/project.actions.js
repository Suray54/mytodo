import { ProjectActionTypes } from "./project.types";

export const setShowAddProjects = () => ({
  type: ProjectActionTypes.SET_SHOW_PROJECT,
});
export const setProject = (projects) => ({
  type: ProjectActionTypes.SET_PROJECT,
  payload: projects,
});
export const clearProject = () => ({
  type: ProjectActionTypes.CLEAR_PROJECT,
});
export const setShowListProjects = () => ({
  type: ProjectActionTypes.SET_SHOW_PROJECTLIST,
});
