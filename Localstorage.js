// Funcionalidades compartilhadas do portfólio.
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Atualiza o ano do rodapé em todas as páginas.
  const currentYear = new Date().getFullYear();
  document.querySelectorAll("#year, .year").forEach((element) => {
    element.textContent = currentYear;
  });

  // Formulário de contato: salva os dados localmente neste navegador.
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const status = document.querySelector("#form-status");
  const storageKey = "portfolioContactDraft";

  // Recupera um rascunho anterior, se existir.
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const data = JSON.parse(saved);
      ["nome", "email", "telefone", "mensagem"].forEach((field) => {
        const input = form.elements.namedItem(field);
        if (input && typeof data[field] === "string") input.value = data[field];
      });
    }
  } catch (error) {
    console.error("Não foi possível recuperar os dados salvos:", error);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = {
      nome: form.elements.namedItem("nome").value.trim(),
      email: form.elements.namedItem("email").value.trim(),
      telefone: form.elements.namedItem("telefone").value.trim(),
      mensagem: form.elements.namedItem("mensagem").value.trim(),
      atualizadoEm: new Date().toISOString()
    };

    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
      status.textContent = "Dados salvos neste navegador com sucesso.";
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
      status.textContent = "Não foi possível salvar. Verifique as configurações do navegador.";
    }
  });
});
