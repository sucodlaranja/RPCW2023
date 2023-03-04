const axios = require("axios");

exports.getPessoaByCC = async (cc) => {
  try {
    const r = await axios.get("http://localhost:3000/pessoas?CC=" + cc);
  } catch (error) {
    console.log(error);
  }
};

exports.getPessoas = async () => {
  try {
    const r = await axios.get("http://localhost:3000/pessoas");
    return r.data;
  } catch (error) {
    console.log(error);
  }
};

exports.getPessoa = async (id) => {
  try {
    const r = await axios.get("http://localhost:3000/pessoas?id=" + id);
    return Object.entries(r.data[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.getPessoasOrdenada = async () => {
  try {
    const r = await this.getPessoas();
    return r.data.sort((a, b) => a.nome.localeCompare(b.nome));
  } catch (error) {
    console.log(error);
  }
};

exports.getPessoasSexDist = async () => {
  const pessoas = await this.getPessoas();
  if (pessoas === undefined) return;
  const man = pessoas.filter((pessoa) => pessoa.sexo === "masculino");
  const woman = pessoas.filter((pessoa) => pessoa.sexo === "feminino");
  const other = pessoas.filter((pessoa) => pessoa.sexo === "outro");

  return Object.entries({
    Masculino: { size: man.length, path: "/sexo/masculino" },
    Feminino: { size: woman.length, path: "/sexo/feminino" },
    Outro: { size: other.length, path: "/sexo/outro" },
  });
};

exports.getPessoasSportDist = async () => {
  const pessoas = await this.getPessoas();
  if (pessoas === undefined) return;
  const dic = {};

  for (let pessoa of pessoas) {
    for (let sport of pessoa.desportos) {
      if (dic[sport] === undefined)
        dic[sport] = { size: 0, path: "/desporto/" + sport };
      dic[sport].size++;
    }
  }

  return Object.entries(dic);
};

exports.getPessoasProfDist = async () => {
  try {
    const r = await this.getPessoas();
    const dic = {};
    for (let pessoa of r) {
      if (pessoa.profissao === undefined) continue;
      if (dic[pessoa.profissao] === undefined)
        dic[pessoa.profissao] = {
          size: 0,
          path: "/profissao/" + pessoa.profissao,
        };
      else dic[pessoa.profissao].size++;
    }
    const arr = Object.entries(dic);
    arr.sort((a, b) => b[1].size - a[1].size);

    return arr.slice(0, 10);
  } catch (error) {
    console.log(error);
  }
};

exports.getPessoasBySport = async (sport) => {
  try {
    const r = await axios.get("http://localhost:3000/pessoas?q=" + sport);
    return r.data;
  } catch (error) {
    console.log(error);
  }
};

exports.getPessoasBySex = async (sex) => {
  try {
    const r = await axios.get("http://localhost:3000/pessoas?sexo=" + sex);
    return r.data;
  } catch (error) {
    console.log(error);
  }
};

exports.getPessoasByProf = async (prof) => {
  try {
    const r = await axios.get(
      "http://localhost:3000/pessoas?profissao=" + prof
    );
    return r.data;
  } catch (error) {
    console.log(error);
  }
};

this.getPessoasSportDist();
