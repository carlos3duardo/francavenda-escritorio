interface AlertMessageProps {
  message: string | undefined;
}

export function AlertMessage({ message }: AlertMessageProps) {
  return (
    <h3 className="font-medium text-sm text-slate-800 group-[.error]:text-red-800">
      {message}
    </h3>
  );
}
