import api from "../tools/api";
import {bookingDTOInput} from "../DTO/booking";

export const fetchBookings = async (filters = {}) => {
  const response = await api.booking.search(filters);

  return {
    ...response,
    results: response.results.map(r => bookingDTOInput(r))
  }
}
