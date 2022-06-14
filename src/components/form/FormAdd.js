import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/esm/Form";
import InputGroup from "react-bootstrap/esm/InputGroup";
import Button from "react-bootstrap/esm/Button";

import { Handdler } from "../../handlers/Functions";
import Announciation from "../announciation/Announciation";
import NoteService from "../../services/notes.services";

const functions = Handdler;

export default function FormAdd() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [submited, setSubmited] = useState(false);

  async function handdleOnSubmit() {
    const response = await NoteService.post("/notes/new", {
      title,
      content,
      type,
    }).then((res) => {
      setSubmited(true);
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
      <Announciation
        data={{
          message: "Adicionar note",
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
        <InputGroup.Text id="inputGroup-sizing-lg">Conteúdo</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </InputGroup>
      <br />
      {submited ? (
        functions.getLoadingSpin()
      ) : (
        <Button
          variant="primary"
          onClick={() => {
            handdleOnSubmit();
          }}
          disabled={submited}
        >
          Adicionar
        </Button>
      )}
    </>
  );
}
