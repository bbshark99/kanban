import * as Yup from 'yup';

export const NameSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required')
})