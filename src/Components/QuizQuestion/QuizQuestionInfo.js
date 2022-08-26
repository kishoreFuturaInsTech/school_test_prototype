import React from "react";

function QuizQuestionInfo({ info }) {
  return (
    <div>
      <div className="row">
        <div className="col">
          <h3> Quiz Question Details </h3>
          <h6> Quiz Question Id : {info.id} </h6>
          <h6> Question : {info.question} </h6>
          <h6> Quiz Header Id: {info.quizHeader} </h6>
          {/* <h6> Created By : {info.createdBy} </h6>
          <h6> Modified By : {info.modifiedBy} </h6>
          <h6> Created Date : {info.createdDate} </h6>
          <h6> Modified Date : {info.modifiedDate} </h6> */}
        </div>
        <div className="col">
          <h3> Question Type Details </h3>
          <h6> Question Type ID : {info?.type.id} </h6>
          <h6> Question Type Short Desc: {info?.type.shortDescription} </h6>
          <h6>
            {" "}
            Question Type Long Desc : {info?.type.longDescription}
            {""}
          </h6>
          <br></br>

          <h3> Question Category Details </h3>
          <h6> Question Category ID : {info?.category.id} </h6>
          <h6>
            {" "}
            Question Category Short Desc: {info?.category.shortDescription}{" "}
          </h6>
          <h6>
            {" "}
            Question Category Long Desc : {info?.category.longDescription}
            {""}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default QuizQuestionInfo;
