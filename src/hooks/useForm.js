import { useState } from 'react';

export const useForm = (initialValues, onSubmitHandler) => {
    const [formValues, setFormValues] = useState(initialValues);

    const onChangeHandler = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    //create new onSubmit func to have formValues reference and return it to Create comp
    const onSubmit = (e) => {
        e.preventDefault();
        onSubmitHandler(formValues);
    }

    return { formValues, onChangeHandler, onSubmit };
}