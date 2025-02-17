interface AlertMessageProps {
  message: string | undefined;
}

export function AlertMessage({ message }: AlertMessageProps) {
  return <h3 className="font-semibold text-sm">{message}</h3>;
}
