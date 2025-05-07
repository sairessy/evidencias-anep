$(document).ready(function() {
  $('.select-modulo').select2({theme: 'classic'});
});

$(document).ready(function() {
  $('.select-formador').select2({theme: 'classic'});
});

if (!localStorage.getItem("user")) {
  window.location.href = "/login.html";
}

let qfs = "<option value=''>--Qualificação--</option>",
  lvs = "<option value=''>--Nível--</option>",
  tns = "<option value=''>--Turno--</option>",
  mds = "<option value=''>--Módulo--</option>",
  fmds = "<option value=''>--Formador--</option>";

for (const t of turnos) {
  tns += `<option value='${t.id}'>${t.label}</option>`;
}

for (const l of niveis) {
  lvs += `<option value='${l.id}'>${l.label}</option>`;
}

for (const q of qualificacoes) {
  qfs += `<option value='${q.id}'>${q.label}</option>`;
}

for (const m of modulos) {
  mds += `<option value='${m.id}'>(${m.id.toUpperCase()}) ${m.label}</option>`;
}

for (const f of formadores) {
  fmds += `<option value='${f.id}'>${f.name} ${f.surname}</option>`;
}

document.getElementById("select-qualificacao").innerHTML = qfs;
document.getElementById("select-nivel").innerHTML = lvs;
document.getElementById("select-turno").innerHTML = tns;
document.getElementById("select-modulo").innerHTML = mds;
document.getElementById("select-formador").innerHTML = fmds;
document.getElementById("select-verificador").innerHTML = fmds;

// document.getElementById('date').value = new Date()

document.getElementById("btn-logout").addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/login.html";
});

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);

  const date = form.get("date");
  const desc = form.get("desc");
  const modulo = form.get("select-modulo");
  const qualificacao = form.get("select-qualificacao");
  const nivel = form.get("select-nivel");
  const turno = form.get("select-turno");
  const bimestre = form.get("select-bimestre");
  const formador = form.get("select-formador");
  const verificador = form.get("select-verificador");
  const turma = form.get("select-turma");

  const data = {
    date,
    desc,
    modulo,
    qualificacao,
    nivel,
    turno,
    bimestre,
    formador,
    verificador,
    turma
  };

  try {
    const res = await fetch(api_url + "/pasta-evidencia/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        user: localStorage.getItem("user") || 'x',
      },
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      alert("Pasta submetida com êxito.");
      const data = await res.json()
      console.log(data)
    }
  } catch (error) {
    console.log(error);
    alert("Houve um erro, tente novamente.");
  }

  e.target.reset();
});
