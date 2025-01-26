import { test, expect, devices } from '@playwright/test';
import fs from 'fs';
import sharp from 'sharp';

//Consegui desconsiderar o início do screenshot
//Conseguir resolver tb o problema do stick, que no caso é só tirar já iniciar o navegador com o modo full, antes do print.
//Premissa - SE A IMAGEM FOR GERADA COM NA PROPORÇÃO ORIGINAL, DÁ PRA COMPARAR

// ------------------------- AQUI é eliminando o header// 
// test.describe('specific viewport block', () => {
//   test.use({
//     viewport: { width: 414, height: 2048 - 108 }, // aqui dá pra desconsiderar o tamanho inicial da imagem.
//     deviceScaleFactor: 1
//   });

//   test('has title', async ({ page }) => {

//     const viewportSize = await page.evaluate(() => ({
//       width: window.innerWidth,
//       height: window.innerHeight,
//     }));

//     console.log(`Tamanho da viewport real: ${viewportSize.width}x${viewportSize.height}`);

//     await page.goto('http://localhost:4200');

//     // Tirar o screenshot da página
//     const screenshotPath = './tests/assets/output/screenshot.png';
//     await page.screenshot({ path: screenshotPath });

//     const { default: pixelmatch } = await import('pixelmatch');
//     const { PNG } = await import('pngjs');

//     // --------------------- // 
//     const croppedImageBase = await sharp('./tests/assets/base.png')
//       .extract({ left: 0, top: 108, width: 414, height: 2048 - 108 }) // Cortar os primeiros 108 pixels
//       .toBuffer();


//     const imgBase = PNG.sync.read(croppedImageBase);
//     const imgActual = PNG.sync.read(fs.readFileSync('./tests/assets/output/screenshot.png'))

//     const diff1 = new PNG({ width: imgBase.width, height: imgBase.height });

//     const numDiffPixels1 = pixelmatch(imgBase.data, imgActual.data, diff1.data, imgBase.width, imgBase.height);
//     console.log(`Diferenças: ${numDiffPixels1} pixels.`);

//     fs.writeFileSync('./tests/assets/output/diff1.png', PNG.sync.write(diff1));
//   });

// });




//Premissa - SE A IMAGEM FOR GERADA COM NA PROPORÇÃO ORIGINAL, DÁ PRA COMPARAR
// test.describe('specific viewport block', () => {
//   //--------------------- TESTE 2 COM ERRO ---- AQUI é sem eliminar o header// 
//   test.use({
//     viewport: { width: 414, height: 2048 }, // aqui dá pra desconsiderar o tamanho inicial da imagem.
//     deviceScaleFactor: 1
//   });

//   test('has title', async ({ page }) => {
//     const viewportSize = await page.evaluate(() => ({
//       width: window.innerWidth,
//       height: window.innerHeight,
//     }));
//     console.log(`Tamanho da viewport real: ${viewportSize.width}x${viewportSize.height}`);
//     await page.goto('http://localhost:4200');

//     // Tirar o screenshot da página
//     const screenshotPath = './tests/assets/output/screenshot.png';
//     await page.screenshot({ path: screenshotPath });
//     const { default: pixelmatch } = await import('pixelmatch');
//     const { PNG } = await import('pngjs');


//     // --------------------- TESTE 2 COM ERRO ---- AQUI é sem eliminar o header// 
//     const actualImage = PNG.sync.read(fs.readFileSync('./tests/assets/output/screenshot.png'))
//     const expectedImage = PNG.sync.read(fs.readFileSync('./tests/assets/base.png'))
//     const { width, height } = actualImage;
//     const diff2 = new PNG({ height, width });
//     const numDiffPixels2 = pixelmatch(actualImage.data, expectedImage.data, diff2.data, width, height);
//     fs.writeFileSync('./tests/assets/output/diff2.png', PNG.sync.write(diff2));
//     console.log(`Diferenças: ${numDiffPixels2} pixels.`);
//   });

// });


test.describe('testando sem os textos', () => {
  test.use({
    viewport: { width: 414, height: 2048 - 108 }, // aqui dá pra desconsiderar o tamanho inicial da imagem.
    deviceScaleFactor: 1
  });

  test('has title', async ({ page }) => {

    const viewportSize = await page.evaluate(() => ({
      width: window.innerWidth,
      height: window.innerHeight,
    }));

    console.log(`Tamanho da viewport real: ${viewportSize.width}x${viewportSize.height}`);

    await page.goto('http://localhost:4200');

    // Tirar o screenshot da página
    const screenshotPath = './tests/assets/output/screenshot.png';
    await page.screenshot({ path: screenshotPath });

    const { default: pixelmatch } = await import('pixelmatch');
    const { PNG } = await import('pngjs');

    // --------------------- // 
    const croppedImageBase = await sharp('./tests/assets/base.png')
      .extract({ left: 0, top: 108, width: 414, height: 2048 - 108 }) // Cortar os primeiros 108 pixels
      .toBuffer();


    const imgBase = PNG.sync.read(croppedImageBase);
    const imgActual = PNG.sync.read(fs.readFileSync('./tests/assets/output/screenshot.png'))

    const diff1 = new PNG({ width: imgBase.width, height: imgBase.height });

    const numDiffPixels1 = pixelmatch(imgBase.data, imgActual.data, diff1.data, imgBase.width, imgBase.height);
    console.log(`Diferenças: ${numDiffPixels1} pixels.`);

    fs.writeFileSync('./tests/assets/output/diff1.png', PNG.sync.write(diff1));
  });
});

