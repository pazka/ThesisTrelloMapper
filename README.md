# Thesis Trello Mapper

Website that allow for a display of an specific trello agile kanban, to be displayed in a map with the goolgle map api. The goal is to have an explorative, intercative Logbook for the thesis logging of the Artist Alessia Sanna


## TODO 

- [X] Use Google Map API
- [X] Use Custom Map Style
- [X] Use Custom Markers 
- [ ] Use Custom Markers Imported from trello
  - [X] Redact rules of conversion with the artist 
  - [ ] -- map rules to google Map
- [ ] -- Have a menu that displays those markers (menu must include a filter tool on the lists)
- [ ] Generate a legend for the map from trello labels data (with color)
- [ ] Optional : create itinerary from tasks from the same list
- [X] Tool to import the latest trello (will use Trello Atlassian API)

## Rules of mapping from Trello to Maps

- Marker Position = POS Tag in the description or random
- Marker Color = Label color dsplayed in concentric cirlcle around the marker
- Urgent Label = specific maker PNG
- Marker Title = Card Title
- Marker Description = Card Description 
- Card TODO = List with crossed items in Marker descirption
- Card Last Update Date = Small date ate top of marker
- Navigation Menu Lists = Trello Lists
- Card Label give sorting order in the Navigation Menu
- Cards label give balls color
- Card Cover = Marker cover