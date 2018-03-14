function getArg(name) {
  const arg = process.argv.slice(2).find(arg => arg.split('=')[0] === name);

  return arg.split('=')[1];
}

module.exports = getArg;
