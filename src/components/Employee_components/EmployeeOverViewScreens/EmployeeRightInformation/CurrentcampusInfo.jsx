import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Chip,
  Tooltip,
} from "@mui/material";
import { ReactComponent as ExpandIcon } from "../../../../assets/Employee_asserts/Family/expandIcon.svg";
import styles from "./CurrentCampusinfo.module.css";
import accordionheadericon from "../../../../assets/Employee_asserts/Family/accordionheadericon.svg";
import leftDividerIcon from "../../../../assets/Employee_asserts/RightSideInformation Icons/left_divider_icon.svg";
import rightDividerIcon from "../../../../assets/Employee_asserts/RightSideInformation Icons/right_divider_icon.svg";
import profileIcon from "../../../../assets/Employee_asserts/RightSideInformation Icons/circle icon.svg";
import EmployeeDetailsCard from '../../../../widgets/Employee_widgets/EmployeeDetailsCard/EmployeeDetailsCard';
import callIcon from "../../../../assets/Employee_asserts/RightSideInformation Icons/phoneicon.svg";
import mailIcon from "../../../../assets/Employee_asserts/RightSideInformation Icons/smsicon.svg";
import mailIconOutline from "../../../../assets/Employee_asserts/RightSideInformation Icons/MailIconOutLine.svg";
import callIconOutLine from "../../../../assets/Employee_asserts/RightSideInformation Icons/callIconOutLine.svg";
import profileIcon1 from "../../../../assets/Employee_asserts/Family/profile.svg";
import { useCurrentCampusInfo } from "../../../../queries/Employee_queries/OverViewsScreens/CurrentCampusInfo";


const chipBlue = {
  marginLeft: 1,
  backgroundColor: "#E8E6FF",
  color: "#3425FF",
  border: "1px solid #3425FF",
  fontSize: "0.75rem",
  height: "28px",
  borderRadius: "16px",
  "& .MuiChip-label": {
    paddingLeft: "8px",
    paddingRight: "8px",
  },
};

const chipOrange = {
  marginLeft: 1,
  backgroundColor: "#FFF5E6",
  color: "#f48c04ff",
  border: "1px solid #f48c04ff",
  fontSize: "0.75rem",
  height: "28px",
  borderRadius: "16px",
  "& .MuiChip-label": {
    paddingLeft: "8px",
    paddingRight: "8px",
  },
};
const chipGreen = {
  marginLeft: 1,
  backgroundColor: "#E8FFE6",
  color: "#2BA422",
  border: "1px solid #2BA422",
  fontSize: "0.75rem",
  height: "28px",
  borderRadius: "16px",
  "& .MuiChip-label": {
    paddingLeft: "8px",
    paddingRight: "8px",
  },
};


const CurrentCampusinfo = ({ employeeId, expanded, onChange }) => {
  const { data: campusInfo, isLoading, error } = useCurrentCampusInfo(employeeId);

  if (isLoading) return null; // Or a loading spinner if preferred

  const principal = campusInfo?.principalInfo || {};
  const phoneNumber = principal.contactNo;
  const email = principal.email;

  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      sx={{
        "& .MuiAccordionDetails-root ": { padding: "0px 16px 16px" },
        "&&": {
          "--Paper-shadow": "none",
          boxShadow: "none",
          borderRadius: "10px",
          border: "1px solid #E6E4F0",
          background: "rgba(255, 255, 255, 0.40)",
          backdropFilter: "blur(9.1px)",
          boxShadow:
            "0 8px 16px 0 rgba(0, 0, 0, 0.14), 0 0 2px 0 rgba(0, 0, 0, 0.12)",
        },
        "&::before": { display: "none" },
        "& .MuiButtonBase-root": {
          alignItems: "start",
          padding: "15px 18px",
          minHeight: "unset",
        },
        "&.Mui-expanded": {
          borderRadius: "10px",
          border: "1px solid #B4BCFF",
          background: "rgba(255, 255, 255, 0.30)",
          boxShadow:
            "0 8px 16px 0 rgba(0, 0, 0, 0.14), 0 0 2px 0 rgba(0, 0, 0, 0.12)",
          backdropFilter: "blur(9.1px)",
          margin: "0px",
        },

      }}
    >
      <AccordionSummary
        expandIcon={<ExpandIcon />}
        aria-controls="driver-content"
        id="driver-content"
        sx={{
          "& .MuiAccordionSummary-content": { margin: "0px !important", alignItems: "center", },
          "&.Mui-expanded .MuiAccordionSummary-content": {
            margin: "0px !important",
          },
        }}
      >
        <Typography component="span" sx={{ width: '100%' }}>
          <figure className={styles.header_figure}>
            <div className={styles.header_left}>
              <img src={accordionheadericon} alt="accordion icon" />
              <p className={styles.header_text}>
                Current Campus Info
              </p>
            </div>
            <div className={styles.addressContainer}>
              <div className={styles.header_right}>
                {!expanded && (
                  <Chip label={campusInfo?.campusName || "N/A"} size="small" sx={chipBlue} />
                )}
                {!expanded && <Chip label={campusInfo?.campusCode || "N/A"} size="small" sx={chipOrange} />}
              </div>

              <div>
                {!expanded && (
                  <Chip label={campusInfo?.campusType || "N/A"} size="small" sx={chipGreen} />
                )}
              </div>
            </div>

          </figure>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography component="div">

          <div className={styles.employeeInfoContent}>
            <div>
              <p className={styles.employeelabel}>Campus Name</p>
              <p className={styles.employeedetails}>{campusInfo?.campusName || "N/A"}</p>
            </div>

            <div className={styles.employeeInfo}>
              <div className={styles.item}>
                <p className={styles.employeelabel}>Campus Code</p>
                <p className={styles.employeedetails}>{campusInfo?.campusCode || "N/A"}</p>
              </div>
              <div className={`${styles.item} ${styles.alignRight}`}>
                <p className={styles.employeelabel}>Campus Type</p>
                <p className={styles.employeedetails}>{campusInfo?.campusType || "N/A"}</p>
              </div>
              <div className={styles.item}>
                <p className={styles.employeelabel}>Designation</p>
                <p className={styles.employeedetails}>{campusInfo?.designationName || "N/A"}</p>
              </div>
              <div className={`${styles.item} ${styles.alignRight}`}>
                <p className={styles.employeelabel}>Work Mode</p>
                <p className={styles.employeedetails}>{campusInfo?.workMode || "N/A"}</p>
              </div>
              <div className={styles.item}>
                <p className={styles.employeelabel}>Joining As</p>
                <p className={styles.employeedetails}>{campusInfo?.joiningAs || "N/A"}</p>
              </div>
              <div className={`${styles.item} ${styles.alignRight}`}>
                <p className={styles.employeelabel}>Replacement Employee</p>
                <p className={styles.employeedetails}>{campusInfo?.replacementEmployeeName || "N/A"}</p>
              </div>
            </div>

            <hr className={styles.divider} />

            <EmployeeDetailsCard
              name={principal.principalName || "N/A"}
              emp_id=""
              profileIcon={profileIcon}
              titleLable="Principal Name"
              leftDividerIcon={leftDividerIcon}
              rightDividerIcon={rightDividerIcon}
              role={principal.designation || "N/A"}
              dividerColor="#3425ff"
              phoneNumber={principal.contactNo || "N/A"}
              email={principal.email || "N/A"}
            />

            <div className={styles.campusInfoConatiner}>
              <div className={styles.addressContainer1}>
                <div className={styles.lefticon}>
                  <img src={profileIcon1} alt="ProfileIcon" className={styles.profileIcon} />
                </div>

                <div className={styles.addressDetails}>
                  <p className={styles.addressTitle}>Campus Address</p>
                  <p className={styles.companyname}>{campusInfo?.campusName || "N/A"}</p>
                  <p className={styles.fullAddress}>
                    {campusInfo?.campusName || "N/A"}
                  </p>
                </div>

                <div className={styles.rightIcons}>

                  <Tooltip
                    title={
                      phoneNumber ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <img
                            src={callIconOutLine}
                            alt="Phone"
                            style={{ width: "14px", height: "14px" }}
                          />
                          <span>{phoneNumber}</span>
                        </div>
                      ) : (
                        "No number available"
                      )
                    }
                    arrow
                    placement="top"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          backgroundColor: "#fff",
                          color: "#3425FF",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          padding: "6px 10px",
                          borderRadius: "6px",
                          border: "1px solid #3425FF",
                          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
                        },
                      },
                      arrow: {
                        sx: {
                          color: "#FFF", // arrow color same as tooltip background
                          "&::before": {
                            border: "1px solid #3425FF", // ✅ optional: add border around arrow
                          },
                        },
                      },
                    }}
                  >
                    <figure style={{ cursor: phoneNumber ? "pointer" : "default" }}>
                      <img
                        src={callIcon}
                        alt="Call"
                      // onClick={() => phoneNumber && window.open(`tel:${phoneNumber}`)}
                      />
                    </figure>
                  </Tooltip>

                  <Tooltip
                    title={
                      email ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <img
                            src={mailIconOutline}
                            alt="Email"
                            style={{ width: "14px", height: "14px" }}
                          />
                          <span>{email}</span>
                        </div>
                      ) : (
                        "No email available"
                      )
                    }
                    arrow
                    placement="top"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          backgroundColor: "#fff",
                          color: "#3425FF",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          padding: "6px 10px",
                          borderRadius: "6px",
                          border: "1px solid #3425FF",
                          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
                        },
                      },
                      arrow: {
                        sx: {
                          color: "#FFF", // arrow color same as tooltip background
                          "&::before": {
                            border: "1px solid #3425FF", // ✅ optional: add border around arrow
                          },
                        },
                      },
                    }}
                  >
                    <figure style={{ cursor: email ? "pointer" : "default" }}>
                      <img
                        src={mailIcon}
                        alt="mail"
                      // onClick={() => email && window.open(`mailto:${email}`)}
                      />
                    </figure>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>

        </Typography>
      </AccordionDetails>
    </Accordion>

  );
};

export default CurrentCampusinfo;
