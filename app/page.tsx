"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

const App = () => {
  const [numero, setNumero] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [link, setLink] = useState("");

  const Gerar = () => {
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(
      mensagem
    )}`;

    setLink(url);
    toast.success("Link gerado com sucesso!");
  };

  useEffect(() => {
    if (!link) return;

    const timer = setTimeout(() => setLink(""), 10000);
    return () => clearTimeout(timer);
  }, [link]);

  const handleNumeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }

    setNumero(value);
  };

  return (
    <div className="relative w-full min-h-screen bg-green-200">
      {/* Navbar */}
      <div className="bg-green-400 w-full p-4 fixed top-0 left-0 z-50">
        <nav className="w-full flex flex-wrap items-center justify-between">
          <li className="font-bold text-xl text-white list-none">
            ConnectZap
          </li>

          <div className="flex space-x-4 text-white text-sm sm:text-base mt-2 sm:mt-0">
            <a href="#Sobre" className="cursor-pointer hover:underline">
              Sobre
            </a>
            <a href="#links" className="cursor-pointer hover:underline">
              Como gerar links?
            </a>
          </div>
        </nav>
      </div>

      <Toaster position="top-center" />

      {/* Container principal */}
      <div className="bg-gradient-to-r from-green-100 to-green-400 w-full pt-28 pb-16 flex flex-col items-center h-[600px]">
        
        {/* BOX DO LINK GERADO */}
        {link && (
          <div className="flex flex-col md:flex-row lg:flex-row absolute gap-2 mt-0 md:mt-0 lg:mt-[-20px] bg-gradient-to-r from-green-400 to-green-700 p-4 rounded-xl text-white shadow-xl animate-[fadeInUp_0.5s_ease-out] mb-6 max-w-[90%] sm:max-w-full">
            <p className="font-bold text-sm ">Link gerado:</p>
            <a
              href={link}
              target="_blank"
              className="underline hover:text-gray-200 break-all text-sm"
            >
              {link}
            </a>
          </div>
        )}

        {/* FORM */}
        <form className="flex flex-col gap-6 bg-green-50 p-6 rounded-xl shadow-md w-[90%] max-w-[500px] mt-0 md:mt-0 lg:mt-15">
          <div className="flex flex-col gap-2">
            <label className="text-gray-900 text-sm">Seu número</label>
            <input
              type="text"
              value={numero}
              onChange={handleNumeroChange}
              maxLength={15}
              placeholder="(00) 00000-0000"
              className="border p-2 rounded bg-white text-black"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-900 text-sm">Sua mensagem (Opcional)</label>
            <textarea
              className="border p-2 rounded bg-white text-black h-[100px]"
              onChange={(e) => setMensagem(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={Gerar}
            className="bg-green-400 text-white py-2 rounded hover:bg-green-600 transition cursor-pointer"
          >
            Gerar Link
          </button>
        </form>
      </div>

      {/* SESSÃO EXPLICATIVA */}
      <div className="w-full flex flex-col items-center p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 items-center gap-10 md:gap-0 lg:gap-0 ">
          
          <div className="flex justify-center">
            <Image src="/Linksuporte.svg" width={350} height={350} alt="Link" className="w-[250px] sm:w-[350px]" />
          </div>

          <div
            id="links"
            className="bg-green-50 p-5 rounded-2xl shadow max-w-[90%] lg:max-w-[600px] mt-0 md:mt-0 lg:mt-[-100px]"
          >
            <p className="text-gray-900 font-semibold text-sm leading-relaxed ">
              Para gerar um link do WhatsApp, basta inserir o número no formato internacional (55 + DDD + número) e opcionalmente escrever uma mensagem. 
              O link final segue o padrão:{" "}
              <span className="text-blue-600">
                https://wa.me/NUMERO?text=MENSAGEM
              </span>
              . Depois, clique para testar.
            </p>
          </div>
        </div>
      </div>

      {/* DIVISÓRIA */}
      <span className="w-[90%] mx-auto h-[2px] bg-green-600 block mt-12"></span>

      {/* SOBRE */}
      <div id="Sobre" className="w-full flex flex-col items-center p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2  mt-10 items-center">
          
          <Image
            src="/Onlineworld.svg"
            width={450}
            height={450}
            alt="Link"
            className="mx-auto w-[260px] sm:w-[400px]"
          />

          <div className="bg-green-50 p-5 rounded-2xl shadow max-w-[90%] lg:max-w-[600px] mt-0 md:mt-0 lg:mt-[-150px]">
            <p className="text-gray-900 font-semibold text-sm leading-relaxed">
              Nosso Gerador de Links do WhatsApp facilita o contato com clientes,
              criando links automáticos com número e mensagem personalizada.
              Ideal para sites, lojas, Instagram e atendimento profissional.
            </p>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <div className="bg-green-400 w-full mt-10 text-sm flex justify-center p-4 text-white">
        @ConnectZap - Todos os direitos reservados
      </div>
    </div>
  );
};

export default App;
