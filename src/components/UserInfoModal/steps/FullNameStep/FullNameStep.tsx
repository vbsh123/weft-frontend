import { FC } from "react";
import { StepProps } from "../../UserInfoModal";
import './FullNameStep.css'

const FullNameStep: FC<StepProps> = ({ onDataChange, userData, errors, touched, onBlur }) => {
    return (
        <div className="step">
        <div className="title">
            Full Name
        </div>
        <div className="field">
            <label>First Name:</label>
            <input
                className="input"
                name="firstName"
                value={userData.firstName}
                onBlur={onBlur}
                onChange={onDataChange} />
            {touched.firstName && errors.firstName && <div className="error">{errors.firstName}</div>}
        </div>
        <div className="field">
                <label>Last Name:</label>
                <input
                    className="input"
                    name="lastName"
                    value={userData.lastName}
                    onBlur={onBlur}
                    onChange={onDataChange}/>
            {touched.lastName && errors.lastName && <div className="error">{errors.lastName}</div>}
            </div>
        </div>
    );
};

export default FullNameStep;