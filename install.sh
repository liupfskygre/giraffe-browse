if [[ "$OSTYPE" =~ ^darwin ]]; then
  echo "Using OS X config"

  if [[ -z `command -v brew` ]]; then
    echo "Installing brew"
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  fi
  
  if [[ -z `command -v node` ]]; then
    echo "Installing Nodejs"
    brew install node
  fi

  if [[ -z `command -v git` ]]; then
    echo "Installing git"
    brew install git
  fi

  if [[ -z `command -v mongod` ]]; then
    echo "Installing MongoDB"
    brew install mongodb
    sudo mkdir -p /data/db
    brew services start mongodb
  fi
else
  echo "Using Linux Config"   
  if [[ -z `command -v apt-get` ]]; then
    echo "This script doesn't work outside of debian based distributions. Check the README for detailed instructions on how to install on your OS."
  fi

  if [[ -z `command -v node` ]]; then
    echo "Installing Nodejs"
    sudo apt-get install nodejs
  fi

  if [[ -z `command -v git` ]]; then
    echo "Installing git"
    sudo apt-get install git
  fi

  if [[ -z `command -v mongod` ]]; then
    echo "Installing MongoDB"
    sudo apt-get install mongodb
    sudo systemctl enable mongodb
    sudo systemctl start mongodb
  fi
fi

if [[ -z `command -v nave` ]]; then
  echo "Installing nave"
  sudo npm install -g nave
fi

echo "Setting node version"
sudo nave usemain 8.9.0

echo "Cloning project"
git clone git@github.com:bag-man/giraffe-browse.git
cd giraffe-browse

echo "Installing packages & building project"
npm install 
npm run build

echo "In the giraffe-browse directory, import your data with: "
echo "FASTA=path/to/your/fasta/file.fa GFF=path/to/your/gff/file.gff npm run seed"
echo
echo "Then start the application with:"
echo "PORT=3000 npm run start"
echo
echo "Then visit http://localhost:3000 to access your data"
