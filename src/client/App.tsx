import * as React from "react";

interface Message {
  //I can use this interface to say that "Message takes and array of objects that looks like this data type."
  question: string;
  response: string;
}

const App = () => {
  const [text, setText] = React.useState<string>("");
  const [messages, setMessages] = React.useState<Message[]>([]);

  //We call the getResponse function when we click on button on our chat
  const getResponse = async () => {
    //backticks to pass the text into the url
    try {
      const response = await fetch(
        `http://localhost:3000/api/database/${text}`
      ); //whatever is passed here (is what is typed )is then picked out with the req.params.text (routes.ts)
      const data = await response.json();
      console.log("response", data);
      setMessages([
        ...messages,
        {
          question: text, //this object gets the text I write in the chatbot as well as the response we get back from the data
          response: data.content,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chat-bot">
      <div className="header">
        <div className="info-container">
          <h3>Chat with</h3>
          <h2> ◓ BookBot</h2>
        </div>
        <div className="div-svg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#011f4b"
              fill-opacity="1"
              d="M0,32L48,64C96,96,192,160,288,160C384,160,480,96,576,90.7C672,85,768,139,864,165.3C960,192,1056,192,1152,181.3C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="feed">
        {messages?.map((message, _index) => 
          <div key={_index}>
            <div className="question bubble">{message.question}</div>
            <div className="response bubble">{message.response}</div>
          </div>
        )}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)} //on change of the textarea, gonna get the event and pass the e.target.value so whatever value we have in the textarea we are gonna pass that through the method of setText so that we can chage the value of text,
      />
      <button onClick={getResponse}>⇨</button>
    </div>
  );
};

export default App;
