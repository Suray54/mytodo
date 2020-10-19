import { createSelector } from "reselect";

const selectProject = (state) => state.project;

export const showAddProjects = createSelector(
  [selectProject],
  (project) => project.showAddProjects
);
export const selectAllProject = createSelector(
  [selectProject],
  (project) => project.projects
);

export const showListProjects = createSelector(
  [selectProject],
  (project) => project.showListProjects
);
