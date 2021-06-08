import api from "../tools/api";
import {offerDTOInput} from "../DTO/offer";
import {fetchCoachs} from "./coach";
import {fetchEstablishments} from "./establishment";
import {fetchActivities} from "./activity";

export const fetchOffers = async (filters) => {
  const response = await api.offer.search({...filters});

  return {
    ...response,
    results: response.results.map(r => offerDTOInput(r))
  }
}

export const fetchOffersFull = async (filters) => {
  let offers = await fetchOffers(filters);

  const [activities, establishments, coachs] = await Promise.all([
    fetchActivities({
      ids: offers.results.map(i => i.activity_id),
      page_size: offers.results.length
    }),
    fetchEstablishments({
      ids: offers.results.map(i => i.establishment_id),
      page_size: offers.results.length
    }),
    fetchCoachs({
      ids: offers.results.map(i => i.coach_id),
      page_size: offers.results.length
    })
  ])

  offers.results = offers.results.map(offer => {
    return {
      ...offer,
      activity: activities.results.find(i => i.id === offer.activity_id),
      coach: coachs.results.find(i => i.id === offer.coach_id),
      establishment: establishments.results.find(i => i.id === offer.establishment_id)
    }
  });

  return offers;
}
