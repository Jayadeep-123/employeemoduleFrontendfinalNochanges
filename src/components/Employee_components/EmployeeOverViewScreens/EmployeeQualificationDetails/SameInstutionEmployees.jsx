import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
} from "@mui/material";
import { ReactComponent as ExpandIcon } from "../../../../assets/Employee_asserts/Family/expandIcon.svg";
import styles from "./SameInstitutionEmployee.module.css";
import accordionheadericon from "../../../../assets/Employee_asserts/Family/accordionheadericon.svg";
import EmployeeDetailsCard from "../../../../widgets/Employee_widgets/EmployeeDetailsCard/EmployeeDetailsCard";
import rightDividerIcon from "../../../../assets/Employee_asserts/Family/dividerRightImg.svg";
import leftDividerIcon from "../../../../assets/Employee_asserts/Family/dividerLeftImg.svg";
import profileIcon from "../../../../assets/Employee_asserts/Family/profile.svg";

const SameInstutionEmployees = ({ expanded, onChange, sameInstituteData, isLoading, isError }) => {

  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) return null;
  if (isError || !sameInstituteData || !sameInstituteData.employees || sameInstituteData.employees.length === 0) {
    return null;
  }

  // Limit to first 3 employees
  const employeesToDisplay = sameInstituteData.employees.slice(0, 3);
  const totalPages = employeesToDisplay.length;
  const instituteName = sameInstituteData.institute || "Same Institute";

  const currentEmployee = employeesToDisplay[currentPage - 1];

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      sx={{
        "& .MuiAccordionDetails-root": { padding: "0px 16px 16px" },
        "&::before": { display: "none" },
        borderRadius: "10px",
        border: "1px solid #E6E4F0",
        background: "rgba(255, 255, 255, 0.40)",
        backdropFilter: "blur(9.1px)",
        boxShadow:
          "0 8px 16px rgba(0,0,0,0.14), 0 0 2px rgba(0,0,0,0.12)",
        "&.Mui-expanded": {
          border: "1px solid #B4BCFF",
          background: "rgba(255, 255, 255, 0.30)",
          margin: 0,
        },
      }}
    >
      {/* HEADER */}
      <AccordionSummary
        expandIcon={<ExpandIcon />}
        sx={{
          padding: "15px 18px",
          "& .MuiAccordionSummary-content": {
            margin: 0,
            alignItems: "center",
          },
        }}
      >
        <Typography component="span" sx={{ width: "100%" }}>
          <figure className={styles.header_figure}>
            <div className={styles.header_left}>
              <img src={accordionheadericon} alt="accordion icon" />
              <p className={styles.header_text}>
                {instituteName} Employees
              </p>
            </div>

            {!expanded && (
              <Chip
                label={`+${totalPages}`}
                size="small"
                sx={{
                  backgroundColor: "#E8E6FF",
                  color: "#3425FF",
                  border: "1px solid #3425FF",
                  height: "28px",
                  borderRadius: "16px",
                  fontSize: "0.75rem",
                }}
              />
            )}
          </figure>
        </Typography>
      </AccordionSummary>

      {/* CONTENT */}
      <AccordionDetails>
        <Typography component="div" className="divider_content">
          <div className={styles.driver_cards_wrapper}>
            <div className={styles.driver_cards}>
              <EmployeeDetailsCard
                titleLable="Employee Name"
                name={`${currentEmployee.firstName} ${currentEmployee.lastName}`}
                emp_id={`EMP ID: ${currentEmployee.payrollId}`}
                role={currentEmployee.designationName || "N/A"}
                phoneNumber={currentEmployee.primaryMobileNo ? `+91 ${currentEmployee.primaryMobileNo}` : "N/A"}
                email={currentEmployee.email || "N/A"}
                profileIcon={profileIcon}
                leftDividerIcon={leftDividerIcon}
                rightDividerIcon={rightDividerIcon}
                dividerColor="#3425ff"
              />
            </div>

            {/* PAGINATION */}
            <div className={styles.pagination_wrapper}>
              <button
                className={styles.page_btn}
                onClick={handlePrev}
                disabled={currentPage === 1}
                style={{ opacity: currentPage === 1 ? 0.4 : 1 }}
              >
                &#8249;
              </button>

              <span className={styles.page_text}>
                {currentPage} / {totalPages}
              </span>

              <button
                className={styles.page_btn}
                onClick={handleNext}
                disabled={currentPage === totalPages}
                style={{ opacity: currentPage === totalPages ? 0.4 : 1 }}
              >
                &#8250;
              </button>
            </div>
          </div>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default SameInstutionEmployees;
