import React, { useState, useMemo } from "react";
import styles from "../OnBoardingStatusTable.module.css";
import rightarrow from "../../../../../assets/Employee_asserts/onboarding_status_table/rightarrow.svg";
import uparrow from "../../../../../assets/Employee_asserts/onboarding_status_table/uparrow.svg";
import downarrow from "../../../../../assets/Employee_asserts/onboarding_status_table/downarrow.svg";

import { useSkillTestApprovalList } from "../../../../../queries/Employee_queries/EmployeeSkillTest";

const SkillTestApprovalTable = ({ selectedStatus, role, onEmployeeSelect }) => {
    const [pageIndex, setPageIndex] = useState(0);

    const { data: apiData, isLoading } = useSkillTestApprovalList();

    const data = useMemo(() => {
        if (!apiData) return [];
        return apiData.map((item, index) => ({
            // Mapping based on user provided JSON
            id: item.tempPayrollId || index,
            name: item.employeeName,
            empNo: item.employeeNumber || "N/A",
            tempPayroll: item.tempPayrollId,
            joinDate: item.joinDate,
            city: item.city,
            campus: item.campus,
            gender: item.gender,
            status: item.status || "Skill Test Approval",
            skillTest: true,
            ...item
        }));
    }, [apiData]);
    const pageSize = 10;
    const total = data.length;
    const pagedData = data.slice(0, pageSize); // Simplified pagination for brevity

    const columns = useMemo(() => [
        "EMPLOYEE NAME", "EMPLOYEE NUMBER", "TEMP PAYROLL", "JOIN DATE",
        "CITY", "CAMPUS", "GENDER", "STATUS"
    ], []);

    return (
        <div className={styles.tableWrapper}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {columns.map((header, index) => (
                                <th key={index}>
                                    <div className={styles.sortableHeader}>
                                        <span>{header}</span>
                                        <div className={styles.sortIcons}>
                                            <img src={uparrow} alt="Up" className={styles.arrowUp} />
                                            <img src={downarrow} alt="Down" className={styles.arrowDown} />
                                        </div>
                                    </div>
                                </th>
                            ))}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedData.map((row, index) => (
                            <tr
                                key={index}
                                // 🔴 CLICK HANDLER ON ROW
                                onClick={() => onEmployeeSelect(row)}
                                style={{ cursor: "pointer" }}
                            >
                                <td>{row.name}</td>
                                <td>{row.empNo}</td>
                                <td>{row.tempPayroll}</td>
                                <td>{row.joinDate}</td>
                                <td>{row.city}</td>
                                <td>{row.campus}</td>
                                <td>{row.gender}</td>
                                <td>
                                    <span className={styles.statusBadge}>{row.status}</span>
                                </td>
                                <td>
                                    <img src={rightarrow} alt="Arrow" className={styles.arrowIcon} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SkillTestApprovalTable;