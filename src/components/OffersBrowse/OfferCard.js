import React, {useCallback, useMemo, useState} from "react";
import {Card, CardBody, Button} from "reactstrap";
import moment from "moment";
import styled from "styled-components";
import {OfferDetailsModal} from "../modals/OfferDetailsModal";
import {Avatar} from "../common/Avatar";

const OverflowEllipsisText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const OfferCard = ({offer}) => {
  const date = useMemo(() => `${moment(offer.date_start).format('DD/MM/YYYY HH:mm')} - ${moment(offer.date_start).add(offer.duration, 'm').format('HH:mm')}`
    , [offer.date_start, offer.duration]);
  const [details, toggleShowDetails] = useState(false);

  const toggleDetails = useCallback(() => {
    toggleShowDetails(details => !details);
  }, []);

  return (
    <Card className="mb-2 position-relative" style={{borderBottomColor: offer.activity?.color, borderBottomWidth: 2}}>
      <Avatar className="position-absolute top-0 start-0 mt-1 ms-1" src={offer.coach?.photo} alt={"Coach photo"}/>
      <div
        className="card-img-top"
        style={{
          height: 200,
          backgroundImage: `url(${offer?.activity?.cover_main})`,
          backgroundSize: "cover"
        }}/>
      <CardBody>
        <h5>
          <OverflowEllipsisText title={offer.activity?.name}>
            {offer.activity?.name}
          </OverflowEllipsisText>
        </h5>
        <OverflowEllipsisText>
          <i className="far fa-calendar"></i>  <span title={date}>{date}</span>
        </OverflowEllipsisText>
        <OverflowEllipsisText>
          <i className="fas fa-location-arrow"></i> <span title={offer.establishment?.title}>{offer.establishment?.title}</span>
        </OverflowEllipsisText>
        <OverflowEllipsisText>
          <i className="fas fa-map-marker-alt"></i> <span title={offer.establishment?.address}>{offer.establishment?.address}</span>
        </OverflowEllipsisText>
        <OverflowEllipsisText>
          <i className="fas fa-user-tie"></i> <span title={offer.coach?.name}>{offer.coach?.name}</span>
        </OverflowEllipsisText>
        <OverflowEllipsisText>
          Level: <span title={offer.value}>{offer.level}</span>
        </OverflowEllipsisText>
        <OverflowEllipsisText>
          Reserved slots: {offer.validated_booking_count}/{offer.effectif}
        </OverflowEllipsisText>
        {details &&
        <OfferDetailsModal offer={offer} close={toggleDetails}/>}
        <Button size="sm" className="mt-2" onClick={toggleDetails}>Show details</Button>
      </CardBody>
    </Card>
  )
}

export default OfferCard;
