import Container from 'react-bootstrap/esm/Container';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import FormAdd from '../../components/form/FormAdd';
import FormEdit from '../../components/form/FormEdit';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";


export default function FormNote() {
    return (
        <Container className="row-center">
            <Routes>
                <Route path="/add" element={<FormAdd />} />
                <Route path="/edit" element={<FormEdit />} />
            </Routes>
        </Container>
    );
}

