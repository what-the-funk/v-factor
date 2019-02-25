import path from 'path';

// __dirname => {root}/packages/server/dist/config
const root = path.join(__dirname, '/../../../../');

const paths = {
  root,
  packages: path.join(root, 'packages'),
  server: path.join(root, 'packages/server'),
};

export default paths;
