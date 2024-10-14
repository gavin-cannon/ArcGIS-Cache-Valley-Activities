require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/GeoJSONLayer",
    "esri/geometry/Extent",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/Color",
    "esri/PopupTemplate",
], function(
    Map,
    MapView,
    GeoJSONLayer,
    Extent,
    Graphic,
    GraphicsLayer,
    Point,
    SimpleMarkerSymbol,
    Color,
    PopupTemplate
) {
    const map = new Map({
        basemap: "hybrid",
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        constraints: {
            // minScale: 1000000,
        },
    });

    //   var points = JSON.parse(eventsJSON);
    //   console.log(`Hello ${points}`);
    //points.then((result) => result.data).then((data) => console.log(data));
    //   Promise.resolve(pointsPromise).then((x) => (points = x));
    console.log(events);
    /********************
     * Add GeoJSON layer
     ********************/

    // Replace FeatureLayer with GeoJSONLayer
    const geojsonLayer = new GeoJSONLayer({
        url: "json/map.geojson",
        renderer: {
            type: "simple",
            symbol: {
                type: "simple-fill",
                color: [225, 225, 225, 0.2], // RGBA color
                outline: {
                    color: [0, 0, 0, 1], // RGBA color for outline
                    width: 3,
                },
            },
        },
    });

    map.add(geojsonLayer);

    // Set the initial extent based on GeoJSONLayer
    // view.whenLayerView(geojsonLayer).then(function (layerView) {
    //   view.extent = layerView.extent;
    // });

    geojsonLayer.when(function() {
        const extent = geojsonLayer.fullExtent;
        view.extent = extent;
    });

    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    // Create a event marker symbol
    const eventMarkerSymbol = new SimpleMarkerSymbol({
        style: "x",
        color: new Color("#ff0000"),
        size: 20,
        outline: {
            color: new Color([255, 255, 255]), // White outline
            width: 10, // Width of the outline
        },
    });

    // Create a outdoor marker symbol
    const outdoorMarkerSymbol = new SimpleMarkerSymbol({
        style: "diamond",
        color: new Color([0, 255, 0, 1]),
        size: 20,
        outline: {
            color: new Color([0, 255, 0, 1]),
            width: 10, // Width of the outline
        },
    });
    // Create a indoor marker symbol
    const indoorMarkerSymbol = new SimpleMarkerSymbol({
        style: "triangle",
        color: new Color([0, 255, 0, 0]),
        size: 20,
        outline: {
            color: new Color([255, 165, 0, 1]),
            width: 10, // Width of the outline
        },
    });
    // Create a graphic representing the event location
    // const eventGraphic = new Graphic({
    //   geometry: eventLocation,
    //   symbol: eventMarkerSymbol,
    //   popupTemplate: {
    //     title: "This is a title",
    //     content: "",
    //   },
    // });

    // Add the event marker to the map
    // graphicsLayer.add(eventGraphic);

    events.forEach(function(event) {
        console.log(event);
        var graphic = new Graphic({
            geometry: {
                type: "point",
                longitude: event.longitude,
                latitude: event.latitude,
            },
            attributes: {
                name: event.name,
                id: event.id,
            },
            symbol: eventMarkerSymbol,
            popupTemplate: {
                title: event.title,
                content: event.content,
            },
        });
        graphicsLayer.add(graphic);
    });

    outdoorActivities.forEach(function(outdoorActivity) {
        console.log(outdoorActivity);
        var graphic = new Graphic({
            geometry: {
                type: "point",
                longitude: outdoorActivity.longitude,
                latitude: outdoorActivity.latitude,
            },
            attributes: {
                name: outdoorActivity.name,
                id: outdoorActivity.id,
            },
            symbol: outdoorMarkerSymbol,
            popupTemplate: {
                title: outdoorActivity.title,
                content: outdoorActivity.content,
            },
        });
        graphicsLayer.add(graphic);
    });

    indoorActivities.forEach(function(indoorActivity) {
        console.log(indoorActivity);
        var graphic = new Graphic({
            geometry: {
                type: "point",
                longitude: indoorActivity.longitude,
                latitude: indoorActivity.latitude,
            },
            attributes: {
                name: indoorActivity.name,
                id: indoorActivity.id,
            },
            symbol: indoorMarkerSymbol,
            popupTemplate: {
                title: indoorActivity.title,
                content: indoorActivity.content,
            },
        });
        graphicsLayer.add(graphic);
    });
});

// async function fetchEventsJSON() {
//   var jsonData;
//   await fetch("json/events.json")
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }
//       jsonData = res.json();
//     })
//     .then((data) => console.log(data))
//     .catch((error) => console.error("Unable to fetch data:", error));
//   return jsonData;
// }

// function setPoints(promisePoints) {
//   points = promisePoints;
// }
var events = [{
        longitude: -111.84816144907606,
        latitude: 41.722544018683784,
        name: "Cache Valley Cowboy Rendezvous",
        id: 1,
        title: "Cache Valley Cowboy Rendezvous",
        content: "Find tickets for Ned LeDoux at Cache County Event Center in Logan on 3/14/2024 at 7:00 PM.",
        price: "$15",
    },
    {
        longitude: -111.8333581183888,
        latitude: 41.72120162483418,
        name: "Cache Valley Chocolate Festival",
        id: 2,
        title: "Cache Valley Chocolate Festival",
        content: "Join us for a night of extraordinary chocolate, familiar friendly faces, and lively Planned Parenthood spirit in support of PPAU and our Logan Health Center.",
        price: "",
    },
    {
        longitude: -111.84637246256757,
        latitude: 41.72331170440331,
        name: "Cache Valley Summer Kick Off Party",
        id: 3,
        title: "Cache Valley Summer Kick Off Party",
        content: "Cache Valley Summer Kick Off PartyExplore all upcoming kick events in Logan, Utah, find information & tickets for upcoming kick events happening in Logan, Utah.",
        price: "",
    },
    {
        longitude: -111.83525213276555,
        latitude: 41.730564303147865,
        name: "The Simon & Garfunkel Story",
        id: 4,
        title: "The Simon & Garfunkel Story",
        content: "The Simon & Garfunkel Story is touring North America again this year! Using huge projection photos and original film footage, featuring a full live band performing all the hits including ‘Mrs...",
        price: "",
    },
    {
        longitude: -111.83150876396535,
        latitude: 41.740397726626945,
        name: "Dinner Show featuring Jay Richards Orchestra - Musical Theater",
        id: 5,
        title: "Dinner Show featuring Jay Richards Orchestra - Musical Theater",
        content: "Rent a bike and explore the surrounding area on two wheels.",
        price: "",
    },
    {
        longitude: -111.80611056583719,
        latitude: 41.742492410475926,
        name: "Cache Valley String Festival 2024",
        id: 6,
        title: "Cache Valley String Festival 2024",
        content: "Events happening in Logan, Utah on Saturday, 9th March 2024 information about Upcoming events in Logan like parties, concerts, meets,shows, sports, club, reunion, Performance",
        price: "",
    },
];
var outdoorActivities = [{
        longitude: -111.95251720199882,
        latitude: 41.787548779373594,
        name: "Benson Marina",
        id: 1,
        title: "Benson Marina",
        content: "Enjoy a scenic hike through the local nature reserve.",
        price: "",
    },
    {
        longitude: -111.77995026122288,
        latitude: 41.768135306809285,
        name: "King Nature Park",
        id: 2,
        title: "King Nature Park",
        content: "Walk around nature preserve, fish, or go on hikes, or camp.",
        price: "Free",
    },
    {
        longitude: -111.85419360348472,
        latitude: 41.623395898115184,
        name: "Hyrum Resovoir",
        id: 3,
        title: "Hyrum Resovoir",
        content: "Go fish, boat, swim, picnic next to the water.",
        price: "Price dependent on whether you want to bring a boat or walk in.",
    },
    {
        longitude: -111.71399310076879,
        latitude: 41.74761548062421,
        name: "Crimson Trailhead",
        id: 4,
        title: "Crimson Trailhead",
        content: "Enjoy a beautiful hike.",
        price: "Free.",
    },
    {
        longitude: -111.75763283646663,
        latitude: 41.86936233680745,
        name: "Smithfield Canyon",
        id: 5,
        title: "Smithfield Canyon",
        content: "Go camp, shoot guns, hike, experience the beautiful serenity of Smithfield Canyon.",
        price: "Free",
    },
    {
        longitude: -111.75640869475241,
        latitude: 41.92629832516806,
        name: "Cherry Peak Ski Resort",
        id: 6,
        title: "Cherry Peak Ski Resort",
        content: "Go ski or snowboard.",
        price: "Price dependent on pass you want.",
    },
    {
        longitude: -111.79083995948406,
        latitude: 41.75573531586087,
        name: "Lundstrom Park",
        id: 7,
        title: "Lundstrom Park",
        content: "Come use the playground, play baseball, go on a walk, read a book etc.",
        price: "",
    },
    {
        longitude: -111.788461827268,
        latitude: 41.742538050644846,
        name: "First Dam Park",
        id: 8,
        title: "First Dam Park",
        content: "Go swim, kayak, picnic and enjoy the water of first dam.",
        price: "",
    },
];

var indoorActivities = [{
        longitude: -111.8383946239946,
        latitude: 41.7598105660805,
        name: "The Jump Zone",
        id: 1,
        title: "The Jump Zone",
        content: "Playful indoor trampoline park offering distinct zones for ages",
        price: "Price dependent on pass.",
    },
    {
        longitude: -111.83119890298006,
        latitude: 41.754969626060564,
        name: "Fun Unlimited",
        id: 2,
        title: "Fun Unlimited",
        content: "Enjoy a dank experience browsing books, video games, cards, 45 records etc.",
        price: "",
    },
    {
        longitude: -111.83482776762813,
        latitude: 41.74595859806995,
        name: "Heber Hatchets",
        id: 3,
        title: "Heber Hatchets",
        content: "Throw some axes yall.",
        price: "Depends on rounds of throwing",
    },
    {
        longitude: -111.83568514947086,
        latitude: 41.73124589218965,
        name: "Utah Theatre",
        id: 4,
        title: "Utah Theatre",
        content: "Watch classic cinema in a beautiful restored cinema.",
        price: "",
    },
    {
        longitude: -111.83589038027004,
        latitude: 41.73126291645582,
        name: "Caine Lyric Theatre",
        id: 5,
        title: "Caine Lyric Theatre",
        content: "Catch a play at the Caine Lyric Theatre.",
        price: "",
    },
    {
        longitude: -111.83799992419532,
        latitude: 41.730330565479214,
        name: "Desante Theatre",
        id: 6,
        title: "Desante Theatre",
        content: "Enjoy a multitude of activities like improv on friday nights.",
        price: "",
    },
];