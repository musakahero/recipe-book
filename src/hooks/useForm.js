import { useState } from 'react';
import shallowEqual from '../utils/shallowEqual'; //function to check shallow equality of the old and new initial values shape

export const useForm = (initialValues, onSubmitHandler) => {
    const [formValues, setFormValues] = useState(initialValues);

    const onChangeHandler = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    //create new onSubmit func to have formValues reference and return it
    const onSubmit = (e) => {
        e.preventDefault();
        onSubmitHandler(formValues);

    }

    const changeValues = (newValues) => {
        //Validate newValues shape (to be like initialValues) and if it's not - edit shape to match initialValues
        if (shallowEqual(initialValues, newValues)) {
            setFormValues(newValues);

        } else {
            for (const key in newValues) {
                if (!initialValues.hasOwnProperty(key)) {
                    delete newValues[key];
                    setFormValues(newValues);
                }
            }
        }
    }

    return { formValues, onChangeHandler, onSubmit, changeValues };
}