import React, {useEffect, useState} from "react";
import {Form, Input} from '@rocketseat/unform'
import api from './services/api'

import "./styles.css";

function App() {
  const [list, setList] = useState([])

  async function getRepositories() {
    const res = await api.get('repositories');
    setList(res.data)
  }

  useEffect(() => {
    getRepositories()
  }, [])


  async function handleAddRepository({title, url, techs}) {
    const res = await api.post('repositories', {title, url, techs})
    setList([...list, res.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const index = list.findIndex(li => li.id === id)
    list.splice(index, 1)
    setList([...list])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {list.map(item => 
          <li key={item.id}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>
      <Form onSubmit={handleAddRepository}>
        <Input name='title' placeholder='Título'/>
        <Input name='url' placeholder='URL'/>
        <Input name='techs' placeholder='Tecnologias'/>
        <button type='submit'>Adicionar</button>
      </Form>
    </div>
  );
}

export default App;
