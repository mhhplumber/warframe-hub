var repeatOnXAxis = false;

/*
 * Helper function which normalizes the coords so that tiles can repeat across the X-axis (horizontally) like the standard Google map tiles.
 * ----------------
 */

function getNormalizedCoord(coord, zoom) {
    if (!repeatOnXAxis) {
        return coord;
    }

    var y = coord.y;
    var x = coord.x;

    // tile range in one direction range is dependent on zoom level
    // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
    var tileRange = 1 << zoom;

    // don't repeat across Y-axis (vertically)
    if (y < 0 || y >= tileRange) {
        return null;
    }

    // repeat across X-axis
    if (x < 0 || x >= tileRange) {
        x = (x % tileRange + tileRange) % tileRange;
    }

    return {
        x: x,
        y: y
    };

}

// Adds predefined markers to the map
function addMarkers(map) {

    var homeIcon = {
        url: 'img/map_icons/home.png',
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    };

    var home = [
        ['Cetus', -42.68243539838622, 4.5703125, 'Travel gate back to town'],
    ];

    var fishIcon = {
        url: 'img/map_icons/fish.png',
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    };

    var fish = [
        ['Geyser Pond (Recommended)', -37.71859032558814, -21.09375, 'Pond'],
        ['Pond', -22.91792293614603, -20.2148, 'Pond'],
        ['Pond', -42.81152174509788, 41.83593, 'Pond'],
        ['Pond', 41.9022770409637, 7.55859375, 'Pond'],
        ['Pond', 69.2249968541159, -80.332031, 'Pond'],
        ['Pond', 23.885837699862, -41.8359375, 'Pond'],
        ['Pond', 34.016241889667015, -31.9921, 'Pond'],
        ['Pond', -2.284550660236957, -32.3437, 'Pond'],
        ['Pond', -30.751277776257812, -51.679, 'Pond'],
        ['Pond', 56.656226493502224, -2.46093, 'Pond'],
        ['Pond', 53.54030739150022, 16.171875, 'Pond'],
        ['Pond', 40.17887331434696, -89.64843, 'Pond'],
        ['Pond', 49.72447918871298, 59.4140625, 'Pond'],
        ['Sea', -58.90464570301998, -76.2890, 'Sea'],
        ['Sea (Recommended)', -31.05293398570514, -101.953, 'Sea'],
        ['Sea (Recommended)', -43.58039085560784, -103.535, 'Sea'],
        ['Sea (Recommended)', -70.31873847853122, 63.98437, 'Sea'],
        ['Sea (Recommended)', -69.7789517764676, 91.230468, 'Sea'],
        ['Sentient Lake (Recommended)', -7.362466865535737, 18.984375, 'Lake'],
    ];

    var fishInfo = [
        ['Pond', 'Khut Khut (Day, Any Spear)<br>Yogwun (Day, Lanzo/Peram Spear)<br>Mortus Lungfish (Lanzo/Peram Spear)<br>Cuthol* (Night, Peram/Spear)<br><br><b>*Appropriate bait required</b><br>Please click on Fish Info for more'],
        ['Lake', 'Charc Eel (Lanzo Spear)<br>Mawfish (Day, Lanzo Spear)<br>Norg* (Peram Spear)<br><br><b>*Appropriate bait/spear required</b><br>Please click on Fish Info for more'],
        ['Sea', 'Goopola (Lanzo/Tulok Spear)<br>Karkina* (Lanzo, Tulok Spear)<br>Sharrac* (Lanzo/Tulok Spear)<br>Tralok (Day, Tulok Spear)<br>Murkray* (Lanzo Spear)<br>Glappid* (Night, Peram Spear)<br><br><b>*Appropriate bait required</b><br>Please click on Fish Info for more'],
    ];

    var caveIcon = {
        url: 'img/map_icons/caves.png',
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    };

    var cave = [
        ['Cave', -40.044437584608566, -24.785, ''],
        ['Cave', -52.16045455774704, -33.5742, ''],
        ['Cave', -38.95940879245421, -92.4609, ''],
        ['Cave', 12.211180191503997, -87.7148, ''],
        ['Cave', -31.353636941500987, -56.777, ''],
        ['Cave', -58.631216643424786, 56.4257, ''],
        ['Cave', -66.08936427047087, 91.23046, ''],
        ['Cave', 13.068776734357693, 85.07812, ''],
        ['Cave', 9.795677582829745, 58.183593, ''],
        ['Cave', 35.17380831799959, 78.222656, ''],
        ['Cave', 51.94426487902877, 62.578125, ''],
        ['Cave', 64.16810689799152, -50.97656, ''],
    ];

    var grineerIcon = {
        url: 'img/map_icons/grineer.png',
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    };

    var grineer = [
        ['Grineer Sea Spire Base', -35.7465122599185, -90.52734, ''],
        ['Grineer Excavation Site', -6.839169626342807, -17.5781, ''],
        ['Grineer Mountain Base', 64.01449619484472, -45.3515625, ''],
        ['Grineer Firepit Base', 65.94647177615738, 14.0625, ''],
        ['Grineer Radar Base', 37.85750715625203, 68.02734375, ''],
        ['Grineer East Outpost', -56.94497418085159, 65.21484375, ''],
    ];

    var oddityIcon = {
        url: 'img/map_icons/oddity.png',
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    };

    var oddity = [
        ['Thousand-Year Fish Statuette', -66.99884379185184, -43.2421875, 'Ostron Patios', 'https://streamable.com/s/imkze/aqrvus'],
        ['Thousand-Year Fish Statuette', -61.93895042666061, -67.67578125, 'Ostron Artisans', 'https://streamable.com/s/fwlz3/mmhx'],
        ['Thousand-Year Fish Statuette', -46.92025531537451, -87.36328125, 'Tools of Harvest', 'https://streamable.com/s/9suln/dqiksk'],
        ['Thousand-Year Fish Statuette', -28.613459424004418, -54.140625, 'Teralyst Eidolon', 'https://streamable.com/s/7hpw4/ugubxu'],
        ['Thousand-Year Fish Statuette', -37.300275281344305, -24.78515625, 'Scavenging Way of Life', 'https://streamable.com/s/ls3yx/grdkdy'],
        ['Thousand-Year Fish Statuette', -2.460181181020993, -11.6015625, 'Harvesting the Tower', 'https://streamable.com/s/rx638/zqqmio'],
        ['Thousand-Year Fish Statuette', -3.6888551431470353, 12.3046875, 'Plains of Eidolon', 'https://streamable.com/s/owhfk/zgbizh'],
        ['Thousand-Year Fish Statuette', -19.808054128088575, 74.1796875, 'The Unum', 'https://streamable.com/s/t70y1/tjtb'],
        ['Thousand-Year Fish Statuette', -69.90011762668539, 70.3125, 'Ancient History', 'https://streamable.com/s/7wh17/mvqccd'],
        ['Thousand-Year Fish Statuette', 0.5273363048115169, 66.09375, 'AMPs', 'https://streamable.com/s/134f8/urguld'],
        ['Thousand-Year Fish Statuette', 36.4566360115962, 74.1796875, 'Life in Cetus', 'https://streamable.com/s/e56co/ciezra'],
        ['Thousand-Year Fish Statuette', 59.265880628258095, 90.0, 'Cetus', 'https://streamable.com/s/q2rbe/hselqq'],
        ['Thousand-Year Fish Statuette', 58.53959476664049, 25.48828125, 'The Quills of Cetus', 'https://streamable.com/s/heep2/sigajm'],
        ['Thousand-Year Fish Statuette', 68.84766505841037, 12.65625, 'Plains Animals', 'https://streamable.com/s/0xrdm/hgpwmm'],
        ['Thousand-Year Fish Statuette', 61.01572481397616, -14.0625, 'The Tower\'s Flesh', 'https://streamable.com/s/rxt9k/uxtwwc'],
        ['Thousand-Year Fish Statuette', 65.44000165965534, -47.63671875, 'Grineer Excavations', 'https://streamable.com/s/g1s5o/xdopkb'],
        ['Thousand-Year Fish Statuette', 65.73062649311031, -68.37890625, 'Merchants of Cetus', 'https://streamable.com/s/eiuln/zvrckw'],
        ['Thousand-Year Fish Statuette', 41.11246878918088, -79.62890625, 'Remnants of Orokin', 'https://streamable.com/s/7wsr4/mtfdry'],
        ['Thousand-Year Fish Statuette', 11.350796722383672, -90.52734375, 'The Grineer Tusks', 'https://streamable.com/s/ftpm0/kazyif'],
        ['Thousand-Year Fish Statuette', 35.31736632923788, -39.90234375, 'The Ostrons', 'https://streamable.com/s/o5xjy/dlqkcm'],
    ];

    var lureIcon = {
        url: 'img/map_icons/lure.png',
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    };

    var lure = [
        ['Eidolon Lure X2', 65.73062649311031, -51.6796875],
        ['Eidolon Lure X2', 66.93006025862448, 9.4921875],
        ['Eidolon Lure X2', 39.232253141714885, 71.71875],
        ['Eidolon Lure X2', -2.811371193331128, -15.46875],
        ['Eidolon Lure X2', -57.98480801923985, 60.64453125],
        ['Eidolon Lure', 53.852526600449515, -37.08984375],
        ['Eidolon Lure', 58.53959476664049, 21.26953125],
        ['Eidolon Lure', 38.54816542304656, -82.96875],
        ['Eidolon Lure', 31.353636941500987, -60.46875],
        ['Eidolon Lure', 31.95216223802497, -15.8203125],
        ['Eidolon Lure', 36.87962060502676, 14.94140625],
        ['Eidolon Lure', 48.2246726495652, 74.53125],
        ['Eidolon Lure', 37.579412513438385, 79.1015625],
        ['Eidolon Lure', 9.622414142924805, -63.984375],
        ['Eidolon Lure', 5.441022303717974, 4.5703125],
        ['Eidolon Lure', -20.96143961409684, -28.65234375],
        ['Eidolon Lure', -21.616579336740593, 50.44921875],
        ['Eidolon Lure', -35.603718740697296, -49.04296875],
        ['Eidolon Lure', -37.439974052270564, -17.05078125],
        ['Eidolon Lure', -37.439974052270564, -85.078125],
        ['Eidolon Lure', -57.797943884982736, -65.56640625],
        ['Eidolon Lure', -53.95608553098789, -35.859375],
    ];

    var infowindow = new google.maps.InfoWindow();

    // Home icon loop
    for (var i = 0; i < home.length; i++) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(home[i][1], home[i][2]),
            map: map,
            icon: homeIcon,
            title: home[i][0],
            optimized: false
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent('<h6>' + home[i][0] + '</h6>' + home[i][3]);
                infowindow.open(map, marker);
            };
        })(marker, i));
    }

    // Fish icon loop
    for (var i = 0; i < fish.length; i++) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(fish[i][1], fish[i][2]),
            map: map,
            icon: fishIcon,
            title: fish[i][0],
            optimized: false
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                if (fish[i][3] === 'Pond') {
                    infowindow.setContent('<h6>' + fish[i][0] + '</h6>' + fishInfo[0][1]);
                } else if (fish[i][3] === 'Lake') {
                    infowindow.setContent('<h6>' + fish[i][0] + '</h6>' + fishInfo[1][1]);
                } else {
                    infowindow.setContent('<h6>' + fish[i][0] + '</h6>' + fishInfo[2][1]);
                }
                infowindow.open(map, marker);
            }
        })(marker, i));
    }

    // Cave icon loop
    for (var i = 0; i < cave.length; i++) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(cave[i][1], cave[i][2]),
            map: map,
            icon: caveIcon,
            title: cave[i][0],
            optimized: false
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent('<h6>' + cave[i][0] + '</h6>' + cave[i][3]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }

    // Grineer icon loop
    for (var i = 0; i < grineer.length; i++) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(grineer[i][1], grineer[i][2]),
            map: map,
            icon: grineerIcon,
            title: grineer[i][0],
            optimized: false
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent('<h6>' + grineer[i][0] + '</h6>' + grineer[i][3]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }

    // Oddity icon loop
    for (var i = 0; i < oddity.length; i++) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(oddity[i][1], oddity[i][2]),
            map: map,
            icon: oddityIcon,
            title: oddity[i][0],
            optimized: false
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent('<h6>' + oddity[i][0] + '</h6>Fragment Name: <b>' + oddity[i][3] + '</b><br><br>' +
                    '<iframe src="' + oddity[i][4] + '" width="320" height="180" frameborder="0" allowfullscreen></iframe>'
                );
                infowindow.open(map, marker);
            }
        })(marker, i));
    }

    // Lure icon loop
    for (var i = 0; i < lure.length; i++) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lure[i][1], lure[i][2]),
            map: map,
            icon: lureIcon,
            title: lure[i][0],
            optimized: false
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent('<h6>' + lure[i][0] + '</h6><br><br>' +
                    '<img src="img/luredrone.png" /><br>Note: Spawn location not exact,<br>drone spawn not guaranteed');
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}


/*
 * Main Core
 * ----------------
 */

window.onload = function () {

    function checkBounds() {

        var allowedBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(-65.0, -80.0),
            new google.maps.LatLng(65.0, 80.0));

        if (allowedBounds.contains(map.getCenter())) {
            return;
        }

        var mapCenter = map.getCenter();
        var X = mapCenter.lng();
        var Y = mapCenter.lat();

        var AmaxX = allowedBounds.getNorthEast().lng();
        var AmaxY = allowedBounds.getNorthEast().lat();
        var AminX = allowedBounds.getSouthWest().lng();
        var AminY = allowedBounds.getSouthWest().lat();

        if (X < AminX) {
            X = AminX;
        }
        if (X > AmaxX) {
            X = AmaxX;
        }
        if (Y < AminY) {
            Y = AminY;
        }
        if (Y > AmaxY) {
            Y = AmaxY;
        }

        map.setCenter(new google.maps.LatLng(Y, X));
    }

    // Define our custom map type
    var customMapType = new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
            var normalizedCoord = getNormalizedCoord(coord, zoom);
            if (normalizedCoord && (normalizedCoord.x < Math.pow(2, zoom)) && (normalizedCoord.x > -1) && (normalizedCoord.y < Math.pow(2, zoom)) && (normalizedCoord.y > -1)) {
                return 'img/plains/' + zoom + '_' + normalizedCoord.x + '_' + normalizedCoord.y + '.jpg';
            } else {
                return 'img/plains/empty.jpg';
            }
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 5,
        name: 'Plains of Eidolon'
    });

    // Basic options for our map
    var myOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 3,
        minZoom: 3,
        streetViewControl: false,
        mapTypeControl: false,
        mapTypeControlOptions: {
            mapTypeIds: ['custom']
        }
    };

    // Init the map and hook our custom map type to it
    var map = new google.maps.Map(document.getElementById('map'), myOptions);

    // This event listener when the map is clicked, output lat and lon to console
    google.maps.event.addListener(map, 'click', function (event) {
        console.log(JSON.stringify(event.latLng));
    });

    google.maps.event.addListener(map, 'center_changed', function () {
        checkBounds();
    });

    addMarkers(map);

    map.mapTypes.set('custom', customMapType);
    map.setMapTypeId('custom');

}