const { existsSync, mkdirSync, writeFileSync } = require('fs');
const { join } = require('path');
const { execSync } = require('child_process');

const PROTO_DIR = join(__dirname, '../src/protos');
const OUT_DIR = join(__dirname, '../src/helpers/generated');

// Create output directory if needed
if (!existsSync(OUT_DIR)) {
  mkdirSync(OUT_DIR, { recursive: true });
}

// Generate JavaScript and TypeScript definitions
try {
  execSync(`npx protoc \
    --ts_out ${OUT_DIR} \
    --proto_path ${PROTO_DIR} \
    ${join(PROTO_DIR, 'orderbook.proto')}`, {
    stdio: 'inherit'
  });
  
  console.log('Protobuf compilation successful');
} catch (error) {
  console.error('Protobuf compilation failed:', error);
  process.exit(1);
}