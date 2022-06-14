import { Link, useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";

import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";

import NoteService from "../../services/notes.services";

import { Handdler } from "../../handlers/Functions";

const history = createBrowserHistory({
  basename: "/",
});
const functions = Handdler;

export default function NoteCard(props) {
  const navigate = useNavigate();
  const is_deleted = props.data.is_deleted;

  async function handdleDelete() {
    const response = await NoteService.delete("/notes/delete", {
      params: { id_note: props.data.id },
    });
    if (response) {
      history.go("list");
    }
  }

  async function handdleReativar() {
    const response = await NoteService.put("/notes/recicle", {
      id_note: props.data.id,
    });
    if (response) {
      navigate("/trash");
    }
  }

  return (
    <Card className="col-md-3 mx-auto text-center">
      <Card.Header className={`bg-${functions.getTypeColor(props.data.type)}`}>
        <Link to="/note" state={{ id: props.data.id }}>
          {props.data.title}
        </Link>
      </Card.Header>
      <Card.Body
        style={{ background: functions.getSoftTypeColor(props.data.type) }}
      >
        <Card.Text>{props.data.content}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <ButtonGroup>
          {!is_deleted ? (
            <>
              <Link to="/form/edit" state={{ id: props.data.id }}>
                <Button>{functions.getEditIcon()}</Button>
              </Link>
              <Button
                variant="danger"
                onClick={() => {
                  handdleDelete();
                }}
              >
                {functions.getTrashIcon()}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                handdleReativar();
              }}
            >
              Reativar
            </Button>
          )}
        </ButtonGroup>
      </Card.Footer>
    </Card>
  );
}
