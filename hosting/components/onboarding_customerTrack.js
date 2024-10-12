import { useState } from 'react';
import { useRouter } from 'next/router';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { PRODUCT_TANK_TYPE } from '../../functions/util/constants';

const functions = getFunctions();
const createTeamFunction = httpsCallable(functions, 'createTeam');

export default function StepCustomerTrack({ onPreviousStep }) {
    const [links, setLinks] = useState(''); // State for list of links
    const [file, setFile] = useState(null); // State for file upload
    const [description, setDescription] = useState(''); // State for description text
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Handle single file upload
    };

    const handleSubmit = async () => {
        if (!links || !file || !description) {
            alert("Please fill in all required fields.");
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('links', links);
            formData.append('file', file);
            formData.append('description', description);

            // Call Firebase function with the inputs
            await createTeamFunction({
                Tank: PRODUCT_TANK_TYPE,
                Links: formData.get('links').split(',').map(link => link.trim()), // Split links by comma and trim spaces
                File: formData.get('file'),
                Description: formData.get('description'),
            });

            // Navigate to the team-members page on success
            router.push('/team-members');
        } catch (error) {
            console.error("Error creating team:", error);
            alert("There was an error setting up the team. Please try again!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="tab-pane fade show active" id="wizardStepCustomer" role="tabpanel" aria-labelledby="wizardTabCustomer">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                    <h6 className="mb-4 text-uppercase text-body-secondary">Step X</h6>
                    <h1 className="mb-3">Tell us about your product</h1>
                    <p className="mb-5 text-body-secondary">
                        Provide the necessary details so we can help guide your product development.
                    </p>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                      {/* Description input */}
                      <div className="mb-5">
                        <label className="form-label" htmlFor="description">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            rows="4"
                            placeholder="Enter a detailed description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    {/* File upload input */}
                    <div className="mb-5">
                        <label className="form-label">Upload related file</label>
                        <div className="card">
                            <div className="card-body">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="customFileUpload">Choose a file</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="customFileUpload"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* List of Links input */}
                    <div className="mb-5">
                        <label className="form-label" htmlFor="links">List of Links</label>
                        <textarea
                            className="form-control"
                            id="links"
                            rows="3"
                            placeholder="Enter a comma-separated list of links..."
                            value={links}
                            onChange={(e) => setLinks(e.target.value)}
                        ></textarea>
                        <small className="form-text text-body-secondary mt-2">
                            Example: http://shepherdinsurance.com, http://google.com
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