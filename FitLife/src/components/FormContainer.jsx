import React, {useState} from 'react';
import Navigation from './Navigation.jsx';

import StepName from './Steps/StepNameAndContact.jsx';
import StepAddress from './Steps/StepAddress.jsx';
import StepTraining from './Steps/StepTraining.jsx';
import StepPayment from './Steps/StepPayment.jsx';
import StepConfirmation from './Steps/StepConfirmation.jsx';

const STEPS = [
    {key: "nameContact", Comp: StepName},
    {key: "address", Comp: StepAddress},
    {key: "training", Comp: StepTraining},
    {key: "payment", Comp: StepPayment},
    {key: "confirmation", Comp: StepConfirmation},
];

function FormContainer(){
    const[currentStepIndex, setCurrentStepIndex] = useState(0);
    const [formData, setFormData] = useState({nameContact: {}, address: {}, training: {}, payment: {}});

    const [canNext, setCanNext] = useState(true);

    const totalSteps = STEPS.length;
    const {key, Comp} = STEPS[currentStepIndex];

    const enterStep = (n) => {
        setCurrentStepIndex(n);
        setCanNext(true);
    }

    const onNext = () => {
        if (currentStepIndex < totalSteps - 1 && canNext) enterStep(currentStepIndex + 1)
    }

    const onBack = () => {
        if (currentStepIndex > 0) enterStep(currentStepIndex - 1)
    }

    const setStepData = (stepKey, data) => {
        setFormData((prev) => ({
            ...prev,
            [stepKey]: { ...prev[stepKey], ...data },
        }))
    }

    const initialData = formData[key] || {};

    return (
        <>
            <Comp
                onNext={onNext}
                onBack={onBack}
                initialData={initialData}
                setCanNext={setCanNext}
                setStepData={(data) => setStepData(key, data)}
            />

            {currentStepIndex < totalSteps - 1 && (
                <Navigation
                    step={currentStepIndex}
                    totalSteps={totalSteps}
                    onBack={onBack}
                    onNext={onNext}
                    canNext={canNext}
                />
            )}
        </>
    )
}

export default FormContainer;