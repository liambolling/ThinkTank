import Image from 'next/image';

export default function ChatDiscussion({ messages }) {
  return (
    <>
      {messages.map((message, index) => (
        <div key={index} className="comment mb-3">
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
      ))}
    </>
  );
}