export type SavedStatItem = {
    key: string;
    name: string;
};

export type HouseType = {
    name: string;
    value: string;
};

export type FormFields = {
    startQuarter: string;
    endQuarter: string;
    houseTypes: HouseType[];
};

export type FormFieldsData = {
    quarters: Array<{
        name: string;
        value: string;
    }>;
    houseTypes: HouseType[];
};
