import { useState } from 'react';
import { useRouter } from 'next/router';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { PITCH_TANK_TYPE } from '../../functions/util/constants';

const functions = getFunctions();
const createTeamFunction = httpsCallable(functions, 'createTeam');

export default function StepPitchDeckRoast({ onPreviousStep, isActive, onComplete }) {
    const [file, setFile] = useState(null); // State for pitch deck file
    const [targetVCs, setTargetVCs] = useState(''); // State for target VCs
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!file || !targetVCs) {
            alert("Please upload a pitch deck and enter target VCs!");
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('targetVCs', targetVCs);

            // Call Firebase function with FormData
            var result =  await createTeamFunction({
                Tank: PITCH_TANK_TYPE,
                file: formData.get('file'),
                VCList: formData.get('targetVCs'),
            });

            const messageContent = JSON.parse(result.data.message.content);
            console.log(messageContent);
            console.log(messageContent.personas);

            // Assuming the result contains the team members
            onComplete(messageContent.personas);

            // Navigate to the generated bots page on success
            router.push('/start?step=generatedBots');

        } catch (error) {
            console.error("Error creating team:", error);
            alert("There was an error setting up the team. Please try again!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`tab-pane fade ${isActive ? 'show active' : ''}`} id="wizardStepPitchDeck" role="tabpanel" aria-labelledby="wizardTabPitchDeck">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                    <h6 className="mb-4 text-uppercase text-body-secondary">Pitch Deck Review</h6>
                    <h1 className="mb-3">Let's review your pitch deck</h1>
                    <p className="mb-5 text-body-secondary">
                        Upload your pitch deck and tell us about your target VC(s) to get personalized feedback.
                    </p>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    {/* File upload input */}
                    <div className="mb-5">
                        <label className="form-label">Upload your pitch deck</label>
                        <div className="card">
                            <div className="card-body">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="pitchDeckUpload">Choose file</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="pitchDeckUpload"
                                        onChange={handleFileChange}
                                        accept=".pdf,.ppt,.pptx"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Target VCs input */}
                    <div className="mb-5">
                        <label className="form-label" htmlFor="targetVC">Target VCs</label>
                        <input
                            type="text"
                            className="form-control"
                            id="targetVC"
                            placeholder="Enter the name of your target VC(s)"
                            value={targetVCs}
                            onChange={(e) => setTargetVCs(e.target.value)}
                        />
                        <small className="form-text text-body-secondary mt-2">
                            Providing a target VC helps us tailor our feedback to their specific preferences and requirements.
                        </small>
                    </div>

                    <hr className="my-5" />

                    <div className="nav row align-items-center">
                        <div className="col-auto">
                            <button className="btn btn-lg btn-white" type="button" onClick={onPreviousStep}>
                                Back
                            </button>
                        </div>
                        <div className="col text-center">
                            <h6 className="text-uppercase text-body-secondary mb-0">Pitch Deck Roast</h6>
                        </div>
                        <div className="col-auto">
                            <button
                                className="btn btn-lg btn-primary"
                                onClick={handleSubmit}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Saving...
                                    </>
                                ) : (
                                    'Setup the Team'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}