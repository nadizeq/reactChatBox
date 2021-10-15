export default function Bubble(props) {
  return (
    <div id="output">
      <p>
        <span id="username">{props.username}</span>:{" "}
        <span>{props.message}</span>
      </p>
    </div>
  );
}
