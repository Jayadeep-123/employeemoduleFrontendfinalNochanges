import React from "react";
import styles from "./PersonalAccountInfo.module.css";
import dividerline from "../../../../assets/Employee_asserts/Family/dividerline.svg";
import pdficon from "../../../../assets/Employee_asserts/EmployeeQu/pdf_icon.svg";
import view_icon from "../../../../assets/Employee_asserts/EmployeeQu/view_icon.svg";

const PersonalAccountInfo = ({ data = {} }) => {
  const handleView = () => {
    if (data.documentUrl) {
      window.open(data.documentUrl, "_blank");
    } else {
      alert("Document URL not available");
    }
  };

  return (
    <div className={styles.personalAccountContainer}>
      <div className={styles.headerRow}>
        <h4 className={styles.title}>Personal Account Info</h4>
        <img src={dividerline} alt="divider" className={styles.dividerImage} />
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <p className={styles.label}>Payment Type</p>
          <p className={styles.value}>{data.paymentType || "N/A"}</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Bank Name</p>
          <p className={styles.value}>{data.bankName || "N/A"}</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Bank Branch</p>
          <p className={styles.valueBold}>{data.bankBranch || "N/A"}</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>IFSC Code</p>
          <p className={styles.valueBold}>{data.ifscCode || "N/A"}</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Account Number</p>
          <p className={styles.valueBold}>{data.personalAccountNumber || "N/A"}</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Bank Statement / Cheque</p>
          <div className={styles.icons}>
            <img src={pdficon} alt="PDF" className={styles.pdfImage} />
            <button className={styles.viewButton} onClick={handleView} title="View Document">
              <img src={view_icon} alt="View" className={styles.downloadImage} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalAccountInfo;
