import React, { useEffect, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";

const ForexPanel = () => {
  const { socket } = useSocketContext();
  const [forexUpdates, setForexUpdates] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("forexUpdate", (forexData) => {
        setForexUpdates(forexData);
      });

      return () => {
        socket.off("forexUpdate");
      };
    }
  }, [socket]);

  return (
    <div>
      <h2>Forex Price Feed</h2>
      <table>
        <thead>
          <tr>
            <th>Currency Pair</th>
            <th>Bid</th>
            <th>Ask</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {forexUpdates.map((update, index) => (
            <tr key={index}>
              <td>{update.pair}</td>
              <td>{update.bid}</td>
              <td>{update.ask}</td>
              <td>{new Date(update.timestamp).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ForexPanel;
