import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Form from "react-bootstrap/esm/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";

import NoteService from "../../services/notes.services";
import { Handdler } from "../../handlers/Functions";
import Announciation from "../announciation/Announciation";

const functions = Handdler;

export default function FormEdit() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [id, setId] = useState(null);
  const [submited, setSubmited] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      async function getNoteToEdit() {
        const response = await NoteService.get(
          `/notes/getOne/${location.state.id}`
        );
        if (response.data && response.data.statusCode === 200) {
          setTitle(response.data.notes.title);
          setContent(response.data.notes.content);
          setType(response.data.notes.type);
          setId(response.data.notes.id);
        }
      }
      getNoteToEdit();
    }
  }, [location]);
  async function handdleOnSubmit() {
    setSubmited(true);
    const response = await NoteService.put("/notes/edit", {
      id_note: id,
      title: title,
      content: content,
      type: type,
    }).then((res) => {
      return res.data;
    });
    if (response) {
      setSubmited(false);
      if (response.statusCode === 200) {
        navigate("/list");
      }
    }
  }
  return (
    <>
      {id && (
        <Container>
          <Announciation
            data={{
              message: "Editar note " + title,
              typeColor: functions.getTypeColor(type),
            }}
          />
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">Título</InputGroup.Text>
            <Form.Control
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <InputGroup.Text id="inputGroup-sizing-lg">Tipo</InputGroup.Text>
            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
              <option></option>
              <option value="comum">Comum</option>
              <option value="importante">Importante</option>
              <option value="muito_importante">Muito Importante</option>
            </Form.Select>
          </InputGroup>
          <br />
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">
              Conteúdo
            </InputGroup.Text>
            <Form.Control
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </InputGroup>
          <br />
          <Button
            variant="primary"
            onClick={() => {
              handdleOnSubmit();
            }}
            disabled={submited}
          >
            Salvar
          </Button>
        </Container>
      )}
    </>
  );
}
