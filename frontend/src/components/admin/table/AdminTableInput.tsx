export default function AdminTableInput({ value, type }: { value: string; type?: string }) {
  return (
    <>
      <input value={value} type={type || 'text'} />
    </>
  );
}
