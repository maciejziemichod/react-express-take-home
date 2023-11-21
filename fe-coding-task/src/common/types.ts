export type SavedStatItem = {
    key: string;
    name: string;
};

export type FormFields = {
    startQuarter: string;
    endQuarter: string;
    houseType: string;
};

export type FormFieldsData = {
    quarters: Array<{
        name: string;
        value: string;
    }>;
    houseTypes: Array<{
        name: string;
        value: string;
    }>;
};
