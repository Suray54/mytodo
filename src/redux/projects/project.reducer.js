import { ProjectActionTypes } from "./project.types";

const INITIAL_STATE = {
  projects: [],
  showAddProjects: false,
  showListProjects: true,
};

const projectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProjectActionTypes.SET_SHOW_PROJECT:
      return {
        ...state,
        showAddProjects: !state.showAddProjects,
      };
    case ProjectActionTypes.SET_PROJECT:
      return {
        ...state,
        projects: action.payload,
      };

    case ProjectActionTypes.SET_SHOW_PROJECTLIST:
      return {
        ...state,
        showListProjects: !state.showListProjects,
      };
    case ProjectActionTypes.CLEAR_PROJECT:
      return {
        ...state,
        projects: [],
      };
    default:
      return state;
  }
};

export default projectReducer;
