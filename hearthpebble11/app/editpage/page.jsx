import EditForm from "@/components/EditForm";

export default function EditPage({ searchParams }) {
  // Pass searchParams to the EditForm
  return <EditForm searchParams={searchParams} />;
}
