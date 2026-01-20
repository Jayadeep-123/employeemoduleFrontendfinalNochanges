import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  Tooltip,
} from "@mui/material";
import { ReactComponent as ExpandIcon } from "../../../../assets/Employee_asserts/Family/expandIcon.svg";
import styles from "./PreviousEmployeeInfo.module.css";
import accordionheadericon from "../../../../assets/Employee_asserts/Family/accordionheadericon.svg";
import callIcon from "../../../../assets/Employee_asserts/RightSideInformation Icons/phoneicon.svg";
import mailIcon from "../../../../assets/Employee_asserts/RightSideInformation Icons/smsicon.svg";
import cicleIcon from "../../../../assets/Employee_asserts/RightSideInformation Icons/circle icon.svg";
import callIconOutLine from "../../../../assets/Employee_asserts/RightSideInformation Icons/callIconOutLine.svg";
import mailIconOutline from "../../../../assets/Employee_asserts/RightSideInformation Icons/MailIconOutLine.svg";
import { usePreviousEmployeeInfo } from "../../../../queries/Employee_queries/OverViewsScreens/PreviousEmployeeInfo";

const PreviousEmployeeInfo = ({ employeeId, expanded, onChange }) => {
  const { data: previousEmployers = [], isLoading } = usePreviousEmployeeInfo(employeeId);

  const phoneNumber = "1234567890";
  const email = "suresh@gmail.com";

  if (isLoading) return null;

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
          "& .MuiAccordionSummary-content": { margin: "0px !important", alignItems: "center" },
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
                Previous Employee Info
              </p>
            </div>
            <div className={styles.header_right}>
              {!expanded && previousEmployers.length > 0 && (
                <Chip
                  label={previousEmployers[0].companyName}
                  size="small"
                  sx={{
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
                  }}
                />
              )}
            </div>
          </figure>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography component="div">
          {previousEmployers.length > 0 ? (
            (() => {
              // Sort by toDate descending to get the latest company
              const latestEmployer = [...previousEmployers].sort((a, b) => {
                const dateA = new Date(a.toDate || 0);
                const dateB = new Date(b.toDate || 0);
                return dateB - dateA;
              })[0];

              return (
                <div className={styles.employeeInfoContent}>
                  <div>
                    <p className={styles.employeelabel}>Employer Name</p>
                    <p className={styles.employeedetails}>{latestEmployer.companyName || "N/A"}</p>
                  </div>
                  <div>
                    <p className={styles.employeelabel}>Location</p>
                    <p className={styles.employeedetails}>{latestEmployer.companyAddress || "N/A"}</p>
                  </div>

                  <div className={styles.employeeInfo}>
                    <div className={styles.item}>
                      <p className={styles.employeelabel}>Designation</p>
                      <p className={styles.employeedetails}>{latestEmployer.designation || "N/A"}</p>
                    </div>
                    <div className={`${styles.item} ${styles.alignRight}`}>
                      <p className={styles.employeelabel}>Nature Of Duty</p>
                      <p className={styles.employeedetails}>{latestEmployer.natureOfDuties || "N/A"}</p>
                    </div>
                    <div className={styles.item}>
                      <p className={styles.employeelabel}>CTC</p>
                      <p className={styles.employeedetails}>{latestEmployer.ctc || "N/A"}</p>
                    </div>
                    <div className={`${styles.item} ${styles.alignRight}`}>
                      <p className={styles.employeelabel}>Gross Salary</p>
                      <p className={styles.employeedetails}>{latestEmployer.grossSalaryPerMonth || "N/A"}</p>
                    </div>
                    <div className={styles.item}>
                      <p className={styles.employeelabel}>From</p>
                      <p className={styles.employeedetails}>{latestEmployer.fromDate || "N/A"}</p>
                    </div>
                    <div className={`${styles.item} ${styles.alignRight}`}>
                      <p className={styles.employeelabel}>To</p>
                      <p className={styles.employeedetails}>{latestEmployer.toDate || "N/A"}</p>
                    </div>
                    <div className={styles.item}>
                      <p className={styles.employeelabel}>Leaving Reason</p>
                      <p className={styles.employeedetails}>{latestEmployer.leavingReason || "N/A"}</p>
                    </div>
                  </div>

                  <hr className={styles.divider} />

                  <div className={styles.campusInfoConatiner}>
                    <div className={styles.addressContainer}>
                      <div className={styles.lefticon}>
                        <img src={cicleIcon} alt="Office Icon" />
                      </div>

                      <div className={styles.addressDetails}>
                        <p className={styles.addressTitle}>Address</p>
                        <p className={styles.companyname}>{latestEmployer.companyName || "N/A"}</p>
                        <p className={styles.fullAddress}>
                          {latestEmployer.companyAddress || "N/A"}
                        </p>
                      </div>

                      <div className={styles.rightIcons}>
                        <Tooltip
                          title={
                            phoneNumber ? (
                              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <img src={callIconOutLine} alt="Phone" style={{ width: "14px", height: "14px" }} />
                                <span>{phoneNumber}</span>
                              </div>
                            ) : ("No number available")
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
                                color: "#FFF",
                                "&::before": { border: "1px solid #3425FF" },
                              },
                            },
                          }}
                        >
                          <figure style={{ cursor: phoneNumber ? "pointer" : "default" }}>
                            <img src={callIcon} alt="Call" />
                          </figure>
                        </Tooltip>

                        <Tooltip
                          title={
                            email ? (
                              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <img src={mailIconOutline} alt="Email" style={{ width: "14px", height: "14px" }} />
                                <span>{email}</span>
                              </div>
                            ) : ("No email available")
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
                              sx: { color: "#FFF", "&::before": { border: "1px solid #3425FF" } },
                            },
                          }}
                        >
                          <figure style={{ cursor: email ? "pointer" : "default" }}>
                            <img src={mailIcon} alt="mail" />
                          </figure>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <p className={styles.employeedetails}>No Previous Employee Info Available</p>
          )}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default PreviousEmployeeInfo;