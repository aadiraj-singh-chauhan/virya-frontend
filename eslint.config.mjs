import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // react-three-fiber scene components mutate Three.js objects (shader
    // uniforms, loaded scenes, instanced-mesh buffers) imperatively inside
    // useFrame/useEffect every frame — the correct, idiomatic r3f pattern,
    // and far cheaper than routing 60fps values through React state.
    // react-hooks/immutability and react-hooks/set-state-in-effect assume
    // React Compiler semantics that don't recognize this pattern, so both
    // are disabled for just the files that hold r3f scene logic.
    files: [
      "src/components/products/ProductModel3D.jsx",
      "src/components/products/amr10/components/Capabilities.jsx",
      "src/components/products/amr50/components/RobotScene.jsx",
      "src/components/products/amr50/components/FleetScene.jsx",
      "src/components/products/apt20/components/Capabilities.jsx",
    ],
    rules: {
      "react-hooks/immutability": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
