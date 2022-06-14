import React, { useEffect, useState } from "react";


import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

import NoteCard from "../../components/card/NoteCard";
import Announciation from "../../components/announciation/Announciation";
import NoteService from "../../services/notes.services";

export default function ListNotes() {
  const [list, setList] = useState(null);
  useEffect(() => {
    async function getList() {
      const response = await NoteService.get("/notes/list");
      setList(response.data);
    }
    getList();
  }, []);

  return (
    <Container>
      {list && (
        <>
          <Announciation
            data={{ message: list.message, statusCode: list.statusCode }}
          />
          <Row className="colum">
            {list.notes.map((e) => {
              return <NoteCard data={e} key={e.id}/>;
            })}
          </Row>
        </>
      )}
    </Container>
  );
}
