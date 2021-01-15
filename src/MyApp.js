import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';

function MyApp() { 
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchAll().then(result => {
      if (result)
        setCharacters(result);
    });
  }, []);

  async function makePostCall(person) {
    try {
      const response = axios.post('http://localhost:5000/users', person);
      return response;
    }

    catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makeDeleteCall(id) {
    try {
      const response = axios.delete('http://localhost:5000/users/' + id);
      return response
    }

    catch (error) {
      console.log(error);
      return false;
    }
  }

  function removeOneCharacter (index) {
    const updated = characters.filter((character, i) => {        
      return i !== index
    });

    const id = characters[index]['id']
    console.log(id)
    makeDeleteCall(id).then(result => {
      console.log(result.status)
      if (result.status === 204)
        setCharacters(updated) 
    });
  }

  async function fetchAll() {
    try { 
      const response = await axios.get('http://localhost:5000/users');
      return response.data.users_list;
    }
    
    catch (error) {
      console.log(error);
      return false;
    }
  } 

  function updateList(person) {
    makePostCall(person).then(result => {
      if (result.status === 201)
        person['id'] = result.data['id']
        setCharacters([...characters, person]);
    });
  }
  
  return ( 
    <div className="table"> 
        <Table characterData={characters} removeCharacter={removeOneCharacter}/>
        <Form handleSubmit={updateList}/>
    </div>
    );
}

export default MyApp;
