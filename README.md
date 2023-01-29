# Thesis Trello Mapper

Website that allow for a display of an specific trello agile kanban, to be displayed in a map with the goolgle map api. The goal is to have an explorative, intercative Logbook for the thesis logging of the Artist Alessia Sanna


## TODO 

- [X] Use Google Map API
- [X] Use Custom Map Style
- [X] Use Custom Markers 
- [x] Use Custom Markers Imported from trello
  - [X] Redact rules of conversion with the artist 
  - [x] map rules to google Map
- [x] Have a menu that displays those markers (menu must include a filter tool on the lists)
- [ ] Generate a legend for the map from trello labels data (with color)
- [ ] Optional : create itinerary from tasks from the same list
- [X] Tool to import the latest trello (will use Trello Atlassian API)

## Rules of mapping from Trello to Maps

- [ ] Marker Position = POS Tag in the description 
- [x] Marker position = random if no POS Tag
- [x] Marker Color = Label color displayed in concentric circle around the marker
- [X] Urgent Label = specific maker PNG
- [x] Marker Title = Card Title
- [x] Marker Description = Card Description 
- [X] Card TODO = List with crossed items in Marker description
- [ ] Card Last Update Date = Small date ate top of marker
- [x] Navigation Menu Lists = Trello Lists
- [ ] Card Label give sorting order in the Navigation Menu
- [x] Cards label give balls color
- [ ] Card Cover = Marker cover