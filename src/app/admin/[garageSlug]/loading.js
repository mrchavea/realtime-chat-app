import { Spinner } from "@nextui-org/spinner";

export default function AdminLoading() {
  return (
    <div className="h-[50vh] w-full flex justify-center">
      <Spinner
        label="Cargando..."
        color="default"
        labelColor="default"
        size="lg"
      />
    </div>
  );
}
