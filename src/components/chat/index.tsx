"use client";

import "./chat.css";
import ghost from "../../assets/ghost.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

let initialMessages = [
  {
    id: 1,
    content: "Olá, eu sou Pragana IA, como posso te ajudar?",
    role: "assistant",
  },
];

let questions = [
  {
    key: "Cursos",
    content: "Nossos cursos são Programação, Front-end, Back-end, Data Science, Mobile",
  },
  {
    key: "Horarios",
    content: "Nosso horario de funcionamento é de segunda a sexta das 9 as 22",
  },
  {
    key: "Localização",
    content: "Nossa localização fica na Av São Paulo n 123, São Paulo, SP",
  },
  {
    key: "Programação",
    content: "Esse é um curso voltado para iniciantes na area de programação",
  },
  {
    key: "Front-end",
    content:
      "Desenvolva sites e webapps com HTML, CSS e JavaScript. Aprenda as boas práticas e as últimas versões do JavaScript. Estude ferramentas e frameworks do mercado como React, Angular, Webpack, jQuery e mais. Saiba como começar com Front-end. Conheça mais da Escola de Front-end ou navegue nessa página para ver todos nossos cursos e formações.",
  },
  {
    key: "Back-end",
    content:
      "Mergulhe no universo back-end. Programe nas principais plataformas e linguagens, como Python Node.JS, PHP, Java e .NET. Crie sistemas web e desenhe a arquitetura de soluções inovadoras, com código e boas práticas.",
  },
  {
    key: "Data Science",
    content:
      "Aprenda a trabalhar com dados. Do Excel ao Python e Machine Learning. Use os principais bancos SQL do mercado e faça análises de dados com business intelligence. Pandas, SciKitLearn, Jupyter e mais. Saiba como começar com Data Science. Conheça mais da Escola de Data Science ou navegue nessa página para ver todos nossos cursos e formações.",
  },
  {
    key: "Mobile",
    content:
      "Crie aplicativos móveis para as principais plataformas, smartphones e tablets. Aprenda frameworks multiplataforma como Flutter e React Native e saiba como criar apps nativas para Android e iOS. Desenvolva também jogos mobile com Unity. Saiba como começar com Mobile. Conheça mais da Escola de Mobile ou navegue nessa página para ver todos nossos cursos e formações.",
  },
];

export default function Chat() {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  const messagesEndRef: any = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  function handleShow() {
    setShow(!show);
  }

  function handleMessage(content: string, role: string) {
    setMessages((messages) => [
      ...messages,
      {
        id: messages.length + 1,
        content,
        role,
      },
    ]);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const teste = input;
    handleMessage(teste, "user");

    let query = input.toLowerCase();
    const filterItems: any = questions.filter((item) => item.key.toLowerCase().indexOf(query) >= 0);

    if (filterItems.length == 0) {
      handleMessage("Você pode me perguntar sobre cursos, horarios e localização.", "assistant");
    }

    if (filterItems.length == 1) {
      handleMessage(filterItems[0].content, "assistant");
    }

    setInput("");
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <Avatar onClick={() => handleShow()} className={show ? "show" : ""}>
        <AvatarFallback>PH</AvatarFallback>
        <AvatarImage src="https://github.com/github.png" />
      </Avatar>

      <Card className={show ? "w-full sm:w-[440px]" : "show w-full sm:w-[440px]"}>
        <CardHeader onClick={() => handleShow()}>
          <CardTitle> Chat Pragana</CardTitle>
          <CardDescription>Using Next.js to create a chat bot.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-60 w-full pr-4">
            {messages.map((message) => {
              return (
                <div key={message.id} className="flex gap-3 text-slate-600 text-sm mb-4">
                  {message.role === "user" && (
                    <Avatar>
                      <AvatarFallback>PH</AvatarFallback>
                      <AvatarImage src="https://github.com/github.png" />
                    </Avatar>
                  )}
                  {message.role === "assistant" && (
                    <Avatar>
                      <AvatarFallback>IA</AvatarFallback>
                      <AvatarImage src="https://github.com/praganavictor.png" />
                    </Avatar>
                  )}
                  <p className="leading-relaxed">
                    <span className="block font-bold text-slate-700">
                      {message.role === "user" ? "Eu:" : "IA:"}
                    </span>
                    {message.content}
                  </p>
                  <div ref={messagesEndRef} />
                </div>
              );
            })}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form
            className="w-full flex gap-2"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Input
              placeholder="Como posso te ajudar?"
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
            />
            <Button type="submit">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
