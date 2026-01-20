import Styles from "../EmployeeModule/EmployeeModule.module.css";
import EmployeeBasicInfoContainer from "../../../../containers/Employee_containers/EmployeeBasicInfoContainer/EmployeeBasicInfoContainer";
import RightInformation from "../EmployeeRightInformation/EmployeeRightInformation";


import { useParams } from "react-router-dom";


const EmployeModule = () => {
    const { employeeId } = useParams();
    return (
        <div className={Styles.container}>
            <EmployeeBasicInfoContainer />
            <RightInformation employeeId={employeeId} />
        </div>
    );
}
export default EmployeModule;