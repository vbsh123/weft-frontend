import { ComponentType, FC, useState } from "react";
import { useLocalStorage } from 'react-use';
import { FormikErrors, FormikTouched, useFormik } from "formik";
import * as yup from 'yup';
import FullNameStep from "./Steps/FullNameStep/FullNameStep";
import AgeStep from "./Steps/AgeStep/AgeStep";
import ReviewStep from "./Steps/ReviewStep/ReviewStep";
import { UserData } from "../../types/UserData";
import './UserInfoModal.css'

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

export type StepProps = {
    userData: Partial<UserData>;
    onDataChange: (e: React.ChangeEvent<any>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
} & {
  errors: FormikErrors<UserData>;
  touched: FormikTouched<UserData>;
};

const steps: ComponentType<StepProps>[] = [
    FullNameStep,
    AgeStep,
    ReviewStep
]

const initialUserData: UserData = {
    firstName: '',
    lastName: '',
    age: '',
}

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required')
    .max(20, 'First name must be at most 20 characters')
    .matches(/^[a-zA-Z]*$/, 'First name can only contain letters'),

  lastName: yup.string().required('Last name is required')
    .max(20, 'Last name must be at most 20 characters')
    .matches(/^[a-zA-Z]*$/, 'Last name can only contain letters'),

  age: yup.number().required('Age is required')
});
  
  const UserInfoModal: FC<Props> = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [, setValue] = useLocalStorage('user');
    const CurrentStepComponent = steps[currentStep]

    const formik = useFormik({
      initialValues: initialUserData,
      validationSchema,
      onSubmit: (userData) => {
          setValue(userData);
      }
  });

    const handleNext = () => {
        setCurrentStep(step => step + 1)
    }

    const handleBack = () => {
        setCurrentStep(step => step - 1)
    }

    const isCurrentStepLast = () => {
      return steps.length === currentStep + 1;
    }

    return (
        isOpen && 
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
          <div className="modal-header">           
            <h2>User Info</h2>
          </div>
            <div className="modal-body">
                {<CurrentStepComponent userData={formik.values} onDataChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors} touched={formik.touched} />}          
            </div>
            <div className="modal-footer">
              <button disabled={currentStep === 0} onClick={handleBack}>Back</button>
              { isCurrentStepLast() ? 
              <button type="submit" onClick={() => formik.handleSubmit()}>Finish</button> : 
              <button onClick={handleNext}>Next</button> }
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserInfoModal;