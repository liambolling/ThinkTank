import Image from 'next/image';

export default function StepHiringTrack() {
    return (
        <div className="tab-pane fade show active" id="wizardStepOne" role="tabpanel" aria-labelledby="wizardTabOne">
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
                    <form>
                        {/* 1. Text input */}
                        <div className="mb-5">
                            <label className="form-label" htmlFor="hiringQuestion">What do you want to do with:</label>
                            <input type="text" className="form-control" id="hiringQuestion" placeholder="Should we hire this candidate" />
                        </div>

                        {/* 2. File upload (drag and drop) */}
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

                        {/* 3. Text area for job description */}
                        <div className="mb-5">
                            <label className="form-label" htmlFor="jobDescription">Job Description</label>
                            <textarea className="form-control" id="jobDescription" rows="4"></textarea>
                        </div>

                        {/* 4. Optional interview feedback */}
                        <div className="mb-5">
                            <label className="form-label" htmlFor="interviewFeedback">Interview Feedback (Optional)</label>
                            <textarea className="form-control" id="interviewFeedback" rows="3"></textarea>
                        </div>

                        {/* 5. Optional company website */}
                        <div className="mb-5">
                            <label className="form-label" htmlFor="companyWebsite">Company Website (Optional)</label>
                            <input type="url" className="form-control" id="companyWebsite" placeholder="https://example.com" />
                        </div>

                        {/* Submit button */}
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

            
        </div>
    );
}