import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const usePreviousEmployeeInfo = (payrollId) =>
    useQuery({
        queryKey: ["previousEmployeeInfo", payrollId],
        queryFn: async () => {
            const { data } = await axios.get(
                `http://localhost:8080/api/EmpDetailsFORCODO/payroll/${payrollId}`
            );
            return data;
        },
        enabled: !!payrollId,
        retry: false,
    });
