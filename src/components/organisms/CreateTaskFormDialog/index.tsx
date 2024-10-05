import { CategoriesResponse } from "@/api/types";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { Dialog } from "@/components/molecules/Dialog";
import Form from "@/components/molecules/Form";
import maxLength from "@/utils/formValidators/maxLength";
import { Box, DialogActions } from "@mui/material";
import { useMemo } from "react";

type FormData = {
  description: string;
  title: string;
  category: string;
};
interface Props {
  openDialog: boolean;
  categories: CategoriesResponse;
  onClose: () => void;
  onSubmit: (arg: FormData) => void;
}

const CreateTaskFormDialog = ({
  openDialog,
  categories,
  onClose,
  onSubmit,
}: Props) => {
  const selectOptions = useMemo(
    () =>
      Object.values(categories).map((category) => ({
        value: category.id,
        label: category.name,
      })),
    [categories]
  );

  return (
    <Dialog title="Nueva tarea" onClose={onClose} open={openDialog}>
      <Box
        sx={{
          paddingInline: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "440px",
          maxWidth: "100%",
        }}
      >
        <Form<FormData> onSubmit={onSubmit}>
          <Input
            validations={[
              (value) =>
                maxLength(
                  value,
                  40,
                  "Título excede el límite de 40 caracteres"
                ),
            ]}
            required
            label="Título"
            name="title"
          />
          <Input
            validations={[
              (value) =>
                maxLength(
                  value,
                  100,
                  "Descripción excede el límite de 100 caracteres"
                ),
            ]}
            label="Descripción"
            name="description"
          />
          <Select
            required
            label="Categoría"
            name="category"
            options={selectOptions}
          />
          <DialogActions sx={{ gap: 1 }}>
            <Button onClick={onClose} label="cancelar" variant="outlined" />
            <Button submit label="Crear" variant="contained" width={"124px"} />
          </DialogActions>
        </Form>
      </Box>
    </Dialog>
  );
};
export { CreateTaskFormDialog };
