import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// --- Components ---
// Adjust these import paths if your folders are named differently
import SkillTestProfileContainer from "../../../containers/Employee_containers/SkillTestProfileContainer/SkillTestProfileContainer";
import FooterWidget from "../../../widgets/Employee_widgets/ChecklistFooterWidget/Checklistfooter";

// --- Icons ---
import leftarrow from "../../../assets/Employee_asserts/EmployeeOnBoarding/leftarrow.svg";
import Approve from "../../../assets/Employee_asserts/EmployeeOnBoarding/Approve";
import rejecticon from "../../../assets/Employee_asserts/EmployeeOnBoarding/rejecticon.svg";

// --- Queries ---
import { useApproveSkillTest } from "../../../queries/Employee_queries/EmployeeSkillTest";

const SkillTestView = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const { mutate: approveSkillTest } = useApproveSkillTest();

  // 🔴 ROUTING LOGIC: Go back to the 'skillTest' Table
  const handleBackToTable = () => {
    // URL is currently: .../scopes/employee/do-review/101/skill-test
    // We want: .../scopes/employee/do-review/skillTest
    navigate('../../skillTest');
  };

  const handleApprove = () => {
    if (!employeeId) return;

    approveSkillTest(employeeId, {
      onSuccess: () => {
        console.log("Skill Test Approved successfully");
        handleBackToTable();
      },
      onError: (error) => {
        console.error("Failed to approve skill test:", error);
        alert("Failed to approve skill test. Please try again.");
      }
    });
  };

  const handleReject = () => {
    console.log("Rejected");
    handleBackToTable();
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

      {/* Scrollable Body */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <SkillTestProfileContainer />
      </div>

      {/* Fixed Footer */}
      <FooterWidget
        backLabel="Back"
        forwardLabel="Approve"
        rejectLabel="Reject"

        backIcon={leftarrow}
        forwardIcon={Approve}
        rejectIcon={rejecticon}

        backWidth="120px"
        forwardWidth="141px"

        onBack={handleBackToTable}
        onForward={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default SkillTestView;