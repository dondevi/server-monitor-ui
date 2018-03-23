/**
 * =============================================================================
 *  Quasar Statment
 * =============================================================================
 *
 * @for quasar-framework@0.15.6
 *
 * @author dondevi
 * @create 2018-03-23
 */

const fs   = require("fs");
const path = require("path");

const quasarConfig  = require("../quasar.conf.js")();
const quasarSymlink = path.resolve(__dirname, "../node_modules/quasar-framework");
const quasarDir     = fs.realpathSync(quasarSymlink);


// Generate Quasar Import
function generateQuasarImport (type, theme = "mat", isStylus) {
  const folders = {};
  return quasarConfig.framework[type].map(name => {
    const dirname  = path.join(quasarDir, `src/${type}`);
    const filename = ("directives" === type ? toKebabCase(name) : name) + ".js";
    const filepath = findFileSync(dirname, filename);
    if (!filepath) {
      console.log(`Quasar: [Warn] ${type} Not Found:`, name);
      return "";
    }
    const moduleName = filepath.split(/node_modules[\/\\]/)[1].replace(/\\/g, "/");
    const folderName = moduleName.replace(`/${filename}`, "");
    if (!isStylus) {
      return `import ${name} from "${moduleName}";`;
    }
    if (!folders[folderName]) {
      folders[folderName] = true;
      return `@import "../node_modules/${folderName}/*.${theme}.styl";`;
    }
    return "";
  }).filter(statment => statment).join("\n");
}


// Generate file to /src
function generateQuasarFile (theme = "mat") {
  console.log("Quasar:", "Generating...");
  const quasarFilepath = path.resolve(__dirname, "../src/quasar.js");
  const quasarComment = `\
// Generated automatically by build/quasar.js
// ${new Date().toString()}
// Don't Edit please!
  `;
  const quasarStylus = `${quasarComment}
@import "../node_modules/quasar-framework/src/css/core.variables.styl";
@import "../node_modules/quasar-framework/src/css/variables.${theme}.styl";
@import "../node_modules/quasar-framework/src/css/normalize.styl";
// @import "../node_modules/quasar-framework/src/components/*/*.${theme}.styl";
${generateQuasarImport("components", theme, true)}
@import "../node_modules/quasar-framework/src/css/core/*.styl";
// @import "../node_modules/quasar-framework/src/ie-compat/ie.${theme}.styl";
  `;
  const quasarStatment = `${quasarComment}
// import "quasar-extras/roboto-font";
import "quasar-extras/material-icons";

// import "quasar-framework/dist/umd/quasar.${theme}.css";
import "./quasar.styl";

import install from "quasar-framework/src/install.js";
import icons from "quasar-framework/src/icons.js";

${generateQuasarImport("components", theme)}
${generateQuasarImport("directives", theme)}

export const Quasar = { install, icons };
export const QuasarComponents = { ${quasarConfig.framework.components.join(", ")} };
export const QuasarDirectives = { ${quasarConfig.framework.directives.join(", ")} };
  `;
  fs.writeFileSync(quasarFilepath.replace(/js$/, "styl"), quasarStylus);
  fs.writeFileSync(quasarFilepath, quasarStatment);
  console.log("Quasar:", "Success to generate /src/quasar.js", "\n");
  return quasarFilepath;
}


module.exports = generateQuasarFile;





/**
 * Get file's path by name from directory
 * @param  {String} dirname  - directory path
 * @param  {String} filename - file name
 * @return {String}          - file path
 */
function findFileSync (dirname, filename) {
  if (!fs.existsSync(dirname)) {
    return console.log("[Warn] Directory Not Exist:", dirname);
  }
  const files = fs.readdirSync(dirname);
  const targetpath = path.join(dirname, filename);
  for (let i = 0, file; file = files[i]; i++) {
    let filepath = path.join(dirname, file);
    let filestat = fs.lstatSync(filepath);
    if (filestat.isDirectory()) {
      filepath = findFileSync(filepath, filename);
      if (filepath) { return filepath; }
    } else if (filepath === targetpath) {
      return filepath;
    }
  }
}

/**
 * Format CamelCase to kebab-case
 * @param  {String} string
 * @return {String}
 */
function toKebabCase (string) {
  return string.replace(/[A-Z]/g, (match, index) => {
    return (index ? "-" : "") + match.toLowerCase();
  });
}
