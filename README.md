# Score Companion
Don't Panic! CS Hackathon, January 2021

### What is Score Companion?
Score Companion is a tool to help research composers and musical works, find works relevant to your interests, and provide resources for listening to the works (as well as locating the cooresponding sheet music).

### Technology
Score Companion is built with React (specifically, Next.js). Server-side components are implementing using Next.js' API Routes, which are essentially an easy way of writing serverless funtions in Node.js/Express. Score Companion implements both the [Open Opus](https://openopus.org/) and [Wikipedia](https://www.mediawiki.org/wiki/API:Main_page) APIs.

### Usage
Score Companion can be used in two ways:
  1. Navigate to the "Composers" tab, find a composer you are interested in, and click on one of the composer's genres to be taken to a customized search with those parameters.
  2. Navigate to the "Search" tab and enter parameters to find works. (Note: In this iteration of Score Companion, specifying a composer is required)
