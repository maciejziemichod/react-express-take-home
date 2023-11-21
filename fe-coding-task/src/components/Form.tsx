import { useForm, Controller, SubmitHandler, Validate } from "react-hook-form";
import { FormFields, FormFieldsData } from "../common/types";
import {
    Alert,
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
} from "@mui/material";

type FormProps = {
    onFormSubmit: SubmitHandler<FormFields>;
    formFieldsData: FormFieldsData | null;
    isLoading: boolean;
    values?: FormFields;
};

// TODO: maybe split into controlled selects?
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
            houseType: "",
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
                            name="houseType"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel id="house-type-select">
                                        House type
                                    </InputLabel>
                                    <Select
                                        labelId="house-type-select"
                                        label="House type select"
                                        {...field}
                                    >
                                        {formFieldsData?.houseTypes.map(
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
                                </FormControl>
                            )}
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
