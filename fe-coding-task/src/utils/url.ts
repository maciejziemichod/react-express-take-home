type Params = {
    startQuarter?: string;
    endQuarter?: string;
    houseType?: string;
};

export function updateParams({
    houseType,
    startQuarter,
    endQuarter,
}: Params): void {
    const params = new URLSearchParams();

    if (houseType) {
        params.set("house_type", houseType);
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

    const houseTypes = searchParams.get("house_type");
    const startQuarter = searchParams.get("start_quarter");
    const endQuarter = searchParams.get("end_quarter");

    if (houseTypes) {
        params.houseType = houseTypes;
    }
    if (startQuarter) {
        params.startQuarter = startQuarter;
    }
    if (endQuarter) {
        params.endQuarter = endQuarter;
    }

    return params;
}

export function getRawParams(): string {
    return new URLSearchParams(window.location.search).toString();
}
