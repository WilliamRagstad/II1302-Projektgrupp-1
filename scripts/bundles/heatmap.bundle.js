let map;
function initMap() {
    var heatmapData = [
        {
            location: new window.google.maps.LatLng(59.2698, 18.1188),
            weight: 8
        },
        {
            location: new window.google.maps.LatLng(59.386, 18.0245),
            weight: 8
        },
        {
            location: new window.google.maps.LatLng(59.4115, 18.1487),
            weight: 5
        },
        {
            location: new window.google.maps.LatLng(59.3961, 18.0799),
            weight: 6
        },
        {
            location: new window.google.maps.LatLng(59.3894, 18.1668),
            weight: 5
        },
        {
            location: new window.google.maps.LatLng(59.348, 18.0467),
            weight: 1
        },
        {
            location: new window.google.maps.LatLng(59.4137, 18.0173),
            weight: 8
        },
        {
            location: new window.google.maps.LatLng(59.2405, 18.1016),
            weight: 3
        },
        {
            location: new window.google.maps.LatLng(59.2728, 18.0061),
            weight: 8
        },
        {
            location: new window.google.maps.LatLng(59.3355, 18.0147),
            weight: 2
        },
        {
            location: new window.google.maps.LatLng(59.2569, 18.1016),
            weight: 8
        },
        {
            location: new window.google.maps.LatLng(59.4033, 18.0023),
            weight: 1
        },
        {
            location: new window.google.maps.LatLng(59.3283, 18.1231),
            weight: 1
        },
        {
            location: new window.google.maps.LatLng(59.3681, 18.1501),
            weight: 2
        },
        {
            location: new window.google.maps.LatLng(59.3832, 18.0959),
            weight: 9
        },
        {
            location: new window.google.maps.LatLng(59.3863, 18.0088),
            weight: 7
        },
        {
            location: new window.google.maps.LatLng(59.3925, 18.0242),
            weight: 4
        },
        {
            location: new window.google.maps.LatLng(59.2956, 18.1631),
            weight: 2
        },
        {
            location: new window.google.maps.LatLng(59.3385, 18.0472),
            weight: 4
        },
        {
            location: new window.google.maps.LatLng(59.2295, 18.0119),
            weight: 4
        },
        {
            location: new window.google.maps.LatLng(59.2833, 18.1505),
            weight: 1
        },
        {
            location: new window.google.maps.LatLng(59.3918, 18.0891),
            weight: 9
        },
        {
            location: new window.google.maps.LatLng(59.2651, 18.0072),
            weight: 7
        },
        {
            location: new window.google.maps.LatLng(59.3538, 18.1663),
            weight: 7
        },
        {
            location: new window.google.maps.LatLng(59.4116, 18.0005),
            weight: 7
        },
        {
            location: new window.google.maps.LatLng(59.3687, 18.0172),
            weight: 1
        },
        {
            location: new window.google.maps.LatLng(59.4048, 18.0555),
            weight: 5
        },
        {
            location: new window.google.maps.LatLng(59.312, 18.0122),
            weight: 10
        },
        {
            location: new window.google.maps.LatLng(59.2947, 18.1349),
            weight: 1
        },
        {
            location: new window.google.maps.LatLng(59.4156, 18.0348),
            weight: 6
        },
        {
            location: new window.google.maps.LatLng(59.2914, 18.1094),
            weight: 8
        },
        {
            location: new window.google.maps.LatLng(59.3282, 17.9733),
            weight: 7
        },
        {
            location: new window.google.maps.LatLng(59.3186, 17.978),
            weight: 5
        },
        {
            location: new window.google.maps.LatLng(59.2315, 18.0535),
            weight: 1
        },
        {
            location: new window.google.maps.LatLng(59.3061, 18.1505),
            weight: 8
        },
        {
            location: new window.google.maps.LatLng(59.4226, 18.1538),
            weight: 2
        },
        {
            location: new window.google.maps.LatLng(59.393, 18.1645),
            weight: 6
        },
        {
            location: new window.google.maps.LatLng(59.2961, 18.0418),
            weight: 4
        },
        {
            location: new window.google.maps.LatLng(59.3621, 18.0592),
            weight: 9
        },
        {
            location: new window.google.maps.LatLng(59.3765, 18.0992),
            weight: 8
        },
        {
            location: new window.google.maps.LatLng(59.2422, 18.0588),
            weight: 7
        },
        {
            location: new window.google.maps.LatLng(59.2341, 18.0379),
            weight: 9
        },
        {
            location: new window.google.maps.LatLng(59.239, 17.9854),
            weight: 4
        },
        {
            location: new window.google.maps.LatLng(59.2553, 18.0845),
            weight: 6
        },
        {
            location: new window.google.maps.LatLng(59.4113, 18.0134),
            weight: 4
        },
        {
            location: new window.google.maps.LatLng(59.3221, 17.977),
            weight: 7
        },
        {
            location: new window.google.maps.LatLng(59.3246, 17.9929),
            weight: 2
        },
        {
            location: new window.google.maps.LatLng(59.293, 18.1211),
            weight: 1
        },
        {
            location: new window.google.maps.LatLng(59.3471, 18.1632),
            weight: 10
        },
        {
            location: new window.google.maps.LatLng(59.3942, 18.0502),
            weight: 1
        },
        {
            location: new window.google.maps.LatLng(59.4118, 18.0671),
            weight: 5
        },
        {
            location: new window.google.maps.LatLng(59.2762, 18.1554),
            weight: 5
        },
        {
            location: new window.google.maps.LatLng(59.309, 18.0657),
            weight: 9
        },
        {
            location: new window.google.maps.LatLng(59.3806, 18.0453),
            weight: 9
        },
        {
            location: new window.google.maps.LatLng(59.3416, 18.086),
            weight: 1
        },
        {
            location: new window.google.maps.LatLng(59.4172, 18.0307),
            weight: 2
        },
        {
            location: new window.google.maps.LatLng(59.4226, 17.9847),
            weight: 2
        },
        {
            location: new window.google.maps.LatLng(59.2717, 18.0588),
            weight: 9
        },
        {
            location: new window.google.maps.LatLng(59.4229, 18.132),
            weight: 5
        },
        {
            location: new window.google.maps.LatLng(59.2814, 18.0501),
            weight: 6
        },
        {
            location: new window.google.maps.LatLng(59.2315, 18.1113),
            weight: 7
        },
        {
            location: new window.google.maps.LatLng(59.4231, 18.0711),
            weight: 4
        },
        {
            location: new window.google.maps.LatLng(59.2311, 18.1551),
            weight: 9
        },
        {
            location: new window.google.maps.LatLng(59.3735, 18.0182),
            weight: 10
        },
        {
            location: new window.google.maps.LatLng(59.3175, 18.0082),
            weight: 1
        },
        {
            location: new window.google.maps.LatLng(59.2693, 18.0244),
            weight: 7
        },
        {
            location: new window.google.maps.LatLng(59.2733, 18.1149),
            weight: 8
        },
        {
            location: new window.google.maps.LatLng(59.3262, 18.1574),
            weight: 2
        },
        {
            location: new window.google.maps.LatLng(59.2922, 17.9893),
            weight: 6
        },
        {
            location: new window.google.maps.LatLng(59.2651, 18.1547),
            weight: 5
        },
        {
            location: new window.google.maps.LatLng(59.3275, 18.0415),
            weight: 7
        },
        {
            location: new window.google.maps.LatLng(59.3347, 18.0817),
            weight: 9
        },
        {
            location: new window.google.maps.LatLng(59.2834, 18.0528),
            weight: 8
        },
        {
            location: new window.google.maps.LatLng(59.301, 18.0506),
            weight: 8
        },
        {
            location: new window.google.maps.LatLng(59.3753, 18.0284),
            weight: 9
        },
        {
            location: new window.google.maps.LatLng(59.4236, 18.0992),
            weight: 1
        },
        {
            location: new window.google.maps.LatLng(59.3136, 18.1044),
            weight: 2
        },
        {
            location: new window.google.maps.LatLng(59.3249, 18.103),
            weight: 6
        },
        {
            location: new window.google.maps.LatLng(59.3457, 18.0022),
            weight: 1
        },
        {
            location: new window.google.maps.LatLng(59.4237, 17.9926),
            weight: 8
        },
        {
            location: new window.google.maps.LatLng(59.4123, 18.0846),
            weight: 9
        },
        {
            location: new window.google.maps.LatLng(59.3074, 18.0037),
            weight: 9
        },
        {
            location: new window.google.maps.LatLng(59.3685, 18.0183),
            weight: 1
        },
        {
            location: new window.google.maps.LatLng(59.3368, 17.9837),
            weight: 5
        },
        {
            location: new window.google.maps.LatLng(59.4203, 18.1351),
            weight: 10
        },
        {
            location: new window.google.maps.LatLng(59.4279, 18.0516),
            weight: 10
        },
        {
            location: new window.google.maps.LatLng(59.372, 18.0268),
            weight: 8
        },
        {
            location: new window.google.maps.LatLng(59.3466, 18.0961),
            weight: 9
        },
        {
            location: new window.google.maps.LatLng(59.3532, 18.1545),
            weight: 4
        },
        {
            location: new window.google.maps.LatLng(59.3636, 18.137),
            weight: 4
        },
        {
            location: new window.google.maps.LatLng(59.2485, 17.9873),
            weight: 4
        },
        {
            location: new window.google.maps.LatLng(59.4007, 18.0726),
            weight: 1
        },
        {
            location: new window.google.maps.LatLng(59.3443, 18.1492),
            weight: 1
        },
        {
            location: new window.google.maps.LatLng(59.2624, 17.9893),
            weight: 8
        },
        {
            location: new window.google.maps.LatLng(59.2989, 18.0086),
            weight: 6
        },
        {
            location: new window.google.maps.LatLng(59.2556, 18.0261),
            weight: 4
        },
        {
            location: new window.google.maps.LatLng(59.3994, 18.1405),
            weight: 9
        },
        {
            location: new window.google.maps.LatLng(59.3902, 18.0301),
            weight: 9
        },
        {
            location: new window.google.maps.LatLng(59.392, 18.0752),
            weight: 8
        },
        {
            location: new window.google.maps.LatLng(59.4256, 18.1169),
            weight: 4
        },
        {
            location: new window.google.maps.LatLng(59.4256, 18.1169),
            weight: 4
        }
    ];
    var stockholm = new window.google.maps.LatLng(59.3293235, 18.0685808);
    map = new window.google.maps.Map(window.document.getElementById('map'), {
        center: stockholm,
        zoom: 13,
        mapTypeId: 'satellite'
    });
    var heatmap = new window.google.maps.visualization.HeatmapLayer({
        data: heatmapData
    });
    heatmap.setMap(map);
}