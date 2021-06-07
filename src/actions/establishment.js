import api from "../tools/api";
import {establishmentDTOInput} from "../DTO/establishment";

export const fetchEstablishments = async (filters = {}) => {
  const response = await api.establishment.search(filters);

  return {
    ...response,
    results: response.results.map(r => establishmentDTOInput(r))
  }
}

export const fetchEstablishment = async ({id}) => {
  const establishment = await api.establishment.get({id});

  return establishmentDTOInput(establishment);
};
