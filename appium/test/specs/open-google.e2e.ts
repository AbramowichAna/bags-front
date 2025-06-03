export {}

describe('Prueba de Chrome en Android', () => {
  it('debería abrir Google', async () => {
    await browser.url('https://www.google.com');
    const title = await browser.getTitle();
    console.log('Título de la página:', title);
  });
});
