import { useEffect, useState } from "react";
import { socket } from "../config/socketConfig";

const TestSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      console.log(typeof value);
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);

  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  function onSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(5000).emit("create-something", value, () => {
      setIsLoading(false);
    });
  }

  return (
    <div className="App">
      <p>State: {"" + isConnected}</p>
      <ul>
        {fooEvents.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
      <>
        <button onClick={connect}>Connect</button>
        <button onClick={disconnect}>Disconnect</button>
      </>
      <form onSubmit={onSubmit}>
        <input onChange={(e) => setValue(e.target.value)} />

        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default TestSocket;
