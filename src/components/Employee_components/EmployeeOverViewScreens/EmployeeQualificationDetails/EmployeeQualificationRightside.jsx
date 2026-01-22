import styles from "../EmployeeQualificationDetails/EmployeeQualificationRightside.module.css";
import EmployeeRightSideHeader from "../EmployeeRightInformation/EmployeeRightInformationHeader";
import ReferredBy from "./ReferredBy";
import SameInstutionEmployees from "./SameInstutionEmployees";
import React, { useState } from "react";
import endline from "../../../../assets/Employee_asserts/RightSideInformation Icons/endline.svg";
import { useEmployeeReferenceBy, useEmployeeHiredBy } from "../../../../queries/Employee_queries/OverViewsScreens/ReferenceBy";
import { useSameInstituteEmployees } from "../../../../queries/Employee_queries/OverViewsScreens/SameInstitute";
import HiredBy from "./HiredBy";


const EmployeeQualificationRightside = ({ employeeId }) => {
  const [expanded, setExpanded] = useState(null);
  const { data: referenceData, isLoading, isError } = useEmployeeReferenceBy(employeeId);
  const { data: hiredByData, isLoading: isHiredByLoading, isError: isHiredByError } = useEmployeeHiredBy(employeeId);
  const { data: sameInstituteData, isLoading: isSameInstLoading, isError: isSameInstError } = useSameInstituteEmployees(employeeId);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <div className={styles.rightsidedetailscontainer}>
      <EmployeeRightSideHeader />

      <SameInstutionEmployees
        expanded={expanded === "SameInstutionEmployees"}
        onChange={handleChange("SameInstutionEmployees")}
        sameInstituteData={sameInstituteData}
        isLoading={isSameInstLoading}
        isError={isSameInstError}
      />

      <ReferredBy
        expanded={expanded === "ReferedBy"}
        onChange={handleChange("ReferedBy")}
        referenceData={referenceData}
        isLoading={isLoading}
        isError={isError}
      />


      <HiredBy
        expanded={expanded === "HiredBy"}
        onChange={handleChange("HiredBy")}
        referenceData={hiredByData}
        isLoading={isHiredByLoading}
        isError={isHiredByError}
      />

      <img src={endline} alt="Example" />



    </div>


  );
};

export default EmployeeQualificationRightside;