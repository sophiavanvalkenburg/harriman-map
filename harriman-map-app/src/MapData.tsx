import { GeoJSONFeature } from "mapbox-gl";
import { FeatureCollection, Feature } from "geojson";
import trailData from './assets/data/harriman_bearmt_all_trails.json';
import segmentData from './assets/data/harriman_bearmt_segmented_trails.json';

function getNumTrails(statusToMatch: string) {
    return trailData.features.filter((trail) => {
        if (!trail.properties) return false;
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
    for (let i=0; i<segmentData.features.length; i++) {
        const trail = segmentData.features[i];
        if (!trail.properties || !trailToMatch.properties || 
            trail.properties.name !== trailToMatch.properties.name) continue; 
        if (trail.properties.status === 'complete') {
            completedLength += trail.properties.length;
        } else {
            incompleteLength += trail.properties.length;
        }
    }
    return [completedLength, incompleteLength];
};

export function calculateAllTrailsStats() {
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

export function calculateSingleTrailStats(trail: GeoJSONFeature | undefined) {
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
        stats.endsAt = trail.geometry.coordinates[trail.geometry.coordinates.length-1];
        stats.completedLength = completedLength;
        stats.incompleteLength = incompleteLength;
    }
    return stats;
}

export function calculateTrailSegmentStats(segment: GeoJSONFeature | undefined) {
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
        stats.endsAt = segment.geometry.coordinates[segment.geometry.coordinates.length-1];
        stats.length = segment.properties.length;
    }
    return stats;
}

export function getTrailData(): FeatureCollection {
    return trailData as FeatureCollection;
}

export function getSegmentData(): FeatureCollection {
    return segmentData as FeatureCollection;
}