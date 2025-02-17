import { FormRoot } from './FormRoot';
import { FormBody } from './FormBody';
import { FormFooter } from './FormFooter';
import { FormFooterSection } from './FormFooterSection';
import { FormFieldset } from './FormFieldset';
import { FormControl } from './FormControl';
import { FormError } from './FormError';
import { FormInputText } from './FormInputText';
import { FormInputPassword } from './FormInputPassword';
import { FormSelect } from './FormSelect';
import FormAsyncSelect from './FormAsyncSelect';
import { FormMaskInput } from './FormMaskInput';
import { FormInputTelefone } from './FormInputTelefone';
import { FormDateInput } from './FormDateInput';
import { FormCheckbox } from './FormCheckbox';
import { FormSeparator } from './FormSeparator';
import { FormSubmitButton } from './FormSubmitButton';

export const Form = {
  Root: FormRoot,
  Body: FormBody,
  Footer: FormFooter,
  FooterSection: FormFooterSection,
  Fieldset: FormFieldset,
  Control: FormControl,
  Error: FormError,
  Separator: FormSeparator,

  InputText: FormInputText,
  InputPassword: FormInputPassword,
  Select: FormSelect,
  AsyncSelect: FormAsyncSelect,
  MaskInput: FormMaskInput,
  DateInput: FormDateInput,
  TelefoneInput: FormInputTelefone,
  Checkbox: FormCheckbox,

  Submit: FormSubmitButton,
};
