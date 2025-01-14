import Image from 'next/image';


export default function GeneratedBots({ teamMembers, onContinue, isLoading }) {
  
    return (
        <div className='col-12 col-md-10 col-lg-8'>
            {teamMembers.map((member) => (
                <div key={member.id} className="card mb-3">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-auto">
                                <a href="#" className="avatar avatar-lg">
                                    <Image
                                        src="/bot.png"
                                        alt="Card image"
                                        width={100}
                                        height={100}
                                        layout="responsive"
                                        quality={100}
                                        priority
                                    />
                                </a>
                            </div>
                            <div className="col ms-n2">
                                <h4 className="mb-1">
                                    <a href="#">{member.name}</a>
                                </h4>
                                <p className="card-text small text-body-secondary mb-1">
                                    {member.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="text-center mt-4">
                <button className="btn btn-primary" onClick={onContinue}>  
                {isLoading ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Loading
                    </>
                ) : (
                    'Start Chat Discussion'
                )}
                </button>
            </div>
        </div>
    );
}