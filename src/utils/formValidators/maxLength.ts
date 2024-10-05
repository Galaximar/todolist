const maxLength = (
  text: string | number,
  max: number,
  errorMessage: string
) => {
  const isValid = text.toString()?.length <= max;

  return isValid ? { isValid: true } : { isValid: false, errorMessage };
};
export default maxLength;
