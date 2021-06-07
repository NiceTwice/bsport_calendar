import React, {useCallback, useState} from "react";
import {DateInput} from "./DateInput";
import {Col, Container} from "reactstrap";
import {useISOState} from "../tools/hooks";
import {fetchOffersFull} from "../actions/offer";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroller";
import OfferCard from "./OfferCard";

const defaultState = {
  offers: [],
  total: 0,
  size: 10,
  page: 0,
  fetching: false
};

export const OffersBrowse = () => {
  const [dates, setDates] = useState([new Date(), new Date()]);
  const [{
    offers,
    total,
    size,
    page,
    fetching
  }, setState] = useISOState(defaultState);

  const handleDateChange = useCallback((value) => {
    if (value.length === 2){
      setDates(value);
      setState({
        page: 0,
        offers: [],
        total: 0
      })
    }
  }, []);

  const loadMore = useCallback(async () => {
    setState({fetching: true});

    let result = await fetchOffersFull({
      min_date: moment(dates[0]).format('YYYY-MM-DD'),
      max_date: moment(dates[1]).format('YYYY-MM-DD'),
      page: page + 1,
      page_size: size
    });

    setState({
      total: result.count,
      page: page + 1,
      offers: [...offers, ...result.results],
      fetching: false
    });
  },[offers, total]);

  return (
    <Container className="d-flex flex-column overflow-auto">
      <h3>Search for activities</h3>
      <div className="mb-3">
        <DateInput
          value={dates}
          onChange={handleDateChange}/>
      </div>
      <Container fluid style={{overflowY: 'auto'}}>
        <InfiniteScroll
          pageStart={0}
          element={'div'}
          initialLoad={true}
          className={'row'}
          hasMore={!fetching && (total > offers.length || page === 0)}
          loadMore={loadMore}
          loader={null}
          threshold={30}
          useWindow={false}>
          {offers.map(offer => {
            return (
              <Col key={offer.id} sm={4}>
                <OfferCard offer={offer}/>
              </Col>
            )
          })}
          {fetching && <div>Chargement...</div>}
        </InfiniteScroll>
      </Container>
    </Container>
  )
}

export default OffersBrowse;
