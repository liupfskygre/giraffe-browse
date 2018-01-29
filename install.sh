echo "GiraFFe Browse installer"
echo
echo "*** This script requires sudo priveledges to work ***"

if [[ "$OSTYPE" =~ ^darwin ]]; then
  echo
  echo "Using OS X config..."

  if [[ -z `command -v brew` ]]; then
    echo
    echo "Installing brew..."
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  fi
  
  if [[ -z `command -v node` ]]; then
    echo
    echo "Installing Nodejs..."
    brew install node
  fi

  if [[ -z `command -v git` ]]; then
    echo
    echo "Installing git..."
    brew install git
  fi

  if [[ -z `command -v mongod` ]]; then
    echo
    echo "Installing MongoDB..."
    brew install mongodb
    sudo mkdir -p /data/db
    brew services start mongodb
  fi
elif [[ -z `command -v apt-get` ]]; then
  if [[ -z `command -v mongod` ]]; then
    echo
    echo "Mongo not found, this script can't install on this OS, do it yourself, then run the script again: https://docs.mongodb.com/manual/administration/install-on-linux/#recommended"
    exit
  fi
  if [[ -z `command -v node` ]]; then
    echo
    echo "Nodejs not found, this script can't install on this OS, do it yourself, then run the script again: https://nodejs.org/en/download/package-manager/"
    exit
  fi
else
  if [[ -z `command -v node` ]]; then
    echo
    echo "Installing Nodejs..."
    sudo apt-get install nodejs
  fi

  if [[ -z `command -v git` ]]; then
    echo
    echo "Installing git..."
    sudo apt-get install git
  fi

  if [[ -z `command -v mongod` ]]; then
    echo
    echo "Installing MongoDB..."
    sudo apt-get install mongodb
    sudo systemctl enable mongodb
    sudo systemctl start mongodb
  fi
fi

if [[ -z `command -v nave` ]]; then
  echo
  echo "Installing nave..."
  sudo npm install -g nave
fi

echo
echo "Setting node version..."
sudo nave usemain 8.9.0

echo
echo "Cloning project"
git clone git@github.com:bag-man/giraffe-browse.git
cd giraffe-browse

echo
echo "Installing packages & building project..."
npm install 
npm run build

echo "In the giraffe-browse directory, import your data with: "
echo "FASTA=path/to/your/fasta/file.fa GFF=path/to/your/gff/file.gff npm run seed"
echo
echo "Then start the application with:"
echo "PORT=3000 npm run start"
echo
echo "Then visit http://localhost:3000 to access your data"
