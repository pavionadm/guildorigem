export default function ErrorMessage({ message }: { message: string }): React.ReactElement {
  return (
    <div
      role="alert"
      className="rounded-sm border border-ember/50 bg-ember/10 px-4 py-3 text-sm text-ember-light"
    >
      {message}
    </div>
  );
}
