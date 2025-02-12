import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

type CheckItemProps = {
  check?: boolean;
  description: string;
};

function PasswordCheckItem({ check = false, description }: CheckItemProps) {
  return (
    <li
      data-checked={check}
      className="flex gap-1 items-center text-slate-400 text-sm data-[checked=true]:text-green-700"
    >
      {check ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
      {description}
    </li>
  );
}

interface PasswordValidatorProps {
  password: string;
  onValidChange: (isValid: boolean) => void;
}

export function PasswordValidator({
  password,
  onValidChange,
}: PasswordValidatorProps) {
  const [hasMinimumLength, setHasMinimumLength] = useState(false);
  const [hasLetter, setHasLetter] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);
  // const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setHasMinimumLength(password.length >= 8);
    setHasLetter(/[a-zA-Z]/.test(password));
    setHasNumber(/[0-9]/.test(password));
    setHasSymbol(/[!@#$%^&*(),.?":{}|<>]/.test(password));

    const valid = hasMinimumLength && hasLetter && hasNumber && hasSymbol;
    // setIsValid(valid);
    onValidChange(valid); // Passa a validação para o componente pai
  }, [
    hasMinimumLength,
    hasLetter,
    hasNumber,
    hasSymbol,
    onValidChange,
    password,
  ]);

  return (
    <div className="border border-slate-200 bg-slate-100 rounded-md p-3 mt-1">
      <ul className="flex flex-col gap-1">
        <PasswordCheckItem
          check={hasMinimumLength}
          description="Pelo menos 8 caracteres"
        />
        <PasswordCheckItem
          check={hasLetter}
          description="Pelo menos uma letra"
        />
        <PasswordCheckItem
          check={hasNumber}
          description="Pelo menos um número"
        />
        <PasswordCheckItem
          check={hasSymbol}
          description="Pelo menos um caractere especial"
        />
      </ul>
    </div>
  );
}
