import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const TodoSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .max(9000, 'Too Long!'),
    priority: Yup.number()
        .min(1)
        .max(3)
        .required('Required')
});