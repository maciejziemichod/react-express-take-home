import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FormFields, FormFieldsData } from "../common/types";
import {
    Alert,
    Autocomplete,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getFormFieldsData } from "../utils/api";

type FormProps = {
    onFormSubmit: SubmitHandler<FormFields>;
};

export function Form({ onFormSubmit }: FormProps) {
    const [formFieldsData, setFormFieldsData] = useState<FormFieldsData | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState(true);

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<FormFields>({
        defaultValues: {
            startQuarter: "",
            endQuarter: "",
            houseTypes: [],
        },
    });

    useEffect(() => {
        getFormFieldsData()
            .then((data) => {
                setFormFieldsData(data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

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

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <Controller
                name="startQuarter"
                control={control}
                rules={{
                    validate: (startQuarter, { endQuarter }) => {
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
                    },
                }}
                render={({ field }) => (
                    <FormControl error={isQuartersSelectIncorrect}>
                        <InputLabel id="start-quarter-select">
                            Start quarter
                        </InputLabel>
                        <Select
                            labelId="start-quarter-select"
                            label="Start quarter select"
                            {...field}
                        >
                            {formFieldsData?.quarters.map(({ name, value }) => (
                                <MenuItem key={value} value={value}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                        {isQuartersSelectIncorrect && (
                            <FormHelperText>
                                Incorrect quarters pick order
                            </FormHelperText>
                        )}
                    </FormControl>
                )}
            />
            <Controller
                name="endQuarter"
                control={control}
                rules={{
                    validate: (endQuarter, { startQuarter }) => {
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
                    },
                }}
                render={({ field }) => (
                    <FormControl error={isQuartersSelectIncorrect}>
                        <InputLabel id="end-quarter-select">
                            End quarter
                        </InputLabel>
                        <Select
                            labelId="end-quarter-select"
                            label="End quarter select"
                            {...field}
                        >
                            {formFieldsData?.quarters.map(({ name, value }) => (
                                <MenuItem key={value} value={value}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                        {isQuartersSelectIncorrect && (
                            <FormHelperText>
                                Incorrect quarters pick order
                            </FormHelperText>
                        )}
                    </FormControl>
                )}
            />

            {/* https://codesandbox.io/s/mui-autocomplete-result-u65kf2?file=/src/RHFAutocompleteField.tsx */}
            <Controller
                name="houseTypes"
                control={control}
                render={({ field, fieldState: { error } }) => {
                    const { onChange, value, ref } = field;
                    return (
                        <>
                            <Autocomplete
                                multiple
                                value={value}
                                getOptionLabel={({ name }) => name}
                                onChange={(_, newValue) => {
                                    onChange(newValue ? newValue : null);
                                }}
                                id="controllable-states-demo"
                                options={formFieldsData?.houseTypes ?? []}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="House types"
                                        placeholder="House types"
                                        inputRef={ref}
                                    />
                                )}
                            />
                            {error ? (
                                <span style={{ color: "red" }}>
                                    {error.message}
                                </span>
                            ) : null}
                        </>
                    );
                }}
            />

            <Button variant="contained" type="submit">
                Submit
            </Button>
        </form>
    );
}
