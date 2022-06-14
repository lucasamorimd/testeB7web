import React, { useEffect, useState } from "react";

import NoteService from "../../services/notes.services";
import Container from "react-bootstrap/esm/Container";

import Card from "../../components/card/NoteCard";

import { useLocation } from "react-router-dom";
import Announciation from "../../components/announciation/Announciation";

export default function Note() {
  const [note, setNote] = useState(null);
  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    async function getNote() {
      const response = await NoteService.get(`/notes/getOne/${id}`);
      setNote(response.data);
    }
    getNote();
  }, [id]);

  return (
    <Container>
      {note && (
        <>
          <Announciation
            data={{ message: note.message, statusCode: note.statusCode }}
          />
          <Card data={note.notes} />
        </>
      )}
    </Container>
  );
}
