// import * as htmlToImage from 'html-to-image';

// // Function to convert a DOM node to a PNG data URL
// export async function convertNodeToPng(nodeId: string): Promise<string | null> {
//     const node = document.getElementById(nodeId);
//     if (node) {
//       try {
//         return await htmlToImage.toPng(node as HTMLElement);
//       } catch (error) {
//         console.error('Could not convert node to PNG:', error);
//       }
//     }
//     return null;
//   }
  
//   // Function to trigger download of a data URL
//   export function downloadDataUrl(dataUrl: string, filename: string) {
//     const link = document.createElement('a');
//     link.download = filename;
//     link.href = dataUrl;
//     link.click();
//   }
  
//   // Combined function to convert a DOM node to PNG and then download it
//   export async function downloadCardAsPng(nodeId: string, imageName: string) {
//     const dataUrl = await convertNodeToPng(nodeId);
//     if (dataUrl) {
//       downloadDataUrl(dataUrl, imageName);
//     }
//   }