import api from "../tools/api";
import {coachDTOInput} from "../DTO/coach";

export const fetchCoachs = async (filters = {}) => {
  const response = await api.coach.search(filters);

  return {
    ...response,
    results: response.results.map(r => coachDTOInput(r))
  }
}

export const fetchCoach = async ({id}) => {
  const coach = await api.coach.get({id});

  return coachDTOInput(coach);
}
