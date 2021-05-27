import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({ location }) => {
    // eslint-disable-next-line
    const [name, setName] = useState('');
    // eslint-disable-next-line
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        var connectionOptions = { // video altında ki yoruma atılan linklerdeki bir çözüm. Cors hatasını çözen bir kod parçası.
            "force new connection": true,
            "reconnectionAttempts": "Infinity",
            "transports": ["websocket"]
        };

      const { name, room } = queryString.parse(location.search);
      console.log('Location.Search = ', location.search);

      socket = io(ENDPOINT, connectionOptions);

      setName(name);
      setRoom(room);

      socket.emit('join', { name, room }, () => {
         
      });

      return () => {
          socket.emit('disconnect');

          socket.off();
      }
    }, [ENDPOINT, location.search]);

    return (
        <div>
            <h1>Chat</h1>
        </div>
    );
};

export default Chat;