import { useState } from 'react';
import { useRouter } from 'next/router';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { TAlENT_TANK_TYPE } from '../../functions/util/constants';


const functions = getFunctions();
const createTeamFunction = httpsCallable(functions, 'createTeam');

export default function StepHiringTrack({ onPreviousStep, isActive, onComplete  }) {
    const [links, setLinks] = useState(''); // State for List of Links
    const [jobDescription, setJobDescription] = useState(''); // State for Job Description
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!links || !jobDescription) {
            alert("Please fill in all required fields");
            return;
        }

        setIsLoading(true);
        try {
            // Call Firebase function with the inputs
            var result = await createTeamFunction({
                Tank: TAlENT_TANK_TYPE,
                Links: links,
                JobDescription: jobDescription,
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
                        Understanding the type of team you're creating helps us ask all the right questions.
                    </p>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    {/* List of Links input */}
                    <div className="mb-5">
                        <label className="form-label" htmlFor="listOfLinks">Links</label>
                        <textarea
                            className="form-control"
                            id="listOfLinks"
                            rows="3"
                            placeholder="Provide any links that are relevant to the role you're hiring for"
                            value={links}
                            onChange={(e) => setLinks(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    {/* Job Description input */}
                    <div className="mb-5">
                        <label className="form-label" htmlFor="jobDescription">Job Description</label>
                        <textarea
                            className="form-control"
                            id="jobDescription"
                            rows="4"
                            placeholder="Enter the job description"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <hr className="my-5"></hr>

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