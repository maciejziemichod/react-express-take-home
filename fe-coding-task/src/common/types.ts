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

export type CommentedStatsMap = {
    [key: string]: {
        comment: string;
        data: number[];
        quarters: string[];
        houseType: string;
    };
};
