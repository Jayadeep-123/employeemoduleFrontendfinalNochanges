import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

// Base URLs
const API_BASE_URL = "http://localhost:8080/api/v1/skill-details";
const DROPDOWN_BASE_URL = "http://localhost:8080/api/employeeModule";
const CITY_BASE_URL = "http://localhost:9000/common/get";

// --- API Calls ---

// 1. Qualifications
export const useQualifications = () => {
    return useQuery({
        queryKey: ["qualifications"],
        queryFn: async () => {
            const response = await axios.get(`${DROPDOWN_BASE_URL}/qualifications`);
            return response.data;
        }
    });
};

// 2. Joining As
export const useJoiningAs = () => {
    return useQuery({
        queryKey: ["joiningAs"],
        queryFn: async () => {
            const response = await axios.get(`${DROPDOWN_BASE_URL}/joining-as`);
            return response.data;
        }
    });
};

// 3. Streams
export const useStreams = () => {
    return useQuery({
        queryKey: ["streams"],
        queryFn: async () => {
            const response = await axios.get(`${DROPDOWN_BASE_URL}/streams`);
            return response.data;
        }
    });
};

// 4. Employee Levels
export const useEmployeeLevels = () => {
    return useQuery({
        queryKey: ["employeeLevels"],
        queryFn: async () => {
            const response = await axios.get(`${DROPDOWN_BASE_URL}/employeeLevels`);
            return response.data;
        }
    });
};

// 5. Cities
export const useCities = () => {
    return useQuery({
        queryKey: ["cities"],
        queryFn: async () => {
            const response = await axios.get(`${CITY_BASE_URL}/cities`);
            return response.data;
        }
    });
};

// 6. Campuses (Dependent on City)
export const useCampuses = (cityId) => {
    return useQuery({
        queryKey: ["campuses", cityId],
        queryFn: async () => {
            if (!cityId) return [];
            const response = await axios.get(`${DROPDOWN_BASE_URL}/campuses/${cityId}`);
            return response.data;
        },
        enabled: !!cityId // Only fetch if cityId is present
    });
};

// 7. Structures
export const useStructures = () => {
    return useQuery({
        queryKey: ["structures"],
        queryFn: async () => {
            const response = await axios.get(`${DROPDOWN_BASE_URL}/structures`);
            return response.data;
        }
    });
};

// 8. Grades
export const useGrades = () => {
    return useQuery({
        queryKey: ["grades"],
        queryFn: async () => {
            const response = await axios.get(`${DROPDOWN_BASE_URL}/grade`); // Note: User specified /grade
            return response.data;
        }
    });
};

// 9. Orientation Groups
export const useOrientationGroups = () => {
    return useQuery({
        queryKey: ["orientationGroups"],
        queryFn: async () => {
            const response = await axios.get(`${DROPDOWN_BASE_URL}/orientation-groups`);
            return response.data;
        }
    });
};

// 10. Buildings (Dependent on Campus)
export const useBuildings = (campusId) => {
    return useQuery({
        queryKey: ["buildings", campusId],
        queryFn: async () => {
            if (!campusId) return [];
            const response = await axios.get(`${DROPDOWN_BASE_URL}/${campusId}/building`);
            return response.data;
        },
        enabled: !!campusId
    });
};

// 7. Save Skill Test Details
export const useSaveSkillTestDetails = () => {
    return useMutation({
        mutationFn: async ({ id, data }) => {
            const response = await axios.post(`${API_BASE_URL}/save/${id}`, data);
            return response.data;
        }
    });
};

// 13. Sync Employee DB
export const useSyncEmployeeDb = () => {
    return useMutation({
        mutationFn: async (tempId) => {
            const response = await axios.get(`http://localhost:8080/api/integration/sync-db-employee?id=${tempId}`);
            return response.data;
        }
    });
};

// 11. Subjects
export const useSubjects = () => {
    return useQuery({
        queryKey: ["subjects"],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:8080/api/employeeModule/subjects`);
            return response.data;
        }
    });
};

// 12. Skill Test Approval List
export const useSkillTestApprovalList = () => {
    return useQuery({
        queryKey: ["skillTestApprovalList"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:8080/api/v1/skill-details/passed_employess/skilltestApprovalTable/");
            return response.data;
        }
    });
};

// Helper to bundle all lookups if needed, or can be used individually
export const useSkillTestQueries = (cityId, campusId) => {
    return {
        qualifications: useQualifications(),
        joiningAs: useJoiningAs(),
        streams: useStreams(),
        subjects: useSubjects(),
        employeeLevels: useEmployeeLevels(),
        cities: useCities(),
        campuses: useCampuses(cityId),
        buildings: useBuildings(campusId),
    };
};

export const useSkillApprovalEmployeeDetails = (tempPayroll) => {
    return useQuery({
        queryKey: ["skillApprovalEmployee", tempPayroll],
        queryFn: async () => {
            if (!tempPayroll) return null; // prevent calling API with undefined
            const res = await axios.get(
                `http://localhost:8080/api/v1/skill-details/approval/${tempPayroll}`
            );
            return res.data;
        },
        enabled: !!tempPayroll
    });
};

export const useSkillTestResults = (tempPayroll) => {
    return useQuery({
        queryKey: ["skillTestResults", tempPayroll],
        queryFn: async () => {
            if (!tempPayroll) return null;
            const res = await axios.get(
                `http://localhost:8080/api/v1/skill-details/results/${tempPayroll}`
            );
            return res.data;
        },
        enabled: !!tempPayroll
    });
};

// 14. Approve Skill Test
export const useApproveSkillTest = () => {
    return useMutation({
        mutationFn: async (tempPayroll) => {
            if (!tempPayroll) throw new Error("Temp Payroll ID is required");
            const response = await axios.post(
                `http://localhost:8080/api/v1/skill-details/approve/${tempPayroll}`
            );
            return response.data;
        }
    });
};


