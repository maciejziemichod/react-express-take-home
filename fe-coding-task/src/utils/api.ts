import { FormFieldsData } from "../common/types";

const endpoint = "https://data.ssb.no/api/v0/no/table/07241";

export async function getFormFieldsData(): Promise<FormFieldsData> {
    const response = await fetch(endpoint);
    const data: {
        variables?: Array<{
            code: "Boligtype" | "Tid";
            values: string[];
            valueTexts: string[];
        }>;
    } = await response.json();

    if (!Array.isArray(data?.variables)) {
        throw new Error("No form fields data was returned from the API.");
    }

    const formFieldsData: Partial<FormFieldsData> = {};
    data.variables.forEach((variable) => {
        if (typeof variable !== "object") {
            throw new Error(
                "Invalid format of form fields data was returned from the API.",
            );
        }

        const { code, values, valueTexts } = variable;
        if (
            !Array.isArray(values) ||
            !Array.isArray(valueTexts) ||
            values.length !== valueTexts.length
        ) {
            throw new Error(
                "Invalid format of form fields data was returned from the API.",
            );
        }

        const items = valueTexts.map((name, index) => ({
            name,
            value: values[index],
        }));

        switch (code) {
            case "Tid":
                formFieldsData.quarters = items;
                break;
            case "Boligtype":
                formFieldsData.houseTypes = items;
                break;
            default:
                break;
        }
    });

    if (!formFieldsData.houseTypes || !formFieldsData.quarters) {
        throw new Error("Missing form fields data.");
    }

    return formFieldsData as FormFieldsData;
}

type QueryItem = {
    code: string;
    selection: {
        filter: string;
        values: string[];
    };
};

export async function queryData(
    houseType: string = "",
    quarters: string[] = [],
): Promise<number[]> {
    const query = [getQueryItem("ContentsCode", ["KvPris"])];
    if (houseType !== "") {
        query.push(getQueryItem("Boligtype", [houseType]));
    }
    if (quarters.length > 0) {
        query.push(getQueryItem("Tid", quarters));
    }

    const response = await fetch(endpoint, {
        headers: {
            "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            query,
            response: {
                format: "json-stat2",
            },
        }),
    });
    const data = await response.json();

    if (!Array.isArray(data?.value)) {
        throw new Error("Invalid response from API");
    }

    return data.value;
}

function getQueryItem(code: string, values: string[]): QueryItem {
    return {
        code,
        selection: {
            filter: "item",
            values,
        },
    };
}
