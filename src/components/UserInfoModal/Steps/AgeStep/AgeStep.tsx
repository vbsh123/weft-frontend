import { FC } from "react";
import { StepProps } from "../../UserInfoModal";
import './AgeStep.css';

const AgeStep: FC<StepProps> = ({ onDataChange, userData, errors, touched, onBlur}) => {

    return (
        <div className="step">
            <div className="title">Age</div>
            <div >
                <label>Age:</label>
                <input
                    className="input"
                    name="age"
                    value={userData.age}
                    onBlur={onBlur}
                    onChange={onDataChange} />
                {touched.age && errors.age && <div className="error">{errors.age}</div>}
            </div>
        </div>
    );
};

export default AgeStep;