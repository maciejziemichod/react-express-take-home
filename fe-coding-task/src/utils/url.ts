type Params = {
    startQuarter?: string;
    endQuarter?: string;
    houseTypes?: string[];
};

export function updateParams({
    houseTypes,
    startQuarter,
    endQuarter,
}: Params): void {
    const params = new URLSearchParams();

    if (houseTypes && houseTypes.length > 0) {
        params.set("house_types", houseTypes.join(","));
    }

    if (startQuarter) {
        params.set("start_quarter", startQuarter);
    }

    if (endQuarter) {
        params.set("end_quarter", endQuarter);
    }

    const newParams = params.toString();

    if (newParams !== "") {
        window.history.replaceState(
            null,
            "",
            window.location.pathname + "?" + newParams,
        );
    }
}

export function getParams(): Params {
    const searchParams = new URLSearchParams(window.location.search);
    const params: Params = {};

    const houseTypes = searchParams.get("house_types");
    const startQuarter = searchParams.get("start_quarter");
    const endQuarter = searchParams.get("end_quarter");

    if (houseTypes) {
        params.houseTypes = houseTypes.split(",");
    }
    if (startQuarter) {
        params.startQuarter = startQuarter;
    }
    if (endQuarter) {
        params.endQuarter = endQuarter;
    }

    return params;
}
