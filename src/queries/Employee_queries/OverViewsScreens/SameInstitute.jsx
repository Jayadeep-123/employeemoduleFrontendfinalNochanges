
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSameInstituteEmployees = (employeeId) => {
    return useQuery({
        queryKey: ["sameInstituteEmployees", employeeId],
        queryFn: async () => {
            // Endpoint: http://localhost:8080/api/EmpDetailsFORCODO/same-institute/HYD1111788
            const response = await axios.get(
                `http://localhost:8080/api/EmpDetailsFORCODO/same-institute/${employeeId}`
            );
            return response.data;
        },
        enabled: !!employeeId,
        retry: false,
    });
};
