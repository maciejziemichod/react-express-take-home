import { useForm, Controller, SubmitHandler, Validate } from "react-hook-form";
import { FormFields, FormFieldsData } from "../common/types";
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
} from "@mui/material";

type FormProps = {
    onFormSubmit: SubmitHandler<FormFields>;
    formFieldsData: FormFieldsData | null;
    isLoading: boolean;
    values?: FormFields;
};

export function Form({
    onFormSubmit,
    formFieldsData,
    isLoading,
    values,
}: FormProps) {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<FormFields>({
        values,
        defaultValues: {
            startQuarter: "",
            endQuarter: "",
            houseTypes: [],
        },
    });

    if (isLoading) {
        return <CircularProgress />;
    }

    if (!isLoading && formFieldsData === null) {
        return (
            <Alert severity="error">
                Something went wrong, please refresh the page.
            </Alert>
        );
    }

    const isQuartersSelectIncorrect =
        !!errors.startQuarter || !!errors.endQuarter;

    const validateStartQuarter: Validate<string, FormFields> = (
        startQuarter,
        { endQuarter },
    ) => {
        if (
            formFieldsData === null ||
            startQuarter === "" ||
            endQuarter === ""
        ) {
            return true;
        }

        return (
            formFieldsData.quarters.findIndex(
                ({ value }) => value === endQuarter,
            ) >=
            formFieldsData.quarters.findIndex(
                ({ value }) => value === startQuarter,
            )
        );
    };

    const validateEndQuarter: Validate<string, FormFields> = (
        endQuarter,
        { startQuarter },
    ) => {
        if (
            formFieldsData === null ||
            endQuarter === "" ||
            startQuarter === ""
        ) {
            return true;
        }

        return (
            formFieldsData.quarters.findIndex(
                ({ value }) => value === endQuarter,
            ) >=
            formFieldsData.quarters.findIndex(
                ({ value }) => value === startQuarter,
            )
        );
    };

    return (
        <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="startQuarter"
                            control={control}
                            rules={{
                                validate: validateStartQuarter,
                            }}
                            render={({ field }) => (
                                <FormControl
                                    error={isQuartersSelectIncorrect}
                                    fullWidth
                                >
                                    <InputLabel id="start-quarter-select">
                                        Start quarter
                                    </InputLabel>
                                    <Select
                                        labelId="start-quarter-select"
                                        label="Start quarter select"
                                        {...field}
                                    >
                                        {formFieldsData?.quarters.map(
                                            ({ name, value }) => (
                                                <MenuItem
                                                    key={value}
                                                    value={value}
                                                >
                                                    {name}
                                                </MenuItem>
                                            ),
                                        )}
                                    </Select>
                                    {isQuartersSelectIncorrect && (
                                        <FormHelperText>
                                            Incorrect quarters pick order
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="endQuarter"
                            control={control}
                            rules={{
                                validate: validateEndQuarter,
                            }}
                            render={({ field }) => (
                                <FormControl
                                    error={isQuartersSelectIncorrect}
                                    fullWidth
                                >
                                    <InputLabel id="end-quarter-select">
                                        End quarter
                                    </InputLabel>
                                    <Select
                                        labelId="end-quarter-select"
                                        label="End quarter select"
                                        {...field}
                                    >
                                        {formFieldsData?.quarters.map(
                                            ({ name, value }) => (
                                                <MenuItem
                                                    key={value}
                                                    value={value}
                                                >
                                                    {name}
                                                </MenuItem>
                                            ),
                                        )}
                                    </Select>
                                    {isQuartersSelectIncorrect && (
                                        <FormHelperText>
                                            Incorrect quarters pick order
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="houseTypes"
                            control={control}
                            render={({
                                field: { onChange, value, ref },
                                fieldState: { error },
                            }) => {
                                return (
                                    <>
                                        <Autocomplete
                                            multiple
                                            value={value}
                                            isOptionEqualToValue={(
                                                option,
                                                value,
                                            ) =>
                                                option.name === value.name &&
                                                option.value === value.value
                                            }
                                            getOptionLabel={({ name }) => name}
                                            onChange={(_, newValue) => {
                                                onChange(
                                                    newValue ? newValue : null,
                                                );
                                            }}
                                            id="controllable-states-demo"
                                            options={
                                                formFieldsData?.houseTypes ?? []
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="House types"
                                                    placeholder="House types"
                                                    inputRef={ref}
                                                />
                                            )}
                                        />
                                        {error && (
                                            <FormHelperText>
                                                {error.message}
                                            </FormHelperText>
                                        )}
                                    </>
                                );
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Button variant="contained" type="submit">
                                Submit
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}
