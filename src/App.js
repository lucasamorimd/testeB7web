import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


import Container from 'react-bootstrap/esm/Container';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import Button from 'react-bootstrap/esm/Button';
import { Handdler } from './handlers/Functions';


import List from './pages/home';
import Trash from './pages/trash';
import Note from './pages/note'
import Form from './pages/form'

const functions = Handdler;

function App() {
  return (
    <Container>
      <Router>
        <h1 className='text-center'>
          Notes
        </h1>

        <div className='row-center'>
          <Routes>
            <Route exact path='/' element={<List />} />
            <Route path='/list' element={<List />} />
            <Route path='/trash' element={<Trash />} />
            <Route path='/note' element={<Note />} />
            <Route path='/form/*' element={<Form />} />
          </Routes>
        </div>
        <footer className='text-center'>
          <div className='row-center fixed-bottom'>
            <ButtonGroup>
              <Link to="/list">
                <Button>
                  {functions.getHomeIcon()}
                </Button>
              </Link>
              <Link to="/trash">
                <Button>
                  {functions.getTrashIcon()}
                </Button>
              </Link>
              <Link to="/form/add">
                <Button>
                  {functions.getAddIcon()}
                </Button>
              </Link>
            </ButtonGroup>
          </div>
        </footer>
      </Router>
    </Container>
  );
}

export default App;
