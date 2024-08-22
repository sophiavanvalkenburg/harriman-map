import { GeoJSONFeature } from 'mapbox-gl';
import { FeatureCollection } from "geojson";
import trailData from './assets/data/harriman_bearmt_all_trails.json';
import segmentData from './assets/data/harriman_bearmt_segmented_trails.json';

function getNumTrails(statusToMatch: string) {
    return trailData.features.filter((trail) => {
        if (!trail.properties) return false;
        return trail.properties.status === statusToMatch;
    }).length;
}

function getTrailsLength(statusToMatch: string) {
    let totalLength = 0;
    trailData.features.forEach((trail) => {
        if (!trail.properties || trail.properties.status !== statusToMatch) return;
        totalLength += trail.properties.length;
    })
    return totalLength;
}

function getSegmentsLength(trailToMatch: GeoJSONFeature, statusToMatch: string) {
    let totalLength = 0;
    segmentData.features.forEach((trail) => {
        if (!trail.properties || !trailToMatch.properties || 
            trail.properties.status !== statusToMatch || 
            trail.properties.name !== trailToMatch.properties.name) return;
        totalLength += trail.properties.length;
    })
    return totalLength;
};

export function calculateAllTrailsStats() {
    const completedLength = getTrailsLength('complete');
    const incompleteLength = getTrailsLength('incomplete');
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
        const completedLength = getSegmentsLength(trail, 'complete');
        const incompleteLength = getSegmentsLength(trail, 'incomplete');
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