import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';


export default function StepPitchDeckRoast({ onPreviousStep }) {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        setIsLoading(true);

        // Simulate a Firebase function call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Navigate to the team-members page
        router.push('/team-members');
    };

    return (
        <div className="tab-pane fade show active" id="wizardStepPitchDeck" role="tabpanel" aria-labelledby="wizardTabPitchDeck">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                    <h6 className="mb-4 text-uppercase text-body-secondary">
                        Pitch Deck Roast
                    </h6>
                    <h1 className="mb-3">
                        Let's review your pitch deck
                    </h1>
                    <p className="mb-5 text-body-secondary">
                        Upload your pitch deck and tell us about your target VC to get personalized feedback.
                    </p>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="mb-5">
                        <label className="form-label">Upload your pitch deck</label>
                        <div className="card">
                            <div className="card-body">
                                <div className="dropzone dropzone-multiple" data-dropzone='{"url": "https://"}'>
                                    <div className="fallback">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="pitchDeckUpload">Choose file</label>
                                            <input className="form-control" type="file" id="pitchDeckUpload" />
                                        </div>
                                    </div>
                                    <div className="dz-message" data-dz-message>
                                        <span>Drop your pitch deck here or click to upload</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-5">
                        <label className="form-label" htmlFor="targetVC">Target VC (optional)</label>
                        <input type="text" className="form-control" id="targetVC" placeholder="Enter the name of your target VC" />
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