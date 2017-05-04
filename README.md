# Building an online resource for Candida Tropicalis

[![Build Status](https://travis-ci.com/bag-man/final-year-project.svg?token=gr5Kv7LRnKCzUp9adeKC&branch=master)](https://travis-ci.com/bag-man/final-year-project)
[![Codecov](https://codecov.io/gh/bag-man/final-year-project/branch/master/graph/badge.svg?token=GuPuQcHhdX)](https://codecov.io/gh/bag-man/final-year-project)
[![Waffle.io](https://img.shields.io/badge/Waffle%20Board-active-green.svg)](https://waffle.io/bag-man/final-year-project)
[![Demo](https://img.shields.io/badge/Demo-live-green.svg)](http://project.owen.cymru)


This project is based around a set of genomic data for three species of species of yeast that had been sequenced and annotated. This data is private and not included in the open source version of this repository. 

To get the application running, you need to install NodeJS via your package manager, so you have access to npm.

### Setup


    sudo npm install -g nave yarn m
    sudo nave usemain 6.9.0
    sudo m 3.4.4 # May require edit to mongodb service file to use /usr/local/bin/mongod.
    sudo systemctl restart mongodb 
    yarn install # From project root
   

### NPM utilities
    # Import genomic data to MongoDB
    npm run seed

    # Build and launch the application
    npm run build
    npm start

    # Development Mode
    npm run watch

    # Run tests
    npm run test
