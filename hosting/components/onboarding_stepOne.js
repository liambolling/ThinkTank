import Image from 'next/image';
import Link from 'next/link';

export default function StepOne({ onNextStep, isActive }) {
    return (
        <div className={`tab-pane fade ${isActive ? 'show active' : ''}`} id="wizardStepOne" role="tabpanel" aria-labelledby="wizardTabOne">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                    <h6 className="mb-4 text-uppercase text-body-secondary">
                        Step X
                    </h6>
                    <h1 className="mb-3">
                        Let's make a chat room
                    </h1>
                    <p className="mb-5 text-body-secondary">
                        Understanding the type of team you're creating help us to ask all the right questions.
                    </p>
                </div>
            </div>

            <div class="row justify-content-center">
                <div class="col-6 text-center">
                    <div class="card cursor-pointer" onClick={() => onNextStep('hiringTrack')} style={{ cursor: 'pointer' }}>
                        <div class="card-body text-center">
                            <div href="team-overview.html" class="card-avatar avatar avatar-lg mx-auto">
                                <Image
                                    src="/img_1.png"
                                    alt="Card image"
                                    width={100}
                                    height={100}
                                    layout="responsive"
                                    quality={100}
                                    priority
                                />
                            </div>
                            <h2 class="card-title">
                                <a href="team-overview.html">HIRING</a>
                            </h2>
                            <p class="card-text text-body-secondary">
                                Launchday is a SaaS website builder with a focus on quality, easy to build product sites.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="col-6 text-center">
                    <div class="card cursor-pointer" onClick={() => onNextStep('customerTrack')} style={{ cursor: 'pointer' }}>
                        <div class="card-body text-center">
                            <div class="card-avatar avatar avatar-lg mx-auto">
                                <Image
                                    src="/img_3.png"
                                    alt="Card image"
                                    width={100}
                                    height={100}
                                    layout="responsive"
                                    quality={100}
                                    priority
                                />
                            </div>
                            <h2 class="card-title">
                                <a href="team-overview.html">PRODUCT FEEDBACK</a>
                            </h2>
                            <p class="card-text text-body-secondary">
                                Launchday is a SaaS website builder with a focus on quality, easy to build product sites.
                            </p>
                        </div>
                    </div>

                </div>

                <div class="col-6 text-center">
                    <div class="card cursor-pointer" onClick={() => onNextStep('pitchTrack')} style={{ cursor: 'pointer' }}>
                        <div class="card-body text-center">
                            <div class="card-avatar avatar avatar-lg mx-auto">
                                <Image
                                    src="/img_2.png"
                                    alt="Card image"
                                    width={100}
                                    height={100}
                                    layout="responsive"
                                    quality={100}
                                    priority
                                />
                            </div>
                            <h2 class="card-title">
                                <a href="team-overview.html">PITCH DEC</a>
                            </h2>
                            <p class="card-text text-body-secondary">
                                Launchday is a SaaS website builder with a focus on quality, easy to build product sites.
                            </p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}