import React from "react";
import { Card } from "react-bootstrap";

function DashboardCard({ titulo, quantidade, color }) {
  return (
    <Card className={`dashboard-card ${color ? `card-${color}` : ""}`}>
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>{quantidade}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default DashboardCard;

