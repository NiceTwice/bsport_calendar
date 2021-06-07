import api from "../tools/api";
import {offerDTOInput} from "../DTO/offer";
import {fetchCoach} from "./coach";
import {fetchEstablishment} from "./establishment";
import {fetchActivity} from "./activity";
import {fetchBookings} from "./booking";

export const fetchOffers = async (filters) => {
  const response = await api.offer.search({...filters});

  return {
    ...response,
    results: response.results.map(r => offerDTOInput(r))
  }
}

export const fetchOffersFull = async (filters) => {
  let offers = await fetchOffers(filters);

  offers.results = await Promise.all(offers.results.map(async (r) => {
    const [activity, coach, establishment, bookings] = await Promise.allSettled([
      fetchActivity({id: r.activity_id}),
      fetchCoach({id: r.coach_id}),
      fetchEstablishment({id: r.establishment_id}),
      fetchBookings({
        offer_id: r.id,
        page_size: r.effectif.length
      })
    ])

    r.activity = activity.status === 'fulfilled' ? activity.value : null;
    r.coach = coach.status === 'fulfilled' ? coach.value : null;
    r.establishment = establishment.status === 'fulfilled' ? establishment.value : null;
    r.bookings = bookings.status === 'fulfilled' ? bookings.value.results : [];

    return r;
  }));

  return offers;
}
