import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCurrentCampusInfo = (payrollId) =>
    useQuery({
        queryKey: ["currentCampusInfo", payrollId],
        queryFn: async () => {
            const { data } = await axios.get(
                `http://localhost:8080/empDetails/HR/campus-info/${payrollId}`
            );
            return data;
        },
        enabled: !!payrollId,
        retry: false,
    });
