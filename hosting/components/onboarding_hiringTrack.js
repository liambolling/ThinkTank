import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function StepHiringTrack({ onPreviousStep, isActive }) {

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
        <div className={`tab-pane fade ${isActive ? 'show active' : ''}`} id="wizardStepHiring" role="tabpanel" aria-labelledby="wizardTabHiring">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                    <h6 className="mb-4 text-uppercase text-body-secondary">
                        Step X
                    </h6>
                    <h1 className="mb-3">
                        HIRING
                    </h1>
                    <p className="mb-5 text-body-secondary">
                        Understanding the type of team you're creating help us to ask all the right questions.
                    </p>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="mb-5">
                        <label className="form-label" htmlFor="hiringQuestion">What do you want to do with:</label>
                        <input type="text" className="form-control" id="hiringQuestion" placeholder="Should we hire this candidate" />
                    </div>

                    <div className="mb-5">
                        <label className="form-label">Upload Resume</label>
                        <div className="dropzone dropzone-multiple dz-clickable" data-dropzone='{"url": "/"}'>
                            <div className="fallback">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="resumeUpload" />
                                    <label className="custom-file-label" htmlFor="resumeUpload">Choose file</label>
                                </div>
                            </div>
                            <div className="dz-default dz-message">
                                <button className="dz-button" type="button">Drop resume here or click to upload</button>
                            </div>
                        </div>
                    </div>

                    <div className="mb-5">
                        <label className="form-label" htmlFor="jobDescription">Job Description</label>
                        <textarea className="form-control" id="jobDescription" rows="4"></textarea>
                    </div>

                    <div className="mb-5">
                        <label className="form-label" htmlFor="interviewFeedback">Interview Feedback (Optional)</label>
                        <textarea className="form-control" id="interviewFeedback" rows="3"></textarea>
                    </div>

                    <div className="mb-5">
                        <label className="form-label" htmlFor="companyWebsite">Company Website (Optional)</label>
                        <input type="url" className="form-control" id="companyWebsite" placeholder="https://example.com" />
                    </div>


                    <hr class="my-5"></hr>

                    <div class="nav row align-items-center">
                        <div class="col-auto">
                            <button className="btn btn-lg btn-white" type="button" onClick={onPreviousStep}>
                                Back
                            </button>
                        </div>
                        <div class="col text-center">
                            <h6 class="text-uppercase text-body-secondary mb-0">Step 2 of 3</h6>
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