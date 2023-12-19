import { useState } from 'react';

export const useForm = (initialValues, onSubmitHandler) => {
    const [formValues, setFormValues] = useState(initialValues);

    //function to check shallow equality of the old and new initial values shape
    function shallowEqual(obj1, obj2) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (let key of keys1) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
        return true;
    }

    const onChangeHandler = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    //create new onSubmit func to have formValues reference and return it to Create comp
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