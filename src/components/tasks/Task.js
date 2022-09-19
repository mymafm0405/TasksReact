import { Card } from "react-bootstrap";

const Task = ({ task, onRemove }) => {
  return (
    <Card
      onClick={() => {
        onRemove(task.id);
      }}
      className="mt-3 mb-3"
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <Card.Body>
        <Card.Text>{task.text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Task;
