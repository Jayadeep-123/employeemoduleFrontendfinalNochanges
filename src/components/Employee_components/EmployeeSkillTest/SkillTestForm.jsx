// components/EmployeeLanding/SkillTestForm.js
import React, { useImperativeHandle, forwardRef, useRef, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import styles from './SkillTestForm.module.css';
import { ReactComponent as BorderIcon } from '../../../assets/Employee_asserts/SkillTest/border.svg';

// Import your widgets
import FormikInputbox from '../FormikInputbox';
import FormikDropdown from '../FormikDropdown';
import GenderSelection from '../../../components/Employee_components/GenderSelection.jsx/GenderSelection';
import OnboardingFooter from '../../../components/Employee_components/OnBoardingStatus/OnBoardingEmployeeFooter/OnboardingFooter';

// Use Queries
import {
    useQualifications,
    useJoiningAs,
    useStreams,
    useEmployeeLevels,
    useCities,
    useCampuses,
    useStructures,
    useGrades,
    useOrientationGroups,
    useBuildings,
    useSubjects,
    useSaveSkillTestDetails
} from '../../../queries/Employee_queries/EmployeeSkillTest';

const CalendarIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.05263 10.0007C5.33181 10.0007 5.59955 9.91285 5.79695 9.75657C5.99436 9.60029 6.10526 9.38833 6.10526 9.16732C6.10526 8.9463 5.99436 8.73434 5.79695 8.57806C5.59955 8.42178 5.33181 8.33398 5.05263 8.33398C4.77346 8.33398 4.50572 8.42178 4.30831 8.57806C4.1109 8.73434 4 8.9463 4 9.16732C4 9.38833 4.1109 9.60029 4.30831 9.75657C4.50572 9.91285 4.77346 10.0007 5.05263 10.0007ZM5.05263 12.334C5.33181 12.334 5.59955 12.2462 5.79695 12.0899C5.99436 11.9336 6.10526 11.7217 6.10526 11.5007C6.10526 11.2796 5.99436 11.0677 5.79695 10.9114C5.59955 10.7551 5.33181 10.6673 5.05263 10.6673C4.77346 10.6673 4.50572 10.7551 4.30831 10.9114C4.1109 11.0677 4 11.2796 4 11.5007C4 11.7217 4.1109 11.9336 4.30831 12.0899C4.50572 12.2462 4.77346 12.334 5.05263 12.334ZM9.05263 9.16732C9.05263 9.38833 8.94173 9.60029 8.74432 9.75657C8.54692 9.91285 8.27918 10.0007 8 10.0007C7.72082 10.0007 7.45308 9.91285 7.25568 9.75657C7.05827 9.60029 6.94737 9.38833 6.94737 9.16732C6.94737 8.9463 7.05827 8.73434 7.25568 8.57806C7.45308 8.42178 7.72082 8.33398 8 8.33398C8.27918 8.33398 8.54692 8.42178 8.74432 8.57806C8.94173 8.73434 9.05263 8.9463 9.05263 9.16732ZM8 12.334C8.27918 12.334 8.54692 12.2462 8.74432 12.0899C8.94173 11.9336 9.05263 11.7217 9.05263 11.5007C9.05263 11.2796 8.94173 11.0677 8.74432 10.9114C8.54692 10.7551 8.27918 10.6673 8 10.6673C7.72082 10.6673 7.45308 10.7551 7.25568 10.9114C7.05827 11.0677 6.94737 11.2796 6.94737 11.5007C6.94737 11.7217 7.05827 11.9336 7.25568 12.0899C7.45308 12.2462 7.72082 12.334 8 12.334ZM12 9.16732C12 9.38833 11.8891 9.60029 11.6917 9.75657C11.4943 9.91285 11.2265 10.0007 10.9474 10.0007C10.6682 10.0007 10.4005 9.91285 10.203 9.75657C10.0056 9.60029 9.89474 9.38833 9.89474 9.16732C9.89474 8.9463 10.0056 8.73434 10.203 8.57806C10.4005 8.42178 10.6682 8.33398 10.9474 8.33398C11.2265 8.33398 11.4943 8.42178 11.6917 8.57806C11.8891 8.73434 12 8.9463 12 9.16732Z" fill="#4E4E4E" stroke="white" strokeWidth="0.2" /><path fillRule="evenodd" clipRule="evenodd" d="M4.90323 1.33398C5.05722 1.33398 5.20491 1.39441 5.3138 1.50197C5.4227 1.60952 5.48387 1.7554 5.48387 1.90751V2.48104H10.5161V1.90751C10.5161 1.7554 10.5773 1.60952 10.6862 1.50197C10.7951 1.39441 10.9428 1.33398 11.0968 1.33398C11.2508 1.33398 11.3985 1.39441 11.5074 1.50197C11.6162 1.60952 11.6774 1.7554 11.6774 1.90751V2.48716C11.7951 2.49022 11.9048 2.49583 12.0065 2.50398C12.3006 2.52693 12.5763 2.57893 12.8372 2.71046C13.2378 2.91209 13.5636 3.23386 13.7677 3.62963C13.9009 3.88734 13.9535 4.15957 13.9768 4.45016C14 4.72928 14 5.06957 14 5.47869V11.3363C14 11.7455 14 12.0857 13.9768 12.3649C13.9535 12.6555 13.9009 12.9277 13.7677 13.1854C13.5638 13.5811 13.2383 13.9028 12.8379 14.1046C12.5763 14.2361 12.3006 14.2881 12.0065 14.311C11.7239 14.334 11.3794 14.334 10.9659 14.334H5.03484C4.62065 14.334 4.27613 14.334 3.99355 14.311C3.69935 14.2881 3.42374 14.2361 3.16284 14.1046C2.76239 13.9033 2.43665 13.5821 2.23226 13.1869C2.0991 12.9285 2.04645 12.6562 2.02323 12.3656C2 12.0865 2 11.7462 2 11.3379V5.47869C2 5.06957 2 4.72928 2.02323 4.45016C2.04645 4.15957 2.0991 3.88734 2.23226 3.62963C2.43639 3.23386 2.76215 2.91209 3.16284 2.71046C3.42374 2.57893 3.69935 2.52693 3.99355 2.50398C4.09523 2.49583 4.2049 2.49022 4.32258 2.48716V1.90751C4.32258 1.8322 4.3376 1.75762 4.36678 1.68803C4.39596 1.61845 4.43873 1.55522 4.49265 1.50197C4.54657 1.44871 4.61058 1.40646 4.68102 1.37764C4.75147 1.34882 4.82697 1.33398 4.90323 1.33398ZM4.32258 3.81928V3.63422C4.24429 3.6366 4.16607 3.64093 4.088 3.64722C3.86581 3.66481 3.75974 3.69693 3.69006 3.7321C3.50768 3.8238 3.35941 3.97024 3.26658 4.1504C3.23097 4.21922 3.19845 4.32398 3.18065 4.54346C3.16206 4.76981 3.16129 5.06345 3.16129 5.50163V5.92222H12.8387V5.50163C12.8387 5.06422 12.8387 4.76981 12.8194 4.54346C12.8015 4.32398 12.769 4.21922 12.7334 4.1504C12.6406 3.97024 12.4923 3.8238 12.3099 3.7321C12.2403 3.69693 12.1342 3.66481 11.9112 3.64722C11.8334 3.64095 11.7555 3.63661 11.6774 3.63422V3.81928C11.6774 3.97139 11.6162 4.11727 11.5074 4.22483C11.3985 4.33238 11.2508 4.39281 11.0968 4.39281C10.9428 4.39281 10.7951 4.33238 10.6862 4.22483C10.5773 4.11727 10.5161 3.97139 10.5161 3.81928V3.6281H5.48387V3.81928C5.48387 3.97139 5.4227 4.11727 5.3138 4.22483C5.20491 4.33238 5.05722 4.39281 4.90323 4.39281C4.74923 4.39281 4.60154 4.33238 4.49265 4.22483C4.38376 4.11727 4.32258 3.97139 4.32258 3.81928ZM12.8387 6.68693H3.16129V11.3134C3.16129 11.7508 3.16129 12.0452 3.18065 12.2708C3.19845 12.491 3.23097 12.5958 3.26658 12.6646C3.35948 12.8451 3.50735 12.9912 3.69006 13.0829C3.75974 13.1181 3.86581 13.1502 4.088 13.1678C4.31716 13.1862 4.61445 13.1869 5.05806 13.1869H10.9419C11.3848 13.1869 11.6828 13.1869 11.9112 13.1678C12.1342 13.1502 12.2403 13.1181 12.3099 13.0829C12.4923 12.9912 12.6406 12.8448 12.7334 12.6646C12.769 12.5958 12.8015 12.491 12.8194 12.2708C12.8379 12.0452 12.8387 11.7508 12.8387 11.3134V6.68693Z" fill="#4E4E4E" stroke="white" strokeWidth="0.2" /></svg>);
const PhoneIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.85403 1.30993L5.62485 1.07758C6.49838 0.814277 7.43169 1.2398 7.80578 2.07194L8.40134 3.39675C8.7202 4.10603 8.55217 4.9396 7.98342 5.46996L6.99642 6.39036C6.96757 6.41726 6.9493 6.4536 6.94493 6.4928C6.91563 6.75512 7.09346 7.26596 7.50315 7.97557C7.80107 8.4916 8.07073 8.85348 8.30025 9.05701C8.46017 9.19881 8.5482 9.22948 8.58567 9.21832L9.91351 8.81236C10.657 8.58505 11.4627 8.85611 11.9176 9.48657L12.7635 10.659C13.296 11.3969 13.2002 12.415 12.5395 13.0407L11.9541 13.5951C11.3223 14.1934 10.423 14.4163 9.58499 14.1824C7.76587 13.6747 6.13486 12.1395 4.67388 9.60905C3.21088 7.07505 2.69753 4.89242 3.17076 3.06161C3.38732 2.22376 4.02546 1.55968 4.85403 1.30993ZM5.13997 2.25854C4.64283 2.40839 4.25994 2.80684 4.13 3.30955C3.73194 4.84955 4.18694 6.7841 5.53192 9.11367C6.87509 11.4401 8.32092 12.8009 9.85135 13.2281C10.3542 13.3685 10.8938 13.2347 11.2728 12.8757L11.8583 12.3213C12.1586 12.0369 12.2021 11.5741 11.9601 11.2387L11.1141 10.0663C10.9074 9.77972 10.5411 9.65652 10.2032 9.75984L8.87203 10.1668C8.09942 10.3971 7.39816 9.77528 6.64511 8.47096C6.13764 7.59199 5.90111 6.91253 5.96028 6.38283C5.99092 6.10843 6.11878 5.85406 6.32071 5.66575L7.30772 4.74536C7.56624 4.50428 7.64262 4.12539 7.49768 3.80299L6.90212 2.47818C6.73208 2.09993 6.30785 1.90651 5.91079 2.0262L5.13997 2.25854Z" fill="#4E4E4E" /></svg>);
const EmailIcon = () => (<svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.6875 10.5H1.3125C0.58625 10.5 0 9.91375 0 9.1875V1.3125C0 0.58625 0.58625 0 1.3125 0H12.6875C13.4137 0 14 0.58625 14 1.3125V9.1875C14 9.91375 13.4137 10.5 12.6875 10.5ZM1.3125 0.875C1.0675 0.875 0.875 1.0675 0.875 1.3125V9.1875C0.875 9.4325 1.0675 9.625 1.3125 9.625H12.6875C12.9325 9.625 13.125 9.4325 13.125 9.1875V1.3125C13.125 1.0675 12.9325 0.875 12.6875 0.875H1.3125Z" fill="#4E4E4E" /><path d="M6.99999 6.9648C6.38749 6.9648 5.82749 6.7198 5.40749 6.27355L0.813744 1.39105C0.647494 1.21605 0.656244 0.936049 0.831244 0.769799C1.00624 0.603549 1.28624 0.612299 1.45249 0.787299L6.04624 5.6698C6.54499 6.20355 7.45499 6.20355 7.95374 5.6698L12.5475 0.796049C12.7137 0.621049 12.9937 0.612299 13.1687 0.778549C13.3437 0.944799 13.3525 1.2248 13.1862 1.3998L8.59249 6.2823C8.17249 6.72855 7.61249 6.97355 6.99999 6.97355V6.9648Z" fill="#4E4E4E" /></svg>);

const initialValues = {
    aadhaarNo: '',
    previousChaitanyaId: '',
    firstName: '',
    lastName: '',
    dob: '',
    contactNumber: '',
    email: '',
    totalExperience: '',
    gender: '', // Changed from genderId to gender for GenderSelection component
    qualificationId: 0,
    joiningAsId: 0,
    streamId: 0,
    subjectId: 0,
    emp_level_id: 0,
    emp_structure_id: 0,
    emp_grade_id: 0,
    empTypeId: 0,
    groupId: 0,
    cmpsId: 0,
    cityId: 0,
    buildingId: 0,
    createdBy: 0
};

const validationSchema = Yup.object().shape({
    // Personal Information
    aadhaarNo: Yup.number()
        .required('Aadhaar number is required')
        .test('len', 'Aadhaar must be exactly 12 digits', val => val && val.toString().length === 12)
        .positive('Aadhaar number must be positive')
        .integer('Aadhaar number must be a whole number'),

    previousChaitanyaId: Yup.string()
        .nullable()
        .notRequired(),

    firstName: Yup.string()
        .required('First Name is required')
        .min(2, 'First Name must be at least 2 characters')
        .max(50, 'First Name must not exceed 50 characters')
        .matches(/^[a-zA-Z\s]+$/, 'First Name should only contain letters'),

    lastName: Yup.string()
        .required('Last Name is required')
        .min(2, 'Last Name must be at least 2 characters')
        .max(50, 'Last Name must not exceed 50 characters')
        .matches(/^[a-zA-Z\s]+$/, 'Last Name should only contain letters'),

    dob: Yup.string()
        .required('Date of Birth is required')
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
        .test('age', 'Must be at least 18 years old', function (value) {
            if (!value) return false;
            const today = new Date();
            const birthDate = new Date(value);
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                return age - 1 >= 18;
            }
            return age >= 18;
        }),

    contactNumber: Yup.number()
        .required('Contact Number is required')
        .test('len', 'Contact number must be exactly 10 digits', val => val && val.toString().length === 10)
        .positive('Contact number must be positive')
        .integer('Contact number must be a whole number'),

    email: Yup.string()
        .required('Email is required')
        .email('Invalid email format')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'),

    gender: Yup.string()
        .required('Gender is required')
        .oneOf(['Male', 'Female'], 'Please select a valid gender'),

    qualificationId: Yup.number()
        .required('Qualification is required')
        .positive('Please select a qualification')
        .integer(),

    // Professional Information
    totalExperience: Yup.number()
        .required('Total Experience is required')
        .min(0, 'Experience cannot be negative')
        .max(50, 'Experience cannot exceed 50 years'),

    joiningAsId: Yup.number()
        .required('Joining As is required')
        .positive('Please select joining type')
        .integer(),

    streamId: Yup.number()
        .required('Stream is required')
        .positive('Please select a stream')
        .integer(),

    subjectId: Yup.number()
        .required('Subject is required')
        .positive('Please select a subject')
        .integer(),

    emp_level_id: Yup.number()
        .required('Employee Level is required')
        .positive('Please select employee level')
        .integer(),

    // Location Details
    cityId: Yup.number()
        .required('City is required')
        .positive('Please select a city')
        .integer(),

    cmpsId: Yup.number()
        .required('Campus is required')
        .positive('Please select a campus')
        .integer(),

    buildingId: Yup.number()
        .required('Building is required')
        .positive('Please select a building')
        .integer(),

    // Administrative Details
    emp_structure_id: Yup.number()
        .required('Employee Structure is required')
        .positive('Please select structure')
        .integer(),

    emp_grade_id: Yup.number()
        .required('Employee Grade is required')
        .positive('Please select grade')
        .integer(),

    empTypeId: Yup.number()
        .required('Employee Type is required')
        .positive('Please select employee type')
        .integer(),

    groupId: Yup.number()
        .required('Group is required')
        .positive('Please select a group')
        .integer(),
});

// Helper component to watch city changes
const CityIdWatcher = ({ setSelectedCityId }) => {
    const { values } = useFormikContext();
    useEffect(() => {
        if (values.cityId) {
            setSelectedCityId(values.cityId);
        } else {
            setSelectedCityId(null);
        }
    }, [values.cityId, setSelectedCityId]);
    return null;
};

// Helper component to watch campus changes
const CampusIdWatcher = ({ setSelectedCampusId }) => {
    const { values } = useFormikContext();
    useEffect(() => {
        if (values.cmpsId) {
            setSelectedCampusId(values.cmpsId);
        } else {
            setSelectedCampusId(null);
        }
    }, [values.cmpsId, setSelectedCampusId]);
    return null;
};

// Helper component to watch Joining As changes
const JoiningAsWatcher = ({ joiningTypeOptions, setIsNewJoiner }) => {
    const { values, setFieldValue } = useFormikContext();
    useEffect(() => {
        const selectedOption = joiningTypeOptions.find(opt => opt.value == values.joiningAsId);
        if (selectedOption && selectedOption.label === 'New') {
            setIsNewJoiner(true);
            setFieldValue('totalExperience', 0);
        } else {
            setIsNewJoiner(false);
        }
    }, [values.joiningAsId, joiningTypeOptions, setIsNewJoiner, setFieldValue]);
    return null;
};

// Placeholders / Hardcoded options
// 'Teach' hardcoded for employment type
const empTypeOptions = [{ label: 'Teach', value: 1 }];
const genderOptions = [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }];

const SkillTestForm = forwardRef(({ onSubmitSuccess, onBack, isSubmitting = false }, ref) => {
    const formikRef = useRef();
    const [selectedCityId, setSelectedCityId] = useState(null);
    const [selectedCampusId, setSelectedCampusId] = useState(null);
    const [isNewJoiner, setIsNewJoiner] = useState(false);

    // Queries
    const { data: qualificationsList } = useQualifications();
    const { data: joiningAsList } = useJoiningAs();
    const { data: streamsList } = useStreams();
    const { data: employeeLevelsList } = useEmployeeLevels();
    const { data: citiesList } = useCities();
    const { data: campusesList } = useCampuses(selectedCityId);

    // New Queries
    const { data: structuresList } = useStructures();
    const { data: gradesList } = useGrades();
    const { data: groupsList } = useOrientationGroups();

    const { data: buildingsList } = useBuildings(selectedCampusId);
    const { data: subjectsList } = useSubjects();

    const { mutate: saveSkillTest } = useSaveSkillTestDetails();

    useImperativeHandle(ref, () => ({
        submitForm: () => {
            if (formikRef.current) {
                formikRef.current.submitForm();
            }
        }
    }));

    const skillSteps = [{ label: "Skill Test Form" }];

    // --- MAPPING HELPERS ---
    const mapToOptions = (data, labelKey = 'name', valueKey = 'id') =>
        Array.isArray(data) ? data.map(item => ({ label: item[labelKey] || item.name || item, value: item[valueKey] || item.id || item })) : [];

    // Mapped Options
    const qualificationOptionsResult = mapToOptions(qualificationsList);
    const joiningTypeOptionsResult = mapToOptions(joiningAsList);
    const streamOptionsResult = mapToOptions(streamsList);
    const levelOptionsResult = mapToOptions(employeeLevelsList);
    const cityOptionsResult = mapToOptions(citiesList, 'cityName', 'cityId');
    const campusOptionsResult = mapToOptions(campusesList, 'campusName', 'campusId');


    // Map all subjects from API
    const subjectOptionsResult = Array.isArray(subjectsList)
        ? subjectsList
            .map(sub => ({
                label: sub.subjectName || sub.subject_name || sub.name,
                value: sub.subjectId || sub.subject_id || sub.id
            }))
        : [];

    const structureOptionsResult = mapToOptions(structuresList);
    const gradeOptionsResult = mapToOptions(gradesList);
    const groupOptionsResult = mapToOptions(groupsList);
    const buildingOptionsResult = mapToOptions(buildingsList, 'buildingName', 'buildingId');

    const handleSubmit = (values, { setSubmitting }) => {
        const payload = { ...values };
        // Ensure values are numbers where expected by API
        payload.aadhaarNo = Number(payload.aadhaarNo);
        payload.contactNumber = Number(payload.contactNumber);
        payload.totalExperience = Number(payload.totalExperience);

        // Map gender string to genderId for API
        payload.genderId = values.gender === 'Male' ? 1 : values.gender === 'Female' ? 2 : 0;
        delete payload.gender; // Remove gender field, use genderId instead

        // TODO: Replace hardcoded employee ID with authenticated user ID from auth context
        // For now using hardcoded ID: 5217
        // After authentication/authorization: const employeeId = useAuth().user.id;
        const employeeId = 5217;

        // Ensure createdBy is set
        payload.createdBy = employeeId;

        saveSkillTest({ id: employeeId, data: payload }, {
            onSuccess: (data) => {
                if (onSubmitSuccess) onSubmitSuccess(data);
                setSubmitting(false);
            },
            onError: (err) => {
                console.error(err);
                setSubmitting(false);
            }
        });
    };

    return (
        <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue, setFieldTouched, touched, errors }) => (
                <Form>
                    <CityIdWatcher setSelectedCityId={setSelectedCityId} />
                    <CampusIdWatcher setSelectedCampusId={setSelectedCampusId} />
                    <JoiningAsWatcher joiningTypeOptions={joiningTypeOptionsResult} setIsNewJoiner={setIsNewJoiner} />
                    <div className={styles.formGrid}>

                        <label className={styles.groupLabel}>
                            <span className={styles.groupLabelText}>Personal Information <BorderIcon /> </span>
                            <div className={styles.groupLabelLine}></div>
                        </label>

                        {/* --- Row 1 --- */}
                        <div className={styles.fieldWrapper}>
                            <Field name="aadhaarNo" component={FormikInputbox} label="Aadhaar No" placeholder="Enter Aadhaar number" />
                            <ErrorMessage name="aadhaarNo" component="div" className={styles.error} />
                        </div>
                        <div className={styles.fieldWrapper}>
                            <Field name="previousChaitanyaId" component={FormikInputbox} label="Previous Chaitanya ID" placeholder="Enter Chaitanya ID" />
                        </div>
                        <div className={styles.fieldWrapper}>
                            <GenderSelection
                                values={values}
                                setFieldValue={setFieldValue}
                                setFieldTouched={setFieldTouched}
                                touched={touched}
                                errors={errors}
                                genderOptions={genderOptions}
                                isSubmitted={false}
                                externalErrors={{}}
                                onClearFieldError={() => { }}
                            />

                        </div>

                        {/* --- Row 2 --- */}
                        <div className={styles.fieldWrapper}>
                            <Field name="firstName" component={FormikInputbox} label="First Name" placeholder="First Name" />
                            <ErrorMessage name="firstName" component="div" className={styles.error} />
                        </div>
                        <div className={styles.fieldWrapper}>
                            <Field name="lastName" component={FormikInputbox} label="Last Name" placeholder="Last Name" />
                            <ErrorMessage name="lastName" component="div" className={styles.error} />
                        </div>
                        <div className={styles.fieldWrapper}>
                            <Field name="dob" component={FormikInputbox} label="Date of Birth" placeholder="YYYY-MM-DD" rightIcon={<CalendarIcon />} />
                            <ErrorMessage name="dob" component="div" className={styles.error} />
                        </div>

                        {/* --- Row 3 --- */}
                        <div className={styles.fieldWrapper}>
                            <Field name="contactNumber" component={FormikInputbox} label="Contact Number" placeholder="Enter number" rightIcon={<PhoneIcon />} />
                            <ErrorMessage name="contactNumber" component="div" className={styles.error} />
                        </div>
                        <div className={styles.fieldWrapper}>
                            <Field name="email" component={FormikInputbox} label="Email" placeholder="Enter email id" rightIcon={<EmailIcon />} />
                            <ErrorMessage name="email" component="div" className={styles.error} />
                        </div>
                        <div className={styles.fieldWrapper}>
                            <Field name="qualificationId" component={FormikDropdown} dropdownname="Qualification" results={qualificationOptionsResult} />
                            <ErrorMessage name="qualificationId" component="div" className={styles.error} />
                        </div>

                        {/* --- Professional Information --- */}
                        <label className={styles.groupLabel}>
                            <span className={styles.groupLabelText}>Professional Information <BorderIcon /> </span>
                            <div className={styles.groupLabelLine}></div>
                        </label>

                        {/* --- Row 4 --- */}

                        <div className={styles.fieldWrapper}>
                            <Field name="joiningAsId" component={FormikDropdown} dropdownname="Joining As" results={joiningTypeOptionsResult} />
                            <ErrorMessage name="joiningAsId" component="div" className={styles.error} />
                        </div>

                        {!isNewJoiner && (
                            <div className={styles.fieldWrapper}>
                                <Field name="totalExperience" component={FormikInputbox} label="Total Experience" placeholder="Enter Total Experience" />
                                <ErrorMessage name="totalExperience" component="div" className={styles.error} />
                            </div>
                        )}

                        {/* --- Row 5 --- */}
                        <div className={styles.fieldWrapper}>
                            <Field name="streamId" component={FormikDropdown} dropdownname="Stream" results={streamOptionsResult} />
                            <ErrorMessage name="streamId" component="div" className={styles.error} />
                        </div>
                        <div className={styles.fieldWrapper}>
                            <Field name="subjectId" component={FormikDropdown} dropdownname="Subject" results={subjectOptionsResult} />
                            <ErrorMessage name="subjectId" component="div" className={styles.error} />
                        </div>
                        <div className={styles.fieldWrapper}>
                            <Field name="emp_level_id" component={FormikDropdown} dropdownname="Employee Level" results={levelOptionsResult} />
                            <ErrorMessage name="emp_level_id" component="div" className={styles.error} />
                        </div>

                        {/* --- NEW SECTION: Location Details --- */}
                        <label className={styles.groupLabel}>
                            <span className={styles.groupLabelText}>Location Details <BorderIcon /> </span>
                            <div className={styles.groupLabelLine}></div>
                        </label>

                        <div className={styles.fieldWrapper}>
                            <Field name="cityId" component={FormikDropdown} dropdownname="City" results={cityOptionsResult} />
                            <ErrorMessage name="cityId" component="div" className={styles.error} />
                        </div>
                        <div className={styles.fieldWrapper}>
                            <Field name="cmpsId" component={FormikDropdown} dropdownname="Campus" results={campusOptionsResult} />
                            <ErrorMessage name="cmpsId" component="div" className={styles.error} />
                        </div>
                        <div className={styles.fieldWrapper}>
                            <Field name="buildingId" component={FormikDropdown} dropdownname="Building" results={buildingOptionsResult} />
                            <ErrorMessage name="buildingId" component="div" className={styles.error} />
                        </div>

                        {/* --- NEW SECTION: Administrative Details --- */}
                        <label className={styles.groupLabel}>
                            <span className={styles.groupLabelText}>Employee Hierarchy Details <BorderIcon /> </span>
                            <div className={styles.groupLabelLine}></div>
                        </label>

                        <div className={styles.fieldWrapper}>
                            <Field name="emp_structure_id" component={FormikDropdown} dropdownname="Emp Structure" results={structureOptionsResult} />
                            <ErrorMessage name="emp_structure_id" component="div" className={styles.error} />
                        </div>
                        <div className={styles.fieldWrapper}>
                            <Field name="emp_grade_id" component={FormikDropdown} dropdownname="Emp Grade" results={gradeOptionsResult} />
                            <ErrorMessage name="emp_grade_id" component="div" className={styles.error} />
                        </div>
                        <div className={styles.fieldWrapper}>
                            <Field name="empTypeId" component={FormikDropdown} dropdownname="Emp Type" results={empTypeOptions} />
                            <ErrorMessage name="empTypeId" component="div" className={styles.error} />
                        </div>
                        <div className={styles.fieldWrapper}>
                            <Field name="groupId" component={FormikDropdown} dropdownname="Group" results={groupOptionsResult} />
                            <ErrorMessage name="groupId" component="div" className={styles.error} />
                        </div>

                    </div>

                    <OnboardingFooter
                        currentStep={0}
                        totalSteps={1}
                        onBack={onBack}
                        onFinish={() => formikRef.current?.submitForm()}
                        allSteps={skillSteps}
                        isSubmitting={isSubmitting || false} // Add safety
                        primaryButtonLabel={isSubmitting ? "Submitting..." : "Submit"}
                        hideSkip={true}
                    />
                </Form>
            )}
        </Formik>
    );
});

export default SkillTestForm;
