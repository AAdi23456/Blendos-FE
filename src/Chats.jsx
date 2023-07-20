import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const token = JSON.parse(localStorage.getItem('whatsaptoken'));

const PersonList = () => {
  const [persons, setPersons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      const response = await fetch('http://localhost:8080/persons', {
        method: 'GET',
        headers: {
          token: token,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('Error retrieving persons');
      }

      const data = await response.json();
      setPersons(data.result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChatAccess = async(toUser, userId) => {
    localStorage.setItem('user_id',JSON.stringify(userId));
    try {
      const res=await fetch("http://localhost:8080/data",{
        method:"GET",
        headers:{
          token:token
        }
      })
      const data=await res.json()
      localStorage.setItem('senderid',JSON.stringify(data.senderid));
      localStorage.setItem('sendername',JSON.stringify(data.sendername));
    } catch (error) {
      console.log(error);
    }
    navigate('/messages');
  };

  return (
    <div>
      {persons.map((person, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
            borderBottom: '1px solid #ccc',
          }}
        >
          <div
            style={{
              marginRight: '10px',
              backgroundColor: '#25D366',
              color: '#fff',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: '20px' }}>{person.to_user}</span>
          </div>
          <div>
            <h3 style={{ margin: '0' }}>{person.to_user}</h3>
            {/* //<p style={{ margin: '0' }}>ID: {person.user_id}</p> */}
          </div>
          <button
            style={{
              marginLeft: 'auto',
              padding: '8px 16px',
              backgroundColor: '#128C7E',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => handleChatAccess(person.to_user, person.user_id)}
          >
            Access Chat
          </button>
        </div>
      ))}
    </div>
  );
};

export default PersonList ;
