# GiraFFe Browse (WORK IN PROGRESS)
This project is based on my undergraduate final year project, where I built an online resource for a set of specific data.

The aim is to modify that project to be more generic, but enabling it to accept GFF3 files as the inputs, making it more accessible to a greater number of researchers. 

It is very much a work in progress, you can see the [roadmap here](https://trello.com/b/79lpU9wh/gff3web). The long term goal would be to turn this into a fully fledged online service that will allow for anyone to upload their data, and have the resource compiled for their specific needs. At this stage it is more of a pre-pre-alpha, so any feedback is greatly appreciated!

[You can see a demo version of the site here.](http://praxis.owen.cymru)

## Requirements
To use this tool, you either need to be running OS X or Linux and be able to use the command line to a basic level. If this isn't something you are able to do, you could ask your friendly sysadmin to run this on a server for you. 

The only other requirement is to have a GFF3 file and the accompanying FASTA file that was used to generate the GFF3. Make sure that your GFF3 file doesn't have the FASTA concatenated onto the end of the GFF3 records, and is in a separate file. 

In the data folder that is downloaded with the project there, are three datasets for your to try out. 

## Auto-magical install script
This script will completely (Fingers crossed) setup the project on OS X, Debian and Ubuntu. For other Linux Distros you need to install Nodejs and MongoDB yourself first. 

Navigate to a folder where you want the project live and then run this script:

    curl https://raw.githubusercontent.com/bag-man/giraffe-browse/master/install.sh > install.sh; chmod +x install.sh; ./install.sh

Once installed you need to run steps 6 & 7 (Documented below) yourself, as these are the import and running steps which you would want to do more frequently. 


## Full Manual Setup
### 1. Install Nodejs

For more detailed information on install Nodejs on other systems [see their install wiki page](https://nodejs.org/en/download/package-manager/).

#### OS X
    # Install Brew if you don't have it already
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

    # Install node
    brew install node

#### Ubuntu / Debian / Mint
    # Install node
    sudo apt-get install nodejs

### 2. Install MongoDB
[OS X install instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#install-mongodb-community-edition-with-homebrew)

[Linux install instructions](https://docs.mongodb.com/manual/administration/install-on-linux/#recommended)

### 3. Update node to 8.9.0 (LTS)
    sudo npm install -g nave 
    sudo nave usemain 8.9.0

### 4. Clone the application to your local machine
    git clone git@github.com:bag-man/giraffe-browse.git
    cd giraffe-browse

### 5. Install node packages, and build application
    npm install
    npm run build

### 6. Import your data set (This may take a few minutes if it is a large data set)
    FASTA=path/to/your/fasta/file.fa GFF=path/to/your/gff/file.gff npm run seed  

### 7. Start the server
    PORT=4444 npm run start

You will then be able to access the resource at http://localhost:4444

## Developer tools
This project is designed to be easy to work on so there are some extra scripts to help development

    # Build and launch the application
    npm run build
    npm start

    # Development Mode
    npm run watch

    # Run tests
    npm run test

    # Run linting
    npm run lint

## Contact
This project is created by Owen Garland (garland.owen@gmail.com), and supervised by Amanda Clare (afc@aber.ac.uk) and Wayne Aubrey (waa2@aber.ac.uk). 
