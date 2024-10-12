
import { useState } from 'react';
import Image from 'next/image';
import StepOne from '../components/onboarding_stepOne';
import StepHiringTrack from '../components/onboarding_hiringTrack';

export default function startPage() {

  const [currentStep, setCurrentStep] = useState('stepOne');

  const renderStep = () => {
    switch (currentStep) {
      case 'stepOne':
        return <StepOne onNextStep={() => setCurrentStep('hiringTrack')} />;
      case 'hiringTrack':
        return <StepHiringTrack />;
      default:
        return <StepOne onNextStep={() => setCurrentStep('hiringTrack')} />;
    }
  };


  return (
    <>
      <div className="main-content">
        <div className="container-lg">
          <div class="row">
            <div class="col-12 col-lg-12">
              <div className="tab-content py-6" id="wizardSteps">
                {renderStep()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}












