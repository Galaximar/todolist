import {
  cloneElement,
  useEffect,
  useRef,
  ReactNode,
  ReactElement,
  FormEvent,
  ChangeEvent,
} from "react";

import { useForm } from "@/hooks/useForm";
interface FormProps<T> {
  onSubmit?: (formState: T) => void;
  children: ReactNode;
  className?: string;
  getRef?: (ref: React.RefObject<FormRefType>) => void;
  style?: React.CSSProperties;
}

interface FormRefType {
  setErrors: (errors: Record<string, string>) => void;
  errors: Record<string, string>;
}
const Form = <T extends Record<string, string | number>>({
  onSubmit,
  children,
  getRef,
}: FormProps<T>) => {
  const formRef = useRef<FormRefType | null>(null);

  const { errors, formState, onFieldChange, handleUseFormSubmit, setErrors } =
    useForm<T>(Array.isArray(children) ? children : [children]);

  useEffect(() => {
    if (getRef) {
      formRef.current = {
        setErrors,
        errors,
      };
      getRef(formRef);
    }
  }, [errors, getRef, setErrors]);

  const cloneFormElement = (child: ReactElement, i: number) => {
    return cloneElement(child, {
      value: child.props.value || formState[child.props.name],
      key: i,
      error: errors[child.props.name] ? errors[child.props.name] : "",
      defaultValue: child.props.defaultValue ? child.props.defaultValue : "",
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        child.props?.onChange && child.props.onChange(e);
        onFieldChange(e.target, child.props.name);
      },
    });
  };

  const renderChildrens = () => {
    if (Array.isArray(children)) {
      return children.map((child, i) => {
        if (child && child.props.formData) {
          return cloneElement(child, {
            key: i,
          });
        } else if (child && !child.props?.submit) {
          return cloneFormElement(child, i);
        }
        return cloneElement(child, {
          key: i,
        });
      });
    }
    return cloneElement(children as ReactElement);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) =>
    handleUseFormSubmit(e, () => onSubmit && onSubmit(formState));
  return (
    <form
      style={{ display: "flex", flexDirection: "column", gap: "6px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      {renderChildrens()}
    </form>
  );
};

export default Form;
