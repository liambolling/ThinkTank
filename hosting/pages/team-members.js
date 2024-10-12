import { useState } from 'react';
import Image from 'next/image';

// Sample array of team members (chatbots)
const teamMembers = [
  { id: 1, name: 'AI Assistant', description: 'Your friendly AI assistant for general queries.' },
  { id: 2, name: 'Code Helper', description: 'Specialized in helping with coding problems and debugging.' },
  { id: 3, name: 'Data Analyst', description: 'Expert in data analysis and visualization.' },
  // Add more team members as needed
];

export default function TeamMembersPage() {
  return (
    <div className="main-content">
      <div className="container-lg">


        <div className="row justify-content-center py-6">
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

        <div className="row justify-content-center">
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
                        />                      </a>
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


          </div>


          <div className='col-8'>
            <hr class="my-5"></hr>

            <div class="nav row align-items-center">
              <div class="col-auto">
                <button className="btn btn-lg btn-white" type="button">
                  Back
                </button>
              </div>
              <div class="col text-center">
                <h6 class="text-uppercase text-body-secondary mb-0">Let's start the chatbot</h6>
              </div>
              <div class="col-auto">
                <a class="btn btn-lg btn-primary" data-toggle="wizard" href="#wizardStepTwo">Continue</a>
              </div>
            </div>
          </div>

        </div>



      </div>
    </div>
  );
}