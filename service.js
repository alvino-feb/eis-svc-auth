import { ENV } from './src/common/constants/env.js';

import app from "./src/app.js";

const PORT = ENV.PORT || 4100;

app.listen(PORT, () => {
  console.log(`Service auth running on port ${PORT}`);
});