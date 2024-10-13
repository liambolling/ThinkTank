
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getFunctions, httpsCallable } from 'firebase/functions';

import StepOne from '../components/onboarding_stepOne';
import StepHiringTrack from '../components/onboarding_hiringTrack';
import StepCustomerTrack from '../components/onboarding_customerTrack';
import StepPitchDeckRoast from '../components/onboarding_pitchTrack';
import GeneratedBots from '../components/generatedBots';
import ChatDiscussion from '../components/chatDiscussion';

export default function startPage() {

  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(router.query.step || 'stepOne');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const goToNextStep = (nextStep) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(nextStep);
    }, 150); // Adjust this value to match the transition duration in CSS
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 150); // Adjust this value to match the transition duration in CSS
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const goToPreviousStep = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep('stepOne');
    }, 150); // Adjust this value to match the transition duration in CSS
  };

  useEffect(() => {
    if (router.query.step) {
      setCurrentStep(router.query.step);
    }
  }, [router.query.step]);


  const handleContinue = async () => {
    setIsLoading(true); // Set loading to true

    try {
      const functions = getFunctions();
      const createScript = httpsCallable(functions, 'createScript');
      const topic = "Should we stop restocking the fridge with eggs?";

      // Use the teamMembers state instead of hardcoded data
      const participants = teamMembers.map(member => ({
        name: member.name,
        description: member.description
      }));

      const result = await createScript({ participants, topic });
      console.log('Script created:', result.data);

      setChatMessages(result.data);
      goToNextStep('chatDiscussion');
    } catch (error) {
      console.error('Error creating script:', error);
      // Handle the error as needed
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'stepOne':
        return <StepOne onNextStep={goToNextStep} isActive={!isTransitioning} />;
      case 'hiringTrack':
        return <StepHiringTrack onPreviousStep={goToPreviousStep} onComplete={setTeamMembers} isActive={!isTransitioning} />;
      case 'customerTrack':
        return <StepCustomerTrack onPreviousStep={goToPreviousStep} onComplete={setTeamMembers} isActive={!isTransitioning} />;
      case 'pitchTrack':
        return <StepPitchDeckRoast onPreviousStep={goToPreviousStep} onComplete={setTeamMembers} isActive={!isTransitioning} />;
      case 'generatedBots':
        return <GeneratedBots teamMembers={teamMembers} onContinue={handleContinue} isLoading={isLoading} />;
      case 'chatDiscussion':
        return <ChatDiscussion messages={chatMessages} setMessages={setChatMessages} />;
      default:
        return <StepOne onNextStep={goToNextStep} isActive={!isTransitioning} />;
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












