import React from "react";
import styles from "./SubmittedDocuments.module.css";
import confirmIconBlue from "../../../../../assets/Employee_asserts/EmployeeQu/confirmIconBlue.svg"
import notConfirmIconRed from "../../../../../assets/Employee_asserts/EmployeeQu/notConfirIconRed.svg"
import { useUploadedDocuments } from "../../../../../queries/Employee_queries/OverViewsScreens/QualificationDetails";

const SubmittedDocuments = () => {
    // Hardcoded payrollId as per requirement
    const payrollId = "RJY21";
    const { data: uploadedDocs, isLoading } = useUploadedDocuments(payrollId);

    console.log("Uploaded Docs API Response:", uploadedDocs);

    const hasDocument = (key) => {
        return uploadedDocs && uploadedDocs[key] && uploadedDocs[key].length > 0;
    };

    const submittedDocuements = [
        {
            id: "10thDocuments",
            label: "10th Class Certificate",
            // Check sscPath or similar. Assuming API returns keys like: sscPath, interPath, graduationPath, experiencePath
            // Adjust keys if API is different.
            icon: hasDocument('sscPath') ? "confirmed" : "notconfirmed"
        },
        {
            id: "intermediateDocs",
            label: "Intermediate Certificate",
            icon: hasDocument('interPath') ? "confirmed" : "notconfirmed"
        },
        {
            id: "degreeDocs",
            label: "Degree Certificate",
            icon: hasDocument('graduationPath') ? "confirmed" : "notconfirmed"
        },
        {
            id: "experienceDocs",
            label: "Experience Certificate",
            icon: hasDocument('experiencePath') ? "confirmed" : "notconfirmed"
        },
    ]

    return (
        <div className={styles.submittedDocumentsNavContent}>
            {isLoading ? <p>Loading...</p> :
                submittedDocuements.map((documents) => {
                    const iconSrc =
                        documents.icon === "confirmed" ? confirmIconBlue : notConfirmIconRed;
                    return (
                        <div className={styles.submittedDocument} key={documents.id}>
                            <p>{documents.label}</p>
                            <figure>
                                <img src={iconSrc} alt={documents.label} />
                            </figure>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SubmittedDocuments;