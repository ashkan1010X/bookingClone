const provinceToCities = {
  Ontario: [
    "Aurora", "Barrie", "Brampton", "Guelph", "Hamilton",
    "Kingston", "Kitchener", "London", "Markham", "Mississauga",
    "Newmarket", "Niagara Falls", "Ottawa", "Peterborough",
    "Richmond Hill", "Sault Ste. Marie", "St. Catharines", "Sudbury",
    "Thunder Bay", "Toronto", "Vaughan", "Waterloo", "Whitby",
    "Windsor",
  ],
  Quebec: [
    "Blainville", "Brossard", "Chicoutimi", "Drummondville", "Gatineau",
    "Granby", "Laval", "Longueuil", "Montreal", "Quebec City",
    "Repentigny", "Saint-Jean-sur-Richelieu", "Saint-Jérôme", "Sherbrooke",
    "Shawinigan", "Terrebonne", "Trois-Rivières",
  ],
  "British Columbia": [
    "Abbotsford", "Burnaby", "Chilliwack", "Coquitlam", "Courtenay",
    "Kamloops", "Kelowna", "Langley", "Maple Ridge", "Nanaimo",
    "New Westminster", "North Vancouver", "Penticton", "Prince George",
    "Richmond", "Surrey", "Vancouver", "Vernon", "Victoria",
  ],
  Alberta: [
    "Airdrie", "Brooks", "Calgary", "Camrose", "Chestermere",
    "Edmonton", "Fort McMurray", "Grande Prairie", "Leduc",
    "Lethbridge", "Lloydminster", "Medicine Hat", "Okotoks",
    "Red Deer", "Sherwood Park", "Spruce Grove", "St. Albert",
    "Wetaskiwin",
  ],
  "Nova Scotia": [
    "Amherst", "Antigonish", "Bedford", "Bridgewater", "Dartmouth",
    "Digby", "Halifax", "Kentville", "Liverpool", "New Glasgow",
    "Pictou", "Shelburne", "Sydney", "Truro", "Wolfville",
    "Windsor", "Yarmouth",
  ],
  Manitoba: [
    "Altona", "Beausejour", "Brandon", "Dauphin", "Flin Flon",
    "Morden", "Niverville", "Portage la Prairie", "Selkirk",
    "Steinbach", "Stonewall", "Swan River", "The Pas",
    "Thompson", "Winkler", "Winnipeg",
  ],
  Saskatchewan: [
    "Estevan", "Humboldt", "Kindersley", "Martensville", "Meadow Lake",
    "Melfort", "Melville", "Moose Jaw", "North Battleford",
    "Prince Albert", "Regina", "Saskatoon", "Swift Current",
    "Tisdale", "Weyburn", "Yorkton",
  ],
  "New Brunswick": [
    "Bathurst", "Bouctouche", "Campbellton", "Caraquet", "Dalhousie",
    "Dieppe", "Edmundston", "Fredericton", "Grand Falls", "Miramichi",
    "Moncton", "Oromocto", "Quispamsis", "Rothesay", "Sackville",
    "Shediac", "Saint John",
  ],
  "Newfoundland and Labrador": [
    "Bay Roberts", "Carbonear", "Channel-Port aux Basques", "Clarenville",
    "Conception Bay South", "Corner Brook", "Deer Lake",
    "Gander", "Grand Falls-Windsor", "Happy Valley-Goose Bay",
    "Labrador City", "Marystown", "Mount Pearl", "Paradise",
    "St. John's", "Stephenville",
  ],
  "Prince Edward Island": [
    "Alberton", "Borden-Carleton", "Charlottetown", "Cornwall",
    "Crapaud", "Georgetown", "Hunter River", "Kensington",
    "Montague", "Murray River", "North Rustico", "O'Leary",
    "Souris", "Stratford", "Summerside", "Tignish", "Victoria",
  ],
};

export default provinceToCities;
