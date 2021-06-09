import React, {useCallback, useEffect, useState} from "react";
import {Button, FormGroup, Modal, ModalBody, ModalHeader, ModalFooter} from "reactstrap";
import {fetchMembers} from "../../actions/member";
import {Avatar} from "../common/Avatar";

export const OfferDetailsModal = ({offer, close}) => {
  const [open, setOpen] = useState(true);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    (async () => {
      let members = await fetchMembers({offer_id: offer.id, page_size: offer.effectif});

      setMembers(members.results);
    })()
  }, []);

  //to wait modal closing animation finished
  const closing = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClose = useCallback(() => {
    close();
  }, []);

  return (
    <Modal
      onClosed={handleClose}
      isOpen={open}
      unmountOnClose={true}
      toggle={closing}>
      <ModalHeader>
        {offer.activity?.name}
      </ModalHeader>
      <ModalBody>
        <FormGroup className="mb-3">
          {offer.activity?.description}
        </FormGroup>
        <FormGroup className="mb-3">
          <h6>Teacher</h6>
          <div className="d-flex align-items-center">
            <Avatar src={offer.coach?.photo} className="me-2" alt={"Coach photo"}/>
            <span>{offer.coach?.name}</span>
          </div>
        </FormGroup>
        <FormGroup className="mb-3">
          <h6>{offer.establishment?.title}</h6>
          <div>
            {offer.establishment?.specific_info}
          </div>
        </FormGroup>
        <FormGroup className="mb-3">
          <h6>Address</h6>
          <div>
            {offer.establishment?.address}
          </div>
        </FormGroup>
        <FormGroup>
          <h6>Registered members</h6>
          <div>
            {!members.length &&
            'There is no registered members...'}
            {!!members.length &&
            members.map(m => {
              return (
                <div key={m.id}>
                  {m.name}
                </div>
              )
            })}
          </div>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button onClick={closing}>Got it</Button>
      </ModalFooter>
    </Modal>
  )
}

export default OfferDetailsModal;
