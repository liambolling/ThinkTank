import Image from 'next/image';

function getRandomTime() {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
}

export default function ChatDiscussion({ messages }) {
  return (
    <>
{messages.map((message, index) => (
  <div key={index} className="card mb-3">
    <div className="card-body">
      <div className="d-flex align-items-center">
        <div className="col-auto">
          <a className="avatar avatar-sm" href="profile-posts.html">
            <Image
              src="/bot.png"
              alt="Card image"
              width={75}
              height={100}
              layout="responsive"
              quality={100}
              priority
            />
          </a>
        </div>
        <div className="col ms-n2">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="comment-title mb-0">
              {message.participant}
            </h5>
            <small className="comment-time text-muted">
              {getRandomTime()}
            </small>
          </div>
          <p className="comment-text mt-2"> 
            {message.text}
          </p>
        </div>
      </div>
    </div>
  </div>
))}
    </>
  );
}