# Tunisia election data

Created to collect, open, visualize, and analyze election-related data on an ongoing basis – is a project implemented by [Mourakiboun](http://www.mourakiboun.org) with support from [Democracy International](http://democracyinternational.com) and technical assistance from [Development Seed](http://developmentseed.org).

The goal of Tunisia Election Data is to present a range of stakeholders (electoral officials, political parties, civil society organizations, media, citizens, etc.) with comprehensive information about the electoral process to enable them to make informed decisions that lead to better outcomes.

Mourakiboun aims to achieve this goal by:

*   Creating a centralized hub of election-related data, maps, and analysis that facilitate data-driven decision-making to improve the electoral process
*   Presenting information in a highly accessible way so that stakeholders can measure progress and identify trends from one election cycle to the next
*   Providing a meaningful lens through which electoral developments or election observation findings can be contextualized and understood.

Tunisia Election Data builds on the efforts of [ogTN p004](https://www.facebook.com/groups/203289926423761/), a project initiated by OpenGovTN community volunteers following the October 23, 2011 National Constituent Assembly (NCA) elections. These volunteers wanted to “liberate” data that was published in protected formats on the website of the [Instance Superieure Independante pour les Elections](http://www.isie.tn/Ar/rsfinal.php) (ISIE). The 2011 NCA election data that was opened by ogTN p004 serves as the cornerstone of Tunisia Election Data. Mourakiboun oversees the project and has dedicated team members gathering election-related data throughout the upcoming elections that will be visualized on the platform.

The Tunisia Election Data browser’s reductionist design prioritizes efficiency over complexity with the aims of focusing the user on the story being told, keeping the site lightweight and optimizing user experience. The data browser is comprised of two main components: a landing page that showcases the mapping visualizations on the site, and content pages with mapping visualizations & corresponding descriptions. Each map page provides details about the visualization, the data source and links to the raw data, and the methodology for the maps’ creation.

Development Seed built the initial site that Mourakiboun and Democracy International have since customized to display a range of datasets and visualizations.

### About the Maps

All maps in Tunisia Election Data have been rendered using open-source [MapBox TileMill](https://www.mapbox.com/tilemill) software using publicly available data and can be freely incorporated into other projects. Shapefiles used for the district and delegation base layers were sourced from [Natural Earth Data](http://www.naturalearthdata.com), an open-source volunteer-driven mapping community.

### Install

Get a copy of this repository and install required dependencies
```
git clone https://github.com/fwelections/tunisiaelectiondata
npm install
```
the npm task will also install bower dependencies
```
npm start
```
Will start a local web server running at: http://localhost:8000/


### Open source

This project is built using open source tools and output from the follwing community projects

*   [Tilemill](https://www.mapbox.com/tilemill/) for maps design
*   html, javascript(AngularJS) and css for frontend
*   [OpengovTNP004](https://github.com/sami1/tnac_proto) Sami ben Romdhane
*   [OpengovTNP004](https://github.com/mtimet/tnelec) Mohamed Ali Mtimet
*   [OpengovTNP004](https://github.com/dadicool/OpenDataTN) Dali Kilani
*   [OpengovTNP004](https://github.com/dadicool/OpenDataTN) Karim Safraoui
