// import path from "path";
// // import { NextApiRequest, NextApiResponse } from "next";
// import _ from "lodash";
// import GIFEncoder from "gifencoder";
// import { createCanvas, loadImage, Image } from "canvas";

// const FRAMES = 10;
// const petGifCache: (Image | null)[] = Array(FRAMES).fill(null);
// const TRANSPARENT_COLOR = 0x00ff00; // Example color, you can change it as needed

// interface PetGifOptions {
//   resolution?: number;
//   delay?: number;
//   backgroundColor?: string | null;
// }

// const defaultOptions: Required<PetGifOptions> = {
//   resolution: 128,
//   delay: 20,
//   backgroundColor: null,
// };

// export async function createPetpetGif(
//   image: string,
//   options: PetGifOptions = {}
// ): Promise<Buffer> {
//   const { resolution, delay, backgroundColor } = _.defaults(
//     options,
//     defaultOptions
//   );

//   // Validate input
//   if (!image || typeof image !== "string") {
//     throw new Error("Invalid image URL. Please provide a valid string URL.");
//   }

//   // Create GIF encoder
//   const encoder = new GIFEncoder(resolution, resolution);
//   encoder.start();
//   encoder.setRepeat(0); // Infinite loop
//   encoder.setDelay(delay);
//   encoder.setTransparent(TRANSPARENT_COLOR); // Example color, you can change it as needed

//   // Create canvas and its context
//   const canvas = createCanvas(resolution, resolution);
//   const ctx = canvas.getContext("2d");

//   // Load avatar image
//   let avatar;
//   try {
//     avatar = await loadImage(image);
//   } catch (err) {
//     console.error("Error loading the avatar image:", err);
//     throw new Error(
//       "Error loading the avatar image. The URL may be invalid or inaccessible."
//     );
//   }

//   // Loop and create each frame
//   for (let i = 0; i < FRAMES; i++) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     if (backgroundColor) {
//       ctx.fillStyle = backgroundColor;
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
//     }

//     const j = i < FRAMES / 2 ? i : FRAMES - i;

//     const width = 0.8 + j * 0.02;
//     const height = 0.8 - j * 0.05;
//     const offsetX = (1 - width) * 0.5 + 0.1;
//     const offsetY = 1 - height - 0.08;

//     // Load pet frame images lazily
//     if (!petGifCache[i]) {
//       try {
//         petGifCache[i] = await loadImage(
//           path.resolve("./public/img", `pet${i}.gif`)
//         );
//       } catch (err) {
//         console.error(`Error loading the pet image for frame ${i}:`, err);
//         throw new Error(`Error loading the pet image for frame ${i}.`);
//       }
//     }

//     ctx.drawImage(
//       avatar,
//       resolution * offsetX,
//       resolution * offsetY,
//       resolution * width,
//       resolution * height
//     );

//     if (petGifCache[i]) {
//       ctx.drawImage(petGifCache[i]!, 0, 0, resolution, resolution);
//     }

//     encoder.addFrame(ctx as unknown as CanvasRenderingContext2D);
//   }

//   encoder.finish();
//   return encoder.out.getData();
// }
export async function createPetpetGif(
  image: string,
  options: any
): Promise<Buffer> {
  // Create a simple GIF buffer for testing purposes
  const gifBuffer = Buffer.from(
    "47494638396101000100800000ffffff00000021f90401000001002c00000000010001000002024401003b",
    "hex"
  );
  return gifBuffer;
}
