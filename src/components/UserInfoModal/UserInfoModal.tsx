import { FC, useState } from "react";
import { useLocalStorage } from 'react-use';
import { FormikErrors, FormikTouched, useFormik } from "formik";
import { UserData } from "../../types/UserData";
import { steps } from "./Steps/steps";
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

const initialUserData: UserData = {
    firstName: '',
    lastName: '',
    age: '',
}
  
  const UserInfoModal: FC<Props> = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [, setValue] = useLocalStorage('user');
    const CurrentStepComponent = steps[currentStep].component

    const formik = useFormik({
      initialValues: initialUserData,
      validationSchema: steps[currentStep].validations,
      onSubmit: () => {
          setCurrentStep(step => step + 1)
      }
  });

    const handleFinish = () => {
        setValue(formik.values)
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
              <button onClick={handleFinish}>Finish</button> : 
              <button type="submit" onClick={() => formik.handleSubmit()}>Next</button> }
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserInfoModal;