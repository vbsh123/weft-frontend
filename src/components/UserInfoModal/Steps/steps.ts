import { ComponentType } from "react";
import FullNameStep from "./FullNameStep/FullNameStep";
import { StepProps } from "../UserInfoModal";
import * as yup from 'yup'
import AgeStep from "./AgeStep/AgeStep";
import ReviewStep from "./ReviewStep/ReviewStep";

export const steps: {component: ComponentType<StepProps>, validations: yup.ObjectSchema<any, object>}[] = [
    { component: FullNameStep, 
      validations: yup.object().shape({
                firstName: yup.string().required('First name is required')
                .max(20, 'First name must be at most 20 characters')
                .matches(/^[a-zA-Z]*$/, 'First name can only contain letters'),
    
      lastName: yup.string().required('Last name is required')
                .max(20, 'Last name must be at most 20 characters')
                .matches(/^[a-zA-Z]*$/, 'Last name can only contain letters')}) 
    },
    {
        component: AgeStep,
        validations: yup.object().shape({
            age: yup.number().required('Age is required')
        })
    },
    {
        component: ReviewStep,
        validations: yup.object().shape({})
    }
    
]