import { useRef, useEffect, useState } from 'react';
import SidePanel from './SidePanel.tsx';
import Legend from './Legend.tsx';
import './Map.css';
import mapboxgl, { ExpressionSpecification, GeoJSONFeature, LngLatBoundsLike, LngLatLike, MapMouseEvent } from 'mapbox-gl';
import { getTrailData, getSegmentData, calculateAllTrailsStats, calculateSingleTrailStats, calculateTrailSegmentStats } from './MapData.tsx';

type LineId = string | number | undefined;

type TrailStatsType = AllTrailsStatsType | SingleTrailStatsType | TrailSegmentStatsType;

export type AllTrailsStatsType  = {
    completePct: number,
    numCompletedTrails: number,
    numIncompleteTrails: number,
    completedLength: number,
    incompleteLength: number
};

export type LngLat = number[];

export type SingleTrailStatsType  = {
    trailName: string,
    completePct: number,
    startsAt: LngLat,
    endsAt: LngLat,
    completedLength: number,
    incompleteLength: number
};

export type TrailSegmentStatsType  = {
    trailName: string,
    completedStatus: string,
    startsAt: LngLat,
    endsAt: LngLat,
    length: number
};

export const MapMode = {
    BASE: 'base',
    TRAIL: 'trail',
    SEGMENT: 'segment',
};

const Sources = {
    TRAILS: 'trails',
    SEGMENTS: 'segments'
}

const Layers = {
    COMPLETED_SEGMENTS: 'segment-lines-complete',
    INCOMPLETE_SEGMENTS: 'segment-lines-incomplete',
    DESELECTED_TRAILS: 'trail-lines-deselected',
    TRAIL_OUTLINE: 'trail-lines-highlight-outline',
    TRAIL_HIGHLIGHT: 'trail-lines-highlight',
    SEGMENT_OUTLINE: 'segment-lines-highlight-outline',
    SEGMENT_HIGHLIGHT: 'segment-lines-highlight',
    TRAIL_HITBOX: 'trail-hitbox',
    SEGMENT_HITBOX: 'segment-hitbox'
}

const NOT_SELECTED_COLOR = "#878787";
const COMPLETED_COLOR = "#ff0000";
const INCOMPLETE_COLOR = "#8c0000";
const HIGHLIGHT_COLOR = "#ffe100";
const LINE_WIDTH = 2;
const HITBOX_LINE_WIDTH = 15;
const INVISIBLE_ON_HIDE: ExpressionSpecification = [
    'case',
    ['boolean', ['feature-state', 'hide'], false],
    0,
    1
];
const SHOW_IF_NOT_SELECTED: ExpressionSpecification = [
    'case',
    ['boolean', ['feature-state', 'selected'], false],
    0,
    1
];
const SHOW_ON_HOVER_OR_SELECTED: ExpressionSpecification = [
    'case',
    ['boolean', ['any', ['to-boolean', ['feature-state', 'hover']], ['to-boolean', ['feature-state', 'selected']]], false],
    1,
    0
];
const SHOW_ON_HOVER: ExpressionSpecification = [
    'case',
    ['boolean', ['feature-state', 'hover'], false],
    0.75,
    0
];


function Map() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWVvd3lwdXJyIiwiYSI6ImNsemxlNTE0ZzAxbWUybG9qdHk1aGNlbHkifQ.WEaFTpVEow-9nOl0__ZqeA';

    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [trailStats, setTrailStats] = useState<TrailStatsType>(calculateAllTrailsStats());
    const [showStats, setShowStats] = useState(true);
    
    /*** Map mode management
     * 
     * The mode simply determines which layers are visible and interactable
     * 
     *  ***/

    const [mapMode, setMapMode] = useState(MapMode.BASE);
    let clickedOnTrail = useRef(false);

    function onMapClick() {
        if (clickedOnTrail.current) {
            setShowStats(true);
        }
        switch (mapMode) {
            case MapMode.SEGMENT:
                if (clickedOnTrail.current) {
                    setTrailStats(calculateTrailSegmentStats(selectedSegment.current));
                } else {
                    setSegmentSelectedState(false);
                    setTrailSelectedState(false);
                    switchToBaseMode();
                    setTrailStats(calculateAllTrailsStats());
                }
                break;
            case MapMode.TRAIL:
                if (clickedOnTrail.current) {
                    switchToSegmentMode();
                    setTrailStats(calculateTrailSegmentStats(selectedSegment.current));
                } else {
                    setTrailSelectedState(false);
                    switchToBaseMode();
                    setTrailStats(calculateAllTrailsStats());
                }
                break;
            case MapMode.BASE:
                if (clickedOnTrail.current) {
                    switchToTrailMode();
                    setTrailStats(calculateSingleTrailStats(selectedTrail.current));
                }
                break;
        }
        clickedOnTrail.current = false;
    }

    function setLayerVisibility(layerId: string, isVisible: boolean) {
        if (!map.current) return;
        map.current.setLayoutProperty(layerId, 'visibility', isVisible ? 'visible' : 'none');
    }

    function switchToSegmentMode() {
        if (!map.current) return;
        console.log('SEGMENT mode');
        setMapMode(MapMode.SEGMENT);
        setLayerVisibility(Layers.DESELECTED_TRAILS, true);
        setLayerVisibility(Layers.SEGMENT_HITBOX, true);
        setLayerVisibility(Layers.TRAIL_HIGHLIGHT, false);
        setLayerVisibility(Layers.TRAIL_OUTLINE, false);
        setLayerVisibility(Layers.SEGMENT_HIGHLIGHT, true);
        setLayerVisibility(Layers.SEGMENT_OUTLINE, true);
        setLayerVisibility(Layers.TRAIL_HITBOX, false);
    }

    function switchToTrailMode() {
        if (!map.current) return;
        console.log('TRAIL mode');
        setMapMode(MapMode.TRAIL);
        setLayerVisibility(Layers.DESELECTED_TRAILS, true);
        setLayerVisibility(Layers.SEGMENT_HITBOX, true);
        setLayerVisibility(Layers.TRAIL_HIGHLIGHT, false);
        setLayerVisibility(Layers.TRAIL_OUTLINE, true);
        setLayerVisibility(Layers.SEGMENT_HIGHLIGHT, true);
        setLayerVisibility(Layers.SEGMENT_OUTLINE, false);
        setLayerVisibility(Layers.TRAIL_HITBOX, false);
    }

    function switchToBaseMode() {
        if (!map.current) return;
        console.log('BASE mode');
        setMapMode(MapMode.BASE);
        setLayerVisibility(Layers.DESELECTED_TRAILS, false);
        setLayerVisibility(Layers.SEGMENT_HITBOX, false);
        setLayerVisibility(Layers.TRAIL_HIGHLIGHT, true);
        setLayerVisibility(Layers.TRAIL_OUTLINE, true);
        setLayerVisibility(Layers.SEGMENT_HIGHLIGHT, false);
        setLayerVisibility(Layers.SEGMENT_OUTLINE, false);
        setLayerVisibility(Layers.TRAIL_HITBOX, true);
    }

    /*** Map state management
     * 
     * I'm using useRef for variables used in map rendering
     * instead of useState because Mapbox handles its own state, not React
     * 
     * ***/
    let hoveredTrailLineId = useRef<LineId>();
    let selectedTrail = useRef<GeoJSONFeature>();
    let hoveredSegmentLineId = useRef<LineId>();
    let selectedSegment = useRef<GeoJSONFeature>();

    function setTrailHoverState(isHovered: boolean) {
        if (!map.current || hoveredTrailLineId.current === undefined) return;
        map.current.setFeatureState(
            { source: Sources.TRAILS, id: hoveredTrailLineId.current },
            { hover: isHovered }
        );
    }

    function setSegmentHoverState(isHovered: boolean) {
        if (!map.current || hoveredSegmentLineId.current === undefined) return;
        map.current.setFeatureState(
            { source: Sources.SEGMENTS, id: hoveredSegmentLineId.current },
            { hover: isHovered }
        );
    }

    function setTrailSelectedState(isSelected: boolean) {
        if (!map.current || selectedTrail.current?.id === undefined) return;
        map.current.setFeatureState(
            { source: Sources.TRAILS, id: selectedTrail.current.id },
            { selected: isSelected }
        );
        hideOrShowSegmentsNotBelongingToSelectedTrail(isSelected);
    }

    function hideOrShowSegmentsNotBelongingToSelectedTrail(isSelected: boolean) {
        if (!map.current) return;
        if (isSelected) {
            const trailSegments = getSegmentData();
            trailSegments.features.forEach((segment) => {
                if (
                    !map.current || !segment.id || 
                    segment.properties?.trail_id === selectedTrail.current?.properties?.trail_id
                ) return;
                map.current.setFeatureState(
                    { source: Sources.SEGMENTS, id: segment.id },
                    { hide: true }
                );
            });
        } else {
            map.current.removeFeatureState({ source: Sources.SEGMENTS });
        }
    }

    function setSegmentSelectedState(isSelected: boolean) {
        if (!map.current || selectedSegment.current?.id === undefined) return;
        map.current.setFeatureState(
            { source: Sources.SEGMENTS, id: selectedSegment.current.id },
            { selected: isSelected }
        );
    }


    /*** Map initialization & setup ***/

    useEffect(() => {

        if (!mapContainer.current) return;
        if (map.current) return; // initialize map only once
        
        let center: LngLatLike, zoom, minZoom, maxBounds: LngLatBoundsLike;
        // equating portrait mode with mobile, not perfect but ¯\_(ツ)_/¯
        if (window.innerWidth < window.innerHeight) {
            center =[-74.08671330881933, 41.13570795376842];
            zoom = 10;
            minZoom = 10;
            maxBounds = [[-74.47446258375935, 40.727740459542446], [-73.6741092494581, 41.77837523121494]];
        } else {
            center = [-74.14358578558068, 41.22792804241226];
            zoom = 10.9;
            minZoom = 10.4;
            maxBounds = [[ -74.380923, 41.030660], [ -73.727133, 41.403808]];
        }; 

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/meowypurr/clzpy8ohh00bn01qg7rsa8u3u',
            center: center,
            zoom: zoom,
            minZoom: minZoom,
            maxBounds: maxBounds 
        });

        const infoPopup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            className: 'info-popup',
            maxWidth: '100px'
        }).trackPointer();
        

        map.current.on('load', () => {

            if (!map.current) return;

            /*** Add map sources: segment data and trail data ***/

            map.current.addSource(Sources.SEGMENTS, {
                'type': 'geojson',
                'promoteId': 'id',
                'data': getSegmentData()
            });

            map.current.addSource(Sources.TRAILS, {
                'type': 'geojson',
                'promoteId': 'id',
                'data': getTrailData()
            });


            /*** Add map layers:
             * 
             * completed & incomplete segments - for base color styling
             * deselected trails - for trail mode styling
             * trail/segment highlights and outlines - for hover and select state styling
             * trail/segment hitboxes - for making trails easier to interact with
             * 
             * ***/

            map.current.addLayer({
                'id': Layers.DESELECTED_TRAILS,
                'type': 'line',
                'source': Sources.TRAILS,
                'layout': {
                    'visibility': 'none',
                },
                'paint': {
                    'line-color': NOT_SELECTED_COLOR,
                    'line-opacity': SHOW_IF_NOT_SELECTED,
                    'line-width': LINE_WIDTH,
                }
            });

            map.current.addLayer({
                'id': Layers.COMPLETED_SEGMENTS,
                'type': 'line',
                'source': Sources.SEGMENTS,
                'filter': ['==', 'complete', ['get', 'status']],
                'paint': {
                    'line-color': COMPLETED_COLOR,
                    'line-width': LINE_WIDTH,
                    'line-opacity': INVISIBLE_ON_HIDE
                }
            });

            map.current.addLayer({
                'id': Layers.INCOMPLETE_SEGMENTS,
                'type': 'line',
                'source': Sources.SEGMENTS,
                'filter': ['==', 'incomplete', ['get', 'status']],
                'paint': {
                    'line-color': INCOMPLETE_COLOR,
                    'line-width': LINE_WIDTH,
                    'line-opacity': INVISIBLE_ON_HIDE
                }
            });

            map.current.addLayer({
                'id': Layers.TRAIL_OUTLINE,
                'type': 'line',
                'source': Sources.TRAILS,
                'paint': {
                    'line-color': HIGHLIGHT_COLOR,
                    'line-gap-width': LINE_WIDTH,
                    'line-opacity': SHOW_ON_HOVER_OR_SELECTED,
                    'line-width': LINE_WIDTH,
                }
            });

            map.current.addLayer({
                'id': Layers.TRAIL_HIGHLIGHT,
                'type': 'line',
                'source': Sources.TRAILS,
                'paint': {
                    'line-color': HIGHLIGHT_COLOR,
                    'line-opacity': SHOW_ON_HOVER,
                    'line-width': LINE_WIDTH,
                }
            });

            map.current.addLayer({
                'id': Layers.SEGMENT_OUTLINE,
                'type': 'line',
                'source': Sources.SEGMENTS,
                'layout': {
                    'visibility': 'none'
                },
                'paint': {
                    'line-color': HIGHLIGHT_COLOR,
                    'line-gap-width': LINE_WIDTH,
                    'line-opacity': SHOW_ON_HOVER_OR_SELECTED,
                    'line-width': LINE_WIDTH,
                }
            });

            map.current.addLayer({
                'id': Layers.SEGMENT_HIGHLIGHT,
                'type': 'line',
                'source': Sources.SEGMENTS,
                'layout': {
                    'visibility': 'none'
                },
                'paint': {
                    'line-color': HIGHLIGHT_COLOR,
                    'line-opacity': SHOW_ON_HOVER,
                    'line-width': LINE_WIDTH,
                }
            });

            map.current.addLayer({
                'id': Layers.TRAIL_HITBOX,
                'type': 'line',
                'source': Sources.TRAILS,
                'paint': {
                    'line-width': HITBOX_LINE_WIDTH,
                    'line-opacity': 0
                }
            });

            map.current.addLayer({
                'id': Layers.SEGMENT_HITBOX,
                'type': 'line',
                'source': Sources.SEGMENTS,
                'layout': {
                    'visibility': 'none'
                },
                'paint': {
                    'line-width': HITBOX_LINE_WIDTH,
                    'line-opacity': 0
                }
            });


            /*** Event handlers: hovering & selecting both trails & segments ***/

            map.current.on('mouseenter', Layers.TRAIL_HITBOX, () => {
                if (!map.current) return;
                map.current.getCanvas().style.cursor = 'pointer';
            });

            map.current.on('mousemove', Layers.TRAIL_HITBOX, (e) => {
                setTrailHoverState(false)
                const trail = getInteractedTrail(e);
                if (trail) {
                    hoveredTrailLineId.current = trail.id;
                    setTrailHoverState(true);
                        addPopup(trail);
                }
                
            });

            map.current.on('mouseleave', Layers.TRAIL_HITBOX, () => {
                if (!map.current) return;
                setTrailHoverState(false);
                hoveredTrailLineId.current = undefined;
                map.current.getCanvas().style.cursor = '';
                infoPopup.remove();
            });

            map.current.on('click', Layers.TRAIL_HITBOX, (e) => {
                clickedOnTrail.current = true;
                setTrailSelectedState(false);
                const trail = getInteractedTrail(e);
                if (trail) {
                    selectedTrail.current = trail;
                    setTrailSelectedState(true);
                }
                infoPopup.remove();
            });
    
            map.current.on('mouseenter', Layers.SEGMENT_HITBOX, (e) => {
                if (!map.current || selectedTrailIsComplete()) return;
                const segment = getInteractedSegment(e);
                if (segment) {
                    map.current.getCanvas().style.cursor = 'pointer';
                }
            });

            map.current.on('mousemove', Layers.SEGMENT_HITBOX, (e) => {
                setSegmentHoverState(false)
                if (selectedTrailIsComplete()) return;
                const segment = getInteractedSegment(e);
                if (segment) {
                    hoveredSegmentLineId.current = segment.id;
                    setSegmentHoverState(true);
                }
            });

            map.current.on('mouseleave', Layers.SEGMENT_HITBOX, () => {
                if (!map.current) return;
                setSegmentHoverState(false);
                hoveredSegmentLineId.current = undefined;
                map.current.getCanvas().style.cursor = '';
            });

            map.current.on('click', Layers.SEGMENT_HITBOX, (e) => {
                if (selectedTrailIsComplete()) return;
                const segment = getInteractedSegment(e);
                if (segment) {
                    clickedOnTrail.current = true;
                    setSegmentSelectedState(false);
                    selectedSegment.current = segment;
                    setSegmentSelectedState(true);
                }
            });

            /*** Helper functions ***/

            function selectedTrailIsComplete() {
                return (selectedTrail && selectedTrail.current && selectedTrail.current.properties && 
                    selectedTrail.current.properties.status === 'complete'
                );
            }

            function getInteractedTrail(e: MapMouseEvent) {
                return e.features && e.features.length > 0 ? e.features[0] : undefined;
            }

            function getInteractedSegment(e: MapMouseEvent) {
                let interactedSegment;
                if (e.features && e.features.length > 0) {
                    for (let i=0; i<e.features.length; i++) {
                        const segment = e.features[i];
                        if (selectedTrail.current?.properties?.trail_id === segment.properties?.trail_id){
                            interactedSegment = segment;
                            break;
                        }
                    }
                }
                return  interactedSegment;
            }

            function addPopup(trail: GeoJSONFeature) {
                if (!map.current || !trail.properties) return;
                const content = trail.properties.name;
                infoPopup.setHTML(content).addTo(map.current);
            }

        });

    });
    return (
        <div>
            <SidePanel mapMode={mapMode} showStats={showStats} toggleShowStats={() => { setShowStats(!showStats)} } trailStats={trailStats} />
            <div ref={mapContainer} className="map-container" onClick={onMapClick} />
            <Legend />
        </div>
    );
}

export default Map;