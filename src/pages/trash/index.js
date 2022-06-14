import React, { useEffect, useState } from "react";

import NoteService from "../../services/notes.services";

import Container from "react-bootstrap/esm/Container";

import NoteTable from "../../components/table/NoteTable";
import Announciation from "../../components/announciation/Announciation";

export default function ListNotesTrash() {
  const [list, setList] = useState(null);
  useEffect(() => {
    async function getList() {
      const response = await NoteService.get("/notes/trash");
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
          <NoteTable data={list} />
        </>
      )}
    </Container>
  );
}
