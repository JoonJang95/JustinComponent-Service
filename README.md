# NoiseCloud

A music streaming platform for users to enjoy their favorite songs

## Quick Note
I took on a legacy codebase for a music streaming application that originally held 1000 datasets and scaled the backend to host 42 million datasets. I also containerized the application using Docker to standardize the environment and deployed to Amazon’s EC2 t2.micro instances while maintaining fast response times and performance.

## Related Projects
  
  - https://github.com/DemocritusCloud/RelatedTracksUI-Service (Legacy codebase for this project)
  - https://github.com/DemocritusCloud/Jane_MusicPlayer_Component
  - https://github.com/DemocritusCloud/siege211Component-Service
  - https://github.com/DemocritusCloud/songsinfo-module

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)

## Usage

if initial run:

  - run 'npm install'
  - start PostgreSQL server
  - run 'sdc2csvGen'
  - *COPY CSV files into database*
  - run 'sdc2postSeed'

server start script is 'start'
react/webpack start script is 'build'

home url path is 'localhost:9000'

## Requirements

- Node 10.13.0
- PostgreSQL/Sequelize
- Docker 18.09.2
- React

