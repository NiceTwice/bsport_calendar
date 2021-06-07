import api from "../tools/api";
import {activityDTOInput} from "../DTO/activity";

export const fetchActivities = async (filters = {}) => {
  const response = await api.metaActivity.search(filters);

  return {
    ...response,
    results: response.results.map(r => activityDTOInput(r))
  }
}

export const fetchActivity = async ({id}) => {
  const activity = await api.metaActivity.get({id});

  return activityDTOInput(activity);
}
