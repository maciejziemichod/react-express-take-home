import { FormFieldsData } from "../common/types";

export function getQuartersRange(
    start: string | undefined,
    end: string | undefined,
    quarters: FormFieldsData["quarters"],
): string[] {
    const quartersValues = quarters.map(({ value }) => value);

    const startIndex = quartersValues.findIndex((value) => value === start);
    const endIndex = quartersValues.findIndex((value) => value === end);

    if (startIndex === -1 && endIndex === -1) {
        return quartersValues;
    }

    if (startIndex === -1) {
        return quartersValues.slice(0, endIndex + 1);
    }

    if (endIndex === -1) {
        return quartersValues.slice(startIndex);
    }

    return quartersValues.slice(startIndex, endIndex + 1);
}
