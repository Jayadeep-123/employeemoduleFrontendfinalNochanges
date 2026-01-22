import React from 'react';
import styles from "../SkillEmployeeImage/SkillEmployeeProfileMiddle.module.css";

const EmployeeProfileMiddle = ({ employeeData }) => {
    return (
        <div>
            <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                    <p className={styles.label}>Date Of Birth</p>
                    <p className={styles.value}>{employeeData?.dateOfBirth || "-"}</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Aadhar Card No</p>
                    <p className={styles.value}>{employeeData?.aadhaarNo || "-"}</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Previous Sri Chaitanya ID</p>
                    <p className={styles.value}>{employeeData?.previousChaitanyaId || "-"}</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Qualification</p>
                    <p className={styles.value}>{employeeData?.qualificationName || "-"}</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Highest Qualification</p>
                    <p className={styles.value}>{employeeData?.highestQualification || "-"}</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Total Experience</p>
                    <p className={styles.value}>{employeeData?.totalExperience || "-"}</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Joining As</p>
                    <p className={styles.value}>{employeeData?.joinType || "-"}</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Stream</p>
                    <p className={styles.value}>{employeeData?.structureName || "-"}</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Employee Level</p>
                    <p className={styles.value}>{employeeData?.levelName || "-"}</p>
                </div>
            </div>
        </div>
    );
}
export default EmployeeProfileMiddle;