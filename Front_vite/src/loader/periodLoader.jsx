import { getCurrentPeriod } from "../apis/period.js";

export async function userLoader() {
    return getCurrentPeriod();
}