import React from "react";

function AddressInfo({ info }) {
  return (
    <div>
      <div className="row">
        <div className="col">
          <h3> Address Details </h3>
          <h6> Address Id : {info.id} </h6>
          <h6> Address 1 : {info.address1} </h6>
          <h6> Address 2: {info.address2} </h6>
          <h6> Address 3 : {info.address3} </h6>
          <h6> Address 4: {info.address4} </h6>
          <h6> address 5: {info.address5} </h6>
          <h6> District: {info.district} </h6>
          <h6> State: {info.state} </h6>
          <h6> Country: {info.country} </h6>
          <h6> Mobile : {info.mobile} </h6>
          <h6> Created By : {info.createdBy} </h6>
          <h6> Modified By : {info.modifiedBy} </h6>
          <h6> Created Date : {info.createdDate} </h6>
          <h6> Modified Date : {info.modifiedDate} </h6>
        </div>
        <div className="col">
          <h3> Address Type Details </h3>
          <h6> Address Type ID : {info?.addressType.id} </h6>
          <h6>
            {" "}
            Address Type Short Desc: {info?.addressType.shortDescription}{" "}
          </h6>
          <h6>
            {" "}
            Address Type Long Desc : {info?.addressType.longDescription}
            {""}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default AddressInfo;
