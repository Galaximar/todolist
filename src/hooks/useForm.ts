import { FormEvent, useEffect, useState } from "react";

interface UseFormReturn<T> {
  onFieldChange: (
    target: HTMLInputElement | HTMLSelectElement,
    name: string
  ) => void;
  handleUseFormSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    onSubmit: () => void
  ) => void;
  errors: Record<string, string>;
  formState: T;
  setErrors: (errors: Record<string, string>) => void;
}

const useForm = <T>(
  formData: JSX.Element[] = [],
  defaultValues?: T
): UseFormReturn<T> => {
  const [formState, setFormState] = useState<T>({} as T);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (defaultValues) {
      setFormState(defaultValues);
    } else {
      const defaultValuesAux: T = {} as T;
      formData?.forEach(
        ({ props: { name, defaultValue, submit, formData } }) => {
          if (!submit && !formData)
            defaultValuesAux[name as keyof T] = defaultValue || "";
        }
      );
      setFormState(defaultValuesAux);
    }
  }, []);

  const runValidations = () => {
    let errorsAux: Record<string, string> = {};
    let isValidForm = true;
    let firstElementError: string | null = null;
    formData?.forEach(({ props: { name, validations, required, submit } }) => {
      let isFully = true;
      if ((required || (validations && validations?.length > 0)) && !submit) {
        if (required) {
          if (!formState[name as keyof T]) {
            errorsAux = { ...errorsAux, [name]: "Campo obligatorio" };
            isFully = false;
            isValidForm = false;
            if (!firstElementError) firstElementError = name;
            return false;
          } else errorsAux = { ...errorsAux, [name]: "" };
        }

        if (validations && validations?.length > 1 && isFully) {
          for (let i = 0; i < validations?.length; i++) {
            const { isValid, errorMessage } =
              validations?.[i](formState[name as keyof T]) || {};

            if (isValid) {
              errorsAux = { ...errorsAux, [name]: "" };
            } else {
              errorsAux = {
                ...errorsAux,
                [name]: errorMessage || "Campo incorrecto",
              };
              if (!firstElementError) firstElementError = name;
              isValidForm = false;
              break;
            }
          }
        } else if (validations && validations?.length > 0 && isFully) {
          const { isValid, errorMessage } =
            validations?.[0](formState[name as keyof T]) || {};
          if (isValid) {
            errorsAux = { ...errorsAux, [name]: "" };
          } else {
            errorsAux = {
              ...errorsAux,
              [name]: errorMessage || "Campo incorrecto",
            };
            if (!firstElementError) firstElementError = name;
            isValidForm = false;
          }
        } else {
          return true;
        }
      }

      return true;
    });
    setErrors(errorsAux);
    if (firstElementError) {
      document
        .getElementsByName(firstElementError)[0]
        ?.scrollIntoView({ block: "center", behavior: "smooth" });
    }

    return isValidForm;
  };

  /* Handle Change */
  const onFieldChange = (
    target: HTMLInputElement | HTMLSelectElement,
    name: string
  ) => {
    setFormState({
      ...formState,
      [name]: target?.value,
    });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  /* Handle Submit */
  const handleUseFormSubmit = (
    e: FormEvent<HTMLFormElement>,
    onSubmit: () => void
  ) => {
    e?.preventDefault();
    const isValidForm = runValidations();
    isValidForm && onSubmit();
  };

  return {
    onFieldChange,
    handleUseFormSubmit,
    errors,
    formState,
    setErrors,
  };
};

export { useForm };
