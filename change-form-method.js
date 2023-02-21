// command: 'npm install glob fs-extra' need to be run 
// in terminal before script execution

const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');

// edit rootFolder variable before running a script -> use forward slashes ('/') instead of backslashes ('\') 
const rootFolder = 'absolute path to app root folder'
// script avoids these folders
const ignore = ['node_modules/**', '.vscode/**', '.angular/**'];

const oldMethodName = /this\.(\w+)\.controls\[['"](\w+)['"]\]/g;
const newMethodName = "this.$1.get('$2')";

glob('**/*.{ts, html}', {cwd: rootFolder, ignore}, (err, files) => {
  if (err) throw err;

  console.log('You chose ', rootFolder, 'as root directory.')

  files.forEach(file => {
    const filePath = path.join(rootFolder, file);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) throw err;
      const updatedData = data.replace(oldMethodName, newMethodName);
      fs.writeFile(filePath, updatedData, 'utf8')
        .then(() => {
          console.log(`Changed method name in file: ${filePath}`);
        })
        .catch(err => {
          throw err;
        });
    });
  });
});
