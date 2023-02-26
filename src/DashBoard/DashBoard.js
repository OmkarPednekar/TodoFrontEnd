import { useParams } from "react-router-dom";

export default function DashBoard() {
  let { email } = useParams();
  return (
    <div>
      <h1>{email}</h1>
    </div>
  );
}
