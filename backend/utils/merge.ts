import sharp from "sharp"
import axios from "axios"
import TextToSVG from "text-to-svg"

// Function to download image from URL and return it as a buffer
async function downloadImage(url: string): Promise<Buffer> {
  const response = await axios.get(url, { responseType: "arraybuffer" })
  return Buffer.from(response.data)
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

async function getImageAspectRatio(metadata: sharp.Metadata): Promise<string> {
  try {
    if (metadata.width && metadata.height) {
      const width = metadata.width
      const height = metadata.height

      // Calculate the GCD of width and height
      const divisor = gcd(width, height)

      // Calculate the simplified ratio
      const widthRatio = width / divisor
      const heightRatio = height / divisor

      // Return the ratio as a string
      return `${widthRatio}:${heightRatio}`
    } else {
      throw new Error(
        "Unable to determine aspect ratio: width or height missing."
      )
    }
  } catch (error) {
    console.error("Error getting image aspect ratio:", error)
    throw error
  }
}

export async function mergeImagesWithWatermark(
  image1Path: string,
  image2Path: string,
  name: string,
  phone: string,
  output:string
) {
  try {
    // Check if image2Path is a URL
    const image2Buffer = image2Path.startsWith("http")
      ? await downloadImage(image2Path)
      : await sharp(image2Path).toBuffer()
    const image1Buffer = image1Path.startsWith("http")
      ? await downloadImage(image1Path)
      : await sharp(image1Path).toBuffer()

    // Load the images
    const image1 = sharp(image1Buffer)
    const image2 = sharp(image2Buffer)

    // Get metadata to determine the sizes
    const [image1Metadata, image2Metadata] = await Promise.all([
      image1.metadata(),
      image2.metadata(),
    ])
    const ratio = (await getImageAspectRatio(image2Metadata)).split(":")
    console.log(
      ratio,
      Math.floor(
        (image1Metadata.width! / image2Metadata.width!) * image2Metadata.height!
      )
    )

    // Resize the second image to match the width of the first image
    const resizedImage2 = await image2
      .resize({
        width: image1Metadata.width,
        fit: "fill",
        height: Math.floor(
          (image1Metadata.width! / image2Metadata.width!) *
            image2Metadata.height!
        ),
      })
      .toBuffer()

    const textToSVG = TextToSVG.loadSync()
    const svgText = textToSVG.getSVG(name, {
      x: 0,
      y: 0,
      fontSize: Math.floor((image1Metadata.width || 50) / 30),
      anchor: "left top",
      attributes: { fill: "rgb(0,0,0,50%)" },
    })
    const svgPhone = textToSVG.getSVG(phone, {
      x: 0,
      y: 0,
      fontSize: Math.floor((image1Metadata.width || 50) / 30),
      anchor: "left top",
      attributes: { fill: "rgb(0,0,0,50%)" },
    })

    // Convert SVG text to a buffer
    const svgBuffer = Buffer.from(svgText)
    const svgPhoneBuff = Buffer.from(svgPhone)

    // Get text size to determine positioning
    const textbuff = await sharp(svgBuffer).toBuffer()
    const phonebuff = await sharp(svgPhoneBuff).toBuffer()

    // Create the merged image by stacking them vertically
    return await sharp({
      create: {
        width: image1Metadata.width!,
        height:
          image1Metadata.height! +
          Math.floor(
            (image1Metadata.width! / image2Metadata.width!) *
              image2Metadata.height!
          ),
        channels: 3,
        background: { r: 255, g: 255, b: 255 }, // white background
      },
    })
      .composite([
        { input: await image1.toBuffer(), top: 0, left: 0 },
        { input: resizedImage2, top: image1Metadata.height!, left: 0 },
        { input: textbuff, top: 20, left: 20 },
        {
          input: phonebuff,
          top: Math.floor((image1Metadata.width || 50) / 30),
          left: 20,
        },
        {
          input: textbuff,
          top: Math.floor(image1Metadata.height! / 2),
          left: Math.floor(image1Metadata.width! / 2),
        },
        {
          input: phonebuff,
          top:
            Math.floor(image1Metadata.height! / 2) +
            Math.floor((image1Metadata.width || 50) / 30),
          left: Math.floor(image1Metadata.width! / 2),
        },
      ])
      .toFile(output)
  } catch (error) {
    console.error("Error merging images:", error)
  }
}


