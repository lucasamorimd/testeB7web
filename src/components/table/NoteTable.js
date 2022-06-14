import Table from "react-bootstrap/esm/Table";
import { Link } from "react-router-dom";
import { Handdler } from "../../handlers/Functions";

const functions = Handdler;
export default function NoteTable(props) {
  const notes = props.data.notes || [];
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>N°</th>
            <th>Título</th>
            <th>Nota</th>
            <th>Tipo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <>
            {notes.map((param) => {
              return (
                <tr
                  key={param.id}
                  className={`text-center`}
                  style={{ background: functions.getSoftTypeColor(param.type) }}
                >
                  <td>{param.id}</td>
                  <td>{param.title}</td>
                  <td>{param.content}</td>
                  <td>{functions.getString(param.type)}</td>
                  <td>
                    <Link to="/note" state={{ id: param.id }}>
                      {functions.getSearchIcon()}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </>
        </tbody>
      </Table>
    </>
  );
}
