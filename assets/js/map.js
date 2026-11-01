// Maps for the site, built with Leaflet.
//
// Any element with data-map="main" becomes the main map: all rights of way,
// all project areas and markers, with a searchable project list.
// Any element with data-map="project" data-project="<id>" becomes a map of
// one project, zoomed to its area and markers.
//
// Settings come from the #map-config JSON block (see _includes/map-assets.html),
// which is filled in from the content folder's _data/site.yml and _data/markers.yml.

(function () {
  "use strict";

  var config = JSON.parse(document.getElementById("map-config").textContent);

  var RIGHTS_OF_WAY = [
    { type: "Footpath", label: "Footpaths", color: "#b3261e", dashArray: "4 4" },
    { type: "Bridleway", label: "Bridleways", color: "#1d5fa8", dashArray: "10 6" },
    { type: "Restricted Byway", label: "Restricted byways", color: "#7b3fa0", dashArray: "2 5" },
    { type: "Byway", label: "Byways open to all traffic", color: "#a14f00", dashArray: null }
  ];

  var AREA_STYLE = {
    current: { color: "#1f4a2b", weight: 3, fillColor: "#2f6b3f", fillOpacity: 0.35 },
    archived: { color: "#4d4d4d", weight: 3, dashArray: "6 4", fillColor: "#6b6b6b", fillOpacity: 0.25 }
  };

  // Fetch each file once, however many maps need it.
  var cache = {};
  function getJSON(url) {
    if (!cache[url]) {
      cache[url] = fetch(url).then(function (response) {
        if (!response.ok) throw new Error("Could not load " + url);
        return response.json();
      });
    }
    return cache[url];
  }

  // Links in content start with "/"; add the site's base address if it has one.
  function siteUrl(url) {
    if (!url || url.charAt(0) !== "/" || !config.baseurl) return url;
    return url.indexOf(config.baseurl + "/") === 0 ? url : config.baseurl + url;
  }

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text == null ? "" : String(text);
    return div.innerHTML;
  }

  function createMap(element, options) {
    var map = L.map(element, {
      renderer: L.canvas({ tolerance: 6 }),
      scrollWheelZoom: options.scrollWheelZoom
    }).setView(config.centre, config.zoom);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    if (config.rightsOfWayAttribution) {
      map.attributionControl.addAttribution(config.rightsOfWayAttribution);
    }
    return map;
  }

  // Lines are thinner and fainter when zoomed out, so project areas stand out.
  function rightOfWayStyle(row, zoom) {
    var near = zoom >= 13;
    return {
      color: row.color,
      weight: near ? 3 : zoom >= 11 ? 2 : 1,
      opacity: near ? 0.9 : 0.6,
      dashArray: zoom >= 12 ? row.dashArray : null
    };
  }

  // Returns a promise of { label: layer } for each type of right of way.
  function loadRightsOfWay(map) {
    if (!config.rightsOfWay) return Promise.resolve({});
    return getJSON(config.rightsOfWay).then(function (data) {
      var layers = {};
      RIGHTS_OF_WAY.forEach(function (row) {
        layers[row.label] = L.geoJSON(data, {
          filter: function (feature) { return feature.properties.type === row.type; },
          style: rightOfWayStyle(row, map.getZoom()),
          onEachFeature: function (feature, layer) {
            var p = feature.properties;
            layer.bindPopup(
              "<strong>" + escapeHtml(p.type + " " + p.number) + "</strong><br>" +
              escapeHtml(p.parish) + " parish, " + escapeHtml(p.district)
            );
          }
        }).addTo(map);
      });
      map.on("zoomend", function () {
        RIGHTS_OF_WAY.forEach(function (row) {
          layers[row.label].setStyle(rightOfWayStyle(row, map.getZoom()));
        });
      });
      return layers;
    });
  }

  function markerPopup(marker) {
    var html = "<strong>" + escapeHtml(marker.name) + "</strong>";
    if (marker.description) html += "<br>" + escapeHtml(marker.description);
    if (marker.link) html += '<br><a href="' + escapeHtml(siteUrl(marker.link)) + '">More information</a>';
    return html;
  }

  function projectPopup(project) {
    return "<strong>" + escapeHtml(project.title) + "</strong>" +
      (project.status === "archived" ? " (completed)" : "") +
      (project.summary ? "<br>" + escapeHtml(project.summary) : "") +
      '<br><a href="' + escapeHtml(project.url) + '">View project</a>';
  }

  // Returns a promise of a layer group holding a project's area and markers.
  function loadProject(project) {
    var group = L.featureGroup();
    var popup = projectPopup(project);

    (project.markers || []).forEach(function (m) {
      L.marker([m.lat, m.lng], { title: m.name, alt: m.name })
        .bindPopup(markerPopup(m) + '<br><span class="small">Part of ' + escapeHtml(project.title) + "</span>")
        .addTo(group);
    });

    if (!project.area) return Promise.resolve(group);

    return getJSON(project.area).then(function (area) {
      L.geoJSON(area, {
        style: AREA_STYLE[project.status] || AREA_STYLE.current,
        pointToLayer: function (feature, latlng) { return L.marker(latlng, { title: project.title }); }
      }).bindPopup(popup).addTo(group);
      return group;
    }).catch(function () { return group; });
  }

  // Keeps project areas drawn above the rights of way, so they can be clicked.
  function bringToFront(groups) {
    groups.forEach(function (group) {
      group.eachLayer(function (layer) { if (layer.bringToFront) layer.bringToFront(); });
    });
  }

  function initMainMap(element) {
    var map = createMap(element, { scrollWheelZoom: true });
    var active = L.layerGroup().addTo(map);
    var completed = L.layerGroup().addTo(map);
    var general = L.layerGroup().addTo(map);
    var projectGroups = {};

    config.markers.forEach(function (m) {
      L.marker([m.lat, m.lng], { title: m.name, alt: m.name }).bindPopup(markerPopup(m)).addTo(general);
    });

    var rightsOfWay = loadRightsOfWay(map);
    var projects = getJSON(config.projects).then(function (list) {
      return Promise.all(list.map(function (project) {
        return loadProject(project).then(function (group) {
          projectGroups[project.id] = group;
          group.addTo(project.status === "archived" ? completed : active);
        });
      }));
    });

    Promise.all([rightsOfWay, projects]).then(function (results) {
      var overlays = Object.assign({}, results[0], {
        "Active projects": active,
        "Completed projects": completed,
        "Other places": general
      });
      L.control.layers(null, overlays, { collapsed: true }).addTo(map);
      bringToFront(Object.keys(projectGroups).map(function (id) { return projectGroups[id]; }));
      enableProjectList(map, projectGroups);
    }).catch(function (error) {
      element.insertAdjacentHTML("afterend", '<p class="error">Sorry, some map data could not be loaded.</p>');
      console.error(error);
    });
  }

  // Search box and "Show on map" buttons next to the main map.
  function enableProjectList(map, projectGroups) {
    var input = document.getElementById("project-search");
    var list = document.getElementById("project-list");
    var count = document.getElementById("project-count");
    if (!input || !list) return;

    list.querySelectorAll("[data-show-project]").forEach(function (button) {
      var group = projectGroups[button.dataset.showProject];
      if (!group || group.getLayers().length === 0) return;
      button.hidden = false;
      button.addEventListener("click", function () {
        map.fitBounds(group.getBounds(), { padding: [30, 30], maxZoom: 15 });
        var first = group.getLayers()[0];
        if (first && first.openPopup) first.openPopup();
        map.getContainer().scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });

    input.addEventListener("input", function () {
      var query = input.value.trim().toLowerCase();
      var shown = 0;
      list.querySelectorAll("li").forEach(function (item) {
        var match = !query || item.dataset.search.indexOf(query) !== -1;
        item.hidden = !match;
        if (match) shown++;
      });
      count.textContent = shown + (shown === 1 ? " project" : " projects");
    });
  }

  function initProjectMap(element) {
    var map = createMap(element, { scrollWheelZoom: false });
    var rightsOfWay = loadRightsOfWay(map);
    getJSON(config.projects).then(function (list) {
      var project = list.find(function (p) { return p.id === element.dataset.project; });
      if (!project) return;
      return loadProject(project).then(function (group) {
        group.addTo(map);
        if (group.getLayers().length) {
          map.fitBounds(group.getBounds(), { padding: [30, 30], maxZoom: 15 });
        }
        return rightsOfWay.then(function () { bringToFront([group]); });
      });
    }).catch(function (error) { console.error(error); });
  }

  document.querySelectorAll('[data-map="main"]').forEach(initMainMap);
  document.querySelectorAll('[data-map="project"]').forEach(initProjectMap);
})();
