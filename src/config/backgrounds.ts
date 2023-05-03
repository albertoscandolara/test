import { BackgroundCubeTexture } from "../models/3D/environment/backgrounds/background";

const assetsFolder: string = `../assets`;
const basePath: string = `${assetsFolder}/textures/backgrounds`;

export const backgroundCubeTextures: Array<BackgroundCubeTexture> = [
  new BackgroundCubeTexture(
    0,
    `Sky clouds`,
    `Sky clouds`,
    `${basePath}/sky clouds/`,
    ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]
  ),
  new BackgroundCubeTexture(
    1,
    `Museum interior`,
    `Museum interior`,
    `${basePath}/museum interior/`,
    ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]
  ),
];
