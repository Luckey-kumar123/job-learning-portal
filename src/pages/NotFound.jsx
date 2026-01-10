function NotFound({ errorType }) {
  const messages = {
    403: "Access Forbidden. You don't have permission to view this page.",
    default: "Page Not Found. The page you're looking for doesn't exist.",
  };

  return (
    <div className="not-found">
      <h1>{errorType === "403" ? "403" : "404"}</h1>
      <p>{messages[errorType] || messages.default}</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default NotFound;