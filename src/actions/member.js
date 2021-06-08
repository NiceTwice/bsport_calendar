import api from "../tools/api";
import {memberDTOInput} from "../DTO/member";

export const fetchMembers = async (filters = {}) => {
  const response = await api.member.search(filters);

  return {
    ...response,
    results: response.results.map(r => memberDTOInput(r))
  }
}
