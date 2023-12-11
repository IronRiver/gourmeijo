export default function Reviews({ params }: { params: { id: string } }) {
  return <div>This is Review page! {params.id}</div>;
}
