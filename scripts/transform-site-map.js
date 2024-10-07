const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../dist/server/app/sitemap');
const targetDir = path.join(__dirname, '../dist/server/pages/sitemap');
const appDir = path.join(__dirname, '../dist/server/app');

// Function to copy folder recursively
function copyFolderSync(from, to) {
    fs.mkdirSync(to, { recursive: true });
    fs.readdirSync(from).forEach(element => {
        const fromPath = path.join(from, element);
        const toPath = path.join(to, element);
        if (fs.lstatSync(fromPath).isFile()) {
            fs.copyFileSync(fromPath, toPath);
        } else {
            copyFolderSync(fromPath, toPath);
        }
    });
}

// Function to remove folder recursively
function removeFolderSync(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach((file) => {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                removeFolderSync(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(folderPath);
    }
}

// Copy sitemap folder
copyFolderSync(sourceDir, targetDir);

// Remove app folder
removeFolderSync(appDir);

console.log('Transformation sitemap completed.');