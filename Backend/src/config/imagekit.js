import ImageKit from "imagekit";
import { config } from "./env.js";

const imagekit = new ImageKit({
  publicKey: config.imagekit.publicKey,
  privateKey: config.imagekit.privateKey, 
  urlEndpoint: config.imagekit.urlEndpoint,
});

export default imagekit;
