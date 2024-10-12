import { useState } from 'react';
import Image from 'next/image';

import { getFunctions, httpsCallable } from 'firebase/functions';


// Sample array of team members (chatbots)
const teamMembers = [
  { id: 1, name: 'AI Assistant', description: 'Your friendly AI assistant for general queries.' },
  { id: 2, name: 'Code Helper', description: 'Specialized in helping with coding problems and debugging.' },
  { id: 3, name: 'Data Analyst', description: 'Expert in data analysis and visualization.' },
  // Add more team members as needed
];

export default function TeamMembersPage() {

  const [chatMessages, setChatMessages] = useState([]);

  const handleContinue = async () => {
    try {
      const functions = getFunctions();
      const createScript = httpsCallable(functions, 'createScript');
      const topic = "Should we stop restocking the fridge with eggs?"
      const participants = [
        {
          "name": "Technical Hiring Manager",
          "description": "An experienced hiring manager specializing in technical roles within the technology sector.",
        },
        {
          "name": "Art Director from Marketing Department",
          "description": "A senior figure in the marketing department familiar with creative leadership and team dynamics.",
        },
        {
          "name": "Senior Hardware Engineer",
          "description": "A seasoned engineer within the company who understands the specific technical requirements and standards the role demands.",
        },
        {
          "name": "HR Manager",
          "description": "Human resources expert who understands the company's culture and hiring processes.",
        },
        {
          "name": "Diversity and Inclusion Officer",
          "description": "An expert in fostering inclusive talent acquisition strategies and company culture.",
        },
        {
          "name": "Current Team Member",
          "description": "A member of the existing team who will work directly with the new hire.",
        }
      ]

      const result = await createScript({ participants, topic });
      console.log(result);
      console.log('Script created:', result.data);

      setChatMessages(result.data);

      // Handle the result as needed
    } catch (error) {
      console.error('Error creating script:', error);
      // Handle the error as needed
    }
  };



  const ChatDiscussion = ({ messages }) => {
    return (
      <>
      {messages.map((message, index) => (
          <div className="comment mb-3">
            <div className="row">
              <div className="col-auto">
                <a className="avatar avatar-sm" href="profile-posts.html">
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
                <div className="comment-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="comment-title">
                        {message.participant}
                      </h5>
                    </div>
                    <div className="col-auto">
                      <small className="comment-time">
                        11:12
                      </small>
                    </div>
                  </div>
                  <p className="comment-text">
                    {message.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      }
      </>
    );
  };



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


          <div className='col-8 card'>
            <hr className="my-5" />
            {chatMessages.length > 0 && (
              <div className="mb-5">
                <h3>Chat Discussion</h3>
                <ChatDiscussion messages={chatMessages} />
              </div>
            )}
          </div>


          <div className='col-8'>
            <hr className="my-5"></hr>
            <div className="nav row align-items-center">
              <div className="col-auto">
                <button className="btn btn-lg btn-white" type="button">
                  Back
                </button>
              </div>
              <div className="col text-center">
                <h6 className="text-uppercase text-body-secondary mb-0">Let's start the chatbot</h6>
              </div>
              <div className="col-auto">
                <a className="btn btn-lg btn-primary" onClick={handleContinue} data-toggle="wizard" href="#wizardStepTwo">Continue</a>
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
}