const glob     = require('glob');
const { join } = require('path');
const argv     = require('yargs').argv;

const BASE_DIR             = process.cwd();
const NODE_MODULES_DIR     = join(BASE_DIR, 'node_modules');
const SRC_DIR              = join(BASE_DIR, 'src');
const OUT_DIR              = join(BASE_DIR, 'out');
const DIST_DIR             = join(BASE_DIR, 'dist');
const MONO_PKG_FILE_PATH   = join(OUT_DIR, 'package.json');
const OUT_NODE_MODULES_DIR = join(OUT_DIR, 'node_modules');
const INTEGRATIONS_DIR     = join(BASE_DIR, 'integrations');
const GREP                 = argv.grep;

const PACKAGE_FILE_PATHS = glob.sync(join(SRC_DIR, '**', 'package.json'));
const PACKAGES           = PACKAGE_FILE_PATHS.map((path) => {
  const pkg = require(path);
  pkg.path = path;
  return pkg;
});
const PACKAGE_NAMES      = PACKAGES.map(({name}) => name).filter((name) => !!name);

const HARD = process.env.HARD;

// argvDIST_DIR
const WATCH = argv.watch;

module.exports = {
  HARD,
  argv,
  WATCH,
  GREP,
  BASE_DIR,
  SRC_DIR,
  OUT_DIR,
  DIST_DIR,
  PACKAGES,
  PACKAGE_NAMES,
  INTEGRATIONS_DIR,
  NODE_MODULES_DIR,
  MONO_PKG_FILE_PATH,
  PACKAGE_FILE_PATHS,
  OUT_NODE_MODULES_DIR,
};
