import React from "react";

function TeacherInfo({ info }) {
  return (
    <div>
      <div className="row">
        <div className="col">
          <h3> Teacher Details </h3>
          <h6> Teacher Id : {info?.id} </h6>
          <h6> Teacher Code : {info?.teacherCode} </h6>
          <h6> Teacher Name : {info?.teacherName} </h6>
          <h6> Teacher Graduation : {info?.graduation} </h6>
          <h6> Teacher Specialisation : {info?.specilisation} </h6>
          {/* <h6> Created By : {info?.createdBy} </h6>
          <h6> Modified By : {info?.modifiedBy} </h6>
          <h6> Created Date : {info?.createdDate} </h6>
          <h6> Modified Date : {info?.modifiedDate} </h6> */}
        </div>
        <div className="col">
          <h3> Company Details </h3>
          <h6> Company ID : {info?.company?.id} </h6>
          <h6> Company Code : {info?.company?.companyCode} </h6>
          <h6>
            {" "}
            Company Name : {info?.company?.companyName}
            {""}
          </h6>
          <h6> Company Short Name : {info?.company?.companyShortName} </h6>

          <h6> Company Long Desc : {info?.company?.companyLongName} </h6>
          <h6> Company CIN Date : {info?.company?.cinDate} </h6>
        </div>
      </div>
    </div>
  );
}

export default TeacherInfo;
