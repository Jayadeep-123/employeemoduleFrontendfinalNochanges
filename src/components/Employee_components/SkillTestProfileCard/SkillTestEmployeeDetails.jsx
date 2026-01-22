import BankInfoWidget from "../../../widgets/Employee_widgets/InfoCard/SkillInfoWidget";
import styles from "../SkillTestProfileCard/SkillTestEmployeeDetails.module.css";

const SkillTestEmployeeDetails = ({ employeeData, resultsData }) => {
    // resultsData is an array, take the first element
    const result = resultsData && resultsData.length > 0 ? resultsData[0] : null;

    const salaryAccountInfo = [
        { label: "Payroll Id", value: result?.payrollId || employeeData?.tempEmployeeId || "N/A" },
        { label: "Name", value: result?.fullName || employeeData?.employeeName || "Full Name" },
        { label: "Subject", value: result?.subjectName || employeeData?.levelName || "-" },
        { label: "Exam Date", value: result?.examDate || "-" },
        { label: "No Of Questions", value: result?.noOfQuestions || "0" },
    ];

    return (
        <div className={styles.body}>
            <BankInfoWidget title="Test Marks " data={salaryAccountInfo} />

            <div className={styles.statsContainer}>
                <div className={`${styles.statCard} ${styles.attempted}`}>
                    <p className={styles.label}>Attempted</p>
                    <p className={styles.value}>{result?.attempted ?? "-"}</p>
                </div>
                <div className={`${styles.statCard} ${styles.unattempted}`}>
                    <p className={styles.label}>Un Attempted</p>
                    <p className={styles.value}>{result?.unAttempted ?? "-"}</p>
                </div>
                <div className={`${styles.statCard} ${styles.wrong}`}>
                    <p className={styles.label}>Wrong</p>
                    <p className={styles.value}>{result?.wrong ?? "-"}</p>
                </div>
                <div className={`${styles.statCard} ${styles.total}`}>
                    <p className={styles.label}>Total Marks</p>
                    <p className={styles.value}>{result?.totalMarks ?? "-"}</p>
                </div>
            </div>
        </div>
    );
};

export default SkillTestEmployeeDetails;