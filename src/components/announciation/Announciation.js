import Alert from "react-bootstrap/esm/Alert";
import { Handdler } from "../../handlers/Functions";

const functions = Handdler;

export default function Announciation(props) {
  const color = props.data.statusCode
    ? functions.getStatusColor(props.data.statusCode)
    : props.data.typeColor;
  return (
    <Alert
      className="text-center"
      variant={color}
    >
      {props.data.message}
    </Alert>
  );
}
