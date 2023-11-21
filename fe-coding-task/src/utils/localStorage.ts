import { CommentedStatsMap } from "../common/types";

const key = "commented_stats" as const;

export function saveCommentedStats(
    params: string,
    comment: string,
    data: number[],
    quarters: string[],
    houseType: string,
): CommentedStatsMap {
    const map = getCommentedStats();

    map[params] = {
        comment,
        data,
        quarters,
        houseType,
    };

    try {
        localStorage.setItem(key, JSON.stringify(map));
        return map;
    } catch (e) {
        console.error(e);
        return {};
    }
}

export function getCommentedStats(): CommentedStatsMap {
    const data = localStorage.getItem(key);

    if (data === null) {
        return {};
    }

    try {
        const map = JSON.parse(data);

        if (typeof map === "object" && !Array.isArray(map) && map !== null) {
            return map;
        }

        return {};
    } catch (e) {
        console.error(e);
        return {};
    }
}

export function removeCommentedStat(params: string): CommentedStatsMap {
    const map = getCommentedStats();

    delete map[params];

    try {
        localStorage.setItem(key, JSON.stringify(map));
    } catch (e) {
        console.error(e);
    } finally {
        return map;
    }
}
