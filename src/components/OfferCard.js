import React, {useMemo} from "react";
import {Card, CardBody} from "reactstrap";
import moment from "moment";
import styled from "styled-components";

const OverflowEllipsisText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const OfferCard = ({offer}) => {
  const date = useMemo(() => `${moment(offer.date_start).format('DD/MM/YYYY HH:mm')} - ${moment(offer.date_start).add(offer.duration, 'm').format('HH:mm')}`, [offer])

  return (
    <Card className="mb-2" style={{borderBottomColor: offer.activity?.color, borderBottomWidth: 2}}>
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
          <i className="fas fa-map-marker-alt"></i> <span title={offer.establishment?.address}>{offer.establishment?.address}</span>
        </OverflowEllipsisText>
        <OverflowEllipsisText>
          <i className="fas fa-user-tie"></i> <span title={offer.coach?.name}>{offer.coach?.name}</span>
        </OverflowEllipsisText>
        <OverflowEllipsisText>
          Level: <span title={offer.value}>{offer.level}</span>
        </OverflowEllipsisText>
        <OverflowEllipsisText>
          Slots: {offer.validated_booking_count}/{offer.effectif}
        </OverflowEllipsisText>
      </CardBody>
    </Card>
  )
}

export default OfferCard;
