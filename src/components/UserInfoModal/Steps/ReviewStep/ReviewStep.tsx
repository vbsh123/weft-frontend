import { FC } from "react";
import { StepProps } from "../../UserInfoModal";
import './ReviewStep.css';

const ReviewStep: FC<StepProps> = ({ userData }) => {

    return (
        <div className="step">
            <div className="title"> Review</div>
            <div>
            {Object.entries(userData).map(([field, value]) => (
                <div className="field" key={field}>
                    <strong>{field}:</strong> {value}
                </div>
            ))}
            </div>
         
        </div>
    );
};

export default ReviewStep;