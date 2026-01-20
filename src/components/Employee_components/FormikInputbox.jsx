import React from 'react';
import Inputbox from '../../widgets/Employee_widgets/Inputbox/InputBox';

const FormikInputbox = ({ field, form, ...props }) => {
    const handleChange = (event) => {
        // Handle both regular events and custom events from Inputbox
        if (event.target) {
            field.onChange(event);
        }
    };

    return (
        <Inputbox
            name={field.name}
            value={field.value}
            onChange={handleChange}
            {...props}
        />
    );
};

export default FormikInputbox;
