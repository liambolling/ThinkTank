import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function StepCustomerTrack({ onPreviousStep }) {

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
        <div className="tab-pane fade show active" id="wizardStepCustomer" role="tabpanel" aria-labelledby="wizardTabCustomer">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                    <h6 className="mb-4 text-uppercase text-body-secondary">
                        Step X
                    </h6>
                    <h1 className="mb-3">
                        Tell us about your product
                    </h1>
                    <p className="mb-5 text-body-secondary">
                        Understanding your product idea and customer goals helps us provide better insights and recommendations.
                    </p>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="mb-5">
                        <label className="form-label" htmlFor="productIdea">Tell us about your product idea:</label>
                        <textarea className="form-control" id="productIdea" rows="4" placeholder="Describe your product idea in detail..."></textarea>
                    </div>

                    <div className="mb-5">
                        <label className="form-label">Upload related files (optional)</label>
                        <div className="card">
                            <div className="card-body">
                                <div className="dropzone dropzone-multiple" data-dropzone='{"url": "https://"}'>
                                    <div className="fallback">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="customFileUpload">Choose files</label>
                                            <input className="form-control" type="file" id="customFileUpload" multiple />
                                        </div>
                                    </div>
                                    <div className="dz-message" data-dz-message>
                                        <span>Drop files here or click to upload</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-5">
                        <label className="form-label" htmlFor="customerGoal">What's your goal for this product?</label>
                        <textarea className="form-control" id="customerGoal" rows="3" placeholder="Describe your goals and target customers..."></textarea>
                        <small className="form-text text-body-secondary mt-2">
                            Consider the following:
                            <ul>
                                <li>How will you market this product to customers?</li>
                                <li>Would your target customers want this product?</li>
                                <li>Would they be willing to pay for it?</li>
                            </ul>
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
                            <h6 className="text-uppercase text-body-secondary mb-0">Step 2 of 3</h6>
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