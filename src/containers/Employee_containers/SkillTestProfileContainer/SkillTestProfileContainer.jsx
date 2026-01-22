import { useParams } from "react-router-dom";
import { useSkillApprovalEmployeeDetails, useSkillTestResults } from "../../../queries/Employee_queries/EmployeeSkillTest";
import SkillTestEmployeeDetails from "../../../components/Employee_components/SkillTestProfileCard/SkillTestEmployeeDetails";
import SkillEmployeeImage from "../../../containers/Employee_containers/SkillTestProfileContainer/SkillEmployeeImage/SkillEmployeeImage";
import SkillEmployeeProfileMiddle from "../../../containers/Employee_containers/SkillTestProfileContainer/SkillEmployeeImage/SkillEmployeeProfileMiddle";
// import EmployeeViewButton from "../../components/EmployeeProfileComponet/EmployeeViewButton";
import Styles from "../SkillTestProfileContainer/SkillTestProfileContainer.module.css";


const SkillTestProfileContainer = () => {
    const { employeeId } = useParams();
    const { data: employeeData, isLoading: isEmpLoading } = useSkillApprovalEmployeeDetails(employeeId);
    const { data: resultsData, isLoading: isResLoading } = useSkillTestResults(employeeId);

    if (isEmpLoading || isResLoading) return <div>Loading...</div>;

    return (
        <div className={Styles.emp_outlayout}>
            <div className={Styles.emp_profile_container}>
                <SkillEmployeeImage employeeData={employeeData} />
                <SkillEmployeeProfileMiddle employeeData={employeeData} />
            </div>
            <div className={Styles.emp_details_container}>
                <SkillTestEmployeeDetails employeeData={employeeData} resultsData={resultsData} />
            </div>
        </div>
    );
}
export default SkillTestProfileContainer;