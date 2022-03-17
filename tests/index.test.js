const { TestWatcher } = require("jest");

const pegaArquivo = require("../index");
const arrayResult = [
  {
    FileList: "https://developer.mozilla.org/pt-BR/docs/Web/API/FileList",
  },
];

describe("pegaArquivo::", () => {
  it("deve ser uma função", () => {
    expect(typeof pegaArquivo).toBe("function");
  });
  it("deve retornar array de resultados", async () => {
    const result = await pegaArquivo(
      "/mnt/c/Users/RenatoPasklan/Documents/Treinamentos/Alura_Node/lib1/tests/arquivos/text.md"
    );
    expect(result).toEqual(arrayResult);
  });
  it('deve retornar mensagem "não há links"', async () => {
    const result = await pegaArquivo(
      "/mnt/c/Users/RenatoPasklan/Documents/Treinamentos/Alura_Node/lib1/tests/arquivos/text_no_links.md"
    );
    expect(result).toBe("não há links");
  });
  it("deve lançar um erro na falta de arquivo", async () => {
    await expect(
      pegaArquivo(
        "/mnt/c/Users/RenatoPasklan/Documents/Treinamentos/Alura_Node/lib1/tests/arquivos"
      )
    ).rejects.toThrow(/não há arquivo no caminho/);
  });
  it("deve resolver a função com sucesso", async () => {
    await expect(
      pegaArquivo(
        "/mnt/c/Users/RenatoPasklan/Documents/Treinamentos/Alura_Node/lib1/tests/arquivos/text.md"
      )
    ).resolves.toEqual(arrayResult);
  });
});
