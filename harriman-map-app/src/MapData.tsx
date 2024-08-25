import { FeatureCollection, Feature } from "geojson";
import trailData from './assets/data/harriman_bearmt_all_trails.json';
import segmentData from './assets/data/harriman_bearmt_segmented_trails.json';

export type TrailStatsType = AllTrailsStatsType | SingleTrailStatsType | TrailSegmentStatsType;

export type AllTrailsStatsType = {
    completePct: number,
    numCompletedTrails: number,
    numIncompleteTrails: number,
    completedLength: number,
    incompleteLength: number
};

export type LngLat = number[];

export type SingleTrailStatsType = {
    trailName: string,
    completePct: number,
    startsAt: LngLat,
    endsAt: LngLat,
    completedLength: number,
    incompleteLength: number
};

export type TrailSegmentStatsType = {
    trailName: string,
    completedStatus: string,
    startsAt: LngLat,
    endsAt: LngLat,
    length: number
};

export function getTrailData(): FeatureCollection {
    return trailData as FeatureCollection;
}

export function getSegmentData(): FeatureCollection {
    return segmentData as FeatureCollection;
}

export function getStatsForSegment(segmentLineId: string) {
    return Stats.forSegment[segmentLineId];
}

export function getStatsForTrail(trailLineId: string) {
    return Stats.forTrail[trailLineId];
}

export function getStatsForAllTrails() {
    return Stats.all;
}

const Stats = {
    all: calculateAllTrailsStats(),
    forTrail: statsPerTrail(),
    forSegment: statsPerSegment()
}

function getNumTrails(statusToMatch: string) {
    return trailData.features.filter((trail) => {
        return trail.properties.status === statusToMatch;
    }).length;
}

function getTrailsLength() {
    let completedLength = 0;
    let incompleteLength = 0;
    trailData.features.forEach((trail) => {
        const [completedTrailLength, incompleteTrailLength] = getSegmentsLength(trail as Feature);
        completedLength += completedTrailLength;
        incompleteLength += incompleteTrailLength;
    })
    return [completedLength, incompleteLength];
}

function getSegmentsLength(trailToMatch: Feature) {
    let completedLength = 0;
    let incompleteLength = 0;
    for (let i = 0; i < segmentData.features.length; i++) {
        const trail = segmentData.features[i];
        if (trail.properties.name !== trailToMatch.properties?.name) continue;
        if (trail.properties.status === 'complete') {
            completedLength += trail.properties.length;
        } else {
            incompleteLength += trail.properties.length;
        }
    }
    return [completedLength, incompleteLength];
};

function calculateAllTrailsStats() {
    const [completedLength, incompleteLength] = getTrailsLength();
    const completePct = 100 * completedLength / (completedLength + incompleteLength);
    return {
        completePct: completePct,
        numCompletedTrails: getNumTrails('complete'),
        numIncompleteTrails: getNumTrails('incomplete'),
        completedLength: completedLength,
        incompleteLength: incompleteLength
    }
};

interface StatsById {
    [index: string]: SingleTrailStatsType | TrailSegmentStatsType;
}
function statsPerTrail() {
    const stats: StatsById = {};
    trailData.features.forEach((trail) => {
        stats[trail.properties.id] = calculateSingleTrailStats(trail as Feature);
    });
    return stats;
}

function statsPerSegment() {
    const stats: StatsById = {};
    segmentData.features.forEach((segment) => {
        stats[segment.properties.id] = calculateTrailSegmentStats(segment as Feature);
    });
    return stats;
}

function calculateSingleTrailStats(trail: Feature) {
    const stats = {
        trailName: '',
        completePct: 0,
        startsAt: [NaN, NaN],
        endsAt: [NaN, NaN],
        completedLength: 0,
        incompleteLength: 0
    };
    if (trail && trail.properties && trail.geometry.type === 'LineString') {
        const [completedLength, incompleteLength] = getSegmentsLength(trail);
        const completePct = 100 * completedLength / (completedLength + incompleteLength);
        stats.trailName = trail.properties.name;
        stats.completePct = completePct;
        stats.startsAt = trail.geometry.coordinates[0];
        stats.endsAt = trail.geometry.coordinates[trail.geometry.coordinates.length - 1];
        stats.completedLength = completedLength;
        stats.incompleteLength = incompleteLength;
    }
    return stats;
}

function calculateTrailSegmentStats(segment: Feature) {
    const stats = {
        trailName: '',
        completedStatus: '',
        startsAt: [NaN, NaN],
        endsAt: [NaN, NaN],
        length: 0
    };
    if (segment && segment.properties && segment.geometry.type === 'LineString') {
        stats.trailName = segment.properties.name;
        stats.completedStatus = segment.properties.status;
        stats.startsAt = segment.geometry.coordinates[0];
        stats.endsAt = segment.geometry.coordinates[segment.geometry.coordinates.length - 1];
        stats.length = segment.properties.length;
    }
    return stats;
}